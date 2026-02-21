import path from 'node:path';
import { remark } from 'remark';
import { read } from 'to-vfile';
import { remarkUsingExample } from './example.ts';

const testSourceFilesPath: string = path.join(__dirname, 'fixtures');
const testMainSourceFilePath: string =
  path.join(testSourceFilesPath, 'main.md');

describe('remark without remark-gfm-admonition', () => {

  it('write broken GutHub admonitions', async () => {
    const outputFile = await remark()
      .process(await read(testMainSourceFilePath));
    await expect(String(outputFile))
      .toMatchFileSnapshot(path.join(testSourceFilesPath, 'broken.md'));
  });

});

describe('remark-gfm-admonition', () => {

  it('read and write GutHub admonitions without changes', async () => {
    const outputFile = await remarkUsingExample(testMainSourceFilePath);

    await expect(String(outputFile))
      .toMatchFileSnapshot(testMainSourceFilePath);
  });

});
