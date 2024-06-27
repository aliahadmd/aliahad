// src/app/posts/[slug]/page.tsx
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPostBySlug, PostContent } from "@/components/getpost";
import { format } from "date-fns";

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            {post.title}
          </h1>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-600 mb-8">
            <p>
              Published: {format(new Date(post.createdAt), "MMMM dd, yyyy")}
            </p>
            <span>•</span>
            <p>
              Last Updated: {format(new Date(post.updatedAt), "MMMM dd, yyyy")}
            </p>
          </div>
          <div className="prose prose-lg max-w-none">
            <Suspense fallback="Loading...">
              <PostContent post={post} />
            </Suspense>
          </div>
        </div>
      </article>
    </main>
  );
}
