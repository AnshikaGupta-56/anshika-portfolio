import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="shell flex flex-col items-start justify-between gap-4 py-8 text-sm text-mute sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} {profile.name}. Built with Next.js, TypeScript, Tailwind CSS &amp; Framer Motion.</p>
        <a href="#top" className="inline-flex items-center gap-1.5 transition hover:text-paper">
          Back to top <ArrowUp className="h-3.5 w-3.5" />
        </a>
      </div>
    </footer>
  );
}
