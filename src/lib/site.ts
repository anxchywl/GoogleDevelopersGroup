import { event } from "@/content/event";
import type { Locale } from "@/content/types";

export const navIds = ["value", "event", "packages", "community"] as const;
export const navLabel: Record<Locale, string> = {
  en: "Main navigation", kk: "Негізгі мәзір", ru: "Основная навигация",
};
const intlTag: Record<Locale, string> = { en: "en-GB", kk: "kk-KZ", ru: "ru-RU" };

// the address is published, but the fallback keeps the page usable if it is ever pulled
export const mailto = event.email.status === "confirmed" ? `mailto:${event.email.value}` : "#community";

export const money = (locale: Locale, value: number) =>
  new Intl.NumberFormat(intlTag[locale], { style: "currency", currency: "KZT", maximumFractionDigits: 0 }).format(value);

export const plain = (locale: Locale, value: number) => new Intl.NumberFormat(intlTag[locale]).format(value);

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
