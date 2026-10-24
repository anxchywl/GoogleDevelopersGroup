import type { Claim, Package, PastPartner, Permission, Photo, SocialLink, Sponsor } from "./types";

const proposal = "GDG Proposal.pdf, organizer-provided proposal";
const profile = "instagram.com/nu.gdg, chapter profile and highlights";
const channel = "t.me/gdsc_nu, chapter channel, read 2026-09-16";
const planned = <T>(value: T): Claim<T> => ({ status: "proposed", value, source: proposal });
const known = <T>(value: T, source: string): Claim<T> => ({ status: "confirmed", value, source });
const unknown = <T>(): Claim<T> => ({ status: "unknown", value: null });
const siteUrl = "https://gdg.anxchywl.dev";

export const event = {
  name: "Google Datathon",
  tagline: "Chat, Is This Data Real?",
  organizer: "GDG on Campus Nazarbayev University",
  organizerFull: known("Google Developer Group at Nazarbayev University", profile),
  status: "proposed" as "proposed" | "confirmed",
  location: "Nazarbayev University, Astana",
  dates: known({ start: "2027-03-13", end: "2027-03-14" }, "user-provided day and month 2026-10-26; year assumed as the next March"),
  participants: planned(300),
  durationHours: planned(48),
  trackCount: 2,
  dayCount: 2,
  email: known("gdsc@nu.edu.kz", proposal + ", page 11"),
  registration: unknown<string>(),
  siteUrl,
  canonicalUrl: known(siteUrl, "organizer, indexing approved 2026-09-16"),
  logoPermission: { status: "approved", source: "chapter-supplied profile mark, confirmed for this site by the organizer" } as Permission,
  affiliation: known("Official campus chapter of Google Developer Groups", profile),
  followers: known(987, profile + ", current count provided by user 2026-10-26"),
  subscribers: known(1024, channel + ", current count provided by user 2026-10-26"),
  githubUrl: known("https://github.com/anxchywl/GoogleDevelopersGroup", "site repository"),
  sources: {
    proposal,
    profile,
    hacknu: "https://hacknu25.nuacm.kz/",
    nuopen: "https://nuopen.nuacm.kz/",
  },
  social: [
    { id: "instagram", handle: "@nu.gdg", url: "https://www.instagram.com/nu.gdg/" },
    { id: "telegram", handle: "t.me/gdsc_nu", url: "https://t.me/gdsc_nu" },
  ] as SocialLink[],
  // chapter photographs supplied inside the organizer proposal deck
  photos: [
    { id: "devfest", file: "devfest", width: 1200, height: 800 },
    { id: "talks", file: "talks", width: 1200, height: 800 },
    { id: "mentoring", file: "mentoring", width: 1200, height: 800 },
    { id: "workshop", file: "workshop", width: 1200, height: 800 },
    { id: "solutions", file: "solutions", width: 1200, height: 800 },
  ] as Photo[],
  team: { file: "team", width: 1600, height: 768 } as const,
  // url stays null until the company is identified beyond doubt, so no logo links somewhere wrong
  pastPartners: [
    { name: "Alatau City Bank", logo: "alatau-city-bank", url: "https://alataucitybank.kz/en", source: proposal + ", page 4" },
    { name: "Smart System Technologies", logo: "smart-system-technologies", url: null, source: proposal + ", page 4" },
    { name: "ERG", logo: "erg", url: "https://www.erg.kz/en", source: proposal + ", page 4" },
    { name: "CDF", logo: "cdf", url: null, source: proposal + ", page 4" },
    { name: "DataSci", logo: "datasci", url: null, source: proposal + ", page 4" },
    { name: "Partner logo, name to be confirmed", logo: "unidentified", url: null, source: proposal + ", page 4" },
    { name: "Quantori", logo: "quantori", url: "https://quantori.com/", source: proposal + ", page 4" },
  ] as PastPartner[],
  sponsors: [] as Sponsor[],
  tracks: ["software", "ml"] as const,
  schedule: ["learn-build", "present"] as const,
};

