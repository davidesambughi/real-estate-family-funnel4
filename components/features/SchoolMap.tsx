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
        <div className="rounded-xl border border-slate-200 overflow-hidden">
            {/* Static map placeholder */}
            <div
                aria-label={`Map showing location of ${schoolName}`}
                className="relative h-48 bg-gradient-to-br from-blue-100 via-blue-50 to-slate-100 flex flex-col items-center justify-center gap-2"
            >
                {/* Decorative grid */}
                <div className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />
                {/* Map pin */}
                <div className="relative z-10 bg-blue-600 rounded-full p-3 shadow-lg animate-bounce">
                    <MapPin className="h-6 w-6 text-white" />
                </div>
                <p className="relative z-10 font-semibold text-slate-700 text-sm">{location}</p>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-white flex items-center justify-between">
                <p className="text-sm text-slate-600 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-blue-600" />
                    {location}, Portugal
                </p>
                <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
                >
                    Open in Maps
                    <ExternalLink className="h-3.5 w-3.5" />
                </a>
            </div>
        </div>
    );
}
