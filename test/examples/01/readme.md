# Write GutHub admonitions to markdown

Remark writes broken markdown file with GutHub admonitions.

`@it-service-npm/remark-gfm-admonition`
extends Remark’s functionality,
enabling it to read GitHub admonitions from Markdown
and to write them back to Markdown files

```typescript file=./example.ts
import { remark } from 'remark';
import { read } from 'to-vfile';
import { remarkGithubAdmonitionsPreset }
  from '@it-service-npm/remark-gfm-admonition';
import type { VFile } from 'vfile';

export async function remarkUsingExample(
  filePath: string
): Promise<VFile> {
  return remark()
    .use(remarkGithubAdmonitionsPreset)
    .process(await read(filePath));
};
```

Source files:

main.md:

```markdown file=./fixtures/main.md
# markdown file with GitHub admonitions

Text before GitHub admonition.

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

Text.

> [!IMPORTANT]
> Markdown inside GitHub admonition with plugin
> [`@it-service-npm/remark-gfm-admonition`](https://github.com/IT-Service-NPM/remark-gfm-admonition).
>
> Second paragraph:
>
> * list item 1.0:
>   * list item 1.1
>   * list item 1.2
> * list item 2.0:
>   * list item 2.1
>   * list item 2.2

Text after GitHub admonitions.
```

Remark output:

```markdown file=./fixtures/main.md
# markdown file with GitHub admonitions

Text before GitHub admonition.

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

Text.

> [!IMPORTANT]
> Markdown inside GitHub admonition with plugin
> [`@it-service-npm/remark-gfm-admonition`](https://github.com/IT-Service-NPM/remark-gfm-admonition).
>
> Second paragraph:
>
> * list item 1.0:
>   * list item 1.1
>   * list item 1.2
> * list item 2.0:
>   * list item 2.1
>   * list item 2.2

Text after GitHub admonitions.
```

Remark output without plugin:

```markdown file=./fixtures/broken.md
# markdown file with GitHub admonitions

Text before GitHub admonition.

> \[!NOTE]
> Useful information that users should know, even when skimming content.

> \[!TIP]
> Helpful advice for doing things better or more easily.

> \[!IMPORTANT]
> Key information users need to know to achieve their goal.

> \[!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> \[!CAUTION]
> Advises about risks or negative outcomes of certain actions.

Text.

> \[!IMPORTANT]
> Markdown inside GitHub admonition with plugin
> [`@it-service-npm/remark-gfm-admonition`](https://github.com/IT-Service-NPM/remark-gfm-admonition).
>
> Second paragraph:
>
> * list item 1.0:
>   * list item 1.1
>   * list item 1.2
> * list item 2.0:
>   * list item 2.1
>   * list item 2.2

Text after GitHub admonitions.
```
