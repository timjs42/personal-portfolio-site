"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import MoltenMetal from "@/components/MoltenMetal";
import ProjectRoulette from "@/components/ProjectRoulette";
import { EASE_FLUID, DURATION_ENTRANCE } from "@/lib/motion";
import { THEME_COLORS } from "@/lib/theme";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
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

    let cancelled = false;
    let timeline: { kill: () => void } | undefined;

    import("gsap").then(({ default: gsap }) => {
      if (cancelled || !headlineRef.current || !eyebrowRef.current || !paragraphRef.current || !buttonRef.current) return;

      const tl = gsap.timeline({ delay: 0.2 });
      timeline = tl;

      tl.set(eyebrowRef.current, { opacity: 0, y: 16, filter: "blur(16px)" })
        .set(headlineRef.current, { opacity: 0, y: 24, filter: "blur(24px)" })
        .set(paragraphRef.current, { opacity: 0, y: 20, filter: "blur(16px)" })
        .set(buttonRef.current, { opacity: 0, y: 16, filter: "blur(12px)" })
        .to(eyebrowRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: DURATION_ENTRANCE, ease: EASE_FLUID }, 0)
        .to(headlineRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: DURATION_ENTRANCE, ease: EASE_FLUID }, 0.15)
        .to(paragraphRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: DURATION_ENTRANCE, ease: EASE_FLUID }, 0.35)
        .to(buttonRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: DURATION_ENTRANCE * 0.7, ease: EASE_FLUID }, 0.5);
    });

    return () => {
      cancelled = true;
      timeline?.kill();
    };
  }, []);

  const handleScrollDown = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("skills");
    if (!target) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const { default: gsap } = await import("gsap");
    gsap.globalTimeline.pause();
    const resume = () => gsap.globalTimeline.resume();

    target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });

    if ("onscrollend" in window) {
      window.addEventListener("scrollend", resume, { once: true });
    } else {
      setTimeout(resume, 900);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-[calc(100dvh-73px)] relative overflow-hidden flex items-center px-6 py-16"
    >
      <div className="absolute inset-0 -z-10">
        <MoltenMetal
          color1={THEME_COLORS.secondary}
          color2={THEME_COLORS.accent}
          color3={THEME_COLORS.foreground}
          speed={0.35}
          scale={4}
          detail={3}
          glow={1.6}
          coreSize={0.1}
          swirl={1}
          fold={-0.2}
          blackPoint={0.05}
          brightness={1.1}
          colorMode="molten"
          grain={true}
          grainIntensity={0.05}
          mouseInteraction={true}
          mouseStrength={0.3}
          opacity={0.55}
        />
      </div>

      <div className="relative w-full max-w-6xl mx-auto grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-center">
        <div className="flex flex-col gap-4 max-w-xl mx-auto lg:mx-0">
          <p ref={eyebrowRef} className="font-mono text-sm text-primary">
            Hi, I&apos;m Timothy Sheu
          </p>

          <h1
            ref={headlineRef}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[0.95]"
          >
            <span className="text-foreground">Full-stack </span>
            <span className="text-accent">developer</span>
          </h1>

          <p ref={paragraphRef} className="text-lg text-primary max-w-sm">
            I&apos;m a web developer currently pursuing a Master&apos;s in Applied Data Science and AI, with a passion for building clean, functional software.
          </p>

          <Link
            ref={buttonRef}
            href="/projects"
            className="mt-2 self-start h-12 px-6 flex items-center justify-center rounded-full bg-accent text-background font-medium transition-all duration-signature ease-signature hover:scale-[1.03] hover:-rotate-1 hover:shadow-[0_0_30px_-8px_var(--accent)]"
          >
            See All Projects
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <ProjectRoulette />
        </div>
      </div>

      <a
        href="#skills"
        onClick={handleScrollDown}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-20 h-20 rounded-full bg-accent text-background flex flex-col items-center justify-center text-xs font-medium leading-tight text-center motion-safe:animate-bounce transition-transform hover:scale-105"
      >
        Scroll
        <br />
        down
      </a>
    </section>
  );
}
