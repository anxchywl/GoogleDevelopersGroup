import { copy } from "@/content/copy";
import { event } from "@/content/event";
import type { Locale } from "@/content/types";
import { plain } from "@/lib/site";
import { Gallery } from "./gallery";

export function Community({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const telegramCount = event.subscribers.status === "unknown" ? "—" : plain(locale, event.subscribers.value).replace(/[,\u00a0\u202f]/g, " ");
  const instagramCount = event.followers.status === "unknown" ? "—" : plain(locale, event.followers.value);
  return <section id="community" className="section community-section" aria-labelledby="org-title"><div className="shell">
    <div className="org-grid">
      <div data-reveal>
        <p className="eyebrow" data-decode>{c.orgLabel}</p>
        <h2 id="org-title">{c.orgTitle}</h2>
        <p className="lead">{c.orgBody}</p>
        <p className="mission">{c.mission}</p>
      </div>
      <div className="org-stats" data-reveal>
        <div>
          <span className="stat-value dot-0" data-count>{telegramCount}</span>
          <span className="stat-label">{c.orgStats.telegram}</span>
        </div>
        <div>
          <span className="stat-value dot-1" data-count>{instagramCount}</span>
          <span className="stat-label">{c.orgStats.instagram}</span>
        </div>
        <p className="org-place">{c.orgPlace}</p>
      </div>
    </div>

    <figure className="team-shot" data-reveal>
      <img src={`/events/${event.team.file}.webp`} srcSet={`/events/${event.team.file}-800.webp 800w, /events/${event.team.file}.webp 1600w`}
        sizes="(max-width: 960px) 92vw, 1240px" width={event.team.width} height={event.team.height} loading="lazy" decoding="async" alt={c.teamCaption} />
      <figcaption>{c.teamCaption}</figcaption>
    </figure>

    <Gallery locale={locale} />

    <div className="past-partners" data-reveal>
      <p className="eyebrow" data-decode>{c.partnersLabel}</p>
      <ul>{event.pastPartners.map((partner) => {
        const logo = <img src={`/partners/${partner.logo}.webp`} alt={partner.name} loading="lazy" decoding="async" />;
        return <li key={partner.logo}>
          {partner.url ? <a href={partner.url} target="_blank" rel="noopener noreferrer">{logo}</a> : logo}
        </li>;
      })}</ul>
    </div>
  </div></section>;
}
