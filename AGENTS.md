# Repository rules

A static, three-language sponsorship page for a proposed student datathon. Read the content rules below before you touch any claim, number, link, logo or benefit.

## Where things go

| Path | Holds |
|---|---|
| `src/app/` | Routes only. One route group per language. |
| `src/components/ui/` | Small pieces with no page knowledge: arrows, marks, brand icons, diagrams. |
| `src/components/layout/` | Header, footer, language switcher, the HTML document. |
| `src/components/sections/` | One file per section of the page. |
| `src/components/motion/` | Client-side behaviour: scroll reveals, drifting shapes. |
| `src/content/` | All facts and all translated text. Nothing hard-coded elsewhere. |
| `src/lib/` | Metadata and shared helpers. |
| `tests/` | Both test suites and their own Vitest and Playwright configs. |

`src/components/event-page.tsx` only composes sections. Keep it that way.

The repo root holds only files their tools refuse to find anywhere else. Do not add to it.

## Content rules

- Keep facts in `event.ts` and every translated string in `copy.ts`.
- Every claim is `confirmed`, `proposed` or `unknown`, each with a source. Never replace `unknown` with a guess.
- Never invent dates, prices, sponsors, attendance, contacts or registration links.
- Recruiting is opt-in. Never promise access to a participant database.
- Never stretch, recolour or recombine the GDG mark or a partner logo.
- Photographs show real students. Do not add or re-crop them without the organizer's sign-off, and give every one a description in all three languages.
- This site speaks for the NU chapter and this event, not for Google Developer Groups.

## Engineering rules

- Next.js App Router, strict TypeScript, Tailwind, npm with the committed lockfile.
- Server-render the content. Client components are for behaviour only.
- Every language must work with JavaScript off and with reduced motion on.
- Keep native scrolling, visible focus rings and semantic headings. Never hide content behind an animation.
- No backend, analytics, tracking, remote embeds or state library without a real need.
- `npm run build` regenerates the CSP in `security/`. Ship HTML and headers from the same build.
- Never add inline scripts, `unsafe-eval` or external hosts to work around a CSP failure.
- No secrets in code, images, docs or logs.

## Style

Readable, descriptive code. Comments are rare and explain only non-obvious intent; lowercase, one line, no trailing punctuation. Leave `next-env.d.ts` alone.

Commits: lowercase Conventional Commits, for example `feat: add event timeline`.

## Before you hand work over

Run `npm run verify` and `npm audit`. Look at the page yourself at desktop and mobile widths in all three languages. Report failures and anything you did not test.

Tests must protect behaviour or content rules, not mirror markup.

## Do not

Push to `main` without the user's approval: every push there deploys to production. Do not change DNS, the server or the shared Caddy config in the Wished repo without approval either. Local Docker builds and previews are fine. Never use a root password.
