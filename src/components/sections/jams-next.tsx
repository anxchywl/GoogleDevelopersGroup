import type { CSSProperties } from "react";
import { copy } from "@/content/copy";
import { event, jams } from "@/content/event";
import type { Locale } from "@/content/types";
import { nextJamWhen, stubDate } from "@/lib/site";
import { Arrow } from "../ui/arrow";

export function JamsNext({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const j = c.jams;
  const date = stubDate(locale, jams.next.value.date);
  const photos = [
    { file: event.team.file, small: 800, large: 1600, width: event.team.width, height: event.team.height, caption: c.teamCaption },
    { file: "mentoring", small: 600, large: 1200, width: 1200, height: 800, caption: c.photos.mentoring },
    { file: "workshop", small: 600, large: 1200, width: 1200, height: 800, caption: c.photos.workshop },
  ];
  return <section id="next" className="section next-section" aria-labelledby="next-title"><div className="shell">
    <div className="section-heading" data-reveal>
      <p className="eyebrow" data-decode>{j.nextLabel}</p>
      <h2 id="next-title">{j.nextTitle}</h2>
    </div>
    <div className="ticket" data-reveal>
      <div className="ticket-stub">
        <span className="ticket-day">{date.day}</span>
        <span className="ticket-month">{date.rest}</span>
      </div>
      <div className="ticket-body">
        <p className="ticket-place">{c.place}</p>
        <h3>{j.next}: {nextJamWhen(locale)}</h3>
        <p>{j.nextBody}</p>
        <a className="text-link" href={jams.telegram} target="_blank" rel="noopener noreferrer">t.me/gdsc_nu<Arrow diagonal /></a>
      </div>
    </div>

    <div className="crew">
      <div className="crew-copy" data-reveal>
        <p className="eyebrow" data-decode>{j.runByLabel}</p>
        <p className="lead">{j.runBy}</p>
      </div>
      <div className="crew-photos" data-reveal>{photos.map((photo, i) => <figure key={photo.file} className={`snap snap-${i}`} style={{ "--delay": `${i * 90}ms` } as CSSProperties}>
        <img src={`/events/${photo.file}.webp`} srcSet={`/events/${photo.file}-${photo.small}.webp ${photo.small}w, /events/${photo.file}.webp ${photo.large}w`}
          sizes="(max-width: 960px) 80vw, 420px" width={photo.width} height={photo.height} loading="lazy" decoding="async" alt={photo.caption} />
        <figcaption>{photo.caption}</figcaption>
      </figure>)}</div>
    </div>
  </div></section>;
}
