# Inner-page styling and density brief

Status: requirements for a future implementation pass, 2026-09-24.
Entry point: [documentation index](../README.md). Follow the
[shared policy](../../design-qa.md) and [AGENTS.md](../../AGENTS.md).

## Objective and scope

Transfer the completed landing page's visual language and ambient animation to
About, Certificates and Projects. **The primary success criterion is a visibly
less cluttered, less spatially dense reading experience on all three pages.**
Merely changing the backdrop, colors or font sizes is not completion.

Targets are `src/views/AboutView.vue`, `src/views/CertificateView.vue` and
`src/views/ProjectsView.vue`, plus their necessary shared components and styles.
Preserve the Vue 3, Vue Router, TypeScript and Vite architecture. The landing page
is the reference and a regression surface; do not redesign it again. Credential
document routes, approved media, and unrelated pages are not redesign targets.

## What transfers from the landing page

- Flat dark ink/teal and white surfaces, restrained cyan accents, existing fonts,
  legible scale, generous negative space, and a clear hierarchy of actions.
- A coherent curved boundary, with a thin steady cyan edge. Adapt panel widths
  to the content; neither the existing 37% inner split nor the landing split is
  an immutable requirement. Use one consistent inner-page layout at each
  breakpoint, with comfortable clearance from the curve.
- The [shared stationary night sky](../animation/background-animation.md):
  stars, subdued clouds and a partial moon. Details remain behind and clear of
  reading surfaces, navigation and controls. More scenery is not the objective
  of this pass; reduce or reposition it where content needs quiet space.
- Shared header geometry, active-link treatment, focus indicators and the
  corrected mobile menu. Reuse existing components instead of creating a second
  visual or animation system.

Do not copy the dinosaur, runner ground, P-contact ripple, landing portrait,
technology sticker arrangement or session intro onto inner pages. Inner pages
open immediately into usable content with ambient motion only. Preserve landing
start/skip/replay, session, reduced-motion and failure behavior.

## Reduce clutter and spatial density first

1. Inventory each page's information groups and actions before editing. Establish
   one page heading, one short introduction, clearly subordinate section headings
   and a small number of obvious primary actions.
2. Increase meaningful space between sections and between controls and content.
   Keep related labels and values together. Remove redundant visual wrappers,
   nested cards, competing separators and repeated decorative emphasis.
3. Reflow dense rows and grids instead of shrinking type or media. Default to
   one readable column on mobile; use multiple columns only when each remains
   comfortable. Allow vertical scrolling rather than squeezing the page into
   one screen. Avoid oversized empty hero panels that push useful content away.
4. Use progressive disclosure only for secondary detail where it improves
   scanning. Keep clear labels and keyboard access; retain all information and
   existing deep links. Do not hide primary content or put every section in an
   accordion to make a screenshot look empty.
5. Preserve factual meaning and link destinations. Remove duplicate presentation
   only after verifying it is genuinely duplicated. Do not invent or silently
   delete qualifications, dates, project claims, credentials or career details.

### Ordinary tuning defaults

Use these as starting points, not mandatory pixel targets: 48-64px between major
desktop sections, 32-40px on mobile, 16-24px within related groups, readable body
text around 16-18px with 1.5-1.7 line height, and prose widths around 58-72
characters where space permits. Metadata may be smaller but must remain legible.
Controls should have at least a 44px usable target. Resolve routine tuning through
browser checks without repeatedly asking for approval.

### Page-specific requirements

| Page | Decluttering outcome | Preserve |
| --- | --- | --- |
| About | Distinct, breathable groups for background, selected work, future plans and personal context; no compressed fact wall or unnecessary card per fact. | Verified basic information, qualifications, dates, distinction between plans and completed work, selected-work links and social destinations. |
| Certificates | Clear grouping of academic credentials, course badges and supporting documents; readable previews and download/proof actions without a dense badge grid. | Credential inventory, redacted approved previews, document routes, downloads, proof URLs, dates and identifiers already approved for public display. |
| Projects | Convenient selection and a calm detail column; separate summary, metadata, media and technical detail; reflow long titles and dense stacks. | Project ordering, query-based selection, direct links and fallback, next-project navigation, Product/Architecture tabs, galleries, viewers, keyboard behavior, decisions, outcomes and repository/documentation links. |

