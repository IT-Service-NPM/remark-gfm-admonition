import type {
  Code, Effects, Extension, State, TokenizeContext, Construct
} from 'micromark-util-types';
import {
  markdownSpace, markdownLineEnding, asciiAlpha
} from 'micromark-util-character';
import { codes } from 'micromark-util-symbol';

const gfmCalloutTypeStringSizeMax = 9;

const _gfmCallout: Construct = {
  name: 'gfmCallout',
  tokenize,
  add: 'before'
};

const _gfmCalloutContent: Construct = {
  name: 'gfmCalloutContent',
  tokenize: tokenizeContent,
  continuation: {
    tokenize: tokenizeContentContinuation
  },
  exit
};

/**
 * Create an extension for
 * {@link https://github.com/micromark/micromark| micromark}
 * to enable GFM admonition syntax.
 *
 * @public
 */
export function gfmCallout(): Extension {
  return {
    document: {
      [codes.greaterThan]: _gfmCallout
    },
  };
};

/**
 * A tokenizer for GFM admonition syntax.
 *
 * @private
 */
function tokenize(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State
): State {

  let typeStringSize = 0;

  return start;

  /**
   * Start of callout
   *
   * ```markdown
   * > | > [!type]
   *     ^
   * ```
   */
  function start(code: Code): State | undefined {
    effects.enter('gfmCallout');
    effects.enter('gfmCalloutPrefix');
    effects.enter('gfmCalloutMarker');
    effects.consume(code);
    effects.exit('gfmCalloutMarker');
    return after;
  };

  /**
   * Before callout type
   *
   * ```markdown
   * > | > [!type]
   *      ^
   * ```
   */
  function after(code: Code): State | undefined {
    if (markdownSpace(code)) {
      effects.enter('gfmCalloutPrefixWhiteSpace');
      effects.consume(code);
      effects.exit('gfmCalloutPrefixWhiteSpace');
      return typeStart;
    } else {
      return nok(code);
    };
  };

  /**
   * Inside marker before callout type
   *
   * ```markdown
   * > | > [!type]
   *       ^
   * ```
   */
  function typeStart(code: Code): State | undefined {
    if (code === codes.leftSquareBracket) {
      effects.enter('gfmCalloutType');
      effects.enter('gfmCalloutTypeStart');
      effects.enter('gfmCalloutTypeMarker');
      effects.consume(code);
      return typeStartAfter;
    } else {
      return nok(code);
    };
  };

  /**
   * Inside exclamation mark before callout type
   *
   * ```markdown
   * > | > [!type]
   *        ^
   * ```
   */
  function typeStartAfter(code: Code): State | undefined {
    if (code === codes.exclamationMark) {
      effects.consume(code);
      effects.exit('gfmCalloutTypeMarker');
      effects.exit('gfmCalloutTypeStart');
      effects.enter('gfmCalloutTypeString');
      return typeStringInside;
    } else {
      return nok(code);
    };
  };

  /**
   * Inside callout type
   *
   * ```markdown
   * > | > [!type]
   *         ^
   * ```
   */
  function typeStringInside(code: Code): State | undefined {
    if (
      asciiAlpha(code) &&
      ++typeStringSize <= gfmCalloutTypeStringSizeMax
    ) {
      effects.consume(code);
      return typeStringInside;
    } else {
      return typeEnd(code);
    }
  };

  /**
   * Inside marker after callout type
   *
   * ```markdown
   * > | > [!type]
   *             ^
   * ```
   */
  function typeEnd(code: Code): State | undefined {
    if (
      (code === codes.rightSquareBracket) &&
      typeStringSize > 0
    ) {
      effects.exit('gfmCalloutTypeString');
      effects.enter('gfmCalloutTypeEnd');
      effects.enter('gfmCalloutTypeMarker');
      effects.consume(code);
      effects.exit('gfmCalloutTypeMarker');
      effects.exit('gfmCalloutTypeEnd');
      effects.exit('gfmCalloutType');
      effects.exit('gfmCalloutPrefix');
      return typeEndAfter;
    } else {
      return nok(code);
    };
  };

  /**
   * After marker after callout type
   *
   * ```markdown
   * > | > [!type]
   *              ^
   * ```
   */
  function typeEndAfter(code: Code): State | undefined {
    if (markdownLineEnding(code)) {
      effects.consume(code);
      return contentStart;
    } else {
      return nok(code);
    };
  };

  /**
   * After marker after callout type
   *
   * ```markdown
   * > | > [!type]
   * > | >
   *     ^
   * ```
   */
  function contentStart(code: Code): State | undefined {
    return effects.attempt(_gfmCalloutContent, ok, nok)(code);
  };
};

function tokenizeContent(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State
): State {

  const self = this;
  return start;

  /**
   * Start of callout continuation
   *
   * ```markdown
   * > | > [!type]
   * > | > Content
   *     ^
   * ```
   */
  function start(code: Code): State | undefined {
    if (code === codes.greaterThan) {
      const state = self.containerState!;

      if (!state.open) {
        effects.enter('gfmCalloutContent', { _container: true });
        state.open = true;
      }

      effects.enter('gfmCalloutContentPrefix');
      effects.enter('gfmCalloutContentMarker');
      effects.consume(code);
      effects.exit('gfmCalloutContentMarker');
      return after;
    } else {
      return nok(code);
    };
  }

  /**
   * After `>`, before optional whitespace.
   *
   * ```markdown
   * > | > [!type]
   * > | > Content
   *      ^
   * ```
   */
  function after(code: Code): State | undefined {
    if (markdownSpace(code)) {
      effects.enter('gfmCalloutContentPrefixWhitespace');
      effects.consume(code);
      effects.exit('gfmCalloutContentPrefixWhitespace');
      effects.exit('gfmCalloutContentPrefix');
      return ok;
    } else {
      effects.exit('gfmCalloutContentPrefix');
      return ok(code);
    };
  }
};

function tokenizeContentContinuation(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State
): State {

  return start;

  /**
   * Start of callout continuation
   *
   * ```markdown
   * > | > Content
   *     ^
   * ```
   */
  function start(code: Code): State | undefined {
    return effects.attempt(_gfmCalloutContent, ok, nok)(code);
  }
};

function exit(this: TokenizeContext, effects: Effects): undefined {
  effects.exit('gfmCalloutContent');
  effects.exit('gfmCallout');
};
