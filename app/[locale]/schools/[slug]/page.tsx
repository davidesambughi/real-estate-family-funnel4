import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { schoolsData } from "@/lib/schools-data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, MapPin, GraduationCap, Coins, Quote, Sparkles } from "lucide-react";

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

    const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://trustfamily.com';
    const title = `${school.name} — International School Portugal | TrustFamily`;
    const description = `${school.description} Curriculum: ${school.curriculum}. Annual fees: ${school.fees}. Location: ${school.location}.`;
    const schoolPaths = routing.pathnames['/schools/[slug]'] as Record<string, string>;
    const canonical = `${base}/en${schoolPaths.en.replace('[slug]', school.slug)}`;
    const languages = Object.fromEntries(
        (routing.locales as readonly string[]).map(loc => [
            loc,
            `${base}/${loc}${schoolPaths[loc].replace('[slug]', school.slug)}`,
        ])
    ) as Record<string, string>;
    languages['x-default'] = canonical;
    return {
        title,
        description,
        alternates: { canonical, languages },
        openGraph: {
            title,
            description,
            url: canonical,
            siteName: "TrustFamily",
            type: "website",
            images: [{ url: `${base}/opengraph-image`, width: 1200, height: 630, alt: 'TrustFamily — International Schools & Neighborhoods in Portugal' }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

// ISR: regenerate every 24 h so school data stays fresh without full rebuilds
export const revalidate = 86400;

// Generate static params for all schools
export function generateStaticParams() {
    return schoolsData.map((school) => ({
        slug: school.slug,
    }));
}

export default async function SchoolDetailPage(props: PageProps) {
    const { slug, locale } = await props.params;
    const school = schoolsData.find((s) => s.slug === slug);

    if (!school) {
        notFound();
    }

    const t = await getTranslations({ locale, namespace: "SchoolDetail" });

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
        ...(school.acceptanceRate && {
            "additionalProperty": {
                "@type": "PropertyValue",
                "name": "acceptanceRate",
                "value": school.acceptanceRate,
            }
        }),
        ...(school.inspectionDate && { "dateModified": school.inspectionDate }),
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://trustfamily.com'}/en` },
            { "@type": "ListItem", "position": 2, "name": "International Schools", "item": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://trustfamily.com'}/en/schools` },
            { "@type": "ListItem", "position": 3, "name": school.name, "item": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://trustfamily.com'}/en/school/${school.slug}` },
        ],
    };

    return (
        <div className="container mx-auto py-12 px-6">
            <JsonLd data={schoolSchema} />
            <JsonLd data={breadcrumbSchema} />
            <Breadcrumbs />

            <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-8">
                <Image
                    src="/schools-img.jpg"
                    alt="International school campus in Portugal"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
            </div>

            <div className="flex flex-col md:flex-row gap-8 justify-between items-start mb-8">
                <div>
                    <h1 className="font-serif font-semibold text-4xl text-ink-primary mb-2">{school.name}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-5 w-5" />
                        <span className="text-lg">{school.location}</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button size="lg">{t("contactBtn")}</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="prose max-w-none">
                        <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-4">{t("aboutHeading")}</h2>
                        <p className="text-lg leading-relaxed text-muted-foreground">{school.description}</p>
                    </section>

                    {/* THE VERDICT */}
                    <section className="rounded-xl bg-warm-light/30 border border-warm/20 px-6 py-5 shadow-(--shadow-hair)">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="bg-warm-light/50 p-1.5 rounded-lg text-warm shadow-(--shadow-hair)">
                                <Sparkles className="h-4 w-4" />
                            </div>
                            <p className="text-xs font-bold text-warm uppercase tracking-wider">{t("verdictLabel")}</p>
                        </div>
                        <p className="text-ink-primary font-medium leading-relaxed">{school.verdict}</p>
                    </section>

                    {/* PARENT WHISPER */}
                    <section className="rounded-xl bg-surface-subtle border border-border px-6 py-5">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="bg-white p-1.5 rounded-lg text-ink-muted shadow-(--shadow-hair) border border-border">
                                <Quote className="h-4 w-4" />
                            </div>
                            <h2 className="text-xs font-bold text-ink-muted uppercase tracking-wider">{t("parentWhisperLabel")}</h2>
                        </div>
                        <p className="text-ink-secondary italic leading-relaxed">{school.parentWhisper}</p>
                    </section>

                    <section>
                        <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-4">{t("keyHighlightsHeading")}</h2>
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
                            <CardTitle>{t("detailsCardTitle")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                                    <GraduationCap className="h-4 w-4" />
                                    <span className="text-sm font-medium">{t("curriculumLabel")}</span>
                                </div>
                                <p className="font-medium">{school.curriculum}</p>
                            </div>
                            <div className="border-t pt-4">
                                <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                                    <Coins className="h-4 w-4" />
                                    <span className="text-sm font-medium">{t("annualFeesLabel")}</span>
                                </div>
                                <p className="font-medium">{school.fees}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-blue-50 border-blue-100">
                        <CardHeader>
                            <CardTitle className="text-blue-900">{t("neighborhoodMatchTitle")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-blue-800 mb-4">
                                {t("neighborhoodMatchText", { schoolName: school.name, neighborhood: school.neighborhoodSlug })}
                            </p>
                            <Button variant="outline" className="w-full bg-white text-blue-900 border-blue-200 hover:bg-blue-100" asChild>
                                <Link href={{ pathname: '/neighborhoods/[slug]', params: { slug: school.neighborhoodSlug } }}>
                                    {t("neighborhoodExploreBtn", { neighborhood: school.neighborhoodSlug })}
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Location Map stub */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">{t("locationHeading")}</h3>
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
