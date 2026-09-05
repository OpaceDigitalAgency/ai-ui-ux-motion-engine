#!/usr/bin/env node
import { access, readFile, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const skillRoot = resolve(scriptsDir, "..");
const pluginRoot = resolve(skillRoot, "../..");
const failures = [];

const required = [
  join(pluginRoot, ".codex-plugin/plugin.json"),
  join(pluginRoot, ".claude-plugin/plugin.json"),
  join(pluginRoot, ".github/workflows/validate.yml"),
  join(pluginRoot, ".github/ISSUE_TEMPLATE/bug-report.yml"),
  join(pluginRoot, ".github/ISSUE_TEMPLATE/feature-request.yml"),
  join(pluginRoot, ".github/ISSUE_TEMPLATE/config.yml"),
  join(pluginRoot, ".github/PULL_REQUEST_TEMPLATE.md"),
  join(pluginRoot, ".github/SUPPORT.md"),
  join(pluginRoot, "README.md"),
  join(pluginRoot, "CHANGELOG.md"),
  join(pluginRoot, "CODE_OF_CONDUCT.md"),
  join(pluginRoot, "LICENSE"),
  join(pluginRoot, "scripts/install-skill.sh"),
  join(pluginRoot, "scripts/install-skill.ps1"),
  join(pluginRoot, "GITHUB-PUBLISHING.md"),
  join(pluginRoot, "platforms/README.md"),
  join(pluginRoot, "platforms/platforms.json"),
  join(pluginRoot, "platforms/openai-anthropic.md"),
  join(pluginRoot, "platforms/editors-and-agents.md"),
  join(pluginRoot, "platforms/google-and-open-standard.md"),
  join(pluginRoot, "assets/social-preview.svg"),
  join(pluginRoot, "assets/social-preview.png"),
  join(skillRoot, "SKILL.md"),
  join(skillRoot, "agents/openai.yaml"),
  join(skillRoot, "assets/cinematic-brief.example.json"),
  join(skillRoot, "assets/creative-acceptance.example.json"),
  join(skillRoot, "assets/creative-acceptance-placeholder.txt"),
  join(skillRoot, "assets/regressions/camera-only-homepage-failure.json"),
  join(skillRoot, "assets/cinematic-scroll-controller.js"),
  join(skillRoot, "references/workflow.md"),
  join(skillRoot, "references/motion-patterns.md"),
  join(skillRoot, "references/media-pipeline.md"),
  join(skillRoot, "references/generated-product-scrubber.md"),
  join(skillRoot, "references/cinematic-intake.md"),
  join(skillRoot, "references/creative-briefing.md"),
  join(skillRoot, "references/cinematic-prompts.md"),
  join(skillRoot, "references/cinematic-case-study.md"),
  join(skillRoot, "references/tool-connections.md"),
  join(skillRoot, "references/accessibility-performance.md"),
  join(skillRoot, "references/source-coverage.md"),
  join(skillRoot, "references/verification.md"),
  join(skillRoot, "scripts/validate-cinematic-brief.mjs"),
  join(skillRoot, "scripts/validate-creative-acceptance.mjs"),
  join(skillRoot, "scripts/higgsfield-preflight.mjs"),
  join(skillRoot, "scripts/test-cinematic-regressions.mjs"),
  join(skillRoot, "scripts/test-production-contract.mjs"),
  join(skillRoot, "scripts/production-contract.mjs"),
  join(skillRoot, "references/production-contract.md"),
  join(skillRoot, "scripts/render-cinematic-prompt.mjs"),
  join(skillRoot, "scripts/prepare-scroll-media.sh"),
  join(skillRoot, "scripts/validate-scroll-media.mjs"),
];

for (const path of required) {
  await access(path).catch(() => failures.push(`Missing required file: ${path}`));
}

const skill = await readFile(join(skillRoot, "SKILL.md"), "utf8");
if (!/^---\nname: ai-ui-ux-motion-engine\ndescription: .+\n---/s.test(skill)) {
  failures.push("SKILL.md frontmatter is missing or invalid.");
}

for (const phrase of [
  "Mandatory cinematic-intent gate",
  "The user does not need to use a trigger word",
  "Produce one isolated private proof",
  "Never put a weak proof into a live hero",
  "Never downgrade a requested full-screen",
  "Executable flagship gate",
  "Programmatic provider rule",
  "validate-creative-acceptance.mjs",
  "fastest route that can meet the accuracy target",
  "Target 15–30 minutes",
  "inspect every frame only",
  "default to parallel execution",
]) {
  if (!skill.includes(phrase)) failures.push(`SKILL.md is missing cinematic guardrail: ${phrase}`);
}

for (const match of skill.matchAll(/\]\((references\/[^)]+)\)/g)) {
  const path = join(skillRoot, match[1]);
  await access(path).catch(() => failures.push(`Broken SKILL.md reference: ${match[1]}`));
}

