# Support all GutHub admonition types

Remark writes broken markdown file with GutHub admonitions.

`@it-service-npm/micromark-extension-gfm-admonition`
extends micromark functionality,
enabling it to read from source file
and to write GitHub admonitions to HTML files.

Source files:

```markdown file=./fixtures/basic.md
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

```markdown file=./fixtures/types.md
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

```html file=./snapshots/basic.html
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

```html file=./snapshots/types.html
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
