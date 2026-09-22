import type { CSSProperties } from "react";

// seats sit on a wider ellipse around the table; professors are tiles, students are rounds
const SEATS = [
  { x: 220, y: 60, kind: "professor", color: "var(--red)" },
  { x: 349, y: 106, kind: "student", color: "var(--blue)" },
  { x: 378, y: 190, kind: "student", color: "var(--green)" },
  { x: 300, y: 266, kind: "professor", color: "var(--amber)" },
  { x: 140, y: 266, kind: "student", color: "var(--amber)" },
  { x: 62, y: 190, kind: "student", color: "var(--blue)" },
  { x: 91, y: 106, kind: "student", color: "var(--green)" },
] as const;

// on hover every seat leans a few pixels toward the middle of the table
const lean = ({ x, y }: { x: number; y: number }) => {
  const dx = 220 - x, dy = 168 - y, length = Math.hypot(dx, dy);
  return { "--lean-x": `${((dx / length) * 9).toFixed(1)}px`, "--lean-y": `${((dy / length) * 9).toFixed(1)}px` };
};

export function JamTable({ caseWord }: { caseWord: string }) {
  return <svg className="jam-table" viewBox="0 0 440 330" fill="none" aria-hidden="true">
    <ellipse className="table-ring" cx="220" cy="168" rx="178" ry="128" />
    {SEATS.map((seat, i) => <line key={`l${i}`} className="idea-line" x1={seat.x} y1={seat.y} x2="220" y2="168" style={{ "--i": i } as CSSProperties} />)}
    <ellipse className="table-top" cx="220" cy="168" rx="122" ry="74" />
    <g className="case-card-svg">
      <rect x="170" y="140" width="100" height="58" rx="8" />
      <text x="182" y="160">{caseWord}</text>
      <path d="M182 172h74M182 182h52" />
    </g>
    {SEATS.map((seat, i) => <g key={i} className={`seat seat-${seat.kind}`} style={{ "--i": i, "--seat": seat.color, ...lean(seat) } as CSSProperties}>
      {seat.kind === "professor"
        ? <path d={`M${seat.x - 19} ${seat.y - 16}a3 3 0 0 1 3-3h32a3 3 0 0 1 3 3v32a3 3 0 0 1-3 3h-24a11 11 0 0 1-11-11Z`} />
        : <circle cx={seat.x} cy={seat.y} r="19" />}
    </g>)}
  </svg>;
}

// every row, column and diagonal of the card, so css can call a full line without javascript
export const BINGO_LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

export function BingoCard({ cells, label, win }: { cells: readonly string[]; label: string; win: string }) {
  return <fieldset className="bingo">
    <legend className="sr-only">{label}</legend>
    <div className="bingo-head" aria-hidden="true">{"BINGO".split("").map((letter, i) => <span key={i}>{letter}</span>)}</div>
    <div className="bingo-grid">{cells.map((cell, i) => <label key={cell} className={`bingo-cell b${i}`}>
      <input type="checkbox" /><span>{cell}</span>
    </label>)}</div>
    <p className="bingo-win" aria-hidden="true">{win}</p>
  </fieldset>;
}
