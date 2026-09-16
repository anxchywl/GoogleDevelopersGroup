# Google Datathon · NU

A one-page website that asks companies to sponsor the **Google Datathon** at Nazarbayev University. It is run by the GDG on Campus Nazarbayev University chapter.

The page comes in English, Kazakh and Russian. It tells a sponsor what the event is, what each package includes, who runs it, and how to get in touch.

**Live:** https://gdg.anxchywl.dev

Some details are not decided yet, such as registration, package prices and sponsors. The page leaves those out instead of guessing.

## What it is built with

Next.js, TypeScript and Tailwind CSS. The build turns the site into plain static files, so there is no backend, database or API.

## Run it on your computer

You need Node.js 22.12 or newer.

```bash
npm ci
npm run dev
```

Then open http://127.0.0.1:3000. English is at `/`, Kazakh at `/kk/` and Russian at `/ru/`.

## Useful commands

| Command | What it does |
|---|---|
| `npm run dev` | Starts the site with live reload |
| `npm run lint` | Checks code style |
| `npm run typecheck` | Checks types |
| `npm test` | Checks the content rules |
| `npm run test:e2e` | Opens the site in real browsers and tests it |
| `npm run build` | Builds the static site into `out/` |
| `npm start` | Serves the built site the way production does |
| `npm run verify` | Runs every check above, in order |

Before the first `npm run test:e2e`, install the browsers once:

```bash
npx playwright install --with-deps chromium webkit
```

## Changing the text

All facts live in `src/content/event.ts`. All translated text lives in `src/content/copy.ts`. Read [docs/CONTENT.md](docs/CONTENT.md) first: it says where each fact comes from and what may be published.

## Deploying

Every push to `main` is checked, built into a Docker image and deployed. See [docs/DEPLOY.md](docs/DEPLOY.md).

## More docs

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): how the page, motion and security work
- [docs/CONTENT.md](docs/CONTENT.md): sources for every fact, photo and logo
- [docs/DEPLOY.md](docs/DEPLOY.md): pipeline, server and rollback
- [AGENTS.md](AGENTS.md): rules for anyone changing this repo

## License

The code is MIT. The Noto Sans font uses the SIL Open Font License.

The MIT license does **not** cover the Google Developer Groups mark, the chapter photos, or any partner logo. Those belong to their owners.
