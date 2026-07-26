[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidateSet("codex", "claude", "cursor", "antigravity", "antigravity-cli", "gemini", "copilot", "vscode", "cline", "roo", "opencode", "windsurf", "amp", "zed", "goose", "agents")]
    [string]$Target,

    [ValidateSet("global", "project")]
    [string]$Scope = "global",

    [string]$ProjectDir = (Get-Location).Path,
    [string]$Destination,
    [switch]$Force
)

$ErrorActionPreference = "Stop"
$SkillName = "ai-ui-ux-motion-engine"
$PluginRoot = Split-Path -Parent $PSScriptRoot
$SourceDir = Join-Path $PluginRoot "skills/$SkillName"

if (-not (Test-Path (Join-Path $SourceDir "SKILL.md") -PathType Leaf)) {
    throw "Canonical skill not found: $SourceDir"
}

if ([string]::IsNullOrWhiteSpace($Destination)) {
    if ($Scope -eq "project") {
        $relative = switch ($Target) {
            "claude" { ".claude/skills" }
            "cursor" { ".cursor/skills" }
            "copilot" { ".github/skills" }
            "vscode" { ".github/skills" }
            "cline" { ".cline/skills" }
            "roo" { ".roo/skills" }
            "opencode" { ".opencode/skills" }
            "windsurf" { ".windsurf/skills" }
            default { ".agents/skills" }
        }
        $Destination = Join-Path $ProjectDir $relative
    }
    else {
        $Destination = switch ($Target) {
            "codex" { Join-Path $HOME ".agents/skills" }
            "agents" { Join-Path $HOME ".agents/skills" }
            "claude" { Join-Path $HOME ".claude/skills" }
            "cursor" { Join-Path $HOME ".cursor/skills" }
            "antigravity" { Join-Path $HOME ".gemini/config/skills" }
            "antigravity-cli" { Join-Path $HOME ".gemini/antigravity-cli/skills" }
            "copilot" { Join-Path $HOME ".copilot/skills" }
            "vscode" { Join-Path $HOME ".copilot/skills" }
            "cline" { Join-Path $HOME ".cline/skills" }
            "roo" { Join-Path $HOME ".roo/skills" }
            "opencode" { Join-Path $HOME ".config/opencode/skills" }
            "windsurf" { Join-Path $HOME ".codeium/windsurf/skills" }
            "amp" { Join-Path $HOME ".config/agents/skills" }
            "zed" { Join-Path $HOME ".agents/skills" }
            "goose" { Join-Path $HOME ".agents/skills" }
            "gemini" { throw "Gemini CLI global discovery is not assumed; use -Scope project." }
        }
    }
}

$InstallDir = Join-Path $Destination $SkillName
if ((Test-Path $InstallDir) -and -not $Force) {
    throw "Skill already exists at $InstallDir; rerun with -Force to replace it."
}

New-Item -ItemType Directory -Force -Path $Destination | Out-Null
if (Test-Path $InstallDir) {
    if ((Split-Path -Leaf $InstallDir) -ne $SkillName) {
        throw "Refusing to replace unexpected path: $InstallDir"
    }
    Remove-Item -Recurse -Force $InstallDir
}
Copy-Item -Recurse -Path $SourceDir -Destination $InstallDir

Write-Output "Installed $SkillName for $Target ($Scope) at $InstallDir"
