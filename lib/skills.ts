import type { ElementType } from "react";
import {
  SiJavascript,
  SiPython,
  SiHtml5,
  SiCss,
  SiPhp,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiDrupal,
  SiGit,
  SiGithub,
  SiFigma,
  SiDocker,
  SiVercel,
  SiPandas,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { Database, Brain, Code, Server } from "lucide-react";

export type Skill = {
  name: string;
  icon: ElementType;
  color: string;
};

export type SkillCategory = {
  category: string;
  items: Skill[];
};

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    items: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "HTML", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", icon: SiCss, color: "#1572B6" },
      { name: "SQL", icon: Database, color: "#14151A" },
      { name: "Java", icon: FaJava, color: "#ED8B00" },
      { name: "PHP", icon: SiPhp, color: "#777BB4" },
    ],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Drupal", icon: SiDrupal, color: "#0678BE" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#181717" },
      { name: "VS Code", icon: Code, color: "#007ACC" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Vercel", icon: SiVercel, color: "#000000" },
      { name: "Pantheon", icon: Server, color: "#182D46" },
    ],
  },
  {
    category: "Currently Learning",
    items: [
      { name: "Machine Learning", icon: Brain, color: "#14151A" },
      { name: "Data Analysis / Pandas", icon: SiPandas, color: "#150458" },
    ],
  },
];