export interface Blog {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  content: string;
}

const parseFrontmatter = (fileContent: string): { data: Partial<Blog>; content: string } => {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---\s*([\s\S]*)/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return { data: {}, content: fileContent };
  }

  const frontmatterBlock = match[1];
  const content = match[2];
  
  const data: Record<string, string> = {};
  const lines = frontmatterBlock.split('\n');
  
  lines.forEach((line) => {
    const parts = line.split(':');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      let value = parts.slice(1).join(':').trim();
      
      // Remove surrounding quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      data[key] = value;
    }
  });

  return { data: data as unknown as Partial<Blog>, content };
};

// Use Vite's import.meta.glob to load all markdown files eagerly
const modules = import.meta.glob('../content/blogs/*.md', { query: '?raw', import: 'default', eager: true });

export const blogs: Blog[] = Object.values(modules).map((fileContent: unknown) => {
  if (typeof fileContent !== 'string') {
    throw new Error('Markdown file content is not a string');
  }
  const { data, content } = parseFrontmatter(fileContent);
  
  return {
    slug: data.slug || '',
    title: data.title || 'Untitled',
    date: data.date || '',
    excerpt: data.excerpt || '',
    readTime: data.readTime || '',
    content: content.trim(),
  };
}).sort((a, b) => { // Sort by date - simplified for now since date is string 'Mon YYYY'
    // For now we'll just keep the module order or implement proper date parsing if needed
    // 'Jan 2026' vs 'Dec 2025' - needs actual date parsing to sort correctly
    return new Date(b.date).getTime() - new Date(a.date).getTime();
}); 
