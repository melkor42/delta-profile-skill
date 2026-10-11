---
name: delta-profile
description: Build a deep profile of a person — normally the one invoking it — by gathering evidence from the harness's own record and running eight independent readers over it (cycles and astrology, temperament, Enneagram, Big Five, Jungian typology, Socionics, attachment, developmental values), then moderating their debate into a character reading and a report on how to work with them. Use when the user asks for a delta profile, wants to understand how they tick or what they need, or asks an agent to know them better. Writes files to disk. Not for matching two people, scoring teams, or analysing code.
argument-hint: <subject — "me">
disable-model-invocation: true
---

# Delta Profile

Eight readers, one person, one profile. Eight independent agents read the same evidence, blind to one another, through frameworks that run from temperament to attachment theory; a moderator folds their three-round debate into a single synthesis. What comes out is a character reading the person can argue with, and a report on what working with them asks of the people and agents around them. The panel comes from a matchmaking engine that scored pairs of people for psychological synergy; the readers and the debate survive here, the scoring does not.

This file is the run procedure. The references are the instruments, and a stage that skips them is guessing: `references/readers.md` holds the eight voices and tasks, verbatim — a reader that does not sound like itself is not doing its job, the tone is part of the instrument. `references/debate-roles.md` holds the pair structure, the moderator stances and the folded-debate protocol. `references/dossier.md` governs how evidence is gathered and labelled. `references/schemas.md` holds what every reader returns and what the synthesis returns. `references/character.md` maps the character sections to the layers. `references/output-files.md` lists what lands on disk. `references/failure-modes.md` is the recovery table for a run that goes sideways.

## What a run is for

The run carries one of three purposes, chosen at Stage 0 and written into the profile:

- **Working with an agent** — the default. The profile becomes context for the harness and its agents: how to brief this person, how to disagree with them, what they need and what they give. `how_to_work_with_them` is written to a reader that is not the person.
- **Self-reflection** — the profile is for the person themselves. The character sections get the space, and `how_to_work_with_them` turns round: written to the person, as what to ask of the people around them.
- **Working with people** — the person intends to share the profile with people they work alongside. `how_to_work_with_them` is written for those people, and the person has read it first.

The purpose shapes depth and emphasis in the synthesis — which character sections get the space, who the work-with-them section addresses. It never changes what the eight readers see: same evidence, same voices, for every purpose.

## Hard boundaries

1. **One subject, who asked for it.** The subject is the person invoking the skill. A profile of anyone else — a name handed over by a third party — is refused: their record was never offered, and this version takes no consent but the subject's own.
2. **Never read another person's files or records.** Contact books, correspondence with named individuals, anyone else's accounts. If a store turns out to hold other people's material, stop reading it and say what happened.
3. **Never carry a third party's words into the dossier.** A quoted sentence from someone else, however relevant, stays out; describe the exchange in the subject's own words instead, or leave it out.
4. **Never read financial or identity documents.** Bank statements, payslips, tax records, passports, identity papers — whatever the filename promises.
5. **Never read material about the profiling system itself.** Skill files, engine code, past profiles of the subject. A framework name arriving in the evidence anchors the reader whose job was to derive it.
6. **Ask before reading anything not obviously about the subject.** Un-named stores, memory directories, session logs: name what the store is, what will be taken from it and what will be excluded, and wait for a yes. A store that cannot be described in one sentence is a store to ask about.
7. **Ask before writing.** The dossier and the profile go where Stage 0 agreed — the working directory if nothing else was agreed. A harness memory facility receives the pointer only after an explicit yes. A previous profile is archived or overwritten only as Stage 0 agreed.
8. **Quotation lives only under `private/`.** Everything quoting the subject's own words — the dossier, the readers' reasoning, the run report — stays under `private/`. `profile.md` and `profile.json` carry none of it, and the Stage 5 gate string-matches to prove it.

## Stage 0 — Ask first

Put these to the person in one message before anything is read. A question the invocation already answered may be skipped; the answers are recorded in the run report.

1. **Subject.** Confirm the profile is about the person invoking. Anything else is refused under boundary 1.
2. **Purpose.** One of the three above. Default: working with an agent.
3. **Run language.** The language of the profile and of every reader's free text. Default: the language of the person's own writing — their commits, their documents — not the language of the harness's notes about them.
4. **Where the output goes, and what happens to a previous profile.** A directory; the working directory if they have no preference. If a previous profile is there: archive it or overwrite it.
5. **The pointer.** May the harness's memory facility, if it has one, receive a ~40-word pointer to the profile? Without a facility the pointer is printed for the person to place by hand.
6. **Birth date and time, and a computed chart if one exists.** Optional. What the astrologer may and may not do with each level of answer is in `references/readers.md` — the short version: positions are never invented.
7. **Evidence stores.** Which places hold material about them — files, directories, memory, session logs. Propose what is visible from here, ask about every store that was not named, and record each store's one-sentence description.

## Stage 1 — Gather

