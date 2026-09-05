#!/usr/bin/env node
import { access, readFile } from "node:fs/promises";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { sha256 } from "./production-contract.mjs";

const args = process.argv.slice(2);
const stageIndex = args.indexOf("--stage");
const stage = stageIndex === -1 ? "review" : args[stageIndex + 1];
if (stageIndex !== -1) args.splice(stageIndex, 2);

if (args.length !== 1 || !["review", "integration"].includes(stage)) {
  console.error(
    "Usage: validate-creative-acceptance.mjs REVIEW.json [--stage review|integration]",
  );
  process.exit(2);
}

const reviewPath = resolve(args[0]);
const review = JSON.parse(await readFile(reviewPath, "utf8"));
const base = dirname(reviewPath);
const briefPath = resolve(base, review.brief ?? "");
const assetPath = resolve(base, review.asset ?? "");
const failures = [];
const fail = (code, message) => failures.push(`${code}: ${message}`);

await access(briefPath).catch(() => fail("BRIEF_FILE_MISSING", "review.brief does not exist."));
await access(assetPath).catch(() => fail("ASSET_FILE_MISSING", "review.asset does not exist."));
try {
  const asset = await readFile(assetPath);
  if (!asset.length || sha256(asset) !== review.assetSha256) fail("ASSET_REVIEW_STALE", "Bind visual review to the exact asset SHA-256.");
} catch { fail("ASSET_UNREADABLE", "Cannot read the reviewed asset."); }

let brief = null;
try {
  const briefBytes = await readFile(briefPath);
  brief = JSON.parse(briefBytes);
  if (sha256(briefBytes) !== review.briefSha256) fail("BRIEF_REVIEW_STALE", "The review must match the exact brief SHA-256.");
  const plan = spawnSync(process.execPath, [join(dirname(fileURLToPath(import.meta.url)), "validate-cinematic-brief.mjs"), briefPath, "--stage", "plan"], { encoding: "utf8" });
  if (plan.status !== 0) fail("BRIEF_PLAN_INVALID", "The reviewed brief fails planning validation.");
} catch {
  fail("BRIEF_UNREADABLE", "The referenced cinematic brief could not be read.");
}

for (const [field, message] of [
  ["openingMatches", "The requested opening was not confirmed."],
  ["progressionMatches", "The requested progression was not confirmed."],
  ["payoffMatches", "The requested payoff was not confirmed."],
  ["meaningfulStateChange", "No meaningful subject or scene-state change was confirmed."],
  ["tierSubstantial", "The film is not substantial enough for its assigned tier."],
  ["identityContinuity", "Product identity continuity was not confirmed."],
  ["truthfulnessDisclosed", "Generated inference and truth limitations were not disclosed."],
]) {
  if (review.creative?.[field] !== true) fail("CREATIVE_ACCEPTANCE_FAILED", message);
}

if (review.creative?.cameraOnlySubstitute !== false) {
  fail(
    "CAMERA_ONLY_SUBSTITUTE_REJECTED",
    "A camera-only rotation, zoom, dolly or parallax cannot pass creative acceptance.",
  );
}
if (!Array.isArray(review.creative?.observedEffects)) {
  fail("OBSERVED_EFFECTS_MISSING", "creative.observedEffects must be an array.");
}
if (!String(review.creative?.evidenceNotes ?? "").trim()) {
  fail("CREATIVE_EVIDENCE_MISSING", "Record concise visual evidence for the decision.");
}
if (!Array.isArray(review.creative?.missingMoments)) {
  fail("MISSING_MOMENTS_UNDECLARED", "creative.missingMoments must be an array.");
} else if (review.creative.missingMoments.length > 0) {
  fail(
    "REQUESTED_MOMENTS_MISSING",
    `The film omits requested moment(s): ${review.creative.missingMoments.join(", ")}.`,
  );
}

const requiredEffects = new Set(brief?.intent?.requiredEffects ?? []);
const observedEffects = new Set(review.creative?.observedEffects ?? []);
const missingEffects = [...requiredEffects].filter((effect) => !observedEffects.has(effect));
if (missingEffects.length > 0) {
  fail(
    "REQUESTED_EFFECTS_NOT_OBSERVED",
    `The film does not show required effect(s): ${missingEffects.join(", ")}.`,
  );
}

const results = Array.isArray(review.requirementResults) ? review.requirementResults : [];
for (const requirement of brief?.planning?.requirements ?? []) {
  const result = results.find(r => r.id === requirement.id);
  if (!result || result.passed !== true || !String(result.observation ?? "").trim() || !String(result.evidenceFile ?? "").trim() || !(result.startSeconds >= 0) || !(result.endSeconds > result.startSeconds) || result.endSeconds > brief.experience.durationSeconds) {
    fail("REQUIREMENT_NOT_VERIFIED", `Requirement ${requirement.id} needs a passing observation, evidence and inspected time range.`);
    continue;
  }
  try {
    const bytes = await readFile(resolve(base, result.evidenceFile));
    if (!bytes.length || sha256(bytes) !== result.evidenceSha256) fail("CREATIVE_EVIDENCE_STALE", `Evidence for ${requirement.id} changed or lacks its hash.`);
  } catch { fail("CREATIVE_EVIDENCE_MISSING", `Cannot read evidence for ${requirement.id}.`); }
}
if (review.creative?.inBetweenMotionInspected !== true || review.creative?.audienceTakeawayDemonstrated !== true || review.creative?.hostFitConfirmed !== true) fail("VISUAL_PURPOSE_UNCONFIRMED", "Inspect in-between motion, audience meaning and destination fit; settled poses do not suffice.");
if (failures.length && review.decision !== "rejected") fail("FAILED_PROOF_MUST_BE_REJECTED", "Mandatory failed or unverified checks require decision=rejected, not ready-for-owner-review.");

if (!["ready-for-owner-review", "approved", "rejected"].includes(review.decision)) {
  fail("INVALID_REVIEW_DECISION", "decision is invalid.");
}
if (review.decision === "rejected") {
  fail("CREATIVE_REVIEW_REJECTED", "Rejected media cannot pass the creative gate.");
}
if (stage === "integration") {
  if (review.decision !== "approved" || review.ownerApproved !== true) {
    fail(
      "OWNER_APPROVAL_REQUIRED",
      "Integration requires decision=approved and ownerApproved=true.",
    );
  }
  try {
    const approval = await readFile(resolve(base, review.ownerApproval.file));
    if (!approval.length || review.ownerApproval.assetSha256 !== review.assetSha256 || review.ownerApproval.briefSha256 !== review.briefSha256 || sha256(approval) !== review.ownerApproval.sha256) fail("OWNER_APPROVAL_STALE", "Owner approval must identify this exact brief, asset and evidence hash.");
  } catch { fail("OWNER_APPROVAL_EVIDENCE_MISSING", "Save the owner's actual approval evidence; a boolean is insufficient."); }
}

if (failures.length) {
  console.error(`Creative acceptance failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `Creative acceptance passed for ${stage}: ${review.decision}, ${requiredEffects.size} required effect(s) observed.`,
);
