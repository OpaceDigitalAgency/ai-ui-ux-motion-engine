#!/usr/bin/env node
import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const args = process.argv.slice(2);
const checkFilesIndex = args.indexOf("--check-files");
const checkFiles = checkFilesIndex !== -1;
if (checkFiles) args.splice(checkFilesIndex, 1);

if (args.length !== 1 || args[0] === "--help") {
  console.log("Usage: validate-cinematic-brief.mjs <brief.json> [--check-files]");
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

const requireValue = (value, label) => {
  if (value === undefined || value === null || value === "") failures.push(`${label} is required.`);
};

requireValue(brief.project, "project");
if (!truthModes.has(brief.truthMode)) failures.push("truthMode is invalid.");
if (!workflowProfiles.has(brief.workflow?.profile)) failures.push("workflow.profile is invalid.");
if (!accuracyPriorities.has(brief.workflow?.accuracyPriority)) {
  failures.push("workflow.accuracyPriority must be accuracy-first.");
}
if (!Number.isInteger(brief.workflow?.targetMinutes) || brief.workflow.targetMinutes < 5) {
  failures.push("workflow.targetMinutes must be an integer of at least 5.");
}
if (
  !Number.isInteger(brief.workflow?.escalationMinutes) ||
  brief.workflow.escalationMinutes < brief.workflow?.targetMinutes
) {
  failures.push("workflow.escalationMinutes must be an integer no lower than targetMinutes.");
}
if (!parallelismModes.has(brief.workflow?.parallelism)) {
  failures.push("workflow.parallelism is invalid.");
}
if (!frameInspectionModes.has(brief.workflow?.frameInspection)) {
  failures.push("workflow.frameInspection is invalid.");
}
if (!tiers.has(brief.experience?.tier)) failures.push("experience.tier is invalid.");
requireValue(brief.experience?.placement, "experience.placement");
requireValue(brief.experience?.durationSeconds, "experience.durationSeconds");
requireValue(brief.experience?.aspectRatio, "experience.aspectRatio");
requireValue(brief.identity?.authorityReference, "identity.authorityReference");
requireValue(brief.identity?.description, "identity.description");

if (!Array.isArray(brief.references) || brief.references.length === 0) {
  failures.push("At least one reference is required.");
}
if (!Array.isArray(brief.shots) || brief.shots.length === 0) {
  failures.push("At least one shot is required.");
}
if (!Array.isArray(brief.forbidden) || brief.forbidden.length === 0) {
  failures.push("At least one forbidden change is required.");
}

const referenceFiles = new Set((brief.references ?? []).map((reference) => reference.file));
if (!referenceFiles.has(brief.identity?.authorityReference)) {
  failures.push("identity.authorityReference must appear in references.");
}

if (brief.experience?.tier !== "code-native") {
  requireValue(brief.provider?.name, "provider.name");
  requireValue(brief.provider?.requiredCapability, "provider.requiredCapability");
  if (brief.provider?.connected !== true) failures.push("provider.connected must be true.");
  if (brief.provider?.termsApproved !== true) failures.push("provider.termsApproved must be true.");
  if (!(brief.provider?.creditsApproved >= 0)) failures.push("provider.creditsApproved must be zero or more.");
  if (![1, 2].includes(brief.provider?.attemptLimit)) {
    failures.push("provider.attemptLimit must be 1 or 2.");
  }
}

let previousEnd = 0;
for (const [index, shot] of (brief.shots ?? []).entries()) {
  const prefix = `shots[${index}]`;
  for (const field of ["name", "reference", "action", "camera", "endState"]) {
    requireValue(shot[field], `${prefix}.${field}`);
  }
  if (shot.reference && !referenceFiles.has(shot.reference)) {
    failures.push(`${prefix}.reference is not present in references.`);
  }
  if (!(shot.startSeconds >= 0) || !(shot.endSeconds > shot.startSeconds)) {
    failures.push(`${prefix} has invalid timing.`);
  }
  if (index > 0 && Math.abs(shot.startSeconds - previousEnd) > 0.01) {
    failures.push(`${prefix} does not start where the previous shot ends.`);
  }
  previousEnd = shot.endSeconds;
}

if (
  brief.shots?.length &&
  Math.abs(previousEnd - brief.experience.durationSeconds) > 0.01
) {
  failures.push("Final shot does not end at experience.durationSeconds.");
}

if (brief.truthMode === "evidence-accurate") {
  if (!brief.identity?.immutableDetails?.length) {
    failures.push("Evidence-accurate mode requires identity.immutableDetails.");
  }
  if (!brief.identity?.exactCounts?.length) {
    failures.push("Evidence-accurate mode requires identity.exactCounts.");
  }
}

for (const [index, exactCount] of (brief.identity?.exactCounts ?? []).entries()) {
  if (!exactCount.name || !Number.isInteger(exactCount.count) || exactCount.count < 1) {
    failures.push(`identity.exactCounts[${index}] must have a name and positive integer count.`);
  }
}

if (checkFiles) {
  const base = dirname(briefPath);
  for (const reference of brief.references ?? []) {
    await access(resolve(base, reference.file)).catch(() =>
      failures.push(`Reference file does not exist: ${reference.file}`),
    );
  }
}

if (failures.length) {
  console.error(`Cinematic brief validation failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `Cinematic brief passed: ${brief.experience.tier}, ${brief.truthMode}, ${brief.shots.length} shots, ${brief.provider?.attemptLimit ?? 0} attempt(s).`,
);
