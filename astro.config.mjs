import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
	site: 'https://stradello-blog-jwek-bk9lk0vhc-mytsui027s-projects.vercel.app',
	integrations: [tailwind()],
});
