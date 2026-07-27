# Cinematic prompt contracts

Generate prompts from a validated cinematic brief with:

```bash
node scripts/render-cinematic-prompt.mjs <brief.json> --mode flagship
```

Use `--mode single` for one supporting action and `--mode illustrative` for a
creative transformation. Provider upload tokens may replace reference names
after the files are attached.

## Prompt-writing rules

- Give one reference the role of identity authority.
- State immutable geometry and exact counts positively before exclusions.
- Use one physically legible action per supporting clip.
- For a flagship film, use explicit shot boundaries, durations and hard cuts.
- Specify permitted camera movement separately from object movement.
- End every mechanical shot with a short still hold for QC and scroll cues.
- Keep generated audio off and put readable text in the DOM.
- Do not assume a longer negative prompt can repair inconsistent references.

## Exact single-action contract

```text
Create a silent premium product-engineering shot of the exact subject in
[IDENTITY REFERENCE].

IDENTITY LOCK
Preserve [IMMUTABLE DETAILS AND COUNTS]. Rigid objects remain rigid and retain
their size, shape, order and spacing.

ACTION
Perform only [ONE ACTION] along [PERMITTED PHYSICAL AXIS]. Begin at [START
STATE], finish at [END STATE], then hold completely still for [HOLD].

CAMERA AND LIGHT
Use only [ONE CAMERA MOVE] with [LENS/FRAMING]. Preserve [LIGHT/BACKGROUND].

REJECTED CHANGES
No morphing, rotation unless explicitly requested, duplication, disappearing
parts, clipping, altered geometry, invented text, logos, labels, people,
hands, tools, particles, smoke, holograms, camera shake or generated audio.

DELIVERY
[DURATION], [ASPECT], [RESOLUTION], clean first and final frames.
```

## Exact multi-shot flagship contract

```text
Create one silent [DURATION] premium product film with [SHOT COUNT] distinct
hard-cut shots. Every reference depicts the same product. [IDENTITY REFERENCE]
is the authority for identity; other references constrain only their named
shots.

SUBJECT AND CONTINUITY LOCK
Preserve [IMMUTABLE DETAILS]. Exactly [COUNTS] remain present in the same order
and spacing. Rigid parts never bend, stretch, merge, duplicate, disappear,
change design or trade places. Mechanical motion occurs only on the stated
physical axes.

SETTING AND LIGHT
[BACKGROUND, MATERIAL, KEY LIGHT, RIM LIGHT, COLOUR GRADE]. Keep these
continuous across every shot.

SHOT 1 — [NAME] — [START-END]
[REFERENCE]. [START STATE]. [ONE ACTION]. [CAMERA]. [END STATE AND STILL HOLD].

[REPEAT ONE BLOCK PER SHOT]

EDITING
Use only the stated hard cuts. No morphs, dissolves, orbit, turntable, digital
zoom, handheld shake, jitter, texture crawl, flicker or motion smear.

EXCLUSIONS
[PROJECT-SPECIFIC EXCLUSIONS]. No added or missing parts, invented seams,
labels, logos, watermarks, people, hands, tools, loose cables, sparks, smoke,
particles, holograms or generated audio.

DELIVERY
[ASPECT], [RESOLUTION], [FRAME RATE], silent, stable first frame and final
[HOLD] still hold.
```

## Illustrative burst/exploded-view contract

```text
Create a silent cinematic exploded-view sequence using [REFERENCE] as the
identity anchor. The complete subject separates into [NAMED GROUPS] along
clean radial or linear paths, pauses in a readable layered arrangement, then
returns exactly to the opening silhouette. Keep every group recognisable and
preserve the total part count. Use [CAMERA MOVE], [LIGHT] and [BACKGROUND].
No liquid morphing, random fragments, duplicate parts, text, logos, people,
camera shake or generated audio. End on a clean still frame.
```

This route permits stylised mechanics. Do not use it to imply an exact real
product assembly unless every visible state is independently verified.

For a reference-style scroll sequence, use the same approved anchor separately
for an orbit/dolly prompt, the burst/exploded prompt and a macro/detail prompt.
Do not ask one generation to perform all three. Reverse the accepted separation
clip for reassembly only after checking every reversed frame.

## Prompt failure diagnosis

- Identity drift: improve or reduce references; do not add adjectives.
- Incorrect count: make the count visible in both start/end references and
  simplify occlusion.
- Mechanical morphing: split the action into a separate short clip or use CAD.
- Missing shot: reduce shot count or accept and disclose the omission; never
  claim it appeared.
- Boring result: improve shot design, framing and payoff—not CSS decoration.
