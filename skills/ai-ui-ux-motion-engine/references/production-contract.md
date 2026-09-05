# Repeatable production contract

Use this for flagship work in a fresh task. It is subject-neutral: watches,
webpages, buildings, abstract materials and process diagrams may need different
tools. The goal is repeatable decisions and honest acceptance, not a guaranteed
perfect generative sample. The scripts enforce record/file invariants; they do
not visually inspect scenes, authenticate user approval, or block other tools.

## First response and reference analysis

Report loaded workflow version/path, the intended audience takeaway, what moves,
how input controls it, the likely route and the next visible proof. Use existing
context and authority. Ask only for missing information that materially changes
the outcome. Do not ask the owner to choose an implementation they hired you to
determine, promise perfection, or start with a long intake form.

Inspect the relevant moving sections of a video, the prompt shown on screen,
description links and transcript where available. Record time ranges and what
was unavailable. Separate observed implementation from inference. A watch
assembled with a slider and drag-to-orbit may be a procedural Three.js scene;
screenshots alone do not prove that it is a generated scroll video. Translate
its useful principles to the requested subject and interaction.

Preserve the user's original request alongside the interpreted shot plan. For
each requirement, name a visible test and the chapter(s) that demonstrate it.
Judge the effect between poses: persistent component identities, trajectories,
overlap, depth/occlusion, camera path, pause readability and the final payoff.
Never equate more encoded frames or more assets with more intricate motion.

## Select the route and models

| Need | Candidate route | Evidence required |
| --- | --- | --- |
| Exact components, free viewpoints, deterministic reversal | Procedural/real 3D, authored layers or compositing | Actual geometry/layers, hardest motion segment and target-device rendering |
| Photographic change with tolerable inference | Generated image/video | Consistent identities, current conditioning controls and a bounded continuity proof |
| Actual product mechanics | CAD, footage or verified composition | Source geometry/counts and visible mechanical constraints |
| Text, UI actions and exact endpoint | DOM/vector layers, optionally over media | Exact typography/layout and working interaction |

Keep impact tier independent of technique. Local 3D can fulfil a flagship without
a provider. AI video can produce complex motion from flat references; never claim
that a flattened pack guarantees it or that every such pack is unsuitable.
An authored compositing route, however, must actually have controllable layers.

Choose the coding/reasoning model and media provider separately. Use a capable
visual lead for interpretation and QC. Report the actual active model/capability
when observable; do not claim to have switched models through a skill. Respect
the user's model/provider choice. Otherwise compare plausible available routes
against required controls, image/text fidelity, latency, local compatibility and
current total cost. Neither newest nor most expensive means best. For provider
work, inspect current official schemas/account capabilities and quote the exact
settings and inputs. Refresh on resume or change; the executable limit is 24
hours and provider expiry may be shorter. Local authoring skips provider checks.

## Brief schema and planning stage

Copy `assets/cinematic-brief.example.json` and replace the example, including its
unresolved state. The supplied example is a planning template, not authorisation
or verified source evidence. Run:

```bash
node scripts/validate-cinematic-brief.mjs brief.json --stage plan
```

In addition to the existing identity, shots, look and delivery fields, record:

- `intent.audienceTakeaway`, `requiresIndependentMotion` (boolean),
  `durationRange: {min, max, reason}`. The range follows the user/scenario, not
  a fixed tier duration.
- `editing.mode`: `continuous` or `cuts`. Scroll defaults to continuous.
  Authored cuts need `editing.reason`. A chapter does not imply a cut or hold.
- `production.execution`: `local` or `provider`; `technique` accurately names
  `procedural-3d`, `code-native`, `cad`, `compositing`, `real-footage`,
  `image-to-video`, `multi-shot-generation`, `illustrative-burst` or `hybrid`.
  A provider contribution to authoring requires `providerRole`.
- `sourceCoverage.representation`: `flattened`, `layers`, `geometry`, `footage`
  or `mixed`. `production.feasibility`: `{status, rationale, unresolved,
  evidenceId}` with status `verified`, `experiment` or `blocked`.
- Each `shots[]` entry includes `communicates` and `componentActions` containing
  `{id, action}` for independently moving groups. Give their paths, timing,
  interaction and causal purpose in action text, with identity stable across
  chapters. Do not manufacture meaningless extra groups to pass a count.
- `planning.requirements`: `{id, requirement, shotNames, acceptance}` entries
  linked to actual chapter names. Every chapter must map to a requirement.
