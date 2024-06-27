// src/components/getpost.tsx
import MarkdownComponents from "@/components/markdownComponents";
import prisma from "@/lib/db";
import { Post } from "@prisma/client";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Suspense } from "react";

async function getPostBySlug(slug: string): Promise<Post | null> {
  return await prisma.post.findUnique({
    where: { slug: slug },
  });
}


function PostContent({ post }: { post: Post }) {
  return (
    <Suspense fallback="Loading...">
      <ReactMarkdown
        components={MarkdownComponents}
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
      >
        {post.body.replace(/```mermaid/g, "```mermaid\n")}
      </ReactMarkdown>
    </Suspense>
  );
}

export { getPostBySlug, PostContent };
