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

Use this mandatory route order:

1. native CLI for coding agents such as Codex when the provider recommends it;
2. native MCP connector when the client exposes it;
3. supported direct API;
4. browser control only when a required capability is absent from every
   programmatic route.

Record `provider.accessMethod`, `provider.programmaticPreflightComplete` and,
for browser fallback, `provider.browserFallbackReason` in the cinematic brief.
Do not spend credits merely to test browser automation.

## Higgsfield

Higgsfield currently documents both CLI and MCP access. For Codex, prefer the
CLI. Install and authenticate it using the current official instructions:

```text
npm i -g @higgsfield/cli
higgsfield auth login
```

Then run the bundled non-spending connection check:

```bash
node scripts/higgsfield-preflight.mjs --json higgsfield-preflight.json
```

If a global install is unavailable and the user authorises npm package
download, use `--allow-npx`. The script runs the official CLI account-status
command, records the access route and available credits, and does not submit a
generation.

For clients with native MCP support, the provider has documented:

```text
https://mcp.higgsfield.ai/mcp
```

Verify both routes against current official provider documentation before use.
Authentication is provider-hosted; do not commit credentials or preflight
reports containing account identifiers. Treat individual model names and
command schemas as current capabilities rather than permanent requirements.

Use a multi-reference/multi-shot capable model for a flagship when the brief
requires it. Use a simpler image-to-video model only for one bounded action.
Unlimited or low-cost access does not make a model appropriate for exact
mechanical continuity.

Never use a single-reference image-to-video job for a requested multi-chapter
flagship merely because it is cheaper or immediately available. If the
required real views, CAD or verified keyframes are missing, stop before spend
and report the source gap.

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
