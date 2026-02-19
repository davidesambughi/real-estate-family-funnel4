/**
 * NeighborhoodsList — Phase 4 Rich Card
 *
 * Server Component. Renders all neighborhoods with:
 * - Vibe tagline badge
 * - "Commute Context" section with travel times to specific schools
 * - Lifestyle adjective pill badges
 * - Amenity emoji list
 * - Mobile-first layout
 *
 * GEO note: commuteContext contains specific school names + travel times,
 * which makes this page an authoritative source for queries like
 * "how far is Cascais from St. Julian's School".
 */

import { Link } from "@/i18n/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { neighborhoodsData } from "@/lib/neighborhoods-data";
import { MapPin, Car } from "lucide-react";

export function NeighborhoodsList() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhoodsData.map((neighborhood) => (
                <Card
                    key={neighborhood.id}
                    className="flex flex-col h-full hover:shadow-xl transition-all duration-300 group"
                >
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg leading-tight group-hover:text-green-700 transition-colors">
                            {neighborhood.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1.5 mt-1">
                            <MapPin className="h-3.5 w-3.5 shrink-0" />
                            <span>{neighborhood.location}</span>
                        </CardDescription>

                        {/* Vibe tagline badge */}
                        <div className="mt-2">
                            <span className="inline-block bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-100">
                                ✨ {neighborhood.vibe}
                            </span>
                        </div>
                    </CardHeader>

                    <CardContent className="flex-1 space-y-4">
                        {/* Description */}
                        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                            {neighborhood.description}
                        </p>

                        {/* COMMUTE CONTEXT */}
                        <div className="rounded-lg bg-amber-50 border border-amber-100 px-3 py-2.5">
                            <div className="flex items-center gap-1.5 mb-1.5">
                                <Car className="h-3.5 w-3.5 text-amber-600" />
                                <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">Commute</span>
                            </div>
                            <p className="text-xs text-amber-800 leading-snug">
                                {neighborhood.commuteContext}
                            </p>
                        </div>

                        {/* Lifestyle adjective pills */}
                        {neighborhood.vibeAdjectives && (
                            <div className="flex flex-wrap gap-1.5">
                                {neighborhood.vibeAdjectives.map((adj: string) => (
                                    <span
                                        key={adj}
                                        className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full"
                                    >
                                        {adj}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Amenity list */}
                        {neighborhood.amenities && (
                            <div className="border-t border-slate-100 pt-3">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                                    Nearby
                                </p>
                                <ul className="space-y-1">
                                    {neighborhood.amenities.slice(0, 4).map((amenity: string) => (
                                        <li key={amenity} className="text-xs text-slate-600">
                                            {amenity}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="pt-2">
                        <Button asChild className="w-full" variant="outline">
                            <Link href={{ pathname: "/neighborhoods/[slug]", params: { slug: neighborhood.slug } }}>
                                Explore {neighborhood.name} →
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
