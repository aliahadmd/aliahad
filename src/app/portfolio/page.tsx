import ProjectList from "@/components/ProjectList";
import { Suspense } from "react";


export default function PortfolioPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Portfolio</h1>
      <Suspense fallback="Loading...">
      <ProjectList />
      </Suspense>
    </main>
  );
}

