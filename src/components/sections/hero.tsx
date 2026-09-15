import { copy } from "@/content/copy";
import { event } from "@/content/event";
import type { Locale } from "@/content/types";
import { eventDate, mailto } from "@/lib/site";
import { Drifters } from "../motion/drifters";
import { Arrow } from "../ui/arrow";
import { GdgMark } from "../ui/marks";

export function Hero({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <section className="hero" aria-labelledby="hero-title">
    <Drifters />
    <div className="shell hero-inner">
      <GdgMark animate className="hero-mark" />
      <p className="byline">{c.byline}</p>
      <h1 id="hero-title">Google Datathon<span className="title-period">.</span></h1>
      <p className="tagline">{event.tagline}</p>
      <p className="hero-lead">{c.heroLead}</p>
      <div className="hero-actions">
        <a className="button dark" href={mailto}>{c.partner}<Arrow diagonal /></a>
        <a className="button ghost" href="#packages">{c.seePackages}<Arrow /></a>
      </div>
      <p className="hero-where"><span>{c.place}</span><b>{eventDate(locale, c.date)}</b></p>
    </div>
  </section>;
}
