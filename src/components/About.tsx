import { profile, skills } from "@/lib/data";
import { Reveal, SectionTitle } from "./Section";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-32">
      <SectionTitle>Research Focus</SectionTitle>

      <div className="grid gap-12 md:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <p className="text-xl leading-relaxed text-foreground/80">
            {profile.about}
          </p>

          {profile.scholar && (
            <dl className="mt-8 flex flex-wrap gap-8">
              {[
                { label: "Citations", value: profile.scholar.citations },
                { label: "h-index", value: profile.scholar.hIndex },
                { label: "i10-index", value: profile.scholar.i10 },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="font-mono text-xs uppercase tracking-widest text-foreground/40">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 text-3xl font-bold text-gradient">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </Reveal>

        <Reveal delay={0.15}>
          <ul className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <li
                key={skill}
                className="glass rounded-full px-4 py-2 font-mono text-sm text-foreground/80"
              >
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
