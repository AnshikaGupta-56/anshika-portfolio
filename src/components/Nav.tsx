"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import clsx from "clsx";
import { nav, profile, site } from "@/data/profile";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

const ids = nav.map((n) => n.id);

export function Nav() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-300",
        scrolled || open ? "border-b border-white/[0.06] bg-night-950/75 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav aria-label="Primary" className="shell flex h-16 items-center justify-between gap-4">
        <a href="#top" className="group flex items-center gap-2.5" aria-label={`${profile.name} — home`}>
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-mint/30 bg-mint/10 font-display text-[13px] font-bold text-mint transition-transform group-hover:-rotate-6">
            AG
          </span>
          <span className="text-sm font-medium tracking-tight">Anshika Gupta</span>
        </a>

        <ul className="hidden items-center gap-1 rounded-full border border-white/[0.07] bg-night-900/60 p-1 lg:flex">
          {nav.map((item) => (
            <li key={item.id} className="relative">
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={clsx(
                  "relative z-10 block rounded-full px-3.5 py-1.5 text-[13px] transition-colors",
                  active === item.id ? "text-night-950" : "text-mute hover:text-paper",
                )}
              >
                {item.label}
              </a>
              {active === item.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-paper"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={site.resume}
            download
            className="hidden items-center gap-2 rounded-full bg-mint px-4 py-2 text-[13px] font-medium text-night-950 transition hover:bg-mint-soft sm:inline-flex"
          >
            <Download className="h-3.5 w-3.5" /> Resume
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 4rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="shell flex flex-col pt-6">
              {nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  className="border-b border-white/[0.06]"
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-4 font-display text-3xl font-medium"
                  >
                    {item.label}
                    <span className="font-mono text-xs text-mute">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
              <li className="pt-6">
                <a
                  href={site.resume}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-mint px-5 py-3 text-sm font-medium text-night-950"
                >
                  <Download className="h-4 w-4" /> Download resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
