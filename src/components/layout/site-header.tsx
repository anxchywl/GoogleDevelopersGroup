import { copy } from "@/content/copy";
import type { Locale } from "@/content/types";
import { mailto, navIds, navLabel } from "@/lib/site";
import { Arrow } from "../ui/arrow";
import { Wordmark } from "../ui/marks";
import { LanguageSwitcher } from "./language-switcher";

export function SiteHeader({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <header className="site-header">
    <Wordmark locale={locale} />
    <nav className="primary-nav" aria-label={navLabel[locale]}>
      {c.nav.map((item, i) => <a key={navIds[i]} href={`#${navIds[i]}`}>{item}</a>)}
    </nav>
    <div className="header-actions">
      <LanguageSwitcher locale={locale} label={c.language} />
      <a className="button small dark header-cta" href={mailto}>{c.partner}<Arrow diagonal /></a>
    </div>
  </header>;
}
