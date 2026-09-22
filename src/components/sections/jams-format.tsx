import { copy } from "@/content/copy";
import { jams } from "@/content/event";
import type { Locale } from "@/content/types";
import { minutesBetween } from "@/lib/site";
import { CodePuzzle } from "../ui/code-puzzle";
import { BingoCard } from "../ui/jam-visuals";

export function JamsFormat({ locale }: { locale: Locale }) {
  const j = copy[locale].jams;
  const times = jams.schedule.value;
  const lengths = j.steps.map((_, i) => minutesBetween(times[i], times[i + 1]));
  const columns = lengths.map((length) => `${length}fr`).join(" ");
  return <section id="format" className="section format-section" aria-labelledby="format-title"><div className="shell">
    <div className="section-heading" data-reveal>
      <p className="eyebrow" data-decode>{j.formatLabel}</p>
      <h2 id="format-title">{j.formatTitle}</h2>
      <p>{j.formatBody}</p>
    </div>

    <div className="timebar" data-reveal style={{ gridTemplateColumns: columns }}>
      {j.steps.map((step, i) => <div key={step.title} className={`slot-${i}`}>
        <span className="timebar-seg" aria-hidden="true" />
        <p className="timebar-time"><time>{times[i]}</time><span>{lengths[i]} {j.minutes}</span></p>
        <h3>{step.title}</h3>
        {"body" in step && <p className="timebar-body">{step.body}</p>}
      </div>)}
      <time className="timebar-end" aria-hidden="true">{times[times.length - 1]}</time>
    </div>

    <p className="eyebrow games-label" data-reveal data-decode>{j.warmupsLabel}</p>
    <div className="games">
      <article className="game game-puzzle" data-reveal>
        <div className="game-head"><h3>{j.puzzles.title}</h3><span className="game-glyph" aria-hidden="true">{"</>"}</span></div>
        <p className="game-body">{j.puzzles.body}</p>
        <CodePuzzle labels={{ hint: j.puzzles.hint, done: j.puzzles.done, again: j.puzzles.again }} />
      </article>
      <article className="game game-bingo" data-reveal>
        <div className="game-head"><h3>{j.bingo.title}</h3><span className="game-glyph" aria-hidden="true">[x]</span></div>
        <p className="game-body">{j.bingo.body}</p>
        <BingoCard cells={j.bingo.cells} label={j.bingo.sample} win={j.bingo.win} />
      </article>
    </div>

    <div className="jury" data-reveal>
      <p className="eyebrow" data-decode>{j.criteriaLabel}</p>
      <table className="jury-sheet">
        <thead><tr><th scope="col"><span className="sr-only">#</span></th>{j.criteriaHead.map((head) => <th key={head} scope="col">{head}</th>)}</tr></thead>
        <tbody>{jams.criteria.value.map((id, i) => <tr key={id} className={`row-${i}`}>
          <td className="jury-n">{String(i + 1).padStart(2, "0")}</td>
          <th scope="row">{j.criteria[id].title}</th>
          <td>{j.criteria[id].body}</td>
          <td className="jury-score"><span aria-hidden="true">{Array.from({ length: 5 }, (_, k) => <i key={k} />)}</span></td>
        </tr>)}</tbody>
      </table>
    </div>
  </div></section>;
}
