# External tools and cinematic-provider preflight

Provider interfaces, models, pricing and authentication change. Verify current
capabilities and displayed cost before configuration or spend. Honour the
user's provider allocation, including different tools for stills and video.
Do not replace their chosen provider silently or claim a universally best model.

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

Use this only for an external provider route. Local 3D, animation, compositing
or processing needs its relevant dependency checks, not a fictional provider
connection or price quote. A generated film may be an appropriate route for
intricate motion; controlled rendering is appropriate when exact motion or
geometry needs that control.

Before upload, validate the source/plan and confirm the connection, upload
authority, applicable terms and model input roles. Authorised uploads can then
supply media IDs for the exact quote. Before generation complete this checklist:

1. provider is connected and authenticated;
2. upload controls work in the available tool/browser;
3. user owns or may upload the references;
4. any provider terms requiring acceptance are shown to the user;
5. selected model supports the actual reference roles, duration, ratio,
   resolution, editing mode and audio setting required by this plan;
6. displayed cost and attempt cap are recorded and approved;
7. prompt entry and reference ordering can be verified;
8. raw output can be downloaded;
9. the exact prompt, ordered input roles and settings match the validated plan
   and the generation payload gate in
   [production-contract.md](production-contract.md);
10. no generation begins with a material prerequisite unknown.

Record a compact capability and cost comparison among the available options
that could meet the brief. Compare supported start/end conditioning, additional
references versus timed keyframes, duration, resolution, continuous motion,
identity constraints and exact live quote. Record why the selected route is
suited to this proof and what remains unverified. An expensive/new model is not
evidence of greater fidelity; a cheaper model is not evidence of adequate control.
Research once for the run and refresh when settings, route or prices change.

Use the existing authorisation for uploads, terms, credits and attempts within
its recorded scope. Do not ask the same permission again or require a separate
owner-approved animatic in every workflow. A quote, validation pass or connected
account is not itself spend authority. Submission remains an explicit action
under that authority; validation scripts must not submit automatically.

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

Verify Higgsfield's current official CLI/MCP instructions before installation
or authentication. When the documented Codex route is the CLI, prefer it; when
the user expressly chooses an available MCP route, honour that choice. The
following are examples to verify against the current official instructions:

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

The documented MCP endpoint to verify for clients with native MCP support is:

```text
https://mcp.higgsfield.ai/mcp
```

Verify both routes against current official provider documentation before use.
Authentication is provider-hosted; do not commit credentials or preflight
reports containing account identifiers. Treat individual model names and
command schemas as current capabilities rather than permanent requirements.

Use multi-reference or multi-shot capabilities only when required by the actual
plan. A single-reference job can be a credible bounded proof for an illustrative
continuous sequence if its inference and continuity risks are recorded. It must
not be presented as guaranteeing exact independent component control. If exact
real views or mechanics are required but unsupported, report the source/route
gap before spending.

Check account-specific included or unlimited options and the route to which
they apply. Browser, API, CLI and MCP allowances may differ. Do not infer that
an unlimited web allowance covers automation or that disabling audio reduces
the quote. Use the supported route within the provider's current terms; report
the relevant limitation without automating around it.

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
