#!/usr/bin/env node
import { readdir, readFile, stat } from "node:fs/promises";
import { extname, join, resolve } from "node:path";

const root = resolve(process.argv[2] ?? ".");
const strict = process.argv.includes("--strict");
const ignored = new Set([".git", "node_modules", "dist", "build", ".next", ".astro"]);
const extensions = new Set([".astro", ".css", ".html", ".js", ".jsx", ".mjs", ".ts", ".tsx", ".vue", ".svelte"]);
const findings = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (extensions.has(extname(entry.name))) await inspect(path);
  }
}

async function inspect(path) {
  if (path.endsWith("audit-motion-safety.mjs")) return;
  const source = await readFile(path, "utf8");
  const hasMotion = /@keyframes|animation\s*:|transition\s*:|useScroll|ScrollTrigger|requestAnimationFrame|IntersectionObserver/.test(source);
  if (hasMotion && !/prefers-reduced-motion|useReducedMotion/.test(source)) {
    findings.push({ path, level: "warning", rule: "motion-without-local-reduced-motion-signal" });
  }

  for (const match of source.matchAll(/<video\b[^>]*>/gi)) {
    const tag = match[0];
    if (/\bautoplay\b/i.test(tag) && (!/\bmuted\b/i.test(tag) || !/\bplaysinline\b/i.test(tag))) {
      findings.push({ path, level: "error", rule: "autoplay-video-must-be-muted-and-playsinline" });
    }
    if (!/\bposter\s*=/i.test(tag)) {
      findings.push({ path, level: "warning", rule: "video-without-poster" });
    }
  }

  if (/\.addEventListener\(\s*["']scroll["']/.test(source) &&
      !/requestAnimationFrame|passive\s*:\s*true/.test(source)) {
    findings.push({ path, level: "warning", rule: "scroll-listener-without-throttle-or-passive-signal" });
  }

  if (/\bdrag(?:=|\s)|onDragEnd/.test(source) &&
      !/onKeyDown|Previous|Next|Dismiss|button/i.test(source)) {
    findings.push({ path, level: "warning", rule: "drag-interaction-without-visible-alternative-signal" });
  }
}

const target = await stat(root).catch(() => null);
if (!target?.isDirectory()) {
  console.error(`Project directory not found: ${root}`);
  process.exit(2);
}

await walk(root);

if (findings.length === 0) {
  console.log("Motion safety audit: no heuristic findings.");
  process.exit(0);
}

console.log(`Motion safety audit: ${findings.length} heuristic finding(s).`);
for (const finding of findings) {
  console.log(`${finding.level.toUpperCase()} ${finding.rule} ${finding.path}`);
}
console.log("Review findings manually; absence of findings is not a conformance claim.");

if (strict && findings.some((finding) => finding.level === "error")) process.exit(1);
