# Generated product scrubber

Use this workflow for the high-detail “watch rotates or opens as I scroll”
experience when the source material is photography, approved stills, prompts or
generated keyframes rather than a CAD, GLB or USDZ model.

This is a pre-rendered photographic 3D illusion. It is not freely manipulable
3D. Do not describe it as a real-time 3D model.

## Routing rule

Choose this route when:

- the visitor should follow one authored camera path;
- surface detail and cinematic lighting matter more than arbitrary viewpoints;
- a product photograph or approved keyframe exists;
- the experience must be lighter than a real-time WebGL scene.

Use WebGL or a product viewer only when the visitor must rotate freely, change
parts, inspect any angle or interact with spatial state that cannot be
pre-rendered.

No CAD, GLB or 3D mesh is required for this workflow.

## Production contract

Record before generation:

1. one approved hero/keyframe with no unlicensed logo, accidental text or
   misleading product detail;
2. a fixed subject description, lens, camera path, lighting, background and
   aspect ratio;
3. exact start and end states for each clip;
4. target viewport, rendered dimensions and duration;
5. disclosure and evidence status for generated or altered product media;
6. user authority for any provider credits or paid generation.

Do not generate from an evidence photograph if the result could be mistaken for
the exact ordered build. Either keep the motion illustrative or validate every
visible product detail.

## Provider-independent prompt

```text
REFERENCE IMAGE:
Use the attached approved product keyframe as the exact subject reference.

SUBJECT LOCK:
Preserve the product's proportions, panel layout, ports, fasteners, materials
and colour. Do not add or remove components. Do not invent logos, labels,
numbers, watermarks, cables, hands or scenery.

CAMERA:
One continuous controlled product-camera move. Begin at [START VIEW]. Move
slowly [CAMERA PATH] and finish exactly at [END VIEW]. No cuts, whip pans,
handheld motion, lens breathing or sudden speed change.

LIGHT:
Premium studio product lighting with [LIGHT DESCRIPTION]. Preserve fine metal,
glass, fabric or surface detail. Keep the background [BACKGROUND].

DELIVERY:
[DURATION] seconds, [ASPECT RATIO], highest available resolution, silent,
clean first and final frames, stable subject geometry, no text.
```

For a technical reveal, add only physically credible changes:

```text
During the move, transition from the complete exterior to an authorised
cutaway or open configuration. Keep the chassis position, camera axis,
fasteners and internal component locations consistent. The final frame must be
clean and suitable as the reference image for the next clip.
```

Negative instructions are requirements, not decoration. Reject output with
warped geometry, drifting ports, invented text, duplicated fans, changing
materials or inconsistent final frames.

## Clip chaining

For a journey longer than one reliable generation:

1. generate a short first clip;
2. extract its final clean frame with `ffmpeg`;
3. inspect geometry, text and product fidelity;
4. use that exact frame as the next clip’s reference;
5. keep the subject lock, lens, light, colour and camera speed unchanged;
6. compare both sides of the join at full resolution;
7. regenerate or hide a failed join rather than calling it seamless.

Example:

```bash
ffmpeg -sseof -0.08 -i product-01.mp4 -frames:v 1 product-01-end.png
ffmpeg -i product-01.mp4 -i product-02.mp4 \
  -filter_complex "[0:v][1:v]concat=n=2:v=1:a=0[out]" \
  -map "[out]" -movflags +faststart product-journey.mp4
```

Continuity can be improved, never guaranteed.

## Delivery choice

Use an encoded video scrubber when:

- seeking is smooth on the target browsers;
- the compressed file meets the project budget;
- exact frame selection is not critical.

Use a canvas frame sequence when:

- exact frame-to-scroll mapping is required;
- iOS or target-device video seeking is unreliable;
- the request count and decoded-memory budget are controlled.

Use an ordinary short video when scroll linking adds no explanatory value.

## Scroll mapping

For video:

- render a semantic poster before JavaScript;
- wait for metadata before seeking;
- map bounded section progress to `0..duration`;
- coalesce seeks with `requestAnimationFrame`;
- ignore tiny seek deltas;
- stop work while the section is off screen;
- never block native scrolling.

For canvas:

- keep the poster as an adjacent accessible image or canvas fallback;
- preload the opening frame;
- fetch ahead in small windows;
- evict decoded frames outside the active window;
- size source frames close to their maximum rendered dimensions;
- keep readable labels and calls to action in the DOM.

## Astro/static recipe

1. Render the H1, offer, actions, poster and caption in Astro.
2. Put the scrubber in a bounded sticky section with a normal document-height
   wrapper.
3. Add one small module script scoped by a data attribute.
4. Use CSS custom properties or data states for progress-dependent annotation.
5. Remove listeners and observers when the component is disconnected.
6. Do not add React solely for the scrubber.

## React/Next recipe

1. Keep the hero copy and poster server rendered.
2. Isolate seeking in one smallest client component.
3. Call hooks at the component top level.
4. Store the pending progress in a ref and seek in one animation frame.
5. Avoid hydration-dependent layout values in the initial render.
6. Test static export and direct route loading when the site is statically
   deployed.

## SVG route

Use SVG when the desired effect is explanatory rather than photographic:

- animate viewBox, masks, clip paths and grouped transforms;
- keep labels as real text when they carry meaning;
- use one scroll progress value to reveal layers or a data path;
- avoid converting an entire interface to inaccessible paths;
- provide the complete diagram without animation under reduced motion.

SVG cannot create authentic unseen product angles from one photograph. Use it
for cutaways, airflow, exploded relationships and technical overlays.

## Reduced motion, data saving and failure states

- `prefers-reduced-motion: reduce`: show the approved poster or a small static
  sequence with manual labelled steps.
- `Save-Data`: do not fetch the full sequence automatically.
- JavaScript unavailable: keep the product, proposition and actions visible.
- media failure: replace the stage with the poster and do not leave a blank
  sticky viewport.
- any clip containing speech needs captions; product films should normally be
  silent.

## Acceptance tests

The result is not a cinematic product scrubber if it is only:

- three unrelated stills crossfading;
- a static image scaling behind fixed text;
- decorative parallax with no product relationship;
- a CSS rotate transform pretending to reveal a new angle;
- a video playing independently of the visitor’s progress.

Require:

- at least 24 visually distinct frames per authored motion segment, or smooth
  encoded video seeking that visibly changes the camera/product relationship;
- continuous subject geometry through the move;
- the complete product inside a protected crop at every required viewport;
- meaningful progress from exterior to detail, cutaway or operating evidence;
- pointer, keyboard/touch reading and native-scroll compatibility;
- reduced-motion, Save-Data, no-JavaScript and media-error fallbacks;
- no console error, layout overflow or long-task regression;
- browser evidence on mobile Safari/WebKit and representative desktop browsers.

## Handoff evidence

Report the provider and model selected, source-image rights, prompt version,
clip/frame count, output resolution and size, codecs or image formats,
responsive crop, reduced-motion result, browsers tested and any product-detail
inference that remains illustrative.
