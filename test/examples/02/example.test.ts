import path from 'node:path';
import { remarkUsingExample } from './example.ts';

const testSourceFilesPath: string = path.join(__dirname, 'fixtures');
const testSnapshotFilesPath: string = path.join(__dirname, 'snapshots');

describe('remark-gfm-admonition', () => {

  it('convert directive from source file writes GutHub admonitions',
    async () => {
      const outputFile = await remarkUsingExample(
        path.join(testSourceFilesPath, 'directives.md')
      );

      await expect(String(outputFile))
        .toMatchFileSnapshot(
          path.join(testSnapshotFilesPath, 'directives.md')
        );
    });

  it('reads unknown directives and writes them without changes',
    async () => {
      const outputFile = await remarkUsingExample(
        path.join(testSourceFilesPath, 'unknown-directives.md')
      );

      await expect(String(outputFile))
        .toMatchFileSnapshot(
          path.join(testSnapshotFilesPath, 'unknown-directives.md')
        );
    });

});
