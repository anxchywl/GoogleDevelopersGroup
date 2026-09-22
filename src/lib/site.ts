import { event, jams } from "@/content/event";
import { copy } from "@/content/copy";
import type { Locale, PageId } from "@/content/types";

export const navIds = ["value", "event", "packages", "community"] as const;
export const jamsNavIds = ["about", "format", "join", "next"] as const;
export const pageNav = (locale: Locale, page: PageId) => {
  const labels = page === "jams" ? copy[locale].jams.nav : copy[locale].nav;
  const ids = page === "jams" ? jamsNavIds : navIds;
  return labels.map((label, i) => ({ id: ids[i], label }));
};
export const navLabel: Record<Locale, string> = {
  en: "Main navigation", kk: "Негізгі мәзір", ru: "Основная навигация",
};
const intlTag: Record<Locale, string> = { en: "en-GB", kk: "kk-KZ", ru: "ru-RU" };

// the address is published, but the fallback keeps the page usable if it is ever pulled
export const mailto = event.email.status === "confirmed" ? `mailto:${event.email.value}` : "#community";

export const money = (locale: Locale, value: number) =>
  new Intl.NumberFormat(intlTag[locale], { style: "currency", currency: "KZT", maximumFractionDigits: 0 }).format(value);

export const plain = (locale: Locale, value: number) => new Intl.NumberFormat(intlTag[locale]).format(value);

// "22 October, 18:00 to 20:00" in the reader's language
export const nextJamWhen = (locale: Locale) => {
  const { date, start, end } = jams.next.value;
  const day = new Intl.DateTimeFormat(intlTag[locale], { day: "numeric", month: "long" }).format(new Date(date));
  return `${day}, ${copy[locale].jams.timeRange.replace("{start}", start).replace("{end}", end)}`;
};

// a ticket stub shows the day large and the month and year small
export const stubDate = (locale: Locale, iso: string) => ({
  day: new Intl.DateTimeFormat(intlTag[locale], { day: "2-digit" }).format(new Date(iso)),
  rest: new Intl.DateTimeFormat(intlTag[locale], { month: "long", year: "numeric" }).format(new Date(iso)),
});

// minutes between two "hh:mm" times on the same day
export const minutesBetween = (from: string, to: string) => {
  const at = (time: string) => { const [h, m] = time.split(":").map(Number); return h * 60 + m; };
  return at(to) - at(from);
};

export const eventDate = (locale: Locale, fallback: string) => {
  if (event.dates.status === "unknown") return fallback;
  const { start, end } = event.dates.value;
  return new Intl.DateTimeFormat(intlTag[locale], { day: "numeric", month: "long", year: "numeric" })
    .formatRange(new Date(start), new Date(end));
};

// a grouped number like "1 024" counts as one value while keeping its grouping and width
export function numberShape(text: string) {
  const group = text.match(/\d[\d\u0020\u00a0\u202f]*\d|\d/);
  if (!group) return null;
  const shape = group[0];
  const digits = shape.replace(/\D/g, "");
  return {
    target: Number(digits),
    at(value: number) {
      const padded = String(value).padStart(digits.length, "0");
      let i = 0;
      return text.replace(shape, shape.replace(/\d/g, () => padded[i++]));
    },
  };
}
