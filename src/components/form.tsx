'use client'

import { createPost } from "@/actions/actions";
import React, { useState, useTransition } from "react";

export default function Form() {
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    startTransition(async () => {
      await createPost(formData);
    });
  };

  return (
    <form
      action={handleSubmit}
      className="flex flex-col px-5 mx-auto gap-2 my-10"
    >
      <input
        type="text"
        name="title"
        placeholder="Title for new post"
        className="border rounded px-3 h-10"
        required
      />
      <textarea
        name="body"
        placeholder="Body content for new post"
        className="border rounded px-3 py-2"
        rows={6}
        required
      />
      <button
        type="submit"
        className="h-10 bg-blue-500 px-5 rounded text-white flex items-center justify-center"
        disabled={isSubmitting || isPending}
      >
        {isSubmitting || isPending ? (
          <>
            <span className="animate-spin inline-block w-4 h-4 border-t-2 border-white rounded-full mr-2"></span>
            Submitting...
          </>
        ) : (
          'Submit'
        )}
      </button>
    </form>
  );
}
