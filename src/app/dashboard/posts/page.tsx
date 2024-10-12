import PostsList from "@/components/dashpost-list";
import Spinner from "@/components/spinner";
import { Suspense } from "react";

export default async function Page() {
  return (
    <main className="text-center pt-16 px-5 bg-white dark:bg-gray-900">
      <h1 className="text-4xl md:text-5xl font-bold mb-5 text-gray-900 dark:text-white">
        All posts
      </h1>

      <Suspense fallback={<Spinner />}>
        <PostsList />
      </Suspense>
    </main>
  );
}