const plugin = JSON.parse(await readFile(join(pluginRoot, ".codex-plugin/plugin.json"), "utf8"));
if (plugin.name !== "ai-ui-ux-motion-engine") failures.push("Plugin name does not match skill.");
if (!/^\d+\.\d+\.\d+(?:[-+].+)?$/.test(plugin.version ?? "")) failures.push("Plugin version is not semver.");
if (plugin.version.split("+")[0] !== "1.8.2") failures.push("Plugin base version is not 1.8.2.");
if (plugin.homepage !== "https://opace.agency/services/web-design/") {
  failures.push("Codex plugin homepage does not point to Opace web design.");
}
if (
  plugin.repository !==
  "https://github.com/OpaceDigitalAgency/ai-ui-ux-motion-engine"
) {
  failures.push("Codex plugin repository URL is incorrect.");
}

const claudePlugin = JSON.parse(await readFile(join(pluginRoot, ".claude-plugin/plugin.json"), "utf8"));
if (claudePlugin.name !== plugin.name) failures.push("Claude and Codex plugin names differ.");
if (claudePlugin.version.split("+")[0] !== plugin.version.split("+")[0]) {
  failures.push("Claude and Codex plugin base versions differ.");
}
if (claudePlugin.skills !== "./skills/") failures.push("Claude plugin does not expose the canonical skills directory.");
if (claudePlugin.homepage !== "https://opace.agency/services/web-design/") {
  failures.push("Claude plugin homepage does not point to Opace web design.");
}
if (
  claudePlugin.repository !==
  "https://github.com/OpaceDigitalAgency/ai-ui-ux-motion-engine"
) {
  failures.push("Claude plugin repository URL is incorrect.");
}

const readme = await readFile(join(pluginRoot, "README.md"), "utf8");
if (!readme.includes("[Opace Digital Agency](https://opace.agency/services/web-design/)")) {
  failures.push("README is missing the contextual Opace web-design link.");
}
for (const phrase of [
  "cinematic scroll reveals",
  "provider access and spend",
  "one private signature sequence",
  "all-intra video",
  "cannot silently become a five-second supporting rotation",
  "Higgsfield",
]) {
  if (!readme.includes(phrase)) failures.push(`README is missing current guidance: ${phrase}`);
}

const cinematicBrief = JSON.parse(
  await readFile(join(skillRoot, "assets/cinematic-brief.example.json"), "utf8"),
);
if (cinematicBrief.experience?.tier !== "flagship") {
  failures.push("Cinematic example does not exercise the flagship route.");
}
if (cinematicBrief.provider?.attemptLimit !== 1) {
  failures.push("Cinematic example does not enforce a one-attempt first proof.");
}
if (cinematicBrief.intent?.impact !== "flagship") {
  failures.push("Cinematic example does not lock flagship intent.");
}
if (cinematicBrief.provider?.accessMethod !== "cli") {
  failures.push("Cinematic example does not exercise programmatic provider access.");
}
if ((cinematicBrief.intent?.progression?.length ?? 0) < 3) {
  failures.push("Cinematic example does not contain an authored progression.");
}

