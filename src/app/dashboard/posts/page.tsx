import PostsList from "@/components/dashpost-list";
import Spinner from "@/components/spinner";
import { Suspense } from "react";

export default async function Page() {
  return (
    <main className="text-center pt-16 px-5">
      <h1 className="text-4xl md:text-5xl font-bold mb-5">All posts</h1>

      <Suspense fallback={<Spinner />}>
        <PostsList />
      </Suspense>
    </main>
  );
}
