/**
 * NeighborhoodMap — Phase 3 Static Stub
 *
 * Displays a styled "map coming soon" card with the neighborhood's
 * name and a Google Maps search link. Will be upgraded to a real
 * embedded Amenity Radar (Mapbox / Google Maps) in Phase 5.
 *
 * Server Component — no "use client".
 */

import { MapPin, ExternalLink, Coffee, School, Trees } from "lucide-react";

interface NeighborhoodMapProps {
    neighborhoodName: string;
    city?: string; // e.g. "Cascais" or "Lisbon"
    googleMapsUrl?: string;
}

const AMENITY_ICONS = [
    { icon: School, label: "Schools" },
    { icon: Coffee, label: "Cafés" },
    { icon: Trees, label: "Parks" },
];

export function NeighborhoodMap({ neighborhoodName, city = "Lisbon", googleMapsUrl }: NeighborhoodMapProps) {
    const mapsUrl =
        googleMapsUrl ??
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(neighborhoodName + " " + city + " Portugal")}`;

    return (
        <div className="rounded-xl border border-slate-200 overflow-hidden">
            {/* Static map placeholder with amenity dots */}
            <div
                aria-label={`Amenity map for ${neighborhoodName}`}
                className="relative h-52 bg-gradient-to-br from-green-100 via-emerald-50 to-slate-100 flex flex-col items-center justify-center gap-3"
            >
                {/* Decorative grid */}
                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: "linear-gradient(#bbf7d0 1px, transparent 1px), linear-gradient(90deg, #bbf7d0 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                    }}
                />
                {/* Center pin */}
                <div className="relative z-10 bg-green-600 rounded-full p-3 shadow-lg">
                    <MapPin className="h-6 w-6 text-white" />
                </div>
                <p className="relative z-10 font-semibold text-slate-700 text-sm">{neighborhoodName}</p>

                {/* Amenity badge strip */}
                <div className="relative z-10 flex gap-2">
                    {AMENITY_ICONS.map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-slate-600 shadow-sm">
                            <Icon className="h-3 w-3 text-green-600" />
                            {label}
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-white flex items-center justify-between">
                <p className="text-sm text-slate-600 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-green-600" />
                    {neighborhoodName}, {city}
                </p>
                <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors flex items-center gap-1"
                >
                    Explore on Maps
                    <ExternalLink className="h-3.5 w-3.5" />
                </a>
            </div>
        </div>
    );
}
