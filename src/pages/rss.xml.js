import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../config/site';
import { sortByDate } from '../utils/helpers';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = sortByDate(posts);
  const site = String(context.site ?? SITE.url).replace(/\/$/, '');

  return rss({
    title: SITE.name,
    description: SITE.description,
    site,
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      author: post.data.author ?? SITE.author.name,
      categories: [post.data.category, ...post.data.tags],
      link: `/blog/${post.slug}/`,
    })),
    customData: `
      <language>pt-BR</language>
      <managingEditor>Equipe Stradello</managingEditor>
      <webMaster>Equipe Técnica Stradello</webMaster>
      <copyright>© ${new Date().getFullYear()} ${SITE.name}</copyright>
      <image>
        <url>${site}/logo.svg</url>
        <title>${SITE.name}</title>
        <link>${site}</link>
      </image>
    `,
  });
}
