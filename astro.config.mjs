import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
site: 'https://stradello-blog.vercel.app',
integrations: [tailwind()],
});
