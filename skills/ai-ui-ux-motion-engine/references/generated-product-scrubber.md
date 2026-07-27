# Cinematic generated-product scrubber

Use this route when the experience depends on an authored photographic camera
path, product reveal, assembly/disassembly, burst/exploded view, macro inspection
or object state controlled by scrolling.

The deliverable is a pre-rendered film or frame sequence plus semantic DOM
content. It is not real-time 3D.

## Golden path

1. Run the cinematic-intent gate before editing the page.
2. Classify truth mode and production tier.
3. Verify provider capability, access, terms, cost and attempt authority.
4. Create and validate a cinematic brief.
5. Prepare one identity authority and only the shot-specific references needed.
6. Render the prompt from the brief; do not improvise a different production
   method.
7. Generate one private proof.
8. Inspect contact sheets and dense frames; reject identity or mechanical drift.
9. Convert accepted media to an all-intra scrub master and frame sequence.
10. Prove forward/backward scroll on an isolated private route.
11. Obtain approval before page integration or further generation.
12. Reuse the approved film and component across chapters where appropriate.

## Route by truth mode

### Illustrative

The object may transform creatively, but its silhouette and designed visual
identity should remain coherent. Use this for fictional products, abstract
materials, paint/liquid bursts and explicitly conceptual visuals.

### Identity-locked

Use one authority image for the product identity. Other references constrain
individual shots and must not be averaged into a new product. Reject changes to
recognisable proportions, materials, panels, ports or count.

### Evidence-accurate

Use authoritative photography, CAD or approved keyframes. Record exact counts,
geometry, labels, ports, fasteners and permitted axes. If generation cannot
preserve them within the attempt cap, simplify the action or use CAD,
compositing or real footage. Never imply that generated media proves the
delivered product.

## Route by production tier

### Flagship film

- 10–15 seconds is normally sufficient.
- Use an authored progression: authority, access/change, inspection and payoff.
- Choose a model that supports the required multi-reference and multi-shot
  controls.
- One paid attempt by default; one additional attempt only with explicit
  approval.
- A missing shot is a disclosed exception, not a silent success.

### Supporting shot

- 3–5 seconds.
- One action and one camera instruction.
- One or two consistent references.
- Use for cooling, connectors, materials, controlled pushes and simple physical
  movement.
- Do not stretch a small action into a flagship hero.

### Code-native motion

Use CSS, SVG, canvas or an existing motion library when the effect explains
data, airflow, state or typography and does not need photographic state change.

## One-anchor burst preset

For a fictional product, abstract material or illustrative reference-style
experience:

1. approve one strong anchor image;
2. reuse that same anchor for each independent clip;
3. generate three simple movements rather than one overloaded film—typically a
   controlled orbit/dolly, one exploded or burst action, and one macro/detail
   move;
4. keep each clip to one action and one camera instruction;
5. reverse an accepted separation clip for reassembly when that reads cleanly;
6. extract a consistent numbered frame sequence from every accepted segment;
7. preload the opening frames and map the sequence to a pinned canvas;
8. keep chapter text and controls in the DOM.

Do not use this illustrative preset for evidence-accurate mechanics.

## Provider preflight

Before upload or generation, record:

- current provider and model capability;
- authenticated connection and upload availability;
- accepted reference count and ordering;
- duration, ratio, resolution, bitrate and audio controls;
- current displayed cost;
- user authority for uploads, terms and credits;
- raw-download method;
- attempt cap.

Provider interfaces, models and prices change. Verify them live. Do not hard-code
an obsolete model name merely because it worked previously.

## Reference pack

1. Select the identity-authority image.
2. Remove or obtain permission for visible brands and accidental text.
3. Match aspect ratio, orientation, crop, colour and lighting.
4. Ensure different views can plausibly depict one object.
5. Keep exact counts visible and unoccluded where they matter.
6. Order references to follow the shot plan.
7. Give each non-authority reference one named purpose.
8. Reject inconsistent references before generation.

More references do not automatically create more control. Inconsistent
references create averaged or invented geometry.

## Brief and prompt

Copy `assets/cinematic-brief.example.json`, replace the example values, then run:

