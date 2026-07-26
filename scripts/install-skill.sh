#!/usr/bin/env bash
set -euo pipefail

skill_name="ai-ui-ux-motion-engine"
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
plugin_root="$(cd "$script_dir/.." && pwd)"
source_dir="$plugin_root/skills/$skill_name"
target=""
scope="global"
project_dir="$PWD"
destination=""
force=0

usage() {
  cat <<'EOF'
Usage: install-skill.sh --target TARGET [--scope global|project]
                        [--project-dir PATH] [--destination PATH] [--force]

Targets:
  codex, claude, cursor, antigravity, antigravity-cli, gemini
  copilot, vscode, cline, roo, opencode, windsurf, amp, zed, goose, agents

--destination overrides product discovery paths and is intended for testing or
custom Agent Skills clients. It must name the parent skills directory.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --target) target="${2:-}"; shift 2 ;;
    --scope) scope="${2:-}"; shift 2 ;;
    --project-dir) project_dir="${2:-}"; shift 2 ;;
    --destination) destination="${2:-}"; shift 2 ;;
    --force) force=1; shift ;;
    --help|-h) usage; exit 0 ;;
    *) echo "Unknown argument: $1" >&2; usage >&2; exit 2 ;;
  esac
done

[[ -n "$target" ]] || { echo "--target is required" >&2; usage >&2; exit 2; }
[[ "$scope" == "global" || "$scope" == "project" ]] || {
  echo "--scope must be global or project" >&2
  exit 2
}
[[ -f "$source_dir/SKILL.md" ]] || {
  echo "Canonical skill not found: $source_dir" >&2
  exit 2
}

if [[ -z "$destination" ]]; then
  if [[ "$scope" == "project" ]]; then
    case "$target" in
      codex|antigravity|antigravity-cli|gemini|amp|zed|goose|agents) destination="$project_dir/.agents/skills" ;;
      claude) destination="$project_dir/.claude/skills" ;;
      cursor) destination="$project_dir/.cursor/skills" ;;
      copilot|vscode) destination="$project_dir/.github/skills" ;;
      cline) destination="$project_dir/.cline/skills" ;;
      roo) destination="$project_dir/.roo/skills" ;;
      opencode) destination="$project_dir/.opencode/skills" ;;
      windsurf) destination="$project_dir/.windsurf/skills" ;;
      *) echo "Unsupported target: $target" >&2; exit 2 ;;
    esac
  else
    case "$target" in
      codex|zed|goose|agents) destination="$HOME/.agents/skills" ;;
      claude) destination="$HOME/.claude/skills" ;;
      cursor) destination="$HOME/.cursor/skills" ;;
      antigravity) destination="$HOME/.gemini/config/skills" ;;
      antigravity-cli) destination="$HOME/.gemini/antigravity-cli/skills" ;;
      copilot|vscode) destination="$HOME/.copilot/skills" ;;
      cline) destination="$HOME/.cline/skills" ;;
      roo) destination="$HOME/.roo/skills" ;;
      opencode) destination="$HOME/.config/opencode/skills" ;;
      windsurf) destination="$HOME/.codeium/windsurf/skills" ;;
      amp) destination="$HOME/.config/agents/skills" ;;
      gemini)
        echo "Gemini CLI global discovery is not assumed; use --scope project." >&2
        exit 2
        ;;
      *) echo "Unsupported target: $target" >&2; exit 2 ;;
    esac
  fi
fi

install_dir="${destination%/}/$skill_name"
if [[ -e "$install_dir" && "$force" -ne 1 ]]; then
  echo "Skill already exists at $install_dir; rerun with --force to replace it." >&2
  exit 3
fi

mkdir -p "$destination"
if [[ -e "$install_dir" ]]; then
  case "$install_dir" in
    */"$skill_name") rm -rf "$install_dir" ;;
    *) echo "Refusing to replace unexpected path: $install_dir" >&2; exit 4 ;;
  esac
fi
cp -R "$source_dir" "$install_dir"

printf 'Installed %s for %s (%s) at %s\n' "$skill_name" "$target" "$scope" "$install_dir"
