import { copy } from "@/content/copy";
import type { Locale } from "@/content/types";
import { SiteFooter } from "./layout/site-footer";
import { SiteHeader } from "./layout/site-header";
import { ScrollMotion } from "./motion/scroll-motion";
import { JamsAbout } from "./sections/jams-about";
import { JamsFormat } from "./sections/jams-format";
import { JamsHero } from "./sections/jams-hero";
import { JamsJoin } from "./sections/jams-join";
import { JamsNext } from "./sections/jams-next";

export function JamsPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <>
    <span id="top" aria-hidden="true" />
    <a className="skip-link" href="#main">{c.skip}</a>
    <ScrollMotion />

    <SiteHeader locale={locale} page="jams" />
    <main id="main">
      <JamsHero locale={locale} />
      <JamsAbout locale={locale} />
      <JamsFormat locale={locale} />
      <JamsJoin locale={locale} />
      <JamsNext locale={locale} />
    </main>

    <SiteFooter locale={locale} page="jams" />
  </>;
}
