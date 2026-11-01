import type { ElementType } from "react";
import {
  SiCss,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiPandas,
  SiPlotly,
  SiPostgresql,
  SiPytest,
  SiPython,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { ArrowUpRight, Brain, Code, Globe } from "lucide-react";
import { projects, type Project } from "@/lib/projects";

const TECH_ICONS: Record<string, ElementType> = {
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Python: SiPython,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  Dash: SiPlotly,
  Plotly: SiPlotly,
  pandas: SiPandas,
  pytest: SiPytest,
  PostgreSQL: SiPostgresql,
  Supabase: SiSupabase,
  "Naive Bayes": Brain,
};

function TechList({ items }: { items: string[] }) {
  if (items.length === 0) return <span className="text-primary">vanilla</span>;
  return (
    <span className="flex flex-wrap gap-x-3 gap-y-1 text-primary">
      {items.map((item) => {
        const Icon = TECH_ICONS[item] ?? Code;
        return (
          <span key={item} className="inline-flex items-center gap-1.5">
            <Icon className="size-3 text-(--dc)" aria-hidden />
            {item}
          </span>
        );
      })}
    </span>
  );
}

export function ProjectEyebrow({ project }: { project: Project }) {
  const index = projects.indexOf(project) + 1;
  return (
    <div className="flex items-center justify-between font-mono text-xs">
      <span className="text-(--dc)">
        {String(index).padStart(2, "0")} / {project.domain.toLowerCase()}
      </span>
      {project.liveUrl && (
        <span className="flex items-center gap-1.5 text-primary">
          <span className="size-1.5 rounded-full bg-(--dc)" aria-hidden />
          live
        </span>
      )}
    </div>
  );
}

export function ProjectHighlights({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <ul className={`grid gap-2 sm:grid-cols-3 ${className}`}>
      {project.highlights.map((highlight) => (
        <li
          key={highlight}
          className="flex items-start gap-2 rounded-lg border border-line px-3 py-2 text-xs text-foreground"
        >
          <span className="mt-1.5 size-1 shrink-0 rounded-full bg-(--dc)" aria-hidden />
          {highlight}
        </li>
      ))}
    </ul>
  );
}

export function ProjectSpecs({
  project,
  showLinks = true,
  className = "",
}: {
  project: Project;
  showLinks?: boolean;
  className?: string;
}) {
  return (
    <dl className={`grid grid-cols-[4.5rem_minmax(0,1fr)] gap-y-2 font-mono text-xs ${className}`}>
      <dt className="text-secondary">lang</dt>
      <dd>
        <TechList items={project.languages} />
      </dd>
      <dt className="text-secondary">stack</dt>
      <dd>
        <TechList items={[...project.frameworks, ...project.tools]} />
      </dd>
      {showLinks && (
        <>
          <dt className="text-secondary">links</dt>
          <dd className="relative z-10 flex gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-(--dc) hover:text-foreground transition-colors"
              >
                <Globe className="size-3" aria-hidden />
                live
                <ArrowUpRight className="size-3" aria-hidden />
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:text-foreground transition-colors"
            >
              <SiGithub className="size-3" aria-hidden />
              code
              <ArrowUpRight className="size-3" aria-hidden />
            </a>
          </dd>
        </>
      )}
    </dl>
  );
}
