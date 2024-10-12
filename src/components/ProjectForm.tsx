import { createProject, updateProject } from "@/actions/projectActions";
import { Project } from "@/types/project";

interface ProjectFormProps {
  project?: Project | null;
}

export default function ProjectForm({ project = null }: ProjectFormProps) {
  const action = project ? updateProject : createProject;

  return (
    <form action={action} className="space-y-4">
      {project && <input type="hidden" name="id" value={project.id} />}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          defaultValue={project?.title}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          required
          defaultValue={project?.description}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
        ></textarea>
      </div>
      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Image URL
        </label>
        <input
          type="url"
          name="imageUrl"
          id="imageUrl"
          defaultValue={project?.imageUrl ?? undefined}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div>
        <label
          htmlFor="projectUrl"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Project URL
        </label>
        <input
          type="url"
          name="projectUrl"
          id="projectUrl"
          defaultValue={project?.projectUrl ?? undefined}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div>
        <label
          htmlFor="githubUrl"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          GitHub URL
        </label>
        <input
          type="url"
          name="githubUrl"
          id="githubUrl"
          defaultValue={project?.githubUrl ?? undefined}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
        >
          {project ? "Update Project" : "Create Project"}
        </button>
      </div>
    </form>
  );
}
