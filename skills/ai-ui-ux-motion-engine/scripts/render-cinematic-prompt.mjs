#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const modeIndex = args.indexOf("--mode");
const mode = modeIndex === -1 ? "flagship" : args[modeIndex + 1];
if (modeIndex !== -1) args.splice(modeIndex, 2);

if (args.length !== 1 || !["flagship", "single", "illustrative"].includes(mode)) {
  console.error("Usage: render-cinematic-prompt.mjs <brief.json> --mode flagship|single|illustrative");
  process.exit(2);
}

const brief = JSON.parse(await readFile(resolve(args[0]), "utf8"));
if (brief.experience?.tier === "flagship" && mode !== "flagship") {
  console.error(
    "A flagship brief must use --mode flagship. It cannot be downgraded to a single supporting action or illustrative shortcut.",
  );
  process.exit(1);
}
if (mode === "flagship" && brief.experience?.tier !== "flagship") {
  console.error("--mode flagship requires experience.tier=flagship.");
  process.exit(1);
}

const counts = (brief.identity?.exactCounts ?? [])
  .map(({ name, count }) => `exactly ${count} ${name}`)
  .join(", ");
const immutable = (brief.identity?.immutableDetails ?? []).join(", ");
const look = [brief.look?.background, brief.look?.lighting, brief.look?.camera]
  .filter(Boolean)
  .join(". ");
const exclusions = (brief.forbidden ?? []).join(", ");
const delivery = brief.experience ?? {};
const intent = brief.intent ?? {};

const header = `Create a silent ${delivery.durationSeconds}-second ${delivery.aspectRatio} ${delivery.resolution} premium product film of ${brief.identity.description}. ${brief.identity.authorityReference} is the identity authority.`;
const lock = `IDENTITY LOCK: Preserve ${immutable || "the exact visible identity"}.${counts ? ` Maintain ${counts} in the same order and spacing.` : ""} Rigid parts remain rigid and keep their size, shape and material.`;
const finish = `EXCLUSIONS: No ${exclusions}. Keep clean first and final frames and no generated audio.`;
const plannedActions = (brief.shots ?? []).map((shot) => shot.action).join("; ");
const intentContract = `INTENT CONTRACT: ${intent.requestSummary}. Signature moment: ${intent.signatureMoment}. Required progression: ${(intent.progression ?? []).join(" -> ")}. Required payoff: ${intent.payoff}. Do not substitute ${(intent.prohibitedSubstitutes ?? []).join(", ")}.`;

if (mode === "single") {
  const shot = brief.shots[0];
  console.log(`${header}

${lock}

${intentContract}

ACTION: Using ${shot.reference}, perform only ${shot.action}. Camera: ${shot.camera}. Finish at ${shot.endState}.

LOOK: ${look}.

${finish}`);
} else if (mode === "illustrative") {
  console.log(`${header}

Use the reference as the recognisable identity anchor. Create a controlled exploded or burst composition whose named groups separate on clean readable paths, pause, and return exactly to the opening silhouette. Preserve total part count and recognisable materials.

${intentContract}

PLANNED ACTION LANGUAGE: ${plannedActions}.

LOOK: ${look}.

${finish}`);
} else {
  const shotList = brief.shots
    .map(
      (shot, index) =>
        `SHOT ${index + 1} — ${shot.name.toUpperCase()} — ${shot.startSeconds.toFixed(2)}-${shot.endSeconds.toFixed(2)}s
Purpose: ${shot.purpose}. Subject change: ${shot.subjectChange}. Reference: ${shot.reference}. Action: ${shot.action}. Camera: ${shot.camera}. End: ${shot.endState}.`,
    )
    .join("\n\n");
  console.log(`${header}

Every attached reference depicts the same product. Other references constrain only their named shots.

${lock}

${intentContract}

LOOK: ${look}. Preserve it across every hard cut.

${shotList}

EDITING: Use distinct hard cuts only. Do not replace a requested mechanical action with a generic orbit or transition.

${finish}`);
}
