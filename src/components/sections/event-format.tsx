import { copy } from "@/content/copy";
import { event } from "@/content/event";
import type { Locale } from "@/content/types";
import { SplitPath } from "../ui/diagrams";

export function EventFormat({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <section id="event" className="section shell" aria-labelledby="event-title">
    <div className="section-heading" data-reveal>
      <p className="eyebrow" data-decode>{c.eventLabel}</p>
      <h2 id="event-title">{c.eventTitle}</h2>
      <p>{c.eventBody}</p>
    </div>
    <div className="track-diagram" data-reveal>
      <SplitPath />
      <div className="tracks-grid">{c.tracks.map((track, i) => <article key={event.tracks[i]} className={`track-card track-${i}`}>
        <div className="track-top"><span className="micro">{track.tag}</span><span className="track-glyph" aria-hidden="true">{i === 0 ? "{ }" : "ƒ(x)"}</span></div>
        <h3>{track.title}</h3><p>{track.body}</p>
        <ul className="track-tags">{track.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
      </article>)}</div>
    </div>

    <ol className="days">{c.days.map((day, i) => <li key={event.schedule[i]} data-day data-reveal>
      <span className={`day-marker marker-${i}`}>{String(i + 1).padStart(2, "0")}</span>
      <p className="micro">{c.day} {i + 1}</p>
      <h3>{day.title}</h3><p>{day.body}</p>
    </li>)}</ol>
  </section>;
}