const generatedScrubber = await readFile(
  join(skillRoot, "references/generated-product-scrubber.md"),
  "utf8",
);
for (const phrase of [
  "Golden path",
  "One-anchor burst option",
  "Provider preflight",
  "Attempt discipline",
  "ordinary long-GOP",
  "short-GOP",
  "Six correct screenshots",
  "Scaling across a site",
]) {
  if (!generatedScrubber.includes(phrase)) {
    failures.push(`Generated scrubber is missing required section: ${phrase}`);
  }
}

const workflow = await readFile(join(pluginRoot, ".github/workflows/validate.yml"), "utf8");
for (const phrase of [
  "bash -n skills/ai-ui-ux-motion-engine/scripts/prepare-scroll-media.sh",
  "validate-scroll-media.mjs",
  "silent all-intra H.264",
  "prepare-scroll-media.sh",
  "validate-cinematic-brief.mjs",
  "test-cinematic-regressions.mjs",
  "validate-creative-acceptance.mjs",
]) {
  if (!workflow.includes(phrase)) failures.push(`Hosted validation is missing: ${phrase}`);
}
if (!readme.includes("https://github.com/OpaceDigitalAgency/ai-ui-ux-motion-engine")) {
  failures.push("README is missing the standalone AI UI/UX Motion Engine repository.");
}

const scrollController = await readFile(
  join(skillRoot, "assets/cinematic-scroll-controller.js"),
  "utf8",
);
for (const phrase of [
  "seekInFlight",
  "pendingTime",
  "loadeddata",
  "cinematicReady",
  "seekLatest",
]) {
  if (!scrollController.includes(phrase)) {
    failures.push(`Scroll controller is missing seek-safety contract: ${phrase}`);
  }
}

const scrollValidator = await readFile(
  join(skillRoot, "scripts/validate-scroll-media.mjs"),
  "utf8",
);
for (const phrase of [
  "nonIntraFrames",
  "audioStreams",
  "Fast-start requirement failed",
  "--poster",
  "posterFirstFrameSsim",
  "Poster/first-frame mismatch",
  "moov",
  "mdat",
]) {
  if (!scrollValidator.includes(phrase)) {
    failures.push(`Scroll-media validator is missing delivery check: ${phrase}`);
  }
}

const briefValidator = await readFile(
  join(skillRoot, "scripts/validate-cinematic-brief.mjs"),
  "utf8",
);
for (const phrase of [
  "FLAGSHIP_INTENT_CANNOT_BE_DOWNGRADED",
  "FULLSCREEN_SCROLL_REQUIRES_FLAGSHIP",
  "CAMERA_ONLY_MOTION_CANNOT_SATISFY_PRODUCT_JOURNEY",
  "REQUESTED_BURST_OR_TRANSFORMATION_IS_MISSING",
  "UNSEEN_GEOMETRY_SOURCE_GAP",
  "PROGRAMMATIC_PREFLIGHT_REQUIRED",
]) {
  if (!briefValidator.includes(phrase)) {
    failures.push(`Cinematic brief validator is missing semantic gate: ${phrase}`);
  }
}

const creativeValidator = await readFile(
  join(skillRoot, "scripts/validate-creative-acceptance.mjs"),
  "utf8",
);
for (const phrase of [
  "CAMERA_ONLY_SUBSTITUTE_REJECTED",
  "REQUESTED_EFFECTS_NOT_OBSERVED",
  "OWNER_APPROVAL_REQUIRED",
]) {
  if (!creativeValidator.includes(phrase)) {
    failures.push(`Creative acceptance validator is missing gate: ${phrase}`);
  }
}

const toolConnections = await readFile(
  join(skillRoot, "references/tool-connections.md"),
  "utf8",
);
for (const phrase of [
  "native CLI for coding agents such as Codex",
  "higgsfield-preflight.mjs",
  "browserFallbackReason",
]) {
  if (!toolConnections.includes(phrase)) {
    failures.push(`Tool connection guidance is missing programmatic route: ${phrase}`);
  }
}

