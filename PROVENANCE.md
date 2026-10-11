# Provenance

Every prompt string in this skill is copied from the engine it was extracted from, not written fresh — except where this file says otherwise. When the engine's strings change, re-copy from the source below, bump the commit recorded here, and run `scripts/check-quotes.mjs`.

**Source:** the MMC Delta engine, commit `b05e062dd27f52e8bbd54e544950605d0b557987` (2026-10-11).

The engine's frontend copy `frontend/src/content/howItWorks.ts` is pinned character-exact to the engine's backend prompts by the engine's own test (`backend/tests/test_identifier_contract.py`), so it is the single place to re-copy from. The engine's shared system prompt lives at `backend/app/pipeline/prompts/agent_system.j2`.

## Copied verbatim

- the eight readers' voices and tasks — sixteen strings, in `references/readers.md`;
- the peer-blindness paragraph — from the engine's shared system prompt, in `references/readers.md`;
- rules 1–4 of the five rules, and the first sentence of rule 5 — in `references/readers.md`;
- the three moderator stances — in `references/debate-roles.md`, kept with their phrase about matching people on purpose: it records where the panel comes from, and nothing in a run scores two people;
- the analysis field names, their constraints and every enum value — from the engine's `backend/app/schemas/agent_output.py`, documented in `references/schemas.md` (including `stress_behavior`, the one field whose code spelling is American while the engine's prose is British).

## Restated on purpose

- **The mission line.** The engine's said "You are the {{ title }} on a panel that matches people by psychological synergy: what would make two of them work well together." A run here has one subject and no pairing, so it says: "You are the {title} on a panel of eight readers producing one deep profile of a single person: what they are like, how they function, and what working with them asks of the people and agents around them."
- **Rule 5's second sentence.** The engine fixed British English ("Write every free-text field in British English"); a run here writes in the run language chosen at Stage 0.
- **The round headings and the orchestrator's identity line.** The engine's named the product; the skill's say "the panel". The orchestrator's resolution clause was restated with them — see below.
- **Contradiction resolution.** The engine resolved contradictions by fixed layer weights, which only make sense when two people are being scored against each other. Here the strength of the evidence behind each finding decides, and a tie stays open in `open_questions`.

## Derived here

The dossier protocol, the genre labels and the session-log filter; the interview question bank (adapted from the engine's participant-facing extraction prompts, which ask for evidence and forbid type labels); the folded-debate protocol, its mechanical gate and the escalation to debater plus synthesiser; the evidence bands; the character sections and their layer mapping; the coverage gate; the purpose block; the follow-up cap of two; the output files and the privacy gate; the pointer; the hard boundaries; and the whole of `references/failure-modes.md`.

## Maintenance

When the engine's prompt strings change:

1. re-copy the affected strings from the engine's `frontend/src/content/howItWorks.ts` (and `agent_system.j2` for the rules);
2. bump the source commit above;
3. run `MMC_DELTA_REPO=<engine checkout> node scripts/check-quotes.mjs` — it fails loudly on any quote that has drifted, any brand string that has leaked into the skill, and any frontmatter that has lost its shape.
