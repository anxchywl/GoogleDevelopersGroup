import type { MetadataRoute } from "next";
import { event } from "@/content/event";
import { locales, localePath, type PageId } from "@/content/types";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (event.canonicalUrl.status !== "confirmed") return [];
  const origin = event.canonicalUrl.value;
  const pages: PageId[] = ["datathon", "jams"];
  return pages.flatMap(page => locales.map(locale => ({ url: new URL(localePath(locale, page), origin).href, alternates: { languages: Object.fromEntries(locales.map(l => [l,new URL(localePath(l, page),origin).href])) } })));
}
