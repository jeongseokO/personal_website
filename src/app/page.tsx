import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Publications from "@/components/Publications";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { profile } from "@/lib/data";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Publications />
        <Projects />
        <Contact />
      </main>
      <footer className="border-t border-[var(--hairline)] px-6 py-8 text-center font-mono text-xs text-foreground/40">
        © {profile.name} — Efficient LLM Research · Built with Next.js
      </footer>
    </>
  );
}
