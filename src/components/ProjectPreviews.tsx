"use client";

import { motion } from "framer-motion";
import { Database, Filter, MessageSquareText, ShieldCheck, Table2 } from "lucide-react";

/*
 * Code-drawn illustrations of each project's core idea (not screenshots, sample data only).
 * Replace with real screenshots when available.
 */

// Deterministic pseudo-random points so server and client render identically.
const points = Array.from({ length: 46 }, (_, i) => {
  const x = ((i * 37) % 97) + 1.5;
  const y = 18 + ((i * 53) % 61);
  const flagged = i % 11 === 3 || i % 13 === 7;
  return { x, y: flagged ? y * 0.35 + 4 : y, flagged };
});

export function FraudPreview() {
  return (
    <div className="flex h-full flex-col gap-3 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="whitespace-nowrap font-mono text-[11px] text-paper/80">upi-fraud / monitor</span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-mute">
          <span className="h-1.5 w-1.5 rounded-full bg-coral" /> <span className="hidden sm:inline">potentially</span> fraudulent
          <span className="ml-2 h-1.5 w-1.5 rounded-full bg-mint" /> legitimate
        </span>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-xl border border-white/[0.06] bg-night-950/70">
        <span className="absolute left-2 top-2 font-mono text-[9px] text-mute">amount ↑</span>
        <span className="absolute bottom-1.5 right-2 font-mono text-[9px] text-mute">time →</span>
        {/* threshold line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute left-0 right-0 top-[30%] h-px origin-left border-t border-dashed border-coral/50"
        />
        <span className="absolute right-2 top-[calc(30%-16px)] font-mono text-[9px] text-coral/80">risk threshold</span>
        {points.map((p, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.015 }}
            className="absolute"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            {p.flagged ? (
              <motion.span
                animate={{ boxShadow: ["0 0 0 0 rgba(255,122,107,.6)", "0 0 0 8px rgba(255,122,107,0)"] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: (i % 5) * 0.3 }}
                className="block h-2.5 w-2.5 rounded-full bg-coral"
              />
            ) : (
              <span className="block h-1.5 w-1.5 rounded-full bg-mint/60" />
            )}
          </motion.span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 font-mono text-[10px]">
        {[
          { k: "Preprocess", w: "100%" },
          { k: "Features", w: "100%" },
          { k: "Evaluate", w: "100%" },
        ].map((s, i) => (
          <div key={s.k} className="rounded-lg border border-white/[0.06] bg-night-950/60 p-2">
            <span className="text-mute">{s.k}</span>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: s.w }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.35, duration: 0.7 }}
                className="h-full rounded-full bg-gradient-to-r from-mint to-sky"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const steps = [
  { label: "Question", Icon: MessageSquareText },
  { label: "Intent", Icon: Filter },
  { label: "SQL", Icon: Database },
  { label: "Validate", Icon: ShieldCheck },
  { label: "Results", Icon: Table2 },
];

export function Text2SqlPreview() {
  return (
    <div className="flex h-full flex-col justify-center gap-6 p-4 sm:p-6">
      <div className="rounded-xl border border-white/[0.08] bg-night-950/70 px-4 py-3 text-[13px] text-paper/90">
        “Which city had the most transactions?”
      </div>

      <div className="relative">
        <div aria-hidden className="absolute left-[10%] right-[10%] top-5 h-px bg-white/10" />
        <motion.div
          aria-hidden
          animate={{ left: ["10%", "88%"] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
          className="absolute top-[17px] h-[7px] w-[7px] rounded-full bg-mint shadow-[0_0_14px_#6ee7c8]"
        />
        <ol className="relative grid grid-cols-5 gap-1">
          {steps.map(({ label, Icon }, i) => (
            <motion.li
              key={label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i }}
              className="flex flex-col items-center gap-2 text-center"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-night-800">
                <Icon className="h-4 w-4 text-mint" />
              </span>
              <span className="font-mono text-[9.5px] text-mute sm:text-[10px]">{label}</span>
            </motion.li>
          ))}
        </ol>
      </div>

      <pre className="overflow-x-auto rounded-xl bg-night-950/70 px-4 py-3 font-mono text-[11.5px] leading-relaxed text-paper/75">
        <span className="text-sky">SELECT</span> city, <span className="text-sky">COUNT</span>(*) <span className="text-sky">AS</span> n{"\n"}
        <span className="text-sky">FROM</span> upi_txns <span className="text-sky">GROUP BY</span> city{"\n"}
        <span className="text-sky">ORDER BY</span> n <span className="text-sky">DESC LIMIT</span> <span className="text-mint">1</span>;
      </pre>
    </div>
  );
}
