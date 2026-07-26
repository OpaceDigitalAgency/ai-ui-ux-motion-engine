# OpenAI Codex, ChatGPT and Claude Code

## OpenAI Codex skill and Codex plugin

The canonical package contains `.codex-plugin/plugin.json` for Codex plugin
distribution. A standalone Codex skill is installed under
`~/.agents/skills/ai-ui-ux-motion-engine/` or a project’s
`.agents/skills/ai-ui-ux-motion-engine/`.

```bash
./scripts/install-skill.sh --target codex --scope global
```

Invoke it explicitly with:

```text
Use $ai-ui-ux-motion-engine to redesign this website and validate the result.
```

ChatGPT users should use the Codex integration or a workspace feature that
explicitly supports skill instructions. There is no invented `~/.chatgpt`
installation path in this repository.

## Claude Code skill and Claude plugin

The package contains `.claude-plugin/plugin.json`. Standalone personal and
project skills use `~/.claude/skills/` and `.claude/skills/`.

```bash
./scripts/install-skill.sh --target claude --scope global
```

The skill is intended for Claude Code’s on-demand skill system. It is not a
replacement for a repository-wide `CLAUDE.md` file, which serves a different,
always-on purpose.

Official references:

- <https://learn.chatgpt.com/docs/build-skills.md>
- <https://code.claude.com/docs/en/skills>
- <https://code.claude.com/docs/en/plugins-reference>

