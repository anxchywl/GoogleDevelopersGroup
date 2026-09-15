import type { CSSProperties } from "react";
import { copy } from "@/content/copy";
import type { Locale } from "@/content/types";

// event mark: four rounded tiles, one corner of each turned outward
export function Mark({ className = "" }: { className?: string }) {
  return <span className={`mark ${className}`} aria-hidden="true"><i /><i /><i /><i /></span>;
}

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

export function Wordmark({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <a className="wordmark" href="#top" aria-label={c.home}>
    <Mark />
    <span className="wordmark-text"><b>NU Datathon</b><small>{c.by}</small></span>
  </a>;
}
