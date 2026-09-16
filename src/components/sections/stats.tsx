import { copy } from "@/content/copy";
import type { Locale } from "@/content/types";

export function Stats({ locale }: { locale: Locale }) {
  return <div className="stats-band" data-reveal><div className="shell stats-grid">
    {copy[locale].stats.map((item) => <div key={item.label}>
      <span className="stat-value" data-count>{item.value}</span>
      <span className="stat-label">{item.label}</span>
    </div>)}
  </div></div>;
}
