# Inner-page requirements and visual acceptance

Updated 2026-09-26. Apply with the
[shared detail-view design](detail-view-system.md) and [design policy](../../design-qa.md).

## Shared requirements

About, Certificates and Projects use one horizontal dark masthead with a straight
thin cyan border and white content below. Preserve the landing palette, readable
typography and calm spacing. The landing itself keeps its existing composition.
Use flat surfaces; remove decorative glow, redundant wrappers and unnecessary
gradients from affected page styling.

Start with a roughly 220px total desktop masthead and 1100px centered content.
Use approximately 16-18px body text, 1.5-1.7 line height, 58-70-character prose,
48-64px between major desktop groups and 32-40px on mobile. These are tuning
defaults: adapt to real content and browser evidence without shrinking text to fit.

Maintain global header/menu geometry, active underline and visible focus.
Navigation over the dark masthead uses readable light text. Reuse the shared
sky implementation with reduced-motion and hidden-tab behavior; inspect current
controls rather than restoring old ones from screenshots.

## Page-specific preservation

| Page | Required organization | Preserve |
| --- | --- | --- |
| Projects | Compact selection; stacked identity/story/visual/links; optional depth through Advanced mode | IDs, ordering, direct links/fallback, next navigation, factual content, diagram/gallery/viewer capability and public destinations |
| About | Clear personal introduction, education, selected work, plans and personal context | Contacts, verified dates, earlier internships, distinction between plans and completed qualifications |
| Certificates | Academic, course and supporting-document groups with clear actions | Complete inventory, approved redacted previews, issuer assets, proof links, downloads and document routes |

The [Projects interaction contract](../projects/interaction.md) places technical
details and secondary media in Advanced mode. Preserve access to existing content
without retaining every old control or forcing all facts into basic mode.
Do not remove facts merely to match a generated image.

## Visual acceptance process

1. Capture the baseline landing and all three detail pages at matching viewport,
   zoom and menu state. Note source revision and existing changes.
2. Implement with real text and approved media. Check TopicGate, NOVA and a
   diagram-led project before migrating the full inventory.
3. Compare the rendered result to the written criteria and
   [three image frameworks](../projects/visuals/README.md). Judge shared horizontal
   composition, restrained decoration, grouping and readable content. Do not
   score pixel equality against generated images.
4. Normalize header geometry across all three pages, then test full reading and
   navigation flows. Record before/after evidence and deviations from tuning defaults.

Check 1920x1080, 1440x900, 1280x800, 861x700 and 860x700 when those remain relevant
breakpoints, 390x844, 320x740, 844x390, a short 390x310 menu viewport and actual
200% browser zoom. Add checks only for concrete remaining risks. No text clipping,
horizontal page overflow, overlapping controls or unreadably shrunken media.

Check keyboard selection, focus/state of Advanced mode, galleries and enlarged
viewers, mobile menu open/close/Escape and route changes, reduced motion and real
hidden-tab return. Compare transitions between every detail page in both directions.
Observe ambient sky long enough to verify stationary behavior; do not introduce
new animated decoration. Check console errors and the landing regression separately.

## Engineering acceptance

Run meaningful focused tests, full `npm test`, `npm run typecheck`, `npm run build`
and `git diff --check`. Review the scoped diff and preserve unrelated work.
The [migration acceptance matrix](../projects/migration-and-qa.md) defines the
remaining content, data, link and behavior gates.

Record which requirements passed, failed or could not be verified, with evidence.
Do not report completion while a required gate remains unverified. Store temporary
browser evidence outside the source tree unless committed evidence is requested.
