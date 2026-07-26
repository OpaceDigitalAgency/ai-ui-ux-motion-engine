# Google Antigravity, Gemini CLI, Amp, Zed, goose and Agent Skills

## Google Antigravity IDE

```bash
./scripts/install-skill.sh --target antigravity --scope global
```

Global skills use `~/.gemini/config/skills/`; project skills use
`.agents/skills/`.

## Antigravity CLI

```bash
./scripts/install-skill.sh --target antigravity-cli --scope global
```

Global skills use `~/.gemini/antigravity-cli/skills/`; project skills use
`.agents/skills/`.

## Gemini CLI

```bash
./scripts/install-skill.sh --target gemini --scope project
```

Google’s Agent Skills codelab documents project discovery from
`.agents/skills/`. This installer deliberately requires project scope.

## Amp, Zed and goose

```bash
./scripts/install-skill.sh --target amp --scope global
./scripts/install-skill.sh --target zed --scope global
./scripts/install-skill.sh --target goose --scope global
```

Amp prefers `~/.config/agents/skills/` for personal skills and
`.agents/skills/` for project skills. Zed uses `~/.agents/skills/` and
`.agents/skills/`. The goose target uses the cross-client `.agents/skills/`
location.

## Any Agent Skills compatible client

The open format requires a named directory containing `SKILL.md`, with optional
`scripts/`, `references/` and `assets/`. This repository keeps those resources
together.

```bash
./scripts/install-skill.sh --target agents --scope global
```

Official references:

- <https://agentskills.io/specification>
- <https://codelabs.developers.google.com/getting-started-with-antigravity-skills>
- <https://codelabs.developers.google.com/antigravity/how-to-create-agent-skills-for-antigravity-cli>
- <https://codelabs.developers.google.com/gemini-cli/how-to-create-agent-skills-for-gemini-cli>
- <https://ampcode.com/manual>
- <https://zed.dev/docs/ai/skills>
- <https://block.github.io/goose/>

