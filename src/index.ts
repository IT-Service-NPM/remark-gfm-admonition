/**
 * With this Remark plugin
 * {@link https://www.npmjs.com/package/remark| Remark}
 * can read GutHub admonitions
 * from markdown and write it to markdown without changes.
 *
 * @packageDocumentation
 */

import type { Preset, Processor } from 'unified';
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
import remarkDirective from 'remark-directive';
import remarkGithubAdmonitionsToDirectives, {
  GithubAlertType,
  DirectiveName
} from 'remark-github-admonitions-to-directives';

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
  if (Object.keys(GithubAlertType).includes(node.name)) {
    return handleDirectiveToMarkdownFallback!(node, parent, state, info);
  } else {
    const tracker = state.createTracker(info);
    const exit = state.enter(node.type);

    const directiveName: DirectiveName = node.name as DirectiveName;
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
 * With this Remark plugin
 * {@link https://www.npmjs.com/package/remark| Remark}
 * can read GutHub admonitions
 * from markdown and write it to markdown without changes.
 *
 * @remarks
 *
 * @see {@link https://www.npmjs.com/package/remark| Remark}
 *
 * @public
 */
export function remarkGithubAdmonitions(
  this: Processor
): void {
  const processorData = this.data();
  processorData.toMarkdownExtensions ??= [];
  processorData.toMarkdownExtensions.push(
    githubAdmonitionDirectiveToMarkdown()
  );
};

/**
 * Preset of Remark plugins:
 * {@link remarkGithubAdmonitions},
 * {@link https://www.npmjs.com/package/remark-directive| remark-directive}
 * and {@link https://www.npmjs.com/package/remark-directive
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
