# Motion patterns

## Selection matrix

| Need | Preferred mechanism | Avoid |
|---|---|---|
| Hover/focus feedback | CSS transition | JavaScript timeline |
| One-shot entrance | Intersection Observer + class | scroll listener per element |
| Reading progress | CSS scroll timeline or one passive listener | layout reads on every scroll |
| Sticky narrative | CSS sticky + bounded container | pinning the whole document |
| Coordinated timeline | GSAP/established project library | adding a library for one fade |
| Photographic 3D illusion | encoded video scrub | heavy real-time WebGL |
| Precise cross-device seeking | canvas frame sequence | unthrottled `currentTime` writes |
| Manipulable 3D object | WebGL/Spline/Three.js | prerecorded video pretending to be interactive |

## Karaoke text

Keep readable text in the DOM. The inactive state must still meet contrast requirements or expose an ordinary paragraph to reduced-motion users.

In React, never call `useTransform` inside `.map()`. Put each word in a child component and call hooks at the child’s top level:

```tsx
function Word({ progress, start, end, children }) {
  const opacity = useTransform(progress, [start, end], [0.35, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

function KaraokeText({ value }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const words = value.split(/\s+/);
  return (
    <p ref={ref}>
      {words.map((word, index) => (
        <Word
          key={`${word}-${index}`}
          progress={scrollYProgress}
          start={index / words.length}
          end={(index + 1) / words.length}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}
```

For Astro/static sites, prefer a CSS-highlight treatment driven by one small module script. Restore the complete static paragraph under reduced motion or without JavaScript.

## Sticky horizontal track

- Use a vertical wrapper whose height represents the required scroll distance.
- Keep the track sticky for only the narrative section.
- Calculate travel from actual `scrollWidth - clientWidth`; do not hard-code `-66.6%`.
- Do not trap wheel, touch or keyboard scrolling.
- On narrow screens, switch to an ordinary vertical list or native horizontal overflow with visible controls.
- Keep focus order in reading order.

## Video scrubber

- Treat prompt/reference-image generation as a first-class source for authored
  product camera moves. CAD or a GLB model is not required when the visitor
  follows one pre-rendered path.
- Read `generated-product-scrubber.md` before producing or integrating the
  media.
- Use `preload="metadata"` by default and provide a poster.
- Wait for metadata before seeking.
- Coalesce updates with `requestAnimationFrame`.
- Avoid seeking when the requested time differs by less than a small threshold.
- Pause work when the section is outside the viewport.
- Supply a static poster or short ordinary video for reduced motion, data saving and unsupported devices.
- Test iOS Safari before choosing `<video>` seeking over a frame sequence.

## Infinite card deck

Drag must never be the only control. Include labelled Previous/Next or Dismiss buttons and announce the active card. Preserve a stable DOM reading order where possible. Requeue only after an exit animation completes; guard empty and one-card states.

## FAQ and disclosure

Use native `<details>/<summary>` unless product requirements demand an application-style accordion. Animate only the decorative indicator or a measured content wrapper. Keep the answer accessible without animation.

## Hover depth and parallax

Apply hover motion only to devices that support hover. Keep transforms small, avoid moving the hit target away from the pointer and match the same emphasis with `:focus-visible`.

## Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Use a targeted override when global suppression would hide required state changes.
