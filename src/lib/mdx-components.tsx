import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { CodeBlock } from "@/components/blog/detail/code-block";
import { Callout } from "@/components/blog/detail/callout";

export const prettyCodeOptions = {
  theme: { dark: "github-dark", light: "github-light" },
  keepBackground: false,
  defaultLang: "plaintext",
  langs: [
    "javascript",
    "js",
    "typescript",
    "ts",
    "jsx",
    "tsx",
    "bash",
    "shell",
    "json",
    "css",
    "html",
    "python",
    "sql",
    "yaml",
    "markdown",
    "md",
    "diff",
    "prisma",
    "plaintext",
  ],
};

// rehype-pretty-code wraps output in <pre><code>...</code></pre> with data
// attributes for line highlighting — CodeBlock adds the copy button and
// reads the theme-aware background from our own design tokens instead.
export const mdxComponents = {
  pre: CodeBlock,
  Note: (props: { children: React.ReactNode }) => <Callout type="note" {...props} />,
  Warning: (props: { children: React.ReactNode }) => <Callout type="warning" {...props} />,
  Tip: (props: { children: React.ReactNode }) => <Callout type="tip" {...props} />,
};

export const mdxRehypePlugins = [
  rehypeSlug,
  [rehypePrettyCode, prettyCodeOptions] as [typeof rehypePrettyCode, typeof prettyCodeOptions],
];