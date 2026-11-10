import { Reveal } from "./Reveal";

type Props = { id: string; cmd: string; title: React.ReactNode; lede?: React.ReactNode };

/** Section heading styled like a query prompt, e.g. `> SELECT skills` */
export function SectionHeader({ id, cmd, title, lede }: Props) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="font-mono text-xs text-mint">
        <span className="text-mute">&gt;</span> {cmd}
      </p>
      <div className="mt-4 grid gap-5 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-end">
        <h2 id={`${id}-title`} className="font-display text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[3.5rem]">
          {title}
        </h2>
        {lede ? <p className="max-w-md text-[15px] leading-relaxed text-mute md:justify-self-end">{lede}</p> : null}
      </div>
    </Reveal>
  );
}
