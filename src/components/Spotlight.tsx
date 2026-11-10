"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import clsx from "clsx";

/** Panel with a soft cursor-following glow. */
export function Spotlight({ className, children }: { className?: string; children: React.ReactNode }) {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const bg = useMotionTemplate`radial-gradient(380px circle at ${x}px ${y}px, rgba(110,231,200,0.09), transparent 70%)`;
  return (
    <motion.div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => { x.set(-500); y.set(-500); }}
      className={clsx("panel group relative overflow-hidden transition-colors hover:border-white/[0.12]", className)}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: bg }} />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}
