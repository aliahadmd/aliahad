<template>
  <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden w-full md:max-w-xl">
    <figure class="relative h-48 md:h-56 lg:h-64 overflow-hidden">
      <img 
        :src="post.image" 
        :alt="post.title"
        class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
      >
    </figure>
    <div class="card-body p-6">
      <p class="text-xs md:text-sm italic text-base-content/60">{{ formatDate(post.date) }}</p>
      <h2 class="card-title text-lg md:text-xl font-bold hover:text-primary transition-colors duration-200 mt-2">
        <router-link :to="{ name: 'BlogPost', params: { slug: post.slug } }">
          {{ post.title }}
        </router-link>
      </h2>
      <p class="text-sm md:text-base text-base-content/80 mt-3 line-clamp-3">{{ post.excerpt }}</p>
      <div class="card-actions justify-end mt-4">
        <router-link 
          :to="{ name: 'BlogPost', params: { slug: post.slug } }"
          class="btn btn-primary btn-sm md:btn-md"
        >
          Read More
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Ensure consistent card width */
.card {
  display: flex;
  flex-direction: column;
}

/* Maintain image aspect ratio */
figure {
  aspect-ratio: 16/9;
}
</style>