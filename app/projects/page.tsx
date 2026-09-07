import { Link } from "next-view-transitions";
import { projects } from "@/lib/projects";

export default function Projects() {
  return (
    <main className="flex-1 px-6 py-16 max-w-3xl mx-auto w-full">
      <h1 className="text-3xl font-semibold text-ink mb-10">Projects</h1>

      <div className="grid gap-6">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="block p-6 rounded-2xl border border-ink/10 hover:border-accent hover:-translate-y-1 hover:scale-[0.985] transition-all duration-signature ease-signature"
          >
            <h2
              className="text-xl font-semibold text-ink mb-2"
              style={{ viewTransitionName: `project-title-${project.slug}` }}
            >
              {project.title}
            </h2>
            <p className="text-ink-secondary mb-4">{project.description}</p>
            <div className="flex gap-2 flex-wrap">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2 py-1 rounded-full bg-ink/5 text-ink-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}