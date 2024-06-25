import { Suspense } from "react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { format } from "date-fns";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import dynamic from "next/dynamic";
import remarkGfm from "remark-gfm";
import React from "react";
import prisma from "@/lib/db";
import { Post } from "@prisma/client";
import BlurImage from "@/components/image/image";

const MermaidDiagram = dynamic(() => import("@/components/MermaidDiagram"), {
  ssr: false,
});

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface ImageProps {
  src?: string;
  alt?: string;
}

const MarkdownComponents: Record<string, React.FC<any>> = {
  code: ({ node, inline, className, children, ...props }: CodeProps) => {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "";

    if (language === "mermaid") {
      return <MermaidDiagram chart={String(children).replace(/\n$/, "")} />;
    }

    return !inline && match ? (
      <SyntaxHighlighter
        style={atomDark}
        language={match[1]}
        PreTag="div"
        className="rounded-md"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code
        className={`${className} text-pink-600 bg-gray-100 rounded px-1`}
        {...props}
      >
        {children}
      </code>
    );
  },
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl font-bold mb-4 text-gray-900 border-b pb-2">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-semibold mb-3 text-gray-800">{children}</h2>
  ),
  // ... (other heading components)
  p: ({ children }: { children: React.ReactNode }) => {
    if (
      React.Children.count(children) === 1 &&
      React.isValidElement(children)
    ) {
      const child = children as React.ReactElement;
      if (
        child.type === "img" ||
        child.type === MarkdownComponents.img ||
        (typeof child.type === "function" && child.type.name === "img")
      ) {
        return <>{children}</>;
      }
    }
    return <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>;
  },

  h3: ({ children }) => (
    <h3 className="text-xl font-semibold mb-2 text-gray-700">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-semibold mb-2 text-gray-700">{children}</h4>
  ),
  h5: ({ children }) => (
    <h5 className="text-base font-semibold mb-1 text-gray-700">{children}</h5>
  ),
  h6: ({ children }) => (
    <h6 className="text-sm font-semibold mb-1 text-gray-700">{children}</h6>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-6 mb-4 text-gray-700">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 mb-4 text-gray-700">{children}</ol>
  ),
  li: ({ children }) => <li className="mb-2">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic mb-4 bg-blue-50 py-2 text-gray-700">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full divide-y divide-gray-200 border">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
  tbody: ({ children }) => (
    <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
  ),
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border">
      {children}
    </td>
  ),

  // Add this new component
  tableContainer: ({ children }) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full divide-y divide-gray-200 border">
        {children}
      </table>
    </div>
  ),
  a: ({ children, href }) => (
    <a href={href} className="text-blue-600 hover:text-blue-800 underline">
      {children}
    </a>
  ),

  img: ({ src, alt }: ImageProps) => {
    // Check if the source is a video link
    const isYouTubeVideo =
      src?.includes("youtube.com") || src?.includes("youtu.be");
    const isVimeoVideo = src?.includes("vimeo.com");
    const isCustomVideo =
      src?.startsWith("https://r2.aliahad.com") &&
      (src?.endsWith(".mp4") ||
        src?.endsWith(".webm") ||
        src?.endsWith(".ogg"));

    if (isYouTubeVideo) {
      const videoId = src?.includes("youtube.com")
        ? src.split("v=")[1]
        : src?.split("/").pop();
      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={alt || "YouTube video player"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video my-4"
        ></iframe>
      );
    } else if (isVimeoVideo) {
      const videoId = src?.split("/").pop();
      return (
        <iframe
          src={`https://player.vimeo.com/video/${videoId}`}
          title={alt || "Vimeo video player"}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video my-4"
        ></iframe>
      );
    } else if (isCustomVideo) {
      return (
        <video
          src={src}
          controls
          className="w-full aspect-video my-4"
          title={alt || "Custom video player"}
        >
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return (
        <BlurImage
          src={src || ""}
          alt={alt || ""}
          width={600}
          height={400}
          className="mx-auto my-4 rounded-lg shadow-md"
        />
      );
    }
  },
  hr: () => <hr className="my-8 border-t border-gray-200" />,
  mermaid: ({ node }) => {
    const chart = node.value;
    return <MermaidDiagram chart={chart} />;
  },
};

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
          <ReactMarkdown
            components={MarkdownComponents}
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex]}
          >
            {post.body.replace(/```mermaid/g, "```mermaid\n")}
          </ReactMarkdown>
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
