"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { Award, CheckCircle2 } from "lucide-react";
import { achievements, certifications, highlights } from "@/data/profile";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { Spotlight } from "./Spotlight";

function CountUp({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const target = Number(value);
  const decimals = value.includes(".") ? value.split(".")[1].length : 0;
  const [n, setN] = useState(reduce ? target : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, target, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: setN });
    return () => c.stop();
  }, [inView, reduce, target]);

  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      <span aria-hidden>
        {n.toFixed(decimals)}
        <span className="text-2xl text-mute">{suffix}</span>
      </span>
    </span>
  );
}

export function Achievements() {
  return (
    <section id="achievements" aria-labelledby="achievements-title" className="relative border-t border-white/[0.06] py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          id="achievements"
          cmd="SELECT * FROM achievements;"
          title={
            <>
              Achievements <span className="text-mute">& certifications.</span>
            </>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, i) => (
            <Reveal key={h.label} delay={i * 0.07}>
              <Spotlight className="h-full p-6">
                <p className="font-display text-5xl font-semibold tracking-tight text-gradient">
                  <CountUp value={h.value} suffix={h.suffix} />
                </p>
                <p className="mt-5 font-medium">{h.label}</p>
                <p className="mt-1 text-sm text-mute">{h.context}</p>
              </Spotlight>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="panel h-full p-6 sm:p-7">
              <h3 className="eyebrow mb-5">Certifications</h3>
              <ul className="space-y-4">
                {certifications.map((c) => (
                  <li key={c.title} className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-night-850">
                      <Award className="h-[18px] w-[18px] text-mint" />
                    </span>
                    <div>
                      <p className="font-medium">{c.title}</p>
                      <p className="text-sm text-mute">{c.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.07}>
            <div className="panel h-full p-6 sm:p-7">
              <h3 className="eyebrow mb-5">Highlights</h3>
              <ul className="space-y-4">
                {achievements.map((a) => (
                  <li key={a} className="flex gap-3 text-[15px] leading-relaxed text-paper/80">
                    <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-mint" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
