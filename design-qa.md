# PortfolioHub Design Policies and QA

Updated 2026-09-26. This document defines reusable design requirements.
Validate their implementation against current source and rendered pages.

## Authority and references

Read the [documentation index](docs/README.md), [shared visual specification](docs/design/detail-view-system.md),
[page requirements and QA](docs/design/inner-page-styling.md), and
[Projects domain contracts](docs/projects/README.md). Written requirements and
verified facts govern implementation. Generated images are visual frameworks;
current browser evidence establishes implementation quality.

## Page families

The landing retains its distinct composition and interactions. Projects, About
and Certificates use a shared dark horizontal masthead with global navigation,
page title and at most one short introductory line. A straight thin cyan border
separates it from white content. No vertical inner-page split or organic boundary.

Both families share existing fonts, ink/paper/cyan colors, restrained decoration,
negative space, global navigation conventions and subdued stationary sky treatment.
Do not copy landing intro choreography, portrait or technology stickers to detail pages.

## Geometry and navigation

Start with about 220px total desktop masthead height, including the navigation
row, and about 1100px centered content width. Tune against real content and browser
evidence. Use comfortable prose widths, 16-18px body type and generous group spacing.
Allow scrolling; never shrink content merely to fit a screenshot.

Keep the shared navigation-height contract (100px desktop, 76px at mobile widths)
and content offsets synchronized. Use readable light navigation on dark headers,
the cyan active underline, accessible current-route state and visible focus.
Keep wordmark, alignment and menu geometry consistent between detail pages.
Mobile menus retain keyboard operation, opaque readable rows, short-screen
scrolling, Escape/focus restoration and close-on-navigation behavior.

## Project presentation

Default project view is only slightly more detailed than the landing:
compact dropdown and next action, identity/status, brief personal story including
role, one image or diagram, public links, then Advanced mode. Use a stacked reading
sequence. Keep detailed metadata, secondary media and architecture discussion in
Advanced mode, with one-column sections and no accordion for every block.

Preserve IDs, order, direct links/fallback, diagrams, galleries, enlarged viewers,
facts and public destinations. Use per-project JSON with explicit supported blocks,
validation and a stable shared data boundary. Follow the linked interaction and
content contracts for URL behavior, focus, word-count guidance and optional assets.

## Verification and preservation

Preserve unrelated work and approved public content. Do not invent personal
motivations, qualifications, outcomes or links. Do not publish new private artifacts.

Capture About, Certificates and Projects at identical viewport, zoom and menu
states. Check shared header geometry, straight boundary, reading hierarchy and
route transitions. Verify long titles, optional blocks, dense advanced content,
media, focus, direct links and mobile selection. Test the landing separately.

Use the [viewport and interaction checklist](docs/design/inner-page-styling.md)
and [goal acceptance matrix](docs/projects/migration-and-qa.md). Run required
tests, typecheck, build and diff checks. Record the inspected working tree, routes,
viewports, interactions and unresolved limits. A passing build is not visual proof.
Temporary browser evidence belongs outside the repository unless otherwise requested.

## Historical landing-hero QA record

The record below concerns an earlier landing-hero change only. Its pass result
does not certify current pages or compliance with the inner-page policies above.
Its local evidence paths and control labels may no longer be current.

### Comparison target

- Source visual truth: `C:\Users\Paul\AppData\Local\Temp\codex-clipboard-38ed1e9d-ce40-4c65-a30c-f9deebdc5a7f.png`
- Implementation capture: `E:\SourceGIT\PortfolioHub\output\design-qa\landing-home-desktop.png`
- Side-by-side evidence: `E:\SourceGIT\PortfolioHub\output\design-qa\landing-home-comparison.png`
- Source pixels: 1488 × 1058.
- Implementation capture: browser-rendered local home page, 1422 × 800 CSS viewport at device scale factor 0.9. The comparison image places each capture in equal 1488 × 1058 frames for composition review; this is a frame normalization only, not a pixel-perfect density comparison.
- State: initial home route, desktop, no menus open.

### Findings

No actionable P0, P1, or P2 differences in the requested hero area.

- The portrait, name, cyan profile rule, headline, and description now form the selected two-column profile-sheet composition.
- The project-map CTA, social links, and qualification row retain their original hierarchy and working behavior.
- The existing global header remains visible by design; it is not part of the requested left-hero restructure.
- Desktop browser capture confirmed the portrait asset loaded at 1728 × 2572 natural pixels and found no console errors.

### Required fidelity surfaces

- Fonts and typography: Manrope and JetBrains Mono retain the established site hierarchy; the display headline and profile name use the existing heavyweight display scale.
- Spacing and layout rhythm: the profile rail, message column, and utility stack are separated into deliberate vertical zones without overlap.
- Colors and visual tokens: the implementation uses the existing dark ink, paper, and cyan tokens and preserves the signal-field treatment.
- Image quality and asset fidelity: the supplied portrait asset is used directly with the existing circular crop and cyan ring; no replacement artwork or placeholder is used.
- Copy and content: hero, CTA, contact labels, and qualification copy match the target content.

### Interaction checks

- `Open project map` was visible and navigated to `/projects`.
- Browser console: no errors.

### Follow-up polish

- None required for the requested desktop composition.

final result: passed
