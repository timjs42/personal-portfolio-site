export type LinkItem = {
  label: string;
  description: string;
  url: string;
};

export type LinkGroup = {
  category: string;
  items: LinkItem[];
};

export const mentionGroups: LinkGroup[] = [
  {
    category: "Mentioned on",
    items: [
      {
        label: "BRAVE Lab — University of Denver",
        description: "Department of Psychology",
        url: "https://liberalarts.du.edu/psychology/brave/people",
      },
      {
        label: "University of Denver Directory",
        description: "Official university directory profile",
        url: "https://directory.du.edu/directory?directPerson=MTc3NDc0Mg==",
      },
      {
        label: "DU IT Directory",
        description: "University of Denver IT team",
        url: "https://www.du.edu/it/it-directory",
      },
    ],
  },
];
