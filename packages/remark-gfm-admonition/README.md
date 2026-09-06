# @it-service-npm/remark-gfm-admonition Remark plugin

[![NPM release][npm]][npm-url]
[![Node version][node]][node-url]
[![Dependencies status][deps]][deps-url]
[![Install size][size]][size-url]

[![CI Status][build]][build-url]

[![Semantic Versioning](https://img.shields.io/badge/Semantic%20Versioning-v2.0.0-green.svg?logo=semver)](https://semver.org/lang/ru/spec/v2.0.0.html)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-v1.0.0-yellow.svg?logo=git)](https://conventionalcommits.org)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

[![VS Code](https://img.shields.io/badge/Visual_Studio_Code-0078D4?logo=visual%20studio%20code)](https://code.visualstudio.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-333333.svg?logo=typescript)](http://www.typescriptlang.org/)
[![EditorConfig](https://img.shields.io/badge/EditorConfig-333333.svg?logo=editorconfig)](https://editorconfig.org)
[![ESLint](https://img.shields.io/badge/ESLint-3A33D1?logo=eslint)](https://eslint.org)

[npm]: https://img.shields.io/npm/v/@it-service-npm/remark-gfm-admonition.svg?logo=npm

[npm-url]: https://www.npmjs.com/package/@it-service-npm/remark-gfm-admonition

[node]: https://img.shields.io/node/v/@it-service-npm/remark-gfm-admonition.svg

[node-url]: https://nodejs.org

[deps]: https://img.shields.io/librariesio/release/npm/@it-service-npm/remark-gfm-admonition

[deps-url]: https://libraries.io/npm/@it-service-npm%2Fremark-gfm-admonition

[size]: https://packagephobia.com/badge?p=@it-service-npm/remark-gfm-admonition

[size-url]: https://packagephobia.com/result?p=@it-service-npm/remark-gfm-admonition

[build]: https://github.com/IT-Service-NPM/remark-gfm-admonition/actions/workflows/ci.yml/badge.svg?branch=main

[build-url]: https://github.com/IT-Service-NPM/remark-gfm-admonition/actions/workflows/ci.yml

This plugin extends Remark’s functionality,
enabling it to read GitHub admonitions from Markdown
and to write them back to Markdown files.

## Contents

- [Install](#install)
- [Examples](#examples)
  - [Write GitHub admonitions to markdown](#write-github-admonitions-tomarkdown)
- [API](#api)
- [License](#license)

## Install

```sh
npm install --save-dev @it-service-npm/remark-gfm-admonition
```

## Examples

### Write GitHub admonitions to markdown

Remark writes broken markdown file with GitHub admonitions.

`@it-service-npm/remark-gfm-admonition`
extends Remark’s functionality,
enabling it to read GitHub admonitions from Markdown
and to write them back to Markdown files.

```typescript
import { remark } from 'remark';
import { read } from 'to-vfile';
import type { VFile } from 'vfile';
import { remarkGithubAdmonitions }
  from '@it-service-npm/remark-gfm-admonition';

export async function remarkUsingExample(
  filePath: string
): Promise<VFile> {
  return remark()
    .use(remarkGithubAdmonitions)
    .process(await read(filePath));
};
```

Source files:

main.md:

```markdown
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

```markdown
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

```markdown
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

## API

Please, read the [API reference](docs/index.md).

## License

[MIT](LICENSE) © [Sergei S. Betke](https://github.com/sergey-s-betke)
