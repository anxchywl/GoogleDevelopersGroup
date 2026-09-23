# Architecture

## Rendering

Next.js exports two pages in three languages: the datathon at `/`, `/kk/` and `/ru/`, and Google Jams at `/jams/`, `/kk/jams/` and `/ru/jams/`. Each language has its own root layout so the `lang` attribute is right before any JavaScript runs.

Everything on the page is server-rendered from `src/content/`. `event-page.tsx` and `jams-page.tsx` compose sections and nothing else; each section reads the copy for its own language. The header, footer and language switcher take the page, so a language link keeps the reader on the page they are on.

The Google Jams page shares the tokens, header, footer and reveal motion with the datathon page but has its own section shapes. Its bingo card is plain checkboxes, and CSS `:has()` calls a full line, so it works with JavaScript off. The code puzzle ships as the finished function and only becomes a game once JavaScript runs.

Five components are client-side, and only for behaviour:

| Component | Job |
|---|---|
| `motion/scroll-motion.tsx` | Reveals sections, scrambles then decodes the small section labels, counts the numbers up through `numberShape`, which keeps a grouped figure like `1 024` counting as one value, marks the current nav item, sends the wordmark back to the top. |
| `motion/drifters.tsx` | The shapes floating over the page. |
| `sections/gallery.tsx` | Switches the photo rail between scroll-linked and scrollable. |
| `layout/language-switcher.tsx` | Plain links; no client state. |
| `ui/code-puzzle.tsx` | The Google Jams warm-up: tap the lines of a function back into order. |

## Motion

Motion is CSS where it can be, JavaScript where it cannot.

The chapter mark in the header, footer and datathon hero animates its arms in once. The hover pulse lives on a nested group, so leaving the mark cannot restart the entry animation. The mark needs `overflow: visible` because the arms start outside its viewBox.

Section labels ship as real text in the HTML. On mount each one splits into a `.sr-only` copy carrying the real label and an `aria-hidden` copy that is scrambled, so a reader arrives at a coded label and watches it decode when the section reaches the viewport. Screen readers always get the real text. The `aria-hidden` copy is what animates, and the element collapses back to plain text when it finishes. Under reduced motion nothing is scrambled at all. Putting the real label in `aria-label` would have been simpler but `aria-label` on a paragraph is prohibited and fails an axe audit.

The drifting shapes hold positions in page coordinates and render through a fixed layer, so the cursor can push them anywhere, including far below the fold. It is a damped loop with a slow wander and a gentle impulse. Below 640px nine smaller shapes stay in the opening section. On touch screens a shape can be dragged anywhere; holding it near the screen edge scrolls the page.

The photo rail ships as a normal scroll-snap container with buttons. When motion is allowed, the Gallery takes it over, hides the buttons and slides the track from the page scroll position instead. It picks the mode with `useSyncExternalStore`, whose server snapshot reports reduced motion, so the scrollable version is what lands in the HTML.

With reduced motion on, every animation and smooth scroll is off and the page still reads in full. Nothing starts hidden.

Three traps worth remembering, all of which broke scrolling silently:

- `overflow-x` on `body` makes the body a scroll container and breaks anchors and sticky positioning.
- A sticky header cannot be its own `#top` anchor.
- `history.replaceState` cancels a smooth `scrollTo` in progress.

## Images and fonts

No remote requests. Static export has no image optimizer, so photographs are pre-sized local WebP at two widths behind a plain `img` with `srcset`. That is why the `no-img-element` lint rule is off.

The chapter mark is inline SVG. The favicon, Apple icon and social card are generated at build time from `public/mark.svg`.

Noto Sans is self-hosted and subset locally, and covers every Kazakh letter.

## Security

The deployed container serves files. There is no request handling, database, session or user input.

`npm run build` scans the exported HTML and writes a CSP with a hash for each inline Next.js script. No `unsafe-inline` or `unsafe-eval` for scripts. `style-src` allows inline styles, which the framework needs; that is separate from script permission.

The headers also block framing, objects, forms, camera, microphone, geolocation, payment and USB. External resources cannot load at all.

Rebuild the HTML and the headers together, or the page will break.

## What the tests cover, and what they do not

Vitest checks that translations match in shape, that prize maths adds up, that every published claim has a source, and that every photo has a description in all three languages.

Playwright runs Chromium, a Pixel 7 profile and WebKit. It covers accessibility, keyboard, reduced motion, no JavaScript, anchor accuracy, horizontal overflow at five widths in three languages, and the security headers.

Emulation is not a real device, and a clean dependency audit is not a security review.
