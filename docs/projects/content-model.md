# Content and data model

Updated 2026-09-26. Scope: Projects content and its representation.

## Core story

Every project should explain what it is, why Paul made it, the problem it solves,
what he contributed, and its current state. Keep this visible in the basic view.
Aim for 60-90 words over two short natural paragraphs, without padding or forced
truncation. Do not require repeated headings for every fact. A team project must expose Paul's role before Advanced mode.

Use real motivation supplied by Paul. Existing technical descriptions do not
prove a personal origin story. Do not adopt claims about competing tools, user
numbers, reliability or ongoing maintenance from generated images.

Required identity fields: stable ID, title, concise summary, status, core story
and role. An optional icon, primary media and public link collection support the
story. A missing image must not produce an empty frame; choose a useful existing
diagram or render a deliberate text-led presentation.

## Storage

Use one JSON document per project and a small ordered index. Keep a typed adapter
at the existing data-module boundary so consumers such as About and routing can
continue to use a stable contract during migration. Exercise the contract with two contrasting projects before migrating the full inventory.

Separate core data from `advancedBlocks`. Each advanced block has a stable ID,
an explicit type and the fields appropriate to that type. JSON stores content
and ordering; Vue components own spacing, semantics and behavior. Do not infer
component types from prose or accept arbitrary component names, executable
expressions, HTML or CSS in the content.

Initial block vocabulary (implement only types required by actual content):

| Type | Contents | Use |
| --- | --- | --- |
| Text section | Heading and paragraphs | Context, detailed role, outcome or reflection |
| Decision | Situation, choice, reason and optional tradeoff | Explain an actual engineering decision |
| Media | Image references, captions and alternative text | Additional product evidence |
| Architecture | Existing diagram representation, explanation and maturity | Explain implemented or explicitly planned structure |
| List | Heading and short items | A bounded set of useful facts or lessons |

Allow a section to group leaf blocks if a real project needs it. Avoid recursive
sections and nested disclosure controls in the first version. A project may use
different block counts and ordering; empty blocks and filler are omitted.
Core motivation and role must not be duplicated merely to fill advanced blocks.

Existing architecture and gallery capabilities should remain reusable. Detailed
technology lists belong in Advanced mode. A technology can appear naturally in
core prose when it is essential to explaining the project, without a separate badge row.

## Validation and source integrity

Validate JSON before it reaches the renderer: unique project/block IDs, supported
types, required fields, valid references and consistent optional-field handling.
Provide errors that identify the project and field. Use the existing TypeScript
and test environment; select an additional dependency only if justified.

Keep link objects structured by kind, label and URL. Keep media structured by
source, alt text, caption and optional fitting behavior. Paths to existing approved
media/documents remain rooted at `/assets/` and `/documents/`.

Inventory the old fields before migration, including purpose, contribution,
decisions, lessons, status, architecture, media and links. Every meaningful fact
needs a retained destination or an explicitly reviewed reason for removal.
Maintain a single source for facts reused by About and Projects.
