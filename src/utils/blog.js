import { marked } from 'marked'

export function calculateReadingTime(content) {
  const words = content.trim().split(/\s+/).length
  const wordsPerMinute = 200
  return Math.ceil(words / wordsPerMinute)
}

export function parseMarkdownFrontMatter(markdown) {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---/
  const match = markdown.match(frontMatterRegex)
  
  if (!match) return { content: markdown, metadata: {} }

  const frontMatter = match[1]
  const content = markdown.slice(match[0].length).trim()
  const metadata = {}

  frontMatter.split('\n').forEach(line => {
    const [key, ...values] = line.split(':')
    if (key && values.length) {
      metadata[key.trim()] = values.join(':').trim()
    }
  })

  return { content, metadata }
}

export async function loadBlogPost(slug) {
  try {
    const markdown = await import(`../assets/blog-posts/${slug}.md?raw`)
    const { content, metadata } = parseMarkdownFrontMatter(markdown.default)
    
    return {
      slug,
      content,
      readingTime: calculateReadingTime(content),
      ...metadata
    }
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error)
    return null
  }
}

export async function loadBlogPosts() {
  const modules = import.meta.glob('../assets/blog-posts/*.md', { eager: true })
  const posts = []

  for (const path in modules) {
    const slug = path.split('/').pop().replace('.md', '')
    const post = await loadBlogPost(slug)
    if (post) {
      posts.push(post)
    }
  }

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}