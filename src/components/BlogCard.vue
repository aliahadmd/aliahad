<template>
  <div class="card bg-base-100">
    <div class="card-body flex flex-row gap-3">
      <div>
        <p class="text-xs text-base-content/70">{{ post.date }}</p>
      </div>

      <h2 class="card-title">
        <router-link :to="{ name: 'BlogPost', params: { slug: post.slug } }">
          {{ post.title }}
        </router-link>
      </h2>


    </div>
    <div class="divider m-0"></div>
  </div>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>