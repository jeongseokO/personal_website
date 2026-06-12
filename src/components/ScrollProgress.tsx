"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// 페이지 최상단의 스크롤 진행바 — 전체 문서 대비 현재 위치를 표시
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  // 진행을 살짝 부드럽게 (reduced-motion이면 framer가 스프링을 즉시 정착시킴)
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-accent to-accent-2"
      aria-hidden
    />
  );
}
