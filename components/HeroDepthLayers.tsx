"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { EASE_ORGANIC, DURATION_AMBIENT } from "@/lib/motion";

export default function HeroDepthLayers() {
  const lineARef = useRef<HTMLDivElement>(null);
  const lineBRef = useRef<HTMLDivElement>(null);
  const lineCRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lineA = lineARef.current;
    const lineB = lineBRef.current;
    const lineC = lineCRef.current;
    if (!lineA || !lineB || !lineC) return;

    const drift = gsap.timeline({ repeat: -1, yoyo: true });
    drift
      .to(lineA, { x: 60, y: -20, duration: DURATION_AMBIENT, ease: EASE_ORGANIC, force3D: true }, 0)
      .to(lineB, { x: -70, y: 25, duration: DURATION_AMBIENT * 1.2, ease: EASE_ORGANIC, force3D: true }, 0)
      .to(lineC, { x: 40, y: 15, duration: DURATION_AMBIENT * 0.9, ease: EASE_ORGANIC, force3D: true }, 0);

    return () => {
      drift.kill();
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        ref={lineARef}
        className="absolute left-[-10%] top-1/4 w-[120%] h-3 rotate-[-6deg] blur-xl opacity-50 rounded-full will-change-transform"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
      />
      <div
        ref={lineBRef}
        className="absolute left-[-10%] top-[55%] w-[120%] h-3 rotate-[9deg] blur-xl opacity-40 rounded-full will-change-transform"
        style={{ background: "linear-gradient(90deg, transparent, var(--secondary), transparent)" }}
      />
      <div
        ref={lineCRef}
        className="absolute left-[-10%] top-[78%] w-[120%] h-2 rotate-[-3deg] blur-xl opacity-30 rounded-full will-change-transform"
        style={{ background: "linear-gradient(90deg, transparent, var(--primary), transparent)" }}
      />
    </div>
  );
}
