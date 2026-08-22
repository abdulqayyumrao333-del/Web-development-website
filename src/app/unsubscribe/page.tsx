import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";

interface UnsubscribePageProps {
  searchParams: Promise<{
    email?: string;
  }>;
}

export default async function UnsubscribePage({ searchParams }: UnsubscribePageProps) {
  const { email } = await searchParams;

  if (!email) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold">Unsubscribe</h1>
        <p className="mt-2 text-text-secondary">No email provided.</p>
        <Link href="/" className="mt-4 text-accent-indigo hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  try {
    await db.subscriber.delete({
      where: { email: email.toLowerCase() },
    });
  } catch {
    // Subscriber not found or already unsubscribed
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="rounded-full bg-emerald-500/10 p-4">
        <span className="text-4xl">✅</span>
      </div>
      <h1 className="mt-4 text-2xl font-bold">Unsubscribed Successfully</h1>
      <p className="mt-2 text-text-secondary">
        You have been removed from the mailing list.
      </p>
      <Link href="/" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent-indigo px-6 py-3 text-white hover:bg-accent-indigo/90">
        Back to Home
      </Link>
    </div>
  );
}