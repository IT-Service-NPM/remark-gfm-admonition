/**
 * {@link https://github.com/syntax-tree/mdast|mdast}
 * extensions to parse and serialize
 * GitHub (GFM) admonitions.
 *
 * @packageDocumentation
 */

declare module 'mdast' {

  /**
   * GFM admonition Node interface.
   *
   * @public
   */
  export interface GfmCallout extends Parent {
    type: 'gfmCallout';
    kind: string;
  }

  interface RootContentMap {
    gfmCallout: GfmCallout;
  }

}

declare module 'mdast-util-to-markdown' {

  interface ConstructNameMap {
    /**
     * Whole GitHub (GFM) admonition
     *
     * ```markdown
     * > | > [!KIND]
     *     ^^^^^^^^^
     * > | > Content
     *     ^^^^^^^^^
     * ```
     */
    gfmCallout: 'gfmCallout'
    /**
     * GitHub (GFM) admonition marker
     *
     * ```markdown
     * > | > [!KIND]
     *     ^
     * > | > Content
     * ```
     */
    gfmCalloutMarker: 'gfmCalloutMarker';
    /**
     * GitHub (GFM) admonition prefix
     *
     * ```markdown
     * > | > [!KIND]
     *     ^^^^^^^^^
     * > | > Content
     * ```
     */
    gfmCalloutPrefix: 'gfmCalloutPrefix';
    /**
     * GitHub (GFM) admonition prefix space
     *
     * ```markdown
     * > | > [!KIND]
     *      ^
     * > | > Content
     * ```
     */
    gfmCalloutPrefixWhiteSpace: 'gfmCalloutPrefixWhiteSpace';
    /**
     * GitHub (GFM) admonition type group
     *
     * ```markdown
     * > | > [!KIND]
     *       ^^^^^^^
     * > | > Content
     * ```
     */
    gfmCalloutType: 'gfmCalloutType';
    /**
     * GitHub (GFM) admonition type group start
     *
     * ```markdown
     * > | > [!KIND]
     *       ^^
     * > | > Content
     * ```
     */
    gfmCalloutTypeStart: 'gfmCalloutTypeStart';
    /**
     * GitHub (GFM) admonition type group markers
     *
     * ```markdown
     * > | > [!KIND]
     *       ^^    ^
     * > | > Content
     * ```
     */
    gfmCalloutTypeMarker: 'gfmCalloutTypeMarker';
    /**
     * GitHub (GFM) admonition type value (string)
     *
     * ```markdown
     * > | > [!KIND]
     *         ^^^^
     * > | > Content
     * ```
     */
    gfmCalloutTypeString: 'gfmCalloutTypeString';
    /**
     * GitHub (GFM) admonition type group end
     *
     * ```markdown
     * > | > [!KIND]
     *             ^
     * > | > Content
     * ```
     */
    gfmCalloutTypeEnd: 'gfmCalloutTypeEnd';
    /**
     * GitHub (GFM) admonition whole content
     *
     * ```markdown
     * > | > [!KIND]
     * > | > Content
     *     ^^^^^^^^^
     * ```
     */
    gfmCalloutContent: 'gfmCalloutContent';
    /**
     * GitHub (GFM) admonition whole content
     *
     * ```markdown
     * > | > [!KIND]
     * > | > Content
     *     ^^
     * ```
     */
    gfmCalloutContentPrefix: 'gfmCalloutContentPrefix';
    /**
     * GitHub (GFM) admonition whole content
     *
     * ```markdown
     * > | > [!KIND]
     * > | > Content
     *     ^
     * ```
     */
    gfmCalloutContentMarker: 'gfmCalloutContentMarker';
    /**
     * GitHub (GFM) admonition whole content
     *
     * ```markdown
     * > | > [!KIND]
     * > | > Content
     *      ^
     * ```
     */
    gfmCalloutContentPrefixWhitespace: 'gfmCalloutContentPrefixWhitespace';

  }

}

export { gfmCalloutFromMarkdown } from './lib/from-markdown.ts';
export { gfmCalloutToMarkdown } from './lib/to-markdown.ts';
