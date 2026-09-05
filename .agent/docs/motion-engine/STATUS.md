# Motion Engine 2.0.0 — briefing-first restructure

## Current status: 5 September 2026

The actual 1.8.2 test also failed: "start fresh", a version answer, then "go on
then" led straight to a self-locked code-only brief and implementation. Historical
passing simulations below did not predict that behaviour and are not acceptance.

The current update replaces the large production-heavy entrypoint with a short
mode router. New creative requests enter BRIEFING; production recipes are loaded
only after a detailed brief and agreement. User clarification during this work:
anything less than a detailed brief must lead to discussion, irrespective of
input form. Creative delegation alone now proposes choices for discussion; it
does not bypass the brief. DIRECT TASK is only for bounded audits/fixes/edits,
not a loophole for a new website or cinematic concept.

Preserved all existing production references, templates, validators and controller.
Moved the former production workflow into references/production.md. Updated
discovery/launch prompts, plugin manifests, README examples and package/link checks.
Independent preservation review found two issues, both corrected before install.

Installed/enabled version: 2.0.0, verified through supported plugin CLI and byte
comparison of source versus installed skills. Entry:
`/Users/davidbryan/.codex/plugins/cache/personal/ai-ui-ux-motion-engine/2.0.0/skills/ai-ui-ux-motion-engine/SKILL.md`.

Action-based tests used fresh-context agents with editable isolated projects.
Webpage request -> start fresh/version -> "go on then" -> integrated design/SEO
feedback: agent developed/revised an awaiting-agreement brief and made no page
changes. Bookshop request -> clarification -> complete brief -> explicit agreement:
agent held before agreement, then validated the production plan and created
proof.html afterwards. Proof SHA-256:
`3a4c4676b387648af2b632d75922c093b3bcac2f7e6c297cac3dc2a1e5a3538b`.
The test deliberately stopped after the first implementation mutation; that proof
is not visually verified or claimed complete. Detailed reproducible cases and
preserved briefs: `V2-REFACTOR-AND-BEHAVIOURAL-TESTS.md`, `evidence/2.0.0/`.

Third action-based test: a vague museum request with "you choose the creative
details" yielded a proposed detailed brief and an agreement question, with source
unchanged. This tests the user's clarification that delegation alone cannot
replace a detailed brief and discussion.

Regression baseline passes: Skill Creator/package/all-reference links, cinematic
tests, 37 production contracts, motion safety, module syntax, 16 installers and
positive/negative media validation. No Higgsfield/image generation or real website
changes. No runtime guarantee: these instructions cannot intercept arbitrary tools.
No public tag/default-branch merge; feature-branch checkpoint only.

Next user acceptance: select the skill afresh and verify it reports 2.0.0, then
provide an idea. Its first meaningful deliverable must be a discussion and a
brief you can recognise and agree, not page code. Existing loaded task instructions
are not rewritten by installing an update.

## Historical 1.8.2 record — superseded

## Latest correction: 5 September 2026

The user's actual fresh-task screenshot disproved 1.8.1's briefing behaviour in
a repository with inherited notes. The agent loaded 1.8.1, proposed Precision
Assembly/DOM, asked only placement, then treated a handover as answering that
question and proceeded without agreeing the creative story. This was a workflow
failure, not simply the old 1.7.0 skill link. Earlier simulated tests did not
cover inherited agent recommendations and were insufficient.

Bounded 1.8.2 correction: distinguish user agreement from agent-written proposals,
rejected attempts and superseded directions. Private/free/local work cannot bypass
brief agreement. Preserve valid prior agreement and explicit creative delegation.
No changes to another task, website files, provider accounts or generated media.

Canonical branch began clean at `3042070`; fetched default branch had no new
commits (0 behind, 2 ahead). Version 1.8.2 installed/enabled by supported plugin
CLI; source and installed skill directories match byte for byte. Installed entry:
`/Users/davidbryan/.codex/plugins/cache/personal/ai-ui-ux-motion-engine/1.8.2/skills/ai-ui-ux-motion-engine/SKILL.md`.

Two independent read-only agents tested inherited notes, placement-only consent,
misleading approval headings, valid approval, explicit delegation and superseding
user feedback. Outcomes and reproducible cases are in
`BRIEFING-REGRESSION-2026-09-05.md`. All six cases behaved as intended in simulation.
No claim that these tests enforce tool calls or guarantee future agent compliance.

Verification: package/Skill Creator validation, cinematic regression suite,
37/37 production contract tests, motion-safety audit and diff checks passed.
Full installer/media baseline passed: 16 installers; 12/12 independent I-frames,
silent fast-start H.264, poster SSIM 0.995941; wrong poster rejected.
Temporary media evidence: `/tmp/motion-182-check.DN1yaC`.

Next step for the failed task: explicitly reload the installed 1.8.2 entrypoint
and resume at creative briefing, preserving its existing work as unapproved.
An installation does not rewrite the instructions already loaded in that task.
Feature-branch checkpoint only; no default-branch merge or release tag.

## Historical 1.8.1 record

## Latest update: 5 September 2026

User acceptance target: a short idea should develop through conversation into
an agreed, scenario-specific brief, with the depth of the webpage/SEO example
but without copying its subject, style, tools or duration into other projects.

Bounded change: creative discovery and agreement before production. Canonical
checkout and branch remain those below; clean start at `6d5778b`, fetched
`origin/main` has no new commits (0 behind, 1 ahead). No additional checkout.
Existing 1.8.0 changes are a dependency and remain intact.

Implemented and installed 1.8.1 using supported `codex plugin add`; CLI lists
1.8.1 enabled. New entrypoint:
`/Users/davidbryan/.codex/plugins/cache/personal/ai-ui-ux-motion-engine/1.8.1/skills/ai-ui-ux-motion-engine/SKILL.md`.

