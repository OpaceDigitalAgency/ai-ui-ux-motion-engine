# Reference and media pipeline

## Capture a reference responsibly

When the user controls or may legally analyse the reference:

1. record at the target viewport without browser chrome where possible;
2. use a steady scroll and pause before/after meaningful triggers;
3. capture pointer, hover, drag, menu and accordion states separately;
4. note viewport size, frame rate and page URL;
5. retain the recording as analysis evidence, not a shipping asset.

Do not reproduce identity-specific copy, logos, illustrations, photos or source code.

## Extract frames

Use `scripts/extract-reference-frames.sh`. Its default output includes:

- evenly sampled frames for section order;
- scene-change frames for visual transitions;
- an `ffprobe.json` metadata record.

Inspect frames as a sequence. A still image cannot prove easing, pinning or interaction state.

## Build generated visual continuity

For a multi-clip journey:

1. approve a still keyframe and visual brief;
2. generate a short first clip;
3. extract its final clean frame;
4. use that exact frame as the next clip’s reference;
5. keep lens, camera path, subject geometry, lighting and colour instructions fixed;
6. validate the join visually;
7. hide or replace any failed join.

This improves continuity; it cannot guarantee “100%” consistency.

## Video versus frame sequence

Choose video when file size, decoding and seeking are proven on target devices. Choose frames when exact seeking and fallback control justify the additional requests and memory. For frame sequences:

- size frames to rendered dimensions;
- prefer AVIF/WebP when supported by the build;
- preload only the opening set;
- fetch ahead in small windows;
- cap decoded frames in memory;
- draw an accessible poster before JavaScript runs.

## Delivery requirements

- declare width and height or aspect ratio;
- use project-native image optimisation;
- avoid making multiple large media elements LCP candidates;
- provide descriptive alt text for informative stills;
- use empty alt text for decorative imagery;
- caption evidence images when provenance matters;
- never ship an autoplaying audio track;
- disclose generated imagery when context could imply documentary evidence.
