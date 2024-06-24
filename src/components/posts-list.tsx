import prisma from "@/lib/db";
import Link from "next/link";
import { format } from "date-fns";

export default async function PostsList() {
  const posts = await prisma.post.findMany();

  return (
    <ul className="grid grid-cols-1 gap-6">
      {posts.map((post) => (
        <li
          key={post.id}
          className="flex justify-between items-center p-4 border-b text-left"
        >
          <div>
            <Link
              href={`/posts/${post.id}`}
              className="text-sm md:text-2xl font-bold hover:underline "
            >
              {post.title}
            </Link>
          </div>
          <div className="text-gray-600 text-right text-sm">
            <p>Published: {format(post.createdAt, "MMMM dd, yyyy")}</p>
            <p>Last Updated: {format(post.updatedAt, "MMMM dd, yyyy")}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
