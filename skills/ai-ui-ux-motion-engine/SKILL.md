---
name: ai-ui-ux-motion-engine
description: Design, redesign, build, audit and validate distinctive production websites with cinematic scroll reveals, product films, burst or exploded-view effects, reference-led design systems, purposeful motion and multi-pass refinement. Use for landing pages, product sites, portfolios, interactive storytelling, premium or immersive web experiences, scroll-controlled product inspection, assembly or disassembly sequences, camera moves, image/video-led recreation, hero refinement, motion graphics, and anti-generic visual polish in Astro, React, Next.js, Vue, Svelte or static HTML/CSS. Infer cinematic intent from the requested experience or reference; the user does not need to say "wow" or name a tool.
---

# AI UI/UX Motion Engine

Workflow version: **1.8.1**. At the first use in a fresh task, report this
version and the loaded path. Read the new task's references and site context;
do not rely on prior chats or copy their subject, provider, price or acceptance.

Create a project-specific experience from evidence. Treat references as
structural, visual and interaction inputs, never as permission to clone
branding, copy, code or protected assets.

## Non-negotiable rules

- Read applicable `AGENTS.md`, source-of-truth documents, design systems and
  current working-tree changes before editing.
- Define the bounded target, acceptance criteria, dependencies, spend and
  validation plan.
- Use the fastest route that can meet the accuracy target. For real products,
  default to `evidence-accurate` when authoritative sources exist; never trade
  accuracy silently for spectacle. State early when CAD, compositing or real
  footage is required.
- Preserve the existing stack unless the user explicitly authorises a change.
- Label observations, facts, proposals, generated visualisations and unknowns.
- Keep content and actions usable without motion, JavaScript or unrestricted
  data use.
- Never claim cinematic parity, product accuracy, accessibility, performance
  or release readiness without direct evidence.
- Never configure a paid service, accept provider terms or spend credits
  without user authority.
- Never downgrade a requested full-screen, homepage or signature cinematic
  journey to a supporting shot. A camera rotation, dolly, zoom, parallax or
  static-image reveal is not a flagship.
- Separate impact from implementation: a procedural 3D scene can be a flagship.
  No video provider is required for local authoring. Choose tools after inspecting
  the reference and defining the subject, motion and accuracy requirements.
- A skill is guidance plus executable checks, not a guarantee of perfect output
  or a host-enforced tool firewall. Never fill passing booleans from intentions,
  equate a structural pass with visual quality, or promise an exact first render.

## Develop the brief with the user

For a new creative requirement, read [creative-briefing.md](references/creative-briefing.md)
before route selection or production. A short idea is an invitation to develop
the brief together, not permission to invent the user's purpose and call it agreed.
Use existing answers, suggest concrete interpretations, ask the next one or two
high-value questions, and revise a visible plain-language brief as ideas arrive.
Separate user requirements, creative proposals and unresolved decisions. The first
deliverable is an agreed, scenario-specific brief with meaning, visual progression,
interaction, constraints and observable success criteria. Record agreement to the
specific revision before production; existing explicit agreement counts. Brief
agreement is separate from spend authority. A small, fully specified fix or audit
does not need a discovery interview. Never turn briefing into a generic questionnaire.

## Mandatory cinematic-intent gate

Activate this gate whenever the request or reference implies any of:

- a cinematic, premium or immersive scroll experience;
- a product opening, assembling, exploding, bursting or transforming;
- a camera orbit, dolly, macro inspection or authored product journey;
- photographic motion controlled by scrolling;
- a reference whose impact comes from changing viewpoint or object state.

The user does not need to use a trigger word or know which tool is required.

Before editing the page:

1. Copy the user's requested outcome into `intent.requestSummary`; record the
   signature moment, progression, payoff, required effects and unacceptable
   substitutes. Do not rewrite the request around the easiest available asset.
   Record what the viewer must understand or feel (`intent.audienceTakeaway`).
   For a business/process story, connect movement to decisions or relationships;
   decorative labels and a finished object alone do not establish the message.
