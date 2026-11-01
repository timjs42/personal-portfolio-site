import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";
import { projects, stackOf } from "@/lib/projects";
import { caseStudies } from "@/lib/case-studies";
import ProjectThumb from "@/components/ProjectThumb";

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
        {stackOf(project).map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs px-2 py-1 rounded-full bg-secondary/20 text-primary"
          >
            {tag}
          </span>
        ))}
      </div>

      <ProjectThumb
        project={project}
        sizes="(min-width: 768px) 720px, 100vw"
        priority
        className="aspect-16/10 rounded-2xl border border-secondary/30 mb-8"
      />

      <p className="text-primary text-lg mb-8">{project.description}</p>

      <div className="flex gap-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-6 flex items-center justify-center rounded-full bg-accent text-background font-medium transition-[scale,rotate,box-shadow] duration-signature ease-signature hover:scale-[1.03] hover:-rotate-1 hover:shadow-[0_0_30px_-8px_var(--accent)]"
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

      {caseStudy && (
        <div className="mt-16 flex flex-col gap-12 border-t border-secondary/30 pt-12">
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
      <ul className="flex flex-col gap-3 text-primary leading-relaxed list-disc pl-5 marker:text-accent">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </CaseStudySection>
  );
}
