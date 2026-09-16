"use client";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { event } from "@/content/event";
import { copy } from "@/content/copy";
import type { Locale } from "@/content/types";

const CONTROLS = {
  en: { prev: "Previous photos", next: "Next photos" },
  kk: { prev: "Алдыңғы фотолар", next: "Келесі фотолар" },
  ru: { prev: "Предыдущие фото", next: "Следующие фото" },
};

const QUERY = "(prefers-reduced-motion: reduce)";

export function Gallery({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const rail = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const subscribe = useCallback((notify: () => void) => {
    const media = window.matchMedia(QUERY);
    media.addEventListener("change", notify);
    return () => media.removeEventListener("change", notify);
  }, []);
  // server and first paint assume reduced motion, so the scrollable fallback is what ships in the HTML
  const linked = !useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => true);

  // with motion allowed the rail rides the page scroll instead of its own scrollbar
  useEffect(() => {
    if (!linked) return;
    let frame = 0;
    const apply = () => {
      frame = 0;
      const box = rail.current, inner = track.current;
      if (!box || !inner) return;
      const distance = Math.max(0, inner.scrollWidth - box.clientWidth);
      const bounds = box.getBoundingClientRect();
      const span = window.innerHeight + bounds.height;
      const progress = Math.max(0, Math.min(1, (window.innerHeight - bounds.top) / span));
      inner.style.setProperty("--shift", `${-(progress * distance).toFixed(1)}px`);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(apply); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    apply();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [linked]);

  const step = (direction: 1 | -1) => {
    const box = rail.current;
    if (!box) return;
    const card = box.querySelector("li");
    box.scrollBy({ left: direction * ((card?.clientWidth ?? 320) + 18), behavior: "smooth" });
  };

  return <div className="gallery" data-reveal>
    <div className="gallery-head">
      <p className="eyebrow" data-decode>{c.galleryLabel}</p>
      {!linked && <div className="gallery-controls">
        <button type="button" onClick={() => step(-1)} aria-label={CONTROLS[locale].prev}>‹</button>
        <button type="button" onClick={() => step(1)} aria-label={CONTROLS[locale].next}>›</button>
      </div>}
    </div>
    <div className="gallery-rail" ref={rail} data-linked={linked || undefined}
      tabIndex={linked ? undefined : 0} role={linked ? undefined : "region"} aria-label={linked ? undefined : c.galleryLabel}>
      <ul ref={track}>{event.photos.map((photo) => <li key={photo.id}>
        <img src={`/events/${photo.file}.webp`} srcSet={`/events/${photo.file}-600.webp 600w, /events/${photo.file}.webp 1200w`}
          sizes="(max-width: 640px) 78vw, 380px" width={photo.width} height={photo.height} loading="lazy" decoding="async"
          alt={c.photos[photo.id as keyof typeof c.photos]} />
        <span>{c.photos[photo.id as keyof typeof c.photos]}</span>
      </li>)}</ul>
    </div>
  </div>;
}
