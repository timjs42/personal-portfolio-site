import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";

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
        className="text-sm text-ink-secondary hover:text-accent transition-colors mb-8 inline-block"
      >
        ← Back to projects
      </Link>

      <h1 className="text-3xl font-semibold text-ink mb-4">{project.title}</h1>

      <div className="flex gap-2 flex-wrap mb-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs px-2 py-1 rounded-full bg-ink/5 text-ink-secondary"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-ink-secondary text-lg mb-8">{project.description}</p>

      <div className="flex gap-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-6 flex items-center justify-center rounded-full bg-ink text-paper font-medium transition-transform duration-200 hover:scale-105 hover:-rotate-2"
          >
            View live site
          </a>
        )}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-12 px-6 flex items-center justify-center rounded-full border border-ink/10 text-ink font-medium hover:border-accent transition-colors"
        >
          View code
        </a>
      </div>
    </main>
  );
}