"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import HeroDepthLayers from "@/components/HeroDepthLayers";
import { EASE } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion || !headlineRef.current) return;

      const split = new SplitText(headlineRef.current, { type: "chars" });

      gsap.set(split.chars, { opacity: 0, y: 24 });

      gsap.to(split.chars, {
        opacity: 1,
        y: 0,
        stagger: 0.02,
        ease: EASE,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=60%",
          scrub: 1,
          pin: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="min-h-[calc(100dvh-73px)] flex flex-col items-center justify-center px-6 relative"
    >
      <HeroDepthLayers />
      <div className="flex flex-col items-center gap-6 text-center max-w-xl">
        <p className="font-mono text-sm text-ink-secondary">Hi, I&apos;m Timothy Sheu</p>

        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl font-semibold text-ink leading-tight"
        >
          Full-stack Developer
        </h1>

        <p className="text-lg text-ink-secondary max-w-md">
          I&apos;m a web developer currently pursuing a Master&apos;s in Applied Data Science and AI, with a passion for building clean, functional software.
        </p>

        <Link href="/projects" className="mt-4 h-12 px-6 flex items-center justify-center rounded-full bg-ink text-paper font-medium transition-transform duration-200 hover:scale-105 hover:-rotate-2">
          See my projects
        </Link>
      </div>
    </section>
  );
}