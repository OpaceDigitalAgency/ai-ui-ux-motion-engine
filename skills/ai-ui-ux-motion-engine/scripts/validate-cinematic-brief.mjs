#!/usr/bin/env node
import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { validateProductionContract } from "./production-contract.mjs";

const args = process.argv.slice(2);
const stageIndex = args.indexOf("--stage");
const stage = stageIndex === -1 ? "plan" : args[stageIndex + 1];
if (stageIndex !== -1) args.splice(stageIndex, 2);
const checkFilesIndex = args.indexOf("--check-files");
const checkFiles = checkFilesIndex !== -1;
if (checkFiles) args.splice(checkFilesIndex, 1);

if (args.length !== 1 || args[0] === "--help" || !["plan", "generate"].includes(stage)) {
  console.log("Usage: validate-cinematic-brief.mjs <brief.json> [--check-files] [--stage plan|generate]");
  process.exit(args[0] === "--help" ? 0 : 2);
}

const briefPath = resolve(args[0]);
const brief = JSON.parse(await readFile(briefPath, "utf8"));
const failures = [];
const truthModes = new Set(["illustrative", "identity-locked", "evidence-accurate"]);
const tiers = new Set(["flagship", "supporting", "code-native"]);
const workflowProfiles = new Set(["lean-scalable"]);
const accuracyPriorities = new Set(["accuracy-first"]);
const parallelismModes = new Set(["safe-when-supported", "off"]);
const frameInspectionModes = new Set(["automated-overview-dense-on-risk"]);
const impactLevels = new Set(["flagship", "supporting", "ambient"]);
const shotPurposes = new Set(["authority", "progression", "transformation", "inspection", "payoff"]);
const subjectChanges = new Set(["none", "physical", "visualized-system", "environment", "edit"]);
const authorityTypes = new Set(["single-view", "multi-view", "cad", "footage", "generated-concept"]);
const productionTechniques = new Set([
  "multi-shot-generation",
  "illustrative-burst",
  "cad",
  "compositing",
  "real-footage",
  "code-native",
  "image-to-video",
  "procedural-3d",
  "hybrid",
]);
const providerAccessMethods = new Set(["cli", "mcp", "api", "browser", "none"]);
const transformationEffects = new Set([
  "assembly",
  "disassembly",
  "burst",
  "explosion",
  "exploded-view",
  "opening",
  "transformation",
]);
const cameraOnlySubstitutes = new Set([
  "camera-only",
  "css-like-parallax",
  "generic-orbit",
  "rotation-only",
  "zoom-only",
]);

const fail = (code, message) => failures.push(`${code}: ${message}`);
const requireValue = (value, label, code = "REQUIRED_FIELD_MISSING") => {
  if (value === undefined || value === null || value === "") {
    fail(code, `${label} is required.`);
  }
};

requireValue(brief.project, "project");
if (!truthModes.has(brief.truthMode)) fail("INVALID_TRUTH_MODE", "truthMode is invalid.");
if (!workflowProfiles.has(brief.workflow?.profile)) {
  fail("INVALID_WORKFLOW_PROFILE", "workflow.profile is invalid.");
}
if (!accuracyPriorities.has(brief.workflow?.accuracyPriority)) {
  fail("INVALID_ACCURACY_PRIORITY", "workflow.accuracyPriority must be accuracy-first.");
}
if (!Number.isInteger(brief.workflow?.targetMinutes) || brief.workflow.targetMinutes < 5) {
  fail("INVALID_TARGET_TIME", "workflow.targetMinutes must be an integer of at least 5.");
}
if (
  !Number.isInteger(brief.workflow?.escalationMinutes) ||
  brief.workflow.escalationMinutes < brief.workflow?.targetMinutes
) {
  fail(
    "INVALID_ESCALATION_TIME",
    "workflow.escalationMinutes must be an integer no lower than targetMinutes.",
  );
}
if (!parallelismModes.has(brief.workflow?.parallelism)) {
  fail("INVALID_PARALLELISM", "workflow.parallelism is invalid.");
}
if (!frameInspectionModes.has(brief.workflow?.frameInspection)) {
  fail("INVALID_FRAME_INSPECTION", "workflow.frameInspection is invalid.");
}

