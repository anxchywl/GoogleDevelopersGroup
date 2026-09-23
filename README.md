# Google Datathon NU

Sponsorship website for the Google Datathon at Nazarbayev University, organized by GDG on Campus NU. Available in English, Kazakh and Russian.

Live: https://gdg.anxchywl.dev

## Stack

Next.js, TypeScript, Tailwind CSS. Static export served by Caddy in Docker.

## Getting started

Requires Node.js 22.12+.

```bash
npm ci
npm run dev
```

Open http://127.0.0.1:3000. Kazakh is at `/kk/`, Russian at `/ru/`. The Google Jams page is at `/jams/`, `/kk/jams/` and `/ru/jams/`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm test` | Content tests |
| `npm run test:e2e` | Browser tests |
| `npm run build` | Build to `out/` |
| `npm start` | Serve the build locally |
| `npm run verify` | Run all checks |

Browser tests need Playwright browsers:

```bash
npx playwright install --with-deps chromium webkit
```

## Contributing

Anyone can suggest a change: fix a typo, improve a translation, or add a feature.

**Small text fix, no setup needed**

1. Open the file on GitHub and click the pencil icon.
2. Make your change and click **Propose changes**.
3. Click **Create pull request**.

**Bigger change**

1. Click **Fork** at the top of this page to get your own copy.
2. Clone your fork and create a branch:

   ```bash
   git clone https://github.com/<your-username>/GoogleDevelopersGroup.git
   cd GoogleDevelopersGroup
   git checkout -b my-change
   ```

3. Make your change, then check that everything still works:

   ```bash
   npm ci
   npm run verify
   ```

4. Commit with a short message such as `fix: correct russian package name`, push, and open a pull request on GitHub.

Every pull request is checked automatically and reviewed by a maintainer. Once it is merged, the site updates on its own.

Event facts are in `src/content/event.ts`, translations in `src/content/copy.ts`. Read [AGENTS.md](AGENTS.md) before changing them.

## Deployment

Every merge to `main` is tested, built and deployed automatically. See [docs/DEPLOY.md](docs/DEPLOY.md).

## Docs

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [docs/DEPLOY.md](docs/DEPLOY.md)
- [AGENTS.md](AGENTS.md)