2. Classify truth mode:
   - `illustrative`: invented details are acceptable;
   - `identity-locked`: the same fictional or concept product must stay stable;
   - `evidence-accurate`: visible counts, geometry, labels and mechanics must
     match authoritative product evidence.
3. Confirm the reference or desired scenes, available source images or CAD,
   number and placement of flagship/supporting moments, target devices, media
   provider access and permitted credit/attempt cap.
   If the reference is a video, inspect keyframes plus any available transcript,
   prompt pack and description links; do not reconstruct its workflow from a
   summary or isolated screenshot.
   Distinguish camera movement, object movement and the interaction that controls
   each. A draggable 3D scene, slider and scroll-scrubbed film are different.
   Record observed implementation versus unknowns. If access is incomplete,
   continue useful preparation but do not claim reference parity or spend on
   an assumed workflow.
   If a web fetch fails, try an available authorised browser or supplied recording
   before asking the user to resend an accessible reference.
4. State the dependency plainly. Photographic camera movement or physical
   transformation requires suitable source media plus an image/video
   generation, 3D or compositing route. CSS cannot invent unseen product views.
5. If the required provider or source material is unavailable, stop the
   cinematic asset work. Offer the static layout/fallback honestly; never
   substitute fades, zooms or stock background video and call it equivalent.
6. Create a cinematic brief from
   `assets/cinematic-brief.example.json`, validate it with
   `scripts/validate-cinematic-brief.mjs`, and obtain spend/terms authority
   before generation. Do not upload after a failed source/plan check or spend
   after a failed generation check. Authorised uploads may supply the media IDs
   needed for the final quote; uploads themselves do not authorise generation.
   Read [production-contract.md](references/production-contract.md) fully.
   Map each requirement to timed chapters and observable checks, name independent
   component actions when required, and record the actual source representation.
   Review the cheapest useful visual checkpoint for unresolved direction: existing
   approved references, styleframes or an animatic. Do not demand all three or
   request approval again when the user's existing authority covers the action.
7. Produce one isolated private proof of the signature moment before redesigning
   the page or generating the full library.
8. Reject drift with automated technical checks and an overview contact sheet.
   Sample only risky transitions densely; inspect every frame only for a
   detected defect or evidence-critical mechanics. Use at most the approved
   attempts; then simplify the action, change technique or report the blocker.
9. Create a creative-review JSON from
   `assets/creative-acceptance.example.json` and run
   `scripts/validate-creative-acceptance.mjs`. Technical media validation does
   not prove narrative, impact or creative acceptance.
10. Integrate only an owner-approved asset after the creative validator passes
   with `--stage integration`. Never put a weak proof into a live hero to
   see whether surrounding UI rescues it.

### Executable flagship gate

Treat a requested full-screen, homepage, hero, signature, immersive, intricate,
burst, exploded or authored scroll journey as `flagship` unless the user
explicitly requests a smaller supporting shot. Before any paid generation run:

```bash
node scripts/validate-cinematic-brief.mjs cinematic-brief.json --stage plan --check-files
node scripts/render-cinematic-prompt.mjs cinematic-brief.json --mode flagship
node scripts/validate-cinematic-brief.mjs cinematic-brief.json --stage generate --check-files
```

The validator must reject a tier downgrade, a camera-only story, a missing
beginning/progression/payoff, insufficient source coverage, a missing requested
transformation and an unverified provider route. Do not bypass it by writing a
manual prompt.

The renderer emits a draft and invokes the planning validator itself. The
generation stage binds current capability/quote evidence, reviewed previews,
authority, source hashes and the exact payload; changing them requires recheck.
Submit only that payload, adapting documented provider field names without
changing its contents. Never patch/copy a validator to turn a failure into a pass.
Use `editing.mode=continuous` for continuous scroll journeys; use cuts only when
the reference or agreed direction requires them. Honour the recorded duration
range rather than forcing 10–15 seconds. Neither gate independently understands
visual evidence or intercepts a direct MCP call; the agent must honour it.

After generation, record visual evidence and run:

