<template>
  <div>
    <h1 class="text-4xl font-bold mb-8">Blog Posts</h1>
    <div class="grid grid-cols-1">
      <BlogCard
        v-for="post in posts"
        :key="post.slug"
        :post="post"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BlogCard from '../components/BlogCard.vue'
import { loadBlogPosts } from '../utils/blog'

const posts = ref([])

onMounted(async () => {
  try {
    posts.value = await loadBlogPosts()
  } catch (error) {
    console.error('Error loading blog posts:', error)
  }
})
</script>