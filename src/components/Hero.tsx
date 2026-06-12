"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { profile } from "@/lib/data";
import SceneBoundary from "./three/SceneBoundary";

// WebGL은 클라이언트에서만 렌더 (SSR 비활성화)
const HeroScene = dynamic(() => import("./three/HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section
      id="home"
      style={
        { "--background": "#06060a", "--foreground": "#e8e8f0" } as CSSProperties
      }
      className="relative flex min-h-screen items-center overflow-hidden bg-background"
    >
      <SceneBoundary>
        <HeroScene />
      </SceneBoundary>

      {/* 가독성용 비네팅 */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 font-mono text-sm tracking-widest text-accent"
        >
          {profile.role.toUpperCase()}
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl text-5xl font-bold leading-tight sm:text-6xl md:text-7xl"
        >
          안녕하세요, <span className="text-gradient">{profile.name}</span>
          입니다.
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 max-w-xl text-lg text-foreground/70"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#research"
            className="rounded-full bg-accent px-7 py-3 font-medium text-white transition hover:opacity-90"
          >
            논문 보기
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/15 px-7 py-3 font-medium transition hover:bg-white/5"
          >
            연락하기
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-widest text-foreground/40"
      >
        SCROLL ↓
      </motion.div>
    </section>
  );
}
