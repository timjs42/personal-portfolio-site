import Image from "next/image";
import type { CSSProperties } from "react";
import type { Domain, Project } from "@/lib/projects";

export const DOMAIN_COLORS: Record<Domain, string> = {
  Web: "var(--domain-web)",
  Data: "var(--domain-data)",
  ML: "var(--domain-ml)",
};

// Screenshot for a project, or a domain-tinted panel until one is added.
// The parent sets the size; the thumb fills it.
export default function ProjectThumb({
  project,
  sizes,
  className = "",
  priority = false,
}: {
  project: Project;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-[color-mix(in_oklab,var(--dc)_14%,var(--background))] ${className}`}
      style={{ "--dc": DOMAIN_COLORS[project.domain] } as CSSProperties}
    >
      {project.image ? (
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(color-mix(in_oklab,var(--dc)_35%,transparent)_1px,transparent_1px)] bg-size-[14px_14px]"
        >
          <span className="font-mono text-xs text-(--dc)">/{project.domain.toLowerCase()}</span>
        </div>
      )}
    </div>
  );
}
