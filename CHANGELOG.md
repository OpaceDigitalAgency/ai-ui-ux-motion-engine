# Changelog

All notable changes to AI UI/UX Motion Engine are documented here.

## 2.0.1 - 2026-09-05

- Require a genuine multi-turn discovery conversation for every incomplete new
  creative brief, using small groups of concrete suggestions and focused questions.
- Prohibit creating or linking a complete brief file during initial discovery.
  Present the synthesised brief in the conversation after material decisions have
  been discussed; persist it only after user agreement.
- Treat “you decide” as permission to propose choices for discussion, not permission
  to replace the discussion with an entire self-authored specification.
- Add package checks for conversation-first and post-agreement recording rules.

## 2.0.0 - 2026-09-05

- Replace the production-heavy entrypoint with BRIEFING, PRODUCTION and DIRECT
  TASK modes. Production recipes load after a detailed brief and agreement.
- Preserve cinematic/provider/source/spend/creative/scroll checks in production.md,
  including existing scripts, templates and reference resources.
- Interpret short replies against the actual preceding conversation: "go on then"
  after a version answer continues briefing; after a concrete brief it may agree.
- Align launch prompts, plugin metadata and usage guidance with briefing first.
- Use isolated editable projects for multi-turn behavioural tests and compare file
  actions before/after agreement, alongside existing technical regressions.

## 1.8.2 - 2026-09-05

- Correct an observed fresh-task failure: an agent treated an inherited DOM
  recommendation as creative agreement and proceeded after resolving placement.
- Require provenance and scope for inherited creative decisions; distinguish
  actual user agreement, agent proposals, rejected attempts and superseded plans.
- Clarify that private/free production still requires an agreed or explicitly
  delegated direction. Repository reading cannot answer a pending creative question
  on the user's behalf. Preserve valid earlier agreement without repeat approval.

## 1.8.1 - 2026-09-05

- Develop new ideas through focused creative conversation before production
  intake: concrete interpretations, evolving briefs and scenario-specific meaning.
- Distinguish confirmed requirements, proposed choices and unresolved decisions;
  record agreement to a brief revision separately from spend authority.
- Preserve supplied briefs and explicit creative delegation. Reopen affected
  decisions when the story changes without repeating unchanged questions.
- Add conversational guidance across commercial transformations and quiet
  editorial work; keep technical validators separate from genuine user agreement.

## 1.8.0 - 2026-09-05

- Separate local authoring from provider execution and impact tier. Inspect
  reference interactions/workflow before selecting tools; no universal video,
  3D, hard-cut, shot-count or 10–15 second prescription.
- Add scenario-specific viewer takeaway, requirement-to-chapter mapping and
  named independent motion; distinguish actual layers/geometry from flat input.
- Add planning and generation stages. The latter checks source/evidence hashes,
  reviewed preview, current capability/quote records, exact submission payload,
  cumulative spend and attempt limits. Draft rendering validates the plan.
- Make continuous motion explicit and preserve requested duration ranges.
- Bind creative review and owner approval to exact brief/asset/evidence hashes;
  require in-between inspection, purpose, host fit and per-requirement evidence.
- Replace pre-approved templates with unreviewed examples that fail integration.
- Add isolated positive/negative regression cases and a fresh-context behavioural
  evaluation. These checks do not promise perfect output or gate unrelated tools.

## 1.7.0 - 2026-07-28

### Added

- Executable intent contract recording the user's requested signature moment,
  progression, payoff, effects and prohibited substitutes.
- Semantic flagship validation rejecting tier downgrades, five-second
  camera-only stories, missing narrative chapters, missing requested
  burst/transformation actions and unsupported unseen geometry.
- Regression fixture reproducing the failed full-screen homepage request that
  had previously passed as a one-shot supporting dolly.
- Separate creative-acceptance validator proving beginning, progression,
  payoff, meaningful state change, required effects and owner approval.
- Higgsfield CLI preflight that verifies authentication and available credits
  without submitting or charging for a generation.
- Regression runner proving that the valid flagship passes while the
  camera-only downgrade and wrong prompt mode fail.

### Changed

- Full-screen, homepage, signature, burst and intricate scroll journeys now
  default to flagship and cannot silently become supporting shots.
- Prompt rendering embeds the immutable intent contract and refuses to render a
  flagship brief through single-shot or illustrative modes.
- Provider routing is CLI first for Codex, then native MCP or API, with browser
  control allowed only as a recorded capability-specific fallback.
- Technical media delivery and creative acceptance are now separate mandatory
  gates; codec/keyframe success cannot justify a creative completion claim.

## 1.6.4 - 2026-07-27

### Added

- Mandatory poster-to-first-frame validation. The shipping poster must match
  the shipping MP4's aspect ratio and achieve at least 0.99 SSIM against its
  exact decoded opening frame.
- Accuracy-first workflow fields for lean delivery, target/escalation time,
  safe parallelism and risk-led frame inspection.
- CI rejection proof using a deliberately mismatched poster.

### Changed

- Media preparation now generates the poster from the finished all-intra
  shipping master before validating the pair.
- Browser acceptance rejects crop, scale, position, filter or mask changes at
  the poster-to-film handoff.
- The scalable default reuses one flagship across chapters and limits
  supporting films to genuinely new facts.
- Automated technical checks plus overview contact sheets are routine; dense
  sampling is limited to risky transitions, with exhaustive review reserved
  for defects or explicitly evidence-critical mechanics.
- Explicit timeboxes and safe model-aware parallelism reduce process bloat
  while retaining truth, spend and acceptance decisions with the lead model.

## 1.6.3 - 2026-07-27

### Added

