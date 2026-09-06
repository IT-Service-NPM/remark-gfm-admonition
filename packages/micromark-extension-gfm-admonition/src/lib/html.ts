/* eslint-disable unicorn/no-this-outside-of-class */
import type { HtmlExtension } from 'micromark-util-types';

/**
 * Create an extension for
 * {@link https://github.com/micromark/micromark| micromark}
 * to support serializing GFM admonitions to HTML as blockquote.
 *
 * @public
 */
export function gfmCalloutHtml(): HtmlExtension {
  return {
    enter: {
      gfmCalloutTypeString(token) {
        const type = this.sliceSerialize(token);
        this.lineEndingIfNeeded();
        this.tag(`<blockquote class="callout" data-type="${type}">`);
        this.lineEndingIfNeeded();
      }
    },
    exit: {
      gfmCallout() {
        this.lineEndingIfNeeded();
        this.tag('</blockquote>');
        this.lineEndingIfNeeded();
      },
    },
  };
}