for (const phrase of [
  "accuracy-first",
  "lean-scalable",
  "safe-when-supported",
  "automated-overview-dense-on-risk",
]) {
  if (!JSON.stringify(cinematicBrief).includes(phrase)) {
    failures.push(`Cinematic brief is missing workflow guardrail: ${phrase}`);
  }
}

for (const entry of await readdir(join(pluginRoot, "skills"), {
  withFileTypes: true,
})) {
  if (!entry.isDirectory()) continue;
  await access(join(pluginRoot, "skills", entry.name, "README.md"))
    .then(() =>
      failures.push(
        `Canonical skill folder contains auxiliary README.md: ${entry.name}`,
      ),
    )
    .catch(() => {});
}
const readmeOpening = readme.slice(0, 2600).replace(/\s+/g, " ");
for (const term of [
  "Codex skill",
  "Claude Code skill",
  "Cursor skill",
  "Antigravity skill",
  "Gemini CLI skill",
  "GitHub Copilot skill",
  "Windsurf skill",
  "Cline skill",
  "Roo Code skill",
  "OpenCode skill",
  "AI website",
  "motion graphics",
  "UI design",
  "UX design",
]) {
  if (!readmeOpening.includes(term)) {
    failures.push(`README opening does not clearly identify ${term} support.`);
  }
}

const platformRegistry = JSON.parse(
  await readFile(join(pluginRoot, "platforms/platforms.json"), "utf8"),
);
const requiredTargetIds = [
  "codex",
  "claude",
  "cursor",
  "antigravity",
  "antigravity-cli",
  "gemini",
  "copilot",
  "cline",
  "roo",
  "opencode",
  "windsurf",
  "amp",
  "zed",
  "goose",
  "agents",
];
const targetIds = new Set(platformRegistry.targets?.map((target) => target.id));
for (const target of requiredTargetIds) {
  if (!targetIds.has(target)) failures.push(`Platform registry is missing target: ${target}`);
}

const shellInstaller = await readFile(join(pluginRoot, "scripts/install-skill.sh"), "utf8");
const powershellInstaller = await readFile(join(pluginRoot, "scripts/install-skill.ps1"), "utf8");
for (const target of requiredTargetIds) {
  if (!shellInstaller.includes(target)) failures.push(`Shell installer is missing target: ${target}`);
  if (!powershellInstaller.includes(`"${target}"`)) {
    failures.push(`PowerShell installer is missing target: ${target}`);
  }
}

async function validateLocalMarkdownLinks(path) {
  const text = await readFile(path, "utf8");
  for (const match of text.matchAll(/\]\(([^)]+)\)/g)) {
    const href = match[1].trim();
    if (
      !href ||
      href.startsWith("#") ||
      /^[a-z][a-z0-9+.-]*:/i.test(href)
    ) {
      continue;
    }
    const filePart = href.split("#", 1)[0];
    await access(resolve(dirname(path), filePart)).catch(() =>
      failures.push(`Broken local Markdown link in ${path}: ${href}`),
    );
  }
}

await validateLocalMarkdownLinks(join(pluginRoot, "README.md"));
await validateLocalMarkdownLinks(join(pluginRoot, "GITHUB-PUBLISHING.md"));
for (const file of await readdir(join(pluginRoot, "platforms"))) {
  if (file.endsWith(".md")) {
    await validateLocalMarkdownLinks(join(pluginRoot, "platforms", file));
  }
}

async function scan(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === ".git") continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await scan(path);
    else if (/\.(?:md|json|ya?ml|mjs|sh|ps1)$/.test(entry.name)) {
      if (path === fileURLToPath(import.meta.url)) continue;
      const text = await readFile(path, "utf8");
      if (/\[TODO:|yourusername|YOUR_HIGGSFIELD_API_KEY_HERE/.test(text)) {
        failures.push(`Placeholder remains in ${path}`);
      }
    }
  }
}

await scan(pluginRoot);

if (failures.length) {
  console.error(`Package validation failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Package validation passed.");
