"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { GraduationCap, MapPin, School, Sparkles } from "lucide-react";
import { education } from "@/data/profile";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

export function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const items = [
    {
      Icon: Sparkles,
      tag: "Next",
      title: "Software / AI-ML Internship",
      org: "Your team?",
      body: "Looking for an internship to apply my skills, gain industry experience and contribute to real-world projects.",
      score: undefined as string | undefined,
      place: undefined as string | undefined,
      highlight: true,
    },
    ...education.map((e, i) => ({
      Icon: i === 0 ? GraduationCap : School,
      tag: e.status,
      title: e.degree,
      org: e.school,
      body: undefined as string | undefined,
      score: e.score,
      place: e.place,
      highlight: false,
    })),
  ];

  return (
    <section id="education" aria-labelledby="education-title" className="relative border-t border-white/[0.06] py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          id="education"
          cmd="SELECT * FROM journey ORDER BY year DESC;"
          title={
            <>
              Education & journey, <span className="text-mute">and what&apos;s next.</span>
            </>
          }
          lede="No professional roles yet — my experience so far comes from coursework and the projects above. An internship is the next step."
        />

        <div ref={ref} className="relative ml-1 sm:ml-0">
          <div aria-hidden className="absolute bottom-6 left-[19px] top-6 w-px bg-white/[0.08]" />
          <motion.div aria-hidden style={{ scaleY }} className="absolute bottom-6 left-[19px] top-6 w-px origin-top bg-gradient-to-b from-mint via-sky to-transparent" />
          <ol className="relative space-y-6">
          {items.map(({ Icon, tag, title, org, body, score, place, highlight }, i) => (
            <li key={title} className="relative grid grid-cols-[40px_1fr] gap-4 sm:gap-6">
              <Reveal delay={i * 0.05}>
                <span
                  className={
                    highlight
                      ? "relative z-10 grid h-10 w-10 place-items-center rounded-full border border-mint/50 bg-night-950 text-mint shadow-[0_0_24px_-4px_rgba(110,231,200,.6)]"
                      : "relative z-10 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-night-950 text-paper/80"
                  }
                >
                  <Icon className="h-4 w-4" />
                </span>
              </Reveal>
              <Reveal delay={i * 0.05 + 0.05}>
                <div
                  className={
                    highlight
                      ? "rounded-2xl border border-dashed border-mint/30 bg-mint/[0.04] p-5 sm:p-6"
                      : "panel p-5 sm:p-6"
                  }
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className={highlight ? "font-mono text-[11px] uppercase tracking-wider text-mint" : "font-mono text-[11px] uppercase tracking-wider text-mute"}>
                      {tag}
                    </span>
                    {score && <span className="rounded-md border border-mint/25 bg-mint/10 px-2 py-0.5 font-mono text-xs text-mint-soft">{score}</span>}
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-tight sm:text-2xl">{title}</h3>
                  <p className="mt-1 text-paper/70">{org}</p>
                  {place && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-mute">
                      <MapPin className="h-3 w-3" /> {place}
                    </p>
                  )}
                  {body && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mute">{body}</p>}
                  {highlight && (
                    <a href="#contact" className="mt-4 inline-flex text-sm font-medium text-mint underline-offset-4 hover:underline">
                      Get in touch →
                    </a>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
