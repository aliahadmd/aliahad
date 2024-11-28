<script setup>
import { ref, onMounted } from 'vue';
import MarkdownRenderer from '../components/MarkdownRenderer.vue';

const content = ref('');
const error = ref(null);
const loading = ref(true);
const title = ref('');
const subtitle = ref('');

onMounted(async () => {
  try {
    const response = await fetch('/src/assets/personal/portfolio.md');
    const text = await response.text();
    
    // Extract frontmatter
    const match = text.match(/^---([\s\S]*?)---\n([\s\S]*)$/);
    if (match) {
      const frontmatter = match[1];
      const titleMatch = frontmatter.match(/title:\s*(.+?)(\n|$)/);
      const subtitleMatch = frontmatter.match(/subtitle:\s*(.+?)(\n|$)/);
      
      title.value = titleMatch ? titleMatch[1].trim() : '';
      subtitle.value = subtitleMatch ? subtitleMatch[1].trim() : '';
      content.value = match[2].trim();
    } else {
      content.value = text;
    }
  } catch (err) {
    error.value = 'Failed to load portfolio content';
    console.error('Error loading portfolio content:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <main class="max-w-4xl mx-auto px-4 py-16">
      <div v-if="error" class="bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 p-4 rounded-lg mb-4">
        {{ error }}
      </div>

      <div v-if="loading" class="space-y-8">
        <div class="animate-pulse">
          <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
        
        <div class="grid gap-8 md:grid-cols-2">
          <div v-for="i in 4" :key="i" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
            <div class="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
            <div class="space-y-3">
              <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="content" class="space-y-8">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {{ title }}
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-400">
            {{ subtitle }}
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <MarkdownRenderer :content="content" />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
:deep(.prose img) {
  @apply w-full h-64 object-cover rounded-lg shadow-md mb-6;
}

:deep(.prose a) {
  @apply inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors no-underline !important;
}

:deep(.prose a + a) {
  @apply ml-2;
}

:deep(.prose h2) {
  @apply border-b border-gray-200 dark:border-gray-700 pb-2 mb-6;
}

:deep(.prose ul) {
  @apply grid gap-2;
}

:deep(.prose li) {
  @apply flex items-center;
}
</style>
