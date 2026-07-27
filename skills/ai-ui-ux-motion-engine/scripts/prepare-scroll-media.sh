#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: prepare-scroll-media.sh INPUT.mp4 OUTPUT_DIR [--frames COUNT] [--width PX]

Creates:
  scroll-master.mp4  silent all-intra H.264 for responsive direct seeking
  delivery-validation.json  machine-readable proof of the scrub master
  poster.jpg         first-frame fallback
  frames/*.jpg       exact scroll sequence
  contact-sheet.jpg  evenly sampled QC overview
  ffprobe.json       source metadata
EOF
}

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  usage
  exit 0
fi

[[ $# -ge 2 ]] || { usage >&2; exit 2; }
input="$1"
output_dir="$2"
shift 2
frame_count=150
width=1600

while [[ $# -gt 0 ]]; do
  case "$1" in
    --frames) frame_count="${2:-}"; shift 2 ;;
    --width) width="${2:-}"; shift 2 ;;
    *) echo "Unknown argument: $1" >&2; usage >&2; exit 2 ;;
  esac
done

[[ -f "$input" ]] || { echo "Input does not exist: $input" >&2; exit 2; }
[[ "$frame_count" =~ ^[1-9][0-9]*$ ]] || { echo "--frames must be a positive integer" >&2; exit 2; }
[[ "$width" =~ ^[1-9][0-9]*$ ]] || { echo "--width must be a positive integer" >&2; exit 2; }
command -v ffmpeg >/dev/null || { echo "ffmpeg is required" >&2; exit 3; }
command -v ffprobe >/dev/null || { echo "ffprobe is required" >&2; exit 3; }

mkdir -p "$output_dir/frames"
duration="$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$input")"
rate="$(awk -v frames="$frame_count" -v seconds="$duration" 'BEGIN { printf "%.8f", frames / seconds }')"
sheet_rate="$(awk -v seconds="$duration" 'BEGIN { printf "%.8f", 30 / seconds }')"

ffprobe -v error -show_format -show_streams -of json "$input" > "$output_dir/ffprobe.json"

ffmpeg -hide_banner -loglevel error -y -i "$input" \
  -map 0:v:0 -an -c:v libx264 -preset medium -crf 18 \
  -g 1 -keyint_min 1 -sc_threshold 0 -pix_fmt yuv420p \
  -movflags +faststart "$output_dir/scroll-master.mp4"

ffmpeg -hide_banner -loglevel error -y -i "$output_dir/scroll-master.mp4" \
  -frames:v 1 -vf "scale=${width}:-2:flags=lanczos" -q:v 2 \
  "$output_dir/poster.jpg"

node "$(dirname "$0")/validate-scroll-media.mjs" \
  "$output_dir/scroll-master.mp4" \
  --poster "$output_dir/poster.jpg" \
  --json "$output_dir/delivery-validation.json"

ffmpeg -hide_banner -loglevel error -y -i "$input" \
  -vf "fps=${rate},scale=${width}:-2:flags=lanczos" -frames:v "$frame_count" \
  -q:v 3 "$output_dir/frames/frame_%04d.jpg"

ffmpeg -hide_banner -loglevel error -y -i "$input" \
  -vf "fps=${sheet_rate},scale=240:-2:flags=lanczos,tile=5x6" \
  -frames:v 1 -q:v 3 "$output_dir/contact-sheet.jpg"

actual_frames="$(find "$output_dir/frames" -type f -name 'frame_*.jpg' | wc -l | tr -d ' ')"
[[ "$actual_frames" -eq "$frame_count" ]] || {
  echo "Expected $frame_count frames, created $actual_frames" >&2
  exit 4
}

printf 'Prepared scroll media: %s frames at %spx in %s\n' "$actual_frames" "$width" "$output_dir"
