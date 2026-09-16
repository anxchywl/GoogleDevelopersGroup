import type { Metadata } from "next";
import { event } from "@/content/event";
import { copy } from "@/content/copy";
import { localePath, type Locale } from "@/content/types";

export function metadata(locale: Locale): Metadata {
  const c = copy[locale];
  const origin = event.canonicalUrl.status === "confirmed" ? event.canonicalUrl.value : null;
  return {
    // share previews need absolute image urls even while indexing is off
    metadataBase: new URL(origin ?? event.siteUrl),
    title: `${event.name} | Nazarbayev University`,
    description: c.heroLead,
    ...(origin ? { alternates: { canonical: localePath(locale), languages: { en: "/", kk: "/kk/", ru: "/ru/", "x-default": "/" } } } : {}),
    robots: origin ? { index: true, follow: true } : { index: false, follow: false },
    icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
    openGraph: { title: event.name, description: c.heroLead, locale: { en: "en_US", kk: "kk_KZ", ru: "ru_RU" }[locale], type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: `${event.name} · ${event.organizer}` }] },
    twitter: { card: "summary_large_image", title: event.name, description: c.heroLead, images: ["/og.png"] },
  };
}

