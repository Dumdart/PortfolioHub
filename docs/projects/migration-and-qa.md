# Migration and acceptance

Updated 2026-09-26. Execution sequence and measurable goal gates.

## Work packages

1. Inventory the working tree, all seven projects, data consumers, tests, facts,
   media and public destinations. Record existing unrelated modifications.
2. Implement the shared masthead using the [visual specification](../design/detail-view-system.md).
   Use the current landing and saved image frameworks to assess restraint and familiarity.
3. Compose TopicGate and NOVA using real evidence, then exercise a diagram-led
   project. Obtain missing personal motivation from Paul while continuing work
   that does not depend on that answer.
4. Introduce per-project JSON, validation and the typed adapter. Preserve IDs,
   order, queries and shared consumers. Reconcile each old field to its destination.
5. Implement selection, stacked core presentation, links, media enlargement,
   Advanced mode and only the optional block renderers required by actual content.
6. Migrate all remaining projects, restore verified links, and resolve explicit
   public repository icons. Use graceful omission when an optional icon is absent.
7. Apply the shared shell to About and Certificates. Preserve every approved
   fact, document, preview, course credential and public destination.
8. Verify all gates below, correct defects, and record evidence for the actual
   final revision. Preserve the landing; exclude Paul's Timeline.

## Goal acceptance matrix

| Gate | Required result | Evidence |
| --- | --- | --- |
| Familiarity and restraint | Basic project view has selection, identity/status, short story, one visual, public links and one Advanced control; no metadata wall, repeated summary, thumbnail strip or basic technical tabs | Matched landing/project browser captures and a visible-group inventory |
| Shared shell | All three detail pages use consistent dark horizontal masthead, light navigation, straight cyan border and white content | Comparable captures at the same viewport/zoom and navigation in both directions |
| Personal content | Purpose, real motivation, contribution and status are understandable without Advanced mode; no fabricated copy or claims | Per-project content review against evidence/user input |
| Data migration | Stable IDs/order, valid supported blocks, shared consumers and accounted-for old facts | Migration inventory plus meaningful validation/consumer tests |
| Depth | Optional blocks vary by project and appear in a readable single column only when enabled | Basic/advanced captures and no-block-project check |
| URL and focus | `advanced=true`, default-off behavior, selection persistence, malformed values, browser history and focus follow the contract | Behavioral tests and keyboard/browser checks |
| Public evidence | Correct restored public URLs, documents and authentic media; icons load or fail gracefully | Destination/asset inventory and link/media checks |
| Responsive access | Comfortable reading and usable selection/menu/media at required sizes and zoom, without clipping or page overflow | Viewport matrix from the page QA document |
| Preservation | About/Certificates inventories intact; landing and shared motion behavior retained | Content inventory and regression checks |
| Engineering | Relevant tests, full suite, typecheck, build, clean scoped diff and no introduced console errors | Recorded command outcomes and browser observations |

Use approximately 60-90 words in the basic explanation and a 220px desktop
masthead as tuning guides. Do not make arbitrary word counts or screenshot pixel
matching completion gates. Measure whether hierarchy and access satisfy the
written contract with real content.

## Verification and completion

Follow [page requirements and QA](../design/inner-page-styling.md). Run focused
tests, full `npm test`, `npm run typecheck`, `npm run build`, browser checks
and `git diff --check`. Review the final scoped diff. Never discard existing work.

Record pass/fail/unverified per gate and link its evidence. If browser access is
blocked, report that limitation and complete independent work; generated images
or source inspection cannot satisfy rendered verification. Do not mark the goal
complete with a required gate unverified. Resolve routine tuning autonomously;
ask only for missing facts or decisions that materially block the task.

Report what changed, checks, residual limitations and the location of evidence.
No commit, push, deployment, private-document publication or Timeline implementation
is included unless separately authorized.