```bash
node scripts/validate-cinematic-brief.mjs cinematic-brief.json --check-files
node scripts/render-cinematic-prompt.mjs cinematic-brief.json --mode flagship \
  > cinematic-prompt.txt
```

Use `--mode single` for a supporting shot and `--mode illustrative` for a burst
or fictional transformation. Read [cinematic-prompts.md](cinematic-prompts.md)
before changing the rendered structure.

## Prompt discipline

- State identity and positive immutable constraints first.
- State exactly one action per supporting clip.
- Use timed shot blocks and hard cuts for a multi-shot film.
- Separate object motion from camera motion.
- Require a clean still hold at useful cue points.
- Keep readable text and labels outside generated pixels.
- Reject a generic orbit when the brief requires a product story.
- Do not add endless exclusions after bad output; diagnose references, action
  complexity or model capability.

## Attempt discipline

For each attempt:

1. save provider ID, model/settings, prompt and cost;
2. download the raw result;
3. produce a 30-frame overview sheet;
4. sample difficult mechanical moments densely;
5. decide pass, supporting-only, disclosed exception or reject;
6. do not integrate rejected media.

After the approved cap, change one material condition—references, model,
complexity or technique. Do not keep rewriting synonyms.

## Scrub delivery

Run:

```bash
bash scripts/prepare-scroll-media.sh accepted-film.mp4 ./scroll-media \
  --frames 150 --width 1600
```

This produces:

- a silent all-intra H.264 master for responsive seeking;
- a numbered JPEG sequence for exact canvas mapping;
- a poster;
- a contact sheet;
- source metadata.

### Use all-intra video when

- the encoded size fits the page budget;
- seeking is smooth in the required browsers;
- the film is the easiest responsive source;
- direct testing proves forward and backward scroll.

Do not scrub an ordinary long-GOP delivery file merely because it plays
normally. Long distances between keyframes can cause jumps.

### Use a canvas sequence when

- exact frame selection matters;
- video seeking remains unreliable;
- a flagship experience justifies controlled frame requests and memory;
- frames can be sized near their rendered dimensions.

For canvas, show the poster first, fetch ahead in bounded windows, evict decoded
frames outside the active window and retain all labels/actions in the DOM.

## Scroll integration

Use `assets/cinematic-scroll-controller.js` as the framework-neutral baseline.
Adapt it to project conventions rather than rewriting the seek loop casually.

- Use a sticky stage inside a normal document-height wrapper.
- Map bounded wrapper progress to `0..duration`.
- Coalesce seeks with `requestAnimationFrame`.
- Ignore tiny deltas.
- Pause work off screen.
- Never hijack native scrolling.
- Trigger DOM chapters from the same progress value.
- Test reverse as well as forward scroll.
- Keep the full product inside a protected responsive crop.

For Astro/static, render semantic content and poster server-side and add one
small scoped module. For React/Next, isolate seeking in the smallest client
component and keep the rest server-rendered.

## Scaling across a site

Do not generate a new flagship film for every section.

1. Use one flagship per major journey.
2. Divide it into reusable DOM-labelled chapters.
3. Add short supporting shots only where they explain a different product fact.
4. Use code-native motion for diagrams, typography and interface state.
5. Load one active cinematic asset per viewport.
6. Lazy-load below-fold media and keep posters for mobile, reduced motion and
   Save-Data.

## Acceptance gate

Reject if the result is only still-image crossfades, CSS zoom/parallax, an
unrelated background video, an unsynchronised film, a slight single action
mislabelled as a flagship, or a visibly jittery scrub.

Require:

- the requested beginning, progression and payoff;
- continuous identity and required counts/geometry;
- clean cue frames and truthful disclosed exceptions;
- smooth forward/backward progress;
- protected crops at target viewports;
- semantic DOM content and native scrolling;
- poster, reduced-motion, Save-Data, no-JavaScript and media-error fallbacks;
- browser, console, performance and full-project evidence;
- private approval before production integration.

Read [cinematic-case-study.md](cinematic-case-study.md) for failure patterns
and the production choices that proved reliable.
