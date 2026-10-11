# Schemas

Field names, constraints and enum values are verbatim from the engine's `backend/app/schemas/agent_output.py`; the provenance script checks the shapes this file documents. Keys stay in English in every run; free-text values are written in the run language chosen at Stage 0.

## The reader frame

Every reader returns one JSON object:

```json
{
  "agent_name": "one of the eight names, exactly",
  "confidence": 0.0,
  "data_quality": "low | medium | high",
  "reasoning": "the only field that may quote the person",
  "analysis": {}
}
```

## Analysis fields

**AstrologyAnalysis** (chrono_astrologer)
`has_birth_data` bool · `sun_sign` str|null · `moon_sign` str|null · `ascendant` str|null · `dominant_element` "fire"|"earth"|"air"|"water"|null · `element_balance` {fire, earth, air, water: number}|null · `key_aspects` [str] · `cycle_summary` str
Without a pasted chart: `moon_sign`, `ascendant`, `element_balance`, `key_aspects` stay absent and the confidence clamp applies — see `readers.md`.

**ElementalAnalysis** (elemental_physician)
`temperament_primary` "sanguine"|"choleric"|"melancholic"|"phlegmatic"|null · `temperament_secondary` same|null · `dosha` "vata"|"pitta"|"kapha"|null · `energy_gain` str · `energy_loss` str · `stress_reaction` str

**EnneagramAnalysis** (enneagram_reader)
`core_type` 1–9|null · `wing` 1–9|null · `core_fear` str · `core_desire` str · `integration_type` 1–9|null · `disintegration_type` 1–9|null

**BigFiveAnalysis** (psychometrician)
`openness`, `conscientiousness`, `extraversion`, `agreeableness`, `neuroticism` — each 0.0–1.0 or null. Absent, not average: five nulls are a finding, not a failure. · `summary` str

**JungAnalysis** (jungian)
`mbti_type` str|null — exactly four letters; anything else is discarded · `dominant_function` "Ni"|"Ne"|"Si"|"Se"|"Ti"|"Te"|"Fi"|"Fe"|null · `auxiliary_function` same|null · `archetypes` [str] · `persona` str · `shadow` str

**SocionicsAnalysis** (socionist)
`sociotype` str|null — three-letter code, e.g. ILE · `quadra` "Alpha"|"Beta"|"Gamma"|"Delta"|null · `dual_type` str|null — three-letter code · `communication_style` str

**AttachmentAnalysis** (attachment_theorist)
`primary_style` "secure"|"anxious"|"avoidant"|"disorganised"|null · `secondary_style` same|null · `trust_building` str · `stress_behavior` str — the field name keeps the engine's spelling, which is American in code and British in prose everywhere else

**SpiralAnalysis** (developmental_psychologist)
`current_level` "beige"|"purple"|"red"|"blue"|"orange"|"green"|"yellow"|"turquoise"|null · `in_transition_to` same|null · `core_values` [str]

## The synthesis

The orchestrator returns it as the `synthesis` key of the folded object (see `debate-roles.md`):

```json
{
  "purpose": {
    "for": "",
    "evidence": { "sources": [], "thin_areas": [], "overall": "" },
    "reading_the_numbers": "",
    "reading_the_types": "",
    "how_to_use": "",
    "not_for": []
  },
  "delta_signature": { "archetype": "", "mode": "", "style": "", "stress_pattern": "" },
  "character": {
    "how_they_think": { "reading": "", "evidence_base": "", "handles": {} },
    "how_their_energy_runs": { "reading": "", "evidence_base": "", "handles": {} },
    "what_drives_them": { "reading": "", "evidence_base": "", "handles": {} },
    "how_they_are_with_people": { "reading": "", "evidence_base": "", "handles": {} },
    "what_they_hold_to": { "reading": "", "evidence_base": "", "handles": {} },
    "what_they_show_and_keeps_back": { "reading": "", "evidence_base": "", "handles": {} }
  },
  "layers": {
    "chrono_astrologer": { "evidence_strength": 0.0, "data_quality": "", "summary": "", "analysis": {} }
  },
  "how_to_work_with_them": {
    "how_to_brief": "", "how_to_disagree": "", "what_they_need": "",
    "what_they_give": "", "under_strain": "", "makes_it_worse": ""
  },
  "conflicts_resolved": [ { "where": "", "description": "", "resolution": "" } ],
  "open_questions": [],
  "follow_up_questions": [ { "question": "", "target_layer": "", "reason": "" } ],
  "profile_summary": ""
}
```

Notes:

- `purpose` carries what the profile is best used for, chosen at Stage 0 and written out: what it is for, what evidence it rests on and where that evidence is thin, how to read the floats and the type handles, how to use it, and what it is not for.
- `character` follows `character.md`: six sections, each with the reading, the evidence base and the handles with their bands. The coverage gate applies — every layer cited somewhere, or the missing layer explained.
- `layers` holds one entry per reader that ran, keyed by the reader's name. A reader that failed verification twice gets no entry — its absence is disclosed in `purpose.evidence.overall` and the run report instead. `evidence_strength` is the float behind the band.
- `follow_up_questions` — at most two. Stage 4 asks them verbatim.
- `conflicts_resolved` mirrors the ledger rows that the synthesis actually used.
- `open_questions` includes every interview question the person declined, and every contradiction the evidence tied on.
