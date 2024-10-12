"use client";
import { Post } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePost, deletePost } from "@/actions/actions";
import Spinner from "@/components/spinner";

export default function EditPostForm({ post }: { post: Post }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleUpdatePost = async (formData: FormData) => {
    setIsUpdating(true);
    try {
      await updatePost(formData);
      router.push(`/posts/${post.slug}`);
    } catch (error) {
      console.error("Error updating post:", error);
      setIsUpdating(false);
    }
  };

  const handleDeletePost = async (formData: FormData) => {
    setIsDeleting(true);
    try {
      await deletePost(formData);
      router.push('/dashboard/posts');
    } catch (error) {
      console.error("Error deleting post:", error);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <form action={handleUpdatePost} className="flex flex-col gap-4">
        <input type="hidden" name="slug" value={post.slug} />
        <input type="hidden" name="id" value={post.id} />

        <div>
          <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={post.title}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline dark:border-gray-600"
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
            Body:
          </label>
          <textarea
            id="body"
            name="body"
            defaultValue={post.body}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline dark:border-gray-600"
            rows={10}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
          disabled={isUpdating}
        >
          {isUpdating ? (
            <>
              <Spinner className="w-4 h-4 mr-2" />
              Updating...
            </>
          ) : (
            "Update Post"
          )}
        </button>
      </form>

      <form action={handleDeletePost} className="mt-4">
        <input type="hidden" name="slug" value={post.slug} />
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
          disabled={isDeleting}
        >
          {isDeleting ? (
            <>
              <Spinner className="w-4 h-4 mr-2" />
              Deleting...
            </>
          ) : (
            "Delete Post"
          )}
        </button>
      </form>
    </>
  );
}
