# Shared detail-view design

Updated 2026-09-26. Implementation specification for Projects, About and Certificates.

## Design objective

Project pages should feel only slightly more detailed than the landing page.
The basic view is a short personal introduction with evidence. Its visual weight
comes from a name, a brief explanation and one image. Optional depth belongs in
Advanced mode. Familiarity comes from palette, typography, spacing and simple
interaction rather than repeating the landing composition.

## Shared shell

Use a full-width dark ink/teal masthead containing global navigation, the page
title and at most one short introductory line. Follow it with a straight thin
cyan horizontal border and white content. Use the same shell and geometry for
Projects, About and Certificates. The landing retains its distinct composition.

Keep the existing typography, ink/paper/cyan palette and subdued sky language.
Avoid vertical dark sidebars, curved inner-page boundaries, gradients, glow,
nested decorative cards and route introductions that delay reading.

Start the desktop masthead at approximately 220px total, including navigation.
Use a centered content area around 1100px wide, prose around 58-70 characters,
16-18px body text and 1.5-1.7 line height. Start with 48-64px between major desktop
groups and 32-40px on mobile. These are browser-tuned defaults, not pixel gates.
The navigation row retains the shared 100px desktop / 76px mobile contract
unless a coordinated change is required; masthead height includes that row.

Use readable light navigation on the dark masthead, the shared cyan active
underline and visible focus. Keep wordmark, header alignment and navigation
geometry consistent between detail routes. On mobile, reduce extra spacing,
allow titles to wrap and preserve the legible, scrollable, keyboard-operable menu.

## Project composition

Use a stacked reading sequence at all widths:
selection -> identity/status -> short personal explanation -> one primary visual
-> public links -> Advanced mode.

Place one compact project dropdown and a quiet next-project action at the start
of the white content. Avoid a permanent list, a horizontal row of all project
names, or extra counters unless they solve an observed navigation problem.
All projects remain directly selectable.

The heading may include a small repository-hosted icon. Show one concise status
line; express the role naturally in the explanation. Aim for 60-90 words across
two short paragraphs. Treat this as an editing target, never a padding or
truncation rule. A short project may need less text.

Show one real screenshot or useful diagram, preserving its proportions. Links
follow as a small wrapping row with optional small icons. Do not add a stack
badge collection, a metadata wall, architecture tabs, gallery thumbnails or a
repeated About-this-project section to the basic view.

Advanced mode appends optional sections in one column with the same visual
rhythm. See the [interaction contract](../projects/interaction.md).

## Other detail pages

About retains personal introduction, contacts, education, selected work,
learning/plans, personal context and earlier internships. One or two columns
may be used where comfortably readable.

Certificates retains all academic documents, course credentials, proof links,
supporting documents, redacted previews and existing document viewers. Use
clear groups and simple rows; avoid an oversized badge/card wall.

See [page requirements and QA](inner-page-styling.md) for preservation and checks.

## Reference authority

Written requirements and verified content govern implementation. The three
[saved generated images](../projects/visuals/README.md) are visual frameworks:
use their horizontal composition, restraint and grouping to evaluate the result.
Do not trace their pixels or adopt generated copy, logos, application screens,
omissions or inconsistent margins. The Projects image's side-by-side arrangement
is replaced by the stacked sequence specified here. Use actual approved assets.

The current landing is the reference for familiarity and restraint. Compare real
browser captures at matched dimensions; generated images do not prove usability,
responsiveness, factual correctness or completion.
