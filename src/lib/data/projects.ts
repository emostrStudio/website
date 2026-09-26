export type Project = {
  id: string;
  name: string;
  summary: string;
  href: string;
  tags: string[];
  year: number;
};

export const projects: Project[] = [];

export const projectSlots = 3;
