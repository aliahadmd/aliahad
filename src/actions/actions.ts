"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  // auth check
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  const title = formData.get("title") as string;
  const body = formData.get("body") as string;

  // update database
  await prisma.post.create({
    data: {
      title,
      body,
    },
  });

  // revalidate
  revalidatePath("/posts");

  // redirect to posts route
  redirect("/dashboard/posts");
}


export async function deletePost(formData: FormData) {
  // auth check
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

  // revalidate
  revalidatePath("/posts");

  // redirect to posts route
  redirect("/dashboard/posts");
}



export async function updatePost(formData: FormData) {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  const id = formData.get("id");
  const title = formData.get("title");
  const body = formData.get("body");

  if (!id || !title || !body) {
    throw new Error("Missing required fields");
  }

  await prisma.post.update({
    where: { id: parseInt(id as string) },
    data: { title: title as string, body: body as string },
  });

  // revalidate
  revalidatePath("/posts");

  // redirect to post details page
  redirect(`/posts/${id}`);
}

