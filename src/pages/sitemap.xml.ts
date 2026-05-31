import { getCollection } from 'astro:content';
import { SITE } from '../config/site';

export async function GET() {
  const posts = await getCollection('blog');
  const guides = await getCollection('guides');
  
  // Páginas estáticas principais
  const staticPages = [
    '',
    '/blog',
    '/categorias',
    '/guias',
    '/sobre',
    '/contato',
  ];
  
  // Páginas de categorias
  const categoryPages = [
    '/categorias/viagens-solo',
    '/categorias/slow-travel',
    '/categorias/lugares-para-desacelerar',
    '/categorias/natureza',
    '/categorias/glamping',
    '/categorias/cafeterias-e-livrarias',
    '/categorias/introvertidos',
    '/categorias/experiencias-locais',
    '/categorias/guias-de-destinos',
    '/categorias/lugares-para-trabalhar-com-calma',
  ];
  
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
      url: `${SITE.url}/blog/${post.slug}`,
      lastmod: new Date(post.data.updatedDate || post.data.pubDate).toISOString(),
      changefreq: 'monthly',
      priority: post.data.featured ? 0.9 : 0.6,
    })),
    ...guides.map(guide => ({
      url: `${SITE.url}/guias/${guide.slug}`,
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