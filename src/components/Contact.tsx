"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Download, Mail, Phone } from "lucide-react";
import { profile, site } from "@/data/profile";
import { Reveal } from "./Reveal";
import { GithubIcon, LinkedinIcon } from "./Icons";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const links = [
    { href: profile.linkedin, label: "LinkedIn", handle: `in/${profile.linkedinHandle}`, Icon: LinkedinIcon },
    { href: profile.github, label: "GitHub", handle: `@${profile.githubHandle}`, Icon: GithubIcon },
    { href: profile.phoneHref, label: "Phone", handle: profile.phone, Icon: Phone },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-36">
      <div aria-hidden className="dots pointer-events-none absolute inset-0 rotate-180" />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-72 left-1/2 h-[560px] w-[1000px] -translate-x-1/2 rounded-full opacity-[0.14] blur-3xl"
        style={{ background: "radial-gradient(closest-side, #6ee7c8, transparent)" }}
      />
      <div className="shell relative">
        <Reveal>
          <p className="font-mono text-xs text-mint">
            <span className="text-mute">&gt;</span> INSERT INTO team VALUES (&apos;anshika&apos;);
          </p>
          <h2 id="contact-title" className="mt-5 max-w-4xl font-display text-[2.9rem] font-semibold leading-[0.98] tracking-[-0.04em] sm:text-7xl lg:text-[5.5rem]">
            Hiring an intern? <span className="text-gradient">Let&apos;s talk.</span>
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-paper/70">
            I&apos;m looking for internship opportunities in software development, AI/ML or data. Email is the fastest way to
            reach me — I&apos;d love to hear about your team.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={`mailto:${profile.email}?subject=${encodeURIComponent("Internship opportunity for Anshika Gupta")}`}
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-mint px-7 py-4 text-[15px] font-semibold text-night-950 transition hover:bg-mint-soft"
          >
            <Mail className="h-4 w-4" /> Email me
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            onClick={copy}
            aria-label={`Copy email address ${profile.email}`}
            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/15 px-6 py-4 font-mono text-[13px] text-paper/85 transition hover:border-white/30"
          >
            {profile.email}
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={copied ? "ok" : "cp"} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                {copied ? <Check className="h-4 w-4 text-mint" /> : <Copy className="h-4 w-4 text-mute" />}
              </motion.span>
            </AnimatePresence>
          </button>
          <span role="status" className="sr-only">{copied ? "Email address copied" : ""}</span>
        </Reveal>

        <Reveal delay={0.15}>
          <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
            {links.map(({ href, label, handle, Icon }) => (
              <li key={label} className="bg-night-950">
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex h-full items-center justify-between gap-4 p-6 transition hover:bg-night-900"
                >
                  <span>
                    <span className="eyebrow block">{label}</span>
                    <span className="mt-2 block break-all text-[15px] text-paper/90">{handle}</span>
                  </span>
                  <Icon className="h-5 w-5 shrink-0 text-mute transition group-hover:text-mint" />
                </a>
              </li>
            ))}
            <li className="bg-night-950">
              <a href={site.resume} download className="group flex h-full items-center justify-between gap-4 p-6 transition hover:bg-night-900">
                <span>
                  <span className="eyebrow block">Resume</span>
                  <span className="mt-2 block text-[15px] text-paper/90">Download PDF</span>
                </span>
                <Download className="h-5 w-5 shrink-0 text-mute transition group-hover:text-mint" />
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
