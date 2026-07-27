# External tools and cinematic-provider preflight

Provider interfaces, models, pricing and authentication change. Verify current
capabilities and displayed cost before configuration or spend.

## Cinematic provider requirement

When the desired experience requires photographic camera movement, unseen
angles, assembly/disassembly or a physical burst:

- use a capable image/video provider, controlled 3D/CAD, compositing or footage;
- state this dependency before page implementation;
- if unavailable, stop the cinematic asset work and offer only an honest static
  fallback;
- do not substitute photo fades, CSS zooms, generic stock video or a background
  loop and claim equivalent output.

## Provider preflight

Complete before upload:

1. provider is connected and authenticated;
2. upload controls work in the available tool/browser;
3. user owns or may upload the references;
4. any provider terms requiring acceptance are shown to the user;
5. selected model supports the required references, duration, ratio,
   resolution, shot control and silent output;
6. displayed cost and attempt cap are recorded and approved;
7. prompt entry and reference ordering can be verified;
8. raw output can be downloaded;
9. no generation begins while any item above is unknown.

Prefer a supported direct connector/API for repeatable structured operations.
Use browser control when the provider exposes required controls only through
its signed-in UI. Do not spend credits merely to test browser automation.

## Higgsfield

The provider has supported a hosted connector at:

```text
https://mcp.higgsfield.ai/mcp
```

Verify this against current official provider documentation before use.
Authentication is provider-hosted; do not commit credentials. Treat individual
model names as current capabilities rather than permanent requirements.

Use a multi-reference/multi-shot capable model for a flagship when the brief
requires it. Use a simpler image-to-video model only for one bounded action.
Unlimited or low-cost access does not make a model appropriate for exact
mechanical continuity.

## Local processing

Require `ffmpeg` and `ffprobe` for cinematic delivery. Use:

- `scripts/prepare-scroll-media.sh` for all-intra video, frames, poster and QC;
- `scripts/validate-cinematic-brief.mjs` before generation;
- `scripts/render-cinematic-prompt.mjs` for repeatable prompt structure.

## Browser and visual inspection

Use browser inspection for provider form verification, private-route scroll,
responsive crops, reduced motion, console evidence and screenshots. Sample
forward and backward progress, not only playback.

## Image generation

Use image generation to create missing original references only after art
direction and truth mode are fixed. Check text, hands, hardware geometry, logos,
counts and evidence implications. Generated stills that disagree are not a
valid continuity pack.

## Research and component sources

Use research connectors only when they materially improve evidence. Treat
component registries and inspiration galleries as sources to evaluate for
licence, accessibility, compatibility, maintenance and visual fit—not as
permission to paste code or identity.
