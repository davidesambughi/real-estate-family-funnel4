import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { schoolsData } from "@/lib/schools-data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, MapPin, GraduationCap, Coins } from "lucide-react";
import { SchoolMap } from "@/components/features/SchoolMap";

interface PageProps {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug, locale } = await params;
    const school = schoolsData.find((s) => s.slug === slug);
    const t = await getTranslations({ locale, namespace: "Metadata" });

    if (!school) return { title: t("title") };

    return {
        title: `${school.name} — International School Portugal | TrustFamily`,
        description: `${school.description} Curriculum: ${school.curriculum}. Annual fees: ${school.fees}. Location: ${school.location}.`,
        alternates: {
            languages: {
                en: `/en/school/${school.slug}`,
                pt: `/pt/escola/${school.slug}`,
                de: `/de/schule/${school.slug}`,
                fr: `/fr/ecole/${school.slug}`,
                nl: `/nl/school/${school.slug}`,
                es: `/es/escuela/${school.slug}`,
            },
        },
    };
}

// Generate static params for all schools
export function generateStaticParams() {
    return schoolsData.map((school) => ({
        slug: school.slug,
    }));
}

export default async function SchoolDetailPage(props: PageProps) {
    const params = await props.params;
    const school = schoolsData.find((s) => s.slug === params.slug);

    if (!school) {
        notFound();
    }

    const schoolSchema = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": school.name,
        "description": school.description,
        "url": `${process.env.NEXT_PUBLIC_BASE_URL || "https://trustfamily.com"}/school/${school.slug}`,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": school.location,
            "addressCountry": "PT",
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": school.coordinates.lat,
            "longitude": school.coordinates.lng,
        },
        ...(school.acceptanceRate && { "numberOfCredits": school.acceptanceRate }),
        ...(school.inspectionDate && { "foundingDate": school.inspectionDate }),
    };

    return (
        <div className="container mx-auto py-12 px-6">
            <JsonLd data={schoolSchema} />
            <Breadcrumbs />

            <div className="flex flex-col md:flex-row gap-8 justify-between items-start mb-8">
                <div>
                    <h1 className="font-serif font-semibold text-4xl text-ink-primary mb-2">{school.name}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-5 w-5" />
                        <span className="text-lg">{school.location}</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button size="lg">Contact School Advisor</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="prose max-w-none">
                        <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-4">About the School</h2>
                        <p className="text-lg leading-relaxed text-muted-foreground">{school.description}</p>
                    </section>

                    {/* THE VERDICT */}
                    <section className="rounded-xl bg-brand-50 border border-border px-6 py-5">
                        <div className="flex items-center gap-2 mb-2">
                            <p className="section-overline">The Verdict</p>
                        </div>
                        <p className="text-blue-900 font-medium leading-snug">{school.verdict}</p>
                    </section>

                    {/* PARENT WHISPER */}
                    <section className="rounded-xl bg-slate-50 border border-slate-100 px-6 py-5">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-slate-400">💬</span>
                            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Parent Whisper</h2>
                        </div>
                        <p className="text-slate-600 italic leading-snug">{school.parentWhisper}</p>
                    </section>

                    <section>
                        <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-4">Key Highlights</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {school.highlights.map((highlight: string, index: number) => (
                                <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                                    <Check className="h-5 w-5 text-green-600" />
                                    <span className="font-medium">{highlight}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>School Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                                    <GraduationCap className="h-4 w-4" />
                                    <span className="text-sm font-medium">Curriculum</span>
                                </div>
                                <p className="font-medium">{school.curriculum}</p>
                            </div>
                            <div className="border-t pt-4">
                                <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                                    <Coins className="h-4 w-4" />
                                    <span className="text-sm font-medium">Annual Fees</span>
                                </div>
                                <p className="font-medium">{school.fees}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-blue-50 border-blue-100">
                        <CardHeader>
                            <CardTitle className="text-blue-900">Neighborhood Match</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-blue-800 mb-4">
                                Looking for a home near {school.name}? Check out our guide to {school.neighborhoodSlug}.
                            </p>
                            <Button variant="outline" className="w-full bg-white text-blue-900 border-blue-200 hover:bg-blue-100" asChild>
                                <Link href={{ pathname: '/neighborhoods/[slug]', params: { slug: school.neighborhoodSlug } }}>
                                    Explore {school.neighborhoodSlug}
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Location Map stub */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">School Location</h3>
                        <SchoolMap
                            schoolName={school.name}
                            location={school.location}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
