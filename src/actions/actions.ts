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
  revalidatePath("/dashboard/posts");
  redirect(`/posts/${slug}`);
}

export async function deletePost(formData: FormData) {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  const slug = formData.get("slug");

  if (!slug || typeof slug !== "string") {
    throw new Error("Post slug is required");
  }

  await prisma.post.delete({
    where: { slug: slug },
  });

  revalidatePath("/posts");
  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}


export async function updatePost(formData: FormData) {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  console.log("Form data received:", Object.fromEntries(formData));

  const id = formData.get("id");
  const title = formData.get("title");
  const body = formData.get("body");

  console.log("ID:", id);
  console.log("Title:", title);
  console.log("Body:", body);

  if (!id || typeof id !== "string") {
    throw new Error("Invalid or missing post ID");
  }

  const postId = parseInt(id, 10);
  if (isNaN(postId)) {
    throw new Error("Invalid post ID format");
  }

  if (!title || typeof title !== "string" || title.trim() === "") {
    throw new Error("Invalid or missing post title");
  }
  if (!body || typeof body !== "string" || body.trim() === "") {
    throw new Error("Invalid or missing post body");
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      throw new Error("Post not found");
    }

    let newSlug = generateSlug(title);

    // Only update the slug if the title has changed
    if (newSlug !== post.slug) {
      let count = 0;
      while (
        await prisma.post.findUnique({
          where: { slug: newSlug, NOT: { id: postId } },
        })
      ) {
        count++;
        newSlug = `${generateSlug(title)}-${count}`;
      }
    } else {
      newSlug = post.slug;
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { title, body, slug: newSlug },
    });

    console.log("Post updated successfully:", updatedPost);

    revalidatePath("/posts");
    revalidatePath("/dashboard/posts");

    // Instead of redirecting, return the new slug
    return { success: true, newSlug };
  } catch (error) {
    console.error("Error updating post:", error);
    return {
      success: false,
      error: "Failed to update post. Please try again.",
    };
  }
}