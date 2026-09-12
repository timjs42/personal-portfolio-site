import type { CSSProperties } from "react";
import { skills } from "@/lib/skills";
import { mentionGroups } from "@/lib/mentions";
import Hero from "@/components/Hero";

function isTooDarkForTile(hex: string) {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.25;
}

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />

      <section id="skills" className="px-6 py-24 max-w-3xl mx-auto w-full border-t border-secondary/30">
        <h2 className="font-display text-2xl font-semibold text-foreground mb-12 text-center">Skills</h2>

        <div className="flex flex-col gap-12">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="font-mono text-sm text-primary mb-6 text-center">
                {group.category}
              </h3>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
                {group.items.map((skill) => {
                  const Icon = skill.icon;
                  const tooDark = isTooDarkForTile(skill.color);
                  const glowColor = tooDark ? "var(--accent)" : skill.color;
                  const iconColor = tooDark ? "var(--foreground)" : skill.color;
                  return (
                    <div
                      key={skill.name}
                      className={
                        group.category === "Currently Learning"
                          ? "group relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl border border-accent/60 bg-secondary/10 flex items-center justify-center overflow-hidden transition-all duration-signature ease-signature hover:-translate-y-1"
                          : "group relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl border border-secondary/30 bg-secondary/10 flex items-center justify-center overflow-hidden transition-all duration-signature ease-signature hover:-translate-y-1"
                      }
                      style={{ "--tile-glow": glowColor } as CSSProperties}
                    >
                      <div
                        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-signature ease-signature group-hover:opacity-100"
                        style={{
                          boxShadow: "0 0 24px -6px var(--tile-glow)",
                          border: "1px solid var(--tile-glow)",
                        }}
                      />
                      <Icon
                        className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-signature ease-signature group-hover:scale-110"
                        style={{ color: iconColor }}
                      />
                      <span className="absolute inset-x-0 bottom-0 bg-background/90 text-foreground text-[10px] sm:text-xs font-medium text-center py-1.5 translate-y-full group-hover:translate-y-0 transition-transform duration-signature ease-signature">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="mentions" className="px-6 py-24 max-w-3xl mx-auto w-full border-t border-secondary/30">
        <h2 className="font-display text-2xl font-semibold text-foreground mb-12 text-center">Mentions &amp; links</h2>

        <div className="flex flex-col gap-12">
          {mentionGroups.map((group) => (
            <div key={group.category}>
              <h3 className="font-mono text-sm text-primary mb-6 text-center">
                {group.category}
              </h3>
              <ul className="flex flex-col gap-4">
                {group.items.map((item) => (
                  <li key={item.url}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-baseline justify-between gap-4 border-b border-secondary/30 pb-3 hover:border-accent transition-colors"
                    >
                      <span className="flex flex-col">
                        <span className="text-foreground font-medium group-hover:text-accent transition-colors">
                          {item.label}
                        </span>
                        <span className="text-sm text-primary">{item.description}</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-primary group-hover:text-accent transition-colors"
                      >
                        &rarr;
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="px-6 py-24 flex flex-col items-center text-center gap-6 border-t border-secondary/30">
        <h2 className="font-display text-2xl font-semibold text-foreground">Let&apos;s connect</h2>
        <p className="text-primary max-w-sm">
          Find me on GitHub or LinkedIn.
        </p>
        <div className="flex gap-4">
          <a
            href="https://github.com/timjs42"
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-6 flex items-center justify-center rounded-full border border-secondary/30 text-foreground font-medium transition-all duration-signature ease-signature hover:border-accent hover:shadow-[0_0_30px_-12px_var(--accent)]"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/timothy-sheu-6b1719220/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-6 flex items-center justify-center rounded-full border border-secondary/30 text-foreground font-medium transition-all duration-signature ease-signature hover:border-accent hover:shadow-[0_0_30px_-12px_var(--accent)]"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </main>
  );
}
