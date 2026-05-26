import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../config/site';
import { sortByDate } from '../utils/helpers';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = sortByDate(posts);

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site,
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
      <managingEditor>${SITE.author.email} (${SITE.author.name})</managingEditor>
      <webMaster>${SITE.author.email}</webMaster>
      <copyright>© ${new Date().getFullYear()} ${SITE.name}</copyright>
      <image>
        <url>${SITE.url}/logo.png</url>
        <title>${SITE.name}</title>
        <link>${SITE.url}</link>
      </image>
    `,
  });
}