requireValue(brief.intent?.requestSummary, "intent.requestSummary");
if (!impactLevels.has(brief.intent?.impact)) {
  fail("INVALID_IMPACT_LEVEL", "intent.impact must be flagship, supporting or ambient.");
}
requireValue(brief.intent?.signatureMoment, "intent.signatureMoment");
if (!Array.isArray(brief.intent?.progression) || brief.intent.progression.length === 0) {
  fail("PROGRESSION_MISSING", "intent.progression must record the requested authored journey.");
}
requireValue(brief.intent?.payoff, "intent.payoff");
if (!Array.isArray(brief.intent?.requiredEffects)) {
  fail("REQUIRED_EFFECTS_MISSING", "intent.requiredEffects must be an array, including an empty one.");
}
if (!Array.isArray(brief.intent?.prohibitedSubstitutes)) {
  fail(
    "PROHIBITED_SUBSTITUTES_MISSING",
    "intent.prohibitedSubstitutes must explicitly record unacceptable shortcuts.",
  );
}
if (typeof brief.intent?.requiresMeaningfulStateChange !== "boolean") {
  fail(
    "MEANINGFUL_CHANGE_UNDECLARED",
    "intent.requiresMeaningfulStateChange must be true or false.",
  );
}
if (typeof brief.intent?.requiresUnseenGeometry !== "boolean") {
  fail("UNSEEN_GEOMETRY_UNDECLARED", "intent.requiresUnseenGeometry must be true or false.");
}
if (typeof brief.intent?.requiresExactMechanics !== "boolean") {
  fail("EXACT_MECHANICS_UNDECLARED", "intent.requiresExactMechanics must be true or false.");
}

if (!tiers.has(brief.experience?.tier)) fail("INVALID_TIER", "experience.tier is invalid.");
requireValue(brief.experience?.placement, "experience.placement");
requireValue(brief.experience?.durationSeconds, "experience.durationSeconds");
requireValue(brief.experience?.aspectRatio, "experience.aspectRatio");
if (typeof brief.experience?.scrollControlled !== "boolean") {
  fail("SCROLL_CONTROL_UNDECLARED", "experience.scrollControlled must be true or false.");
}

if (brief.intent?.impact === "flagship" && brief.experience?.tier !== "flagship") {
  fail(
    "FLAGSHIP_INTENT_CANNOT_BE_DOWNGRADED",
    "A requested flagship experience cannot be recorded as supporting or code-native.",
  );
}
if (
  brief.intent?.fullScreen === true &&
  brief.intent?.scrollControlled === true &&
  brief.experience?.tier !== "flagship"
) {
  fail(
    "FULLSCREEN_SCROLL_REQUIRES_FLAGSHIP",
    "A requested full-screen scroll-controlled cinematic moment must use the flagship tier.",
  );
}
if (brief.intent?.scrollControlled !== brief.experience?.scrollControlled) {
  fail(
    "SCROLL_INTENT_MISMATCH",
    "experience.scrollControlled must match intent.scrollControlled.",
  );
}

requireValue(brief.production?.technique, "production.technique");
if (
  brief.production?.technique &&
  !productionTechniques.has(brief.production.technique)
) {
  fail("INVALID_PRODUCTION_TECHNIQUE", "production.technique is invalid.");
}
if (!authorityTypes.has(brief.sourceCoverage?.authorityType)) {
  fail("INVALID_AUTHORITY_TYPE", "sourceCoverage.authorityType is invalid.");
}
if (typeof brief.sourceCoverage?.supportsUnseenGeometry !== "boolean") {
  fail(
    "SOURCE_GEOMETRY_COVERAGE_UNDECLARED",
    "sourceCoverage.supportsUnseenGeometry must be true or false.",
  );
}
if (typeof brief.sourceCoverage?.supportsExactMechanics !== "boolean") {
  fail(
    "SOURCE_MECHANICS_COVERAGE_UNDECLARED",
    "sourceCoverage.supportsExactMechanics must be true or false.",
  );
}
if (!Array.isArray(brief.sourceCoverage?.limitations)) {
  fail("SOURCE_LIMITATIONS_MISSING", "sourceCoverage.limitations must be an array.");
}
if (
  brief.sourceCoverage?.authorityType === "single-view" &&
  brief.sourceCoverage?.supportsUnseenGeometry === true
) {
  fail(
    "SINGLE_VIEW_CANNOT_PROVE_UNSEEN_GEOMETRY",
    "A single-view authority cannot claim coverage of unseen geometry.",
  );
}
if (
  brief.intent?.requiresUnseenGeometry === true &&
  brief.sourceCoverage?.supportsUnseenGeometry !== true
) {
  fail(
    "UNSEEN_GEOMETRY_SOURCE_GAP",
    "The requested journey needs unseen geometry but the source pack does not prove it. Use multi-view evidence, CAD, compositing, real footage or an explicitly illustrative route.",
  );
}
if (
  brief.intent?.requiresExactMechanics === true &&
  brief.sourceCoverage?.supportsExactMechanics !== true
) {
  fail(
    "EXACT_MECHANICS_SOURCE_GAP",
    "The requested exact mechanics are not supported by the source pack. Use CAD, verified keyframes or real footage.",
  );
}

