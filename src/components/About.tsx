import { about, education } from "@/data/profile";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative border-t border-white/[0.06] py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          id="about"
          cmd="DESCRIBE anshika;"
          title={
            <>
              Curious about data, <span className="text-mute">serious about fundamentals.</span>
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div className="space-y-6">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? "text-xl leading-relaxed text-paper/90 sm:text-[22px]" : "text-[16px] leading-relaxed text-mute"}>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.16}>
              <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] text-sm sm:grid-cols-3">
                {[
                  ["Studying", "B.Tech, Computer Science"],
                  ["University", education[0].school],
                  ["Focus", "AI & Machine Learning"],
                ].map(([k, v]) => (
                  <div key={k} className="bg-night-950 p-4 last:col-span-2 sm:last:col-span-1">
                    <dt className="eyebrow !text-[10px]">{k}</dt>
                    <dd className="mt-1.5 text-paper/90">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <h3 className="eyebrow mb-5">What I bring to a team</h3>
            </Reveal>
            <ol className="space-y-3">
              {about.brings.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.06}>
                  <li className="group flex gap-4 rounded-xl border border-white/[0.06] bg-night-900/60 p-5 transition hover:border-mint/25 hover:bg-night-900">
                    <span className="font-mono text-xs text-mint/70 transition group-hover:text-mint">0{i + 1}</span>
                    <div>
                      <p className="font-medium text-paper">{b.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-mute">{b.body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
