"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import clsx from "clsx";
import { profile, projects, type Project } from "@/data/profile";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { GithubIcon } from "./Icons";
import { FraudPreview, Text2SqlPreview } from "./ProjectPreviews";

const previews: Record<Project["slug"], React.ComponentType> = {
  fraud: FraudPreview,
  text2sql: Text2SqlPreview,
};

function ProjectCase({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  // Parallax only on wide screens, where preview and text sit side by side.
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const Preview = previews[project.slug];
  const flip = index % 2 === 1;
  const repo = project.github ?? profile.github;

  return (
    <article ref={ref} aria-labelledby={`p-${project.slug}`} className="panel relative overflow-hidden p-5 sm:p-8 lg:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full opacity-[0.12] blur-3xl"
        style={{ background: index === 0 ? "#ff7a6b" : "#7aa2ff" }}
      />
      <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div style={{ y: wide ? y : 0 }} className={clsx("lg:self-center", flip && "lg:order-2")}>
          <figure>
            <div className="aspect-[4/3.3] overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-night-850 to-night-900 sm:aspect-[4/3]">
              <Preview />
            </div>
            <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-mute/70">
              Illustrated preview · sample data
            </figcaption>
          </figure>
        </motion.div>

        <div>
          <p className="font-mono text-xs text-mint">
            0{index + 1} <span className="text-mute">/ {project.kicker}</span>
          </p>
          <h3 id={`p-${project.slug}`} className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl">
            {project.name}
          </h3>

          <dl className="mt-7 space-y-6">
            <div>
              <dt className="eyebrow">Problem</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-paper/80">{project.problem}</dd>
            </div>
            <div>
              <dt className="eyebrow">Key features</dt>
              <dd>
                <ul className="mt-3 space-y-2.5">
                  {project.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[15px] leading-relaxed text-paper/75">
                      <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-sm bg-mint/80" />
                      {f}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">My contribution</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-paper/80">{project.contribution}</dd>
            </div>
          </dl>

          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Tech stack">
            {project.stack.map((s) => (
              <li key={s} className="tag">{s}</li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm transition hover:border-mint/50 hover:text-mint-soft"
            >
              <GithubIcon className="h-4 w-4" /> {project.github ? "View code" : "More on GitHub"}
              <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-mint px-5 py-2.5 text-sm font-semibold text-night-950 transition hover:bg-mint-soft"
              >
                <ExternalLink className="h-4 w-4" /> Live demo
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative border-t border-white/[0.06] py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          id="projects"
          cmd="SELECT * FROM projects ORDER BY impact DESC;"
          title={
            <>
              Featured projects, <span className="text-mute">built with ML & SQL.</span>
            </>
          }
          lede="Two projects that apply machine learning to real problems: catching suspicious payments, and querying databases without writing SQL."
        />
        <div className="space-y-8">
          {projects.map((p, i) => (
            <Reveal key={p.slug}>
              <ProjectCase project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
