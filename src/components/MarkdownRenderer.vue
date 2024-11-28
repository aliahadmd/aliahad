<script setup>
import { ref, computed } from 'vue';
import MarkdownIt from 'markdown-it';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import DOMPurify from 'dompurify';

const props = defineProps({
  content: {
    type: String,
    required: true
  }
});

const lastProcessedContent = ref('');
const renderedContent = ref('');

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && Prism.languages[lang]) {
      try {
        return '<pre class="bg-gray-900 p-4 rounded-lg overflow-x-auto"><code class="text-gray-100">' +
          Prism.highlight(str, Prism.languages[lang], lang) +
          '</code></pre>';
      } catch {
        return '<pre class="bg-gray-900 p-4 rounded-lg overflow-x-auto"><code class="text-gray-100">' + 
          md.utils.escapeHtml(str) + 
          '</code></pre>';
      }
    }
    return '<pre class="bg-gray-900 p-4 rounded-lg overflow-x-auto"><code class="text-gray-100">' + 
      md.utils.escapeHtml(str) + 
      '</code></pre>';
  }
});

md.renderer.rules.image = (tokens, idx) => {
  const token = tokens[idx];
  let src = token.attrGet('src');
  
  if (src && !src.startsWith('http') && !src.startsWith('/')) {
    if (src.startsWith('./')) {
      src = src.replace('./', '/src/assets/my-notes/');
    } else {
      src = `/src/assets/personal/${src}`;
    }
  }
  
  const alt = token.content || '';
  const title = token.attrGet('title') || '';
  
  return `<img 
    loading="lazy" 
    src="${src}" 
    alt="${alt}" 
    title="${title}" 
    class="w-full max-w-2xl mx-auto rounded-lg shadow-md my-8 object-cover"
  />`;
};

// Customize link rendering
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const href = token.attrGet('href');
  const title = token.attrGet('title');
  
  return `<a 
    href="${href}" 
    ${title ? `title="${title}"` : ''} 
    class="text-blue-600 hover:text-blue-800 underline transition-colors"
    ${href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}
  >`;
};

// Customize heading rendering
const headingClasses = {
  h1: 'text-4xl font-bold mb-6',
  h2: 'text-3xl font-bold mb-4',
  h3: 'text-2xl font-bold mb-3',
  h4: 'text-xl font-bold mb-2',
  h5: 'text-lg font-bold mb-2',
  h6: 'font-bold mb-2'
};

Object.keys(headingClasses).forEach((level, index) => {
  const tag = `h${index + 1}`;
  md.renderer.rules[`${tag}_open`] = () => `<${tag} class="${headingClasses[tag]}">`;
});

const processedContent = computed(() => {
  if (!props.content) return '';
  if (props.content === lastProcessedContent.value) {
    return renderedContent.value;
  }
  
  try {
    const rendered = md.render(props.content);
    const sanitized = DOMPurify.sanitize(rendered);
    
    lastProcessedContent.value = props.content;
    renderedContent.value = sanitized;
    return sanitized;
  } catch {
    return '<p class="text-red-600">Error rendering content</p>';
  }
});
</script>

<template>
  <div>
    <div v-if="!processedContent" class="text-gray-600 dark:text-gray-400 text-center py-8">
      No content to display
    </div>
    <div v-else class="prose prose-lg max-w-none dark:prose-invert">
      <div v-html="processedContent"></div>
    </div>
  </div>
</template>

<style>
.prose {
  @apply text-gray-900 dark:text-gray-100;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  @apply text-gray-900 dark:text-gray-100;
}

.prose p {
  @apply mb-4 text-gray-800 dark:text-gray-200;
}

.prose strong {
  @apply text-gray-900 dark:text-gray-100;
}

.prose a {
  @apply text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300;
}

.prose ul {
  @apply list-disc pl-6 mb-4 text-gray-800 dark:text-gray-200;
}

.prose ol {
  @apply list-decimal pl-6 mb-4 text-gray-800 dark:text-gray-200;
}

.prose li {
  @apply text-gray-800 dark:text-gray-200;
}

.prose blockquote {
  @apply pl-4 border-l-4 border-gray-300 dark:border-gray-600 italic text-gray-700 dark:text-gray-300 my-4;
}

.prose code:not(pre code) {
  @apply bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded font-mono text-sm;
}

.prose pre {
  @apply my-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto;
}

.prose pre code {
  @apply text-gray-100;
}

.prose table {
  @apply w-full border-collapse my-4;
}

.prose th,
.prose td {
  @apply border border-gray-300 dark:border-gray-600 p-2 text-gray-800 dark:text-gray-200;
}

.prose th {
  @apply bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100;
}

.prose hr {
  @apply my-8 border-t border-gray-300 dark:border-gray-600;
}

.prose img {
  @apply rounded-lg shadow-md dark:shadow-none;
}

.markdown-body pre,
.markdown-body code {
  @apply font-geistmono;
}
</style>
