#!/usr/bin/env node
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const skillRoot = resolve(scriptsDir, "..");
const validator = join(scriptsDir, "validate-cinematic-brief.mjs");
const renderer = join(scriptsDir, "render-cinematic-prompt.mjs");
const creativeValidator = join(scriptsDir, "validate-creative-acceptance.mjs");
const validBrief = join(skillRoot, "assets/cinematic-brief.example.json");
const failedBrief = join(
  skillRoot,
  "assets/regressions/camera-only-homepage-failure.json",
);
const creativeReview = join(skillRoot, "assets/creative-acceptance.example.json");

function run(script, args) {
  return spawnSync(process.execPath, [script, ...args], {
    encoding: "utf8",
    maxBuffer: 8 * 1024 * 1024,
  });
}

const valid = run(validator, [validBrief]);
if (valid.status !== 0) {
  console.error(valid.stderr || valid.stdout);
  process.exit(1);
}

const failed = run(validator, [failedBrief]);
if (failed.status === 0) {
  console.error("The camera-only homepage regression fixture unexpectedly passed.");
  process.exit(1);
}
for (const code of [
  "FLAGSHIP_INTENT_CANNOT_BE_DOWNGRADED",
  "FULLSCREEN_SCROLL_REQUIRES_FLAGSHIP",
  "UNSEEN_GEOMETRY_SOURCE_GAP",
  "REQUESTED_BURST_OR_TRANSFORMATION_IS_MISSING",
]) {
  if (!failed.stderr.includes(code)) {
    console.error(`Regression fixture did not prove required failure: ${code}`);
    process.exit(1);
  }
}

const wrongMode = run(renderer, [validBrief, "--mode", "single"]);
if (wrongMode.status === 0 || !wrongMode.stderr.includes("must use --mode flagship")) {
  console.error("A flagship brief was incorrectly allowed through single-shot prompt mode.");
  process.exit(1);
}

const prompt = run(renderer, [validBrief, "--mode", "flagship"]);
if (
  prompt.status !== 0 ||
  !prompt.stdout.includes("INTENT CONTRACT") ||
  !prompt.stdout.includes("SHOT 4") ||
  !prompt.stdout.includes("Required payoff")
) {
  console.error(prompt.stderr || "The flagship prompt omitted its intent contract.");
  process.exit(1);
}

const creativeReviewResult = run(creativeValidator, [
  creativeReview,
  "--stage",
  "integration",
]);
if (creativeReviewResult.status === 0) {
  console.error("An unreviewed template unexpectedly passed integration.");
  process.exit(1);
}

console.log(
  "Cinematic regression tests passed: planning example accepted; camera-only downgrade and missing source coverage rejected; unreviewed template cannot pass integration.",
);
