"use server";

import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { auth } from "@/lib/auth";
import { mdxRehypePlugins } from "@/lib/mdx-components";

export type PreviewActionResult =
  | { success: true; data: MDXRemoteSerializeResult }
  | { success: false; error: string };

/** Compiles raw MDX for the editor's live preview pane. This is a separate
 * compile path from the public site's CompiledMdx (which uses the RSC-only
 * next-mdx-remote/rsc, incompatible with client-side live re-rendering) —
 * but it shares the exact same rehype plugins and MDX component mapping
 * (lib/mdx-components.tsx), so the visual output matches. */
export async function serializeMdxPreview(source: string): Promise<PreviewActionResult> {
  try {
    const session = await auth();
    if (!session?.user) return { success: false, error: "Unauthorized" };

    if (!source.trim()) {
      return { success: false, error: "Nothing to preview yet." };
    }

    const mdxSource = await serialize(source, {
      mdxOptions: { rehypePlugins: [...mdxRehypePlugins] },
    });
    return { success: true, data: mdxSource };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Couldn't render this content.";
    return { success: false, error: message };
  }
}