```bash
node scripts/validate-creative-acceptance.mjs creative-review.json --stage review
```

Use `--stage integration` only after the owner approves the exact private
proof. Never use a passing codec, keyframe, contact-sheet or scroll-delivery
check as evidence that the creative brief passed.

### Programmatic provider rule

Preserve the user's explicit tool/provider choices. Otherwise use structured
provider access before browser control. For Higgsfield in Codex:

1. prefer the authenticated Higgsfield CLI;
2. use Higgsfield MCP in clients that expose the connector natively;
3. use a supported API when the account exposes one;
4. use browser control only for a required control unavailable through all
   programmatic routes, and record that exact limitation in the brief.

Run `scripts/higgsfield-preflight.mjs` for the CLI route; a connected native MCP
route uses its own read-only account/capability/quote tools. Do not install or
authenticate a second route merely to satisfy this script. Local authoring skips
external-provider preflight. Read
[tool-connections.md](references/tool-connections.md) completely before
provider work.

For an undeveloped idea, start with the creative briefing conversation above.
Once the direction is understood, resolve missing production dependencies from
cinematic intake. Do not lead with models, source formats or credit caps while
the intended story remains unknown, or ask the user to choose implementation
details the skill can determine.

“First time” means selecting the correct professional route and bounded proof
immediately. It cannot guarantee that a stochastic provider’s first render
will pass.

When the creative brief is agreed but a production dependency is missing:

> I will prove the requested changing scene privately using the route supported
> by these references and accuracy needs. The remaining dependency is [specific
> missing input]. I can continue [independent preparation] while it is resolved.

Read [cinematic-intake.md](references/cinematic-intake.md),
[generated-product-scrubber.md](references/generated-product-scrubber.md) and
[cinematic-prompts.md](references/cinematic-prompts.md) completely when this
gate activates.

## Standard workflow

### 1. Establish the brief and baseline

Record goal, audience, routes, content/evidence rules, target devices,
framework, release boundary and current build/test state. Read
[workflow.md](references/workflow.md).

### 2. Extract references

Map composition, typography, colour, imagery, entrances, scroll, hover, drag,
camera movement, object state and timing. Distinguish reusable principles from
identity-specific material. For a local recording run:

```bash
bash scripts/extract-reference-frames.sh <video> <output-directory>
```

Read [media-pipeline.md](references/media-pipeline.md).

### 3. Lock one direction

Translate the agreed creative brief into seven implementable lines covering goal/audience, tone, composition,
typography, colour/media, motion/reduced-motion and one signature
differentiator. Do not proceed on “clean and modern” alone.

### 4. Select the architecture

Choose the lightest mechanism that preserves the intended experience:

- CSS for local state and entrance changes;
- Intersection Observer or native scroll animation for simple reveals;
- an existing motion library for coordinated component motion;
- GSAP for deliberate pinning/timelines;
- generated or filmed media for photographic camera/object change;
- all-intra video or canvas frames for exact scroll scrubbing;
- WebGL/3D for freely manipulable viewpoints or reliable exact mechanics.

For cinematic product motion, the changing scene is the experience. Prove it
first with generated media, authored layers, procedural 3D or footage as selected.
Three flattened frames may guide generated motion; they do not prove independent
control, continuity or exact text. Conversely, they are not evidence that AI
video cannot work. Declare unresolved feasibility and a bounded experiment, or
prepare controllable geometry/layers where precision requires them.

Use the lean scalable default:

- one master flagship per major journey;
- reuse approved chapters, crops and clean reversals where they stay truthful;
- add a 3–5 second supporting shot only for a genuinely new fact;
- use code-native motion everywhere else.

Target 15–30 minutes for a private proof when sources/provider are ready,
30–60 minutes for an approved flagship plus scroll delivery, and 5–10 minutes
for a derivative or supporting integration. Allow 75–120 minutes only for new
or inconsistent source packs, evidence-critical mechanics, CAD or compositing.
These are targets, not guarantees. If a timebox is exceeded, report the evidence
and next step. Seek new authority only for a material scope/spend change or an
explicitly agreed hard limit; continue work already authorised.

