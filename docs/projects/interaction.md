# Interaction and project presentation

Updated 2026-09-26. Implements the [shared visual specification](../design/detail-view-system.md).

## Basic view

Use the same stacked order at desktop and mobile widths:
project selection, title/optional icon and status, short personal explanation
including role, primary visual, public links, then Advanced mode.

The explanation states what the project is, why Paul built it, the problem it
solves and what he contributed. Aim for 60-90 words over two short paragraphs
without padding or forcing repeated headings. Keep core facts and proof links
visible without Advanced mode.

Use one compact dropdown plus a quiet Next project action at the start of white
content. Preserve ordering, stable IDs, direct project queries and invalid-selection
fallback. Do not require repeated next clicks to reach a particular project.

Use one visual and a small row of descriptive links. Preserve media enlargement
and keyboard handling. Put secondary images, detailed stacks and architecture
discussion in Advanced mode or the enlarged media viewer. A diagram can be the
primary visual when it explains the project better than a screenshot.

## Advanced mode and URL state

Advanced mode is off when the Projects URL has no valid advanced parameter.
Use `advanced=true` to enable it, retaining the existing `project` query.
Explicit shared advanced URLs open the technical view. A fresh unqualified
Projects visit opens basic mode; there is no persistent storage preference.

Carry the current advanced parameter when selecting another project or moving
to the next one. Remove it when switching off. Unknown advanced values behave
as off. Keep existing project-selection fallback behavior and unrelated valid
query parameters. Use predictable browser history: project navigation should
permit returning to the previous project; a mode toggle may replace the current
entry to avoid filling history with display changes.

Use a keyboard-operable disclosure button styled as a full-width link row, with
the Advanced mode label, thin top/bottom rules, a chevron and an accessible expanded state. Append optional
blocks below it as ordinary readable sections. Avoid an accordion for every block,
a separate technical page, or a denser visual system when details are expanded.

Projects without advanced blocks show neither an empty region nor a useless
disclosure control. Retain the URL preference when navigating onward. Hidden blocks leave
the focus order. If a collapse removes the focused element, restore focus to the
mode control. Do not unexpectedly move focus or scroll when expanding.

Changing a project must leave the reader at the start of its content without
being stranded deep in the previous story. Implement and verify consistent
scroll/focus behavior for dropdown, next action and browser back/forward.

## Responsive and media behavior

Allow comfortable vertical scrolling rather than squeezing a complete project
into one screen. On mobile, selection stays near the beginning of useful content.
Links wrap, images preserve their proportions and the larger viewer remains
accessible. Preserve visible focus, semantic headings, reduced motion and the
shared mobile menu. Reuse existing gallery and diagram capabilities; access to
their content remains even though basic Product/Architecture tabs are removed.
