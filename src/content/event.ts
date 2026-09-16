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
  dates: known({ start: "2026-10-23", end: "2026-10-25" }, "organizer, confirmed 2026-09-16"),
  participants: planned(300),
  durationHours: planned(48),
  trackCount: 2,
  dayCount: 3,
  email: known("gdsc@nu.edu.kz", proposal + ", page 11"),
  registration: unknown<string>(),
  siteUrl,
  canonicalUrl: known(siteUrl, "organizer, indexing approved 2026-09-16"),
  logoPermission: { status: "approved", source: "chapter-supplied profile mark, confirmed for this site by the organizer" } as Permission,
  affiliation: known("Official campus chapter of Google Developer Groups", profile),
  followers: known(987, profile + ", read 2026-09-16"),
  subscribers: known(1024, channel),
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
  schedule: ["learn", "build", "present"] as const,
};

export const packages: Package[] = [
  { id: "exclusive", scope: "event", status: "proposed", price: unknown<number>(), prizePool: { status: "proposed", value: 2000000, source: proposal + ", page 9" }, awards: [500000, 300000, 200000] },
  { id: "track", scope: "track", status: "proposed", price: unknown<number>(), prizePool: { status: "proposed", value: 1000000, source: proposal + ", page 9" }, awards: [500000, 300000, 200000] },
  { id: "internship", scope: "career", status: "proposed", price: unknown<number>(), prizePool: unknown<number>(), awards: [] },
  { id: "snacks", scope: "hospitality", status: "proposed", price: unknown<number>(), prizePool: unknown<number>(), awards: [] },
];
