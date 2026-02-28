import type { Root, Nodes } from 'mdast';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toMarkdown } from 'mdast-util-to-markdown';
import { gfmCallout } from '@it-service-npm/micromark-extension-gfm-admonition';
import {
  gfmCalloutFromMarkdown, gfmCalloutToMarkdown
} from '@it-service-npm/mdast-util-gfm-admonition';

export function mdastFromMarkdownUsingExample(markdown: string): Root {
  return fromMarkdown(markdown, {
    extensions: [gfmCallout()],
    mdastExtensions: [gfmCalloutFromMarkdown()],
  });
};

export function mdastToMarkdownUsingExample(ast: Nodes): string {
  return toMarkdown(ast, {
    extensions: [gfmCalloutToMarkdown()],
  });
};

