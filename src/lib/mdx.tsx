import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents, mdxRehypePlugins } from "@/lib/mdx-components";

export function CompiledMdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          rehypePlugins: [...mdxRehypePlugins],
        },
      }}
    />
  );
}
