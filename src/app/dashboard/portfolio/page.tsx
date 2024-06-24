import ProjectList from "@/components/dashProjectList";
import Link from "next/link";

export default function PortfolioPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Portfolio</h1>
      <Link
        href="/dashboard/portfolio/new"
        className="inline-block mb-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add New Project
      </Link>
      <ProjectList />
    </main>
  );
}
