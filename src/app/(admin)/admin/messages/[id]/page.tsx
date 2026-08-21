"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Mail, 
  User, 
  Calendar, 
  MessageSquare, 
  Tag, 
  Reply,
  Archive,
  Loader2
} from "lucide-react";
import { toast } from "sonner";

interface MessageDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function MessageDetailPage({ params }: MessageDetailPageProps) {
  const router = useRouter();
  const { id } = use(params);
  
  const [message, setMessage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isArchiving, setIsArchiving] = useState(false);

  // ── Fetch Message ──
  useEffect(() => {
    async function fetchMessage() {
      try {
        const response = await fetch(`/api/admin/messages/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Message not found");
          }
          throw new Error("Failed to fetch message");
        }
        
        const data = await response.json();
        setMessage(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load message");
        toast.error(err instanceof Error ? err.message : "Failed to load message");
      } finally {
        setLoading(false);
      }
    }

    fetchMessage();
  }, [id]);

  // ── Mark as Read ──
  useEffect(() => {
    if (message && message.status === "NEW") {
      fetch(`/api/admin/messages/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "READ" }),
      }).catch(() => {});
    }
  }, [message, id]);

  // ── Archive Message ──
  async function handleArchive() {
    setIsArchiving(true);
    try {
      const response = await fetch(`/api/admin/messages/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "ARCHIVED" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to archive message");
      }

      toast.success("Message archived successfully");
      router.push("/admin/messages");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to archive message");
    } finally {
      setIsArchiving(false);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "READ": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "REPLIED": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "ARCHIVED": return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  // ── Loading State ──
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-accent-indigo" />
        <p className="mt-4 text-muted-foreground">Loading message...</p>
      </div>
    );
  }

  // ── Error State ──
  if (error || !message) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-destructive">{error || "Message not found"}</p>
        <Link href="/admin/messages">
          <button className="mt-4 inline-flex items-center gap-2 rounded-lg border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2 text-sm hover:text-accent-indigo transition-colors duration-300">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            Back to Messages
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/messages">
            <button className="inline-flex items-center gap-2 rounded-lg border border-accent-indigo/10 bg-bg-surface-1/50 px-3 py-2 text-sm text-text-secondary hover:text-accent-indigo hover:border-accent-indigo/30 transition-all duration-300">
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
              Back
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Message Details</h1>
            <p className="text-sm text-muted-foreground">View complete message information</p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(message.status)}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${
            message.status === "NEW" ? "bg-yellow-500" : 
            message.status === "READ" ? "bg-blue-500" : 
            message.status === "REPLIED" ? "bg-emerald-500" : "bg-gray-500"
          }`} />
          {message.status}
        </span>
      </div>

      {/* ── Message Card ── */}
      <div className="rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm p-6 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Name */}
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-accent-indigo/40 mt-0.5" strokeWidth={1.75} />
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{message.name}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-accent-indigo/40 mt-0.5" strokeWidth={1.75} />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <a href={`mailto:${message.email}`} className="font-medium text-accent-indigo hover:underline">
                {message.email}
              </a>
            </div>
          </div>

          {/* Subject */}
          <div className="flex items-start gap-3">
            <Tag className="h-5 w-5 text-accent-indigo/40 mt-0.5" strokeWidth={1.75} />
            <div>
              <p className="text-sm text-muted-foreground">Subject</p>
              <p className="font-medium">{message.subject || "No subject"}</p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-accent-indigo/40 mt-0.5" strokeWidth={1.75} />
            <div>
              <p className="text-sm text-muted-foreground">Received</p>
              <p className="font-medium">
                {new Date(message.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Contact Reason */}
          {message.contactReason && (
            <div className="flex items-start gap-3 col-span-2">
              <MessageSquare className="h-5 w-5 text-accent-indigo/40 mt-0.5" strokeWidth={1.75} />
              <div>
                <p className="text-sm text-muted-foreground">Contact Reason</p>
                <p className="font-medium">{message.contactReason}</p>
              </div>
            </div>
          )}

          {/* Project Type */}
          {message.projectType && (
            <div className="flex items-start gap-3 col-span-2">
              <Tag className="h-5 w-5 text-accent-indigo/40 mt-0.5" strokeWidth={1.75} />
              <div>
                <p className="text-sm text-muted-foreground">Project Type</p>
                <p className="font-medium">{message.projectType}</p>
              </div>
            </div>
          )}

          {/* Budget & Timeline */}
          {(message.budgetRange || message.timeline) && (
            <div className="col-span-2 grid gap-4 sm:grid-cols-2">
              {message.budgetRange && (
                <div className="flex items-start gap-3">
                  <span className="text-sm text-muted-foreground">Budget:</span>
                  <span className="font-medium">{message.budgetRange}</span>
                </div>
              )}
              {message.timeline && (
                <div className="flex items-start gap-3">
                  <span className="text-sm text-muted-foreground">Timeline:</span>
                  <span className="font-medium">{message.timeline}</span>
                </div>
              )}
            </div>
          )}

          {/* Company & Country */}
          {(message.company || message.country) && (
            <div className="col-span-2 grid gap-4 sm:grid-cols-2">
              {message.company && (
                <div className="flex items-start gap-3">
                  <span className="text-sm text-muted-foreground">Company:</span>
                  <span className="font-medium">{message.company}</span>
                </div>
              )}
              {message.country && (
                <div className="flex items-start gap-3">
                  <span className="text-sm text-muted-foreground">Country:</span>
                  <span className="font-medium">{message.country}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Message Content ── */}
        <div className="mt-6 pt-6 border-t border-accent-indigo/8">
          <div className="flex items-start gap-3">
            <MessageSquare className="h-5 w-5 text-accent-indigo/40 mt-0.5" strokeWidth={1.75} />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">Message</p>
              <div className="rounded-lg border border-accent-indigo/10 bg-bg-surface-1/50 p-4 whitespace-pre-wrap text-sm leading-relaxed">
                {message.message}
              </div>
            </div>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="mt-6 pt-6 border-t border-accent-indigo/8 flex flex-wrap gap-3">
          <a
            href={`mailto:${message.email}?subject=Re: ${message.subject || 'Your inquiry'}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="inline-flex items-center gap-2 rounded-xl bg-accent-indigo hover:bg-accent-indigo/90 text-white font-medium text-sm px-5 py-2.5 shadow-md shadow-accent-indigo/20 hover:shadow-lg hover:shadow-accent-indigo/30 transition-all duration-300 hover:-translate-y-0.5">
              <Reply className="h-4 w-4" strokeWidth={1.75} />
              Reply via Email
            </button>
          </a>
          <button
            onClick={handleArchive}
            disabled={isArchiving}
            className="inline-flex items-center gap-2 rounded-xl border border-accent-indigo/15 bg-bg-surface-1/50 hover:bg-accent-indigo/[0.05] text-text-secondary hover:text-accent-indigo font-medium text-sm px-5 py-2.5 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isArchiving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Archive className="h-4 w-4" strokeWidth={1.75} />
            )}
            {isArchiving ? "Archiving..." : "Archive"}
          </button>
        </div>
      </div>
    </div>
  );
}