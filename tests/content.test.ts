import { describe, expect, it } from "vitest";
import { event, eventHistory, jams, packages } from "../src/content/event";
import { copy } from "../src/content/copy";
import { locales, localePath } from "../src/content/types";
import { numberShape } from "../src/lib/site";

function structure(value: unknown): unknown {
  if (typeof value === "string") { expect(value.trim()).not.toBe(""); return "text"; }
  if (typeof value === "number") return "number";
  if (Array.isArray(value)) return value.map(structure);
  return Object.fromEntries(Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, structure(item)]));
}

describe("publishable content", () => {
  it("keeps complete and structurally equivalent translations", () => {
    const shape = structure(copy.en);
    for (const locale of locales) expect(structure(copy[locale])).toEqual(shape);
  });
  it("keeps the hub copy free of dot separators", () => {
    for (const locale of locales) expect(copy[locale].hub.eyebrow).not.toContain("·");
  });
  it("keeps prize allocations separate from total package prices", () => {
    for (const pkg of packages) {
      if (pkg.prizePool.status !== "unknown") {
        const tracks = pkg.scope === "event" ? event.trackCount : 1;
        expect(pkg.awards.reduce((sum, amount) => sum + amount, 0) * tracks).toBe(pkg.prizePool.value);
      }
      expect(pkg.price.status).toBe("unknown");
    }
  });
  it("sources every published claim and keeps unconfirmed details out", () => {
    for (const claim of [event.email, event.organizerFull, event.affiliation, event.followers, event.participants, event.durationHours, event.dates]) {
      expect(claim.status).not.toBe("unknown");
      expect(claim.source).toBeTruthy();
    }
    for (const partner of event.pastPartners) {
      expect(partner.source).toBeTruthy();
      if (partner.url) expect(new URL(partner.url).protocol).toBe("https:");
    }
    expect(event.registration.status).toBe("unknown");
    if (event.dates.status !== "unknown") {
      const { start, end } = event.dates.value;
      expect(Date.parse(start)).toBeLessThan(Date.parse(end));
      expect(Math.round((Date.parse(end) - Date.parse(start)) / 86400000) + 1).toBe(event.dayCount);
    }
    expect(event.dates.value).toEqual({ start: "2027-03-13", end: "2027-03-14" });
    for (const locale of locales) expect(copy[locale].days).toHaveLength(event.dayCount);
  });
  it("requires permission and a confirmed relationship before a sponsor logo appears", () => {
    for (const sponsor of event.sponsors) {
      expect(sponsor.relationship.status).toBe("confirmed");
      expect(sponsor.permission.status).toBe("approved");
      expect(sponsor.logo).toMatch(/^\/(?!\/)/);
      expect(new URL(sponsor.url).protocol).toBe("https:");
    }
    for (const link of event.social) expect(new URL(link.url).protocol).toBe("https:");
    for (const url of [event.canonicalUrl, event.registration, event.githubUrl]) {
      if (url.status !== "unknown") expect(new URL(url.value).protocol).toBe("https:");
    }
  });
  it("captions every photograph in every language", () => {
    for (const locale of locales) for (const photo of event.photos) {
      expect(copy[locale].photos[photo.id as keyof typeof copy.en.photos]).toBeTruthy();
    }
  });
  it("keeps the event archive broad and every card image sourced", () => {
    expect(eventHistory.map(({ title }) => title.value)).toContain("Google Talks: How I Got My Internship");
    expect(eventHistory.map(({ title }) => title.value)).toContain("Google Talks: Road to Research Internships");
    expect(eventHistory.length).toBeGreaterThan(5);
    for (const item of eventHistory) {
      expect(item.title.status).toBe("confirmed");
      expect(item.title.source).toBeTruthy();
      expect(item.image.status).toBe("confirmed");
      expect(item.image.source).toBeTruthy();
      const file = item.image.value.file;
      expect(file).toBeTruthy();
      if (item.postUrl) expect(new URL(item.postUrl).protocol).toBe("https:");
      for (const locale of locales) {
        const descriptions = copy[locale].hub.history.images as Record<string, string>;
        expect(descriptions[item.id] ?? copy[locale].photos[item.id as keyof typeof copy.en.photos]).toBeTruthy();
      }
    }
  });
  it("counts grouped numbers as one value and keeps their shape", () => {
    const grouped = numberShape("1 024")!;
    expect(grouped.target).toBe(1024);
    expect(grouped.at(0)).toBe("0 000");
    expect(grouped.at(512)).toBe("0 512");
    expect(grouped.at(1024)).toBe("1 024");
    const plain = numberShape("300+")!;
    expect(plain.target).toBe(300);
    expect(plain.at(7)).toBe("007+");
    expect(numberShape("02")!.at(2)).toBe("02");
    expect(numberShape("no digits")).toBeNull();
    // every number the page animates must survive a round trip
    for (const locale of locales) {
      for (const item of copy[locale].stats) {
        const shape = numberShape(item.value)!;
        expect(shape.at(shape.target)).toBe(item.value);
      }
    }
  });
  it("records the completed jam and keeps the next date unannounced", () => {
    expect(jams.registration.status).toBe("unknown");
    expect(jams.next.status).toBe("unknown");
    const { date, start, end } = jams.last.value;
    expect(date).toBe("2026-10-22");
    expect(Number.isNaN(Date.parse(date))).toBe(false);
    expect(start < end).toBe(true);
    // the evening plan starts and ends with the announced times
    expect(jams.schedule.value[0]).toBe(start);
    expect(jams.schedule.value.at(-1)).toBe(end);
    for (const locale of locales) {
      expect(copy[locale].jams.steps.length).toBe(jams.schedule.value.length - 1);
      expect(copy[locale].jams.nextAnnouncement).toBeTruthy();
      expect(copy[locale].jams.completed).toBeTruthy();
      expect(copy[locale].jams.completedBody).toBeTruthy();
      expect(copy[locale].jams.dateLabel).toBeTruthy();
      expect(copy[locale].jams.upcomingLabel).toBeTruthy();
      expect(copy[locale].jams.upcomingTitle).toBeTruthy();
      expect(copy[locale].jams.nextBody).toBeTruthy();
      expect(copy[locale].hub.jams).toContain("22");
    }
  });
  it("routes English, Kazakh, and Russian without browser locale guessing", () => {
    expect(locales.map(locale => localePath(locale))).toEqual(["/", "/kk/", "/ru/"]);
    expect(locales.map(locale => localePath(locale, "datathon"))).toEqual(["/datathon/", "/kk/datathon/", "/ru/datathon/"]);
    expect(locales.map(locale => localePath(locale, "jams"))).toEqual(["/jams/", "/kk/jams/", "/ru/jams/"]);
    expect(locales.map(locale => localePath(locale, "events"))).toEqual(["/", "/kk/", "/ru/"]);
  });
});
