import { copy } from "@/content/copy";
import { packages } from "@/content/event";
import type { Locale } from "@/content/types";
import { mailto, money, plain } from "@/lib/site";
import { Arrow } from "../ui/arrow";

export function Packages({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const price = (value: number) => money(locale, value);
  return <section id="packages" className="section shell" aria-labelledby="packages-title">
    <div className="section-heading" data-reveal>
      <p className="eyebrow" data-decode>{c.packagesLabel}</p>
      <h2 id="packages-title">{c.packagesTitle}</h2>
    </div>
    <div className="packages">{packages.map((pkg, i) => {
      const text = c.packages[pkg.id];
      return <details key={pkg.id} className={`package package-${i}`} data-reveal>
        <summary>
          <span className="package-number">0{i + 1}</span>
          <span className="package-name">
            <span className="micro">{c.scopeLabels[i]}</span>
            <h3>{text.title}</h3>
            <span className="package-intro">{text.intro}</span>
          </span>
          <span className="expand-icon" aria-hidden="true"><i>+</i></span>
        </summary>
        <div className="package-content">
          <div>
            <ul className="benefits">{text.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
            <p className="muted small-copy">{text.note}</p>
          </div>
          <aside className="package-budget">
            {pkg.prizePool.status !== "unknown" && <>
              <div className="budget-row">
                <span className="micro">{pkg.prizePool.status === "confirmed" ? c.prizeFund : c.proposedFund}</span>
                <b>{price(pkg.prizePool.value)}</b>
              </div>
              <div className="budget-row">
                <span className="micro">{c.perTrack}</span>
                <span className="award-list">{pkg.awards.map((amount) => plain(locale, amount)).join(" / ")}</span>
              </div>
            </>}
            <div className="budget-row">
              <span className="micro">{c.packagePrice}</span>
              <strong>{pkg.price.status === "unknown" ? c.toDiscuss : price(pkg.price.value)}</strong>
            </div>
            <p className="small-copy">{c.fundingNote}</p>
            <a href={mailto} className="text-link">{c.partner}<Arrow diagonal /></a>
          </aside>
        </div>
      </details>;
    })}</div>
  </section>;
}
