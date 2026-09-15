---
name: manage-portfolio-projects
description: Add, update, or thoughtfully remove PortfolioHub project entries and their navigation tests. Use for project-data changes centered on src/data/projects.ts in the PortfolioHub repository.
---

# Manage Portfolio Projects

Maintain an honest, evidence-backed public account of Paul's projects while preserving PortfolioHub's existing Vue and TypeScript design.

## Start with the repository

Read the applicable `AGENTS.md` files, `src/data/projects.ts`, and `tests/projects.test.mjs`. Read [references/project-contract.md](references/project-contract.md) for field meanings, navigation dependencies, public-content boundaries, and proportional validation.

Identify whether the request is an addition, update, or removal. Keep the change centered on `projects.ts`. Search for the affected project ID and changed fields. Inspect `ProjectsView.vue`, `router.ts`, other consumers, or assets only when the ID, order, route/query behavior, rendered structure, or media changes.

Preserve unrelated work in a dirty worktree. Do not inspect other tasks, repositories, private workspaces, or the web by default. Use them only when the user points to them, the current repository contains a relevant contradiction, or a consequential public claim cannot otherwise be phrased honestly.

## Interview for the project story

If the request names a project but does not say what changed, read its current entry and immediately ask one compact, conversational batch of questions. Do this before broad evidence gathering. Ask only for missing or ambiguous information; projects vary, and the user does not need to fill every field as a form.

Cover the parts that matter for this project:

- what the project is, who it serves, and its actual maturity;
- Paul's role and concrete contribution, separated from team work;
- the result or current outcome and the evidence supporting public claims;
- important technical decisions, constraints, architecture, and technologies;
- media, repository, documentation, display order, and featured status when relevant;
- Paul's honest thoughts: what he is proud of, what was difficult, what did not work as hoped, what he would change, what he learned, and what remains planned or experimental.

Always invite at least one honest reflection for a new project or substantial narrative update. Incorporate it in a natural, concise way without manufacturing vulnerability, polishing away uncertainty, or turning aspirations into completed work. If the user already supplied a point clearly, do not ask for it again.

Treat Paul's account as the primary source for his own contribution, current private-project status, and reflections. Use repository evidence for implementation details and public links. Verify high-impact claims such as adoption, publication, scale, security, reliability, or business results; otherwise prefer careful wording over an open-ended search.

After the user answers, proceed without another interview unless a material contradiction, missing editorial choice, destructive action, or publication decision remains. Batch any remaining blockers into one follow-up.

Never expose private paths, application details, personal identifiers, or unapproved private artifacts in this public repository. A file attachment alone is not approval to publish it. If the user has not clearly asked to add the exact asset—or it visibly contains names, contact details, or other identifiers—include one explicit public-use confirmation in the question batch before copying it under `public/`.

## Apply the chosen operation

### Add

- Choose a stable kebab-case ID and add it to `ProjectId` and `projects` in the intended display order.
- Satisfy the current TypeScript contract. The user's answers need not cover every field: derive safe structural details from existing patterns and evidence, then ask only where editorial judgment or facts are missing.
- Mark planned, experimental, in-development, and completed work accurately.
- Add only approved public media or documents. Use descriptive alt text and verify every local path.
- Inspect route/query handling and update the project navigation tests, including the expected order and view/media behavior.

### Update

- Locate the project by ID and preserve correct existing facts that are outside the request.
- If the requested change is unclear, use the compact interview before searching elsewhere. If the user already supplied the facts and reflection, edit without asking them again.
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

Scale validation to the actual change and do not rerun a passing check without a relevant edit. For ordinary `projects.ts` data or copy changes, use this sequence:

```powershell
node --test tests/projects.test.mjs
npm run typecheck
npm run build
npm test
git diff --check
```

Visually inspect a newly added or replaced asset itself. Smoke-check the affected `/projects?project=<id>` page when media, architecture, order, route/query behavior, component structure, or responsive presentation changes. A copy/status/technology-only edit that leaves the rendering contract intact does not require a separate browser-automation workflow.

Use existing browser tooling when a rendered check is material. Do not download tools, invoke a broad frontend-debugging workflow, or build an exhaustive desktop/mobile interaction matrix solely because project data is rendered. If suitable browser tooling is unavailable, do not repeatedly retry optional fallbacks; report the visual-check limitation unless the change itself affects layout or interaction and cannot be responsibly completed without it.

Review `git status` and the complete scoped diff. Do not delete shared QA directories or clean broad paths to remove temporary artifacts. Do not stage, commit, push, publish, or deploy unless explicitly requested.
