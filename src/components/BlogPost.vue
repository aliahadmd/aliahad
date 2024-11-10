<template>
  <article class="prose prose-sm sm:prose lg:prose-lg mx-auto p-4">
    <div v-if="!content" class="flex justify-center py-8">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
    <div v-else v-html="processedContent" ref="contentRef"></div>
  </article>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import MarkdownIt from 'markdown-it';
import MarkdownItPrism from 'markdown-it-prism';
import MarkdownItKatex from 'markdown-it-katex';
import mermaid from 'mermaid';
import DOMPurify from 'dompurify';
import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-tomorrow.css';
// Import additional Prism languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-python';

// Initialize mermaid
mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  themeVariables: {
    darkMode: true
  }
});

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});

const contentRef = ref(null);

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
})
.use(MarkdownItPrism)
.use(MarkdownItKatex);

// Custom renderer for code blocks
md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx];
  const code = token.content;
  const lang = token.info || 'text';

  // Handle Mermaid diagrams
  if (lang === 'mermaid') {
    const uniqueId = `mermaid-${idx}`;
    return `
      <div class="mermaid-diagram">
        <div id="${uniqueId}" class="mermaid">
          ${code}
        </div>
      </div>
    `;
  }

  // Handle regular code blocks
  const highlighted = lang && Prism.languages[lang] 
    ? Prism.highlight(code, Prism.languages[lang], lang)
    : md.utils.escapeHtml(code);

  return `
    <div class="code-block relative group">
      <div class="code-header flex justify-between items-center px-4 py-2 bg-gray-800 rounded-t-lg">
        <span class="text-xs text-gray-400">${lang}</span>
        <button 
          class="copy-button"
          data-code="${encodeURIComponent(code)}">
          Copy
        </button>
      </div>
      <pre class="language-${lang} !mt-0 !rounded-t-none"><code>${highlighted}</code></pre>
    </div>
  `;
};

const processedContent = computed(() => {
  if (!props.content) return '';
  return DOMPurify.sanitize(md.render(props.content));
});

// Initialize Mermaid diagrams and handle copy buttons
onMounted(async () => {
  if (!contentRef.value) return;

  // Initialize mermaid diagrams
  try {
    await mermaid.run();
  } catch (error) {
    console.error('Error initializing mermaid diagrams:', error);
  }

  // Handle copy button clicks
  contentRef.value.addEventListener('click', async (e) => {
    const button = e.target.closest('.copy-button');
    if (!button) return;

    try {
      const code = decodeURIComponent(button.dataset.code);
      await navigator.clipboard.writeText(code);
      
      button.textContent = 'Copied!';
      button.classList.add('copied');
      
      setTimeout(() => {
        button.textContent = 'Copy';
        button.classList.remove('copied');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
      button.textContent = 'Failed';
      setTimeout(() => {
        button.textContent = 'Copy';
      }, 2000);
    }
  });
});
</script>

<style>
.prose {
  max-width: 100%;
}

.code-block {
  margin: 1.5rem 0;
}

.code-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.copy-button {
  padding: 0.25rem 0.75rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.25rem;
  color: #fff;
  font-size: 0.75rem;
  transition: all 0.2s;
  cursor: pointer;
}

.copy-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.copy-button.copied {
  background-color: rgba(34, 197, 94, 0.2);
  border-color: rgba(34, 197, 94, 0.4);
}

/* Mermaid diagram styles */
.mermaid-diagram {
  background: #1e1e1e;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1.5rem 0;
}

.mermaid {
  display: flex;
  justify-content: center;
}

/* KaTeX styles */
.katex-display {
  overflow-x: auto;
  overflow-y: hidden;
  padding: 1rem 0;
}

.katex {
  font-size: 1.1em;
}

/* Prism.js theme customizations */
.prose pre {
  background-color: #1e1e1e !important;
  margin: 0 !important;
  padding: 1rem !important;
  border-radius: 0 0 0.5rem 0.5rem;
}

.prose code {
  font-family: 'Geist Mono', monospace;
  font-size: 0.875em;
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .prose {
    color: #e5e7eb;
  }
  
  .prose a {
    color: #60a5fa;
  }
  
  .prose blockquote {
    border-left-color: #374151;
    color: #9ca3af;
  }
}

/* Additional syntax highlighting styles */
.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #6a9955;
}

.token.punctuation {
  color: #d4d4d4;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
  color: #b5cea8;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
  color: #ce9178;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  color: #d4d4d4;
}

.token.atrule,
.token.attr-value,
.token.keyword {
  color: #569cd6;
}

.token.function,
.token.class-name {
  color: #dcdcaa;
}

.token.regex,
.token.important,
.token.variable {
  color: #d16969;
}
</style>
