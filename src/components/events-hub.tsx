import { copy } from "@/content/copy";
import { event, eventHistory, jams } from "@/content/event";
import { localePath, type Locale } from "@/content/types";
import { Arrow } from "./ui/arrow";
import { SiteFooter } from "./layout/site-footer";
import { SiteHeader } from "./layout/site-header";
import { HistoryControls } from "./motion/history-controls";
import { ScrollMotion } from "./motion/scroll-motion";

function HistoryCard({ item, locale }: { item: (typeof eventHistory)[number]; locale: Locale }) {
  const c = copy[locale];
  const photo = item.image.value;
  const imageDescription = "year" in item
    ? c.hub.history.images[item.id as keyof typeof c.hub.history.images]
    : c.photos[item.id as keyof typeof c.photos];
  const imageExtension = item.postUrl ? "jpg" : "webp";

  return <>
    {item.postUrl ? <a className="history-card" href={item.postUrl} target="_blank" rel="noopener noreferrer" aria-label={`${item.title.value}, ${c.hub.history.viewPost}`}>
      <span className="history-card-image"><img src={`/events/${photo.file}.${imageExtension}`} width={photo.width} height={photo.height} loading="lazy" decoding="async" alt={imageDescription} /></span>
      <span className="history-card-copy">
        <span className="history-card-period">{"year" in item ? item.year.value : c.hub.history.archive}</span>
        <strong>{item.title.value}</strong>
        <span className="history-card-link">{c.hub.history.viewPost}<Arrow diagonal /></span>
      </span>
    </a> : <article className="history-card">
      <span className="history-card-image"><img src={`/events/${photo.file}.${imageExtension}`} width={photo.width} height={photo.height} loading="lazy" decoding="async" alt={imageDescription} /></span>
      <span className="history-card-copy">
        <span className="history-card-period">{c.hub.history.archive}</span>
        <strong>{item.title.value}</strong>
      </span>
    </article>}
  </>;
}

export function EventsHub({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const items = [
    { id: "datathon", number: "01", title: event.name, description: c.hub.datathon, className: "hub-card-datathon" },
    { id: "jams", number: "02", title: jams.name, description: c.hub.jams, className: "hub-card-jams" },
  ] as const;

  return <>
    <span id="top" aria-hidden="true" />
    <a className="skip-link" href="#main">{c.skip}</a>
    <ScrollMotion />
    <SiteHeader locale={locale} page="events" />
    <main id="main" className="hub-page">
      <section className="events-hub shell" aria-labelledby="hub-title">
        <div className="hub-intro">
          <span className="eyebrow">{c.hub.eyebrow}</span>
          <h1 id="hub-title">{c.hub.title}</h1>
          <p>{c.hub.intro}</p>
        </div>
        <nav className="hub-list" id="event-list" aria-label={c.hub.nav[0]}>
          {items.map((item) => <a key={item.id} className={`hub-card ${item.className}`} href={localePath(locale, item.id)}>
            <span className="hub-card-number" aria-hidden="true">{item.number}</span>
            <span className="hub-card-copy">
              <span className="micro">{c.hub.label}</span>
              <strong>{item.title}</strong>
              <span className="hub-card-description">{item.description}</span>
            </span>
            <span className="hub-card-action">{c.hub.open}<Arrow diagonal /></span>
          </a>)}
        </nav>
      </section>
      <section className="hub-history shell" aria-labelledby="history-title">
        <div className="history-head" data-reveal>
          <div>
            <span className="eyebrow" data-decode>{c.hub.history.eyebrow}</span>
            <h2 id="history-title">{c.hub.history.title}</h2>
            <p>{c.hub.history.intro}</p>
          </div>
          <HistoryControls railId="event-history-rail" previous={c.hub.history.previous} next={c.hub.history.next} />
        </div>
        <div className="history-rail" id="event-history-rail" role="region" aria-label={c.hub.history.title} tabIndex={0}>
          {eventHistory.map((item) => <HistoryCard key={item.id} item={item} locale={locale} />)}
        </div>
      </section>
    </main>
    <SiteFooter locale={locale} page="events" />
  </>;
}
