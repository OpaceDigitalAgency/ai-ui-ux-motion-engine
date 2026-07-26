# Security policy

## Reporting

Do not open a public issue containing credentials, private recordings, customer data or an exploitable vulnerability. Contact the repository owner privately.

## Design boundaries

- The skill must not collect or transmit project data.
- External connectors are optional and require the user’s authority.
- Credentials belong in the agent/client’s secret store or environment, never committed files.
- Reference recordings may contain confidential information; keep extraction output local unless the user explicitly authorises sharing.
- Third-party components and media require licence and provenance review.
