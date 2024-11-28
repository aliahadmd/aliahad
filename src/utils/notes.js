import { format } from 'date-fns';

// Cache for parsed notes
const notesCache = new Map();

function parseFrontmatter(content) {
  const match = content.match(/^---([\s\S]*?)---\n/);
  if (!match) return {};

  const frontmatterLines = match[1].split('\n').filter(line => line.trim());
  return frontmatterLines.reduce((acc, line) => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      acc[key.trim()] = valueParts.join(':').trim();
    }
    return acc;
  }, {});
}

function getContentWithoutFrontmatter(content) {
  return content.replace(/^---[\s\S]*?---\n/, '').trim();
}

function getExcerpt(content, frontmatter) {
  if (frontmatter.excerpt) return frontmatter.excerpt;
  
  const firstParagraph = content
    .split('\n\n')
    .find(p => p.trim() && !p.trim().startsWith('#'));
    
  return firstParagraph?.trim() || '';
}

function formatTitle(slug) {
  return slug.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function getAllNotes() {
  const noteModules = import.meta.glob('/src/assets/my-notes/*.md', { 
    query: '?raw',
    import: 'default',
    eager: true 
  });
  
  return Object.entries(noteModules).map(([path, content]) => {
    // Check cache first
    if (notesCache.has(path)) {
      return notesCache.get(path);
    }
    
    const fileName = path.split('/').pop();
    const slug = fileName.replace('.md', '');
    const frontmatter = parseFrontmatter(content);
    const cleanContent = getContentWithoutFrontmatter(content);
    
    const note = {
      slug,
      title: frontmatter.title || formatTitle(slug),
      excerpt: getExcerpt(cleanContent, frontmatter),
      image: frontmatter.image || '',
      path,
      content: cleanContent,
      date: frontmatter.date || format(new Date(), 'MMMM d, yyyy')
    };
    
    // Cache the parsed note
    notesCache.set(path, note);
    return note;
  });
}

export async function getNoteBySlug(slug) {
  const notes = await getAllNotes();
  return notes.find(note => note.slug === slug);
}
