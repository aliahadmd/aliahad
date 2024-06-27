"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Add this function to generate slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createPost(formData: FormData) {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  const title = formData.get("title") as string;
  const body = formData.get("body") as string;

  let slug = generateSlug(title);

  // Ensure slug uniqueness
  let count = 0;
  while (await prisma.post.findUnique({ where: { slug } })) {
    count++;
    slug = `${generateSlug(title)}-${count}`;
  }

  // update database
  await prisma.post.create({
    data: {
      title,
      body,
      slug,
    },
  });

  revalidatePath("/posts");
  redirect(`/posts/${slug}`);
}

export async function deletePost(formData: FormData) {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  const id = formData.get("id");

  if (!id) {
    throw new Error("Post ID is required");
  }

  await prisma.post.delete({
    where: { id: parseInt(id as string) },
  });

  revalidatePath("/posts");
  redirect("/dashboard/posts");
}

export async function updatePost(formData: FormData) {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  const id = formData.get("id");
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;

  if (!id || !title || !body) {
    throw new Error("Missing required fields");
  }

  const post = await prisma.post.findUnique({
    where: { id: parseInt(id as string) },
  });
  if (!post) throw new Error("Post not found");

  let newSlug = generateSlug(title);

  // Only update the slug if the title has changed
  if (newSlug !== post.slug) {
    let count = 0;
    while (
      await prisma.post.findUnique({
        where: { slug: newSlug, NOT: { id: parseInt(id as string) } },
      })
    ) {
      count++;
      newSlug = `${generateSlug(title)}-${count}`;
    }
  } else {
    newSlug = post.slug;
  }

  await prisma.post.update({
    where: { id: parseInt(id as string) },
    data: { title, body, slug: newSlug },
  });

  revalidatePath("/posts");
  redirect(`/posts/${newSlug}`);
}
