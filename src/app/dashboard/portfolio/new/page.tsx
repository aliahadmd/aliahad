import ProjectForm from "@/components/ProjectForm";

export default function NewProjectPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Project</h1>
      <ProjectForm />
    </main>
  );
}
