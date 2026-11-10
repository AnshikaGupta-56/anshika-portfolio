"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { skillGroups } from "@/data/profile";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const filters = [
  { id: "all", label: "All", groups: skillGroups.map((g) => g.id) },
  { id: "tech", label: "Technical", groups: ["languages", "ml", "java", "db", "tools"] },
  { id: "core", label: "Fundamentals", groups: ["cs"] },
  { id: "soft", label: "Soft skills", groups: ["soft"] },
];

export function Skills() {
  const [f, setF] = useState("all");
  const active = filters.find((x) => x.id === f)!;
  const shown = skillGroups.filter((g) => active.groups.includes(g.id));

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative border-t border-white/[0.06] py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          id="skills"
          cmd="SELECT * FROM skills;"
          title={
            <>
              Skills, <span className="text-mute">organised like a schema.</span>
            </>
          }
          lede="Python, Java and SQL at the core, with a data-science toolkit for machine-learning work."
        />

        <Reveal className="mb-8 flex flex-wrap gap-1 rounded-full border border-white/10 p-1 text-xs sm:w-fit" role="group" aria-label="Filter skills">
          {filters.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={f === o.id}
              onClick={() => setF(o.id)}
              className={clsx("relative rounded-full px-4 py-1.5 transition-colors", f === o.id ? "text-night-950" : "text-mute hover:text-paper")}
            >
              {f === o.id && <motion.span layoutId="skill-filter" className="absolute inset-0 rounded-full bg-mint" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span className="relative font-medium">{o.label}</span>
            </button>
          ))}
        </Reveal>

        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((g) => (
              <motion.article
                layout
                key={g.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="panel overflow-hidden"
                aria-labelledby={`sk-${g.id}`}
              >
                <header className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-5 py-3">
                  <h3 id={`sk-${g.id}`} className="font-display text-[17px] font-semibold tracking-tight">{g.title}</h3>
                  <span className="font-mono text-[10px] text-mute">{g.skills.length} rows</span>
                </header>
                <p className="px-5 pt-3 text-xs text-mute">{g.note}</p>
                <ul className="px-2 pb-3 pt-2">
                  {g.skills.map((s, i) => (
                    <li key={s} className="group flex items-center gap-3 rounded-lg px-3 py-1.5 transition hover:bg-mint/[0.06]">
                      <span className="w-5 font-mono text-[10px] text-white/25 group-hover:text-mint/70">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-[14.5px] text-paper/85 group-hover:text-paper">{s}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
