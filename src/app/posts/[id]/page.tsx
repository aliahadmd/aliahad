import { Suspense } from "react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import "katex/dist/katex.min.css";
import React from "react";
import MarkdownComponents from "@/components/markdownComponents"
import prisma from "@/lib/db";
import { Post } from "@prisma/client";

async function getPost(id: string): Promise<Post | null> {
  return await prisma.post.findUnique({
    where: { id: parseInt(id) },
  });
}


function PostContent({ post }: { post: Post }) {
  return (
    <article className="max-w-3xl mx-auto overflow-hidden">
      <div className="px-6 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          {post.title}
        </h1>
        <div className="flex justify-center items-center space-x-4 text-sm text-gray-600 mb-8">
          <p>Published: {format(new Date(post.createdAt), "MMMM dd, yyyy")}</p>
          <span>•</span>
          <p>
            Last Updated: {format(new Date(post.updatedAt), "MMMM dd, yyyy")}
          </p>
        </div>
        <div className="prose prose-lg max-w-none">
          <Suspense fallback="Loading...">
            <ReactMarkdown
              components={MarkdownComponents}
              remarkPlugins={[remarkMath, remarkGfm]}
              rehypePlugins={[rehypeKatex]}
            >
              {post.body.replace(/```mermaid/g, "```mermaid\n")}
            </ReactMarkdown>
          </Suspense>
        </div>
      </div>
    </article>
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div>Loading...</div>}>
        <PostContent post={post} />
      </Suspense>
    </main>
  );
}
