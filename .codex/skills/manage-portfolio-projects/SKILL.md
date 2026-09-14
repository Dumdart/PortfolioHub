---
name: manage-portfolio-projects
description: Add, update, or thoughtfully remove PortfolioHub project entries and their navigation tests. Use for project-data changes centered on src/data/projects.ts in the PortfolioHub repository.
---

# Manage Portfolio Projects

Maintain an honest, evidence-backed public account of Paul's projects while preserving PortfolioHub's existing Vue and TypeScript design.

## Start with the repository

Read the repository `AGENTS.md`, then inspect the current versions of:

- `src/data/projects.ts`
- `src/views/ProjectsView.vue`
- `src/router.ts`
- `tests/projects.test.mjs`

Inspect affected consumers, assets, and tests rather than assuming this skill's snapshot is current. Read [references/project-contract.md](references/project-contract.md) for the field meanings, navigation dependencies, and public-content boundaries.

Identify whether the request is an addition, update, or removal. Keep the change centered on `projects.ts`; modify routes, views, assets, and tests only where the project change requires it.

## Interview for the project story

Before adding or substantially rewriting a project, ask a small, conversational batch of targeted questions. Ask only for missing or ambiguous information; projects vary, and the user does not need to fill every field as a form.

Cover the parts that matter for this project:

- what the project is, who it serves, and its actual maturity;
- Paul's role and concrete contribution, separated from team work;
- the result or current outcome and the evidence supporting public claims;
- important technical decisions, constraints, architecture, and technologies;
- media, repository, documentation, display order, and featured status when relevant;
- Paul's honest thoughts: what he is proud of, what was difficult, what did not work as hoped, what he would change, what he learned, and what remains planned or experimental.

Always invite at least one honest reflection for a new project or substantial narrative update. Incorporate it in a natural, concise way without manufacturing vulnerability, polishing away uncertainty, or turning aspirations into completed work. If the user already supplied a point clearly, do not ask for it again.

Use repository evidence and, when shared career facts are involved, relevant private job-material evidence to verify claims. Never expose private paths, application details, personal identifiers, or unapproved private artifacts in this public repository. Report unresolved discrepancies and ask before changing the public claim.

## Apply the chosen operation

### Add

- Choose a stable kebab-case ID and add it to `ProjectId` and `projects` in the intended display order.
- Satisfy the current TypeScript contract. The user's answers need not cover every field: derive safe structural details from existing patterns and evidence, then ask only where editorial judgment or facts are missing.
- Mark planned, experimental, in-development, and completed work accurately.
- Add only approved public media or documents. Use descriptive alt text and verify every local path.
- Inspect route/query handling and update the project navigation tests, including the expected order and view/media behavior.

### Update

- Locate the project by ID and preserve correct existing facts that are outside the request.
- Ask what prompted the update and which parts of Paul's current thinking should be reflected.
- Reconcile changes across repeated references, project-specific tests, routes/query behavior, and assets where applicable.
- Keep claims proportional to evidence and preserve distinctions between personal contribution, team output, current behavior, and plans.

### Remove

Do not remove a project on the first request. Inspect the entry and its consumers, then pause and ask the user to reconsider the decision. Explain concrete, project-specific reasons it may still be valuable to the portfolio—for example technical range, progression, operational ownership, evidence of learning, or contrast with newer work. Also acknowledge genuine costs such as weak evidence, duplication, outdated framing, or distracting presentation.

Ask for explicit reaffirmation after that reflection. Only proceed if the user confirms removal again. This confirmation authorizes removing the project entry and required code/test references, not deleting media, documents, repositories, or private material unless those exact deletions are separately requested.

After confirmation:

- remove the ID and project object;
- remove or revise route/query, selected-project, ordering, fallback, and project-specific test references;
- ensure the flagship fallback and next-project wraparound still work;
- leave now-unused assets in place unless their deletion was explicitly requested.

## Verify

Run the focused project tests while iterating, then the repository's applicable checks:

```powershell
npm test
npm run typecheck
npm run build
git diff --check
```

Visually verify `/projects` when project ordering, navigation, media, architecture, or rendered copy changes. Review `git status` and the final diff. Do not stage, commit, push, publish, or deploy unless explicitly requested.
