# Verification contract

## Package validation

Run from the installed skill directory:

```bash
node scripts/validate-package.mjs
```

This checks required plugin/skill files, frontmatter, referenced resources, provider anti-patterns and leftover placeholders.

## Project validation

1. Run the project’s focused component tests.
2. Run `node scripts/audit-motion-safety.mjs <project>`.
3. Run the full documented test/build/lint/typecheck baseline.
4. Start the normal preview.
5. Exercise primary interactions with pointer and keyboard.
6. inspect reduced motion.
7. inspect representative mobile, tablet and desktop layouts.
8. check console/runtime errors and broken links.
9. compare with the approved direction and acceptance criteria.

## Claim language

Use:

- “build passed” only with a successful current run;
- “keyboard checked on [routes]” only after manual or browser automation evidence;
- “no new automated accessibility violations” only when compared with a baseline;
- “WCAG conformance not established” unless a formal audit supports it;
- “private preview deployed” or “production deployed” only after the hosting platform confirms status.

## Handoff minimum

List changed components, validation evidence, unresolved issues and release boundary. Update project control/status documents when the project requires them.
