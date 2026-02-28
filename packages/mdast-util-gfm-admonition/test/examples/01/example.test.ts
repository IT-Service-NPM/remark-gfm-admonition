/* eslint-disable quotes */
import { suite, test } from 'node:test';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { removePosition } from 'unist-util-remove-position';
import {
  mdastFromMarkdownUsingExample, mdastToMarkdownUsingExample
} from './example.ts';

await suite("mdast-util-gfm-admonition", async () => {

  await test('mdastFromMarkdownUsingExample',
    async (t) => {
      const tree = mdastFromMarkdownUsingExample(
        await readFile(path.resolve(
          import.meta.dirname, 'fixtures', 'main.md'
        ), 'utf8')
      );
      removePosition(tree, { force: true });
      t.assert.fileSnapshot(
        tree,
        path.resolve(import.meta.dirname, 'snapshots', 'main.json'),
        { serializers: [(data) => JSON.stringify(data, undefined, '  ')] }
      );
    });

  await test('mdastToMarkdownUsingExample',
    async (t) => {
      const tree = mdastFromMarkdownUsingExample(
        await readFile(path.resolve(
          import.meta.dirname, 'fixtures', 'main.md'
        ), 'utf8')
      );
      const markdown = mdastToMarkdownUsingExample(tree);
      t.assert.fileSnapshot(
        markdown,
        path.resolve(import.meta.dirname, 'snapshots', 'main.md'),
        { serializers: [(data: string) => data] }
      );
    });

});
