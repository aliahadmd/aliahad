import prisma from "@/lib/db";
import Link from "next/link";
import { format } from "date-fns";

export default async function PostsList() {
  const posts = await prisma.post.findMany();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className="mb-3">
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
          <p>{format(post.createdAt, "yyyy-MM-dd")}</p>
          <p>{format(post.updatedAt, "yyyy-MM-dd")}</p>
<Link href={`/dashboard/posts/${post.id}/update-post`}>Update</Link>;
        </li>
      ))}
    </ul>
  );
}

