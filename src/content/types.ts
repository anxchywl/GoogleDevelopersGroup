export const locales = ["en", "kk", "ru"] as const;
export type Locale = (typeof locales)[number];
export type Localized = Record<Locale, string>;
export type Claim<T> =
  | { status: "confirmed"; value: T; source: string }
  | { status: "proposed"; value: T; source: string }
  | { status: "unknown"; value: null; source?: string };
export type Permission = { status: "pending" } | { status: "approved"; source: string };
export type PackageId = "exclusive" | "track" | "internship" | "snacks";
export type Package = {
  id: PackageId;
  scope: "event" | "track" | "career" | "hospitality";
  price: Claim<number>;
  prizePool: Claim<number>;
  awards: readonly number[];
  status: "proposed" | "confirmed";
};
export type Sponsor = { name: string; url: string; logo: string; permission: Permission; relationship: Claim<string> };
export type PastPartner = { name: string; logo: string; url: string | null; source: string };
export type Photo = { id: string; file: string; width: number; height: number };
export type SocialLink = { id: "instagram" | "telegram" | "email"; handle: string; url: string };
export function localePath(locale: Locale) { return locale === "en" ? "/" : `/${locale}/`; }
