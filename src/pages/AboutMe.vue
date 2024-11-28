<script setup>
import { ref, onMounted, computed, watch, watchEffect } from 'vue';
import MarkdownRenderer from '../components/MarkdownRenderer.vue';
import { getMarkdownContent } from '../utils/markdown';
import { usePageMeta } from '../composables/usePageMeta';

const content = ref('');
const error = ref(null);
const loading = ref(true);
const title = ref('');
const subtitle = ref('');
const profileImage = ref('');
const social = ref({
  email: '',
  bluesky: '',
  github: '',
  linkedin: ''
});

function extractFrontmatter(text) {
  const match = text.match(/^---([\s\S]*?)---\n([\s\S]*)$/);
  if (!match) return { content: text };

  const frontmatter = match[1];
  const content = match[2];
  const imageMatch = frontmatter.match(/image:\s*(.+?)(\s|$)/);
  const titleMatch = frontmatter.match(/title:\s*(.+)$/m);
  const subtitleMatch = frontmatter.match(/subtitle:\s*(.+)$/m);
  
  // Extract social links
  const socialSection = frontmatter.match(/social:\n([\s\S]*?)(?=\n\w|$)/);
  const socialLinks = {};
  if (socialSection) {
    const socialText = socialSection[1];
    const links = socialText.match(/^\s+\w+:\s*(.+)$/gm);
    if (links) {
      links.forEach(link => {
        const [key, value] = link.trim().split(/:\s*/);
        socialLinks[key] = value;
      });
    }
  }
  
  return {
    content: content.trim(),
    image: imageMatch ? imageMatch[1].replace(/^["']|["']$/g, '').trim() : null,
    title: titleMatch ? titleMatch[1].replace(/^["']|["']$/g, '').trim() : '',
    subtitle: subtitleMatch ? subtitleMatch[1].replace(/^["']|["']$/g, '').trim() : '',
    social: socialLinks
  };
}

async function loadContent() {
  loading.value = true;
  error.value = null;
  
  try {
    const text = getMarkdownContent('aboutme');
    if (!text.trim()) throw new Error('Content is empty');
    
    const { content: mainContent, image, title: mainTitle, subtitle: mainSubtitle, social: socialLinks } = extractFrontmatter(text);
    console.log('Extracted title:', mainTitle);
    console.log('Extracted subtitle:', mainSubtitle);
    content.value = mainContent;
    profileImage.value = image;
    title.value = mainTitle;
    subtitle.value = mainSubtitle;
    social.value = socialLinks;
    console.log('Final title value:', title.value);
    console.log('Final subtitle value:', subtitle.value);
  } catch (e) {
    console.error('Error loading content:', e);
    error.value = 'Failed to load content. Please try again later.';
  } finally {
    loading.value = false;
  }
}

// Structured data for SEO
const structuredData = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: title.value,
  description: subtitle.value,
  image: profileImage.value,
  email: social.value.email,
  sameAs: [
    social.value.github,
    social.value.linkedin,
    social.value.bluesky
  ].filter(Boolean)
}));

usePageMeta({
  title,
  subtitle,
  image: profileImage,
  type: 'profile',
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

      <div v-if="loading" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 animate-pulse">
        <div class="flex items-center space-x-8 mb-8">
          <div class="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div class="space-y-4 flex-1">
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
        </div>
      </div>

      <div v-else-if="content" class="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div class="p-8">
          <div class="flex flex-col md:flex-row md:items-start md:space-x-8 mb-8">
            <img
              v-if="profileImage"
              :src="profileImage"
              alt="Profile"
              class="w-32 h-32 rounded-full object-cover mb-4 md:mb-0"
            />
            <div>
              <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-geist">
                {{ title }}
              </h1>
              <p class="text-gray-600 dark:text-gray-400 font-geist">
                {{ subtitle }}
              </p>
              <div class="mt-2 space-x-2 font-geist">
                <a :href="`mailto:${social.email}`" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">Email</a>
                <span class="text-gray-400">|</span>
                <a :href="social.bluesky.startsWith('http') ? social.bluesky : `https://${social.bluesky}`" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">Bluesky</a>
                <span class="text-gray-400">|</span>
                <a :href="social.github.startsWith('http') ? social.github : `https://${social.github}`" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">GitHub</a>
                <span class="text-gray-400">|</span>
                <a :href="social.linkedin.startsWith('http') ? social.linkedin : `https://${social.linkedin}`" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">LinkedIn</a>
              </div>
            </div>
          </div>
          <MarkdownRenderer :content="content" />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
img {
  max-height: 400px;
}
</style>
