import type { MetadataRoute } from "next";
import { event } from "@/content/event";
import { locales, localePath } from "@/content/types";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (event.canonicalUrl.status !== "confirmed") return [];
  const origin = event.canonicalUrl.value;
  return locales.map(locale => ({ url: new URL(localePath(locale), origin).href, alternates: { languages: Object.fromEntries(locales.map(l => [l,new URL(localePath(l),origin).href])) } }));
}

