import type { CSSProperties } from "react";
import { copy } from "@/content/copy";
import type { Locale } from "@/content/types";

// four capsules traced from the chapter profile mark, drawn at their measured endpoints
const ARMS = [
  { id: "red", color: "#ea4335", d: "M123 256 200 200", from: "-26px -20px", delay: "0ms" },
  { id: "blue", color: "#4285f4", d: "M123 256 200 312", from: "-26px 20px", delay: "70ms" },
  { id: "amber", color: "#f9ab01", d: "M311 312 389 256", from: "26px 20px", delay: "140ms" },
  { id: "green", color: "#34a853", d: "M311 200 389 256", from: "26px -20px", delay: "210ms" },
];

export function GdgMark({ animate = false, className = "" }: { animate?: boolean; className?: string }) {
  return <svg className={`gdg-mark ${className}`} viewBox="74 151 364 210" fill="none" aria-hidden="true" data-animate={animate || undefined}>
    {ARMS.map((arm) => <g key={arm.id} className="gdg-arm" style={{ "--from": arm.from, "--delay": arm.delay } as CSSProperties}>
      <g className="gdg-pulse">
        <path d={arm.d} stroke="#1f2120" strokeWidth="78" strokeLinecap="round" />
        <path d={arm.d} stroke={arm.color} strokeWidth="66" strokeLinecap="round" />
      </g>
    </g>)}
  </svg>;
}

// every page signs with the chapter mark; the datathon tiles live in its hero
export function Wordmark({ locale, title = "NU Datathon", subtitle }: { locale: Locale; title?: string; subtitle?: string }) {
  const c = copy[locale];
  return <a className="wordmark" href="#top" aria-label={c.home}>
    <GdgMark animate className="wordmark-mark" />
    <span className="wordmark-text"><b>{title}</b><small>{subtitle ?? c.by}</small></span>
  </a>;
}
