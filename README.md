# Delta Profile

A skill for coding-agent harnesses: it builds a deep profile of a person — normally the person invoking it — with eight independent readers, a moderated debate between them, and one synthesis you can work from or argue with.

## What a run does

1. **Ask first.** The skill asks where the evidence is, what the profile is for, where the output goes, and what it may and may not read — before it reads anything.
2. **Gather.** Read-only gatherers pull verbatim spans from the stores that were agreed. Where the record is thin, the skill interviews the person instead of guessing.
3. **Read.** Eight agents read the same dossier, blind to each other, through eight frameworks: cycles and astrology, temperament, Enneagram, Big Five, Jungian typology, Socionics, attachment, developmental values. Each quotes its evidence and commits to one call.
4. **Debate.** Their findings go through three rounds — four pairs, two clusters, a plenary — moderated to surface disagreement rather than smooth it away. Contradictions are resolved by the strength of the evidence, and ties stay open.
5. **Write.** A profile for the person (`profile.md`), a machine mirror (`profile.json`), and the full run — dossier, reader responses, debate, run report — under `private/`, because everything quoting the person's own words stays private by construction.

The panel comes from a matchmaking engine that scored pairs of people for psychological synergy. The readers, their voices and the debate survive here; the scoring does not. A profile makes an agent that works with the person better, gives the person something to argue with, and asks at most two follow-up questions — the ones the evidence says are worth asking.

## What you get

```
delta-profile/
  SKILL.md               the run procedure
  references/            the instruments: readers, debate, dossier, schemas, character, files, failures
```

`profile.md` carries evidence bands — well-evidenced, partly-evidenced, inferred — where `profile.json` carries the floats behind them. Type handles (INTP, Enneagram 5w4, secure) appear always with their band, never alone.

## Honest limits

- **The astrology is interpretive.** Without a pasted computed chart, the astrologer reads cycles and energy freely, may look up a sun sign from a supplied date (flagged as uncomputed), and may not invent positions, an ascendant or element balances. Positions are never made up; what the chart did not compute stays absent.
- **It is stochastic.** The same person's record twice gives two different readings. The profile is one run's view, dated as such.
- **It profiles one person: the one who asked.** There is no consent machinery for anyone else, so third-party subjects are refused.
- **Without a subagent facility, the real panel cannot run.** The fallback — one context playing all eight roles — exists, needs explicit agreement, and is labelled in the profile as not the real panel.

## Install

Copy or link the `delta-profile/` folder into your harness's skill directory. On Windows, a junction avoids the copy and keeps the repo as the source of truth:

```
mklink /J "%USERPROFILE%\.qoder\skills\delta-profile" "C:\path\to\delta-profile-skill\delta-profile"
```

On skills.sh:

```
npx --yes skills@1.5.22 add <owner>/delta-profile-skill@delta-profile -g -a qoder -y
```

Then reload the harness's skills and invoke the skill (`/delta-profile me`).

## Provenance

Every prompt string in the skill is copied verbatim from the engine it was extracted from, except where `PROVENANCE.md` lists a deliberate restatement. `PROVENANCE.md` records the source commit, and `scripts/check-quotes.mjs` re-checks the quotes against a checkout of the engine whenever either side moves:

```
MMC_DELTA_REPO=<path to the engine checkout> node scripts/check-quotes.mjs
```

## License

MIT — see `LICENSE`.
