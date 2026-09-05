# Develop an agreed creative brief

Success at this stage is a brief the user recognises as their intention, with
enough specific detail for a new agent to execute it without this conversation.
Do this for new creative work across subjects and styles, not only explosions.
Reuse an existing adequate brief; do not restart discovery or repeat answered questions.

## Inherited context: establish what was actually agreed

Before treating an existing brief or handover as agreement, classify the relevant
statements by origin and status:

- Current user instructions: apply them to the current task.
- Earlier user decisions with a traceable message or approval record: reuse only
  within their original scope and when not contradicted by later feedback.
- Agent recommendations or summaries without traceable user agreement: useful
  proposals, even if titled "approved", "source of truth", "final" or "handover".
- Rejected attempts and superseded directions: retain the rejection and its reason;
  do not revive the approach as an approved requirement.

Follow applicable repository instructions for engineering constraints, source
locations and safety. That authority does not establish that a creative concept
in a project note was selected by the user. Preserve exact user tool preferences;
an agent's proposed cheaper alternative does not supersede them.

Record the decision's source, who made it, applicable scope and any superseding
feedback in the evolving brief. Do not require reapproval for a traceably agreed,
still-applicable brief. If the available record does not establish agreement,
state this briefly and ask about the creative outcome that remains uncertain.
Do not demand the user reconstruct the history or answer an entire questionnaire.

A fresh test with a vague prompt and old project notes must still develop an
agreed brief. Reading notes may reduce questions; it cannot manufacture agreement.
If the user asks for a new direction or a test of discovery, do not silently resume
an older implementation plan.

## The boundary between proposal and production

Before implementation, identify the specific agreed brief revision and the user
message or explicit delegation that permits proceeding. If that evidence is absent,
keep status `draft` or `awaiting-agreement`. Do not turn a checklist boolean, an
agent-written approval summary or finding an output folder into permission.

If a required question has been asked, wait for its answer. Only an already-existing,
traceable user decision that actually answers the same question can resolve it;
an agent recommendation discovered later cannot. Agreement to placement, budget
or a private proof does not establish agreement to a newly proposed story/technique.
Continue relevant read-only preparation, not production disguised as a free DOM
prototype, isolated route or no-credit proof. Exploratory sketches require the
scope described below; they cannot silently become the finished implementation.

Once agreement is real, continue without adding repeated permission requests.

## Conversation, not a form

1. Read supplied context and references. Say what the user has actually specified
   and identify the uncertainty that would most change the concept. Do not infer
   audience, brand, duration, interaction or meaning from a previous client.
2. Offer one concrete interpretation, or two materially different directions
   when the idea is ambiguous. Label them as proposals. Describe what viewers
   would see and understand, rather than asking them to invent a storyboard.
3. Ask one or two focused questions at a time. Begin with purpose and the visual
   transformation when those are unknown; discover destination, motion character,
   references and constraints as they become relevant. Let users respond naturally,
   reject options, combine them or say they do not know. Offer a recommendation
   with its rationale instead of asking for technical knowledge.
4. With each meaningful answer, update the interpretation and visible brief.
   Explain what changed; carry confirmed decisions forward. If the user says
   "more impressive", translate that into concrete choices such as more independent
   component activity, closer inspection or stronger scale changes. Do not silently
   equate impressive with extra particles, faster motion or a particular tool.
5. Once coherent, present the complete brief in readable prose with useful bullets.
   Ask whether this specific revision captures the intended outcome and what needs
   changing. Do not treat silence, elapsed time, a response to one question, or the
   original vague request as agreement to an invented complete story. Continue
   useful read-only preparation while awaiting required answers.

The user may explicitly delegate remaining creative choices or ask to skip the
interview. Honour that: label the choices as agent-selected, record that delegation,
and proceed within its scope rather than repeatedly requesting confirmation.
Do not describe delegated suggestions as preferences the user personally supplied.

## What the resulting brief must communicate

Scale the detail to the task. For a substantial cinematic experience, cover:

- **Outcome and audience:** who it is for, what they should understand or feel,
  why it matters and any intended next action.
- **Subject and meaning:** what is shown, what the elements represent and how
  their relationships communicate the message. Flag metaphor versus factual claims.
- **Visual sequence:** recognisable beginning, meaningful progression, signature
  moment and payoff; specific transformations and component relationships.
- **Motion and interaction:** object movement versus camera movement, continuity,
  pace and depth; scroll, reverse scroll, autoplay, drag or other intended control.
  Duration is a proposal unless supplied; scroll exposure also depends on the visitor.
- **Visual direction and placement:** destination, existing design language,
  tone, composition, references and what to borrow or avoid from each.
- **Assets and accuracy:** supplied material, what may be invented, identity/text
  requirements and missing evidence. Never demand references when the user has none.
- **Practical constraints:** devices, accessibility, performance, deliverables,
  explicit tool preferences, budget and release boundary. Resolve only relevant gaps.
- **Failure and acceptance:** observable differences between a successful result
  and an attractive but irrelevant substitute. Include stated dislikes and past failures.

Maintain three explicit categories: **confirmed requirements**, **proposed creative
choices**, and **open decisions**. Do not bury an open story decision inside a polished
brief and mark it approved. Non-blocking technical details can remain for production
planning; material uncertainty about meaning or experience must be resolved or delegated.
Keep these distinctions in the brief; short conversational updates may use natural
prose rather than repeating three headings after every answer.

## Scenario-neutral examples

These demonstrate the conversation, not default scripts or predetermined briefs:

- "An exploding webpage and SEO": ask what the explosion should reveal about
  the business. Offer a process story connecting search intent, structure, content
  and conversion, versus an inspection of technical foundations. Neither is agreed
  merely because it is plausible. Do not assume Opace or reuse its colours.
  If "and SEO" could also request actual optimisation work, resolve that scope
  ambiguity rather than silently treating the entire request as a visual metaphor.
- "A shop implodes into an ecommerce page": clarify whether the point is continuity
  between physical and online shopping, expanded reach or operational transformation.
  Propose recognisable mappings such as shelves to product grids and till to checkout;
  establish whether "implodes" means elegant folding or energetic collapse.
- "A calm museum homepage": explore the institution's audience and intended feeling;
  propose an exhibition-led reveal or an editorial browsing experience. Do not force
  an explosion, a sales conversion story, an eight-second film or a media provider.

## Agreement and handoff

Save one evolving `CREATIVE-BRIEF.md` in the project's persistent documentation
location (default `.agent/docs/<project>/`). Record revision, status
`draft | awaiting-agreement | agreed`, current brief, open decisions and concise
feedback history. For agreement, record the actual user message and the revision
it covers, or their explicit delegation. Never manufacture an approval quote.
If no project is selected yet, show the brief in the conversation and establish
the destination before saving; do not create an arbitrary repository.

Meaningful changes to the story or intended experience reopen only the affected
decisions. Do not erase earlier feedback or repeatedly reapprove unchanged details.
Read-only research and authorised low-cost exploratory sketches can inform briefing;
they remain proposals. Do not start the production asset or page implementation
until the brief is agreed or the user explicitly delegates proceeding.

After agreement, derive the technical cinematic brief, prompts, tool/model/settings
selection and acceptance checks from it. If feasibility changes the promised story,
bring the trade-off back to the user rather than silently rewriting it. Brief
agreement does not authorise unapproved expenditure, uploads or publication.
Existing production and creative validators remain required where applicable;
their JSON passes cannot prove that a conversation reached genuine agreement.
Delegation of creative choices permits developing the proof within that scope;
it does not waive the separate exact-proof owner approval required for integration.
