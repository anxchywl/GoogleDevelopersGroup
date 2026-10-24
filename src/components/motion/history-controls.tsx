"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function HistoryControls({ railId, previous, next }: { railId: string; previous: string; next: string }) {
  const ready = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const move = (direction: -1 | 1) => {
    const rail = document.getElementById(railId);
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>(".history-card");
    const style = getComputedStyle(rail);
    const gap = Number.parseFloat(style.columnGap || style.gap) || 16;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    rail.scrollBy({ left: direction * ((card?.offsetWidth ?? 320) + gap), behavior });
  };

  return <div className="history-controls" hidden={!ready}>
    <button type="button" onClick={() => move(-1)} aria-label={previous}>←</button>
    <button type="button" onClick={() => move(1)} aria-label={next}>→</button>
  </div>;
}
