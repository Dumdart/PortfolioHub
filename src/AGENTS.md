# Frontend Source Guidance

This file applies to everything under `src/`. The repository-root `AGENTS.md`
still applies; this file adds frontend-specific constraints.

## Before editing

- Trace the affected route or view from `router.ts` through its components,
  composables, data modules, styles, and tests before changing it.
- Reuse the existing Vue 3 Composition API, TypeScript, Vue Router, and shared
  component patterns. Do not introduce a second state, routing, styling, icon,
  animation, or diagram system for a local change.
- Search for every consumer of a changed prop, type, data field, CSS selector,
  route name, or query parameter.

## Frontend invariants

- Keep routes bookmarkable and browser navigation predictable. Preserve the
  current fallback behavior for malformed or stale project selections.
- Keep semantic HTML, keyboard access, visible focus, descriptive alternative
  text, and reduced-motion behavior intact.
- Keep reusable facts in `src/data/` and reusable behavior in components or
  composables. Do not copy profile or project claims into multiple views.
- Treat responsive behavior as part of the feature. Check narrow and wide
  layouts for any visible change.
- Do not add dependencies or change build configuration unless the task
  requires it and the existing stack cannot express the change simply.

## Verification

- Add or update focused tests for changed behavior where the current test
  architecture can exercise it.
- Run `npm test`, `npm run typecheck`, and `npm run build` for source changes.
- Visually inspect every affected route when rendered output changes, including
  keyboard interaction and a mobile-sized viewport when relevant.
- Finish with `git diff --check` and review the complete scoped diff.
