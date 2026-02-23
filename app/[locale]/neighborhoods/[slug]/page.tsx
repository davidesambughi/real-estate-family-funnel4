import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { neighborhoodsData } from "@/lib/neighborhoods-data";
import { schoolsData } from "@/lib/schools-data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Check, GraduationCap, Coins } from "lucide-react";
import { NeighborhoodMap } from "@/components/features/NeighborhoodMap";

interface PageProps {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug, locale } = await params;
    const neighborhood = neighborhoodsData.find((n) => n.slug === slug);
    const t = await getTranslations({ locale, namespace: "Metadata" });

    if (!neighborhood) return { title: t("title") };

    return {
        title: `${neighborhood.name} — Family Friendly Neighborhood Portugal | TrustFamily`,
        description: `${neighborhood.description} Vibe: ${neighborhood.vibe}. ${neighborhood.highlights.join(", ")}.`,
        alternates: {
            languages: {
                en: `/en/neighborhood/${neighborhood.slug}`,
                pt: `/pt/bairro/${neighborhood.slug}`,
                de: `/de/nachbarschaft/${neighborhood.slug}`,
                fr: `/fr/quartier/${neighborhood.slug}`,
                nl: `/nl/buurt/${neighborhood.slug}`,
                es: `/es/barrio/${neighborhood.slug}`,
            },
        },
    };
}

// Generate static params for all neighborhoods
export function generateStaticParams() {
    return neighborhoodsData.map((n) => ({
        slug: n.slug,
    }));
}

export default async function NeighborhoodDetailPage(props: PageProps) {
    const params = await props.params;
    const neighborhood = neighborhoodsData.find((n) => n.slug === params.slug);

    if (!neighborhood) {
        notFound();
    }

    const placeSchema = {
        "@context": "https://schema.org",
        "@type": "Place",
        "name": neighborhood.name,
        "description": neighborhood.description,
        "url": `${process.env.NEXT_PUBLIC_BASE_URL || "https://trustfamily.com"}/neighborhood/${neighborhood.slug}`,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": neighborhood.name,
            "addressRegion": neighborhood.location,
            "addressCountry": "PT",
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": neighborhood.coordinates.lat,
            "longitude": neighborhood.coordinates.lng,
        },
        ...(neighborhood.amenities?.length && {
            "amenityFeature": neighborhood.amenities.map((a: string) => ({
                "@type": "LocationFeatureSpecification",
                "name": a,
                "value": true,
            })),
        }),
    };

    // Find schools in this neighborhood
    const schoolsInArea = schoolsData.filter((s) => s.neighborhoodSlug === neighborhood.slug);

    return (
        <div className="container mx-auto py-12 px-6">
            <JsonLd data={placeSchema} />
            <Breadcrumbs />

            <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-8">
                <Image
                    src="/neighborhoods-img.jpg"
                    alt="Family-friendly neighborhood in Portugal"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
            </div>

            <div className="flex flex-col md:flex-row gap-8 justify-between items-start mb-8">
                <div>
                    <h1 className="text-4xl font-bold mb-2">{neighborhood.name}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-5 w-5" />
                        <span className="text-lg">{neighborhood.location}</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button size="lg">Contact Relocation Expert</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="prose max-w-none">
                        <h2 className="text-2xl font-bold mb-4">About {neighborhood.name}</h2>
                        <p className="text-lg leading-relaxed text-muted-foreground">{neighborhood.description}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Why Families Love It</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {neighborhood.highlights.map((highlight: string, index: number) => (
                                <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                                    <Check className="h-5 w-5 text-green-600" />
                                    <span className="font-medium">{highlight}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* COMMUTE CONTEXT */}
                    {neighborhood.commuteContext && (
                        <section className="rounded-xl bg-amber-50 border border-amber-100 px-6 py-5">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-amber-600">🚗</span>
                                <h2 className="text-sm font-bold text-amber-700 uppercase tracking-wide">Commute Context</h2>
                            </div>
                            <p className="text-amber-800 text-sm leading-snug">{neighborhood.commuteContext}</p>
                        </section>
                    )}

                    {/* VIBE ADJECTIVES + AMENITIES */}
                    {(neighborhood.vibeAdjectives?.length || neighborhood.amenities?.length) && (
                        <section>
                            <h2 className="text-2xl font-bold mb-4">Lifestyle & Amenities</h2>
                            {neighborhood.vibeAdjectives?.length && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {neighborhood.vibeAdjectives.map((adj: string) => (
                                        <span key={adj} className="inline-block bg-slate-100 text-slate-600 text-sm px-3 py-1 rounded-full">{adj}</span>
                                    ))}
                                </div>
                            )}
                            {neighborhood.amenities?.length && (
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {neighborhood.amenities.map((amenity: string) => (
                                        <li key={amenity} className="flex items-center gap-2 text-sm text-slate-700 bg-white border border-slate-100 rounded-lg px-3 py-2">
                                            {amenity}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    )}

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Schools in {neighborhood.name}</h2>
                        {schoolsInArea.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6">
                                {schoolsInArea.map((school) => (
                                    <Card key={school.id} className="hover:shadow-md transition-shadow">
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle>{school.name}</CardTitle>
                                                    <CardDescription className="flex items-center gap-1 mt-1">
                                                        <MapPin className="h-4 w-4" /> {school.location}
                                                    </CardDescription>
                                                </div>
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={{ pathname: '/schools/[slug]', params: { slug: school.slug } }}>View School</Link>
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <GraduationCap className="h-4 w-4" />
                                                    {school.curriculum}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Coins className="h-4 w-4" />
                                                    {school.fees}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground italic">No international schools listed specifically in this neighborhood yet. Check nearby areas.</p>
                        )}
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card className="bg-blue-50 border-blue-100">
                        <CardHeader>
                            <CardTitle className="text-blue-900">Vibe Check</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg font-medium text-blue-800 mb-2">
                                {neighborhood.vibe}
                            </p>
                            <p className="text-sm text-blue-700">
                                Perfect for families looking for a specific lifestyle.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Amenity Radar stub */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Explore the Area</h3>
                        <NeighborhoodMap
                            neighborhoodName={neighborhood.name}
                            city="Lisbon"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
