export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  projectUrl: string | null;
  githubUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
