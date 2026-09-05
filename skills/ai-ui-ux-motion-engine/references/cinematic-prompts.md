# Cinematic prompt contracts

Generate a draft prompt from a brief that passes the plan gate:

```bash
node scripts/render-cinematic-prompt.mjs <brief.json> --mode flagship
```

Use `--mode single` for a supporting action and `--mode illustrative` for a
creative transformation. A rendered draft is not permission to generate. Follow
[production-contract.md](production-contract.md) for the separate exact-payload
gate, source mapping, live settings and existing spend authority. Preserve the
rendered structure when adapting it to the provider's current schema; record
the exact submitted prompt and all input roles. No validator or prompt can
guarantee the resulting motion.

## Prompt-writing rules

- Give the subject one identity authority, or a documented authoritative source
  set when a single frame cannot establish it.
- State immutable identity, geometry and relevant counts before exclusions.
- Derive timed actions from the scenario's visitor takeaway. Each action must
  expose a relationship, decision, feature or result that matters to the brief.
- Separate object/component movement from camera movement. Where requested,
  name independent groups, overlapping movement, rotations, depth and parallax.
- Use `editing.mode: continuous` for a continuous scroll journey by default.
  Timed phases are parts of one shot, not requests for cuts or held stills.
  Use `editing.mode: cuts` only when distinct shots are explicitly intended.
- Use the requested duration. Add holds only where the composition needs one;
  do not impose a still checkpoint after every action.
- Use audio, text and exclusions appropriate to the brief. Silent is the default
  for scroll media; keep required readable text and actions in the DOM or exact
  compositing layers when generated typography cannot meet the truth target.
- Avoid blanket exclusions that forbid requested rotation, zoom or subject
  matter. Longer negative prompts do not repair incompatible sources.

## Continuous flagship contract

```text
Create one [DURATION] continuous cinematic sequence of [SUBJECT] for [PLACEMENT].
The viewer should understand [SCENARIO-SPECIFIC TAKEAWAY].

IDENTITY AND SOURCE ROLES
[AUTHORITY] establishes [IDENTITY DETAILS]. [OTHER REFERENCES] constrain
[NAMED DETAILS/STATES]. Preserve [IMMUTABLES]. A reference image is not a
guaranteed timed keyframe; follow the supported input roles below.

PROGRESSION — ONE UNBROKEN SHOT
[TIME WINDOW 1]: [START STATE]. [NAMED GROUP ACTIONS], while [OVERLAPPING ACTION].
The visible relationship reveals [MEANING]. Camera: [PATH AND FRAMING].
[TIME WINDOW 2]: Continue from the same state. [NEXT GROUP ACTIONS AND RELATIONSHIP].
The viewer now sees [MEANING]. Camera: [CONTINUING PATH AND FRAMING].
[FURTHER WINDOWS AS THE ACTUAL PLAN REQUIRES]
[FINAL WINDOW]: Resolve into [PAYOFF/FINAL STATE], making [TAKEAWAY] clear.

MOTION AND CONTINUITY
[GROUPS] remain recognisable during their individual [PATHS/ROTATIONS].
[DEPTH AND OVERLAPPING TIMING]. Preserve [COUNTS/GEOMETRY WHERE REQUIRED].
Maintain [LIGHT/BACKGROUND/COLOUR]. No cuts, dissolves or transitions between
held still-image compositions. [PROJECT-SPECIFIC EXCLUSIONS].

DELIVERY
[ASPECT], [RESOLUTION], [SUPPORTED FRAME RATE], [AUDIO SETTING], clean start/end.
```

This contract describes the expected output. A generator may not obey exact
timings or preserve every component. Inspect the proof against the plan before
accepting it. For exact movement or labels, choose a route with the required
control rather than claiming the prompt has enforced it.

## Authored-cut flagship contract

Use only when the approved direction calls for cuts. Keep identity and lighting
constraints from the continuous contract, replace the progression with named
shots, and specify each cut explicitly:

```text
Create one [DURATION] film with [SHOT COUNT] authored shots.
SHOT [N] — [START-END]: [SOURCE ROLE], [STATE/ACTION], [CAMERA], [VIEWER TAKEAWAY].
CUT [N TO N+1]: [EXACT EDITING INTENT].
Preserve [CONTINUITY RULES]. End with [PAYOFF].
```

Do not force a three-clip orbit/explosion/macro construction onto a continuous
reference. Separate renders can be appropriate when their join is deliberately
designed and verified; their availability alone does not justify the edit.

## Supporting single-action contract

```text
Create a [DURATION] shot of [SUBJECT/AUTHORITY]. Preserve [IMMUTABLES].
Begin at [START STATE], perform [ONE ACTION] using [PERMITTED AXES/PATH],
and finish at [END STATE]. This reveals [VIEWER TAKEAWAY].
Camera: [ONE CAMERA INSTRUCTION]. Light/background: [SETTING].
[OPTIONAL HOLD ONLY WHEN REQUIRED]. [PROJECT-SPECIFIC EXCLUSIONS].
Deliver [ASPECT], [RESOLUTION], [AUDIO SETTING].
```

## Illustrative burst/exploded-view adaptation

Use the continuous contract with the named groups, separation paths, rotations,
changing depths and desired reassembly. Specify whether parts keep a fixed
identity or may transform creatively. A pause or return to the opening
silhouette is optional, determined by the reference and story. Stylised
mechanics must not be presented as evidence of real product construction.

For reverse scroll, sample the same accepted timeline backwards. Reverse a
separation clip into a new reassembly film only after checking that reversed
motion remains credible, especially irreversible actions and changing text.

## Prompt failure diagnosis

- Identity drift: resolve conflicting source roles or coverage; more adjectives
  do not establish identity.
- Incorrect count or geometry: improve visible evidence and simplify occlusion;
  use a more controlled route if exactness is essential.
- Mechanical morphing: diagnose the unsupported intermediate state before
  deciding between source changes, a bounded retry or a different technique.
- Missing phase: compare actual time windows with the plan. Do not declare a
  required action optional after seeing the result.
- Three-image interpolation: examine sustained independent motion, depth and
  continuity across the whole proof. Re-encoding more frames does not fix it.
- Decorative spectacle: revise the visual causal story and payoff. Labels and
  surrounding UI cannot supply a relationship absent from the film.
- Weak impact: compare the observed reference and output at matched moments;
  change a specific source, movement, composition or capability before retrying.
