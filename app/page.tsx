import Link from "next/link";
import { skills } from "@/lib/skills";
import { mentionGroups } from "@/lib/mentions";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="min-h-[calc(100dvh-73px)] flex flex-col items-center justify-center px-6 relative">
        <div className="absolute top-16 left-8 w-16 h-16 rounded-full bg-accent" aria-hidden="true" />
        <div className="absolute bottom-20 right-10 w-10 h-10 rounded-lg bg-ink rotate-12" aria-hidden="true" />
        <div className="flex flex-col items-center gap-6 text-center max-w-xl">
          <p className="font-mono text-sm text-ink-secondary">Hi, I&apos;m Timothy Sheu</p>

          <h1 className="text-4xl sm:text-5xl font-semibold text-ink leading-tight">
            Full-stack developer building things that work.
          </h1>

          <p className="text-lg text-ink-secondary max-w-md">
            I&apos;m a web developer currently pursuing a Master&apos;s in Applied Data Science and AI, with a passion for building clean, functional software.
          </p>

          <Link href="/projects" className="mt-4 h-12 px-6 flex items-center justify-center rounded-full bg-ink text-paper font-medium transition-transform duration-200 hover:scale-105 hover:-rotate-2">
            See my projects
          </Link>
        </div>
      </section>

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