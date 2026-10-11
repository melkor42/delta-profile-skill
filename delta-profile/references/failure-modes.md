# Failure modes

What to do when a run goes sideways. The rule behind the table: disclose rather than paper over, and a re-issue is one re-issue — a second failure is a fact about the run, recorded as one.

| What you see | What it means | What to do |
|---|---|---|
| A reader returns prose, or JSON wrapped in code fences | Rule 5 ignored | Re-issue once, quoting rule 5's first sentence verbatim. Second failure: record the layer as not run, disclose it in the profile and run report. |
| A reader's analysis echoes a type label straight out of the evidence | Rule 4 ignored | Re-issue once, quoting rule 4. Second failure: layer not run. |
| `confidence` ≥ 0.5 with no quoted span in reasoning | Rule 3 misread | Re-issue once, quoting rule 3's first sentence. Second failure: layer not run. |
| The astrologer returns positions, aspects or an ascendant with no pasted chart | The clamp was not applied | Do not re-issue: the main agent enforces the clamp itself — cap confidence at 0.35 without birth data, null the invented fields, set `has_birth_data` false. Never ask the reader to police its own clamp. |
| Six or more readers report `data_quality: low` | The dossier is too thin, not the readers | Go back to Stage 1b, interview the thin areas, re-run the low readers on the deepened dossier, then fold. |
| The dossier is still thin after the interview | The evidence that exists is all there is | Fold anyway. Low layers carry low `evidence_strength`, the profile says where it is thin, and the follow-up questions are the designed outcome, not a failure. |
| The folded synthesis cites something that appears in no round | The fold invented | Challenge the orchestrator once, naming the citation. Second failure: split — debater returns rounds and ledger, a fresh synthesiser writes the synthesis from those alone. Disclose the split. |
| Ledger rows and the synthesis's claimed resolutions disagree | The fold gate, arithmetic side | Same as above: challenge once, then split. |
| A reader names a model, a provider or an error string in its output | Environment leaking into the reading | Strip it from anything a person reads; the run report may carry it. A profile is about the person, not the plumbing. |
| The subject is not the person invoking the skill | Boundary 1 | Refuse, and say why: the consent this version accepts is the subject's own. |
| A store turned out to hold another person's material | Boundary 2 crossed mid-read | Stop reading it, say what happened in the run report, and leave what was already read out of the dossier. |
| Session logs were named as an evidence store | Contamination path: logs talk about the profiling system, hold credential-like strings, carry other people's words | Read filtered, never whole — exclude that vocabulary, those strings, those words. Skip entirely if it cannot be filtered confidently, and say so. |
| The harness has no subagent facility | The real panel cannot run | Ask for explicit agreement to the labelled single-context fallback; record the label in the profile and the run report. Never slip into it silently. |
| The harness has no memory facility | The pointer cannot be written | Skip the write; print the pointer and say where it would belong. |
| A reader's voice or task has drifted from `readers.md` | The skill was copied from the engine and the engine moved | Re-copy from the engine's `frontend/src/content/howItWorks.ts` — its `test_identifier_contract.py` pins that copy to the engine's prompts — bump `PROVENANCE.md`, run `scripts/check-quotes.mjs`. |
| The person asks for a second follow-up round | The cap exists on purpose | Refuse, and say why: the profile is meant to be re-run fresh on new evidence later, not extended in place. |
