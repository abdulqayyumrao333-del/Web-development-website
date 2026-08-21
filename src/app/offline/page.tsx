import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "You're offline", robots: { index: false } };

export default function OfflinePage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-6 text-center">
      <Image src="/icons/aq-icon-dark.svg" alt="" width={48} height={48} className="hidden dark:block" aria-hidden />
      <Image src="/icons/aq-icon-light.svg" alt="" width={48} height={48} className="dark:hidden" aria-hidden />
      <h1 className="mt-6 text-h3 font-semibold">You&apos;re offline</h1>
      <p className="mt-2 text-text-secondary">
        This page hasn&apos;t been cached yet. Reconnect and try again — pages you&apos;ve
        already visited will keep working offline.
      </p>
    </div>
  );
}
