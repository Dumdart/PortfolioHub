# Public Asset Guidance

This file applies to every file under `public/`. Everything here is copied into
the public build and must be treated as publishable.

## Publication boundary

- Add or replace personal documents, portraits, signatures, contact details,
  credentials, or derived previews only when the user approves the exact
  artifact for public use.
- Existing tracked files and redacted previews are an approved baseline, not
  permission to publish a new version. Never copy directly from the private
  job-materials workspace merely because a source file is available there.
- Check images and documents for visible personal information and embedded
  metadata. Keep private paths, employer-specific material, and unredacted
  identifiers out of filenames and repository content.
- Prefer web-appropriate formats and sizes without degrading legibility. Keep
  stable paths when callers already reference an asset; update every consumer
  when a path must change.
- Do not delete an apparently unused asset until searches confirm that code,
  CSS, tests, documentation, and public links do not depend on it and the task
  explicitly includes deletion.

## Verification

- Open and visually inspect every added or replaced image or document.
- Confirm referenced paths and downloads from the built site, not only from the
  source tree. For PDFs, check page count, rendering, legibility, and links.
- Run `npm test` and `npm run build`, then inspect the affected page at desktop
  and mobile sizes when the asset is rendered in the UI.
