import ProjectList from "@/components/dashProjectList";
import Link from "next/link";

export default function PortfolioPage() {
  return (
    <main className="container mx-auto px-4 py-8 bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">My Portfolio</h1>
      <Link
        href="/dashboard/portfolio/new"
        className="inline-block mb-6 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
      >
        Add New Project
      </Link>
      <ProjectList />
    </main>
  );
}
