"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { publications } from "@/lib/data";
import { SectionTitle } from "./Section";

function CiteButton({ bibtex }: { bibtex: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // 클립보드 접근 실패 시 조용히 무시
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="shrink-0 rounded-md border border-foreground/15 px-2.5 py-1 font-mono text-xs text-foreground/60 transition-colors hover:border-accent/40 hover:text-accent"
    >
      {copied ? "Copied ✓" : "Cite (BibTeX)"}
    </button>
  );
}

export default function Publications() {
  const reduce = useReducedMotion();
  return (
    <section id="research" className="mx-auto max-w-6xl px-6 py-32">
      <SectionTitle>Selected Publications</SectionTitle>

      <ol className="flex flex-col gap-4">
        {publications.map((pub, i) => (
          <motion.li
            key={pub.title}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass group flex flex-col gap-3 rounded-2xl p-6 transition-colors hover:border-accent/40 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm font-semibold text-accent">
                  {pub.venue} {pub.year}
                </span>
                {pub.highlight && (
                  <span className="rounded-md bg-accent/15 px-2 py-0.5 font-mono text-xs text-accent">
                    {pub.highlight}
                  </span>
                )}
              </div>
              {pub.href ? (
                <a
                  href={pub.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h3 className="text-lg font-semibold leading-snug transition-colors group-hover:text-gradient">
                    {pub.title}
                  </h3>
                </a>
              ) : (
                <h3 className="text-lg font-semibold leading-snug">
                  {pub.title}
                </h3>
              )}
              <p className="mt-1 font-mono text-sm text-foreground/50">
                {pub.authors}
              </p>
            </div>

            {(pub.href || pub.bibtex) && (
              <div className="flex shrink-0 items-center gap-3">
                {pub.bibtex && <CiteButton bibtex={pub.bibtex} />}
                {pub.href && (
                  <a
                    href={pub.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-foreground/40 transition-colors hover:text-accent"
                  >
                    PDF ↗
                  </a>
                )}
              </div>
            )}
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
