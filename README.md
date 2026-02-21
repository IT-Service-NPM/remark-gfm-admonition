# @it-service-npm/remark-gfm-admonition Remark plugin

[![GitHub release][github-release]][github-release-url]
[![NPM release][npm]][npm-url]
[![Node version][node]][node-url]
[![Dependencies status][deps]][deps-url]
[![Install size][size]][size-url]

[![CI Status][build]][build-url]
[![Tests Results][tests]][tests-url]
[![Coverage status][coverage]][coverage-url]

[![Semantic Versioning](https://img.shields.io/badge/Semantic%20Versioning-v2.0.0-green.svg?logo=semver)](https://semver.org/lang/ru/spec/v2.0.0.html)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-v1.0.0-yellow.svg?logo=git)](https://conventionalcommits.org)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

[![VS Code](https://img.shields.io/badge/Visual_Studio_Code-0078D4?logo=visual%20studio%20code)](https://code.visualstudio.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-333333.svg?logo=typescript)](http://www.typescriptlang.org/)
[![EditorConfig](https://img.shields.io/badge/EditorConfig-333333.svg?logo=editorconfig)](https://editorconfig.org)
[![ESLint](https://img.shields.io/badge/ESLint-3A33D1?logo=eslint)](https://eslint.org)

[github-release]: https://img.shields.io/github/v/release/IT-Service-NPM/remark-gfm-admonition.svg?sort=semver&logo=github

[github-release-url]: https://github.com/IT-Service-NPM/remark-gfm-admonition/releases

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

[tests]: https://img.shields.io/endpoint?logo=vitest&url=https%3A%2F%2Fgist.githubusercontent.com%2Fsergey-s-betke%2Fd70e4de09a490afc9fb7a737363b231a%2Fraw%2Fremark-gfm-admonition-junit-tests.json

[tests-url]: https://github.com/IT-Service-NPM/remark-gfm-admonition/actions/workflows/ci.yml

[coverage]: https://coveralls.io/repos/github/IT-Service-NPM/remark-gfm-admonition/badge.svg?branch=main

[coverage-url]: https://coveralls.io/github/IT-Service-NPM/remark-gfm-admonition?branch=main

This plugin extends Remark’s functionality,
enabling it to read GitHub admonitions from Markdown
and write them back to Markdown files.

> [!IMPORTANT]
> [`remark-directive`](https://www.npmjs.com/package/remark-directive)
> plugin expected
> and [`remark-github-admonitions-to-directives`](https://www.npmjs.com/package/remark-github-admonitions-to-directives).

> [!TIP]
> This package provides plugin and preset with expected plugins:
>
> - `remarkGithubAdmonitionsPreset`. This preset contains:
>   - `remarkDirective`
>   - `remarkGithubAdmonitionsToDirectives`
>   - `remarkGithubAdmonitions`

## Install

```sh
npm install --save-dev @it-service-npm/remark-gfm-admonition
```

## Examples

### Write GutHub admonitions to markdown

Remark write broken markdown file with GutHub admonitions.

`@it-service-npm/remark-gfm-admonition`
extends Remark’s functionality,
enabling it to read GitHub admonitions from Markdown
and write them back to Markdown files

```typescript file=test/examples/01/example.ts
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

```markdown file=test/examples/01/fixtures/main.md
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

```markdown file=test/examples/01/fixtures/main.md
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

```markdown file=test/examples/01/fixtures/broken.md
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

Please, read the [API reference](/docs/index.md).

## License

[MIT](LICENSE) © [Sergei S. Betke](https://github.com/sergey-s-betke)
