"use client";

import type { CSSProperties } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "next-view-transitions";
import { projects, type Domain, type Project } from "@/lib/projects";
import ProjectThumb, { DOMAIN_COLORS } from "@/components/ProjectThumb";
import { ProjectEyebrow, ProjectHighlights, ProjectSpecs } from "@/components/ProjectSpec";

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
  const results = projects.filter((p) => matches(p, filters));
  const activeCount = Object.values(filters).reduce((n, values) => n + values.length, 0);

  return (
    <div>
      <div className="flex items-baseline justify-between mb-6">
        <h1 className="font-display text-3xl font-semibold text-foreground">Projects</h1>
        <p className="font-mono text-xs text-primary" aria-live="polite">
          {results.length} of {projects.length}
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {GROUPS.map((group) => (
          <div
            key={group.key}
            role="group"
            aria-labelledby={`filter-${group.key}`}
            className="flex flex-wrap items-center gap-2"
          >
            <span id={`filter-${group.key}`} className="w-20 shrink-0 font-mono text-xs text-secondary">
              {group.label.toLowerCase()}
            </span>
            {optionsFor(group).map((value) => {
              const checked = filters[group.key]?.includes(value) ?? false;
              const count = projects.filter(
                (p) => matches(p, filters, group.key) && group.valuesOf(p).includes(value),
              ).length;
              const color =
                group.key === "domain" ? DOMAIN_COLORS[value as Domain] : "var(--accent)";
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={checked}
                  disabled={count === 0 && !checked}
                  onClick={() => onToggle?.(group.key, value)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--c) ${
                    checked
                      ? "border-(--c) bg-[color-mix(in_oklab,var(--c)_18%,transparent)] text-foreground"
                      : "border-line text-primary hover:border-(--c) hover:text-foreground"
                  }`}
                  style={{ "--c": color } as CSSProperties}
                >
                  {value}
                  <span className="font-mono text-xs text-secondary">{count}</span>
                </button>
              );
            })}
          </div>
        ))}
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="self-start font-mono text-xs text-accent hover:text-foreground transition-colors"
          >
            clear filters ({activeCount})
          </button>
        )}
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
  );
}

function SpecCard({ project }: { project: Project }) {
  return (
    <article
      className="group relative grid grid-cols-[6px_minmax(0,1fr)] overflow-hidden rounded-2xl border border-line hover:border-(--dc) hover:-translate-y-1 hover:shadow-[0_0_40px_-12px_var(--dc)] transition-[translate,border-color,box-shadow] duration-signature ease-signature"
      style={{ "--dc": DOMAIN_COLORS[project.domain] } as CSSProperties}
    >
      <div className="bg-(--dc)" aria-hidden />
      <div className="p-6">
        <ProjectEyebrow project={project} />

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

        <ProjectHighlights project={project} className="mb-5" />
        <ProjectSpecs project={project} />
      </div>
    </article>
  );
}
