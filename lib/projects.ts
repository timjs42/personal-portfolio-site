export type Project = {
  slug: string;
  title: string;
  description: string;
  liveUrl?: string;
  githubUrl: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    slug: "medical-student-portfolio",
    title: "Medical Student Portfolio",
    description:
      "A personal portfolio website built for a medical student to showcase her research, clinical experience, and CV to residency programs and collaborators.",
    liveUrl: "https://angelsheu.com",
    githubUrl: "https://github.com/timjs42/Med-Student-Site",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    slug: "cancer-diagnosis",
    title: "Tumor Marker Cancer Classifier",
    description:
      "A Gaussian Naive Bayes classifier that ranks candidate cancer types and stages from tumor marker levels, packaged as a tested Python library with a CLI and a lightweight web demo.",
    githubUrl: "https://github.com/timjs42/CancerDiagnosis",
    tags: ["Python", "Naive Bayes", "pytest"],
  },
];