- Deterministic `validate-scroll-media.mjs` gate proving that the exact shipping
  MP4 is silent H.264/yuv420p, fast-start, inside budget and 100% independent
  I-frames.
- Executable CI coverage that creates, prepares and revalidates a synthetic
  scroll master rather than syntax-checking the media pipeline alone.

### Changed

- The reference controller now permits one seek at a time, retains only the
  newest pending target and permanently latches the video visible after its
  first decoded frame.
- Scroll acceptance now requires full-speed forward, reverse and rapid
  direction-change evidence with zero poster exposure. Settled checkpoints and
  normal playback are explicitly insufficient.
- Short-GOP files and crossfade montages are rejected alongside ordinary
  long-GOP video.

## 1.6.2 - 2026-07-27

### Changed

- Keep hosted validation deterministic by syntax- and interface-checking the
  media script without depending on a live Ubuntu package mirror. The full
  `ffmpeg` transformation remains an explicit local acceptance test.
- Reissued the complete v1.6 archive after the CI dependency fix.

## 1.6.1 - 2026-07-27

### Changed

- Reissued the v1.6 cinematic-first workflow as a packaging patch so GitHub's
  immutable release can include the archive built from the tagged commit.

## 1.6.0 - 2026-07-27

### Added

- Mandatory cinematic-intent detection for scroll-controlled product reveals,
  burst/exploded effects, authored camera moves and photographic transformations
  even when the user does not name a tool or say “wow”.
- Concise first-response contract that requests truth mode, source references,
  scenes/placements, provider access and spend authority before page work.
- Flagship, supporting-shot and code-native production tiers with explicit
  proof-before-page, attempt-budget and stop rules.
- Parameterised cinematic brief, validator and prompt renderer for exact
  single-action, multi-shot flagship and illustrative burst workflows.
- Deterministic `ffmpeg` pipeline for silent all-intra scrub masters, 150-frame
  JPEG sequences, posters, contact sheets and metadata.
- Reusable framework-neutral scroll controller and production case study based
  on accepted and rejected technical-product footage.
- Dense product-identity, mechanical-geometry, scroll-direction and private
  approval verification gates.

### Changed

- Cinematic media is now proved before layout implementation; weak photo fades,
  CSS zooms, generic orbits and ordinary long-GOP video are explicitly rejected
  as substitutes.
- Provider capability, authentication, terms, references, displayed cost and
  attempt limits are first-class preflight requirements.
- Generated-product guidance now separates illustrative, identity-locked and
  evidence-accurate media and scales one flagship film into reusable chapters
  before commissioning more.
- Codex and Claude package versions advanced to 1.6.0.

## 1.5.1 - 2026-07-26

### Changed

- Reissued the 1.5 generated-product-scrubber capability as a packaging patch
  so GitHub's immutable release can include the versioned installation ZIP.

## 1.5.0 - 2026-07-26

### Added

- First-class generated product scrubber workflow for watch-style,
  image-to-video and prompt-to-video product experiences without mandatory CAD,
  GLB or WebGL assets.
- Provider-independent subject-lock prompt, exact end-frame chaining, Astro and
  React integration routes, SVG alternative, reduced-motion and Save-Data
  fallbacks.
- Acceptance checks that reject static-image crossfades, decorative parallax
  and unsynchronised playback as substitutes for continuous cinematic product
  motion.

### Changed

- Motion routing, media pipeline, framework recipes, provider guidance, prompt
  library and source-coverage record now make the prompt/reference-image route
  explicit.
- Codex and Claude package versions advanced to 1.5.0.

## 1.4.0 - 2026-07-26

### Added

- Dedicated `OpaceDigitalAgency/ai-ui-ux-motion-engine` public repository for
  individual-skill search discovery, releases, installation and sharing.
- Dedicated, long-form root README, repository metadata and branded social
  preview for the individual skill.
- Validation preventing auxiliary README files inside the canonical skill
  folder while checking the standalone repository identity.

### Changed

- Installation and discoverability documentation now distinguish this
  standalone human landing page from the machine-readable `SKILL.md` and the
  wider Opace Agent Skills collection.
- Codex and Claude package versions advanced to 1.4.0.

## 1.3.0 - 2026-07-26

### Added

- Opace Agent Skills collection identity and expandable skills catalogue.
- Contextual Opace web-design links in public documentation and plugin metadata.
- GitHub issue forms, pull-request template, support guide and code of conduct.
- Branded 1280 × 640 social-preview asset.
- Public repository and community-settings guidance for
  `OpaceDigitalAgency/skills`.

## 1.2.0 - 2026-07-26

### Added

- First-class installer targets and documentation for GitHub Copilot, VS Code,
  Windsurf, Cline, Roo Code, OpenCode, Amp, Zed and goose.
- Machine-readable platform and discovery-path registry.
- Provider-specific installation guides and honest ChatGPT/model-provider
  boundaries.
- GitHub description, topics, release and social-preview publishing checklist.
- Long-form, search-oriented README covering website use cases, UI/UX, motion
  patterns, frameworks, prompts, quality gates and FAQs.
- Validation for platform coverage, provider targets and local documentation
  links.

### Changed

- Expanded GitHub Actions to exercise every supported installer target.
- Updated Codex and Claude manifests to version 1.2.0.

## 1.1.0 - 2026-07-26

- Added portable shell and PowerShell installers for Codex, Claude Code,
  Cursor, Antigravity, Antigravity CLI, Gemini CLI and generic Agent Skills
  clients.
- Added cross-platform README documentation and package validation.

## 1.0.0 - 2026-07-26

- Rebuilt the original AI website-creation material as one standards-based
  Agent Skill with progressive references, media tooling, motion-safety checks
  and honest source-coverage documentation.
