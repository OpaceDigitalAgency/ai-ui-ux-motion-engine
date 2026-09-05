# Cinematic generated-product scrubber

Production-only reference: the entrypoint must first establish a detailed brief
and applicable agreement. This workflow cannot resolve an unagreed story by itself.

Use this route when the experience depends on an authored photographic camera
path, product reveal, assembly/disassembly, burst/exploded view, macro inspection
or object state controlled by scrolling.

The deliverable on this route is a pre-rendered film or frame sequence plus
semantic DOM content. The film may come from generation, footage, 3D or
compositing. Choose real-time 3D separately when interaction needs it; do not
force that architecture merely because many components should move.

## Golden path

1. Run the cinematic-intent gate before editing the page.
2. Classify truth mode and production tier.
3. Select a route against accuracy and source coverage. Honour user-selected
   tools. Verify provider capability, access, terms, cost and attempt authority
   only when external generation is selected.
4. Record the user's requested signature moment, progression, payoff, required
   effects and prohibited substitutes; create and validate the cinematic brief.
5. Prepare the identity authority and sources needed for the actual sequence.
   Resolve uncertain direction with the cheapest useful preview; an animatic is
   useful for uncertain choreography but is not mandatory before every proof.
6. For generation, render a draft prompt from the plan-validated brief, then
   validate the exact provider payload under the generation gate in
   [production-contract.md](production-contract.md). A draft prompt cannot
   authorise spend. Local rendering follows its recorded production plan.
7. Produce one private proof using the selected route. For generation, use CLI,
   MCP or API where available; browser control is a recorded capability fallback.
8. Watch the complete proof and compare it with the inspected reference and
   timed takeaways. Inspect the overview contact sheet and sample risky
   transitions densely where identity or mechanical drift could occur.
9. Convert accepted media to an all-intra scrub master and frame sequence.
10. Generate the poster from the exact shipping master and validate both
    together with `validate-scroll-media.mjs`.
11. Prove forward/backward scroll and rapid direction changes on an isolated
    private route.
12. Run the creative-acceptance validator, obtain approval, then rerun it for
   integration before changing the page.
13. Reuse the approved film and component across chapters where appropriate.

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

- Use the requested duration and a scenario-specific beginning, progression
  and payoff; there is no fixed shot count or 10–15 second minimum.
- A continuous scroll reference defaults to one continuous shot. Plan timed
  actions and overlapping component movement without inserting automatic cuts
  or holds. Use authored cuts only when they serve the intended experience.
- Choose controls required by the plan, not a model name or assumed need for
  multiple references/shots. Record feasibility and unresolved risks.
- Stay within existing spend and attempt authority. Obtain only missing
  authority; a new approval is not required for each action within the cap.
- A missing required action fails its acceptance criterion. Any proposed change
  to the requirement must be explicit.
- A rotation, dolly, zoom, parallax or static product with moving camera is
  supporting footage, never a substitute for a requested flagship.

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

## One-anchor burst option

For a fictional product, abstract material or illustrative reference-style
experience:

1. approve one strong anchor image;
2. record the parts and intermediate states that the anchor does not establish;
3. select one continuous sequence or intentionally edited segments according
   to the reference and story, never a compulsory three-clip recipe;
4. specify named component groups, overlapping action and the camera path;
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

Flattened start/end frames can support intricate generated motion, but do not
prove controllable layers or valid intermediate states. Explain how the chosen
route will address those gaps. Use isolated layers or 3D when their control is
needed for the stated accuracy; treat generated inference as an explicit risk,
not automatically as either sufficient or disallowed.

## Brief and prompt

Copy `assets/cinematic-brief.example.json`, replace the example values, then run:

```bash
node scripts/validate-cinematic-brief.mjs cinematic-brief.json --check-files --stage plan
node scripts/render-cinematic-prompt.mjs cinematic-brief.json --mode flagship \
  > cinematic-prompt.txt
```

Use `--mode single` for a supporting shot and `--mode illustrative` for a burst
or fictional transformation. Read [cinematic-prompts.md](cinematic-prompts.md)
before changing the rendered structure. The generation-stage payload check is
separate; follow [production-contract.md](production-contract.md).

## Prompt discipline

- State identity and positive immutable constraints first.
- State exactly one action per supporting clip.
- Use timed phases for a continuous shot; named cuts only for an authored edit.
- Separate object motion from camera motion.
- Require readable cue states; add a still hold only when the motion plan needs it.
- Keep readable text and labels outside generated pixels.
- Reject a generic orbit when the brief requires a product story.
- Do not add endless exclusions after bad output; diagnose references, action
  complexity or model capability.

## Attempt discipline

For each attempt:

1. save provider ID, model/settings, prompt and cost;
2. download the raw result;
3. produce an overview sheet and inspect the complete moving result;
4. sample difficult mechanical moments densely;
5. compare the timed actions, independent movement and viewer takeaway with the
   brief; decide pass or reject against its actual required criteria;
6. do not integrate rejected media.

After the approved cap, report the failure and propose one material change:
references, model, complexity or technique. Do not spend beyond the cap or
silently reduce the requested scope. Do not keep rewriting synonyms.

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

Before integration run:

```bash
node scripts/validate-scroll-media.mjs \
  ./scroll-media/scroll-master.mp4 \
  --poster ./scroll-media/poster.jpg \
  --json ./scroll-media/delivery-validation.json
```

The command must report every decoded frame as an independent keyframe, zero
audio streams, H.264/yuv420p delivery, a fast-start atom order and a file size
inside the explicit page budget. It must also prove matching poster/video aspect
ratio and at least 0.99 structural similarity between the poster and exact
first decoded frame. A filename containing `all-intra`, `scroll` or `master`
is not evidence.

### Use all-intra video when

- the encoded size fits the page budget;
- seeking is smooth in the required browsers;
- the film is the easiest responsive source;
- direct testing proves forward and backward scroll.

Do not scrub an ordinary long-GOP delivery file merely because it plays
normally. Long distances between keyframes can cause jumps.

Do not accept a short-GOP file either. Any P- or B-frame means the shipping
video failed the direct-seek contract, even if manual forward scrolling appears
acceptable once.

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
- Permit only one seek in flight and retain only the newest pending target.
- Latch the video visible after its first `loadeddata`/decoded frame; never
  reveal the poster again merely because `readyState` drops during a seek.
- Use the validated first-frame poster in the same CSS box with identical
  `object-fit`, `object-position`, transform, filter and mask rules.
- Ignore tiny deltas.
- Pause work off screen.
- Never hijack native scrolling.
- Trigger DOM chapters from the same progress value.
- Test reverse as well as forward scroll.
- Stress at least one full-speed forward pass, one full-speed reverse pass and
  three rapid direction changes while recording current time, seeking state,
  video visibility and poster exposure.
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

Require both:

```bash
node scripts/validate-creative-acceptance.mjs creative-review.json --stage review
node scripts/validate-scroll-media.mjs scroll-master.mp4 --poster poster.jpg
```

Run the creative validator again with `--stage integration` only after the
owner approves the exact proof. Neither command substitutes for the other.

Six correct screenshots at settled positions do not prove the scrubber. Reject
if the video layer ever becomes hidden after first decode, the poster is
exposed during travel, seeks overlap, time settles against an obsolete target,
rapid reverse/forward input leaves a blank or stale stage, or the first decoded
frame changes crop, scale, position, filter or mask from the poster.

Require:

- the requested beginning, progression and payoff;
- scenario-specific meaning visible in the actions and final relationship;
- independent overlapping component motion when the reference requires it;
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
