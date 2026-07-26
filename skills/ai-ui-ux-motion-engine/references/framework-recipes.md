# Framework recipes

## Astro and static HTML

- Preserve server/static rendering and content collections.
- Keep crawlable content and primary navigation in HTML.
- Use CSS and small module scripts before adding a client framework island.
- Scope scripts to a component data attribute and clean up observers/listeners.
- Use `astro:assets` or the project’s image component.
- Do not add React solely to implement motion.
- For a generated product scrubber, server-render the poster, copy and actions,
  then attach one data-attribute-scoped video or canvas controller. Read
  `generated-product-scrubber.md`.

## React and Next.js

- Keep hooks at component top level.
- Isolate browser-only motion in the smallest client component.
- Avoid random values and layout-dependent values during server render.
- Use stable keys and typed interaction data.
- Keep semantic content in the server-rendered tree.
- Test hydration with reduced motion enabled.
- For generated video/frame scrubbing, isolate seeking in the smallest client
  component while keeping the poster and commercial content server rendered.

## Vue and Nuxt

- Put browser-only timeline setup in `onMounted` and clean it in `onBeforeUnmount`.
- Prefer template semantics and CSS transitions for ordinary state.
- Keep SSR output deterministic.

## Svelte and SvelteKit

- Use built-in transitions for local state.
- Start observers/timelines in `onMount` and return cleanup.
- Keep actions reusable and destroy listeners.

## Library decision

Reuse an installed motion library when it is healthy and matches the requirement. Before adding one, record:

- effects that native CSS/DOM cannot express cleanly;
- added client bytes and hydration cost;
- reduced-motion behaviour;
- server-rendering compatibility;
- maintenance owner.

Reject the dependency if the case is only “nicer animation.”