The skill now explores purpose and visual transformation with one or two focused
questions, offers labelled interpretations, refines a visible brief and records
agreement to a revision before production. Existing agreed briefs and explicit
delegation avoid repetitive interviewing. Meaning, sequence, interaction, site
fit, constraints and observable success all belong in the brief. Agreement and
spend authority remain separate. No tool firewall or artistic guarantee added.

Independent read-only conversation tests covered webpage/SEO, shop-to-ecommerce,
a calm museum without references, an existing agreed brief and creative delegation.
They exposed older first-response and deliverable wording that was corrected,
plus clarified SEO scope, delegation and natural conversational updates.
These are simulated conversation tests, not evidence of a real user's agreement.

Validation: Skill Creator and package checks pass; cinematic regressions pass;
production contract suite 37/37; motion-safety audit clean. Full delivery baseline
passes (12/12 independent I-frames, silent fast-start H.264, matching poster;
wrong poster rejected). All 16 portable installers include the new reference.
Temporary baseline evidence: `/tmp/motion-briefing-check.40E7w5`.
No website modifications, generated media or credit spending. Public release/tag
and merge remain outside scope; feature-branch checkpoint is separate.

Next acceptance test: start a new task selecting the installed 1.8.1 skill with
only a short idea. Expect useful questions and an evolving brief before production.
The current task's older 1.7.0 attachment is not the updated entrypoint.

## Historical 1.8.0 implementation record

5 September 2026. Canonical source: `/Users/davidbryan/plugins/ai-ui-ux-motion-engine`.
Branch: `codex/motion-evidence-gates-2026-09-05`, based on fetched `origin/main`
at `c656647`. Initial tree clean; one checkout, no worktrees added.

## Scope and outcome

Update the existing skill for repeatable fresh-task routing and evidence-based
acceptance across subjects. Preserve generated-media and local-authoring routes,
user choices and existing authority. Do not promise artistic perfection or
claim that scripts can intercept arbitrary tools.

Implemented 1.8.0 in canonical source and installed using the supported command
`codex plugin add ai-ui-ux-motion-engine@personal --json`. CLI verification reports
version 1.8.0 installed and enabled at:
`/Users/davidbryan/.codex/plugins/cache/personal/ai-ui-ux-motion-engine/1.8.0`.
The installed skill tree matches canonical source byte for byte. No cache-only
patch, provider generation, credit expenditure or website edit was used.

The installed version is ready for a new task. GitHub release/tag/publication is
separate and has not occurred. The current task's original attached 1.7.0 text
is historical; a new task should select the installed skill again.

## Verified changes

- Actual reference interaction/workflow inspection precedes route selection.
- Local procedural 3D remains flagship; exact controls/text do not require a
  provider. Generated motion from flattened inputs is an experiment where
  unresolved, not automatically impossible or verified.
- Continuous editing and explicit duration ranges replace compulsory hard cuts
  and 10–15 seconds. Renderer invokes planning validation.
- Separate generation gate binds input/evidence/payload hashes, reviewed preview,
  current capability/quote evidence, authority and cumulative spend/attempt caps.
- Creative review binds exact brief/asset and requirement evidence; integration
  additionally requires corresponding owner approval evidence. Unreviewed
  templates fail integration.

## Verification

- Skill Creator quick validation: pass.
- Package/link validation and motion-safety self-audit: pass.
- Existing cinematic regression suite: pass.
- New production/creative contract suite: 37 passed, 0 failed in source and
  installed copy. Includes valid local/experimental/text-only routes, eight-second
  flagship, rejected stale evidence/inputs/payloads/quotes, caps, failed review
  status and stale owner approval.
- All JavaScript modules and relevant shell scripts pass syntax checks.
- Synthetic FFmpeg delivery baseline: 12/12 independent frames, silent H.264,
  fast-start, matching poster SSIM 0.995941; deliberately wrong poster rejected.
- All 16 portable installer targets exercised in a temporary test directory.
- Fresh-context read-only behavioural evaluation identified upload-order,
  local-route, MP4 and timebox contradictions; all corrected and rechecked.
  This is workflow evidence, not a new visual production acceptance test.

The positive creative regression uses explicitly synthetic bytes to exercise
record binding. Hashes verify consistency, not the truth of an observation or
authority. A host-level enforced tool boundary would require additional runtime
integration; it is outside this skill update.

## Reference finding

The supplied [watch chapter](https://www.youtube.com/watch?v=ZJG1a2n3KGQ&t=1413s)
was inspected through an authorised browser, including on-screen prompt and
rendered transcript. Around 23:44 the prompt explicitly requests programmatic
assets, Three.js and one file. Around 25:23 the result provides a component
assembly slider plus drag-to-orbit. This is not evidence of an eight-second
Higgsfield film. The presenter also identifies glass/movement defects; reference
appeal does not prove perfection. These observations informed generic routing,
not a mandatory tool choice for every future subject.

## Fresh-task test

Select the installed skill and provide only the scenario, reference, destination
and constraints, for example:

> Use AI UI/UX Motion Engine for an 8–10-second forward/reverse scroll sequence
> on my homepage. Adapt the independent component motion in this reference to
> [subject] and communicate [viewer takeaway]. Inspect the reference first,
> choose the suitable route, preserve my site's design and show a private proof.
> Use [provider preferences] and stay within [credit/attempt cap].

The task should announce workflow 1.8.0, inspect actual reference motion, keep
observed facts separate from proposals, select current tools for the actual
need, show progress and refuse unsupported acceptance or spend. It should not
need the previous conversation. Remaining test: produce and judge the requested
visual artefact itself in that new task.
