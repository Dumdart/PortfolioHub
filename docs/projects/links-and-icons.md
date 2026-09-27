# Public links and GitHub repository icons

Updated 2026-09-26. Link destinations and icon assets require verification during implementation.

## Link restoration

History inspected in this conversation showed that commit `e8c7cf9` removed
repository fields that were present in `fe4ad24`. Candidate destinations:

- TopicGate: https://github.com/Dumdart/TopicGate
- SmartHomeBridge: https://github.com/Dumdart/SmartHomeBridge
- Serverless Portfolio Hub: https://github.com/Dumdart/CCDEProject-SSPH

These are restoration candidates, not current availability checks. Before adding
them, verify that each destination is public and represents the described work.
Record any rename, archive or mismatch. Do not substitute similarly named projects.

Represent links as a collection with explicit kind, label and destination so
repository, package, live site and documentation links can coexist. Retain the
approved NOVA diploma-thesis document. Public links stay visible in the basic view.
Only display links that exist; a project does not need every link category.

Add meaningful regression coverage that known public destinations survive a data
migration, and check local documents against actual approved files. A syntactically
valid URL does not prove that a destination is available or appropriate.

## Repository-hosted icon intent

Paul means an icon asset he specifies in his GitHub repository. Store an explicit public image URL per project, with a source repository reference
if helpful. Do not assume a generic repository-icon API field, treat an owner
avatar as the project icon, or scrape an arbitrary README image automatically.

During implementation, identify each actual asset and choose a raw image URL,
release asset URL or another explicit public image destination. Decide whether
to pin a revision for stability or follow a branch for automatic asset updates.
No GitHub credentials should be needed to display a public icon.

Reserve a modest icon size and render it as an image. The project title supplies
identity; decorative icons can use empty alt text. An absent or failed icon must
leave a complete header without a broken-image symbol or layout jump. Avoid
inventing replacement project logos from the generated concepts.