requireValue(brief.identity?.authorityReference, "identity.authorityReference");
requireValue(brief.identity?.description, "identity.description");
if (!Array.isArray(brief.references) || brief.references.length === 0) {
  fail("REFERENCES_MISSING", "At least one reference is required.");
}
if (!Array.isArray(brief.shots) || brief.shots.length === 0) {
  fail("SHOTS_MISSING", "At least one shot is required.");
}
if (!Array.isArray(brief.forbidden) || brief.forbidden.length === 0) {
  fail("FORBIDDEN_CHANGES_MISSING", "At least one forbidden change is required.");
}

const referenceFiles = new Set((brief.references ?? []).map((reference) => reference.file));
if (!referenceFiles.has(brief.identity?.authorityReference)) {
  fail(
    "IDENTITY_REFERENCE_MISSING",
    "identity.authorityReference must appear in references.",
  );
}

if (brief.production?.execution === "provider" && stage === "generate") {
  requireValue(brief.provider?.name, "provider.name");
  requireValue(brief.provider?.requiredCapability, "provider.requiredCapability");
  if (brief.provider?.connected !== true) {
    fail("PROVIDER_NOT_CONNECTED", "provider.connected must be true.");
  }
  if (brief.provider?.termsApproved !== true) {
    fail("PROVIDER_TERMS_NOT_APPROVED", "provider.termsApproved must be true.");
  }
  if (!(brief.provider?.creditsApproved >= 0)) {
    fail("CREDIT_AUTHORITY_MISSING", "provider.creditsApproved must be zero or more.");
  }
  if (brief.provider?.accessMethod === "none") fail("PROVIDER_ROUTE_NONE", "Provider generation cannot use accessMethod=none.");
  if (![1, 2].includes(brief.provider?.attemptLimit)) {
    fail("INVALID_ATTEMPT_LIMIT", "provider.attemptLimit must be 1 or 2.");
  }
  if (!providerAccessMethods.has(brief.provider?.accessMethod)) {
    fail(
      "PROGRAMMATIC_PROVIDER_ROUTE_MISSING",
      "provider.accessMethod must be cli, mcp, api or a justified browser fallback.",
    );
  }
  if (brief.provider?.programmaticPreflightComplete !== true) {
    fail(
      "PROGRAMMATIC_PREFLIGHT_REQUIRED",
      "Record a successful CLI, MCP or API preflight before generation.",
    );
  }
  if (
    brief.provider?.accessMethod === "browser" &&
    !String(brief.provider?.browserFallbackReason ?? "").trim()
  ) {
    fail(
      "BROWSER_FALLBACK_UNJUSTIFIED",
      "Browser control is last resort and requires the missing CLI/MCP/API capability to be recorded.",
    );
  }
}

let previousEnd = 0;
for (const [index, shot] of (brief.shots ?? []).entries()) {
  const prefix = `shots[${index}]`;
  for (const field of ["name", "purpose", "subjectChange", "reference", "action", "camera", "endState"]) {
    requireValue(shot[field], `${prefix}.${field}`);
  }
  if (shot.purpose && !shotPurposes.has(shot.purpose)) {
    fail("INVALID_SHOT_PURPOSE", `${prefix}.purpose is invalid.`);
  }
  if (shot.subjectChange && !subjectChanges.has(shot.subjectChange)) {
    fail("INVALID_SUBJECT_CHANGE", `${prefix}.subjectChange is invalid.`);
  }
  if (shot.reference && !referenceFiles.has(shot.reference)) {
    fail("SHOT_REFERENCE_MISSING", `${prefix}.reference is not present in references.`);
  }
  if (!(shot.startSeconds >= 0) || !(shot.endSeconds > shot.startSeconds)) {
    fail("INVALID_SHOT_TIMING", `${prefix} has invalid timing.`);
  }
  if (index === 0 && shot.startSeconds !== 0) fail("SHOT_TIMELINE_GAP", "The first chapter must begin at zero.");
  if (index > 0 && Math.abs(shot.startSeconds - previousEnd) > 0.01) {
    fail("SHOT_TIMELINE_GAP", `${prefix} does not start where the previous shot ends.`);
  }
  previousEnd = shot.endSeconds;
}

if (
  brief.shots?.length &&
  Math.abs(previousEnd - brief.experience.durationSeconds) > 0.01
) {
  fail("SHOT_TIMELINE_INCOMPLETE", "Final shot does not end at experience.durationSeconds.");
}

