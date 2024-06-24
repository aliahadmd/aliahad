"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const projectUrl = formData.get("projectUrl") as string;
  const githubUrl = formData.get("githubUrl") as string;

  await prisma.project.create({
    data: {
      title,
      description,
      imageUrl,
      projectUrl,
      githubUrl,
    },
  });

  revalidatePath("/portfolio");
  redirect("/dashboard/portfolio");
}

export async function updateProject(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const projectUrl = formData.get("projectUrl") as string;
  const githubUrl = formData.get("githubUrl") as string;

  await prisma.project.update({
    where: { id: parseInt(id) },
    data: {
      title,
      description,
      imageUrl,
      projectUrl,
      githubUrl,
    },
  });

  revalidatePath("/portfolio");
  redirect("/dashboard/portfolio");
}

export async function deleteProject(formData: FormData) {
  const id = formData.get("id") as string;

  await prisma.project.delete({
    where: { id: parseInt(id) },
  });

  revalidatePath("/portfolio");
}
