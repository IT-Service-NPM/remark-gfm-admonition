# Write GutHub admonitions to markdown

Remark writes broken markdown file with GutHub admonitions.

`@it-service-npm/remark-gfm-admonition`
extends Remark’s functionality,
enabling it to read directives from source file
and to write GitHub admonitions to Markdown files.

Source files:

directives.md:

```markdown file=./fixtures/directives.md
# markdown file with GitHub admonitions and other directives

Text before.

:::note
Note example from directive.
:::

:::tip
Tip example from directive.
:::

:::warning
Warning example from directive.
:::

:::info
Info example from directive.
:::

:::danger
Danger example from directive.
:::

Text after.

```

unknown-directives.md:

```markdown file=./fixtures/unknown-directives.md
# markdown file with GitHub admonitions and other directives

Text before.

:::new-directive
Unknown directive example.
:::

Text after.

```

Remark output:

```markdown file=./snapshots/directives.md
# markdown file with GitHub admonitions and other directives

Text before.

> [!NOTE]
> Note example from directive.

> [!TIP]
> Tip example from directive.

> [!WARNING]
> Warning example from directive.

> [!IMPORTANT]
> Info example from directive.

> [!CAUTION]
> Danger example from directive.

Text after.

```

```markdown file=./snapshots/unknown-directives.md
# markdown file with GitHub admonitions and other directives

Text before.

:::new-directive
Unknown directive example.
:::

Text after.

```
