import { copy } from "@/content/copy";
import { jams } from "@/content/event";
import type { Locale } from "@/content/types";
import { nextJamWhen } from "@/lib/site";
import { Arrow } from "../ui/arrow";
import { JamTable } from "../ui/jam-visuals";

export function JamsHero({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const j = c.jams;
  const [first, second] = jams.name.split(" ");
  return <section className="jam-hero" aria-labelledby="hero-title">
    <div className="shell jam-hero-inner">
      <div className="jam-hero-copy">
        <p className="byline" data-reveal data-decode>{c.byline}</p>
        <h1 id="hero-title"><span>{first}</span> <span>{second}<span className="title-period">.</span></span></h1>
        <p className="tagline">{j.tagline}</p>
        <p className="hero-lead">{j.heroLead}</p>
        <div className="hero-actions">
          <a className="button dark" href="#students">{j.studentCta}<Arrow /></a>
          <a className="button ghost" href="#professors">{j.professorCta}<Arrow /></a>
        </div>
        <p className="jam-hero-where"><span>{c.place}</span><b>{j.next}: {nextJamWhen(locale)}</b></p>
      </div>
      <figure className="jam-hero-art">
        <JamTable caseWord={j.table.case} />
        <figcaption className="table-legend">
          <span className="legend-student">{j.table.students}</span>
          <span className="legend-professor">{j.table.professors}</span>
        </figcaption>
      </figure>
    </div>
  </section>;
}
