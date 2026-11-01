export type Domain = "Web" | "Data" | "ML";

export type Project = {
  slug: string;
  title: string;
  description: string;
  liveUrl?: string;
  githubUrl: string;
  image?: string;
  domain: Domain;
  languages: string[];
  frameworks: string[];
  tools: string[];
  highlights: [string, string, string];
};

export const projects: Project[] = [
  {
    slug: "medical-student-portfolio",
    title: "Medical Student Portfolio",
    description:
      "A personal portfolio website built for a medical student to showcase her research, clinical experience, and CV to residency programs and collaborators.",
    liveUrl: "https://angelsheu.com",
    githubUrl: "https://github.com/timjs42/med-student-site",
    domain: "Web",
    languages: ["HTML", "CSS", "JavaScript"],
    frameworks: [],
    tools: [],
    highlights: ["Client project", "Research and CV showcase", "Live at angelsheu.com"],
  },
  {
    slug: "cancer-diagnosis",
    title: "Tumor Marker Cancer Classifier",
    description:
      "A Gaussian Naive Bayes classifier that ranks candidate cancer types and stages from tumor marker levels, packaged as a tested Python library with a CLI and a lightweight web demo.",
    githubUrl: "https://github.com/timjs42/cancer-classifier",
    domain: "ML",
    languages: ["Python"],
    frameworks: [],
    tools: ["Naive Bayes", "pytest"],
    highlights: ["Gaussian Naive Bayes", "CLI and web demo", "Tested Python library"],
  },
  {
    slug: "uptime-monitor",
    title: "Uptime Monitor",
    description:
      "A full-stack uptime monitoring dashboard that checks a set of websites every 5 minutes, records HTTP status and response times, and shows uptime and latency history. Built with Next.js and PostgreSQL via Supabase, using Supabase Cron to trigger scheduled health checks.",
    githubUrl: "https://github.com/timjs42/uptime-monitor",
    liveUrl: "https://uptime-monitor-gamma-three.vercel.app/",
    domain: "Web",
    languages: ["TypeScript"],
    frameworks: ["Next.js", "Tailwind CSS"],
    tools: ["PostgreSQL", "Supabase"],
    highlights: ["Checks every 5 minutes", "Status and latency logs", "24-hour uptime history"],
  },
  {
    slug: "used-car-deal-finder",
    title: "Used Car Deal Finder",
    description:
      "An interactive Dash dashboard for exploring used car listings and surfacing potential deals, vehicles priced below the median for comparable manufacturer, model, and year combinations. Includes a stratified-sampling data pipeline, pytest coverage, and CI via GitHub Actions.",
    liveUrl: "https://used-car-deal-finder.onrender.com/",
    githubUrl: "https://github.com/timjs42/used-car-deal-finder",
    domain: "Data",
    languages: ["Python"],
    frameworks: ["Dash"],
    tools: ["Plotly", "pandas", "pytest"],
    highlights: ["Below-median deal finder", "Stratified-sampling pipeline", "CI via GitHub Actions"],
  },
];

// Flat list of everything a project uses, for tag-pill displays.
export function stackOf(project: Project): string[] {
  return [...project.languages, ...project.frameworks, ...project.tools];
}
