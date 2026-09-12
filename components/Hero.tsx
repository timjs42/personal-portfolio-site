"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HeroDepthLayers from "@/components/HeroDepthLayers";
import { EASE_FLUID, DURATION_ENTRANCE } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

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

      const tl = gsap.timeline({ delay: 0.2 });

      tl.set(eyebrowRef.current, { opacity: 0, y: 16, filter: "blur(16px)" })
        .set(headlineRef.current, { opacity: 0, y: 24, filter: "blur(24px)" })
        .set(paragraphRef.current, { opacity: 0, y: 20, filter: "blur(16px)" })
        .set(buttonRef.current, { opacity: 0, y: 16, filter: "blur(12px)" })
        .to(eyebrowRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: DURATION_ENTRANCE, ease: EASE_FLUID }, 0)
        .to(headlineRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: DURATION_ENTRANCE, ease: EASE_FLUID }, 0.15)
        .to(paragraphRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: DURATION_ENTRANCE, ease: EASE_FLUID }, 0.35)
        .to(buttonRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: DURATION_ENTRANCE * 0.7, ease: EASE_FLUID }, 0.5);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="min-h-[calc(100dvh-73px)] flex items-center px-6 py-16 relative overflow-hidden"
    >
      <HeroDepthLayers />
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-[1.3fr_1fr] gap-10 md:gap-8 items-center relative">
        <div className="flex flex-col gap-4">
          <p ref={eyebrowRef} className="font-mono text-sm text-primary">
            Hi, I&apos;m Timothy Sheu
          </p>

          <h1
            ref={headlineRef}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[0.95] max-w-md sm:max-w-lg lg:max-w-2xl"
          >
            <span className="text-foreground">Full-stack </span>
            <span className="text-accent">developer</span>
          </h1>
        </div>

        <div className="flex flex-col items-start gap-6">
          <p ref={paragraphRef} className="text-lg text-primary max-w-sm">
            I&apos;m a web developer currently pursuing a Master&apos;s in Applied Data Science and AI, with a passion for building clean, functional software.
          </p>

          <Link
            ref={buttonRef}
            href="/projects"
            className="h-12 px-6 flex items-center justify-center rounded-full bg-accent text-background font-medium transition-all duration-signature ease-signature hover:scale-[1.03] hover:-rotate-1 hover:shadow-[0_0_30px_-8px_var(--accent)]"
          >
            See my projects
          </Link>
        </div>
      </div>
    </section>
  );
}
