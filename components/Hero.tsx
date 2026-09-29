"use client";

import { useEffect, useState, type CSSProperties } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDown, ArrowRight, ChevronDown } from "lucide-react";
import ProjectRoulette from "@/components/ProjectRoulette";
import { THEME_COLORS } from "@/lib/theme";

const MoltenMetal = dynamic(() => import("@/components/MoltenMetal"), { ssr: false });

function enter(delayMs: number, offsetPx: number, blurPx: number, durationMs = 1100): CSSProperties {
  return {
    "--enter-delay": `${delayMs}ms`,
    "--enter-y": `${offsetPx}px`,
    "--enter-blur": `${blurPx}px`,
    "--enter-duration": `${durationMs}ms`,
  } as CSSProperties;
}

export default function Hero() {
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const handleScroll = () => setShowScrollHint(window.scrollY < 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    document
      .getElementById("skills")
      ?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <section
      className="min-h-[calc(100svh-73px)] relative overflow-hidden flex items-center justify-center px-6 py-16"
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
              <p style={enter(200, 16, 16)} className="hero-enter hero-text-shadow font-mono text-sm font-medium text-primary">
                Hi, I&apos;m Timothy Sheu
              </p>

              <h1
                style={enter(350, 24, 24)}
                className="hero-enter hero-text-shadow font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[0.95]"
              >
                <span className="text-foreground">Full-stack </span>
                <span className="text-accent">developer</span>
              </h1>
            </div>

            <p style={enter(550, 20, 16)} className="hero-enter hero-text-shadow text-lg font-medium text-primary max-w-sm">
              I&apos;m a web developer currently pursuing a Master&apos;s in Applied Data Science and AI, with a passion for building clean, functional software.
            </p>
          </div>

          <div className={`hidden lg:flex self-start rounded-full ${showScrollHint ? "cta-ring" : ""}`}>
            <a
              href="#skills"
              onClick={handleScrollDown}
              className={`h-12 px-6 flex items-center justify-center gap-2 rounded-full bg-primary text-background font-medium transition-[scale,rotate,box-shadow] duration-signature ease-signature hover:scale-[1.03] hover:-rotate-1 hover:shadow-[0_0_30px_-8px_var(--primary)] ${
                showScrollHint ? "cta-nudge" : ""
              }`}
            >
              Scroll Down
              <ArrowDown aria-hidden="true" className="cta-arrow w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <p className="hero-text-shadow font-mono text-sm font-medium text-primary">Featured Projects</p>

          <ProjectRoulette />

          <Link
            style={enter(700, 16, 12, 770)}
            href="/projects"
            className="group hero-enter relative h-12 px-6 flex items-center justify-center rounded-full bg-accent text-background font-medium transition-[scale,rotate,box-shadow] duration-signature ease-signature hover:scale-[1.03] hover:-rotate-1 hover:shadow-[0_0_30px_-8px_var(--accent)]"
          >
            <span className="transition-transform duration-signature ease-signature group-hover:-translate-x-3 group-focus-visible:-translate-x-3">
              See All Projects
            </span>
            <ArrowRight
              aria-hidden="true"
              className="absolute right-3 w-4 h-4 opacity-0 -translate-x-2 transition-[translate,opacity] duration-signature ease-signature group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0"
            />
          </Link>
        </div>
      </div>

      <a
        href="#skills"
        onClick={handleScrollDown}
        aria-label="Scroll down"
        className={`lg:hidden fixed bottom-6 right-6 z-10 text-primary transition-opacity duration-300 ${
          showScrollHint ? "opacity-100 animate-bounce" : "opacity-0 pointer-events-none"
        }`}
      >
        <ChevronDown className="w-7 h-7" />
      </a>
    </section>
  );
}
