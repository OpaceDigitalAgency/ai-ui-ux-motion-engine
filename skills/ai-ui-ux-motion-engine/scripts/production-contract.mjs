import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { isDeepStrictEqual } from "node:util";

export const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const nonempty = (v) => typeof v === "string" && v.trim().length > 0;
const list = (v) => Array.isArray(v) ? v : [];
const timestamp = (v) => nonempty(v) && Number.isFinite(Date.parse(v));
const fresh = (v) => timestamp(v) && Date.now() - Date.parse(v) <= 86400000 && Date.parse(v) - Date.now() <= 300000;

// This checks records, files and invariants. It cannot certify visual truth or
// intercept arbitrary provider calls. The host must honour the stage boundary.
export async function validateProductionContract(b, { base, stage, checkFiles }) {
  const errors = [];
  const fail = (code, message) => errors.push(`${code}: ${message}`);
  const p = b.planning ?? {};
  const evidence = list(p.evidence);
  const ids = new Set();
  for (const e of evidence) {
    if (!nonempty(e.id) || ids.has(e.id) || !nonempty(e.file) || !nonempty(e.purpose)) fail("INVALID_EVIDENCE", "Evidence needs a unique id, file and purpose.");
    ids.add(e.id);
    if (stage === "generate" || checkFiles) {
      try {
        if (!(await stat(resolve(base, e.file))).isFile()) throw new Error("not a file");
        const bytes = await readFile(resolve(base, e.file));
        if (!bytes.length || sha256(bytes) !== e.sha256) fail("EVIDENCE_CHANGED", `Missing or incorrect SHA-256 for ${e.id}. Reinspect changed evidence.`);
      } catch { fail("EVIDENCE_MISSING", `Cannot read evidence ${e.id}.`); }
    }
  }
  const link = (id, label) => { if (!nonempty(id) || !ids.has(id)) fail("EVIDENCE_LINK_MISSING", `${label} must name an evidence id.`); };
  if (!nonempty(b.intent?.audienceTakeaway)) fail("TAKEAWAY_MISSING", "What should the audience understand or feel, and why does it belong here?");
  if (typeof b.intent?.requiresIndependentMotion !== "boolean") fail("INDEPENDENT_MOTION_UNDECLARED", "Declare whether independently moving groups are required.");
  if (!["continuous", "cuts"].includes(b.editing?.mode)) fail("EDIT_MODE_MISSING", "Choose continuous or cuts from the requested interaction.");
  if (b.experience?.scrollControlled && b.editing?.mode === "cuts" && !nonempty(b.editing?.reason)) fail("SCROLL_CUTS_UNJUSTIFIED", "Explain why cuts preserve this scroll journey.");
  if (!["local", "provider"].includes(b.production?.execution)) fail("EXECUTION_MISSING", "Separate local authoring from external provider execution; flagship is an impact tier.");
  if (["code-native", "procedural-3d", "cad", "compositing", "real-footage"].includes(b.production?.technique) && b.production?.execution === "provider" && !nonempty(b.production?.providerRole)) fail("TECHNIQUE_ROUTE_MISMATCH", "Explain the provider's actual role in this authoring technique.");
  if (["image-to-video", "multi-shot-generation", "illustrative-burst"].includes(b.production?.technique) && b.production?.execution !== "provider") fail("TECHNIQUE_ROUTE_MISMATCH", "Generation techniques need a provider execution route.");
  if (!["flattened", "layers", "geometry", "footage", "mixed"].includes(b.sourceCoverage?.representation)) fail("SOURCE_REPRESENTATION_MISSING", "Describe the actual source format, not the desired result.");
  const feasible = b.production?.feasibility ?? {};
  if (!["verified", "experiment", "blocked"].includes(feasible.status) || !nonempty(feasible.rationale)) fail("FEASIBILITY_MISSING", "Record feasibility, rationale and unresolved risks.");
  if (!Array.isArray(feasible.unresolved)) fail("UNRESOLVED_RISKS_MISSING", "Record unresolved risks, including an empty list when justified.");
  if (feasible.status === "verified" && list(feasible.unresolved).length) fail("VERIFIED_WITH_UNRESOLVED_RISKS", "Use experiment or blocked while route-critical risks remain unresolved.");
  if (feasible.status === "verified" || stage === "generate") link(feasible.evidenceId, "feasibility.evidenceId");
  if (b.intent?.requiresIndependentMotion && ["code-native", "procedural-3d", "cad", "compositing"].includes(b.production?.technique) && b.sourceCoverage?.representation === "flattened") fail("AUTHORED_COMPONENT_SOURCE_GAP", "Authored independent motion needs layers or geometry; flattened references alone are not an authored scene.");
  const review = p.referenceReview ?? {};
  if (!["video", "images", "written"].includes(review.kind) || !nonempty(review.source) || !["complete", "partial"].includes(review.status)) fail("REFERENCE_REVIEW_MISSING", "Record what reference was actually inspected and whether access was complete.");
  if (!["observed", "unknown"].includes(review.workflowEvidence)) fail("REFERENCE_WORKFLOW_UNDECLARED", "Distinguish observed implementation from an unknown workflow.");
  if (review.kind === "video") {
    link(review.evidenceId, "referenceReview.evidenceId");
    if (!list(review.inspectedRanges).length || !nonempty(review.transcriptStatus) || !nonempty(review.descriptionStatus)) fail("VIDEO_REFERENCE_INCOMPLETE", "Record inspected ranges and transcript/description availability; screenshots do not establish the workflow.");
  }
  const requirements = list(p.requirements);
  if (!requirements.length) fail("REQUIREMENTS_MISSING", "Map the user's requirements to chapters and observable acceptance checks.");
  const names = new Set(list(b.shots).map(s => s.name));
  const reqIds = new Set();
  for (const r of requirements) {
    if (!nonempty(r.id) || reqIds.has(r.id) || !nonempty(r.requirement) || !nonempty(r.acceptance) || !list(r.shotNames).length || r.shotNames.some(n => !names.has(n))) fail("REQUIREMENT_UNMAPPED", "Each requirement needs a unique id, existing chapters and an observable acceptance check.");
    reqIds.add(r.id);
  }
  const componentIds = new Set();
  for (const s of list(b.shots)) {
    if (!nonempty(s.communicates) || !requirements.some(r => list(r.shotNames).includes(s.name))) fail("CHAPTER_MEANING_MISSING", `Chapter ${s.name} needs a purpose for the audience and a requirement mapping.`);
    for (const c of list(s.componentActions)) {
      if (!nonempty(c.id) || !nonempty(c.action)) fail("COMPONENT_ACTION_MISSING", "Named moving groups need distinct actions.");
      componentIds.add(c.id);
    }
  }
  if (b.intent?.requiresIndependentMotion && componentIds.size < 2) fail("INDEPENDENT_ACTIONS_MISSING", "Plan at least two named independently moving groups; inspect continuity between poses.");
  const selection = p.selection ?? {};
  if (!nonempty(selection.reason) || !list(selection.alternatives).length || selection.alternatives.some(a => !nonempty(a.name) || !nonempty(a.reason))) fail("ROUTE_SELECTION_MISSING", "Explain the chosen route and why plausible alternatives fit less well.");
  if (stage !== "generate") return errors;

  if (b.production?.execution !== "provider") fail("LOCAL_ROUTE_NO_GENERATION", "Use local authoring; this gate is only for provider submission.");
  if (!["verified", "experiment"].includes(feasible.status)) fail("FEASIBILITY_BLOCKED", "Blocked feasibility cannot proceed to generation.");
  if (review.status !== "complete") fail("REFERENCE_ACCESS_PARTIAL", "Complete reference analysis or agree a revised reference before spending.");
  link(selection.evidenceId, "selection.evidenceId");
  if (!fresh(selection.checkedAt)) fail("MODEL_CHECK_DATE_MISSING", "Recheck model capabilities for this run; evidence must be no older than 24 hours, not future-dated.");
  const g = b.generation ?? {};
  link(g.previewEvidenceId, "generation.previewEvidenceId");
  if (g.previewReviewed !== true) fail("PREVIEW_NOT_REVIEWED", "Visually review the actual inputs/styleframes or animatic before spending.");
  link(g.authorityEvidenceId, "generation.authorityEvidenceId");
  if (feasible.status === "experiment" && g.risksAccepted !== true) fail("EXPERIMENT_RISK_NOT_ACCEPTED", "Disclose unresolved feasibility and record user authority for this bounded experiment.");
  if (!nonempty(g.uncertaintyTested) || !nonempty(g.stopCondition)) fail("DIAGNOSTIC_PURPOSE_MISSING", "Name what this attempt tests and when it stops.");
  if (!Number.isInteger(g.attemptsUsed) || g.attemptsUsed < 0 || g.attemptsUsed >= b.provider?.attemptLimit) fail("ATTEMPT_CAP_EXCEEDED", "No authorised attempts remain.");
  if (g.attemptsUsed > 0 && !nonempty(g.changedSincePreviousAttempt)) fail("RETRY_WITHOUT_CORRECTION", "Record a concrete correction before retrying.");
  const q = g.quote ?? {};
  link(q.evidenceId, "generation.quote.evidenceId");
  if (!fresh(q.checkedAt) || !Number.isFinite(q.credits) || q.credits < 0 || !Number.isFinite(g.spentCredits) || g.spentCredits < 0 || !Number.isFinite(b.provider?.creditsApproved) || g.spentCredits + q.credits > b.provider.creditsApproved) fail("CREDIT_CAP_EXCEEDED", "A current quote (within 24 hours) and cumulative spend must fit the authorised cap; refresh sooner if provider pricing changes.");
  const boundFiles = list(g.inputFiles);
  if (!boundFiles.length) fail("INPUT_MANIFEST_MISSING", "Bind the source files to this generation by SHA-256.");
  for (const f of boundFiles) {
    try {
      const bytes = await readFile(resolve(base, f.file));
      if (!bytes.length || sha256(bytes) !== f.sha256) fail("INPUT_CHANGED", `Reinspect and requote changed input ${f.file}.`);
    } catch { fail("INPUT_MISSING", `Cannot read generation input ${f.file}.`); }
  }
  for (const r of list(b.references)) if (!boundFiles.some(f => resolve(base, f.file) === resolve(base, r.file))) fail("REFERENCE_NOT_BOUND", `Reference ${r.file} is absent from the input manifest.`);
  try {
    const bytes = await readFile(resolve(base, g.payloadFile));
    const digest = sha256(bytes);
    const payload = JSON.parse(bytes);
    if (digest !== g.payloadSha256 || digest !== q.payloadSha256) fail("QUOTE_PAYLOAD_MISMATCH", "The exact submission payload must match both reviewed and quoted hashes.");
    if (payload.model !== b.provider?.model || !nonempty(payload.model) || !nonempty(payload.prompt) || !payload.params || payload.params.count !== 1) fail("PAYLOAD_INVALID", "Canonical payload requires the selected model, prompt, exact params and count=1.");
    if (!isDeepStrictEqual(payload.params, b.provider?.params)) fail("PAYLOAD_SETTINGS_MISMATCH", "Submission settings differ from the brief.");
    if (payload.params.duration !== b.experience?.durationSeconds) fail("PAYLOAD_DURATION_MISMATCH", "Submission duration differs from the timeline.");
    if (!Array.isArray(payload.medias) || (!payload.medias.length && b.provider?.referenceMode !== "text-only") || list(payload.medias).some(m => !nonempty(m.role) || !nonempty(m.value) || !boundFiles.some(f => f.file === m.sourceFile))) fail("MEDIA_MAPPING_MISSING", "Bind every provider media ID and role to a hashed sourceFile; empty medias needs verified referenceMode=text-only.");
  } catch { fail("PAYLOAD_MISSING", "Save the exact canonical submission payload as readable JSON before generating."); }
  return errors;
}
