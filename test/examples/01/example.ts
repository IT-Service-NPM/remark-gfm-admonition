import { remark } from 'remark';
import { read } from 'to-vfile';
import { remarkGithubAdmonitionsPreset }
  from '@it-service-npm/remark-gfm-admonitions';
import type { VFile } from 'vfile';

export async function remarkUsingExample(
  filePath: string
): Promise<VFile> {
  return remark()
    .use(remarkGithubAdmonitionsPreset)
    .process(await read(filePath));
};
