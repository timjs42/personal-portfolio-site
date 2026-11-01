import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { projects } from "@/lib/projects";
import { caseStudies } from "@/lib/case-studies";
import ProjectThumb, { DOMAIN_COLORS } from "@/components/ProjectThumb";
import { ProjectEyebrow, ProjectHighlights, ProjectSpecs } from "@/components/ProjectSpec";

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

  const caseStudy = caseStudies[project.slug];

  return (
    <main
      className="flex-1 px-6 py-16 max-w-3xl mx-auto w-full"
      style={{ "--dc": DOMAIN_COLORS[project.domain] } as CSSProperties}
    >
      <Link
        href="/projects"
        className="text-sm text-primary hover:text-accent transition-colors mb-8 inline-block"
      >
        ← Back to projects
      </Link>

      <article className="grid grid-cols-[6px_minmax(0,1fr)] overflow-hidden rounded-2xl border border-line">
        <div className="bg-(--dc)" aria-hidden />
        <div className="p-6 sm:p-8">
          <ProjectEyebrow project={project} />

          <h1
            className="font-display text-3xl font-semibold text-foreground mt-2 mb-3"
            style={{ viewTransitionName: `project-title-${project.slug}` }}
          >
            {project.title}
          </h1>

          <p className="text-primary text-lg leading-relaxed mb-6">{project.description}</p>

          {/* The placeholder is fine on small cards but would dominate here. */}
          {project.image && (
            <ProjectThumb
              project={project}
              sizes="(min-width: 768px) 680px, 100vw"
              priority
              className="aspect-16/10 rounded-lg border border-line mb-6"
            />
          )}

          <ProjectHighlights project={project} className="mb-6" />
          <ProjectSpecs project={project} showLinks={false} className="mb-8" />

          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-6 flex items-center justify-center rounded-full bg-(--dc) text-background font-medium transition-[scale,rotate,box-shadow] duration-signature ease-signature hover:scale-[1.03] hover:-rotate-1 hover:shadow-[0_0_30px_-8px_var(--dc)]"
              >
                View live site
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-6 flex items-center justify-center rounded-full border border-line text-foreground font-medium hover:border-(--dc) transition-colors"
            >
              View code
            </a>
          </div>
        </div>
      </article>

      {caseStudy && (
        <div className="mt-16 flex flex-col gap-12">
          <CaseStudySection title="The problem">
            <p className="text-primary leading-relaxed">{caseStudy.problem}</p>
          </CaseStudySection>
          <CaseStudyList title="Key decisions" items={caseStudy.decisions} />
          <CaseStudyList title="Challenges" items={caseStudy.challenges} />
          <CaseStudyList title="Results" items={caseStudy.results} />
          <CaseStudyList title="What's next" items={caseStudy.next} />
        </div>
      )}
    </main>
  );
}

function CaseStudySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold text-foreground mb-4">{title}</h2>
      {children}
    </section>
  );
}

function CaseStudyList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <CaseStudySection title={title}>
      <ul className="flex flex-col gap-3 text-primary leading-relaxed list-disc pl-5 marker:text-(--dc)">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </CaseStudySection>
  );
}
