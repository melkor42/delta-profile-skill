# Output files

Everything is written where Stage 0 agreed — the working directory if nothing else was agreed — and nowhere else without asking. The layout:

```
<output directory>/
  delta-profile/
    profile.md           the reading, for the person
    profile.json         the machine mirror, floats included
    private/
      dossier.md         the evidence: sources, genre labels, verbatim spans, thin areas
      reader-<name>.json each reader's full response, reasoning included
      debate.md          the three rounds and the ledger, as returned
      run-report.md      the Stage 6 report, ending with the person's answer
```

## profile.md

For the person, in the run language. Its sections, in order:

1. **What this profile is for** — the purpose block: what it is best used for, what evidence it rests on and where that evidence is thin, how to read the bands and the type handles, how to use it, what it is not for.
2. **The delta signature** — archetype, mode, style, stress pattern: the whole reading in four words each.
3. **The character sections** — the six sections from `character.md`, each with reading, evidence base, and handles with their bands.
4. **How to work with them** — aimed per the purpose chosen at Stage 0.
5. **Conflicts resolved** — the ledger rows, in plain words: what contradicted what, and what decided it.
6. **Open questions** — declined interview questions and tied contradictions.
7. **How this run was made** — eight readers, the debate, any follow-up round, any layer recorded as not run, and the single-context fallback label if the run used it.

No quotation anywhere. Type handles only with their evidence band. The profile is one run's view: it names its date, and says nothing about any other run.

## profile.json

The synthesis object as returned — the floats unrounded, the layers with their `evidence_strength`. Same content as `profile.md`, in the schema's shape, for a machine or a future harness to read.

## private/

Everything quoting the subject's own words lives here and only here:

- `dossier.md` — the gathered spans with sources and genre labels, the thin areas, the interview spans the person contributed.
- `reader-<name>.json` — each reader's full response including `reasoning`, which quotes the person.
- `debate.md` — the rounds and the ledger as returned; they carry the readers' findings and so the person's words.
- `run-report.md` — the Stage 6 report, ending with the person's answer to "What is wrong with this reading?".

`profile.md` and `profile.json` must stay silent about this folder's existence beyond the word `private/` itself — a reader of the profile needs to know nothing that is in it.

## The privacy gate

Before `profile.md` or `profile.json` is written, and again before the pointer if it says anything beyond place and date: collect every span the dossier holds in quotation marks and string-match each against the file's full text. One hit is quotation that leaked — reword or drop the passage, run the gate again. Zero hits, or no write.

## Archiving

If a previous profile exists in the output directory: archive it exactly as Stage 0 agreed — move the previous `delta-profile/` folder to `archive/<date>/`, or overwrite it. Never mix two runs' files in one folder: each profile is one run's view, and a blended folder is two views, neither trustworthy.