Spawn one to three read-only gatherers, scoped by source rather than one over everything. Each reads only what it was scoped to, spawns nothing, and returns verbatim quote spans — never summaries, because a paraphrase starves all eight readers at once. Every span carries its source and a genre label: a CV is self-presentation, commit messages are the working voice, memory notes are instructions given to agents, session logs are behaviour under friction. Type labels are stripped at this door; thin areas are named plainly rather than padded. The full protocol, and the text the gatherers receive, is `references/dossier.md`.

## Stage 1b — Interview the gaps

Where the dossier is thin on an evidence area — the gatherers name the thin areas, and a store that was declined leaves one — put it to the person directly, in plain conversation, using the question bank in `references/dossier.md`. Never fill a gap by inference, and never push a declined question: it becomes an open question in the profile instead. An hour of the person talking about how they actually work is worth more than any amount of the harness guessing around it.

## Stage 2 — Eight readers

Spawn all eight readers as subagents of your own, together, and hand each the same dossier. The prompt each receives is assembled in `references/readers.md`: the mission line, the peer-blindness paragraph, its own voice and task, the five rules, its schema from `references/schemas.md`, and the run language. They read nothing and spawn nothing; they interpret what they are handed.

Verify every response before it counts: valid JSON; `agent_name` exactly as expected; every enum value from its list; no quotation in any analysis field; a confidence of 0.5 or above backed by at least one quoted span in reasoning. The astrologer's clamp is enforced here, not asked for in the prompt: without a birth date, cap that reader's confidence at 0.35 and set `has_birth_data` false; without a pasted chart, the moon sign, the ascendant, positions, aspects and element balance are absent — absent, never invented. A sun sign derived from a supplied date is a calendar lookup: permitted, flagged as uncomputed, and withheld within two days of a cusp. A reader that fails verification is re-issued once with the failing rule quoted; a second failure records the layer as not run, and the run continues — a missing layer is disclosed in the profile, never papered over.

If six or more readers report `data_quality: low`, the dossier itself is too thin: go back to Stage 1b, interview the thin areas, and re-run the low readers on the deepened dossier before folding.

## Stage 3 — The debate, folded

One orchestrator subagent takes the verified readings and runs the whole debate in a single pass, returning round1, round2, round3, ledger, synthesis in that order. The pair structure, the moderator stances and the protocol are in `references/debate-roles.md`. Contradictions are resolved by the strength of the evidence behind each finding — never by weighting — and a tie stays open and is reported as one.

Then check the fold mechanically before accepting it: the synthesis may cite only round1, round2, round3 and ledger; every conflict the synthesis says it resolved must name the round where it surfaced; the ledger must hold exactly as many rows as the synthesis claims to have resolved. A failure is challenged once, with the specific failure named; a second failure splits the stage — one debater runs the three rounds, a fresh synthesiser sees only the rounds and the ledger — and the split is disclosed in the run report.

## Stage 4 — Follow-up questions, at most two

If the synthesis marks layers thin or proposes questions worth asking, put at most two to the person, in the synthesis's own wording. Never ask for something the dossier already holds — check first; a question the evidence answers is the run wasting its one chance. Then re-run Stages 2 and 3 whole: all eight readers on the deepened dossier, then the debate again, replacing the previous readings entirely. A second follow-up round is refused — the profile is meant to be re-run fresh on new evidence later, not extended in place.

## Stage 5 — Write, and the privacy gate

Write what `references/output-files.md` lists: `profile.md` for the person, `profile.json` for machines, and under `private/` the dossier, the readers' full responses, the debate and the run report. `profile.md` carries evidence bands — well-evidenced, partly-evidenced, inferred — where `profile.json` carries the floats behind them; type handles appear in both, always with their band, never alone.

Before anything lands outside `private/`, run the privacy gate: string-match every quoted span from the dossier against `profile.md` and `profile.json`. A single hit is quotation that leaked — reword or remove it and run the gate again. Both files pass with zero hits or they do not get written.

Archive or overwrite the previous profile exactly as Stage 0 agreed.

## Stage 5b — The pointer

If Stage 0 agreed and the harness has a memory facility: write a pointer of about forty words — where the profile is, what it is for, when it was made. No quotation, no reference to anything under `private/`. Without a facility, print the pointer and tell the person where it would belong.

## Stage 6 — Run report

Write the run report under `private/`: what was read and what was skipped, which stores were refused, what was thin, which readers failed verification, whether the fold held or split, the follow-up questions and what their answers changed, and the open questions. It ends with one question put to the person:

**What is wrong with this reading?**

The answer is stored beside the report. Whether it joins the evidence of a future run is the person's decision at that run's Stage 0 — it is their material, not a profile the next run would be reading.

## If the harness has no subagents

The readers' blindness is what makes the debate worth having: eight voices that can see each other converge before the disagreement has done its work. Without a subagent facility the real panel cannot be run. The fallback — one context playing all eight roles in sequence and the debate in the same context — needs the person's explicit agreement, and is labelled as not the real panel in both the profile and the run report. Offer it; never slip into it silently.
