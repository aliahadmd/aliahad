<template>
  <div v-if="post" class="max-w-4xl mx-auto">
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>
      <div class="flex items-center text-base-content/70 mb-8">
        <span>{{ post.date }}</span>
        <span class="mx-2">•</span>
        <span>{{ post.readingTime }} min read</span>
      </div>
      <img 
        v-if="post.image" 
        :src="post.image" 
        :alt="post.title"
        class="w-full h-[400px object-cover rounded-lg mb-8"
      />
    </div>
    <BlogPost :content="post.content" />
  </div>
  <div v-else class="text-center py-12">
    <div role="status">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import BlogPost from '../components/BlogPost.vue';
import { loadBlogPost } from '../utils/blog'; // Import the correct function

const route = useRoute();
const post = ref(null);

onMounted(async () => {
  try {
    post.value = await loadBlogPost(route.params.slug);
  } catch (error) {
    console.error('Error loading blog post:', error);
  }
});
</script>