export const packages: Package[] = [
  { id: "exclusive", scope: "event", status: "proposed", price: unknown<number>(), prizePool: { status: "proposed", value: 2000000, source: proposal + ", page 9" }, awards: [500000, 300000, 200000] },
  { id: "track", scope: "track", status: "proposed", price: unknown<number>(), prizePool: { status: "proposed", value: 1000000, source: proposal + ", page 9" }, awards: [500000, 300000, 200000] },
  { id: "internship", scope: "career", status: "proposed", price: unknown<number>(), prizePool: unknown<number>(), awards: [] },
  { id: "snacks", scope: "hospitality", status: "proposed", price: unknown<number>(), prizePool: unknown<number>(), awards: [] },
];

const jamsDeck = "google jamsss.pptx, organizer-provided slides with the jam format";
// settled facts keep a non-null value for the page to read
const held = <T>(value: T, source: string) => ({ status: "confirmed" as const, value, source });

export const jams = {
  name: "Google Jams",
  location: "Nazarbayev University, Astana",
  last: held({ date: "2026-10-22", start: "18:00", end: "20:00" }, "user confirmed the event took place on 2026-10-22, 2026-10-28"),
  next: unknown<{ date: string }>(),
  registration: unknown<string>(),
  telegram: "https://t.me/gdsc_nu",
  // 20 minute warm-up and 10 minute coffee break from the organizer; the case and pitching split the rest
  schedule: held(["18:00", "18:20", "19:20", "19:30", "20:00"], "organizer, 2026-09-24; case and pitching lengths proposed"),
  criteria: held(["feasibility", "creativity", "process", "expenses", "scalability"] as const, jamsDeck + ", slides 9 to 12"),
  warmups: held(["puzzles", "bingo"] as const, jamsDeck + ", slides 6 and 7"),
};

const historySource = "organizer-provided event photo archive in " + proposal;
const historyYear = "user-provided event list, 2026-10-28";
const historyFact = <T>(value: T, source: string) => ({ status: "confirmed" as const, value, source });

export const eventHistory = [
  {
    id: "internship-talk",
    title: historyFact("Google Talks: How I Got My Internship", historyYear),
    year: historyFact(2026, historyYear),
    image: historyFact(event.photos.find((photo) => photo.id === "talks")!, historySource),
    postUrl: null,
  },
  {
    id: "research-internships",
    title: historyFact("Google Talks: Road to Research Internships", "Telegram post https://t.me/gdsc_nu/393"),
    year: historyFact(2026, "Telegram post https://t.me/gdsc_nu/393"),
    image: historyFact({ id: "research-internships", file: "talks-internships-2026", width: 640, height: 800 }, "Telegram post https://t.me/gdsc_nu/393"),
    postUrl: "https://t.me/gdsc_nu/393",
  },
  {
    id: "google-jams-2026",
    title: historyFact("Google Jams", "Telegram post https://t.me/gdsc_nu/408"),
    year: historyFact(2026, historyYear),
    image: historyFact({ id: "google-jams-2026", file: "google-jams-2026", width: 640, height: 800 }, "Telegram post https://t.me/gdsc_nu/408"),
    postUrl: "https://t.me/gdsc_nu/408",
  },
  {
    id: "off-script",
    title: historyFact("Google Talks: OFF-SCRIPT", "Telegram post https://t.me/gdsc_nu/402"),
    year: historyFact(2026, historyYear),
    image: historyFact({ id: "off-script", file: "off-script-2026", width: 640, height: 800 }, "Telegram post https://t.me/gdsc_nu/402"),
    postUrl: "https://t.me/gdsc_nu/402",
  },
  {
    id: "nuca-gdg",
    title: historyFact("NUCA × GDG", "Telegram post https://t.me/gdsc_nu/406"),
    year: historyFact(2026, historyYear),
    image: historyFact({ id: "nuca-gdg", file: "nuca-gdg-2026", width: 533, height: 800 }, "Telegram post https://t.me/gdsc_nu/406"),
    postUrl: "https://t.me/gdsc_nu/406",
  },
  ...[
    { id: "devfest", title: "DevFest" },
    { id: "talks", title: "Google Talks" },
    { id: "mentoring", title: "NeHackathon" },
    { id: "workshop", title: "Campus workshop" },
    { id: "solutions", title: "Google Solutions Challenge" },
  ].map(({ id, title }) => ({
    id,
    title: historyFact(title, historySource),
    image: historyFact(event.photos.find((photo) => photo.id === id)!, historySource),
    postUrl: null,
  })),
];
