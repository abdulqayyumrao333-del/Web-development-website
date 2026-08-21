"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Globe } from "lucide-react";

// ── Lazy load Leaflet (no SSR issues) ──
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

// ── CSS for Leaflet ──
import "leaflet/dist/leaflet.css";

// ── Fix Leaflet default icon issue ──
const fixLeafletIcon = () => {
  if (typeof window === "undefined") return;
  
  try {
    // Wait for L to be available
    const L = require("leaflet");
    if (!L) return;
    
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    
    // @ts-ignore
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  } catch (error) {
    console.error("Leaflet icon fix error:", error);
  }
};

interface MapLocation {
  id: string;
  label: string;
  type: "CLIENT" | "COLLABORATION" | "MILESTONE";
  latitude: number;
  longitude: number;
  description: string | null;
  linkUrl: string | null;
}

export function WorldMap() {
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // ── Mount Fix ──
  useEffect(() => {
    setIsMounted(true);
    // Small delay to ensure leaflet is loaded
    setTimeout(fixLeafletIcon, 100);
  }, []);

  // ── Fetch Locations ──
  useEffect(() => {
    if (!isMounted) return;
    
    fetch("/api/map-locations")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setLocations(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [isMounted]);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center h-64 rounded-xl border border-accent-indigo/12 bg-bg-surface-1/50">
        <div className="animate-pulse text-text-muted/40">Loading map...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 rounded-xl border border-accent-indigo/12 bg-bg-surface-1/50">
        <div className="animate-pulse text-text-muted/40">Loading map...</div>
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 rounded-xl border border-dashed border-accent-indigo/20 bg-accent-indigo/[0.02]">
        <Globe className="h-10 w-10 text-accent-indigo/30 mb-3" strokeWidth={1.5} />
        <p className="text-sm text-text-muted/60 max-w-sm text-center">
          Project locations, clients, and milestones will appear here on the map as they're added.
        </p>
        <p className="text-xs text-text-muted/40 mt-1">
          Nothing to show yet — add locations via the admin dashboard.
        </p>
      </div>
    );
  }

  const getMarkerColor = (type: string) => {
    switch (type) {
      case "CLIENT": return "text-blue-500";
      case "COLLABORATION": return "text-emerald-500";
      case "MILESTONE": return "text-amber-500";
      default: return "text-accent-indigo";
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-accent-indigo/12 shadow-lg">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="h-80 w-full"
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
            <Popup>
              <div className="text-sm max-w-[200px]">
                <p className="font-semibold text-text-primary">{loc.label}</p>
                {loc.description && (
                  <p className="text-xs text-text-muted/70 mt-1">{loc.description}</p>
                )}
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className={`text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${getMarkerColor(loc.type)} border-current/20 bg-current/5`}>
                    {loc.type}
                  </span>
                  {loc.linkUrl && (
                    <a
                      href={loc.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-accent-indigo hover:underline"
                    >
                      View →
                    </a>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* ── Legend ── */}
      <div className="flex flex-wrap items-center gap-4 px-4 py-2.5 border-t border-accent-indigo/8 bg-bg-surface-1/50 text-xs text-text-muted/60">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <span>Clients</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Collaborations</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span>Milestones</span>
        </div>
        <span className="ml-auto text-[10px] text-text-muted/30">
          {locations.length} location{locations.length !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
}