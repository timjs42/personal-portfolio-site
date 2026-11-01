export type Role = {
  title: string;
  organization: string;
  // Public page that lists you in this role, linked from the organization name.
  url?: string;
  dates: string;
  highlights: string[];
};

export const experience: Role[] = [
  {
    title: "Web Developer",
    organization: "University of Denver IT",
    url: "https://www.du.edu/it/it-directory",
    dates: "",
    highlights: [],
  },
  {
    title: "Research Assistant",
    organization: "BRAVE Lab, University of Denver",
    url: "https://liberalarts.du.edu/psychology/brave/people",
    dates: "",
    highlights: [],
  },
  {
    title: "Program Coordinator",
    organization: "",
    dates: "",
    highlights: [],
  },
];
