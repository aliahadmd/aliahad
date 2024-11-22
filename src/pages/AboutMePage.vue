<template>
    <div v-if="post" class="max-w-4xl mx-auto">
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>
        <img v-if="post.image" :src="post.image" :alt="post.title" class="w-full max-h-[400px] object-cover rounded-lg mb-8" />
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
  import BlogPost from '../components/BlogPost.vue';
  import { loadPersonalPost } from '../utils/personal'; 
  
  const post = ref(null);
  
  onMounted(async () => {
    try {
      post.value = await loadPersonalPost('aboutme');
    } catch (error) {
      console.error('Error loading about me:', error);
    }
  });
  </script>
  