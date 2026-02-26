import { test } from 'node:test';
import path from 'node:path';
import { remark } from 'remark';
import { read } from 'to-vfile';
import { remarkUsingExample } from './example.ts';

// eslint-disable-next-line max-len
await test('Remark without \'remark-gfm-admonition\' writes broken GutHub admonitions',
  async (t) => {
    const outputFile = await remark()
      .process(await read(path.resolve(
        import.meta.dirname, 'fixtures', 'main.md'
      )));
    t.assert.fileSnapshot(
      String(outputFile),
      path.resolve(import.meta.dirname, 'fixtures', 'broken.md'),
      { serializers: [(data: string) => data] }
    );
  });

// eslint-disable-next-line max-len
await test('Remark with \'remark-gfm-admonition\' reads and writes GutHub admonitions without changes',
  async (t) => {
    const outputFile = await remarkUsingExample(path.resolve(
      import.meta.dirname, 'fixtures', 'main.md'
    ));
    t.assert.fileSnapshot(
      String(outputFile),
      path.resolve(import.meta.dirname, 'fixtures', 'main.md'),
      { serializers: [(data: string) => data] }
    );
  });
