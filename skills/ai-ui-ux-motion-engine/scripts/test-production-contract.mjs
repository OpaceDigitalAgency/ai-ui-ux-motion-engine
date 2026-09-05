#!/usr/bin/env node
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scripts = dirname(fileURLToPath(import.meta.url));
const example = JSON.parse(await readFile(resolve(scripts, "../assets/cinematic-brief.example.json"), "utf8"));
const directory = await mkdtemp(join(tmpdir(), "motion-production-contract-"));
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");
const clone = (value) => structuredClone(value);
const failures = [];
let passed = 0;

async function save(name, contents) {
  const bytes = typeof contents === "string" ? contents : JSON.stringify(contents, null, 2);
  await writeFile(join(directory, name), bytes);
  return { file: name, sha256: digest(bytes) };
}

async function invoke(brief, script = "validate-cinematic-brief.mjs", options = ["--stage", "plan", "--check-files"]) {
  await save("brief.json", brief);
  const result = spawnSync(process.execPath, [join(scripts, script), join(directory, "brief.json"), ...options], { encoding: "utf8" });
  if (result.error) throw result.error;
  return { status: result.status, output: `${result.stdout}${result.stderr}` };
}

async function test(name, callback) {
  try {
    await callback();
    passed += 1;
    console.log(`PASS ${name}`);
  } catch (error) {
    failures.push(name);
    console.error(`FAIL ${name}\n${error.message}`);
  }
}

function accepted(result) {
  assert.equal(result.status, 0, result.output);
}

function rejected(result, code) {
  assert.equal(result.status, 1, result.output);
  assert.ok(result.output.includes(code), `Expected ${code}; received:\n${result.output}`);
}

