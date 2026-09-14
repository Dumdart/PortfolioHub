# Sites Worker Guidance

This file applies to the Cloudflare/Sites worker under `worker/` and its
behavioral contract with `tests/sites-worker.test.mjs`.

## Request-handling invariants

- Serve an existing asset response unchanged.
- Use the app-shell fallback only for missing `GET` or `HEAD` requests that
  accept HTML. Do not turn API requests, write methods, or non-HTML requests
  into successful frontend routes.
- Strip the original path and query when requesting `/index.html`; preserve the
  original request semantics through the standard `Request` API.
- Keep the worker runtime portable: use Web Platform APIs and the injected
  `ASSETS` binding, with no Node-only APIs or secrets.
- Keep `wrangler.jsonc`, `.openai/hosting.json`, Vite's `dist/client` output,
  and `scripts/prepare-sites-build.mjs` consistent when the deployment contract
  intentionally changes.

## Verification

- Add request-level regression cases for routing changes, including negative
  cases that must remain 404 responses.
- Run `npm run build`, `npm run test:sites`, and the full `npm test` suite.
- For deployment-path changes, inspect the generated `dist/client`,
  `dist/server`, and `dist/.openai` files without committing generated output.
