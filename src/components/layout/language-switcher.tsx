import { localePath, locales, type Locale } from "@/content/types";

const names = { en: "English", kk: "Қазақша", ru: "Русский" };
const short = { en: "EN", kk: "ҚАЗ", ru: "РУС" };
// the default language reads best between the two it was translated into
const order: Locale[] = ["kk", "en", "ru"];

// language links land at the top of the translated page rather than jumping to a section
export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  // phones get one button that steps through the languages instead of three
  const next = locales[(locales.indexOf(locale) + 1) % locales.length];
  return <>
    <nav className="language-switcher" aria-label={label}>{order.map((item) =>
      <a key={item} href={localePath(item)} hrefLang={item} lang={item} aria-label={names[item]}
        aria-current={item === locale ? "page" : undefined}>{short[item]}</a>
    )}</nav>
    <a className="language-cycle" href={localePath(next)} hrefLang={next} lang={next} aria-label={names[next]}>
      <span lang={locale}>{short[locale]}</span>
    </a>
  </>;
}
