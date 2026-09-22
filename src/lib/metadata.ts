import type { Metadata } from "next";
import { event, jams } from "@/content/event";
import { copy } from "@/content/copy";
import { localePath, type Locale, type PageId } from "@/content/types";

export function metadata(locale: Locale, page: PageId = "datathon"): Metadata {
  const c = copy[locale];
  const origin = event.canonicalUrl.status === "confirmed" ? event.canonicalUrl.value : null;
  const isJams = page === "jams";
  const name = isJams ? jams.name : event.name;
  const description = isJams ? c.jams.heroLead : c.heroLead;
  const image = isJams ? "/og-jams.png" : "/og.png";
  const path = (target: Locale) => localePath(target, page);
  return {
    // share previews need absolute image urls even while indexing is off
    metadataBase: new URL(origin ?? event.siteUrl),
    title: `${name} | Nazarbayev University`,
    description,
    ...(origin ? { alternates: { canonical: path(locale), languages: { en: path("en"), kk: path("kk"), ru: path("ru"), "x-default": path("en") } } } : {}),
    robots: origin ? { index: true, follow: true } : { index: false, follow: false },
    icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
    openGraph: { title: name, description, locale: { en: "en_US", kk: "kk_KZ", ru: "ru_RU" }[locale], type: "website", images: [{ url: image, width: 1200, height: 630, alt: `${name}, ${event.organizer}` }] },
    twitter: { card: "summary_large_image", title: name, description, images: [image] },
  };
}
