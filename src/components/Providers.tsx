"use client";

import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";

export function Providers({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <MotionConfig reducedMotion="user">
      <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-mint-soft via-mint to-sky" />
      {children}
    </MotionConfig>
  );
}
