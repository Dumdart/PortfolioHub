# Public Profile Data Guidance

This file applies to the public, fact-bearing modules under `src/data/`. Follow
both parent `AGENTS.md` files, with these stricter evidence rules taking
precedence for profile content.

## Sources and claims

- Treat these modules as source-of-truth data for their frontend consumers.
  Update shared facts here instead of patching rendered copies in views.
- Verify qualifications, dates, roles, project maturity, outcomes, links, and
  technology claims against repository evidence or the private job-materials
  workspace when the task involves shared facts.
- Inspecting the private workspace does not authorize editing it or publishing
  from it. Report unresolved conflicts and ask before changing the public fact.
- Distinguish personal contribution from team output and completed behavior
  from planned, experimental, or in-development work. Avoid unsupported scale,
  security, reliability, or impact claims.
- Preserve stable IDs and ordering unless the request intentionally changes the
  navigation contract. Search all consumers and tests before renaming or
  removing an ID or field.

## Project entries

- For changes centered on `projects.ts`, use the repository skill at
  `.codex/skills/manage-portfolio-projects/SKILL.md` and read its referenced
  contract before editing.
- Keep local media and document paths rooted at `/assets/` or `/documents/` and
  ensure the matching approved file exists under `public/`.
- When architecture is planned rather than implemented, keep that status
  explicit in both the data and visible description.

## Verification

- Run `npm test`, `npm run typecheck`, and `npm run build`.
- Check affected links and local files, then visually inspect the consuming
  route for copy, ordering, media, and empty-state regressions.
