import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex-1 px-6 py-16 max-w-3xl mx-auto w-full">
      <Link
        href="/projects"
        className="text-sm text-primary hover:text-accent transition-colors mb-8 inline-block"
      >
        ← Back to projects
      </Link>

      <h1
        className="font-display text-3xl font-semibold text-foreground mb-4"
        style={{ viewTransitionName: `project-title-${project.slug}` }}
      >
        {project.title}
      </h1>

      <div className="flex gap-2 flex-wrap mb-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs px-2 py-1 rounded-full bg-secondary/20 text-primary"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-primary text-lg mb-8">{project.description}</p>

      <div className="flex gap-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-6 flex items-center justify-center rounded-full bg-accent text-background font-medium transition-all duration-signature ease-signature hover:scale-[1.03] hover:-rotate-1 hover:shadow-[0_0_30px_-8px_var(--accent)]"
          >
            View live site
          </a>
        )}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-12 px-6 flex items-center justify-center rounded-full border border-secondary/30 text-foreground font-medium hover:border-accent transition-colors"
        >
          View code
        </a>
      </div>
    </main>
  );
}
