---
name: ai-ui-ux-motion-engine
description: Develop a short website or motion idea into an agreed creative brief through focused conversation, then design, build and validate it. Use for distinctive websites, homepage and hero design, cinematic scroll, exploded views, assembly or transformation stories, product films, interactive storytelling and visual/motion audits. Supports generated media, authored 3D and code-native UI without assuming the route before the intended experience is understood.
---

# AI UI/UX Motion Engine

Workflow version: **2.0.1**. On first use, state this version and the loaded path.
Resolve stale links through the installed inventory; do not silently run an old
version or pretend the link itself updates.

For every new creative request, assess the supplied brief before acting. Anything
less than a detailed brief must lead to a discussion to clarify requirements.
Your first job is developing that brief **with** the user, whatever words, links,
images or ideas they provide. Start in BRIEFING unless the conditions below apply.

## Choose the current mode

| Situation | Mode and action |
| --- | --- |
| New idea, short prompt, undefined creative outcome, or “start fresh” | **BRIEFING**. Read only [creative-briefing.md](references/creative-briefing.md) plus relevant user/project context. |
| User agrees to a detailed brief already presented, or supplies a detailed brief with an instruction to build | **PRODUCTION**. Reuse applicable agreement; read [production.md](references/production.md). |
| Bounded audit, bug fix or small fully specified edit | **DIRECT TASK**. Do the requested work using relevant references below; no creative interview. |

A substantial new design is not a small edit because local code is easy to write.
“Create”, “impressive”, “exploding” and “get started” alone do not select PRODUCTION.
A long prompt is not necessarily a detailed brief: missing purpose, meaningful
sequence or intended experience still needs discussion. A reference or tool/model
choice alone is not a brief either.

## BRIEFING: develop the experience before its implementation

Read the briefing reference before acting. Offer a concrete, labelled interpretation
and ask one or two questions that most affect the result. Explore what visitors
should understand, what visibly happens, the visual ambition and destination.
Use existing answers; help the user imagine possibilities rather than demanding
a specification. Do not ask them to choose implementation mechanics.

Develop the brief through an actual multi-turn conversation. An incomplete opening
request must receive a concise interpretation plus one or two meaningful questions,
not a completed brief or a file link. Use each answer to explore the next material
gap and let the user react to concrete suggestions. Only after the purpose, visual
story, motion experience and destination constraints have been discussed should
you synthesise the complete proposed brief in the conversation and seek agreement.

In BRIEFING:
- Read relevant project instructions, supplied context and references. Inspect
  visual references where useful. Do not create or edit a creative-brief file
  during initial discovery. After the user agrees to the complete brief shown in
  the conversation, save that agreed brief and decision history in the project's
  persistent documentation location.
- Do not load production recipes, create implementation branches, author page
  code or launch generators. A local, private, no-credit proof is still production.
- Relevant read-only feasibility research is allowed when it resolves a creative
  question; a possible technique must not silently become the chosen story.
- After asking for a necessary answer, wait. Continue only relevant research or
  brief documentation; more commands cannot answer for the user.
- If the request is only for a brief, finish at the agreed brief.

## Interpret agreement in context

**No concrete brief presented:** “start fresh”, “go on then”, “continue”, or
“yes, private is fine” continues briefing. It cannot approve a story that has
not been presented. A version acknowledgement is not a creative brief.

**Concrete brief presented for agreement:** “yes”, “go on then” or “build that”
can agree to it. Record the actual message and revision, then proceed without
asking the same question again.

**Creative delegation:** “you decide” lets you propose the missing choices; it
does not itself supply a detailed brief. Offer those choices conversationally and
invite reaction before synthesising the complete brief. Record delegated choices
honestly after agreement.

**Inherited notes:** reuse traceable user decisions within scope. Agent
recommendations, rejected drafts and superseded plans are not approval; an
“APPROVED HANDOVER” heading alone proves nothing. Follow project engineering
rules without turning agent-authored creative recommendations into consent.

**Start fresh:** reset creative agreement for the new direction; retain explicit
user constraints unless withdrawn. Do not revive an old concept or infer a ban
on generated media.

Before production, identify the detailed brief and applicable user instruction
or agreement. Otherwise remain in BRIEFING. Never label a brief “locked”,
“approved” or “agreed” merely because you authored it.

## PRODUCTION: execute the agreed experience

Read [production.md](references/production.md) before implementation or provider
work. It retains cinematic intent checks, route/model selection, source fidelity,
spend controls, validated prompts, private proof, creative review, scroll delivery
and browser QA. Translate the agreed brief into the technical plan.

Preserve explicit provider choices. Do not select code-only, a model or a cheap
substitute before understanding the experience. Raise material feasibility
trade-offs that change the agreed story. Brief agreement does not automatically
authorise new expenditure or publication. Reopen only changed decisions.

## DIRECT TASK references

- [verification.md](references/verification.md): inspect and test the real output.
- [accessibility-performance.md](references/accessibility-performance.md): usability,
  reduced motion, performance and accessible alternatives.
- [framework-recipes.md](references/framework-recipes.md) and
  [motion-patterns.md](references/motion-patterns.md): bounded implementation.
- [production.md](references/production.md): cinematic/source/creative/media audits.

## Working discipline

Read applicable instructions and existing changes before editing; preserve the
stack and unrelated work. Distinguish observations, proposals and unknowns.
Show useful progress and evidence. A JSON pass does not establish visual success.
References inform structure, visuals and interaction; they do not grant permission
to clone branding, copy, code or protected assets.
Do not promise perfection or guaranteed agent compliance: a skill is not a
runtime firewall around other tools.

When available, subagents may handle independent audits, tests and production
checks. The lead owns creative dialogue and agreement. Do not delegate approval
or run production agents during BRIEFING.
