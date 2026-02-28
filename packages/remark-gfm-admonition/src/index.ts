/**
 * This plugin extends
 * {@link https://www.npmjs.com/package/remark| Remark}
 * functionality,
 * enabling it to read GitHub admonitions from Markdown
 * and to write them back to Markdown files.
 *
 * @packageDocumentation
 */

import type { Plugin, Processor } from 'unified';
import 'remark-stringify';
import 'remark-parse';
import { gfmCallout } from '@it-service-npm/micromark-extension-gfm-admonition';
import {
  gfmCalloutFromMarkdown, gfmCalloutToMarkdown
} from '@it-service-npm/mdast-util-gfm-admonition';

/**
 * This plugin extends
 * {@link https://www.npmjs.com/package/remark| Remark}
 * functionality,
 * enabling it to read GitHub admonitions from Markdown
 * and to write them back to Markdown files.
 *
 * @remarks
 *
 * @see {@link https://www.npmjs.com/package/remark| Remark}
 *
 * @public
 */
export const remarkGithubAdmonitions: Plugin = function (
  this: Processor
): void {
  const processorData = this.data();

  processorData.micromarkExtensions ??= [];
  processorData.micromarkExtensions.push(
    gfmCallout()
  );

  processorData.fromMarkdownExtensions ??= [];
  processorData.fromMarkdownExtensions.push(
    gfmCalloutFromMarkdown()
  );

  processorData.toMarkdownExtensions ??= [];
  processorData.toMarkdownExtensions.push(
    gfmCalloutToMarkdown()
  );
};
