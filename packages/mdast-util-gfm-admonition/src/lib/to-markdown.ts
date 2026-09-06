import type { Parents, GfmCallout } from 'mdast';
import type { Options, State, Info } from 'mdast-util-to-markdown';
import '@it-service-npm/micromark-extension-gfm-admonition';

/**
 * Create an extension for `mdast-util-to-markdown`
 * to enable GFM admonitions in markdown.
 *
 * @public
 */
export function gfmCalloutToMarkdown(): Options {
  return {
    handlers: {
      gfmCallout: handleGfmCallout,
    },
    unsafe: [
    ]
  };
}

/**
 * GutHub admonitions handler for
 * `mdast-util-to-markdown`
 *
 * @param node - ContainerDirective (GitHub admonition in AST)
 * @param parent - GitHub admonition node parent
 * @param state - Info passed around about the current state of AST compiler
 * @param info - Info on the surrounding of the node that is serialized
 * @returns markdown string
 *
 * @private
 */
function handleGfmCallout(
  node: GfmCallout,
  parent: Parents | undefined,
  state: State,
  info: Info
): string {
  const tracker = state.createTracker(info);
  const exit = state.enter(node.type);
  let value: string = tracker.move(`> [!${node.kind}]\n`);
  value += state.indentLines(
    state.containerFlow(node, tracker.current()),
    (value: string, _line: number, isBlank: boolean): string =>
      isBlank ? '>' : `> ${value}`
  );
  exit();
  return value;
};