if (brief.experience?.tier === "flagship") {
  const range = brief.intent?.durationRange;
  if (!range || !Number.isFinite(range.min) || !Number.isFinite(range.max) || range.min <= 0 || range.max < range.min || !String(range.reason ?? "").trim() || brief.experience.durationSeconds < range.min || brief.experience.durationSeconds > range.max) {
    fail(
      "FLAGSHIP_DURATION_OUT_OF_RANGE",
      "Record a positive intent.durationRange {min,max,reason} and keep the timeline within it. Duration does not determine tier.",
    );
  }
  if ((brief.shots?.length ?? 0) < 3) {
    fail(
      "FLAGSHIP_REQUIRES_MULTIPLE_CHAPTERS",
      "A flagship requires at least three authored shots or chapters.",
    );
  }
  if ((brief.intent?.progression?.length ?? 0) < 3) {
    fail(
      "FLAGSHIP_REQUIRES_BEGINNING_PROGRESSION_PAYOFF",
      "Record at least three requested narrative stages.",
    );
  }
  if (brief.intent?.requiresMeaningfulStateChange !== true) {
    fail(
      "FLAGSHIP_REQUIRES_MEANINGFUL_CHANGE",
      "A flagship cannot be defined as camera movement around a static subject.",
    );
  }
  const purposes = new Set((brief.shots ?? []).map((shot) => shot.purpose));
  if (!purposes.has("authority") || !purposes.has("payoff") || purposes.size < 3) {
    fail(
      "FLAGSHIP_NARRATIVE_STRUCTURE_MISSING",
      "Flagship shots must establish authority, progress through a distinct middle state and finish with a payoff.",
    );
  }
  if (!(brief.shots ?? []).some((shot) => shot.subjectChange !== "none")) {
    fail(
      "CAMERA_ONLY_MOTION_CANNOT_SATISFY_PRODUCT_JOURNEY",
      "At least one flagship shot must change the subject, visualized system, environment or edit state.",
    );
  }
  const prohibited = new Set(brief.intent?.prohibitedSubstitutes ?? []);
  if (![...cameraOnlySubstitutes].some((item) => prohibited.has(item))) {
    fail(
      "CAMERA_ONLY_SUBSTITUTE_NOT_PROHIBITED",
      "A flagship brief must explicitly prohibit camera-only or CSS-like substitutes.",
    );
  }
}

const requestedTransformations = (brief.intent?.requiredEffects ?? []).filter((effect) =>
  transformationEffects.has(effect),
);
if (requestedTransformations.length > 0) {
  const hasTransformationShot = (brief.shots ?? []).some(
    (shot) =>
      shot.purpose === "transformation" &&
      shot.subjectChange !== "none" &&
      /\b(assembl|disassembl|burst|explod|separat|open|transform)/i.test(shot.action ?? ""),
  );
  if (!hasTransformationShot) {
    fail(
      "REQUESTED_BURST_OR_TRANSFORMATION_IS_MISSING",
      `The shot plan does not visibly perform the requested effect(s): ${requestedTransformations.join(", ")}.`,
    );
  }
}

if (brief.truthMode === "evidence-accurate") {
  if (!brief.identity?.immutableDetails?.length) {
    fail(
      "EVIDENCE_IMMUTABLE_DETAILS_MISSING",
      "Evidence-accurate mode requires identity.immutableDetails.",
    );
  }
  if (!brief.identity?.exactCounts?.length) {
    fail(
      "EVIDENCE_EXACT_COUNTS_MISSING",
      "Evidence-accurate mode requires identity.exactCounts.",
    );
  }
}

for (const [index, exactCount] of (brief.identity?.exactCounts ?? []).entries()) {
  if (!exactCount.name || !Number.isInteger(exactCount.count) || exactCount.count < 1) {
    fail(
      "INVALID_EXACT_COUNT",
      `identity.exactCounts[${index}] must have a name and positive integer count.`,
    );
  }
}

if (checkFiles) {
  const base = dirname(briefPath);
  for (const reference of brief.references ?? []) {
    await access(resolve(base, reference.file)).catch(() =>
      fail("REFERENCE_FILE_MISSING", `Reference file does not exist: ${reference.file}`),
    );
  }
}

if (brief.experience?.tier === "flagship" || stage === "generate") {
  failures.push(...await validateProductionContract(brief, { base: dirname(briefPath), stage, checkFiles }));
}

if (failures.length) {
  console.error(`Cinematic brief validation failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `Cinematic ${stage} checks passed: ${brief.experience.tier}, ${brief.truthMode}, ${brief.shots.length} chapters. ${stage === "plan" ? "Planning only; not permission to spend or proof of visual quality." : "Evidence and payload checked; no generation submitted. Visual claims still require inspection."}`,
);
