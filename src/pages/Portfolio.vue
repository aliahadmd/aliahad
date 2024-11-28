<script setup>
import { ref, onMounted, computed } from 'vue';
import MarkdownRenderer from '../components/MarkdownRenderer.vue';
import { getMarkdownContent } from '../utils/markdown';
import { usePageMeta } from '../composables/usePageMeta';

const content = ref('');
const error = ref(null);
const loading = ref(true);
const title = ref('');
const subtitle = ref('');
const projects = ref([]);

function extractFrontmatter(text) {
  const match = text.match(/^---([\s\S]*?)---\n([\s\S]*)$/);
  if (!match) return { content: text };

  const frontmatter = match[1];
  const content = match[2];
  const titleMatch = frontmatter.match(/title:\s*(.+)$/m);
  const subtitleMatch = frontmatter.match(/subtitle:\s*(.+)$/m);
  
  return {
    content: content.trim(),
    title: titleMatch ? titleMatch[1].replace(/^["']|["']$/g, '').trim() : '',
    subtitle: subtitleMatch ? subtitleMatch[1].replace(/^["']|["']$/g, '').trim() : ''
  };
}

// Extract projects from markdown content
function extractProjects(content) {
  const projectRegex = /##\s+(.+?)\n([\s\S]+?)(?=##|$)/g;
  const projects = [];
  let match;

  while ((match = projectRegex.exec(content)) !== null) {
    const title = match[1].trim();
    const details = match[2].trim();
    
    // Extract description (first paragraph after title)
    const description = details.match(/^(?!#)(.+?)(?=\n|$)/)?.[1]?.trim() || '';
    
    // Extract technologies (look for common tech keywords)
    const techKeywords = ['JavaScript', 'Python', 'Vue', 'React', 'Node.js', 'TypeScript', 'AI', 'Machine Learning'];
    const technologies = techKeywords.filter(tech => 
      new RegExp(`\\b${tech}\\b`, 'i').test(details)
    );
    
    // Extract URL if present
    const url = details.match(/\[.*?\]\((https?:\/\/[^\s\)]+)\)/)?.[1] || '';

    projects.push({
      title,
      description,
      technologies,
      url
    });
  }
  
  return projects;
}

async function loadContent() {
  loading.value = true;
  error.value = null;
  
  try {
    const text = getMarkdownContent('portfolio');
    if (!text.trim()) throw new Error('Content is empty');
    
    const { content: mainContent, title: mainTitle, subtitle: mainSubtitle } = extractFrontmatter(text);
    content.value = mainContent;
    title.value = mainTitle;
    subtitle.value = mainSubtitle;
    
    // Extract projects from the content
    projects.value = extractProjects(mainContent);
  } catch (e) {
    console.error('Error loading portfolio content:', e);
    error.value = 'Failed to load portfolio content';
  } finally {
    loading.value = false;
  }
}

// Structured data for SEO
const structuredData = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: title.value,
  description: subtitle.value,
  author: {
    '@type': 'Person',
    name: 'Ali Ahad',
    sameAs: [
      'https://github.com/aliahad',  // Replace with your actual GitHub URL
      'https://linkedin.com/in/aliahad'  // Replace with your actual LinkedIn URL
    ]
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: projects.value.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareSourceCode',
        name: project.title,
        description: project.description,
        programmingLanguage: project.technologies,
        url: project.url || undefined,
        author: {
          '@type': 'Person',
          name: 'Ali Ahad'
        }
      }
    }))
  }
}));

usePageMeta({
  title,
  subtitle,
  type: 'website',
  structuredData
});

onMounted(loadContent);
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
            <div class="h-40 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div class="space-y-3">
              <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div class="p-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-geist">
            {{ title }}
          </h1>
          <p class="text-gray-600 dark:text-gray-400 mb-8 font-geist">
            {{ subtitle }}
          </p>
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
