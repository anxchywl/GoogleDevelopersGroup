import { copy } from "@/content/copy";
import { event } from "@/content/event";
import type { Locale } from "@/content/types";
import { eventDate, mailto, navIds, navLabel } from "@/lib/site";
import { BrandIcon } from "../ui/brand-icons";
import { Wordmark } from "../ui/marks";

export function SiteFooter({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <footer className="site-footer" id="contact">
    <div className="shell">
      <div className="footer-top">
        <div className="footer-brand">
          <Wordmark locale={locale} />
          <p className="footer-where"><span>{c.place}</span><b>{eventDate(locale, c.date)}</b></p>
        </div>
        <nav className="footer-links" aria-label={navLabel[locale]}>
          <div>
            <h3>{c.footerColumns[0]}</h3>
            {c.nav.map((item, i) => <a key={navIds[i]} href={`#${navIds[i]}`}>{item}</a>)}
          </div>
          <div className="footer-contacts">
            <h3>{c.footerColumns[1]}</h3>
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
