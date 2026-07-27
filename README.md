# Portfolio Hub

Paul Thumfart's English-first software portfolio. The interface uses calm system maps, architecture flows, and a roadmap instead of self-scored skill charts.

## Stack

- Vue 3, Vue Router, TypeScript, and Vite
- Nginx in a multi-stage Docker image
- Docker Compose bound to `127.0.0.1:4321`
- Caddy on the Ubuntu host for reverse proxying and automatic HTTPS

## Local development

```powershell
npm install
npm run dev
```

Verification:

```powershell
npm run typecheck
npm run build
npm run test:sites
```

## Content

Project facts live in `src/data/projects.ts`. Public project links are included only for public repositories. Credential previews in `public/assets` are redacted before publication and intentionally exclude addresses, birth date, signatures, identifiers, religion, and detailed grades.

## Ubuntu homelab deployment

Build and start the container:

```bash
docker compose up -d --build
```

The service is available only on the host loopback interface at `127.0.0.1:4321`. Copy `deploy/Caddyfile.example` into the host Caddy configuration, replace `portfolio.example.com` with the real domain, and reload Caddy.

Before a domain is available, the container can be checked directly on the Ubuntu host:

```bash
curl http://127.0.0.1:4321/healthz
```
