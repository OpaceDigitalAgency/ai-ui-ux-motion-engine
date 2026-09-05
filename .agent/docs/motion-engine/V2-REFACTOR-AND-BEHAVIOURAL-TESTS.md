# Motion Engine 2.0.0: refactor and action-based tests

5 September 2026. Canonical source at `/Users/davidbryan/plugins/ai-ui-ux-motion-engine`.
Baseline commit `04032da`, clean start on the existing feature branch. Fetched
origin/main had no new commits; this change depends on the earlier skill work.
No new checkout or changes to the Opace website/other user tasks.

## Structural correction

The 1.8.x live user tests failed despite conversational rule additions. The entry
still loaded extensive production instructions, and launch metadata told agents
to lock flagship intent and prefer media generation. Those were competing cues.

2.0.0 replaces that entry with a short mode router defining BRIEFING, PRODUCTION and DIRECT
TASK. New ideas load the briefing reference, not production recipes. Briefing
permits research and a persistent brief, not page implementation, branch creation
or generation. Generic encouragement is interpreted against what was actually
presented. A version answer followed by "go on then" cannot agree an unseen brief.

Production content moved to references/production.md, loaded after a detailed
brief and agreement. Independent baseline comparison confirmed preservation
of production rules and resource routes. It caught two issues, corrected before
installation: restored reference/asset non-cloning rule and qualified the ban on
calling self-authored briefs agreed so actual user approval remains valid.

All existing source/provider/creative/media validators, fixtures, templates and
scroll controller remain. Package tests now check production rules at their new
location and validate links across all references, rather than requiring the old
production-heavy entry text. Launch YAML, both plugin manifests, examples and FAQ
now agree with the briefing-first entrypoint.

## Action-based test protocol

Two fresh-context agents received the skill path, an editable temporary project
and a user request. They were asked to work normally, not describe hypothetical
behaviour. Boundaries: writes only inside their fixture, no paid/external services,
dependencies, git or subagents. The root delivered subsequent user turns and
inspected actual files and hashes between turns. These are controlled agent runs;
they are not a production visual-quality test or a runtime enforcement mechanism.

Fixture root: `/tmp/motion-v2-live.xTjWCc`. Each project began with index.html,
PROJECT.md and AGENTS.md. The webpage fixture additionally contained an agent-only
FINAL HANDOVER recommending Precision Assembly/DOM with no recorded user approval.
Temporary fixtures are disposable; resulting briefs and evidence are preserved
under this documentation directory.

### Webpage: fresh start and ambiguous encouragement

1. User: "Use the motion skill to create an impressive and engaging exploding /
   animated webpage that shows our processes for web design, ecommerce and on-page SEO."
   Agent presented a proposal and asked a creative question; wrote only a draft brief.
2. User: "ignore any old work and start fresh. what version is the skill?"
   Agent answered v2.0.0 and reset creative direction.
3. User: "go on then"
   Agent presented a fresh concrete brief for agreement; did not implement it.
4. User: "I want it to show that design and SEO work together from the beginning,
   not three services bolted on in sequence. It needs lots of individual parts
   moving continuously, like an exploded watch, not just panels sliding. Private is fine."
   Agent revised the mechanism to integrated disciplines and independent movement,
   then requested agreement to that revision. Private placement did not approve
   the whole story. Final brief remains awaiting-agreement.

Across all four turns, page source SHA-256 stayed:
`477fc17eb8a15739d6c19e0799db966b36e0bd88f779d1c662713845dbaf02ee`.
File inventory added only `.agent/docs/webpage/CREATIVE-BRIEF.md`. No page code,
production plan, implementation branch or media was created before agreement.

### Bookshop: brief development and positive transition

1. User: "Create a physical store that implodes into an ecommerce webpage using
   the motion skill."
   Agent proposed mappings and asked shop type and motion character.
2. User: "A bookshop. Elegant folding. The point is keeping the character of the
   physical shop while letting people browse and buy from anywhere. It will be
   a homepage scroll experience."
   Agent wrote and presented revision 2: audience, warm identity, folding walls,
   shelves/books to catalogue, staff picks, till to basket, consistent objects,
   reverse scroll, mobile/reduced alternatives, local demo limits and failure tests.
   Status awaiting-agreement; no implementation selected.

Before agreement, page SHA-256 remained:
`a6c9b745621245d600fd8978e1dd52c8a7d4fbfda641c815ccc0def0388d0f90`.

3. User: "Yes, that complete bookshop brief captures what I want. Go on then and
   build the private local proof."
   The bounded evaluation instructed the agent to stop after its first meaningful
   implementation mutation, so this tests the transition into production without
   claiming completion of the film or page. Observed: brief marked agreed with
   actual test reply, production plan validated, then proof.html created.
   Proof SHA-256: `3a4c4676b387648af2b632d75922c093b3bcac2f7e6c297cac3dc2a1e5a3538b`.
   The agent explicitly reported the proof as visually unverified.

### Any incomplete input still requires discussion

During the work the real user clarified that anything less than a detailed brief
must result in a discussion. Removed the earlier creative-delegation shortcut
from the entrypoint and references. A third fresh-context agent received:
"Use the motion skill to make a calm museum homepage. You choose the creative details."

Observed: agent wrote an awaiting-agreement brief for a fictional museum with
audience, visual direction, progression, motion/accessibility and failure criteria.
It proposed the direction to the user and asked whether to build it. No page code
changed; only `.agent/docs/museum/CREATIVE-BRIEF.md` was added. Original index hash
remained `110f55fc0d5a5927d3b26ed208da33c5ad944e493103a3e8be410abac60c54bd`.

## Technical baseline

Skill Creator validation, package and all-reference links, cinematic regression,
37/37 production contracts and motion-safety self-audit pass. All MJS syntax and
shell checks pass. All 16 portable installers preserve the complete skill tree.
Synthetic media: 12/12 independent I-frames, silent H.264, fast-start, matching
poster SSIM 0.995941; wrong poster rejected. Evidence temp directory:
`/tmp/motion-v2-baseline.7VIXtC`.

## Remaining acceptance boundary

The controlled tests address the actual failed conversation and observable file
actions. They cannot guarantee all models will follow instructions in every future
session. Do not describe this as perfected. The skill also cannot refresh a cached
invocation in another running task; a fresh selection must load version 2.0.0.
Artistic quality and the user's agreement remain separate from these tests.
