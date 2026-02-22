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
        <div className="rounded-xl border border-border overflow-hidden">
            {/* Static map placeholder with amenity dots */}
            <div
                aria-label={`Amenity map for ${neighborhoodName}`}
                className="relative h-52 bg-trust-light flex flex-col items-center justify-center gap-3"
            >
                {/* Decorative grid */}
                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: "linear-gradient(var(--trust) 1px, transparent 1px), linear-gradient(90deg, var(--trust) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                    }}
                />
                {/* Center pin */}
                <div className="relative z-10 bg-trust rounded-full p-3 shadow-[var(--shadow-lift)]">
                    <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <p className="relative z-10 font-semibold text-ink-primary text-sm">{neighborhoodName}</p>

                {/* Amenity badge strip */}
                <div className="relative z-10 flex gap-2">
                    {AMENITY_ICONS.map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-1 bg-card/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-ink-secondary shadow-[var(--shadow-hair)]">
                            <Icon className="h-3 w-3 text-trust" />
                            {label}
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-card flex items-center justify-between">
                <p className="text-sm text-ink-secondary flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-trust" />
                    {neighborhoodName}, {city}
                </p>
                <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-trust hover:text-trust/80 transition-colors flex items-center gap-1"
                >
                    Explore on Maps
                    <ExternalLink className="h-3.5 w-3.5" />
                </a>
            </div>
        </div>
    );
}
