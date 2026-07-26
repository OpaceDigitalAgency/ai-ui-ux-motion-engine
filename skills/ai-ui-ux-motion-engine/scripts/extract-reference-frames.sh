#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 || $# -gt 3 ]]; then
  echo "Usage: $0 <input-video> <output-directory> [interval-seconds]" >&2
  exit 2
fi

input_video=$1
output_dir=$2
interval_seconds=${3:-2}

if [[ ! -f "$input_video" ]]; then
  echo "Input video not found: $input_video" >&2
  exit 2
fi

if ! command -v ffmpeg >/dev/null 2>&1 || ! command -v ffprobe >/dev/null 2>&1; then
  echo "ffmpeg and ffprobe are required." >&2
  exit 3
fi

if ! [[ "$interval_seconds" =~ ^[0-9]+([.][0-9]+)?$ ]] || [[ "$interval_seconds" == "0" ]]; then
  echo "Interval must be a positive number of seconds." >&2
  exit 2
fi

mkdir -p "$output_dir/even" "$output_dir/scenes"

ffprobe -v quiet -print_format json -show_format -show_streams \
  "$input_video" > "$output_dir/ffprobe.json"

ffmpeg -hide_banner -loglevel error -y -i "$input_video" \
  -vf "fps=1/${interval_seconds},scale='min(1600,iw)':-2" \
  -q:v 2 "$output_dir/even/frame-%05d.jpg"

ffmpeg -hide_banner -loglevel error -y -i "$input_video" \
  -vf "select='gt(scene,0.22)',scale='min(1600,iw)':-2" \
  -fps_mode vfr -pix_fmt yuvj420p -q:v 2 "$output_dir/scenes/scene-%05d.jpg"

even_count=$(find "$output_dir/even" -type f -name '*.jpg' | wc -l | tr -d ' ')
scene_count=$(find "$output_dir/scenes" -type f -name '*.jpg' | wc -l | tr -d ' ')

echo "Extracted $even_count interval frames and $scene_count scene-change frames."
echo "Metadata: $output_dir/ffprobe.json"
