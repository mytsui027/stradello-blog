import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { visit } from 'unist-util-visit';

// Remark plugin to remove the first H1 from markdown content
const remarkRemoveDuplicateH1 = () => {
	return (tree) => {
		let firstH1Found = false;
		visit(tree, 'heading', (node, index, parent) => {
			if (node.depth === 1 && !firstH1Found) {
				firstH1Found = true;
				if (parent && typeof index === 'number') {
					parent.children.splice(index, 1);
				}
			}
		});
	};
};

export default defineConfig({
	site: 'https://stradello.com.br',
	integrations: [tailwind()],
	markdown: {
		remarkPlugins: [remarkRemoveDuplicateH1],
	},
});
