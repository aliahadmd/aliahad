import prisma from "@/lib/db";
import Link from "next/link";
import { format } from "date-fns";

export default async function PostsList() {
  const posts = await prisma.post.findMany();

  return (
    <ul className="space-y-6">
      {posts.map((post) => (
        <li key={post.id} className="bg-white shadow-md rounded-lg p-6">
          <Link
            href={`/posts/${post.slug}`}
            className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition duration-300"
          >
            {post.title}
          </Link>
          <div className="mt-2 text-sm text-gray-600">
            <p>Created: {format(post.createdAt, "yyyy-MM-dd")}</p>
            <p>Updated: {format(post.updatedAt, "yyyy-MM-dd")}</p>
          </div>
          <Link
            href={`/dashboard/posts/${post.slug}/update-post`}
            className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
          >
            Update
          </Link>
        </li>
      ))}
    </ul>
  );
}