try {
  // Synthetic local files exercise file/hash invariants, not image quality.
  const inputs = [];
  for (const reference of example.references) inputs.push(await save(reference.file, `Synthetic input: ${reference.file}\n`));
  const evidence = await save("evidence.md", "Synthetic fixture: reference observation, feasibility, source preview, authority, quote and model selection.\n");
  const local = clone(example);
  local.intent.audienceTakeaway = "The audience discovers how the parts work together and understands the value of the complete system.";
  local.intent.requiresIndependentMotion = true;
  local.intent.durationRange = { min: 8, max: 12, reason: "The requested authored journey is eight to twelve seconds." };
  local.editing = { mode: "continuous" };
  local.production = {
    technique: "procedural-3d",
    execution: "local",
    feasibility: { status: "verified", rationale: "A controllable local scene exposes each independently moving group.", unresolved: [], evidenceId: "review" },
  };
  local.sourceCoverage.representation = "geometry";
  local.planning = {
    evidence: [{ id: "review", ...evidence, purpose: "Synthetic fixture supporting the recorded checks" }],
    referenceReview: { kind: "video", source: "https://example.test/reference", status: "complete", workflowEvidence: "observed", evidenceId: "review", inspectedRanges: ["00:00–00:12"], transcriptStatus: "Reviewed", descriptionStatus: "Reviewed" },
    requirements: [{ id: "mechanism", requirement: "Reveal independently moving components and return to an intact system.", acceptance: "Separate groups retain identity through the continuous timeline and return to their starting positions.", shotNames: local.shots.map(shot => shot.name) }],
    selection: { reason: "Local geometry allows explicit component paths and reversible timing.", alternatives: [{ name: "generated-video", reason: "Unnecessary uncertainty for this controlled authored scene." }] },
  };
  for (const shot of local.shots) {
    shot.communicates = `Show how ${shot.name} contributes to the complete system.`;
    shot.componentActions = [{ id: "outer-shell", action: "Follow the shell's authored path with preserved identity." }, { id: "internal-group", action: "Follow a separate internal path while maintaining alignment." }];
  }
  delete local.provider;
  delete local.generation;

  const generated = clone(local);
  generated.intent.requiresUnseenGeometry = false;
  generated.sourceCoverage = { authorityType: "generated-concept", representation: "flattened", supportsUnseenGeometry: false, supportsExactMechanics: false, limitations: ["Flattened input cannot guarantee independently controlled components."] };
  generated.production = { technique: "image-to-video", execution: "provider", feasibility: { status: "experiment", rationale: "Test whether the model maintains independent component identity from flattened reference poses.", unresolved: ["Component continuity may fail between reference poses."], evidenceId: "review" } };
  generated.provider = { name: "Synthetic provider", model: "fixture-model", requiredCapability: "image-conditioned video", connected: true, termsApproved: true, accessMethod: "mcp", programmaticPreflightComplete: true, creditsApproved: 20, attemptLimit: 2, params: { count: 1, duration: generated.experience.durationSeconds, resolution: "1080p", audio: false } };
  generated.planning.selection = { reason: "A bounded generation tests the unresolved visual requirement.", alternatives: [{ name: "procedural-3d", reason: "Would require building geometry before testing this illustrative treatment." }], checkedAt: new Date().toISOString(), evidenceId: "review" };
  const payload = { model: generated.provider.model, prompt: "Test independent component motion in one continuous shot with preserved identity.", params: generated.provider.params, medias: inputs.map((input, index) => ({ sourceFile: input.file, role: index === 0 ? "start" : "reference", value: `synthetic-media-${index}` })) };
  const payloadFile = await save("payload.json", payload);
  generated.generation = { previewEvidenceId: "review", previewReviewed: true, authorityEvidenceId: "review", risksAccepted: true, uncertaintyTested: "Whether component identity survives the continuous transition.", stopCondition: "Reject on identity drift; do not resubmit without a specific correction.", attemptsUsed: 0, spentCredits: 0, quote: { evidenceId: "review", checkedAt: new Date().toISOString(), credits: 10, payloadSha256: payloadFile.sha256 }, inputFiles: inputs, payloadFile: payloadFile.file, payloadSha256: payloadFile.sha256 };
  const generate = ["--stage", "generate", "--check-files"];

  await test("local procedural-3d flagship plans without a provider", async () => accepted(await invoke(local)));
  await test("eight-second continuous flagship preserves its impact tier", async () => {
    const candidate = clone(local);
    const factor = 8 / candidate.experience.durationSeconds;
    candidate.experience.durationSeconds = 8;
    for (const shot of candidate.shots) { shot.startSeconds *= factor; shot.endSeconds *= factor; }
    accepted(await invoke(candidate));
  });
  await test("flattened generation remains an explicitly bounded experimental plan", async () => accepted(await invoke(generated)));
  await test("generation passes with reviewed evidence, exact payload, hashes and accepted risk", async () => accepted(await invoke(generated, undefined, generate)));

  const negativeCases = [
    ["missing audience meaning", "TAKEAWAY_MISSING", local, b => delete b.intent.audienceTakeaway, undefined],
    ["chapter lacking meaning", "CHAPTER_MEANING_MISSING", local, b => delete b.shots[0].communicates, undefined],
    ["missing independent component actions", "INDEPENDENT_ACTIONS_MISSING", local, b => b.shots.forEach(s => delete s.componentActions), undefined],
    ["flattened sources falsely labelled compositing", "AUTHORED_COMPONENT_SOURCE_GAP", local, b => { b.production.technique = "compositing"; b.sourceCoverage.representation = "flattened"; }, undefined],
    ["partial video review blocks paid submission", "REFERENCE_ACCESS_PARTIAL", generated, b => b.planning.referenceReview.status = "partial", generate],
    ["changed evidence hash", "EVIDENCE_CHANGED", generated, b => b.planning.evidence[0].sha256 = "0".repeat(64), generate],
    ["changed input hash", "INPUT_CHANGED", generated, b => b.generation.inputFiles[0].sha256 = "0".repeat(64), generate],
    ["quote bound to different payload", "QUOTE_PAYLOAD_MISMATCH", generated, b => b.generation.quote.payloadSha256 = "0".repeat(64), generate],
    ["cumulative spend exceeds authorised credit cap", "CREDIT_CAP_EXCEEDED", generated, b => b.generation.spentCredits = 11, generate],
    ["attempt cap exhausted", "ATTEMPT_CAP_EXCEEDED", generated, b => b.generation.attemptsUsed = 2, generate],
    ["retry without a concrete correction", "RETRY_WITHOUT_CORRECTION", generated, b => b.generation.attemptsUsed = 1, generate],
    ["unaccepted experimental risk", "EXPERIMENT_RISK_NOT_ACCEPTED", generated, b => b.generation.risksAccepted = false, generate],
    ["local route cannot enter provider generation", "LOCAL_ROUTE_NO_GENERATION", local, () => {}, generate],
    ["duration outside the agreed range", "FLAGSHIP_DURATION_OUT_OF_RANGE", local, b => b.intent.durationRange.max = b.experience.durationSeconds - 1, undefined],
    ["provider settings changed after quotation", "PAYLOAD_SETTINGS_MISMATCH", generated, b => b.provider.params.resolution = "720p", generate],
    ["model capability evidence older than 24 hours", "MODEL_CHECK_DATE_MISSING", generated, b => b.planning.selection.checkedAt = new Date(Date.now() - 25 * 3600000).toISOString(), generate],
    ["model capability evidence over five minutes in the future", "MODEL_CHECK_DATE_MISSING", generated, b => b.planning.selection.checkedAt = new Date(Date.now() + 6 * 60000).toISOString(), generate],
    ["quote older than 24 hours", "CREDIT_CAP_EXCEEDED", generated, b => b.generation.quote.checkedAt = new Date(Date.now() - 25 * 3600000).toISOString(), generate],
    ["quote over five minutes in the future", "CREDIT_CAP_EXCEEDED", generated, b => b.generation.quote.checkedAt = new Date(Date.now() + 6 * 60000).toISOString(), generate],
  ];
  for (const [name, code, baseline, mutate, options] of negativeCases) {
    await test(name, async () => {
      const candidate = clone(baseline);
      mutate(candidate);
      rejected(await invoke(candidate, undefined, options), code);
    });
  }
  await test("semantically reordered provider settings are accepted", async () => {
    const candidate = clone(generated);
    candidate.provider.params = Object.fromEntries(Object.entries(candidate.provider.params).reverse());
    accepted(await invoke(candidate, undefined, generate));
  });
  await test("declared text-only provider accepts an empty media list", async () => {
    const candidate = clone(generated);
    candidate.production.technique = "multi-shot-generation";
    candidate.provider.referenceMode = "text-only";
    const textPayload = clone(payload);
    textPayload.medias = [];
    const textFile = await save("text-only-payload.json", textPayload);
    candidate.generation.payloadFile = textFile.file;
    candidate.generation.payloadSha256 = textFile.sha256;
    candidate.generation.quote.payloadSha256 = textFile.sha256;
    accepted(await invoke(candidate, undefined, generate));
  });
  await test("continuous flagship renderer does not mandate cuts", async () => {
    const result = await invoke(generated, "render-cinematic-prompt.mjs", ["--mode", "flagship"]);
    accepted(result);
    assert.match(result.output, /continuous/i);
    assert.doesNotMatch(result.output, /Use distinct hard cuts only|Preserve it across every hard cut/i);
  });
  await test("renderer fails a plan missing meaningful independent action", async () => {
    const candidate = clone(local);
    candidate.shots.forEach(shot => delete shot.componentActions);
    rejected(await invoke(candidate, "render-cinematic-prompt.mjs", ["--mode", "flagship"]), "INDEPENDENT_ACTIONS_MISSING");
  });

  // These bytes deliberately are not a film. The fixture tests record binding;
  // it must never be described as evidence of actual visual acceptance.
  const creativeBrief = await save("creative-brief.json", local);
  const asset = await save("synthetic-asset.txt", "Synthetic creative asset fixture, not visual proof.\n");
  const approval = await save("synthetic-approval.md", "Synthetic owner approval fixture, not real authority.\n");
  const visual = await save("synthetic-visual-observation.md", "Synthetic observation fixture for the continuous mechanism requirement.\n");
  const creativeReview = {
    brief: "creative-brief.json",
    briefSha256: creativeBrief.sha256,
    asset: asset.file,
    assetSha256: asset.sha256,
    decision: "approved",
    ownerApproved: true,
    ownerApproval: { ...approval, assetSha256: asset.sha256, briefSha256: creativeBrief.sha256 },
    creative: {
      openingMatches: true,
      progressionMatches: true,
      payoffMatches: true,
      meaningfulStateChange: true,
      cameraOnlySubstitute: false,
      tierSubstantial: true,
      identityContinuity: true,
      truthfulnessDisclosed: true,
      inBetweenMotionInspected: true,
      audienceTakeawayDemonstrated: true,
      hostFitConfirmed: true,
      observedEffects: local.intent.requiredEffects,
      missingMoments: [],
      evidenceNotes: "Synthetic fixture: validate file and record bindings only.",
    },
    requirementResults: local.planning.requirements.map(requirement => ({
      id: requirement.id,
      passed: true,
      observation: "Synthetic observation of component continuity and return through the full timeline.",
      evidenceFile: visual.file,
      evidenceSha256: visual.sha256,
      startSeconds: 0,
      endSeconds: local.experience.durationSeconds,
    })),
  };
  const integration = ["--stage", "integration"];
  await test("creative integration accepts exact asset, observed requirement and owner-evidence bindings", async () => accepted(await invoke(creativeReview, "validate-creative-acceptance.mjs", integration)));
  const creativeNegativeCases = [
    ["creative asset hash changed", "ASSET_REVIEW_STALE", b => b.assetSha256 = "0".repeat(64)],
    ["creative booleans true without requirement evidence", "REQUIREMENT_NOT_VERIFIED", b => b.requirementResults = []],
    ["failed review cannot be labelled ready", "FAILED_PROOF_MUST_BE_REJECTED", b => { b.creative.payoffMatches = false; b.decision = "ready-for-owner-review"; }],
    ["integration without owner approval evidence", "OWNER_APPROVAL_EVIDENCE_MISSING", b => delete b.ownerApproval],
    ["integration without owner approval decision", "OWNER_APPROVAL_REQUIRED", b => { b.ownerApproved = false; b.decision = "ready-for-owner-review"; }],
    ["creative observation evidence changed", "CREATIVE_EVIDENCE_STALE", b => b.requirementResults[0].evidenceSha256 = "0".repeat(64)],
    ["owner approval for a different asset", "OWNER_APPROVAL_STALE", b => b.ownerApproval.assetSha256 = "0".repeat(64)],
    ["creative review bound to a different brief", "BRIEF_REVIEW_STALE", b => b.briefSha256 = "0".repeat(64)],
    ["owner approval for a different brief", "OWNER_APPROVAL_STALE", b => b.ownerApproval.briefSha256 = "0".repeat(64)],
  ];
  for (const [name, code, mutate] of creativeNegativeCases) {
    await test(name, async () => {
      const candidate = clone(creativeReview);
      mutate(candidate);
      rejected(await invoke(candidate, "validate-creative-acceptance.mjs", integration), code);
    });
  }
} finally {
  await rm(directory, { recursive: true, force: true });
}

console.log(`Production contract regression: ${passed} passed, ${failures.length} failed.`);
if (failures.length) process.exitCode = 1;
