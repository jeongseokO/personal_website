import { profile } from "@/lib/data";
import { Reveal, SectionTitle } from "./Section";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-32">
      <SectionTitle>Let&apos;s talk</SectionTitle>

      <Reveal>
        <p className="max-w-xl text-xl text-foreground/80">
          공동 연구, 협업, 인턴십 문의 — 무엇이든 환영합니다.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-block text-3xl font-bold text-gradient sm:text-5xl"
        >
          {profile.email}
        </a>
      </Reveal>

      {profile.cvUrl && (
        <Reveal delay={0.2}>
          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 font-medium transition hover:border-accent/50 hover:text-accent"
          >
            Download CV (PDF) ↗
          </a>
        </Reveal>
      )}

      <Reveal delay={0.25}>
        <div className="mt-12 flex gap-6">
          {profile.socials
            .filter((s) => s.href)
            .map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-foreground/60 transition hover:text-accent"
              >
                {s.label} ↗
              </a>
            ))}
        </div>
      </Reveal>
    </section>
  );
}
