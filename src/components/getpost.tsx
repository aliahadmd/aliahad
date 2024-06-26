import MarkdownComponents from "@/components/markdownComponents";
import prisma from "@/lib/db";
import { Post } from "@prisma/client";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Suspense } from "react";

async function getPost(id: string): Promise<Post | null> {
  return await prisma.post.findUnique({
    where: { id: parseInt(id) },
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

export { getPost, PostContent };
