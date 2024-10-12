import prisma from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { deleteProject } from "../actions/projectActions";

export default async function ProjectList() {
  const projects = await prisma.project.findMany();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="border dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800"
        >
          {project.imageUrl && (
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2 dark:text-white">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
            <div className="flex justify-between">
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 dark:text-blue-400 hover:underline"
                >
                  View Project
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 dark:text-blue-400 hover:underline"
                >
                  GitHub
                </a>
              )}
            </div>
            <div className="mt-4 flex justify-between">
              <Link
                href={`/dashboard/portfolio/edit/${project.id}`}
                className="text-green-500 dark:text-green-400 hover:underline"
              >
                Edit
              </Link>
              <form action={deleteProject}>
                <input type="hidden" name="id" value={project.id} />
                <button type="submit" className="text-red-500 dark:text-red-400 hover:underline">
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
