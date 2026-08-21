"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Plus, Pencil, Trash2, Globe } from "lucide-react";
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

export default function MapLocationsPage() {
  const router = useRouter();
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [loading, setLoading] = useState(true);

  // ── Fetch Locations ──
  useEffect(() => {
    fetchLocations();
  }, []);

  async function fetchLocations() {
    try {
      const res = await fetch("/api/map-locations");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setLocations(data);
    } catch (error) {
      toast.error("Failed to load locations");
    } finally {
      setLoading(false);
    }
  }

  // ── Delete Location ──
  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this location?")) return;

    try {
      const res = await fetch(`/api/map-locations/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      toast.success("Location deleted successfully");
      fetchLocations();
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete location");
    }
  }

  // ── Get Type Color ──
  const getTypeColor = (type: string) => {
    switch (type) {
      case "CLIENT": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "COLLABORATION": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "MILESTONE": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Map Locations</h1>
          <p className="text-muted-foreground">Manage locations shown on the world map</p>
        </div>
        <Link href="/admin/map-locations/new">
          <button className="inline-flex items-center gap-2 rounded-xl bg-accent-indigo px-4 py-2 text-white hover:bg-accent-indigo/90 transition-all duration-300">
            <Plus className="h-4 w-4" />
            Add Location
          </button>
        </Link>
      </div>

      {/* ── Stats ── */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4" />
          {locations.length} locations
        </span>
        <span className="text-border">|</span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          {locations.filter(l => l.type === "CLIENT").length} Clients
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {locations.filter(l => l.type === "COLLABORATION").length} Collaborations
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          {locations.filter(l => l.type === "MILESTONE").length} Milestones
        </span>
      </div>

      {/* ── Empty State ── */}
      {locations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border rounded-xl">
          <Globe className="h-16 w-16 text-muted-foreground/20 mb-4" strokeWidth={1.5} />
          <p className="text-muted-foreground">No locations added yet.</p>
          <p className="text-sm text-muted-foreground/60">Add locations to show on the world map.</p>
          <Link href="/admin/map-locations/new">
            <button className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent-indigo px-4 py-2 text-white hover:bg-accent-indigo/90">
              <Plus className="h-4 w-4" />
              Add Your First Location
            </button>
          </Link>
        </div>
      ) : (
        /* ── Table ── */
        <div className="rounded-md border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left">Label</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Coordinates</th>
                <th className="px-4 py-3 text-left">Order</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((loc) => (
                <tr key={loc.id} className="border-t hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium">{loc.label}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs border ${getTypeColor(loc.type)}`}>
                      {loc.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {loc.latitude.toFixed(4)}, {loc.longitude.toFixed(4)}
                  </td>
                  <td className="px-4 py-3">{loc.order}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/admin/map-locations/${loc.id}`}>
                        <button className="inline-flex items-center gap-1 rounded-lg border border-accent-indigo/10 bg-bg-surface-1/50 px-2.5 py-1 text-xs text-text-secondary hover:text-accent-indigo hover:border-accent-indigo/30 transition-all duration-300">
                          <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(loc.id)}
                        className="inline-flex items-center gap-1 rounded-lg border border-rose-500/10 bg-rose-500/5 px-2.5 py-1 text-xs text-rose-500 hover:bg-rose-500/10 transition-all duration-300"
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                        Delete
                      </button>
                    </div>
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