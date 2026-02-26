import { remark } from 'remark';
import { read } from 'to-vfile';
import type { VFile } from 'vfile';
import { remarkGithubAdmonitionsPreset }
  from '@it-service-npm/remark-gfm-admonition';

export async function remarkUsingExample(
  filePath: string
): Promise<VFile> {
  return remark()
    .use(remarkGithubAdmonitionsPreset)
    .process(await read(filePath));
};
