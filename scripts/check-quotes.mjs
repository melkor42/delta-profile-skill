#!/usr/bin/env node
// Checks that every string the skill claims to quote from the engine is still
// character-exact, that no brand string leaked into the skill folder, and that
// the frontmatter kept its shape. Run from the repository root:
//
//   node scripts/check-quotes.mjs
//   MMC_DELTA_REPO=../MMC-Delta node scripts/check-quotes.mjs   (explicit checkout)
//
// Exit 0 when everything passes or the engine checkout is absent (nothing checked);
// exit 1 on any failure. PROVENANCE.md lists what is verbatim and what is restated.

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const skillDir = join(repoRoot, 'delta-profile')
const failures = []
let checks = 0

function check(name, ok, detail = '') {
  checks += 1
  if (!ok) failures.push(detail ? `${name} — ${detail}` : name)
}

function read(p) {
  return readFileSync(p, 'utf8')
}

// --- engine sources ---------------------------------------------------------

const engineRepo = process.env.MMC_DELTA_REPO
  ? resolve(process.env.MMC_DELTA_REPO)
  : resolve(repoRoot, '..', 'MMC-Delta')
const howPath = join(engineRepo, 'frontend', 'src', 'content', 'howItWorks.ts')
const sysPath = join(engineRepo, 'backend', 'app', 'pipeline', 'prompts', 'agent_system.j2')

if (!existsSync(howPath) || !existsSync(sysPath)) {
  console.log(`Engine checkout not found at ${engineRepo} — set MMC_DELTA_REPO. Nothing checked.`)
  process.exit(0)
}

const how = read(howPath)
const sys = read(sysPath)

// Unescape a TS/JSON string literal body: the only escapes in these files are \' \" \\
function unquote(literal) {
  return literal.slice(1, -1).replaceAll("\\'", "'").replaceAll('\\"', '"').replaceAll('\\\\', '\\')
}

const STRING = /('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/

// --- readers from howItWorks.ts --------------------------------------------

const start = how.indexOf('export const AGENT_READERS')
const end = how.indexOf('\n]', start)
check('AGENT_READERS block found in howItWorks.ts', start !== -1 && end !== -1)
const block = how.slice(start, end)

const readers = []
for (const m of block.matchAll(new RegExp(`name: '([a-z_]+)'`, 'g'))) {
  readers.push({ name: m[1], voice: null, task: null })
}
let current = null
for (const m of block.matchAll(new RegExp(`(title|voice|task):\\s*${STRING.source}`, 'g'))) {
  if (m[1] === 'title') {
    current = readers.find((r) => r.title === undefined) ?? readers.find((r) => !r.title)
    if (current) current.title = unquote(m[2])
  } else if (current) {
    current[m[1]] = unquote(m[2])
  }
}
check('eight readers extracted', readers.length === 8 && readers.every((r) => r.voice && r.task),
  `got ${readers.length}`)

// --- moderators from howItWorks.ts ------------------------------------------

const moderators = {}
for (const m of how.matchAll(new RegExp(`MODERATOR_(PAIR|CLUSTER|ASSEMBLY)\\s*=\\s*\\n?\\s*${STRING.source}`, 'g'))) {
  moderators[m[1]] = unquote(m[2])
}
check('three moderator stances found', Object.keys(moderators).length === 3,
  `got ${Object.keys(moderators).length}`)

// --- rules and peer paragraph from agent_system.j2 ---------------------------

const rules = {}
for (const m of sys.matchAll(/^(\d)\. (.+)$/gm)) rules[m[1]] = m[2]
check('five rules found in agent_system.j2', Object.keys(rules).length === 5,
  `got ${Object.keys(rules).length}`)
const rule5Prefix = rules[5] ? rules[5].slice(0, rules[5].indexOf(' Write every')) : ''
const peer = (sys.match(/^You and your peers read the same person[^\r\n]*/m) ?? [''])[0]
check('peer-blindness paragraph found in agent_system.j2', peer.length > 100)

// --- the checks --------------------------------------------------------------

const readersMd = read(join(skillDir, 'references', 'readers.md'))
const debateMd = read(join(skillDir, 'references', 'debate-roles.md'))

for (const r of readers) {
  check(`voice verbatim: ${r.name}`, readersMd.includes(r.voice))
  check(`task verbatim: ${r.name}`, readersMd.includes(r.task))
}
check('peer-blindness paragraph verbatim', readersMd.includes(peer))
for (const n of ['1', '2', '3', '4']) check(`rule ${n} verbatim`, readersMd.includes(rules[n]))
check('rule 5 first sentence verbatim', rule5Prefix.length > 0 && readersMd.includes(rule5Prefix))

for (const [key, line] of Object.entries(moderators)) {
  check(`moderator stance verbatim: ${key}`, debateMd.includes(line))
}
for (const heading of [
  'ROUND 1 (pair discussion) of the panel.',
  'You are moderating ROUND 2 (cluster discussion) on the panel.',
  'ROUND 3 — full assembly of the panel.',
]) {
  check(`round heading present: ${heading.slice(0, 24)}…`, debateMd.includes(heading))
}

// --- brand leak: the skill folder stays unnamed ------------------------------

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const p = join(dir, entry)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })
}
for (const file of walk(skillDir)) {
  const text = read(file)
  const hit = text.match(/MMC|ATHA/)
  check(`no brand string in ${file.slice(repoRoot.length + 1)}`, hit === null,
    hit ? `found "${hit[0]}"` : '')
}

// --- frontmatter -------------------------------------------------------------

const skill = read(join(skillDir, 'SKILL.md'))
const fm = skill.match(/^---\n([\s\S]*?)\n---/)
check('frontmatter present', fm !== null)
if (fm) {
  const meta = fm[1]
  const name = meta.match(/^name: (.+)$/m)?.[1]
  check('frontmatter name matches folder', name === 'delta-profile', `got "${name}"`)
  const desc = meta.match(/^description: (.+)$/m)?.[1]
  check('description is a single line', desc !== undefined)
  check('description within 1024 characters', desc !== undefined && desc.length <= 1024,
    desc ? `${desc.length}` : '')
  check('argument-hint present', /^argument-hint: .+$/m.test(meta))
  check('disable-model-invocation: true', /^disable-model-invocation: true$/m.test(meta))
  const bodyLines = skill.slice(fm[0].length).split('\n').length
  check('body under 500 lines', bodyLines < 500, `${bodyLines} lines`)
}

// --- report ------------------------------------------------------------------

if (failures.length > 0) {
  console.error(`check-quotes: ${failures.length} failure(s) of ${checks}:`)
  for (const f of failures) console.error(`  FAIL ${f}`)
  process.exit(1)
}
console.log(`check-quotes: all ${checks} checks passed against the engine at ${engineRepo}.`)
