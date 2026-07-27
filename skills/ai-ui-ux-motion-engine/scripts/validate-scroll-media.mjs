#!/usr/bin/env node
import { readFile, stat, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const input = args[0];
let jsonPath = "";
let posterPath = "";
let maxSizeMb = 25;
let minPosterSsim = 0.99;

for (let index = 1; index < args.length; index += 1) {
  if (args[index] === "--json") {
    jsonPath = args[index + 1] ?? "";
    index += 1;
  } else if (args[index] === "--poster") {
    posterPath = args[index + 1] ?? "";
    index += 1;
  } else if (args[index] === "--max-size-mb") {
    maxSizeMb = Number(args[index + 1]);
    index += 1;
  } else if (args[index] === "--min-poster-ssim") {
    minPosterSsim = Number(args[index + 1]);
    index += 1;
  } else {
    console.error(`Unknown argument: ${args[index]}`);
    process.exit(2);
  }
}

if (!input) {
  console.error(
    "Usage: validate-scroll-media.mjs INPUT.mp4 --poster POSTER.jpg [--json REPORT.json] [--max-size-mb 25] [--min-poster-ssim 0.99]",
  );
  process.exit(2);
}
if (!posterPath) {
  console.error("--poster is required so the fallback can be compared with the decoded first frame.");
  process.exit(2);
}
if (!Number.isFinite(maxSizeMb) || maxSizeMb <= 0) {
  console.error("--max-size-mb must be a positive number.");
  process.exit(2);
}
if (!Number.isFinite(minPosterSsim) || minPosterSsim <= 0 || minPosterSsim > 1) {
  console.error("--min-poster-ssim must be greater than 0 and no more than 1.");
  process.exit(2);
}

const absoluteInput = resolve(input);
const absolutePoster = resolve(posterPath);
const failures = [];

function runFfprobe(probeArgs) {
  const result = spawnSync("ffprobe", probeArgs, {
    encoding: "utf8",
    maxBuffer: 128 * 1024 * 1024,
  });
  if (result.error?.code === "ENOENT") {
    console.error("ffprobe is required to validate scroll media.");
    process.exit(3);
  }
  if (result.status !== 0) {
    console.error(result.stderr || "ffprobe failed.");
    process.exit(3);
  }
  return JSON.parse(result.stdout);
}

const metadata = runFfprobe([
  "-v",
  "error",
  "-show_streams",
  "-show_format",
  "-of",
  "json",
  absoluteInput,
]);
const frameData = runFfprobe([
  "-v",
  "error",
  "-select_streams",
  "v:0",
  "-show_entries",
  "frame=key_frame,pict_type",
  "-of",
  "json",
  absoluteInput,
]);
const posterMetadata = runFfprobe([
  "-v",
  "error",
  "-show_streams",
  "-of",
  "json",
  absolutePoster,
]);

const streams = metadata.streams ?? [];
const videoStreams = streams.filter((stream) => stream.codec_type === "video");
const audioStreams = streams.filter((stream) => stream.codec_type === "audio");
const video = videoStreams[0];
const poster = (posterMetadata.streams ?? []).find((stream) => stream.codec_type === "video");
const frames = frameData.frames ?? [];
const fileStats = await stat(absoluteInput);
const sizeMb = fileStats.size / 1024 / 1024;

if (videoStreams.length !== 1) failures.push(`Expected one video stream, found ${videoStreams.length}.`);
if (audioStreams.length !== 0) failures.push(`Expected silent media, found ${audioStreams.length} audio stream(s).`);
if (!video) {
  failures.push("No primary video stream was found.");
} else {
  if (video.codec_name !== "h264") failures.push(`Expected H.264, found ${video.codec_name ?? "unknown"}.`);
  if (video.pix_fmt !== "yuv420p") failures.push(`Expected yuv420p, found ${video.pix_fmt ?? "unknown"}.`);
  if (!Number.isFinite(Number(video.duration ?? metadata.format?.duration))) {
    failures.push("Duration is missing or invalid.");
  }
  if (!Number.isInteger(video.width) || !Number.isInteger(video.height)) {
    failures.push("Video dimensions are missing.");
  } else if (video.width % 2 !== 0 || video.height % 2 !== 0) {
    failures.push(`Dimensions must be even, found ${video.width}x${video.height}.`);
  }
}
if (!poster || !Number.isInteger(poster.width) || !Number.isInteger(poster.height)) {
  failures.push("Poster dimensions are missing or invalid.");
} else if (
  video &&
  Number.isInteger(video.width) &&
  Number.isInteger(video.height) &&
  video.width * poster.height !== video.height * poster.width
) {
  failures.push(
    `Poster aspect ratio ${poster.width}x${poster.height} does not match video ${video.width}x${video.height}.`,
  );
}

if (frames.length < 2) failures.push(`Expected multiple decoded frames, found ${frames.length}.`);
const nonIntraFrames = frames.filter(
  (frame) => frame.key_frame !== 1 || frame.pict_type !== "I",
);
if (nonIntraFrames.length > 0) {
  failures.push(
    `All-intra requirement failed: ${nonIntraFrames.length} of ${frames.length} frames depend on other frames.`,
  );
}
if (sizeMb > maxSizeMb) {
  failures.push(
    `File is ${sizeMb.toFixed(2)}MB, above the configured ${maxSizeMb.toFixed(2)}MB budget.`,
  );
}

const fileBuffer = await readFile(absoluteInput);
const topLevelAtoms = [];
let offset = 0;
while (offset + 8 <= fileBuffer.length) {
  let atomSize = fileBuffer.readUInt32BE(offset);
  const atomType = fileBuffer.toString("ascii", offset + 4, offset + 8);
  let headerSize = 8;
  if (atomSize === 1 && offset + 16 <= fileBuffer.length) {
    atomSize = Number(fileBuffer.readBigUInt64BE(offset + 8));
    headerSize = 16;
  } else if (atomSize === 0) {
    atomSize = fileBuffer.length - offset;
  }
  if (atomSize < headerSize || offset + atomSize > fileBuffer.length) break;
  topLevelAtoms.push(atomType);
  offset += atomSize;
}
const moovIndex = topLevelAtoms.indexOf("moov");
const mdatIndex = topLevelAtoms.indexOf("mdat");
if (moovIndex < 0 || mdatIndex < 0 || moovIndex > mdatIndex) {
  failures.push("Fast-start requirement failed: the moov atom must precede mdat.");
}

let posterSsim = null;
if (poster && Number.isInteger(poster.width) && Number.isInteger(poster.height)) {
  const comparison = spawnSync(
    "ffmpeg",
    [
      "-hide_banner",
      "-i",
      absoluteInput,
      "-i",
      absolutePoster,
      "-filter_complex",
      `[0:v]select='eq(n,0)',scale=${poster.width}:${poster.height}:flags=lanczos[first];[first][1:v]ssim`,
      "-frames:v",
      "1",
      "-f",
      "null",
      "-",
    ],
    { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 },
  );
  if (comparison.error?.code === "ENOENT") {
    console.error("ffmpeg is required to compare the poster with the first decoded frame.");
    process.exit(3);
  }
  if (comparison.status !== 0) {
    console.error(comparison.stderr || "ffmpeg poster comparison failed.");
    process.exit(3);
  }
  const match = comparison.stderr.match(/\bAll:([0-9.]+)/);
  posterSsim = match ? Number(match[1]) : null;
  if (!Number.isFinite(posterSsim)) {
    failures.push("Poster comparison did not produce an SSIM score.");
  } else if (posterSsim < minPosterSsim) {
    failures.push(
      `Poster/first-frame mismatch: SSIM ${posterSsim.toFixed(6)} is below ${minPosterSsim.toFixed(6)}. Regenerate the poster from the exact shipping video.`,
    );
  }
}

const report = {
  input: absoluteInput,
  poster: absolutePoster,
  passed: failures.length === 0,
  codec: video?.codec_name ?? null,
  pixelFormat: video?.pix_fmt ?? null,
  dimensions: video ? `${video.width}x${video.height}` : null,
  durationSeconds: Number(video?.duration ?? metadata.format?.duration ?? 0),
  frameCount: frames.length,
  keyframeCount: frames.filter((frame) => frame.key_frame === 1).length,
  nonIntraFrameCount: nonIntraFrames.length,
  audioStreamCount: audioStreams.length,
  posterDimensions: poster ? `${poster.width}x${poster.height}` : null,
  posterFirstFrameSsim: posterSsim,
  minPosterSsim,
  sizeMb: Number(sizeMb.toFixed(3)),
  maxSizeMb,
  topLevelAtoms,
  failures,
};

if (jsonPath) {
  await writeFile(resolve(jsonPath), `${JSON.stringify(report, null, 2)}\n`);
}

if (failures.length > 0) {
  console.error(`Scroll-media validation failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `Scroll-media validation passed: ${frames.length}/${frames.length} independent I-frames, silent H.264, fast-start, poster SSIM ${posterSsim.toFixed(6)}, ${sizeMb.toFixed(2)}MB.`,
);
