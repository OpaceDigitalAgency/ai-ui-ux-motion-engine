# Cursor, Copilot, VS Code, Windsurf, Cline, Roo Code and OpenCode

## Cursor AI

```bash
./scripts/install-skill.sh --target cursor --scope global
```

Installs to `~/.cursor/skills/`; project scope uses `.cursor/skills/`.

## GitHub Copilot and VS Code agent mode

```bash
./scripts/install-skill.sh --target copilot --scope global
```

Personal skills use `~/.copilot/skills/`. Project skills use
`.github/skills/`; GitHub also documents `.agents/skills/` and
`.claude/skills/` as supported project locations. The same Agent Skill can be
used by Copilot coding agent, Copilot CLI, Copilot app, code review and VS Code
agent mode where supported by the installed product version.

## Windsurf Cascade

```bash
./scripts/install-skill.sh --target windsurf --scope global
```

Installs to `~/.codeium/windsurf/skills/`; workspace scope uses
`.windsurf/skills/`.

## Cline

```bash
./scripts/install-skill.sh --target cline --scope global
```

Installs to `~/.cline/skills/`; project scope uses `.cline/skills/`. Enable
Cline’s skills feature if the installed version still marks it experimental.

## Roo Code

```bash
./scripts/install-skill.sh --target roo --scope global
```

Installs to `~/.roo/skills/`; project scope uses `.roo/skills/`. Roo also
supports `.agents/skills/` for cross-agent use.

## OpenCode

```bash
./scripts/install-skill.sh --target opencode --scope global
```

Installs to `~/.config/opencode/skills/`; project scope uses
`.opencode/skills/`.

Official references:

- <https://cursor.com/docs/skills>
- <https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills>
- <https://code.visualstudio.com/docs/agent-customization/agent-skills>
- <https://docs.windsurf.com/windsurf/cascade/skills>
- <https://docs.cline.bot/customization/skills>
- <https://docs.roocode.com/features/skills>
- <https://opencode.ai/docs/skills>

