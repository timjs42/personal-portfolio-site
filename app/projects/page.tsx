import { Link } from "next-view-transitions";
import { projects } from "@/lib/projects";

export default function Projects() {
  return (
    <main className="flex-1 px-6 py-16 max-w-3xl mx-auto w-full">
      <h1 className="font-display text-3xl font-semibold text-foreground mb-10">Projects</h1>

      <div className="grid gap-6">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="block p-6 rounded-2xl border border-secondary/30 hover:border-accent hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_0_40px_-10px_var(--accent)] transition-all duration-signature ease-signature"
          >
            <h2
              className="font-display text-xl font-semibold text-foreground mb-2"
              style={{ viewTransitionName: `project-title-${project.slug}` }}
            >
              {project.title}
            </h2>
            <p className="text-primary mb-4">{project.description}</p>
            <div className="flex gap-2 flex-wrap">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2 py-1 rounded-full bg-secondary/20 text-primary"
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
