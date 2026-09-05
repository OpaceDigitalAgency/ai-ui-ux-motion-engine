# Cinematic intake and stop rules

Use this gate before page implementation whenever the requested impact depends
on photographic camera movement, product transformation, burst/exploded motion
or scroll-controlled film.

## Ask only what is missing

1. **Target:** Which page areas need a flagship sequence, a supporting shot or
   code-native motion?
2. **Reference:** What should the visitor see happen? Use an attached example,
   storyboard or short scene list. Watch the relevant full video sequence and
   inspect timestamped keyframes, plus any available transcript, prompt pack
   and description links. Distinguish observed motion from an inferred workflow;
   isolated screenshots cannot establish timing or the production technique.
3. **Truth mode:** May the media be illustrative, must one concept identity stay
   stable, or must every visible product detail be evidence-accurate?
4. **Source:** Which photographs, approved keyframes, CAD renders or existing
   clips are authoritative?
5. **Route:** Which user-selected tools/providers must be honoured? If external
   generation is selected, is the provider connected and signed in?
6. **Authority:** What credit cap and maximum attempts are approved? Has the
   user authorised uploads and provider terms?
7. **Delivery:** Which browsers/devices matter, and is a static mobile or
   reduced-motion fallback acceptable?

Do not burden the user with implementation choices that the skill can make.

## Immediate response contract

When a selected route has a missing dependency, name only that dependency and
continue work that does not depend on it. For example:

> The requested motion needs a source and technique capable of showing these
> changing states. I will prove the signature sequence privately. The remaining
> dependency for the selected route is [specific missing source or authority].

Continue independently when these answers already exist. Existing user
authority remains valid within its scope; do not repeat approval questions.
Local animation, 3D or compositing does not require an external provider.

Keep the request to five decisions: accuracy target, source readiness,
provider/spend authority, desired placements and delivery/time budget. Do not
ask the user to choose implementation mechanics.

Repeatability means the same evidence, routing and rejection process is used
from the beginning. It cannot guarantee a perfect creative result or force an
agent or stochastic generator to comply. Validate actual outputs and stop
unsupported success claims.

## Accuracy-first routing

Use the fastest route that can meet the stated accuracy. For real products with
authoritative sources, default to evidence-accurate. Never substitute an
illustrative spectacular result silently. State before generation when exact
mechanics require CAD, compositing or real footage.

Use these target timeboxes:

- 15–30 minutes: private proof with ready sources and provider;
- 30–60 minutes: approved flagship plus scroll delivery;
- 5–10 minutes: derivative or supporting integration;
- 75–120 minutes: only for new/inconsistent sources, evidence-critical
  mechanics, CAD or compositing.

If a target is exceeded, report why and the next step. Continue already
authorised work; seek new authority only for a material scope/spend change or
an explicitly agreed hard limit.

## Turn the reference into a scenario-specific motion plan

Record what each timed action lets the visitor understand about this subject.
An exploded watch reveals components and how they form a mechanism; a webpage
may instead reveal how audience needs affect structure, content and actions.
Do not copy that example's subject, narrative or production route into every
future scenario. Name the actual visitor takeaway and the visible evidence
that will communicate it. Labels alone are not a causal demonstration.

When intricate independent motion is requested, identify the component groups,
their overlapping timing, separation/rotation paths, depth changes, camera
relationship and final relationship. Avoid three held compositions linked by
transitions when the reference calls for continuous activity. Many encoded
frames do not establish many meaningful visual states.

Assess what the sources constrain and what the technique must invent. Flattened
images can condition an intricate generated film; they do not prove independent
control or consistent intermediate geometry. Separate layers, 3D, compositing
or footage provide other kinds of control. Select the cheapest credible route
for the requested truth mode, describe unresolved continuity risk and bound the
proof. Do not mandate 3D simply because the request says “intricate”.

If direction or choreography is unresolved, make the cheapest suitable preview
first: annotated styleframes, a motion study or an animatic. Choose the preview
that resolves the uncertainty; do not require all three or invent a compulsory
owner approval checkpoint before every paid proof.

## Three production tiers

### Flagship

- Use for the homepage or a key product-family journey.
- Use the requested duration with an authored beginning, progression and payoff.
  There is no mandatory 10–15 second length or number of shots.
- Treat full-screen, homepage, signature, intricate, burst, exploded and
  immersive scroll requests as flagship. Do not downgrade them to supporting
  merely because only one source image or a cheaper model is available.
- Select controls that fit the actual motion plan. A continuous scroll journey
  defaults to one continuous shot; hard cuts require an explicit editing plan.
- Use the approved attempt and credit cap. In the absence of a broader cap,
  propose one bounded paid proof and obtain the missing spend authority.
- Reuse chapters of one approved film before generating more flagship films.

### Supporting cinematic shot

- Use for macros, controlled camera pushes, cooling, connector detail,
  power-on or one mechanically simple action.
- Keep one action, one camera instruction and one or two consistent references.
- Usually 3–5 seconds.
- Use lower-cost or unlimited generation only when its result passes QC.

### Code-native motion

- Use CSS, SVG, canvas or an existing motion library for diagrams, airflow,
  data paths, masks, typography and interface transitions.
- Do not spend generation credits when photographic state change is unnecessary.

## Truth-mode routing

### Illustrative

Permit creative transformation but still reject visible defects, unwanted text
and incoherent motion.

### Identity-locked

Use one identity-authority frame and keep proportions, material, lighting and
recognisable features stable. Reject identity drift.

### Evidence-accurate

Record immutable counts, geometry, labels, ports and permitted mechanical axes.
Use consistent photography, CAD or approved keyframes. If the generator cannot
hold these details after the approved attempts, simplify the motion or route to
CAD/compositing/real footage. Never prompt harder indefinitely.

## Proof-before-page rule

The first deliverable is:

1. the validated cinematic brief with the user's intent, timed viewer takeaways,
   progression, payoff, source coverage and prohibited substitutes recorded;
2. the prepared source pack and any preview needed to settle a known uncertainty;
3. one proof from the selected generation, 3D, compositing or footage route;
4. automated technical checks, an overview contact sheet and risk-led dense QC;
5. an isolated scroll prototype with poster and reduced-motion fallback.

Follow [production-contract.md](production-contract.md) for plan-stage evidence
and the separate exact-payload generation gate. Run the brief gate before
upload or spend:

```bash
node scripts/validate-cinematic-brief.mjs cinematic-brief.json --check-files --stage plan
```

After generation, run `validate-creative-acceptance.mjs --stage review`.
Technical media validation is a separate gate and cannot prove creative
success.

Do not redesign, publish or populate multiple routes until the user approves
that proof.

## Rejection and stop rules

Reject without trying to hide:

- changing product identity, count, spacing, ports or labels;
- unrequested rotation, or bending, merging, duplicating or disappearing rigid parts;
- implausible insertion axes or clipping;
- texture crawl, false seams, invented branding or unreadable pseudo-text;
- a camera move that replaces the requested product story;
- a clip too short or slight to fulfil its assigned chapter;
- a collection of unrelated shots presented as one continuous journey;
- decorative assembly that cannot communicate the recorded visitor takeaway;
- three interpolated compositions when continuous independent activity is required;
- visible scrub jitter or incorrect reverse/forward mapping.

After the attempt cap, report the evidence and recommend one bounded change:
simpler action, better references, stronger model, CAD/compositing/filming, or
an explicitly illustrative concept.
