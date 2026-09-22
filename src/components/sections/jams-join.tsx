import { copy } from "@/content/copy";
import { jams } from "@/content/event";
import type { Locale } from "@/content/types";
import { mailto } from "@/lib/site";
import { Arrow } from "../ui/arrow";
import { GdgMark } from "../ui/marks";

export function JamsJoin({ locale }: { locale: Locale }) {
  const j = copy[locale].jams;
  const sides = [
    { id: "students", text: j.students, href: jams.telegram, external: true },
    { id: "professors", text: j.professors, href: `${mailto}?subject=${encodeURIComponent(jams.name)}`, external: false },
  ];
  return <section id="join" className="section shell" aria-labelledby="join-title">
    <div className="section-heading" data-reveal>
      <p className="eyebrow" data-decode>{j.joinLabel}</p>
      <h2 id="join-title">{j.joinTitle}</h2>
    </div>
    <div className="split" data-reveal>
      {sides.map((side, i) => <article key={side.id} id={side.id} className={`side side-${side.id}`}>
        <p className="micro">{side.text.tag}</p>
        <h3>{side.text.title}</h3>
        <ol className="reasons">{side.text.benefits.map((benefit, k) => <li key={benefit}>
          <span className="reason-n" aria-hidden="true">{String(k + 1).padStart(2, "0")}</span><span>{benefit}</span>
        </li>)}</ol>
        <a className={`button ${i === 0 ? "dark" : "ghost"}`} href={side.href} {...(side.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {side.text.cta}<Arrow diagonal />
        </a>
      </article>)}
      <span className="split-badge" aria-hidden="true"><GdgMark /></span>
    </div>
  </section>;
}
