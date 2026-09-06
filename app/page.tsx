import { skills } from "@/lib/skills";
import { mentionGroups } from "@/lib/mentions";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />

      <section className="px-6 py-24 max-w-3xl mx-auto w-full border-t border-ink/10">
        <h2 className="text-2xl font-semibold text-ink mb-12 text-center">Skills</h2>

        <div className="flex flex-col gap-12">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="font-mono text-sm text-ink-secondary mb-6 text-center">
                {group.category}
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                {group.items.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <div key={skill.name} className="flex flex-col items-center gap-2">
                      <div
                        className={
                          group.category === "Currently Learning"
                            ? "w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-accent"
                            : "w-14 h-14 rounded-2xl flex items-center justify-center bg-ink/5"
                        }
                      >
                        <Icon className="w-6 h-6" style={{ color: skill.color }} />
                      </div>
                      <span className="text-xs text-ink-secondary text-center">
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

      <section id="mentions" className="px-6 py-24 max-w-3xl mx-auto w-full border-t border-ink/10">
        <h2 className="text-2xl font-semibold text-ink mb-12 text-center">Mentions &amp; links</h2>

        <div className="flex flex-col gap-12">
          {mentionGroups.map((group) => (
            <div key={group.category}>
              <h3 className="font-mono text-sm text-ink-secondary mb-6 text-center">
                {group.category}
              </h3>
              <ul className="flex flex-col gap-4">
                {group.items.map((item) => (
                  <li key={item.url}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-baseline justify-between gap-4 border-b border-ink/10 pb-3 hover:border-accent transition-colors"
                    >
                      <span className="flex flex-col">
                        <span className="text-ink font-medium group-hover:text-accent transition-colors">
                          {item.label}
                        </span>
                        <span className="text-sm text-ink-secondary">{item.description}</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-ink-secondary group-hover:text-accent transition-colors"
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

      <section id="contact" className="px-6 py-24 flex flex-col items-center text-center gap-6 border-t border-ink/10">
        <h2 className="text-2xl font-semibold text-ink">Let&apos;s connect</h2>
        <p className="text-ink-secondary max-w-sm">
          Find me on GitHub or LinkedIn.
        </p>
        <div className="flex gap-4">
          <a
            href="https://github.com/timjs42"
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-6 flex items-center justify-center rounded-full border border-ink/10 text-ink font-medium hover:border-accent transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/timothy-sheu-6b1719220/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-6 flex items-center justify-center rounded-full border border-ink/10 text-ink font-medium hover:border-accent transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </main>
  );
}