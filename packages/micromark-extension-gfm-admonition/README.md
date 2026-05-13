# @it-service-npm/micromark-extension-gfm-admonition

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

[npm]: https://img.shields.io/npm/v/@it-service-npm/micromark-extension-gfm-admonition.svg?logo=npm

[npm-url]: https://www.npmjs.com/package/@it-service-npm/micromark-extension-gfm-admonition

[node]: https://img.shields.io/node/v/@it-service-npm/micromark-extension-gfm-admonition.svg

[node-url]: https://nodejs.org

[deps]: https://img.shields.io/librariesio/release/npm/@it-service-npm/micromark-extension-gfm-admonition

[deps-url]: https://libraries.io/npm/@it-service-npm%2Fmicromark-extension-gfm-admonition

[size]: https://packagephobia.com/badge?p=@it-service-npm/micromark-extension-gfm-admonition

[size-url]: https://packagephobia.com/result?p=@it-service-npm/micromark-extension-gfm-admonition

[build]: https://github.com/IT-Service-NPM/remark-gfm-admonition/actions/workflows/ci.yml/badge.svg?branch=main

[build-url]: https://github.com/IT-Service-NPM/remark-gfm-admonition/actions/workflows/ci.yml

[micromark] extensions to support
[GitHub (GFM) admonitions].

[micromark]: https://github.com/micromark/micromark

[GitHub (GFM) admonitions]: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts

## What is this?

This package contains two extensions
to add support for GFM admonition syntax
to [micromark].

## When to use this

This project is useful if you want to support
[GitHub (GFM) admonitions] in your markdown.

You can use these extensions when you are working with [micromark].

## Contents

- [Install](#install)
- [Syntax](#syntax)
- [Examples](#examples)
  - [Support all GitHub admonition types](#support-all-githubadmonitiontypes)
- [API](#api)
- [License](#license)

## Install

```sh
npm install --save @it-service-npm/micromark-extension-gfm-admonition
```

## Syntax

[GitHub (GFM) admonitions] derive from blockquote
and have a prefix that defines its appearance.

[GitHub (GFM) admonitions] form with the following BNF:

```bnf
<callout> ::= <prefix> ("\n" <content>)*

<prefix> ::= ">" <space> "[" "!" <type> "]"
<content> ::= ">" | ">" <space> <letter>*

<type> ::= <letter>+ | <type> <space>+

<letter> ::= [a-z] | [A-Z] | [0-9]
<space> ::= " "
```

The above grammar is just a rough description.

## Examples

### Support all GitHub admonition types

Remark writes broken markdown file with GitHub admonitions.

`@it-service-npm/micromark-extension-gfm-admonition`
extends micromark functionality,
enabling it to read from source file
and to write GitHub admonitions to HTML files.

Source files:

```markdown
# Basic Usage

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!NOTE]
>
> Useful information that users should know, even when skimming content.

> [!NOTE]
>
> Useful information that users should know, even when skimming content.
>
> Useful information that users should know, even when skimming content.

> [!NOTE]
>
> Before list:
>
> - list 1
>   - list 1.1
>   - list 1.2
> - list 2
>
> After list.
```

```markdown
# All GitHub admonition types

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

```

Output:

```html
<h1>Basic Usage</h1>
<blockquote class="callout" data-type="NOTE">
<p>Useful information that users should know, even when skimming content.</p>
</blockquote>
<blockquote class="callout" data-type="NOTE">
<p>Useful information that users should know, even when skimming content.</p>
</blockquote>
<blockquote class="callout" data-type="NOTE">
<p>Useful information that users should know, even when skimming content.</p>
<p>Useful information that users should know, even when skimming content.</p>
</blockquote>
<blockquote class="callout" data-type="NOTE">
<p>Before list:</p>
<ul>
<li>list 1
<ul>
<li>list 1.1</li>
<li>list 1.2</li>
</ul>
</li>
<li>list 2</li>
</ul>
<p>After list.</p>
</blockquote>
```

```html
<h1>All GitHub admonition types</h1>
<blockquote class="callout" data-type="NOTE">
<p>Useful information that users should know, even when skimming content.</p>
</blockquote>
<blockquote class="callout" data-type="TIP">
<p>Helpful advice for doing things better or more easily.</p>
</blockquote>
<blockquote class="callout" data-type="IMPORTANT">
<p>Key information users need to know to achieve their goal.</p>
</blockquote>
<blockquote class="callout" data-type="WARNING">
<p>Urgent info that needs immediate user attention to avoid problems.</p>
</blockquote>
<blockquote class="callout" data-type="CAUTION">
<p>Advises about risks or negative outcomes of certain actions.</p>
</blockquote>
```

## API

Please, read the [API reference](docs/index.md).

## License

[MIT](LICENSE) © [Sergei S. Betke](https://github.com/sergey-s-betke)
