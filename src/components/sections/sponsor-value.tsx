import type { CSSProperties } from "react";
import { copy } from "@/content/copy";
import type { Locale } from "@/content/types";
import { ValueIcon } from "../ui/diagrams";

export function SponsorValue({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <section id="value" className="section value-section" aria-labelledby="value-title"><div className="shell">
    <div className="section-heading" data-reveal>
      <p className="eyebrow" data-decode>{c.valueLabel}</p>
      <h2 id="value-title">{c.valueTitle}</h2>
    </div>
    <div className="value-grid">{c.values.map((value, i) => <article key={value.title} data-reveal style={{ "--delay": `${i * 80}ms` } as CSSProperties}>
      <div className={`value-icon icon-${i}`}><ValueIcon index={i} /></div>
      <h3>{value.title}</h3><p>{value.body}</p>
    </article>)}</div>
  </div></section>;
}
