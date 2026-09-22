import { copy } from "@/content/copy";
import type { Locale } from "@/content/types";

export function JamsAbout({ locale }: { locale: Locale }) {
  const j = copy[locale].jams;
  return <section id="about" className="section shell" aria-labelledby="about-title">
    <div className="about-grid">
      <div data-reveal>
        <p className="eyebrow" data-decode>{j.aboutLabel}</p>
        <h2 id="about-title">{j.aboutTitle}</h2>
        <p className="lead about-lead">{j.aboutBody}</p>
      </div>
      <table className="compare" data-reveal>
        <caption className="sr-only">{j.compare.caption}</caption>
        <thead><tr><th scope="col">{j.compare.lecture}</th><th scope="col">{j.compare.jam}</th></tr></thead>
        <tbody>{j.compare.rows.map((row, i) => <tr key={row.jam}>
          <td><span className="struck" style={{ transitionDelay: `${300 + i * 140}ms` }}>{row.lecture}</span></td>
          <td>{row.jam}</td>
        </tr>)}</tbody>
      </table>
    </div>
  </section>;
}
