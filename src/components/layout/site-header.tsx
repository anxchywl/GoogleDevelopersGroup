import { copy } from "@/content/copy";
import { jams } from "@/content/event";
import type { Locale, PageId } from "@/content/types";
import { mailto, navLabel, pageNav } from "@/lib/site";
import { Arrow } from "../ui/arrow";
import { Wordmark } from "../ui/marks";
import { LanguageSwitcher } from "./language-switcher";

export function SiteHeader({ locale, page = "datathon" }: { locale: Locale; page?: PageId }) {
  const c = copy[locale];
  return <header className="site-header">
    <Wordmark locale={locale} title={page === "jams" ? jams.name : undefined} />
    <nav className="primary-nav" aria-label={navLabel[locale]}>
      {pageNav(locale, page).map((item) => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}
    </nav>
    <div className="header-actions">
      <LanguageSwitcher locale={locale} label={c.language} page={page} />
      {page === "jams"
        ? <a className="button small dark header-cta" href={jams.telegram} target="_blank" rel="noopener noreferrer">{c.jams.headerCta}<Arrow diagonal /></a>
        : <a className="button small dark header-cta" href={mailto}>{c.partner}<Arrow diagonal /></a>}
    </div>
  </header>;
}
