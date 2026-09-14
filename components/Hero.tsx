"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
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
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const handleScroll = () => setShowScrollHint(window.scrollY < 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className="min-h-[calc(100dvh-73px)] relative overflow-hidden flex items-center justify-center px-6 py-16"
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

      <div className="relative w-full max-w-4xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-10 items-stretch">
        <div className="flex flex-col items-center text-center justify-between max-w-md mx-auto lg:items-start lg:text-left">
          <div className="flex flex-col items-center gap-8 lg:items-start">
            <div className="flex flex-col gap-4">
              <p ref={eyebrowRef} className="hero-text-shadow font-mono text-sm font-medium text-primary">
                Hi, I&apos;m Timothy Sheu
              </p>

              <h1
                ref={headlineRef}
                className="hero-text-shadow font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[0.95]"
              >
                <span className="text-foreground">Full-stack </span>
                <span className="text-accent">developer</span>
              </h1>
            </div>

            <p ref={paragraphRef} className="hero-text-shadow text-lg font-medium text-primary max-w-sm">
              I&apos;m a web developer currently pursuing a Master&apos;s in Applied Data Science and AI, with a passion for building clean, functional software.
            </p>
          </div>

          <a
            href="#skills"
            onClick={handleScrollDown}
            className="hidden lg:flex self-start h-12 px-6 items-center justify-center rounded-full bg-primary text-background font-medium transition-all duration-signature ease-signature hover:scale-[1.03] hover:-rotate-1 hover:shadow-[0_0_30px_-8px_var(--primary)]"
          >
            Scroll Down
          </a>
        </div>

        <div className="flex flex-col items-center gap-6">
          <p className="hero-text-shadow font-mono text-sm font-medium text-primary">Featured Projects</p>

          <ProjectRoulette />

          <Link
            ref={buttonRef}
            href="/projects"
            className="h-12 px-6 flex items-center justify-center rounded-full bg-accent text-background font-medium transition-all duration-signature ease-signature hover:scale-[1.03] hover:-rotate-1 hover:shadow-[0_0_30px_-8px_var(--accent)]"
          >
            See All Projects
          </Link>
        </div>
      </div>

      <a
        href="#skills"
        onClick={handleScrollDown}
        aria-label="Scroll down"
        className={`lg:hidden fixed bottom-6 right-6 z-10 text-primary animate-bounce transition-opacity duration-300 ${
          showScrollHint ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ChevronDown className="w-7 h-7" />
      </a>
    </section>
  );
}
