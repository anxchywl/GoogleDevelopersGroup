# Deploy

The site runs at https://gdg.anxchywl.dev, on the same server as Wished, Loci, Muto, Gradus and EventsBot.

## Pipeline

`.github/workflows/ci.yml` runs on every push and pull request:

1. **Lint & Test**: `npm audit`, then `npm run verify` (lint, types, content tests, build, browser tests).
2. **Docker Build**: builds the image, checks its Caddy config, runs it read-only, and checks it runs as a non-root user and rejects `POST`.
3. **Deploy**, only after a merge to `main`: pushes `ghcr.io/anxchywl/gdg-web` and deploys it over SSH by its digest.

## Server

```
wished-caddy  (ports 80/443, TLS)  →  gdg-web:8080  on the wished_wished-app network
```

- The repo is cloned at `/home/deploy/gdg/repo` and runs as the `deploy` user.
- `deploy/deploy.sh` pulls the image, starts it with `docker/compose.production.yml` and waits for its health check.
- If the new container is unhealthy, the script restarts the last good image, recorded in `.deployed-image`.
- The container has no published port. Only Caddy can reach it.
- The `gdg.anxchywl.dev` site block lives in the Wished repo, in `infra/caddy/Caddyfile.production`.

## Secrets

Set in the repo's Actions secrets. They match the other projects on this server.

| Secret | Value |
|---|---|
| `SSH_HOST` | server IP |
| `SSH_USER` | `deploy` |
| `SSH_PATH` | `/home/deploy/gdg/repo` |
| `SSH_PRIVATE_KEY` | key used only by this repo's CI |
| `SSH_FINGERPRINT` | the server's SSH host key fingerprint |

No app secrets are needed. The image is pulled with the job's own `GITHUB_TOKEN`.

## Roll back by hand

```bash
ssh deploy@<server>
cd ~/gdg/repo
bash deploy/deploy.sh ghcr.io/anxchywl/gdg-web@sha256:<older digest>
```

Older digests are listed on the package page on GitHub.

## Build and run locally

```bash
docker build -f docker/Dockerfile -t gdg-web .
docker run --rm -p 127.0.0.1:3080:8080 --read-only --cap-drop ALL \
  --security-opt no-new-privileges --tmpfs /tmp:size=16m,mode=1777 gdg-web
```

`npm run build` writes the CSP headers to `security/` from the same HTML it exports. The image always builds both together. Never ship one without the other.

## Search engines

The site is indexed. `canonicalUrl` in `event.ts` drives `robots.txt`, `sitemap.xml` and the canonical links. Set it back to `unknown()` to hide the site from search engines.
