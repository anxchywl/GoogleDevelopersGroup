import type { MetadataRoute } from "next";
import { event } from "@/content/event";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return event.canonicalUrl.status === "confirmed"
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: new URL("/sitemap.xml", event.canonicalUrl.value).href }
    : { rules: { userAgent: "*", disallow: "/" } };
}

