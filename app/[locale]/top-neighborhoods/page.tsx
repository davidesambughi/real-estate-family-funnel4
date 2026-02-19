import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { NeighborhoodsList } from "@/components/NeighborhoodsList";
import { JsonLd } from "@/components/JsonLd";
import { neighborhoodsData } from "@/lib/neighborhoods-data";
import { getTranslations } from "next-intl/server";

interface PageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata" });
    void t;
    return {
        title: "Best Family-Friendly Neighborhoods Portugal 2026 — Lisbon, Cascais, Sintra | TrustFamily",
        description:
            "Find the best family-friendly neighborhoods in Portugal for expats. Compare Cascais, Sintra, Parque das Nações, Campo de Ourique and more — safety, schools, vibe, and commutes.",
        alternates: {
            languages: {
                en: `/en/family-friendly-neighborhoods-portugal`,
                pt: `/pt/bairros-familiares-portugal`,
                de: `/de/familienfreundliche-nachbarschaften-portugal`,
                fr: `/fr/quartiers-familiaux-portugal`,
                nl: `/nl/gezinsvriendelijke-buurten-portugal`,
                es: `/es/barrios-familiares-portugal`,
            },
        },
    };
}

export default function Page() {
    // ── JSON-LD: ItemList ─────────────────────────────────────────────────────
    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Best Family-Friendly Neighborhoods in Portugal 2026",
        "description":
            "Curated list of the top neighborhoods in Portugal for expat families, comparing commutes, safety, amenities, and school proximity.",
        "url": "https://trustfamily.com/en/family-friendly-neighborhoods-portugal",
        "numberOfItems": neighborhoodsData.length,
        "itemListElement": neighborhoodsData.map((n, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
                "@type": "Place",
                "name": n.name,
                "description": n.description,
                "url": `https://trustfamily.com/en/neighborhoods/${n.slug}`,
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": n.name,
                    "addressRegion": n.location,
                    "addressCountry": "PT",
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": n.coordinates.lat,
                    "longitude": n.coordinates.lng,
                },
            },
        })),
    };

    // ── JSON-LD: FAQPage (GEO bait) ───────────────────────────────────────────
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Where do expat families live in Lisbon?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                        "Cascais is the most popular choice for expat families in the Lisbon area, followed by Estoril and Sintra. Within Lisbon itself, Campo de Ourique and Parque das Nações are top picks for their safety, walkability, and access to international schools.",
                },
            },
            {
                "@type": "Question",
                "name": "What is the best neighborhood for families near St. Julian's School?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                        "Cascais and Estoril are the closest neighborhoods to St. Julian's School in Carcavelos — just 15–20 minutes by car. Both offer Atlantic beaches, a large international expat community, and a direct train line to Lisbon.",
                },
            },
            {
                "@type": "Question",
                "name": "Is Cascais a good place to live for families?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                        "Yes. Cascais is consistently rated the top expat family destination in Portugal. It offers excellent international schools (St. Julian's is nearby), beaches, a safe walkable centre, and a 30-minute train to Lisbon. The international community is one of the largest in the country.",
                },
            },
            {
                "@type": "Question",
                "name": "How far is Sintra from international schools?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                        "Sintra is home to both TASIS Portugal (10 minutes by car) and Carlucci American International School — CAISL (15 minutes). Families living in Sintra have walking distance access to two of Portugal's top international schools.",
                },
            },
        ],
    };

    return (
        <div className="container mx-auto py-12 px-6">
            <JsonLd data={itemListSchema} />
            <JsonLd data={faqSchema} />

            <Breadcrumbs />

            <h1 className="text-4xl font-bold mb-4">
                Best Family-Friendly Neighborhoods in Portugal 2026
            </h1>
            <p className="text-lg text-slate-600 mb-4 max-w-3xl">
                Discover where expat families with children actually choose to live in Portugal.
                We compare safety, international community, commute times to top schools,
                and overall family lifestyle — based on <strong>real family data</strong>.
            </p>
            <p className="text-sm text-slate-400 mb-12 max-w-3xl">
                Last updated: February 2026 · {neighborhoodsData.length} neighborhoods reviewed
            </p>

            <section className="mb-16">
                <NeighborhoodsList />
            </section>

            {/* FAQ Section — mirrors FAQPage schema */}
            <section className="mb-16 bg-slate-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    {[
                        {
                            q: "Where do expat families live in Lisbon?",
                            a: "Cascais leads for coastal families, followed by Estoril and Sintra. Within the city: Campo de Ourique (walkable, community feel) and Parque das Nações (modern, riverfront) are top picks.",
                        },
                        {
                            q: "What neighborhood is closest to St. Julian's School?",
                            a: "Cascais (15 min) and Estoril (20 min) are the closest. Both are on the same train line and share the Atlantic coastline.",
                        },
                        {
                            q: "Is Sintra good for families with international school-age children?",
                            a: "Yes — TASIS Portugal and CAISL are both within 15 minutes. The trade-off is distance to Lisbon (45 min by train) and a cooler, hillier climate.",
                        },
                    ].map(({ q, a }) => (
                        <div key={q} className="border-b border-slate-200 pb-5 last:border-0 last:pb-0">
                            <h3 className="font-semibold text-slate-900 mb-2">{q}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-4">
                <h2 className="text-2xl font-bold mb-6">Nearby International Schools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { title: "Top Schools near Lisbon", desc: "IB, British and American curriculum options in the greater Lisbon area." },
                        { title: "Schools in Cascais & Sintra", desc: "The best education options on the coast and in the hills." },
                    ].map(({ title, desc }) => (
                        <Link href="/best-private-and-public-international-schools-portugal-2026" key={title}>
                            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                                <CardHeader>
                                    <CardTitle className="text-base">{title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{desc}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
