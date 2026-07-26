# Optional tool connections

Verify all provider instructions against the provider’s current official documentation before configuring them. Provider models, endpoints, pricing and authentication change.

## Higgsfield media generation

Verified 26 July 2026 from <https://higgsfield.ai/mcp>.

- Preferred connector URL: `https://mcp.higgsfield.ai/mcp`
- Authentication: provider-hosted sign-in/OAuth; do not put a Higgsfield API key in the repository.
- Treat model names as selectable capabilities, not permanent requirements.
- Ask for user authority before spending credits.
- Use the generated-product-scrubber workflow for an approved still,
  image-to-video camera move, exact final-frame continuation and silent
  high-resolution product output.
- A CAD, GLB or 3D mesh is not a prerequisite for this route.

Do not use the unverified npm package `@higgsfield/mcp-server`.

If no video-generation connector is available, implement and validate the
poster/layout/player boundary but report the generated motion asset as blocked.
Do not substitute three still-image fades and claim equivalent output.

## Firecrawl research

Verified 26 July 2026 from <https://docs.firecrawl.dev/mcp>.

Local stdio configuration:

```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "${FIRECRAWL_API_KEY}"
      }
    }
  }
}
```

Never commit the resolved key. Use the current remote endpoint from official documentation when the client supports remote MCP.

## Browser and visual inspection

Prefer the agent platform’s supported browser integration. Use browser inspection for visible state, responsive behaviour, interaction and console evidence. Use a purpose-built connector for structured private data.

## Image generation

Generate only when original imagery materially improves the experience and suitable licensed imagery is unavailable. Freeze the art direction first. Inspect text, hands, hardware geometry, logos and evidence implications before shipping.

## Component registries

Treat registries as inspiration or dependency sources, not a licence to paste code blindly. Check:

- licence;
- dependency and framework compatibility;
- accessibility;
- server rendering;
- reduced motion;
- maintenance status;
- visual fit.

Record the exact source and modifications.
