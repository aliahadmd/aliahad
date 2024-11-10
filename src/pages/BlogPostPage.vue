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
import { loadBlogPost } from '../utils/blog';

const route = useRoute();
const post = ref(null);

const updateMetaTags = (post) => {
  // Update Open Graph meta tags
  document.querySelector('meta[property="og:title"]')?.remove();
  document.querySelector('meta[property="og:description"]')?.remove();
  document.querySelector('meta[property="og:image"]')?.remove();
  document.querySelector('meta[property="og:url"]')?.remove();
  
  const head = document.head;
  
  const title = document.createElement('meta');
  title.setAttribute('property', 'og:title');
  title.content = post.title;
  
  const description = document.createElement('meta');
  description.setAttribute('property', 'og:description');
  description.content = post.excerpt;
  
  const image = document.createElement('meta');
  image.setAttribute('property', 'og:image');
  image.content = post.image;
  
  const url = document.createElement('meta');
  url.setAttribute('property', 'og:url');
  url.content = window.location.href;
  
  head.appendChild(title);
  head.appendChild(description);
  head.appendChild(image);
  head.appendChild(url);
}

onMounted(async () => {
  try {
    post.value = await loadBlogPost(route.params.slug);
    if (post.value) {
      updateMetaTags(post.value);
    }
  } catch (error) {
    console.error('Error loading blog post:', error);
  }
});
</script>
