import { copy } from "@/content/copy";
import { event, jams } from "@/content/event";
import { localePath, type Locale, type PageId } from "@/content/types";
import { mailto, navLabel } from "@/lib/site";
import { BrandIcon } from "../ui/brand-icons";
import { Wordmark } from "../ui/marks";

// the footer speaks for the chapter, so it reads the same on every page
export function SiteFooter({ locale, page = "datathon" }: { locale: Locale; page?: PageId }) {
  const c = copy[locale];
  const events = [{ page: "datathon", name: event.name }, { page: "jams", name: jams.name }] as const;
  return <footer className="site-footer" id="contact">
    <div className="shell">
      <div className="footer-top">
        <div className="footer-brand">
          <Wordmark locale={locale} title="GDG on Campus" subtitle={c.place} />
          <p className="footer-about">{c.orgBody}</p>
        </div>
        <nav className="footer-links" aria-label={navLabel[locale]}>
          <div>
            <h3>{c.footerEvents}</h3>
            {events.map((item) => <a key={item.page} href={localePath(locale, item.page)} aria-current={item.page === page ? "page" : undefined}>{item.name}</a>)}
          </div>
          <div className="footer-contacts">
            <h3>{c.footerContact}</h3>
            {event.email.status === "confirmed" && <a href={mailto}><BrandIcon id="email" />{event.email.value}</a>}
            {event.social.map((link) => <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"><BrandIcon id={link.id} />{link.handle}</a>)}
          </div>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {c.rights}</span>
        {event.githubUrl.status === "confirmed" && <a className="footer-source" href={event.githubUrl.value} target="_blank" rel="noopener noreferrer"><BrandIcon id="github" />{c.sourceCode}</a>}
      </div>
    </div>
  </footer>;
}