### 5. Implement in bounded passes

Build semantic content, macro layout, the approved signature motion,
micro-states, responsive composition and editorial polish. Keep text, labels
and actions in the DOM rather than baking them into generated media.

Prevent process bloat: prove media before page work; perform provider and
source research once per run; do not create multiple redesigns or documentation
passes before proof; run a focused component test first and the full regression
once after final integration; capture technical evidence automatically.

When the client/model supports subagents, default to parallel execution whenever
two or more independent streams exist and delegation saves time. Parallelise
source audit, provider capability/current cost, brief validation, media
preparation/QC, browser checks and documentation. Give visual interpretation,
truth mode, creative direction, spend and acceptance to the lead
high-capability multimodal model; use faster capable models for bounded
mechanical work. Never assign visual QC to a model that cannot inspect the
media, let agents edit the same files concurrently, or parallelise paid
generation, approvals or dependent steps. Rejoin before decisions.

### 6. Validate

After each component, test pointer, keyboard, touch, reduced motion, target
viewports, console/runtime behaviour and focused checks. For cinematic media,
also verify identity/count/geometry, first/end states, forward/backward scrub,
crop and fallback. Run the safety/package checks, and run media validation only
for a selected video delivery route (not an authored 3D/DOM scene):

```bash
node scripts/audit-motion-safety.mjs <project-directory>
node scripts/validate-scroll-media.mjs <shipping-scroll-master.mp4> \
  --poster <shipping-poster.jpg>
node scripts/validate-package.mjs
```

Fail closed: if the media validator fails, the poster reappears after the first
decoded frame, seeks overlap, rapid direction changes expose stale or blank
frames, the poster changes crop or scale against the first decoded frame, or
the film is only still-image crossfades, do not ship the scrubber. Use the
numbered canvas sequence or a static fallback until the complete gate passes.
Six settled checkpoints alone are insufficient.

Run the project’s full regression baseline before handoff. Read
[verification.md](references/verification.md).

## Resource routing

- [creative-briefing.md](references/creative-briefing.md): conversational discovery,
  evolving plain-language brief and agreement before production for any new idea.
- [production-contract.md](references/production-contract.md): fresh-task
  contract, evidence schema, route/model selection and pre-spend validation.
- [cinematic-intake.md](references/cinematic-intake.md): mandatory questions,
  pushback, tiers, spend and stop rules.
- [cinematic-prompts.md](references/cinematic-prompts.md): exact reusable
  single-action, flagship and illustrative prompt contracts.
- [generated-product-scrubber.md](references/generated-product-scrubber.md):
  cinematic production and scroll-delivery golden path.
- [media-pipeline.md](references/media-pipeline.md): references, ffmpeg,
  all-intra video, frames, posters and delivery.
- [tool-connections.md](references/tool-connections.md): provider preflight and
  external-tool boundaries.
- [motion-patterns.md](references/motion-patterns.md): code-native motion.
- [framework-recipes.md](references/framework-recipes.md): stack-specific
  implementation.
- [accessibility-performance.md](references/accessibility-performance.md):
  motion safety and performance.
- [prompts.md](references/prompts.md): user-facing request templates.
- [source-coverage.md](references/source-coverage.md): provenance and known
  limitations.

Reusable assets and scripts:

- `assets/cinematic-brief.example.json`
- `assets/creative-acceptance.example.json`
- `assets/cinematic-scroll-controller.js`
- `scripts/validate-cinematic-brief.mjs`
- `scripts/validate-creative-acceptance.mjs`
- `scripts/higgsfield-preflight.mjs`
- `scripts/test-cinematic-regressions.mjs`
- `scripts/render-cinematic-prompt.mjs`
- `scripts/prepare-scroll-media.sh`
- `scripts/validate-scroll-media.mjs`

## Completion report

Report the selected direction, media tier and truth mode; references/provider,
model/settings, attempts and credits; files changed; QC and browser evidence;
fallbacks; unresolved visual inference; and private, staged or production
release status.
