import { test } from 'node:test';
import path from 'node:path';
import { remarkUsingExample } from './example.ts';

// eslint-disable-next-line max-len
await test('`remarkGithubAdmonitionsPreset` writes directives as GutHub admonitions',
  async (t) => {
    const outputFile = await remarkUsingExample(path.resolve(
      import.meta.dirname, 'fixtures', 'directives.md'
    ));
    t.assert.fileSnapshot(
      String(outputFile),
      path.resolve(import.meta.dirname, 'snapshots', 'directives.md'),
      { serializers: [(data: string) => data] }
    );
  });

// eslint-disable-next-line max-len
await test('`remarkGithubAdmonitionsPreset` reads unknown directives and writes them without changes',
  async (t) => {
    const outputFile = await remarkUsingExample(path.resolve(
      import.meta.dirname, 'fixtures', 'unknown-directives.md'
    ));
    t.assert.fileSnapshot(
      String(outputFile),
      path.resolve(import.meta.dirname, 'snapshots', 'unknown-directives.md'),
      { serializers: [(data: string) => data] }
    );
  });
