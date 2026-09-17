# Content

## Where to edit

| File | Holds |
|---|---|
| `src/content/event.ts` | Facts, figures, contacts, package finances, photo and partner records, and a source for each |
| `src/content/copy.ts` | English, Kazakh and Russian text, all three with the same shape |
| `src/content/types.ts` | The claim, package, photo and partner types |

Every claim is `confirmed`, `proposed` or `unknown`. Confirmed and proposed carry a source. Unknown carries `null` and renders nothing. Never swap a `null` for a guess.

English is the default. There is no geolocation or browser sniffing. The event name and tagline stay in English in all three versions. Have the organizers read the Kazakh and Russian before launch.

## Where the facts come from

Two sources only: the organizer's `GDG Proposal.pdf`, read in full on 2026-09-16, and the chapter's public profile. The PDF is not in this repository.

| On the page | Source |
|---|---|
| Google Datathon, "Chat, Is This Data Real?" | Proposal p1 |
| Official campus chapter, supported by Google | Proposal p2, profile bio |
| Mission: grow the Kazakhstan IT ecosystem, teach generative AI and cloud, connect talent with business | Proposal p2 |
| Past events: Google Talks, DevFest, NeHackathon, Google Solutions Challenge | Proposal p3, profile highlights |
| Past partners: Alatau City Bank, Smart System Technologies, ERG, CDF, DataSci, Quantori | Proposal p4 |
| 300+ participants, 48 hours, two tracks, three days | Proposal p5–6 |
| Track focus, including Google Gemini in the ML track | Proposal p5 |
| Hiring pipeline, business case, branding and reach | Proposal p7 |
| Package benefits and prize allocations | Proposal p9–10 |
| gdsc@nu.edu.kz, @nu.gdg, t.me/gdsc_nu | Proposal p11, lnk.bio/gdsc_nu |
| 23 – 25 October 2026 | Organizer, confirmed 2026-09-16 |
| 987 Instagram followers | Profile, read 2026-09-16 |
| 1 024 Telegram subscribers | t.me/gdsc_nu, read 2026-09-16 |

Venue booking, registration, package prices and confirmed sponsors are still unknown, so they stay off the page. The dates are set; the year was taken as 2026, the next October after they were given.

## Two things deliberately softened

Proposal page 7 offers "access to a closed base of vetted IT talent" and "targeted mailing to the whole participant base". The site does not say that. It says participants who opt in share their CV and GitHub, and that vacancy mail goes only to people who asked for it.

Put the original wording back only after a lawful consent and retention process is agreed in writing.

## Money

The exclusive package puts KZT 2,000,000 into prizes across both tracks. A single track is KZT 1,000,000. Each track pays 500,000 / 300,000 / 200,000.

These are prize allocations. They are not package prices and not secured funds. Operations and merchandise cost extra and are negotiable.

Track exclusivity covers that track only, with a non-competing sponsor possible on the other. Event-wide exclusivity and putting a brand in the event name both need the university and a Google brand review.

## Photographs

The five event photos and the team photo are cropped from the organizer's own proposal deck. They show identifiable students at chapter events already published on the chapter's public Instagram.

They are here because the organizer asked for them. The organizer owns that decision and should confirm everyone shown agrees.

Each one needs a description in all three languages.

## Marks and logos

`public/mark.svg` is the Google Developer Groups mark, rebuilt as four capsules at endpoints measured from the chapter's own profile image. Proportions, colours and geometry match. It is never stretched, recoloured or recombined.

It is used because the organizer runs the chapter and asked for it. Google's brand rules still apply, so confirm the chapter may use the asset from the official GDG brand kit before the site goes public.

Partner logos in `public/partners/` are cropped from proposal page 4, each keeping its own tile. They are third-party trademarks taken from the chapter's own partnership materials. If a company objects, delete its entry from `pastPartners` and its logo file.

A logo links out only when the company was identified beyond doubt, so nothing can point somewhere wrong:

| Logo | Links to |
|---|---|
| Alatau City Bank | alataucitybank.kz |
| ERG | erg.kz |
| Quantori | quantori.com |
| Smart System Technologies | not linked, several Kazakh companies share the name |
| CDF | not linked, the tagline "create. develop. fulfill." matched nothing |
| DataSci | not linked, probably the NU DataSci student club but no page found |
| White "á" on green | not linked, company not identified |

Fill in `url` in `pastPartners` as each one is confirmed. The unidentified logo carries the description "Partner logo, name to be confirmed"; give it a real name once you know it.

Footer glyphs are the supplied Gmail, Instagram and Telegram marks, unchanged apart from unique gradient ids.

## Still to confirm before launch

Naming and affiliation wording, dates and venue, expected scale, package terms, photo consent, partner logo permission, the translated copy, and the GDG asset entitlement.
