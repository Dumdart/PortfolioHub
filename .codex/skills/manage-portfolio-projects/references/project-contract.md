# PortfolioHub project contract

`src/data/projects.ts` is authoritative. Re-read it before every change because its types and consumers can evolve.

## Current model

Each `Project` currently has these required fields:

- `id`: a stable kebab-case member of the `ProjectId` string union.
- `name`: public display name.
- `purpose`: fuller explanation of the problem, audience, and intent.
- `summary`: short rail or overview description.
- `roleSummary`: compact description of Paul's role.
- `result`: short outcome label.
- `contribution`: concrete account of Paul's work.
- `decisions`: zero or more `{ title, reason }` explanations of meaningful choices.
- `lesson`: honest outcome, learning, limitation, or present state.
- `technologies`: technologies materially used or intentionally designed into clearly marked planned work.
- `leftNodes` and `rightNodes`: short labels used by project visuals.

Optional fields are:

- `status`: public maturity or availability statement.
- `architecture`: Mermaid `source`, accessible `description`, and optional `planned` flag.
- `media`: public asset `src`, `alt`, `title`, optional `fit`, optional `surface`, and optional `kind`.
- `repository`: public repository URL.
- `documentation`: public `href` and link `label`.

Do not require the user to dictate every field. Existing evidence and established project patterns may supply straightforward structure. Ask whenever facts, tone, maturity, personal contribution, or honest interpretation are unclear. If a project genuinely does not fit the current required model, discuss whether the interface and renderers should change instead of inventing filler.

## Content standard

Project copy should answer four things without hype:

1. What real problem or learning goal motivated it?
2. What did Paul personally decide, build, or operate?
3. What exists now, and what is merely planned or experimental?
4. What did the work teach him, including tradeoffs or shortcomings worth stating?

Treat status, scale, usage, publication, security, reliability, and business impact as claims that need evidence. Preserve a candid observation when it helps a reader understand engineering judgment; do not turn the portfolio into marketing copy detached from Paul's actual experience.

## Navigation and test dependencies

The current site uses one named route, `/projects`, with a `project` query value. Individual project IDs are resolved by `resolveProjectId`; `nextProjectId` uses array order.

Inspect these dependencies for every operation:

- `src/router.ts`: change only if the route contract itself changes.
- `src/views/ProjectsView.vue`: array position currently controls Featured versus Other systems grouping.
- `tests/projects.test.mjs`: expected order, fallback resolution, wraparound navigation, local asset/document existence, visual-tab behavior, and project-specific assertions.
- Other consumers found by searching for the project ID, `projects`, `ProjectId`, `resolveProjectId`, and `nextProjectId`.

When adding local media or documentation, place only explicitly approved public artifacts under `public/` and verify their paths. A route or test change does not imply permission to publish private source material.
