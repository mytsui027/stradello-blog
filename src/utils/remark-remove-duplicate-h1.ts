import type { Root } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

/**
 * Remark plugin to remove the first H1 from markdown content
 * This prevents duplicate H1 when the markdown has a heading that matches the frontmatter title
 */
export const remarkRemoveDuplicateH1: Plugin<[], Root> = function () {
  return function (tree: Root) {
    let firstH1Found = false;
    
    visit(tree, 'heading', (node, index, parent) => {
      if (node.depth === 1 && !firstH1Found) {
        firstH1Found = true;
        
        // Remove the first H1
        if (parent && typeof index === 'number') {
          parent.children.splice(index, 1);
        }
      }
    });
  };
};
