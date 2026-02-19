import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SchoolsList } from "@/components/SchoolsList";
import { JsonLd } from "@/components/JsonLd";
import { schoolsData } from "@/lib/schools-data";
import { getTranslations } from "next-intl/server";

interface PageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata" });
    void t;
    return {
        title: "Best International Schools Portugal 2026 — Top Private & Public | TrustFamily",
        description:
            "Independent guide to the best private and public international schools in Portugal 2026. Compare IB, British, and American curricula, fees, locations, and acceptance rates.",
        alternates: {
            languages: {
                en: `/en/best-private-and-public-international-schools-portugal-2026`,
                pt: `/pt/melhores-escolas-internacionais-privadas-e-publicas-portugal-2026`,
                de: `/de/beste-private-und-offentliche-internationale-schulen-portugal-2026`,
                fr: `/fr/meilleures-ecoles-internationales-privees-et-publiques-portugal-2026`,
                nl: `/nl/beste-prive-en-openbare-internationale-scholen-portugal-2026`,
                es: `/es/mejores-escuelas-internacionales-privadas-y-publicas-portugal-2026`,
            },
        },
    };
}

export default function Page() {
    // ── JSON-LD: ItemList ─────────────────────────────────────────────────────
    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Best International Schools in Portugal 2026",
        "description":
            "Independent ranking of the top private and public international schools in Portugal, comparing IB, British and American curricula.",
        "url": "https://trustfamily.com/en/best-private-and-public-international-schools-portugal-2026",
        "numberOfItems": schoolsData.length,
        "itemListElement": schoolsData.map((school, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
                "@type": "EducationalOrganization",
                "name": school.name,
                "description": school.description,
                "url": `https://trustfamily.com/en/school/${school.slug}`,
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
            },
        })),
    };

    // ── JSON-LD: FAQPage (GEO bait for AI Overviews) ─────────────────────────
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is the best international school in Portugal?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                        "St. Julian's School in Carcavelos (Cascais) is widely considered the best international school in Portugal, offering the British curriculum and IB Diploma with an acceptance rate of just 8%. TASIS Portugal in Sintra and Carlucci American International School (CAISL) are also highly regarded for American curriculum families.",
                },
            },
            {
                "@type": "Question",
                "name": "How much do international schools cost in Portugal?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                        "Annual fees at international schools in Portugal range from approximately €12,000 to €32,000. United Lisbon International School starts at €12,000, while TASIS Portugal can reach €32,000 per year. Most families budget between €15,000 and €25,000 per child per year.",
                },
            },
            {
                "@type": "Question",
                "name": "Which international schools in Portugal offer the IB Diploma?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                        "All four top international schools in Portugal — St. Julian's School, TASIS Portugal, Carlucci American International School (CAISL), and United Lisbon International School — offer the IB Diploma Programme. St. Julian's also offers the full British curriculum (IGCSE).",
                },
            },
            {
                "@type": "Question",
                "name": "What area of Portugal is best for families with children?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                        "Cascais is the top choice for expat families in Portugal — it combines direct access to St. Julian's School with Atlantic beaches, a large international community, and a 30-minute train commute to Lisbon. Sintra is ideal for families whose children attend TASIS Portugal or CAISL.",
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
                Best Private &amp; Public International Schools Portugal 2026
            </h1>
            <p className="text-lg text-slate-600 mb-4 max-w-3xl">
                Independent comparison of the top international schools near Lisbon.
                We review IB, British, and American curricula — with real fees, acceptance rates,
                and editorial verdicts based on <strong>first-hand school visits</strong>.
            </p>
            <p className="text-sm text-slate-400 mb-12 max-w-3xl">
                Last updated: February 2026 · {schoolsData.length} schools reviewed
            </p>

            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-8">Featured International Schools</h2>
                <SchoolsList />
            </section>

            {/* FAQ Section — visible content mirrors FAQPage JSON-LD */}
            <section className="mb-16 bg-slate-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    {[
                        {
                            q: "What is the best international school in Portugal?",
                            a: "St. Julian's School in Carcavelos, Cascais — with an 8% acceptance rate and top IB results — is broadly considered the best. For American curriculum families, CAISL offers the best value with US State Department backing.",
                        },
                        {
                            q: "How much do international schools cost in Portugal?",
                            a: "Annual fees range from €12,000 (United Lisbon) to €32,000 (TASIS Portugal). Most families budget €15,000–25,000 per child. Many schools also charge a one-time registration fee of €1,000–3,000.",
                        },
                        {
                            q: "Which area is best for families near international schools?",
                            a: "Cascais and Estoril for St. Julian's School (coast lifestyle). Sintra for TASIS and CAISL (nature, hills). Parque das Nações for United Lisbon International School (city living).",
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
                <h2 className="text-2xl font-bold mb-6">Related Neighborhoods</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: "Cascais & Estoril", desc: "Coastal living 15 min from St. Julian's School." },
                        { title: "Sintra & Surroundings", desc: "Nature and luxury near TASIS Portugal and CAISL." },
                        { title: "Lisbon City", desc: "Urban convenience for United Lisbon International School." },
                    ].map(({ title, desc }) => (
                        <Link href="/top-neighborhoods" key={title}>
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
