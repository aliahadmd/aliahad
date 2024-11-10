<template>
    <div v-if="post" class="max-w-4xl mx-auto">
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
      post.value = await loadPersonalPost('portfolio');
    } catch (error) {
      console.error('Error loading about me:', error);
    }
  });
  </script>
  