"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface MapLocation {
  id: string;
  label: string;
  type: "CLIENT" | "COLLABORATION" | "MILESTONE";
  latitude: number;
  longitude: number;
  description: string | null;
  linkUrl: string | null;
  order: number;
}

interface EditPageProps {
  params: {
    id: string;
  };
}

export default function EditMapLocationPage({ params }: EditPageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [location, setLocation] = useState<MapLocation | null>(null);

  useEffect(() => {
    fetchLocation();
  }, [params.id]);

  async function fetchLocation() {
    try {
      const res = await fetch(`/api/map-locations/${params.id}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setLocation(data);
    } catch (error) {
      toast.error("Failed to load location");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!location) return;

    setSubmitting(true);

    try {
      const res = await fetch(`/api/map-locations/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(location),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to update");
      }

      toast.success("Location updated successfully!");
      router.push("/admin/map-locations");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-accent-indigo" />
      </div>
    );
  }

  if (!location) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Location not found</p>
        <Link href="/admin/map-locations">
          <button className="mt-4 text-accent-indigo hover:underline">Back to Locations</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex items-center gap-4">
        <Link href="/admin/map-locations">
          <button className="inline-flex items-center gap-2 rounded-lg border border-accent-indigo/10 bg-bg-surface-1/50 px-3 py-2 text-sm text-text-secondary hover:text-accent-indigo hover:border-accent-indigo/30 transition-all duration-300">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            Back
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Edit Location</h1>
          <p className="text-sm text-muted-foreground">Update map location details</p>
        </div>
      </div>

      {/* ── Form ── */}
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        {/* Label */}
        <div>
          <label className="text-sm font-medium block mb-1.5">Label *</label>
          <input
            type="text"
            value={location.label}
            onChange={(e) => setLocation({ ...location, label: e.target.value })}
            className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
            required
          />
        </div>

        {/* Type */}
        <div>
          <label className="text-sm font-medium block mb-1.5">Type *</label>
          <select
            value={location.type}
            onChange={(e) => setLocation({ ...location, type: e.target.value as any })}
            className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
          >
            <option value="CLIENT">Client</option>
            <option value="COLLABORATION">Collaboration</option>
            <option value="MILESTONE">Milestone</option>
          </select>
        </div>

        {/* Coordinates */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium block mb-1.5">Latitude *</label>
            <input
              type="number"
              step="0.000001"
              value={location.latitude}
              onChange={(e) => setLocation({ ...location, latitude: parseFloat(e.target.value) })}
              className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1.5">Longitude *</label>
            <input
              type="number"
              step="0.000001"
              value={location.longitude}
              onChange={(e) => setLocation({ ...location, longitude: parseFloat(e.target.value) })}
              className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium block mb-1.5">Description (optional)</label>
          <textarea
            value={location.description || ""}
            onChange={(e) => setLocation({ ...location, description: e.target.value })}
            rows={3}
            className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
          />
        </div>

        {/* Link URL */}
        <div>
          <label className="text-sm font-medium block mb-1.5">Link URL (optional)</label>
          <input
            type="url"
            value={location.linkUrl || ""}
            onChange={(e) => setLocation({ ...location, linkUrl: e.target.value })}
            placeholder="https://..."
            className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
          />
        </div>

        {/* Order */}
        <div>
          <label className="text-sm font-medium block mb-1.5">Order</label>
          <input
            type="number"
            value={location.order}
            onChange={(e) => setLocation({ ...location, order: parseInt(e.target.value) })}
            className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
          />
        </div>

        {/* Submit */}
        <div className="flex gap-3 pt-4 border-t border-accent-indigo/8">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl bg-accent-indigo hover:bg-accent-indigo/90 text-white font-medium text-sm px-6 py-2.5 shadow-md shadow-accent-indigo/20 hover:shadow-lg hover:shadow-accent-indigo/30 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Saving..." : "Save Changes"}
          </button>
          <Link href="/admin/map-locations">
            <button type="button" className="rounded-xl border border-accent-indigo/15 bg-bg-surface-1/50 px-6 py-2.5 text-sm hover:bg-accent-indigo/[0.03]">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}