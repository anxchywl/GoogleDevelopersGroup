import { copy } from "@/content/copy";
import type { Locale } from "@/content/types";
import { SiteFooter } from "./layout/site-footer";
import { SiteHeader } from "./layout/site-header";
import { ScrollMotion } from "./motion/scroll-motion";
import { Community } from "./sections/community";
import { EventFormat } from "./sections/event-format";
import { Hero } from "./sections/hero";
import { Packages } from "./sections/packages";
import { SponsorValue } from "./sections/sponsor-value";
import { Stats } from "./sections/stats";

export function EventPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <>
    <span id="top" aria-hidden="true" />
    <a className="skip-link" href="#main">{c.skip}</a>
    <ScrollMotion />

    <SiteHeader locale={locale} />
    <main id="main">
      <Hero locale={locale} />
      <Stats locale={locale} />
      <SponsorValue locale={locale} />
      <EventFormat locale={locale} />
      <Packages locale={locale} />
      <Community locale={locale} />
    </main>

    <SiteFooter locale={locale} />
  </>;
}
