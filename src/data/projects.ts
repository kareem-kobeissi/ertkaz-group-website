export type ProjectVisual = "axial" | "link" | "field";

export type Project = {
  id: string;
  title: string;
  category: string;
  destination: string | null;
  visual: ProjectVisual;
};

export const projects: Project[] = [
  {
    id: "01",
    title: "Project Placeholder 01",
    category: "Category pending",
    destination: null,
    visual: "axial",
  },
  {
    id: "02",
    title: "Project Placeholder 02",
    category: "Category pending",
    destination: null,
    visual: "link",
  },
  {
    id: "03",
    title: "Project Placeholder 03",
    category: "Category pending",
    destination: null,
    visual: "field",
  },
];
