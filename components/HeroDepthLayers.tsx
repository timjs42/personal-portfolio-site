"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { EASE, DURATION } from "@/lib/motion";

export default function HeroDepthLayers() {
  const circleRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const circle = circleRef.current;
    const square = squareRef.current;
    if (!circle || !square) return;

    const moveCircleX = gsap.quickTo(circle, "x", { duration: DURATION, ease: EASE });
    const moveCircleY = gsap.quickTo(circle, "y", { duration: DURATION, ease: EASE });
    const moveSquareX = gsap.quickTo(square, "x", { duration: DURATION, ease: EASE });
    const moveSquareY = gsap.quickTo(square, "y", { duration: DURATION, ease: EASE });

    function handlePointerMove(e: PointerEvent) {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;

      moveCircleX(nx * 18);
      moveCircleY(ny * 18);
      moveSquareX(nx * -10);
      moveSquareY(ny * -10);
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <>
      <div
        ref={circleRef}
        className="absolute top-16 left-8 w-16 h-16 rounded-full bg-accent"
        aria-hidden="true"
      />
      <div
        ref={squareRef}
        className="absolute bottom-20 right-10 w-10 h-10 rounded-lg bg-ink rotate-12"
        aria-hidden="true"
      />
    </>
  );
}