# Reference and cinematic media pipeline

## Capture references responsibly

When the user controls or may legally analyse the reference:

1. record the target viewport without browser chrome where possible;
2. use a steady scroll and pause around meaningful triggers;
3. capture pointer, hover, drag, menu and disclosure states separately;
4. note viewport, frame rate, page URL and source status;
5. retain the recording as analysis evidence, not a shipping asset.

Do not reproduce identity-specific copy, logos, illustrations, photography or
source code.

## Extract reference evidence

Run:

```bash
bash scripts/extract-reference-frames.sh <video> <output-directory>
```

Inspect evenly sampled and scene-change frames as a sequence. A still cannot
prove easing, pinning, continuity or input behaviour.

## Prepare generated-media references

Before generation:

- choose one identity authority;
- normalise aspect, orientation, crop, resolution, colour and lighting;
- remove or obtain permission for brands and accidental text;
- confirm every view can depict the same product;
- record immutable counts, geometry and permitted mechanical axes;
- assign one purpose to each supporting reference;
- create a contact sheet and reject inconsistent inputs.

Do not ask a video model to reconcile contradictory stills.

## Generate in bounded tiers

- Flagship: one authored 10–15 second journey using a capable controlled model.
- Supporting: one 3–5 second action from one or two references.
- Code-native: no generated film when CSS/SVG/canvas explains the relationship.

Approve a private signature proof before generating the remaining library.

## Convert accepted media

Run:

```bash
bash scripts/prepare-scroll-media.sh accepted-film.mp4 ./scroll-media
```

The script creates a silent all-intra scrub master, 150 JPEG frames at 1600px
by default, poster, contact sheet and ffprobe metadata.

Use all-intra video only after target-browser seeking passes. Use the frame
sequence when exact frame mapping or device reliability requires it. Never
silently fall back to ordinary long-GOP scrubbing after visible jitter.

## Quality-control evidence

For every attempt retain:

- provider asset ID, model/settings, prompt and cost;
- raw download and metadata;
- evenly sampled overview contact sheet;
- dense samples around complicated mechanics;
- pass/reject decision and disclosed scope exceptions.

Do not trim around identity or geometry drift and reuse the remainder as if the
whole action passed.

## Delivery requirements

- Declare dimensions or aspect ratio.
- Keep text, labels and calls to action in semantic HTML.
- Use one active cinematic media element per viewport.
- Lazy-load below-fold films and stop work off screen.
- Avoid multiple large LCP candidates.
- Use silent output and strip generated audio.
- Provide posters for no-JavaScript, reduced motion, Save-Data and errors.
- Disclose generated media when it could imply documentary product evidence.
- Verify responsive crops and forward/backward scroll before integration.
