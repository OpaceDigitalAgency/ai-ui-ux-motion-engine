---
name: ai-ui-ux-motion-engine
description: Design, redesign, audit and validate distinctive production websites using reference extraction, design systems, purposeful motion, scroll interactions, media pipelines and multi-pass refinement. Use for landing pages, product sites, portfolios, interactive storytelling, UI/UX improvement, video- or screenshot-led recreation, cinematic scroll effects, motion graphics, hero refinement, design-system extraction, and anti-generic visual polish in Astro, React, Next.js, Vue, Svelte or static HTML/CSS. Preserve the existing stack and require accessibility, responsive, performance and regression evidence.
---

# AI UI/UX Motion Engine

Create a project-specific interface from evidence, not a generic component recipe. Treat references as structural and interaction inputs, never as permission to clone branding, copy or protected assets.

## Non-negotiable rules

- Read every applicable `AGENTS.md`, project source-of-truth/status document, design system and current working-tree change before editing.
- Define the bounded component, acceptance criteria, dependencies and validation plan.
- Preserve the existing framework, package manager, content model and design conventions unless the user explicitly authorises a migration.
- Label facts, source observations, inferences, proposals and unknowns separately.
- Use motion to explain hierarchy, state, continuity or spatial relationships. Reject decorative motion that delays content or weakens comprehension.
- Keep primary content and actions usable without JavaScript and when `prefers-reduced-motion: reduce` is active.
- Never claim reference parity, WCAG conformance, performance, cross-browser support or production readiness without direct evidence.
- Never copy brand identity, proprietary copy, source code or distinctive assets from a reference.
- Never install or configure a paid third-party service without user authority. Keep credentials out of repositories and output.

## Workflow

### 1. Establish the brief and baseline

Record:

1. goal and primary conversion;
2. audience and decision context;
3. required routes, states and interactions;
4. content voice and evidence constraints;
5. target devices, input modes and browsers;
6. framework, build and release boundaries;
7. baseline build, test and representative screenshots.

Read [workflow.md](references/workflow.md) for the complete phase gates.

### 2. Extract references

For each screenshot, recording or site:

- map section order, viewport geometry and content density;
- identify typography roles, colour roles, spacing, shape and image treatment;
- record entrance, scroll, hover, drag and state-transition behaviour;
- distinguish reusable principles from identity-specific material;
- combine at least two independent inputs when the user requests a mashup.

For a local recording, run:

```bash
bash scripts/extract-reference-frames.sh <video> <output-directory>
```

Read [media-pipeline.md](references/media-pipeline.md) before processing video, image sequences or generated assets.

### 3. Commit to one design direction

Write a seven-line direction:

1. product goal and audience;
2. tone in two or three concrete adjectives;
3. page composition and hierarchy;
4. typography strategy;
5. colour, surface and image strategy;
6. motion strategy and reduced-motion equivalent;
7. one signature differentiator.

Reject “clean and modern” unless every line above makes it implementable. Generate alternatives only for a material decision such as the hero, navigation model or interaction language; keep the rest fixed while comparing.

### 4. Select the motion architecture

Choose the lightest mechanism that expresses the intended relationship:

- CSS transitions/keyframes for local state and entrance changes;
- Intersection Observer for one-shot reveals;
- native scroll-driven animation when support and fallback are acceptable;
- a small framework motion library when the project already uses it;
- GSAP only for coordinated pinning/timelines that simpler primitives cannot express;
- video scrubbing for photographic or generated camera movement;
- canvas frame sequences only when seeking quality or device support requires them;
- WebGL/3D only when real-time depth materially improves the product story.

Read [motion-patterns.md](references/motion-patterns.md) and [framework-recipes.md](references/framework-recipes.md) before implementation.

### 5. Implement in passes

1. Architecture: semantic HTML, section order, content and primary action.
2. Macro design: grid, scale, rhythm, typography, colour and media.
3. Motion: one interaction at a time with a static/reduced-motion equivalent.
4. Micro states: hover, focus-visible, active, loading, empty, error and success.
5. Responsive composition: mobile, tablet, desktop and zoom.
6. Editorial pass: remove filler, unsupported claims and repeated copy.

Keep the primary offer within the first two useful viewports when that supports the page goal; do not apply this as a universal rule to editorial or narrative experiences.

### 6. Validate every bounded component

After each component:

- test pointer, keyboard and touch behaviour;
- inspect reduced motion;
- check layout at the project’s required viewports;
- check console and runtime errors;
- run the narrowest relevant automated checks.

Then run the project’s complete regression baseline. Run:

```bash
node scripts/audit-motion-safety.mjs <project-directory>
node scripts/validate-package.mjs
```

Read [accessibility-performance.md](references/accessibility-performance.md) and [verification.md](references/verification.md) for acceptance gates.

## Reference routing

- Use [workflow.md](references/workflow.md) for phase outputs and decision gates.
- Use [motion-patterns.md](references/motion-patterns.md) for interaction architecture and safe implementation patterns.
- Use [media-pipeline.md](references/media-pipeline.md) for recording capture, frame extraction, video/image generation and asset delivery.
- Use [framework-recipes.md](references/framework-recipes.md) for Astro/static, React/Next, Vue and Svelte decisions.
- Use [research-and-extraction.md](references/research-and-extraction.md) for competitor and design-system research.
- Use [tool-connections.md](references/tool-connections.md) only when external media or research tools are needed.
- Use [accessibility-performance.md](references/accessibility-performance.md) for motion safety, Core Web Vitals and responsive requirements.
- Use [prompts.md](references/prompts.md) for reusable task payloads.
- Use [source-coverage.md](references/source-coverage.md) to understand what was derived from the four source videos and what was independently strengthened.
- Use [verification.md](references/verification.md) before claiming completion.

## Completion report

Report:

1. selected direction and signature differentiator;
2. references used and what was extracted rather than copied;
3. files and components changed;
4. motion added and its reduced-motion/static equivalent;
5. tests, builds, viewports and interaction states checked;
6. remaining unknowns, external gates and release status.
