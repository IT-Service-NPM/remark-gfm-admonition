/**
 * This plugin extends
 * {@link https://www.npmjs.com/package/remark| Remark}
 * functionality,
 * enabling it to read GitHub admonitions from Markdown
 * and to write them back to Markdown files.
 *
 * @packageDocumentation
 */

import type { Plugin, Preset, Processor } from 'unified';
import type { Parents } from 'mdast';
import {
  type ContainerDirective,
  type ToMarkdownOptions,
  directiveToMarkdown
} from 'mdast-util-directive';
import {
  type Handle as ToMarkdownHandle,
  type Options as ToMarkdownExtension,
  type State,
  type Info
} from 'mdast-util-to-markdown';
import 'remark-stringify';
import 'remark-parse';
import remarkDirective from 'remark-directive';
import remarkGithubAdmonitionsToDirectives, {
  GithubAlertType,
  DirectiveName
} from 'remark-github-admonitions-to-directives';
import { $enum } from 'ts-enum-util';

let handleDirectiveToMarkdownFallback: ToMarkdownHandle | undefined;

const DirectiveName2GithubAlertType: Record<DirectiveName, GithubAlertType> = {
  [DirectiveName.NOTE]: GithubAlertType.NOTE,
  [DirectiveName.TIP]: GithubAlertType.TIP,
  [DirectiveName.WARNING]: GithubAlertType.WARNING,
  [DirectiveName.INFO]: GithubAlertType.IMPORTANT,
  [DirectiveName.DANGER]: GithubAlertType.CAUTION
};

/**
* GutHub admonitions directives handler for
* `mdast-util-to-markdown`
*
 * @param node - ContainerDirective (GitHub admonition in AST)
 * @param parent - GitHub admonition node parent
 * @param state - Info passed around about the current state of AST compiler
 * @param info - Info on the surrounding of the node that is serialized
* @returns markdown string
*
* @public
*/
export function handleGithubAdmonitionDirective(
  node: ContainerDirective,
  parent: Parents | undefined,
  state: State,
  info: Info
): string {
  const directiveName = $enum(DirectiveName).asValueOrDefault(node.name);
  if (typeof directiveName === 'undefined') {
    return handleDirectiveToMarkdownFallback!(node, parent, state, info);
  } else {
    const tracker = state.createTracker(info);
    const exit = state.enter(node.type);

    const githubAlertType: GithubAlertType =
      DirectiveName2GithubAlertType[directiveName];
    let value: string = tracker.move(`> [!${githubAlertType}]\n`);
    value += state.indentLines(
      state.containerFlow(node, tracker.current()),
      (value: string, line: number, blank: boolean): string =>
        blank ? '>' : `> ${value}`
    );

    exit();
    return value;
  };
};

/**
* Create an extension for `mdast-util-to-markdown` to enable
* GutHub admonitions directives write to markdown
*
* @param options configuration (optional)
* @returns extension for `mdast-util-to-markdown` to enable
*   GutHub admonitions directives write to markdown
*/
function githubAdmonitionDirectiveToMarkdown(
  _options?: Readonly<ToMarkdownOptions> | null
): ToMarkdownExtension {

  handleDirectiveToMarkdownFallback ??=
    directiveToMarkdown().handlers?.containerDirective;

  return {
    handlers: {
      containerDirective: handleGithubAdmonitionDirective
    },
  };

};

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
  processorData.fromMarkdownExtensions ??= [];
  processorData.toMarkdownExtensions ??= [];
  processorData.toMarkdownExtensions.push(
    githubAdmonitionDirectiveToMarkdown()
  );
};

/**
 * Preset of Remark plugins:
 * {@link remarkGithubAdmonitions},
 * {@link https://www.npmjs.com/package/remark-directive| remark-directive},
 * {@link https://www.npmjs.com/package/remark-github-admonitions-to-directives
 * | remark-github-admonitions-to-directives}
 *
 * @remarks
 *
 * @see {@link remarkGithubAdmonitions},
 * @see {@link https://www.npmjs.com/package/remark-directive| remark-directive}
 * @see
 * {@link https://www.npmjs.com/package/remark-github-admonitions-to-directives
 * | remark-github-admonitions-to-directives}
 *
 * @public
 */
export const remarkGithubAdmonitionsPreset: Preset = {
  plugins: [
    remarkDirective,
    remarkGithubAdmonitionsToDirectives,
    remarkGithubAdmonitions
  ]
};
