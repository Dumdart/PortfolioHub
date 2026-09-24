# Goal metaprompt: calmer inner pages

Draft for a future implementation run. Saving this document does not execute it.

---

Use goal mode to transfer the completed landing page's styling and ambient
animation language to About, Certificates and Projects. The most important
outcome is **substantially less clutter and lower spatial density on each page**,
with unnecessary gradients and decorative glow removed. A background-only
change, smaller text, or hiding primary content does not satisfy this goal.

Work in `E:\SourceGIT\PortfolioHub`. Read and follow, in order:

1. [AGENTS.md](../../AGENTS.md) and applicable scoped guidance.
2. [Documentation index and authority](../README.md).
3. [Shared design policy and QA](../../design-qa.md).
4. [Inner-page styling and density brief](inner-page-styling.md), including every
   page-specific preservation requirement and completion-audit row.
5. [Shared sky specification](../animation/background-animation.md).
6. [Landing regression handoff](../animation/README.md),
   [intro specification](../animation/intro-animation.md), and
   [image guide](../animation/images/README.md).

Inspect the actual landing implementation and current worktree first. Treat the
written requirements as authoritative over historical screenshots and generated
artwork. Preserve existing uncommitted work. Capture a comparable before-state
for every target page and record its density problems and active effects.

Implement the complete brief in `src/views/AboutView.vue`,
`src/views/CertificateView.vue`, `src/views/ProjectsView.vue` and necessary shared
styles/components. Reuse the landing palette, readable typography, calm curved
boundary and shared stationary sky. Give content breathing room, simplify visual
grouping, reflow dense layouts, and make primary actions obvious. Remove active
decorative gradients, color washes, boundary glows and redundant halo effects;
use flat surfaces and restrained functional indicators. Document any retained
functional effect. Preserve all approved content, assets, links and interactions.

Do not repeat the landing dinosaur intro, profile hero or sticker composition on
inner pages. Do not redesign unrelated routes, add claims, change architecture,
replace approved artifacts, introduce dependencies without necessity, or make
private-workspace changes. Preserve landing intro/session/skip/replay/failure
behavior, ground/sky separation, moon clearance, reduced motion and background
pause/hidden-tab behavior. Keep the corrected mobile menu usable on short screens.

Work in focused, testable steps. Use the brief's ordinary tuning defaults and
browser evidence for routine decisions. Run meaningful regression tests, the
full `npm test`, `npm run typecheck`, and `npm run build`. Verify every viewport,
route, content-preservation check, interaction and motion state in the linked
completion audit, including actual 200% zoom and real hidden-tab behavior.
Review `git status`, the final diff and `git diff --check`.

Continue until all three pages demonstrably meet the brief. Audit every
requirement against the current rendered implementation; passing tests or a
plausible screenshot alone are insufficient. Mark the goal complete only when
the full scope is implemented and verified. Report per-page before/after evidence,
removed effects, preserved functionality, checks and honest limitations. Keep
temporary QA artifacts outside the repository. Do not commit, push or deploy.
