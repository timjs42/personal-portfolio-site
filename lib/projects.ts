export type Project = {
  slug: string;
  title: string;
  description: string;
  liveUrl: string;
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
];