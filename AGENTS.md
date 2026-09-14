# PortfolioHub Agent Guidance

## Working principles

- Work in small, focused, testable steps.
- Inspect existing code, content, and tests before changing anything.
- Follow the current architecture and patterns before introducing new abstractions.
- Keep changes scoped to the task and avoid unrelated refactors or content edits.
- Prefer simple, explicit solutions and reuse existing logic.
- Add or update tests for behavioral changes and bug fixes.
- Run relevant checks, then the full applicable test suite before finishing.
- Write comments only for non-obvious intent, constraints, or decisions.
- Review the final diff and remove temporary or unrelated changes.

## Related workspaces

This public PortfolioHub and the private job-materials workspace at
`C:\Users\Paul\OneDrive\Bewerbungsschreiben` are related representations of the
same professional profile.

- PortfolioHub is the source for verified project descriptions, technical
  experience, public links, and the public presentation of Paul's work.
- The job-materials workspace is the source for the master CV, credentials,
  career history, and employer-specific applications.
- Treat consistency as bidirectional. When a task may affect shared facts,
  inspect the relevant content in both workspaces.
- Cross-workspace changes are task-scoped, never automatic. Report a mismatch,
  but modify the other workspace only when the user's request explicitly
  includes synchronization.
- If the workspaces disagree, verify the fact against credentials, repository
  evidence, and document context. If ambiguity remains, show the discrepancy
  and ask before changing either representation.
- Never invent qualifications, experience, dates, links, employers, project
  claims, or other personal facts.

## Public/private boundary

PortfolioHub is public; the job-materials workspace is private.

- Never add or replace personal documents, photos, signatures, contact details,
  or unredacted credentials in this repository without explicit approval for
  the exact artifacts.
- Existing tracked public documents and redacted previews are an approved
  baseline only. Their presence is not blanket approval for new or replacement
  artifacts.
- Do not expose private source paths, application details, personal identifiers,
  or document metadata in public site content, code, tests, commit messages, or
  generated assets.
- When publication is explicitly requested, use only the approved artifact or
  an approved redacted derivative and verify the rendered result before
  finishing.

## PortfolioHub workflow

- Preserve the existing Vue 3, Vue Router, TypeScript, and Vite architecture.
- Keep reusable content in the established data modules and components rather
  than duplicating facts across views.
- Use verified job-material facts to correct public profile content only when
  the task includes that PortfolioHub change.
- Treat project source, tests, and repository history as evidence when job
  materials need accurate technical claims; do not turn aspirations into
  completed experience.
- For code or content changes, run the relevant tests, `npm run typecheck`, and
  `npm run build`. Run the full applicable suite before finishing.
- Visually verify affected pages when changing layout, styling, images,
  downloadable documents, responsive behavior, or other rendered content.
- Review `git status`, the final diff, and `git diff --check`. Do not stage,
  commit, push, publish, or deploy unless the user explicitly requests it.
