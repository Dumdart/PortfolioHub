# PortfolioHub Design Policies and QA

This document is the reusable design policy for PortfolioHub. Apply it when
planning, implementing, or reviewing layout, styling, navigation, and responsive
changes. The policies below describe the intended design; they do not certify
that every current view already conforms. Record validation against the actual
revision and rendered pages being reviewed.

## Page families and reference hierarchy

- About, Certificates, and Projects belong to one inner-page family. Use About
  and Certificates together as the reference for their outer composition,
  typography, spacing, and navigation treatment.
- The landing page intentionally has a different composition: a wide dark hero
  containing the profile, main statement, and primary action, alongside a white
  technology showcase. Preserve that composition; do not apply the inner-page
  split or content placement to it.
- Both families share the site typography, ink/paper/cyan palette, signal-field
  visual treatment, and global navigation conventions.
- Use current source and comparable browser captures to resolve details.
  Historical screenshots and QA records are supporting evidence, not authority
  to restore obsolete copy, assets, or controls.

## Shared inner-page composition

- On desktop, use a broad dark introductory panel and a white content area,
  with the established `37% minmax(0, 1fr)` grid as the baseline. Preserve this
  proportional relationship across inner pages instead of using a fixed narrow
  Projects rail.
- Use the established About backdrop geometry and scale for the inner-page
  boundary: a sweeping organic edge with a restrained cyan glow. Reuse
  `SignalBackdrop` and its About variant, or an equivalent shared implementation;
  sharing colors alone does not establish matching composition.
- Put the prominent page introduction in the dark panel. Align its heading and
  the first section in the white area at the established desktop content start,
  approximately 170 CSS pixels from the page top.
- Use About/Certificates typography as the baseline: a strong white display
  heading, muted supporting text, and restrained dark section headings on white.
  The selected project's title must fit this hierarchy rather than overpowering
  the page introduction.
- Preserve generous section spacing, clear content groups, subtle separators,
  and comfortable margins from the organic boundary. Reuse shared design tokens
  and existing responsive spacing conventions.

## Global header and navigation

- Keep header height consistent across routes: `--site-header-height` is 100px
  on desktop and 76px at widths of 860px or less. Keep required content offsets
  synchronized with that shared value.
- Keep wordmark typography, alignment, navigation spacing, and horizontal
  padding consistent at the same viewport and zoom level.
- On desktop inner pages, show the active navigation link with dark text and
  the shared cyan underline. Do not replace it with a Projects-only text-color
  indicator or suppress its underline. Preserve accessible active-route state
  and visible keyboard focus.
- Integrate the header into the page without a Projects-only horizontal divider.
- Preserve legible mobile navigation on the dark surface, including open/close
  state, keyboard operation, and closing the menu after route navigation.

## Projects-specific content within the shared design

- Place a prominent "Projects" heading in the dark introductory panel and
  integrate project selection beneath it. Retain clear grouping and an obvious
  selected-project state.
- Keep project details in the white content area. Reflow metadata, controls,
  tabs, and media to fit the available width; widening the introductory panel
  alone is not a complete implementation.
- Preserve project ordering, query-based selection and direct links, next-project
  navigation, Product/Architecture tabs, galleries and enlarged viewers,
  engineering decisions, outcomes, and existing project links.
- Content-specific controls may differ from About and Certificates where their
  function requires it. Style them with the same typography, palette, spacing,
  focus treatment, and separator conventions.
- On mobile, stack content and keep project selection convenient. Do not force
  desktop proportions onto small screens or let the introductory area make
  selection and project details unnecessarily difficult to reach.

## Implementation and visual acceptance

- Reuse established components and styling. Introduce a small shared abstraction
  only when it prevents actual drift. Remove conflicting obsolete overrides
  instead of accumulating competing declarations.
- Preserve unrelated work and verified content. A visual policy change does not
  authorize changes to professional claims, credentials, or published artifacts.
- Compare About, Certificates, and Projects at identical viewport dimensions,
  browser zoom, scroll position, and menu state. Wait for fonts and route
  transitions to settle. Do not infer CSS dimensions directly from screenshot
  pixels when capture scaling is unknown.
- Check a wide desktop, a typical laptop, widths on both sides of affected
  breakpoints, and a mobile viewport around 390px wide.
- Navigate between all three inner pages in both directions. Verify stable
  header geometry, the active indicator, matching panel proportions, compatible
  content starting positions, and no unexpected movement of shared navigation.
- Check long project names, dense technology lists, media sizing, and menu
  states for overflow, overlap, clipping, and cramped controls. Exercise the
  affected project-selection, tab, gallery, viewer, and keyboard flows.
- Check the landing page separately to confirm its intentional composition is
  preserved. Check browser console output and framework error overlays.
- Run the applicable repository checks required by `AGENTS.md`. For rendered
  changes, a passing build or a source-pattern test is not visual proof.
- Report the inspected revision or working-tree state, routes, viewport sizes,
  interactions, results, and any unverified areas. Store temporary evidence
  outside the repository unless committed artifacts were explicitly requested.

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
