# Verification contract

## Package validation

Run from the repository root:

```bash
node skills/ai-ui-ux-motion-engine/scripts/validate-package.mjs
node skills/ai-ui-ux-motion-engine/scripts/validate-cinematic-brief.mjs \
  skills/ai-ui-ux-motion-engine/assets/cinematic-brief.example.json
node skills/ai-ui-ux-motion-engine/scripts/render-cinematic-prompt.mjs \
  skills/ai-ui-ux-motion-engine/assets/cinematic-brief.example.json \
  --mode flagship
node skills/ai-ui-ux-motion-engine/scripts/validate-scroll-media.mjs \
  <exact-shipping-scroll-master.mp4> \
  --poster <exact-shipping-poster.jpg> \
  --json <delivery-validation.json>
```

Run the media-preparation script against a short synthetic or approved video
and confirm the all-intra master, exact frame count, poster, contact sheet and
metadata.

The shipping MP4 must independently pass the validator after every rename,
recompression, optimisation or CDN transformation. Do not infer that the
shipping asset matches an earlier validated working file.

The shipping poster must come from that exact MP4 and pass the validator's
aspect-ratio and 0.99 first-frame SSIM threshold. In the browser, record poster
and video bounding boxes plus computed fit, position, transform, filter and
mask; any handoff change fails.

## Cinematic asset gate

Before integration:

1. inspect the opening, end and evenly sampled contact sheet;
2. inspect difficult mechanical actions densely;
3. verify identity, counts, spacing, geometry, ports, labels and permitted axes;
4. verify every requested shot or disclose any omission;
5. reject morphing, duplication, clipping and unexplained transitions;
6. verify the asset is substantial enough for its flagship/supporting tier;
7. record provider/model/settings, attempts, cost and generation status;
8. obtain owner approval for the private proof.

## Scroll-experience gate

On the isolated private route:

- test at least six forward scroll positions;
- test at least six backward positions;
- perform one rapid full forward pass, one rapid full reverse pass and at least
  three direction changes;
- verify the expected cue/DOM chapter at each sample;
- check for long-GOP jumps, stale frames and blank stages;
- record that the video remains visible and poster exposure stays zero after
  the first decoded frame, including while `readyState` temporarily drops;
- compare the poster immediately before replacement with the first decoded
  frame and reject any crop, scale, position, filter or mask jump;
- confirm only one seek is active and the final decoded time follows the newest
  target rather than an obsolete scroll position;
- inspect protected crops on mobile, tablet and desktop;
- confirm poster, reduced-motion, Save-Data, no-JavaScript and media-error paths;
- confirm native keyboard/touch scrolling remains authoritative;
- check console, requests, layout overflow and long tasks.

Do not move the asset to a public hero before this gate passes.
Six settled checkpoint screenshots alone do not pass this gate.

## Project validation

Run focused component checks, motion-safety audit and the full documented
build/lint/typecheck/test baseline. Exercise primary interactions and direct
route loading in a normal preview.

## Claim language

Use:

- “generation passed private visual review” only with saved QC evidence;
- “identity-locked” only when the recorded identity checks pass;
- “evidence-accurate” only against authoritative product evidence;
- “smooth scroll seeking on [browsers]” only after forward/backward testing;
- “scope exception” for omitted requested shots;
- “private preview” or “production deployed” only after platform confirmation.

Continuity can be improved, never guaranteed. Generated visualisation is not
evidence of a delivered build, specification, stock or measured result.

## Handoff

List truth mode, tier, provider/model/settings, references, attempts/credits,
prompt/brief paths, media formats, QC evidence, browser/viewports, fallbacks,
scope exceptions, changed components, unresolved issues and release boundary.
