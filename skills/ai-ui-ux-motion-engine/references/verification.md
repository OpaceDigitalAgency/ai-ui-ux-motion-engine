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
```

Run the media-preparation script against a short synthetic or approved video
and confirm the all-intra master, exact frame count, poster, contact sheet and
metadata.

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
- test backward scrolling and rapid direction changes;
- verify the expected cue/DOM chapter at each sample;
- check for long-GOP jumps, stale frames and blank stages;
- inspect protected crops on mobile, tablet and desktop;
- confirm poster, reduced-motion, Save-Data, no-JavaScript and media-error paths;
- confirm native keyboard/touch scrolling remains authoritative;
- check console, requests, layout overflow and long tasks.

Do not move the asset to a public hero before this gate passes.

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
