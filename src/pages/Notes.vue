<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { getAllNotes } from '../utils/notes';

const notes = ref([]);
const error = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    notes.value = await getAllNotes();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <main class="max-w-4xl mx-auto px-4 py-16">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">Notes</h1>
      
      <div v-if="error" class="bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 p-4 rounded-lg mb-4">
        {{ error }}
      </div>

      <div v-if="loading" class="grid gap-4 md:grid-cols-2">
        <div v-for="i in 4" :key="i" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
          <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>

      <div v-else-if="notes.length === 0" class="text-center py-12">
        <p class="text-gray-600 dark:text-gray-400">No notes available.</p>
      </div>

      <div v-else class="grid gap-4 md:grid-cols-2">
        <RouterLink
          v-for="note in notes"
          :key="note.slug"
          :to="'/notes/' + note.slug"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02] hover:shadow-lg"
        >
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{{ note.title }}</h2>
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-4">{{ note.date }}</div>
          <p class="text-gray-700 dark:text-gray-300 line-clamp-3">{{ note.excerpt }}</p>
        </RouterLink>
      </div>
    </main>
  </div>
</template>

<style scoped>
.grid {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>
