"use client";
import { useState, useSyncExternalStore, type CSSProperties } from "react";

const LINES = [
  { code: "def count_vowels(text):", indent: 0 },
  { code: "total = 0", indent: 1 },
  { code: "for ch in text.lower():", indent: 1 },
  { code: "if ch in \"aeiou\":", indent: 2 },
  { code: "total += 1", indent: 3 },
  { code: "return total", indent: 1 },
];
const FIRST_SHUFFLE = [3, 5, 1, 4, 0, 2];
const noop = () => () => {};

type Labels = { hint: string; done: string; again: string };

// without javascript the finished function is what ships; with it the reader rebuilds it line by line
export function CodePuzzle({ labels }: { labels: Labels }) {
  const ready = useSyncExternalStore(noop, () => true, () => false);
  const [pool, setPool] = useState(FIRST_SHUFFLE);
  const [placed, setPlaced] = useState<number[]>([]);
  const [miss, setMiss] = useState<number | null>(null);
  const solved = placed.length === LINES.length;

  const line = (i: number, indent = true) => <span className="puzzle-line" style={{ "--indent": indent ? LINES[i].indent : 0 } as CSSProperties}>{LINES[i].code}</span>;

  if (!ready) return <pre className="puzzle-board"><code>{LINES.map((_, i) => <span key={i}>{line(i)}</span>)}</code></pre>;

  const pick = (i: number) => {
    if (i !== placed.length) { setMiss(i); window.setTimeout(() => setMiss(null), 420); return; }
    setPlaced([...placed, i]);
  };
  const reshuffle = () => {
    setPlaced([]);
    setPool([...LINES.keys()].sort(() => Math.random() - 0.5));
  };

  return <div className="puzzle" data-solved={solved || undefined}>
    <pre className="puzzle-board"><code>
      {placed.map((i) => <span key={i} className="placed">{line(i)}</span>)}
      {LINES.slice(placed.length).map((_, i) => <span key={`slot${i}`} className="slot" />)}
    </code></pre>
    {!solved && <div className="puzzle-pool">{pool.filter((i) => !placed.includes(i)).map((i) =>
      <button key={i} type="button" onClick={() => pick(i)} data-miss={miss === i || undefined}>{line(i, false)}</button>
    )}</div>}
    <div className="puzzle-foot">
      <span className={solved ? "micro" : "sr-only"} aria-live="polite">{solved ? labels.done : labels.hint}</span>
      {placed.length > 0 && <button type="button" className="text-link" onClick={reshuffle}>{labels.again}</button>}
    </div>
  </div>;
}
