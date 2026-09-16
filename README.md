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

Open http://127.0.0.1:3000. Kazakh is at `/kk/`, Russian at `/ru/`.

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

1. Fork the repo, or ask to be added as a collaborator.
2. Create a branch, make your change, and run `npm run verify`.
3. Open a pull request to `main`. CI runs the checks.
4. After a maintainer approves and merges it, the site deploys automatically.

Event facts are in `src/content/event.ts`, translations in `src/content/copy.ts`. Read [AGENTS.md](AGENTS.md) before changing them.

## Deployment

Pushes to `main` are tested, built and deployed automatically. See [docs/DEPLOY.md](docs/DEPLOY.md).

## Docs

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [docs/DEPLOY.md](docs/DEPLOY.md)
- [AGENTS.md](AGENTS.md)

## License

Code is MIT. Noto Sans is under the SIL Open Font License. The GDG logo, photos and partner logos belong to their owners and are not covered by the MIT license.
