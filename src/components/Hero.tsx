"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, Download, Mail } from "lucide-react";
import { profile, site } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { QueryDemo } from "./QueryDemo";

const ease = [0.22, 1, 0.36, 1] as const;
const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } };

export function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative overflow-hidden pt-28 sm:pt-36">
      <div aria-hidden className="dots pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 right-[-10%] h-[560px] w-[760px] rounded-full opacity-[0.16] blur-3xl"
        style={{ background: "radial-gradient(closest-side, #6ee7c8, transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-15%] top-40 h-[420px] w-[560px] rounded-full opacity-[0.10] blur-3xl"
        style={{ background: "radial-gradient(closest-side, #7aa2ff, transparent)" }}
      />

      <div className="shell relative grid gap-14 pb-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12 lg:pb-32">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-xs text-mint-soft">
              <span className="h-1.5 w-1.5 animate-ping2 rounded-full bg-mint" />
              {profile.status}
            </span>
          </motion.p>

          <motion.p variants={item} className="mt-8 font-mono text-sm text-mute">
            {profile.name} <span className="text-white/20">—</span> {profile.role}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-3 font-display text-[3rem] font-semibold leading-[0.98] tracking-[-0.04em] sm:text-7xl lg:text-[5.2rem]"
          >
            I build tools that turn <span className="text-gradient">data</span> into{" "}
            <span className="relative inline-block">
              answers.
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.1, duration: 0.8, ease }}
                className="absolute -bottom-1 left-0 right-2 h-[5px] origin-left rounded-full bg-gradient-to-r from-mint to-sky"
              />
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-8 max-w-xl text-[17px] leading-relaxed text-paper/70">
            Computer Science Engineering student at <span className="text-paper">Galgotias University</span> working with
            Python, Java and SQL — with a focus on <span className="text-paper">AI and Machine Learning</span>. I&apos;ve
            built an ML-powered UPI fraud detection dashboard and a Text-to-SQL engine.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-night-950 transition hover:bg-mint-soft"
            >
              View projects
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a
              href={site.resume}
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium transition hover:border-mint/60 hover:text-mint-soft"
            >
              <Download className="h-4 w-4" /> Download resume
            </a>
          </motion.div>

          <motion.ul variants={item} className="mt-10 flex items-center gap-2" aria-label="Social links">
            {[
              { href: profile.github, label: "GitHub", Icon: GithubIcon },
              { href: profile.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
              { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
            ].map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-mute transition hover:-translate-y-0.5 hover:border-mint/40 hover:text-mint"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, delay: 0.35, ease }}>
          <QueryDemo />
        </motion.div>
      </div>
    </section>
  );
}
