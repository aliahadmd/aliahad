// app/posts/[slug]/edit/page.tsx
import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { updatePost, deletePost } from "@/actions/actions";

async function getPost(slug: string) {
  const post = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!post) notFound();

  return post;
}

export default async function PostEditPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>

      <form action={updatePost} className="flex flex-col gap-4">
        <input type="hidden" name="slug" value={post.slug} />
        <input type="hidden" name="id" value={post.id} />

        <div>
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={post.title}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-gray-700 font-bold mb-2">
            Body:
          </label>
          <textarea
            id="body"
            name="body"
            defaultValue={post.body}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Post
        </button>
      </form>

      <form action={deletePost} className="mt-4">
        <input type="hidden" name="slug" value={post.slug} />
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Delete Post
        </button>
      </form>
    </div>
  );
}
