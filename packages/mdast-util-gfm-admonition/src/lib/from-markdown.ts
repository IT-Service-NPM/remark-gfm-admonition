import type { GfmCallout } from 'mdast';
import type { Extension, Token } from 'mdast-util-from-markdown';
import '@it-service-npm/micromark-extension-gfm-admonition';

/**
 * Create an extension for `mdast-util-from-markdown`
 * to enable GFM admonitions in markdown.
 *
 * @public
 */
export function gfmCalloutFromMarkdown(): Extension {
  return {
    enter: {
      gfmCallout(token: Token) {
        this.enter(
          {
            type: 'gfmCallout',
            kind: 'TIP',
            children: []
          } as GfmCallout,
          token
        );
      },
      gfmCalloutTypeString(token: Token) {
        const node = this.stack.at(-1);
        if (node?.type === 'gfmCallout') {
          node.kind = this.sliceSerialize(token);
        }
      }
    },
    exit: {
      gfmCallout(token: Token) {
        this.exit(token);
      }
    }
  };
}
