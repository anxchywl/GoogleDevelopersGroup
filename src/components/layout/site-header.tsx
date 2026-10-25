import { copy } from "@/content/copy";
import { event, jams } from "@/content/event";
import { localePath, type Locale, type PageId } from "@/content/types";
import { mailto, navLabel, pageNav } from "@/lib/site";
import { Arrow } from "../ui/arrow";
import { Wordmark } from "../ui/marks";
import { LanguageSwitcher } from "./language-switcher";

export function SiteHeader({ locale, page = "datathon" }: { locale: Locale; page?: PageId }) {
  const c = copy[locale];
  const channel = page === "events"
    ? { href: event.social.find((link) => link.id === "telegram")!.url, label: c.hub.headerCta }
    : page === "jams"
    ? { href: jams.telegram, label: c.jams.headerCta }
    : null;
  return <header className="site-header">
    <Wordmark locale={locale} title="GDG on Campus" subtitle="Nazarbayev University, Astana"
      href={page === "events" ? "#top" : localePath(locale, "events")} label={page === "events" ? c.home : c.hub.back} />
    {page !== "events" && <nav className="primary-nav" aria-label={navLabel[locale]}>
      {pageNav(locale, page).map((item) => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}
    </nav>}
    <div className="header-actions">
      <LanguageSwitcher locale={locale} label={c.language} page={page} />
      {channel
        ? <a className="button small dark header-cta header-cta-channel" href={channel.href} aria-label={channel.label} title={channel.label} target="_blank" rel="noopener noreferrer"><span>Telegram</span><Arrow diagonal /></a>
        : <a className="button small dark header-cta header-cta-email" href={mailto}>{c.emailCta}<Arrow diagonal /></a>}
    </div>
  </header>;
}
