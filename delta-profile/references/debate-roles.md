# The debate

The eight readings go through three rounds — four pairs, then two clusters, then a plenary — before the synthesis is written. In a run these rounds are folded into one orchestrator subagent; the structure and the stances below are what that orchestrator is given.

## Pairs and clusters

**Round 1 — four pairs.** Two readers each, on where their readings agree and where they collide. Each pair discussion happens under the first moderator stance.

- `constitution` — chrono_astrologer + elemental_physician · "Constitution / Biology"
- `personality` — enneagram_reader + psychometrician · "Personality"
- `cognition` — jungian + socionist · "Cognition"
- `attachment` — attachment_theorist + developmental_psychologist · "Attachment / Development"

**Round 2 — two clusters.**

- `biology_personality` — "Biology ↔ personality: does the constitution support the motivation and trait findings?"
- `cognition_attachment` — "Cognition ↔ attachment: how do thinking style and relationship pattern fit together?"

**Round 3 — plenary.** The full panel, under the third moderator stance.

## The moderator stances (verbatim)

The three lines come from the engine unchanged, including the phrase about matching people: it records where the panel comes from, and nothing in a run scores two people.

- Round 1: "You are a neutral moderator on a panel that matches people by psychological synergy. You summarise, you do not sugarcoat and you add nothing that is not there."
- Round 2: "You are a neutral moderator on a panel that matches people by psychological synergy. You identify tensions between layers and add nothing that is not there."
- Round 3: "You are a neutral moderator on a panel that matches people by psychological synergy, and you voice each panel member's closing remark in that member's own voice."

## Round headings

De-branded from the engine's, which named the product:

- "ROUND 1 (pair discussion) of the panel."
- "You are moderating ROUND 2 (cluster discussion) on the panel."
- "ROUND 3 — full assembly of the panel."

## The orchestrator

The identity line, restated from the engine's own:

> You are the orchestrator of the panel. You collect the readings, run the three rounds under the moderator stances above, and write the synthesis. You resolve contradictions by the strength of the evidence behind each finding, but you invent nothing new.

The engine resolved contradictions by fixed layer weights — weights that only make sense when two people are being scored against each other. A single-subject profile has no pairing to weight for, so the strength of the evidence behind each finding decides, and where the evidence ties, the contradiction stays open: it goes into `open_questions` rather than being resolved for the sake of tidiness.

Everything the synthesis contains must be traceable to the rounds. The orchestrator summarises, does not sugarcoat, and adds nothing that is not there.

## The folded protocol

The orchestrator returns one JSON object with five keys, in this order:

```json
{
  "round1": { "constitution": "", "personality": "", "cognition": "", "attachment": "" },
  "round2": { "biology_personality": "", "cognition_attachment": "" },
  "round3": "",
  "ledger": [ { "where": "", "description": "", "resolution": "" } ],
  "synthesis": { "…": "the profile payload from schemas.md" }
}
```

- `round1` — the four pair discussions; each names the disagreements that surfaced.
- `round2` — the two cluster discussions.
- `round3` — the plenary, with each reader's closing remark in that reader's own voice.
- `ledger` — one row per contradiction the debate resolved: where it surfaced (round and pair or cluster), what the contradiction was, and how it was resolved.
- `synthesis` — the profile payload from `schemas.md`.

## The fold gate

Check the fold mechanically before accepting it:

1. The synthesis may cite only `round1`, `round2`, `round3` and `ledger` — nothing that appears in none of them.
2. Every conflict the synthesis reports as resolved names the round where it surfaced.
3. The ledger holds exactly as many rows as the synthesis claims to have resolved.

A failure is challenged once, with the specific failure named. On a second failure, split the stage: one debater subagent returns the three rounds and the ledger, then a fresh synthesiser subagent sees only the rounds and the ledger and writes the synthesis. The split is disclosed in the run report — a fold that could not hold is a fact about the run, not something to hide.
