# Test Guidance

This file applies to the Node test suite under `tests/`.

## Test design

- Use `node:test` and `node:assert/strict`, matching the existing suite. Do not
  introduce another test runner for behavior these tests can cover.
- Test public contracts and observable behavior rather than duplicating
  implementation details. A regression test should fail for the original bug
  or missing behavior and pass for the intended reason.
- Keep fixtures and expected project ordering aligned with the authoritative
  modules in `src/data/`, while retaining explicit assertions for important
  navigation, publication, and maturity invariants.
- Resolve files relative to `import.meta.url` so tests do not depend on the
  caller's working directory.
- Tests must not require network access, private workspace contents, personal
  credentials, or an already-running development server.
- `sites-worker.test.mjs` includes assertions against generated `dist/` output;
  create that output with `npm run build` before treating those checks as a
  complete result.

## Verification

- Run the narrow test file while iterating, then run `npm test`.
- For changes that affect TypeScript or the build contract, also run
  `npm run typecheck` and `npm run build` before the final `npm test`.
- Review failure messages for clarity and finish with `git diff --check`.
