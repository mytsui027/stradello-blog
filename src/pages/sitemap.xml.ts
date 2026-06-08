import { getCollection } from 'astro:content';
import { SITE } from '../config/site';
import { slugify } from '../utils/helpers';

export async function GET() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const guides = await getCollection('guides', ({ data }) => !data.draft);
  
  // Páginas estáticas principais
  const staticPages = [
    '',
    '/blog',
    '/categorias',
    '/guias',
    '/sobre',
    '/contato',
    '/autor/cleber-lima',
    '/recomendacoes',
    '/newsletter',
    '/privacidade',
    '/termos',
  ];
  
  // Páginas de categorias - geradas dinamicamente a partir dos posts
  const categorySlugs = new Set(posts.map(post => slugify(post.data.category)));
  const categoryPages = Array.from(categorySlugs).map(slug => `/categorias/${slug}`);
  
  // Combinar todas as URLs
  const allUrls = [
    ...staticPages.map(page => ({
      url: `${SITE.url}${page}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: page === '' ? 1.0 : 0.8,
    })),
    ...categoryPages.map(page => ({
      url: `${SITE.url}${page}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.7,
    })),
    ...posts.map(post => ({
      url: post.data.canonicalUrl || `${SITE.url}/blog/${post.slug}`,
      lastmod: new Date(post.data.updatedDate || post.data.pubDate).toISOString(),
      changefreq: 'monthly',
      priority: post.data.featured ? 0.9 : 0.6,
    })),
    ...guides.map(guide => ({
      url: guide.data.canonicalUrl || `${SITE.url}/guias/${guide.slug}`,
      lastmod: new Date(guide.data.updatedDate || guide.data.pubDate).toISOString(),
      changefreq: 'monthly',
      priority: guide.data.featured ? 0.9 : 0.6,
    })),
  ];
  
  // Gerar XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(({ url, lastmod, changefreq, priority }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}