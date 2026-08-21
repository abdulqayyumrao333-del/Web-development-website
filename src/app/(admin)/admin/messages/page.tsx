import type { Metadata } from "next";
import { db } from "@/lib/db";
import { requireAdmin } from "@/app/(admin)/admin/blogs/actions";
import { Eye, Mail, Archive } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Messages | Admin",
  description: "View contact form messages",
};

export default async function MessagesPage() {
  await requireAdmin();

  const messages = await db.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">View and manage contact form submissions</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-yellow-500" />
            {messages.filter(m => m.status === "NEW").length} New
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            {messages.filter(m => m.status === "READ").length} Read
          </span>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg">
          <Mail className="h-12 w-12 text-muted-foreground/30 mb-4" strokeWidth={1.5} />
          <p className="text-muted-foreground">No messages yet.</p>
          <p className="text-sm text-muted-foreground/60">Messages from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Subject</th>
                <th className="px-4 py-3 text-left max-w-[200px]">Message</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className="border-t hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium">{msg.name}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${msg.email}`} className="text-accent-indigo hover:underline">
                      {msg.email}
                    </a>
                  </td>
                  <td className="px-4 py-3">{msg.subject || "—"}</td>
                  <td className="px-4 py-3 max-w-[200px]">
                    <p className="truncate text-muted-foreground">
                      {msg.message ? msg.message.slice(0, 60) + (msg.message.length > 60 ? "..." : "") : "—"}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${
                      msg.status === "NEW" 
                        ? "bg-yellow-500/10 text-yellow-500" 
                        : msg.status === "READ"
                        ? "bg-blue-500/10 text-blue-500"
                        : "bg-gray-500/10 text-gray-500"
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        msg.status === "NEW" ? "bg-yellow-500" : 
                        msg.status === "READ" ? "bg-blue-500" : "bg-gray-500"
                      }`} />
                      {msg.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link href={`/admin/messages/${msg.id}`}>
                      <button className="inline-flex items-center gap-1 rounded-lg border border-accent-indigo/10 bg-bg-surface-1/50 px-2.5 py-1 text-xs text-text-secondary hover:text-accent-indigo hover:border-accent-indigo/30 transition-all duration-300">
                        <Eye className="h-3.5 w-3.5" strokeWidth={1.75} />
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}