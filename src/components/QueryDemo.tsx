"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import clsx from "clsx";

/*
 * Concept demo of the Text-to-SQL project: question → intent → SQL → rows.
 * The table and values are made-up sample data for illustration only.
 */

type Example = {
  q: string;
  intent: string;
  sql: string;
  cols: string[];
  rows: (string | number)[][];
  flagCol?: number;
};

const examples: Example[] = [
  {
    q: "Show high-value transactions marked suspicious",
    intent: "FILTER",
    sql: "SELECT txn_id, amount, risk\nFROM upi_txns\nWHERE amount > 50000\n  AND label = 'suspicious';",
    cols: ["txn_id", "amount", "risk"],
    rows: [
      ["T-1042", "₹72,400", "0.91"],
      ["T-1187", "₹58,900", "0.84"],
    ],
    flagCol: 2,
  },
  {
    q: "How many transactions per city?",
    intent: "AGGREGATE",
    sql: "SELECT city, COUNT(*) AS txns\nFROM upi_txns\nGROUP BY city;",
    cols: ["city", "txns"],
    rows: [
      ["Noida", 412],
      ["Bareilly", 268],
      ["Delhi", 655],
    ],
  },
  {
    q: "Top 3 merchants by total amount",
    intent: "RANK",
    sql: "SELECT merchant, SUM(amount) AS total\nFROM upi_txns\nGROUP BY merchant\nORDER BY total DESC\nLIMIT 3;",
    cols: ["merchant", "total"],
    rows: [
      ["M-Grocer", "₹4.2L"],
      ["M-Fuel", "₹3.1L"],
      ["M-Books", "₹1.7L"],
    ],
  },
];

const KW = /\b(SELECT|FROM|WHERE|AND|GROUP BY|ORDER BY|DESC|LIMIT|AS|COUNT|SUM)\b/;
const isKW = (s: string) => /^(SELECT|FROM|WHERE|AND|GROUP BY|ORDER BY|DESC|LIMIT|AS|COUNT|SUM)$/.test(s);

function Sql({ code }: { code: string }) {
  return (
    <>
      {code.split("\n").map((line, i) => (
        <motion.span
          key={i}
          className="block"
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08, duration: 0.3 }}
        >
          {line.split(KW).map((part, j) =>
            isKW(part) ? (
              <span key={j} className="text-sky">{part}</span>
            ) : (
              <span key={j} className="text-paper/75">
                {part.split(/('[^']*'|\b\d+\b)/).map((t, k) =>
                  /^'.*'$/.test(t) ? <span key={k} className="text-coral">{t}</span> : /^\d+$/.test(t) ? <span key={k} className="text-mint">{t}</span> : t,
                )}
              </span>
            ),
          )}
        </motion.span>
      ))}
    </>
  );
}

type Phase = "typing" | "intent" | "sql" | "rows";

export function QueryDemo() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const ex = examples[idx];

  useEffect(() => {
    if (reduce) {
      setTyped(ex.q.length);
      setPhase("rows");
      return;
    }
    setTyped(0);
    setPhase("typing");
    const timers: ReturnType<typeof setTimeout>[] = [];
    let i = 0;
    const tick = () => {
      i += 1;
      setTyped(i);
      if (i < ex.q.length) timers.push(setTimeout(tick, 32));
      else {
        timers.push(setTimeout(() => setPhase("intent"), 350));
        timers.push(setTimeout(() => setPhase("sql"), 1000));
        timers.push(setTimeout(() => setPhase("rows"), 1900));
        timers.push(setTimeout(() => setIdx((n) => (n + 1) % examples.length), 6500));
      }
    };
    timers.push(setTimeout(tick, 700));
    return () => timers.forEach(clearTimeout);
  }, [idx, ex.q.length, reduce]);

  const at = (p: Phase) => ["typing", "intent", "sql", "rows"].indexOf(phase) >= ["typing", "intent", "sql", "rows"].indexOf(p);

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-px rounded-[22px]"
        style={{ background: "linear-gradient(150deg, rgba(110,231,200,.45), rgba(255,255,255,.04) 35%, rgba(255,255,255,.02) 70%, rgba(122,162,255,.35))" }}
      />
      <figure className="relative overflow-hidden rounded-[21px] bg-night-900">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-mint/15">
              <Sparkles className="h-3.5 w-3.5 text-mint" />
            </span>
            <span className="text-[13px] font-medium">text-to-sql</span>
          </div>
          <div className="flex gap-1" role="tablist" aria-label="Example questions">
            {examples.map((e, i) => (
              <button
                key={e.intent}
                role="tab"
                aria-selected={i === idx}
                aria-label={`Example ${i + 1}: ${e.q}`}
                onClick={() => setIdx(i)}
                className={clsx("h-1.5 rounded-full transition-all", i === idx ? "w-6 bg-mint" : "w-1.5 bg-white/20 hover:bg-white/40")}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4 p-5 sm:p-6">
          {/* Question */}
          <div className="rounded-xl border border-white/[0.08] bg-night-950/70 px-4 py-3">
            <p className="eyebrow mb-1.5 !text-[10px]">Ask in plain English</p>
            <p className="min-h-[1.5rem] text-[15px] text-paper" aria-live="polite">
              {ex.q.slice(0, typed)}
              {phase === "typing" && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] animate-blink bg-mint" />}
            </p>
          </div>

          {/* Intent */}
          <div className="flex min-h-[26px] items-center gap-2 font-mono text-[11px]">
            <AnimatePresence mode="wait">
              {at("intent") && (
                <motion.div key={ex.intent} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <span className="text-mute">classifier →</span>
                  <span className="rounded-md border border-mint/30 bg-mint/10 px-2 py-0.5 text-mint">intent: {ex.intent}</span>
                  {at("sql") && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-mute">
                      ✓ validated
                    </motion.span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SQL */}
          <pre className="min-h-[124px] overflow-x-auto rounded-xl bg-night-950/70 px-4 py-3 font-mono text-[12.5px] leading-[1.7]">
            {at("sql") ? <Sql key={idx} code={ex.sql} /> : <span className="text-white/20">-- waiting for query…</span>}
          </pre>

          {/* Rows */}
          <div className="min-h-[118px]">
            <AnimatePresence mode="wait">
              {at("rows") && (
                <motion.table
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="w-full font-mono text-[12px]"
                >
                  <thead>
                    <tr className="text-left text-mute">
                      {ex.cols.map((c) => (
                        <th key={c} className="border-b border-white/[0.08] pb-2 font-normal">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ex.rows.map((r, ri) => (
                      <motion.tr key={ri} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 + ri * 0.08 }}>
                        {r.map((cell, ci) => (
                          <td key={ci} className={clsx("border-b border-white/[0.04] py-1.5", ci === ex.flagCol ? "text-coral" : "text-paper/85")}>
                            {cell}
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </tbody>
                </motion.table>
              )}
            </AnimatePresence>
          </div>
        </div>
        <figcaption className="border-t border-white/[0.06] px-5 py-2.5 font-mono text-[10px] text-mute">
          Concept demo of my Text-to-SQL project · sample data
        </figcaption>
      </figure>
    </div>
  );
}