## Remove unnecessary gradients and glow

- Audit active CSS backgrounds, pseudo-elements, SVG fills/filters and canvas
  layers on all target routes. Search results are candidates, not proof that a
  rule is active or safe to delete.
- Remove decorative linear/radial gradients, broad cyan washes, gradient rails,
  diffuse boundary glows, repeated halo shadows and pulsing selection effects.
  Default to flat surfaces, a thin edge, spacing and a simple active indicator.
- Do not replace removed gradients with equally noisy blur or layered shadows.
  Retain focus visibility, necessary dialog separation and media legibility.
  Any retained effect must have a specific functional reason documented in the
  handoff; ornamental depth alone is not a reason.
- Scope removals to target routes and shared rules whose consumers are checked.
  Preserve gradients contained in approved screenshots, logos, documents or
  meaningful diagrams. Do not rewrite unrelated legacy components merely to make
  a repository-wide search return zero results.

## Motion and accessibility

Use existing sky components and Pause/Resume controls. Respect reduced motion,
freeze hidden-tab animation, and resume without catch-up. Stars/clouds stay
spatially fixed; only gentle opacity changes continue. The moon and divider
remain steady. Avoid route-entry effects that delay reading or interaction.

Preserve semantic headings, contrast, keyboard focus and all route states.
The mobile menu must have opaque legible rows, no inherited desktop gaps, no
clipped last link, short-screen scrolling, Escape-to-close with focus restoration,
and close-on-navigation behavior. The sky must not capture input.

## Completion audit and evidence

Before editing, capture all three pages and the landing reference at identical
viewport, zoom and scroll settings. Record concrete density problems and active
decorative effects. After editing, repeat those captures and compare:

| Requirement | Required evidence |
| --- | --- |
| Less clutter on every page | Before/after full-page and first-viewport captures, plus a per-page explanation of changed grouping, measured spacing/readable widths, reduced competing treatments and preserved access to information. Larger fonts or whitespace alone are insufficient. |
| Shared landing language | Comparable captures showing palette, typography, boundary and header consistency; preserve useful page-specific organization. |
| Gradient/effect cleanup | Inventory of active removed effects and selectors/components; explain any functional exceptions. Verify computed styles and rendered output, not just text search. |
| Preserved content and flows | Compare inventories and destinations before/after; exercise About links, credential previews/downloads and all listed Projects controls. Check malformed/direct project URLs. |
| Responsive behavior | 1920x1080, 1440x900, 1280x800, 861x700, 860x700, 390x844, 320x740, 844x390, a short 390x310 menu viewport, and actual 200% browser zoom. No overflow, overlap, tiny text or clipped controls. |
| Shared navigation | Navigate between all three pages in both directions; header remains 100px desktop/76px mobile, active state and keyboard/mobile interactions work. |
| Motion | Observe each resting sky for at least 30 seconds; test Pause/Resume, reduced motion and real hidden-tab return. No drifting details or pulsing divider. |
| Landing regression | Run the intro through contact/ripple/arrival; verify ground clips sky until terrain disappears, moon clears content, skip/replay/session and small-screen bypass still work. |
| Engineering checks | Meaningful regression tests, full `npm test`, `npm run typecheck`, `npm run build`, clean browser console/error overlays, final diff review and `git diff --check`. |

Report the inspected revision/working tree, commands, viewports, screenshots,
interaction results and limitations. Store temporary QA evidence outside the
repository. Do not mark the goal complete while any target page or required
behavior remains unverified. Do not stage, commit, push, publish or deploy.

Use the [goal metaprompt](implementation-prompt.md) to start the implementation
when requested; this brief itself does not start that work.
