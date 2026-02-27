import { test } from 'node:test';
import path from 'node:path';
import { readFile } from 'node:fs/promises';

import { micromarkUsingExample } from './example.ts';

// eslint-disable-next-line max-len
await test('\'@it-service-npm/micromark-extension-gfm-admonition\' support GutHub admonitions syntax',
  async (t) => {
    const outputHtml = micromarkUsingExample(
      await readFile(path.resolve(
        import.meta.dirname, 'fixtures', 'basic.md'
      ), 'utf8')
    );
    t.assert.fileSnapshot(
      outputHtml,
      path.resolve(import.meta.dirname, 'snapshots', 'basic.html'),
      { serializers: [(data: string) => data] }
    );
  });

// eslint-disable-next-line max-len
await test('\'@it-service-npm/micromark-extension-gfm-admonition\' support blockquote syntax',
  async (t) => {
    const outputHtml = micromarkUsingExample(
      await readFile(path.resolve(
        import.meta.dirname, 'fixtures', 'blockquote.md'
      ), 'utf8')
    );
    t.assert.fileSnapshot(
      outputHtml,
      path.resolve(import.meta.dirname, 'snapshots', 'blockquote.html'),
      { serializers: [(data: string) => data] }
    );
  });

// eslint-disable-next-line max-len
await test('\'@it-service-npm/micromark-extension-gfm-admonition\' support all GutHub admonitions types',
  async (t) => {
    const outputHtml = micromarkUsingExample(
      await readFile(path.resolve(
        import.meta.dirname, 'fixtures', 'types.md'
      ), 'utf8')
    );
    t.assert.fileSnapshot(
      outputHtml,
      path.resolve(import.meta.dirname, 'snapshots', 'types.html'),
      { serializers: [(data: string) => data] }
    );
  });

// eslint-disable-next-line max-len
await test('\'@it-service-npm/micromark-extension-gfm-admonition\' does not tokenize unknown type of GFM admonitions',
  { skip: true },
  async (t) => {
    const outputHtml = micromarkUsingExample(
      await readFile(path.resolve(
        import.meta.dirname, 'fixtures', 'unknown-types.md'
      ), 'utf8')
    );
    t.assert.fileSnapshot(
      outputHtml,
      path.resolve(import.meta.dirname, 'snapshots', 'unknown-types.html'),
      { serializers: [(data: string) => data] }
    );
  });

// eslint-disable-next-line max-len
await test('\'@it-service-npm/micromark-extension-gfm-admonition\' does not tokenize broken GitHub admonitions',
  async (t) => {
    const markdown = await readFile(path.resolve(
      import.meta.dirname, 'fixtures', 'invalids.md'
    ), 'utf8');
    let outputHtml = '';
    t.assert.doesNotThrow(() => {
      outputHtml = micromarkUsingExample(markdown);
    });
    t.assert.fileSnapshot(
      outputHtml,
      path.resolve(import.meta.dirname, 'snapshots', 'invalids.html'),
      { serializers: [(data: string) => data] }
    );
  });

