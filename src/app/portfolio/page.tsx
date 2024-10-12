import ProjectList from "@/components/ProjectList";
import Spinner from "@/components/spinner";
import { Suspense } from "react";

export default function PortfolioPage() {
  return (
    <main className="container mx-auto px-4 py-8 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">My Portfolio</h1>
      <Suspense fallback={<Spinner />}>
        <ProjectList />
      </Suspense>
    </main>
  );
}
