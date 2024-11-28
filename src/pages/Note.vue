<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import MarkdownRenderer from '../components/MarkdownRenderer.vue';
import { getNoteBySlug } from '../utils/notes';

const route = useRoute();
const note = ref(null);
const error = ref(null);
const loading = ref(true);

async function loadNote() {
  loading.value = true;
  error.value = null;
  
  try {
    const data = await getNoteBySlug(route.params.slug);
    if (data) {
      note.value = data;
    } else {
      error.value = 'Note not found';
    }
  } catch (err) {
    error.value = 'Failed to load note';
  } finally {
    loading.value = false;
  }
}

onMounted(loadNote);
watch(() => route.params.slug, loadNote);
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <main class="max-w-4xl mx-auto px-4 py-16">
      <div v-if="error" class="bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 p-4 rounded-lg mb-4">
        {{ error }}
      </div>
      
      <div v-if="loading" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 animate-pulse">
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
        <div class="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
        </div>
      </div>
      
      <template v-else-if="note">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">{{ note.title }}</h1>
        <div class="text-gray-600 dark:text-gray-400 mb-8">{{ note.date }}</div>
        
        <img 
          v-if="note.image"
          :src="note.image" 
          :alt="note.title"
          class="w-full rounded-lg shadow-md mb-8"
          loading="lazy"
        />
        
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <MarkdownRenderer 
            v-if="note.content" 
            :content="note.content" 
          />
          <div 
            v-else 
            class="text-gray-600 dark:text-gray-400 text-center py-8"
          >
            No content available
          </div>
        </div>
      </template>
    </main>
  </div>
</template>
