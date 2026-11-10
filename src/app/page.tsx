import { Providers } from "@/components/Providers";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <Providers>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-mint focus:px-3 focus:py-2 focus:text-night-950">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </Providers>
  );
}
