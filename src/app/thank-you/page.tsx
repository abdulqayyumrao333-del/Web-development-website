import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Thank You",
  description: "Thanks for reaching out.",
  path: "/thank-you",
  noIndex: true,
});

export default function ThankYouPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-semibold">Thanks — message received</h1>
      <p className="mt-3 text-text-secondary">I&apos;ll get back to you as soon as possible.</p>
      <Link href="/" className="mt-6 rounded-sm bg-accent-indigo px-4 py-2 text-white hover:shadow-glow">
        Back to homepage
      </Link>
    </div>
  );
}
