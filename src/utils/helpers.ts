// ================================================================
// Stradello — Utility Functions
// ================================================================

/**
 * Calculate approximate reading time from markdown content
 */
export function readingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Format date in Brazilian Portuguese
 */
export function formatDate(
  date: Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  return new Intl.DateTimeFormat('pt-BR', options).format(date);
}

/**
 * Format date as short (ex: "24 mai. 2026")
 */
export function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/**
 * Format ISO date for datetime attributes
 */
export function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Slugify a string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Truncate text to a given word count
 */
export function truncate(text: string, words: number): string {
  const arr = text.trim().split(/\s+/);
  if (arr.length <= words) return text;
  return arr.slice(0, words).join(' ') + '…';
}

/**
 * Get category color classes
 */
export function getCategoryColor(color: string): { bg: string; text: string; border: string } {
  const map: Record<string, { bg: string; text: string; border: string }> = {
    sage:  { bg: 'bg-sage-50 dark:bg-sage-950/30',   text: 'text-sage-700 dark:text-sage-300',   border: 'border-sage-200 dark:border-sage-800' },
    stone: { bg: 'bg-stone-100 dark:bg-stone-800/30', text: 'text-stone-600 dark:text-stone-300',  border: 'border-stone-200 dark:border-stone-700' },
    terra: { bg: 'bg-terra-50 dark:bg-terra-950/30',  text: 'text-terra-700 dark:text-terra-300',  border: 'border-terra-200 dark:border-terra-800' },
    cream: { bg: 'bg-cream-50 dark:bg-cream-950/30',  text: 'text-cream-700 dark:text-cream-400',  border: 'border-cream-200 dark:border-cream-800' },
  };
  return map[color] ?? map.stone;
}

/**
 * Construct OG image URL (for future dynamic OG)
 */
export function getOgImageUrl(title: string, baseUrl: string): string {
  const params = new URLSearchParams({ title });
  return `${baseUrl}/og?${params.toString()}`;
}

/**
 * Sort posts by date descending
 */
export function sortByDate<T extends { data: { pubDate: Date } }>(posts: T[]): T[] {
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * Get unique tags from all posts
 */
export function getAllTags<T extends { data: { tags: string[] } }>(posts: T[]): string[] {
  const tags = new Set<string>();
  posts.forEach((p) => p.data.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

/**
 * Group posts by category
 */
export function groupByCategory<T extends { data: { category: string } }>(
  posts: T[]
): Record<string, T[]> {
  return posts.reduce(
    (acc, post) => {
      const cat = post.data.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(post);
      return acc;
    },
    {} as Record<string, T[]>
  );
}

/**
 * Generate JSON-LD structured data for articles
 */
export function generateArticleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
  siteName,
  siteUrl,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: Date;
  dateModified?: Date;
  author: string;
  siteName: string;
  siteUrl: string;
}) {
  // Enhanced author schema for Cléber Lima
  const authorSchema = author === 'Cléber Lima | Stradello' || author === 'Cléber Lima'
    ? {
        '@type': 'Person',
        name: 'Cléber Lima',
        description: 'Bacharel em Turismo e criador do Stradello',
        url: `${siteUrl}/autor/cleber-lima`,
        image: `${siteUrl}/cleber-lima-criador-stradello.jpg`,
        jobTitle: 'Criador do Stradello',
        alumniOf: 'Bacharelado em Turismo',
        knowsAbout: [
          'Turismo',
          'Viagens Solo',
          'Slow Travel',
          'Experiências Locais',
          'Turismo de Natureza',
          'Planejamento de Viagens'
        ]
      }
    : {
        '@type': 'Person',
        name: author,
      };

  return {
    '@context': 'https://schema.org',
    '@type': 'TravelArticle',
    headline: title,
    description,
    url,
    datePublished: datePublished.toISOString(),
    dateModified: (dateModified ?? datePublished).toISOString(),
    author: authorSchema,
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.svg`,
      },
    },
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image,
      },
    }),
    inLanguage: 'pt-BR',
    isAccessibleForFree: true,
  };
}

/**
 * Generate breadcrumb JSON-LD
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
