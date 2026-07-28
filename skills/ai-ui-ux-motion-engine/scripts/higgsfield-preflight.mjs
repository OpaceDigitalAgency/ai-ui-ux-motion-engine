#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const allowNpxIndex = args.indexOf("--allow-npx");
const allowNpx = allowNpxIndex !== -1;
if (allowNpx) args.splice(allowNpxIndex, 1);
const jsonIndex = args.indexOf("--json");
const jsonPath = jsonIndex === -1 ? "" : args[jsonIndex + 1];
if (jsonIndex !== -1) args.splice(jsonIndex, 2);

if (args.length > 0) {
  console.error("Usage: higgsfield-preflight.mjs [--allow-npx] [--json REPORT.json]");
  process.exit(2);
}

const candidates = [
  {
    label: "installed-cli",
    command: "higgsfield",
    prefix: [],
  },
];
if (allowNpx) {
  candidates.push({
    label: "npm-exec-cli",
    command: "npm",
    prefix: ["exec", "--yes", "--package=@higgsfield/cli", "--", "higgsfield"],
  });
}

let selected = null;
let result = null;
for (const candidate of candidates) {
  const attempt = spawnSync(
    candidate.command,
    [...candidate.prefix, "account", "status", "--json"],
    { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 },
  );
  if (attempt.status === 0) {
    selected = candidate;
    result = attempt;
    break;
  }
}

if (!selected) {
  console.error(
    "Higgsfield CLI preflight failed. Install with `npm i -g @higgsfield/cli`, run `higgsfield auth login`, then retry. Use --allow-npx only with authority to download the package.",
  );
  process.exit(1);
}

let account;
try {
  account = JSON.parse(result.stdout);
} catch {
  console.error("Higgsfield returned an unreadable account-status response.");
  process.exit(1);
}

const report = {
  passed: true,
  provider: "Higgsfield",
  accessMethod: "cli",
  route: selected.label,
  authenticated: Boolean(account.email),
  workspacePlan: account.subscription_plan_type ?? null,
  creditsAvailable: account.credits ?? null,
  checkedAt: new Date().toISOString(),
  browserRequired: false,
};

if (!report.authenticated) {
  console.error("Higgsfield CLI is available but not authenticated.");
  process.exit(1);
}
if (jsonPath) await writeFile(resolve(jsonPath), `${JSON.stringify(report, null, 2)}\n`);
console.log(
  `Higgsfield CLI preflight passed via ${selected.label}: authenticated, ${String(report.creditsAvailable)} credits available.`,
);
