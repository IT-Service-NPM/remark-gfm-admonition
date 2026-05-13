/**
 * {@link https://github.com/micromark/micromark|micromark}
 * extensions to support
 * GitHub (GFM) admonitions.
 *
 * @packageDocumentation
 */

declare module 'micromark-util-types' {
  interface TokenTypeMap {
    gfmCallout: 'gfmCallout';
    gfmCalloutMarker: 'gfmCalloutMarker';
    gfmCalloutPrefix: 'gfmCalloutPrefix';
    gfmCalloutPrefixWhiteSpace: 'gfmCalloutPrefixWhiteSpace';
    gfmCalloutType: 'gfmCalloutType';
    gfmCalloutTypeStart: 'gfmCalloutTypeStart';
    gfmCalloutTypeMarker: 'gfmCalloutTypeMarker';
    gfmCalloutTypeString: 'gfmCalloutTypeString';
    gfmCalloutTypeEnd: 'gfmCalloutTypeEnd';
    gfmCalloutContent: 'gfmCalloutContent';
    gfmCalloutContentPrefix: 'gfmCalloutContentPrefix';
    gfmCalloutContentMarker: 'gfmCalloutContentMarker';
    gfmCalloutContentPrefixWhitespace: 'gfmCalloutContentPrefixWhitespace';
  }
};

import 'micromark-util-types';
import 'micromark-util-symbol';

export { gfmCallout } from './lib/syntax.ts';
export { gfmCalloutHtml } from './lib/html.ts';
