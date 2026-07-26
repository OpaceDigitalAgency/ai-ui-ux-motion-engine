# Accessibility, responsive and performance gates

## Motion safety

- Honour `prefers-reduced-motion`.
- Provide pause/stop controls for non-essential motion that runs longer than five seconds.
- Avoid flashes, rapid scale pulses and large unexpected viewport movement.
- Keep focus visible and stationary enough to follow.
- Never require drag, hover or precise pointer movement as the only path.
- Do not animate error messages away before they can be read.

## Keyboard and semantics

- Use native links, buttons, disclosures and form controls.
- Preserve logical DOM and focus order through visual rearrangement.
- Label icon-only controls.
- Announce carousel/card position only when it changes through user action.
- Test at 200% zoom and with keyboard only.

## Responsive gates

Use the project’s required viewports. If none exist, check at least:

- 360 × 800;
- 768 × 1024;
- 1440 × 900.

Check landscape mobile, long unbroken text, enlarged text and coarse pointer input when relevant.

## Performance budgets

Use the project budget when present. Otherwise:

- avoid adding a client framework to a static page;
- keep route JavaScript proportional to interaction value;
- lazy-load below-fold media;
- preload only the single strongest LCP candidate;
- keep video out of the critical path unless the hero requires it;
- measure rather than claim Core Web Vitals.

## Manual evidence

Automated tools do not prove usability or WCAG conformance. Record:

- keyboard path;
- focus behaviour;
- reduced-motion result;
- touch/drag alternative;
- representative mobile and desktop screenshots;
- console errors;
- any checks not run.
