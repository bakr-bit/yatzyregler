import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import type { Root, Heading as MdastHeading } from 'mdast';

const contentDirectory = path.join(process.cwd(), 'content');

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export interface MarkdownContent {
  slug: string;
  title: string;
  description: string;
  hero?: string;
  url: string;
  locale: string;
  content: string;
  htmlContent: string;
  headings: Heading[];
}

/**
 * Get all markdown files for a specific locale
 */
export function getAllContentSlugs(locale: string = 'sv'): string[] {
  const localeDir = path.join(contentDirectory, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const files = fs.readdirSync(localeDir);
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''));
}

/**
 * Helper function to generate slug from text
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[åä]/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Remark plugin to extract headings
 */
function extractHeadings() {
  const headings: Heading[] = [];

  return (tree: Root) => {
    visit(tree, 'heading', (node: MdastHeading) => {
      if (node.depth === 2 || node.depth === 3) {
        const text = node.children
          .map((child: any) => {
            if (child.type === 'text') return child.value;
            if (child.type === 'inlineCode') return child.value;
            return '';
          })
          .join('');

        const id = slugify(text);
        headings.push({
          id,
          text,
          level: node.depth,
        });
      }
    });
  };

  return { headings };
}

/**
 * Remark plugin to add IDs to headings
 */
function addHeadingIds() {
  return (tree: Root) => {
    visit(tree, 'heading', (node: MdastHeading) => {
      if (node.depth === 2 || node.depth === 3) {
        const text = node.children
          .map((child: any) => {
            if (child.type === 'text') return child.value;
            if (child.type === 'inlineCode') return child.value;
            return '';
          })
          .join('');

        const id = slugify(text);

        // Add the ID as an HTML attribute
        (node.data = node.data || {}).hProperties = {
          ...((node.data.hProperties as any) || {}),
          id,
        };
      }
    });
  };
}

/**
 * Get markdown content by slug and locale
 */
export async function getContentBySlug(
  slug: string,
  locale: string = 'sv'
): Promise<MarkdownContent | null> {
  try {
    const filePath = path.join(contentDirectory, locale, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Extract headings
    const headings: Heading[] = [];

    // Process markdown to extract headings
    await remark()
      .use(remarkGfm)
      .use(() => (tree: Root) => {
        visit(tree, 'heading', (node: MdastHeading) => {
          if (node.depth === 2 || node.depth === 3) {
            const text = node.children
              .map((child: any) => {
                if (child.type === 'text') return child.value;
                if (child.type === 'inlineCode') return child.value;
                return '';
              })
              .join('');

            const id = slugify(text);
            headings.push({
              id,
              text,
              level: node.depth,
            });
          }
        });
      })
      .process(content);

    // Convert markdown to HTML with heading IDs
    const processedContent = await remark()
      .use(remarkGfm) // GitHub Flavored Markdown (tables, etc.)
      .use(addHeadingIds) // Add IDs to headings
      .use(html, { sanitize: false }) // Allow HTML in markdown
      .process(content);

    const htmlContent = processedContent.toString();

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      hero: data.hero || undefined,
      url: data.url || '',
      locale: data.locale || locale,
      content,
      htmlContent,
      headings,
    };
  } catch (error) {
    console.error(`Error reading content for ${slug}:`, error);
    return null;
  }
}

/**
 * Get all content for a specific locale
 */
export async function getAllContent(locale: string = 'sv'): Promise<MarkdownContent[]> {
  const slugs = getAllContentSlugs(locale);
  const content = await Promise.all(
    slugs.map(slug => getContentBySlug(slug, locale))
  );

  return content.filter((item): item is MarkdownContent => item !== null);
}

/**
 * Get locales available in the content directory
 */
export function getAvailableLocales(): string[] {
  const locales = fs.readdirSync(contentDirectory);
  return locales.filter(locale => {
    const stat = fs.statSync(path.join(contentDirectory, locale));
    return stat.isDirectory();
  });
}