- `planning.referenceReview`: `{kind, source, status, workflowEvidence}`.
  kind is `video`, `images` or `written`; status `complete` or `partial`;
  workflowEvidence `observed` or `unknown`. Video also needs `evidenceId`,
  `inspectedRanges`, `transcriptStatus` and `descriptionStatus`.
- `planning.selection`: `{reason, alternatives: [{name, reason}]}` and, before
  provider submission, `checkedAt` (ISO timestamp) and `evidenceId` for the
  current model/schema/route comparison.
- `planning.evidence`: `{id, file, sha256, purpose}` records. Paths are relative
  to the brief. Use SHA-256 of the actual file; never invent approval or hashes.
  `--check-files` checks these files and all reference inputs even during planning.

Local work continues from a valid plan to a private proof without generating a
provider prompt. A blocked/partial plan may support source preparation, not
spending or an assertion that production is ready.

## Exact provider submission stage

First review the prepared images or another useful preview. Build an animatic
only when unresolved choreography or precision makes it useful; do not require
a second full animation before every generated proof. Reuse owner-approved
direction and existing spending authority. An experiment needs disclosed risk
and authority for that experiment, not an invented claim of verified feasibility.

Render a draft with `render-cinematic-prompt.mjs brief.json --mode flagship`.
The renderer calls the planning validator and preserves `editing.mode`. Adapt
its text to actual provider limits; save the final prompt in the payload so the
quote and review apply to what will be submitted. Never modify a gate to pass.

Save a canonical payload JSON with `model`, final `prompt`, `params` (including
`count: 1` and numeric `duration`), and `medias: [{role, value, sourceFile}]`.
`value` is the verified provider media ID. `sourceFile` binds it to the local
input. These are audit fields: map to the provider's documented argument names,
do not pass local bookkeeping fields to an endpoint that does not accept them.
For verified text-only models set `provider.referenceMode: "text-only"` and
`medias: []`; retain the hashed written brief/reference in the input manifest.

Record `provider.model`, exact `provider.params`, connected route, terms state,
`creditsApproved` (total cap), and `attemptLimit` (1 or 2 within user authority).
Add `generation`:

```text
payloadFile, payloadSha256
inputFiles: [{file, sha256}]
previewEvidenceId, previewReviewed
authorityEvidenceId, risksAccepted
uncertaintyTested, stopCondition, changedSincePreviousAttempt
attemptsUsed, spentCredits
quote: {credits, checkedAt, payloadSha256, evidenceId}
```

Evidence IDs link to `planning.evidence`. The quote evidence must reflect the
same payload; copying a hash onto an unrelated quote does not make it valid.
Inputs, payload and evidence hashes are checked before submission:

```bash
node scripts/validate-cinematic-brief.mjs brief.json --stage generate --check-files
```

Stop if this fails. A passing plan, rendered draft, warning waiver, file count
or provider availability is insufficient. Submit one matching request; record
job ID, actual spend and raw output. Never auto-retry. Diagnose what failed and
record a concrete correction before any authorised retry. Hashes prevent stale
records from silently following changed files, not dishonest evidence creation.

## Acceptance and a clean-start test

Inspect normal playback/interaction and risky in-between transitions, including
reverse. Compare reference and candidate for the requested behaviours, purpose
and host fit. Record per-requirement pass/fail with time ranges and evidence.
Both creative and technical gates must pass; owner approval is tied to the
exact asset. A failed proof may be shown as rejected diagnostic evidence if
useful, but never called ready or installed in production.

The creative review schema requires `assetSha256`, `briefSha256`, and
`requirementResults: [{id, passed, observation, evidenceFile, evidenceSha256,
startSeconds, endSeconds}]` covering each requirement. Record
`creative.inBetweenMotionInspected`, `audienceTakeawayDemonstrated` and
`hostFitConfirmed` from actual inspection. Integration additionally requires
`ownerApproval: {file, sha256, assetSha256, briefSha256}` linked to the owner's
actual approval. For local 3D, bind the entry/source manifest and a captured
private proof; do not create a fake video to satisfy a media-only check.

For a clean-start test, invoke this installed skill with only a scenario, the
reference, destination and constraints. It should report its version, inspect
the actual reference, produce an honest route decision and private proof, and
stop before unsupported spend or unsupported success claims. Evaluate behaviour
and artifacts, not whether it recites the right headings. Automated regressions
can test these boundaries; they cannot prove visual excellence in every scenario.
