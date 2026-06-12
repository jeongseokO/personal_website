"use client";

import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/lib/data";
import { SectionTitle } from "./Section";

export default function Projects() {
  const reduce = useReducedMotion();
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-32">
      <SectionTitle>Open Source</SectionTitle>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => {
          const Card = project.href ? motion.a : motion.div;
          const linkProps = project.href
            ? {
                href: project.href,
                target: "_blank",
                rel: "noopener noreferrer",
              }
            : {};
          return (
          <Card
            key={project.title}
            {...linkProps}
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
            whileHover={reduce ? undefined : { y: -6 }}
            className="glass group relative overflow-hidden rounded-2xl p-8 transition-colors hover:border-accent/40"
          >
            {/* 호버 글로우 */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative">
              <div className="mb-4 flex items-baseline justify-between">
                <h3 className="text-2xl font-semibold">{project.title}</h3>
                <span className="font-mono text-sm text-foreground/40">
                  {project.year}
                </span>
              </div>

              <p className="mb-6 text-foreground/70">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-[var(--card-bg)] px-2.5 py-1 font-mono text-xs text-foreground/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>
          );
        })}
      </div>
    </section>
  );
}
