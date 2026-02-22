/**
 * SchoolMap — Phase 3 Static Stub
 *
 * Displays a styled "map coming soon" card with the school's address
 * and a link to Google Maps. In Phase 5, this will be replaced with
 * a real embedded map (Mapbox or Google Maps Platform).
 *
 * This is a Server Component — no "use client" needed.
 */

import { MapPin, ExternalLink } from "lucide-react";

interface SchoolMapProps {
    schoolName: string;
    location: string; // e.g. "Carcavelos, Cascais"
    googleMapsUrl?: string;
}

export function SchoolMap({ schoolName, location, googleMapsUrl }: SchoolMapProps) {
    const mapsUrl =
        googleMapsUrl ??
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(schoolName + " " + location + " Portugal")}`;

    return (
        <div className="rounded-xl border border-border overflow-hidden">
            {/* Static map placeholder */}
            <div
                aria-label={`Map showing location of ${schoolName}`}
                className="relative h-48 bg-brand-light flex flex-col items-center justify-center gap-2"
            >
                {/* Decorative grid */}
                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: "linear-gradient(var(--brand) 1px, transparent 1px), linear-gradient(90deg, var(--brand) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />
                {/* Map pin */}
                <div className="relative z-10 bg-brand rounded-full p-3 shadow-[var(--shadow-lift)] animate-bounce">
                    <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <p className="relative z-10 font-semibold text-ink-primary text-sm">{location}</p>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-card flex items-center justify-between">
                <p className="text-sm text-ink-secondary flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-brand" />
                    {location}, Portugal
                </p>
                <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-brand hover:text-brand/80 transition-colors flex items-center gap-1"
                >
                    Open in Maps
                    <ExternalLink className="h-3.5 w-3.5" />
                </a>
            </div>
        </div>
    );
}
