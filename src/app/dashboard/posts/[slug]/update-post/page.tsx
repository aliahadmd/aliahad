// src/app/dashboard/posts/[slug]/update-post/page.tsx
import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import EditPostForm from "./EditPostForm";

async function getPost(slug: string) {
  const post = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!post) notFound();

  return post;
}

export default async function PostEditPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <EditPostForm post={post} />
    </div>
  );
}
