"use client";

import { useState, type CSSProperties, type ElementType } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "next-view-transitions";
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
import { ArrowUpRight, Brain, Code, Globe, SlidersHorizontal } from "lucide-react";
import { projects, type Domain, type Project } from "@/lib/projects";
import ProjectThumb, { DOMAIN_COLORS } from "@/components/ProjectThumb";

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

type Group = {
  // URL search param key, e.g. /projects?lang=Python&domain=Web
  key: string;
  label: string;
  valuesOf: (project: Project) => string[];
};

const GROUPS: Group[] = [
  { key: "lang", label: "Language", valuesOf: (p) => p.languages },
  { key: "framework", label: "Framework", valuesOf: (p) => p.frameworks },
  { key: "domain", label: "Domain", valuesOf: (p) => [p.domain] },
];

const DOMAIN_ORDER: Domain[] = ["Web", "Data", "ML"];

function optionsFor(group: Group): string[] {
  const values = [...new Set(projects.flatMap(group.valuesOf))];
  if (group.key === "domain") {
    return DOMAIN_ORDER.filter((d) => values.includes(d));
  }
  return values.sort((a, b) => a.localeCompare(b));
}

type Filters = Record<string, string[]>;

// OR within a group, AND across groups. `skip` leaves one group out, which
// gives each option a count that reflects the other active filters.
function matches(project: Project, filters: Filters, skip?: string) {
  return GROUPS.every((group) => {
    const selected = filters[group.key] ?? [];
    if (group.key === skip || selected.length === 0) return true;
    return group.valuesOf(project).some((v) => selected.includes(v));
  });
}

export default function ProjectBrowser() {
  const searchParams = useSearchParams();
  const filters: Filters = Object.fromEntries(
    GROUPS.map((g) => [g.key, searchParams.getAll(g.key)]),
  );

  // Native history updates sync with useSearchParams without a server
  // round trip, and replaceState keeps filter clicks out of the back stack.
  function writeFilters(next: Filters) {
    const params = new URLSearchParams();
    for (const group of GROUPS) {
      for (const value of next[group.key] ?? []) params.append(group.key, value);
    }
    const query = params.toString();
    window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
  }

  function toggle(key: string, value: string) {
    const current = filters[key] ?? [];
    writeFilters({
      ...filters,
      [key]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
    });
  }

  return <ProjectBrowserView filters={filters} onToggle={toggle} onClear={() => writeFilters({})} />;
}

// Rendered during prerendering, before search params are known.
export function ProjectBrowserFallback() {
  return <ProjectBrowserView filters={{}} />;
}

function ProjectBrowserView({
  filters,
  onToggle,
  onClear,
}: {
  filters: Filters;
  onToggle?: (key: string, value: string) => void;
  onClear?: () => void;
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const results = projects.filter((p) => matches(p, filters));
  const activeCount = Object.values(filters).reduce((n, values) => n + values.length, 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="flex items-baseline justify-between">
          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            aria-controls="project-filters"
            className="flex items-center gap-2 font-display text-sm font-semibold text-foreground lg:pointer-events-none"
          >
            <SlidersHorizontal className="size-4 lg:hidden" aria-hidden />
            Filters
            {activeCount > 0 && (
              <span className="font-mono text-xs text-accent">({activeCount})</span>
            )}
          </button>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="font-mono text-xs text-accent hover:text-foreground transition-colors"
            >
              clear
            </button>
          )}
        </div>

        <div
          id="project-filters"
          className={`${filtersOpen ? "block" : "hidden"} lg:block lg:border-r lg:border-line lg:pr-6`}
        >
          {GROUPS.map((group) => (
            <fieldset key={group.key} className="mt-6">
              <legend className="font-mono text-xs text-secondary mb-2">
                {group.label.toLowerCase()}
              </legend>
              {optionsFor(group).map((value) => {
                const checked = filters[group.key]?.includes(value) ?? false;
                const count = projects.filter(
                  (p) => matches(p, filters, group.key) && group.valuesOf(p).includes(value),
                ).length;
                const color =
                  group.key === "domain" ? DOMAIN_COLORS[value as Domain] : "var(--accent)";
                return (
                  <label
                    key={value}
                    className={`flex items-center justify-between gap-3 py-1 text-sm cursor-pointer transition-colors ${
                      checked ? "text-foreground" : "text-primary hover:text-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggle?.(group.key, value)}
                        className="size-3.5 appearance-none rounded-[4px] border border-secondary checked:border-(--c) checked:bg-(--c) transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        style={{ "--c": color } as CSSProperties}
                      />
                      {value}
                    </span>
                    <span className="font-mono text-xs text-secondary">{count}</span>
                  </label>
                );
              })}
            </fieldset>
          ))}
        </div>
      </aside>

      <div>
        <div className="flex items-baseline justify-between mb-8">
          <h1 className="font-display text-3xl font-semibold text-foreground">Projects</h1>
          <p className="font-mono text-xs text-primary" aria-live="polite">
            {results.length} of {projects.length}
          </p>
        </div>

        {results.length > 0 ? (
          <div className="grid gap-6">
            {results.map((project) => (
              <SpecCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-secondary/50 p-8 text-center text-sm text-primary">
            No projects match those filters.{" "}
            <button type="button" onClick={onClear} className="text-accent hover:text-foreground transition-colors">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

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

function SpecCard({ project }: { project: Project }) {
  const index = projects.indexOf(project) + 1;

  return (
    <article
      className="group relative grid grid-cols-[6px_minmax(0,1fr)] overflow-hidden rounded-2xl border border-line hover:border-(--dc) hover:-translate-y-1 hover:shadow-[0_0_40px_-12px_var(--dc)] transition-[translate,border-color,box-shadow] duration-signature ease-signature"
      style={{ "--dc": DOMAIN_COLORS[project.domain] } as CSSProperties}
    >
      <div className="bg-(--dc)" aria-hidden />
      <div className="p-6">
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

        <h2
          className="font-display text-xl font-semibold text-foreground mt-2 mb-2"
          style={{ viewTransitionName: `project-title-${project.slug}` }}
        >
          {/* Stretched link: the whole card opens the project, while the
              live/code links below sit above it and stay clickable. */}
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-(--dc)"
          >
            {project.title}
          </Link>
        </h2>
        <div className="grid gap-4 mb-5 md:grid-cols-[minmax(0,1fr)_14rem]">
          <p className="text-primary text-sm leading-relaxed">{project.description}</p>
          <ProjectThumb
            project={project}
            sizes="(min-width: 768px) 14rem, 100vw"
            className="aspect-16/10 rounded-lg border border-line"
          />
        </div>

        <ul className="grid gap-2 sm:grid-cols-3 mb-5">
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

        <dl className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-y-2 font-mono text-xs">
          <dt className="text-secondary">lang</dt>
          <dd>
            <TechList items={project.languages} />
          </dd>
          <dt className="text-secondary">stack</dt>
          <dd>
            <TechList items={[...project.frameworks, ...project.tools]} />
          </dd>
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
        </dl>
      </div>
    </article>
  );
}
