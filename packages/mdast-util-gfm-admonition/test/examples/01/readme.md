# Read from markdown file and write back all types of GutHub admonitions

This package adds support for
[GitHub (GFM) admonitions] syntax to [`mdast-util-from-markdown`]
(to support parsing admonitions in markdown into a syntax tree)
and to [`mdast-util-to-markdown`]
(to support serializing admonitions in syntax trees to markdown).

[GitHub (GFM) admonitions]: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts

[`mdast-util-from-markdown`]: https://github.com/syntax-tree/mdast-util-from-markdown

[`mdast-util-to-markdown`]: https://github.com/syntax-tree/mdast-util-to-markdown

Usage example:

```typescript file=./example.ts
import type { Root, Nodes } from 'mdast';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toMarkdown } from 'mdast-util-to-markdown';
import { gfmCallout } from '@it-service-npm/micromark-extension-gfm-admonition';
import {
  gfmCalloutFromMarkdown, gfmCalloutToMarkdown
} from '@it-service-npm/mdast-util-gfm-admonition';

export function mdastFromMarkdownUsingExample(markdown: string): Root {
  return fromMarkdown(markdown, {
    extensions: [gfmCallout()],
    mdastExtensions: [gfmCalloutFromMarkdown()],
  });
};

export function mdastToMarkdownUsingExample(ast: Nodes): string {
  return toMarkdown(ast, {
    extensions: [gfmCalloutToMarkdown()],
  });
};


```

Source files:

```markdown file=./fixtures/main.md
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

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.


```

[`mdast-util-from-markdown`] get markdown AST:

```json file=./snapshots/main.json
{
  "type": "root",
  "children": [
    {
      "type": "heading",
      "depth": 1,
      "children": [
        {
          "type": "text",
          "value": "Basic Usage"
        }
      ]
    },
    {
      "type": "gfmCallout",
      "kind": "NOTE",
      "children": [
        {
          "type": "paragraph",
          "children": [
            {
              "type": "text",
              "value": "Useful information that users should know, even when skimming content."
            }
          ]
        }
      ]
    },
    {
      "type": "gfmCallout",
      "kind": "NOTE",
      "children": [
        {
          "type": "paragraph",
          "children": [
            {
              "type": "text",
              "value": "Useful information that users should know, even when skimming content."
            }
          ]
        }
      ]
    },
    {
      "type": "gfmCallout",
      "kind": "NOTE",
      "children": [
        {
          "type": "paragraph",
          "children": [
            {
              "type": "text",
              "value": "Useful information that users should know, even when skimming content."
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "type": "text",
              "value": "Useful information that users should know, even when skimming content."
            }
          ]
        }
      ]
    },
    {
      "type": "gfmCallout",
      "kind": "NOTE",
      "children": [
        {
          "type": "paragraph",
          "children": [
            {
              "type": "text",
              "value": "Before list:"
            }
          ]
        },
        {
          "type": "list",
          "ordered": false,
          "start": null,
          "spread": false,
          "children": [
            {
              "type": "listItem",
              "spread": false,
              "checked": null,
              "children": [
                {
                  "type": "paragraph",
                  "children": [
                    {
                      "type": "text",
                      "value": "list 1"
                    }
                  ]
                },
                {
                  "type": "list",
                  "ordered": false,
                  "start": null,
                  "spread": false,
                  "children": [
                    {
                      "type": "listItem",
                      "spread": false,
                      "checked": null,
                      "children": [
                        {
                          "type": "paragraph",
                          "children": [
                            {
                              "type": "text",
                              "value": "list 1.1"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "listItem",
                      "spread": false,
                      "checked": null,
                      "children": [
                        {
                          "type": "paragraph",
                          "children": [
                            {
                              "type": "text",
                              "value": "list 1.2"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "type": "listItem",
              "spread": false,
              "checked": null,
              "children": [
                {
                  "type": "paragraph",
                  "children": [
                    {
                      "type": "text",
                      "value": "list 2"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "paragraph",
          "children": [
            {
              "type": "text",
              "value": "After list."
            }
          ]
        }
      ]
    },
    {
      "type": "gfmCallout",
      "kind": "TIP",
      "children": [
        {
          "type": "paragraph",
          "children": [
            {
              "type": "text",
              "value": "Helpful advice for doing things better or more easily."
            }
          ]
        }
      ]
    },
    {
      "type": "gfmCallout",
      "kind": "IMPORTANT",
      "children": [
        {
          "type": "paragraph",
          "children": [
            {
              "type": "text",
              "value": "Key information users need to know to achieve their goal."
            }
          ]
        }
      ]
    },
    {
      "type": "gfmCallout",
      "kind": "WARNING",
      "children": [
        {
          "type": "paragraph",
          "children": [
            {
              "type": "text",
              "value": "Urgent info that needs immediate user attention to avoid problems."
            }
          ]
        }
      ]
    },
    {
      "type": "gfmCallout",
      "kind": "CAUTION",
      "children": [
        {
          "type": "paragraph",
          "children": [
            {
              "type": "text",
              "value": "Advises about risks or negative outcomes of certain actions."
            }
          ]
        }
      ]
    }
  ]
}
```

And [`mdast-util-to-markdown`] write markdown AST back to markdown file:

```markdown file=./snapshots/main.md
# Basic Usage

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!NOTE]
> Useful information that users should know, even when skimming content.
>
> Useful information that users should know, even when skimming content.

> [!NOTE]
> Before list:
>
> * list 1
>   * list 1.1
>   * list 1.2
> * list 2
>
> After list.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

```
