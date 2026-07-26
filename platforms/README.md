# Platform and provider installation guide

The repository maintains one portable Agent Skill and installs the whole skill
folder into each client’s documented discovery path. This avoids provider
copies drifting apart while still supplying native Codex and Claude plugin
manifests.

Use the automated installer:

```bash
./scripts/install-skill.sh --target TARGET --scope global
```

```powershell
.\scripts\install-skill.ps1 -Target TARGET -Scope global
```

Supported target names are `codex`, `claude`, `cursor`, `antigravity`,
`antigravity-cli`, `gemini`, `copilot`, `vscode`, `cline`, `roo`, `opencode`,
`windsurf`, `amp`, `zed`, `goose` and `agents`.

The machine-readable source of truth is [platforms.json](platforms.json).
Use `--scope project` to install into a repository rather than a personal
directory. Gemini CLI is intentionally project-only because this package does
not assume an undocumented global discovery path.

## Native package formats

- OpenAI Codex: `.codex-plugin/plugin.json` plus the canonical `skills/` tree.
- Claude Code: `.claude-plugin/plugin.json` plus the same canonical `skills/`
  tree.
- Every other listed target: the open `SKILL.md` folder format at its native or
  cross-client discovery path.

Cursor rules, `.cursorrules`, `CLAUDE.md`, `GEMINI.md`, `AGENTS.md`, Copilot
custom instructions and Windsurf rules are always-on instruction systems. They
are not substitutes for an on-demand Agent Skill and are therefore not
generated as misleading duplicate packages.

## ChatGPT, APIs and model providers

ChatGPT is a user-facing AI product, not a local editor discovery directory.
Use this package through Codex in ChatGPT/Codex environments, or attach the
relevant skill instructions and references when a ChatGPT workspace explicitly
supports them. Do not claim that copying a folder into an arbitrary local
`chatgpt` directory installs a ChatGPT skill.

OpenAI, Anthropic, Google, Azure OpenAI, Amazon Bedrock, Vertex AI, OpenRouter
and local models are model providers. A provider supplies the model; the client
or coding agent supplies the skill loader. Install for the client you actually
run, regardless of which model provider powers it.

## Platforms without confirmed native Agent Skills loading

Editors and agents such as Aider, Continue, JetBrains AI/Junie, Replit Agent,
Devin cloud sessions, Bolt, Lovable and v0 change quickly and may use rules,
memory, prompts or product-specific knowledge rather than a portable
`SKILL.md` directory. The complete skill can still be referenced manually, but
this repository does not label that as a native installation until current
official documentation confirms it.

For any compatible client not listed above, use:

```bash
./scripts/install-skill.sh --target agents --scope project
```

Or choose its exact skills parent directory:

```bash
./scripts/install-skill.sh \
  --target agents \
  --destination /absolute/path/to/client/skills
```

