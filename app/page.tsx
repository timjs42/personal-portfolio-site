import type { CSSProperties } from "react";
import { skills } from "@/lib/skills";
import { mentionGroups } from "@/lib/mentions";
import { experience } from "@/lib/experience";
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

      <section id="experience" className="px-6 py-24 max-w-3xl mx-auto w-full border-t border-line">
        <h2 className="font-display text-2xl font-semibold text-foreground mb-12 text-center">Experience</h2>

        <ol className="flex flex-col gap-4">
          {experience.map((role) => (
            <li
              key={`${role.title}-${role.organization}`}
              className="flex flex-col gap-2 border-b border-line pb-4"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <span className="flex flex-col">
                  <span className="text-foreground font-medium">{role.title}</span>
                  {role.organization && (
                    <span className="text-sm text-primary">{role.organization}</span>
                  )}
                </span>
                {role.dates && (
                  <span className="font-mono text-xs text-primary shrink-0">{role.dates}</span>
                )}
              </div>
              {role.highlights.length > 0 && (
                <ul className="flex flex-col gap-1 text-sm text-primary list-disc pl-5 marker:text-accent">
                  {role.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section id="skills" className="px-6 py-24 max-w-3xl mx-auto w-full border-t border-line">
        <h2 className="font-display text-2xl font-semibold text-foreground mb-12 text-center">Skills</h2>

        <div className="flex flex-col gap-12">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="font-mono text-sm text-primary mb-6 text-center">
                {group.category}
              </h3>
              <ul className="flex flex-wrap justify-center gap-3">
                {group.items.map((skill) => {
                  const Icon = skill.icon;
                  const tooDark = isTooDarkForTile(skill.color);
                  const glowColor = tooDark ? "var(--accent)" : skill.color;
                  const iconColor = tooDark ? "var(--foreground)" : skill.color;
                  return (
                    <li
                      key={skill.name}
                      className={
                        group.category === "Currently Learning"
                          ? "group relative flex items-center gap-2.5 rounded-xl border border-accent/60 bg-secondary/10 px-3.5 py-2.5 transition-transform duration-signature ease-signature hover:-translate-y-0.5"
                          : "group relative flex items-center gap-2.5 rounded-xl border border-line bg-secondary/10 px-3.5 py-2.5 transition-transform duration-signature ease-signature hover:-translate-y-0.5"
                      }
                      style={{ "--tile-glow": glowColor } as CSSProperties}
                    >
                      <div
                        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-signature ease-signature group-hover:opacity-100"
                        style={{
                          boxShadow: "0 0 24px -6px var(--tile-glow)",
                          border: "1px solid var(--tile-glow)",
                        }}
                      />
                      <Icon aria-hidden className="size-5 shrink-0" style={{ color: iconColor }} />
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="mentions" className="px-6 py-24 max-w-3xl mx-auto w-full border-t border-line">
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
                      className="group flex items-baseline justify-between gap-4 border-b border-line pb-3 hover:border-accent transition-colors"
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

      <section id="contact" className="px-6 py-24 flex flex-col items-center text-center gap-6 border-t border-line">
        <h2 className="font-display text-2xl font-semibold text-foreground">Let&apos;s connect</h2>
        <p className="text-primary max-w-sm">
          Find me on GitHub or LinkedIn.
        </p>
        <div className="flex gap-4">
          <a
            href="https://github.com/timjs42"
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-6 flex items-center justify-center rounded-full border border-line text-foreground font-medium transition-[border-color,box-shadow] duration-signature ease-signature hover:border-accent hover:shadow-[0_0_30px_-12px_var(--accent)]"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/timothy-sheu/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-6 flex items-center justify-center rounded-full border border-line text-foreground font-medium transition-[border-color,box-shadow] duration-signature ease-signature hover:border-accent hover:shadow-[0_0_30px_-12px_var(--accent)]"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </main>
  );
}
