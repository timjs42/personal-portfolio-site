"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import HeroDepthLayers from "@/components/HeroDepthLayers";
import { EASE, DURATION } from "@/lib/motion";

gsap.registerPlugin(SplitText, useGSAP);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (
        prefersReducedMotion ||
        !headlineRef.current ||
        !eyebrowRef.current ||
        !paragraphRef.current ||
        !buttonRef.current
      )
        return;

      const split = new SplitText(headlineRef.current, { type: "chars" });

      const tl = gsap.timeline({ delay: 0.2 });

      tl.set(eyebrowRef.current, { opacity: 0, x: -110, y: -30, rotate: -8 })
        .set(split.chars, { opacity: 0, y: 24 })
        .set(paragraphRef.current, { opacity: 0, x: 130, y: 50, rotate: 6 })
        .set(buttonRef.current, { opacity: 0, y: 56, rotate: -8, scale: 0.9 })
        .to(eyebrowRef.current, { opacity: 1, x: 0, y: 0, rotate: 0, duration: DURATION, ease: EASE }, 0)
        .to(split.chars, { opacity: 1, y: 0, stagger: 0.02, duration: DURATION, ease: EASE }, 0.1)
        .to(paragraphRef.current, { opacity: 1, x: 0, y: 0, rotate: 0, duration: DURATION, ease: EASE }, 0.3)
        .to(buttonRef.current, { opacity: 1, y: 0, rotate: 0, scale: 1, duration: DURATION * 0.4, ease: EASE }, 0.1)
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="min-h-[calc(100dvh-73px)] flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      <HeroDepthLayers />
      <div className="flex flex-col items-center gap-6 text-center max-w-xl">
        <p ref={eyebrowRef} className="font-mono text-sm text-ink-secondary">
          Hi, I&apos;m Timothy Sheu
        </p>

        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl font-semibold text-ink leading-tight"
        >
          Full-stack developer
        </h1>

        <p ref={paragraphRef} className="text-lg text-ink-secondary max-w-md">
          I&apos;m a web developer currently pursuing a Master&apos;s in Applied Data Science and AI, with a passion for building clean, functional software.
        </p>

        <Link
          ref={buttonRef}
          href="/projects"
          className="mt-4 h-12 px-6 flex items-center justify-center rounded-full bg-ink text-paper font-medium transition-transform duration-200 hover:scale-105 hover:-rotate-2"
        >
          See my projects
        </Link>
      </div>
    </section>
  );
}