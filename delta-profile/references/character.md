# The character sections

The synthesis builds six sections. Each cites the layers it was read from, so the person can see which panel members stand behind which sentence.

## The sections and their layers

| Section | Read from |
|---|---|
| `how_they_think` | jungian, psychometrician, socionist |
| `how_their_energy_runs` | chrono_astrologer, elemental_physician |
| `what_drives_them` | enneagram_reader, psychometrician |
| `how_they_are_with_people` | attachment_theorist, socionist |
| `what_they_hold_to` | developmental_psychologist, enneagram_reader |
| `what_they_show_and_keeps_back` | jungian, enneagram_reader, attachment_theorist |

## What a section contains

- **The reading** — the synthesis's own words, in the run language. What the person is like in this respect, written specifically enough to be wrong.
- **The evidence base** — which layers contributed and how well each was evidenced.
- **The handles** — the type labels the layers produced: the MBTI letters, the Enneagram number with wing, the sociotype, the attachment style, the Spiral level, the temperament. Always with their evidence band, never alone. "INTP (partly-evidenced)" is a claim with a stated basis; "INTP" is a horoscope.

The purpose chosen at Stage 0 decides which sections get the most space, and who `how_to_work_with_them` addresses — see SKILL.md.

## The coverage gate

Every one of the eight layers must be cited by at least one section, or the profile must say, in the section that would have used it, why the layer was left out — a layer missing without a sentence is a run that lost a reader and pretended otherwise. A layer recorded as not run (verification failed twice) is disclosed in its section and in the run report.

## Evidence bands

Where a person reads, bands replace the floats. They are the engine's confidence rule 3, spoken in words:

- **well-evidenced** — evidence strength 0.8 and above: several explicit spans carry it;
- **partly-evidenced** — 0.5 to 0.7: one clear span, or several indirect ones;
- **inferred** — 0.4 and below: the framework doing more of the reading than the text.

The floats stay in `profile.json`, where a machine reads them. A band in `profile.md` never appears without the material behind it: a section names its handles' bands and its evidence base in the same breath.
