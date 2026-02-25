import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { CheckCircle2, Clock, Target, Wallet, Palmtree, GraduationCap, Calendar } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{ locale: string }>;
}

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://trustfamily.com';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "SchoolFinderPage" });
    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
        alternates: {
            canonical: `${BASE}/en/school-finder`,
            languages: {
                'en': `${BASE}/en/school-finder`,
                'pt': `${BASE}/pt/encontrar-escola`,
                'de': `${BASE}/de/schulfinder`,
                'fr': `${BASE}/fr/trouver-ecole`,
                'nl': `${BASE}/nl/school-zoeker`,
                'es': `${BASE}/es/buscador-escuelas`,
                'x-default': `${BASE}/en/school-finder`,
            },
        },
        openGraph: {
            title: t("metaTitle"),
            description: t("metaDescription"),
            url: `${BASE}/en/school-finder`,
            siteName: "TrustFamily",
            type: "website",
            images: [{ url: `${BASE}/opengraph-image`, width: 1200, height: 630, alt: 'TrustFamily — International Schools & Neighborhoods in Portugal' }],
        },
        twitter: {
            card: "summary_large_image",
            title: t("metaTitle"),
            description: t("metaDescription"),
        },
    };
}

// Content is static — translated labels baked at build time per locale
export const revalidate = false;

const steps = [
    {
        icon: Wallet,
        label: "Your budget",
        desc: "Annual school fees from €12,000 to €32,000+ — we match you to realistic options.",
    },
    {
        icon: Palmtree,
        label: "Your lifestyle",
        desc: "Coastal, city, or nature — Portugal has the right neighborhood for each family.",
    },
    {
        icon: GraduationCap,
        label: "Curriculum preference",
        desc: "British IGCSE, American AP, or IB Diploma — we explain the difference clearly.",
    },
    {
        icon: Calendar,
        label: "Your timeline",
        desc: "Moving in 3 months or just exploring — we calibrate the urgency of your results.",
    },
];

export default function SchoolFinderPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How do I choose an international school in Portugal?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                        "Start by aligning curriculum with your long-term plan (British, American, or IB), then filter by budget and location. TrustFamily's free School Finder quiz matches your family to the right school in under 60 seconds, based on 4 key questions.",
                },
            },
            {
                "@type": "Question",
                "name": "Which international school in Portugal is easiest to get into?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                        "United Lisbon International School has the most accessible admissions (acceptance rate ~45%), followed by CAISL (~35%). St. Julian's School is the most competitive at ~8% acceptance rate.",
                },
            },
        ],
    };

    return (
        <div className="container mx-auto py-20 px-6 max-w-4xl">
            <JsonLd data={faqSchema} />
            <Breadcrumbs />

            {/* Header */}
            <div className="text-center mb-16">
                <p className="section-overline mb-4 text-brand">Free · 60 seconds</p>
                <h1 className="section-heading mb-6">
                    Find Your Perfect School in Portugal
                </h1>
                <p className="section-body max-w-2xl mx-auto">
                    Answer 4 questions about your budget, lifestyle, curriculum preference, and timeline.
                    We match you with the right school <em>and</em> the right neighborhood — together.
                </p>
            </div>

            {/* How it works */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                {steps.map((step) => (
                    <div key={step.label} className="flex items-start gap-5 p-6 bg-card rounded-2xl border border-border shadow-(--shadow-hair) hover:shadow-(--shadow-lift) transition-all duration-300">
                        <div className="bg-warm-light/30 p-2.5 rounded-xl text-warm shrink-0">
                            <step.icon className="h-6 w-6" strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="font-semibold text-ink-primary mb-1 text-h4 leading-tight">{step.label}</p>
                            <p className="text-body-sm text-ink-secondary leading-relaxed">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Trust strip */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16 text-body-sm text-ink-muted">
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-trust" />
                    100% free & independent
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-brand" />
                    60 seconds to complete
                </div>
                <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-warm" />
                    School + neighborhood matched together
                </div>
            </div>

            {/* CTA */}
            <div className="text-center mb-24">
                <Button size="lg" className="shadow-(--shadow-lift)" asChild>
                    <Link href={{ pathname: "/", hash: "quiz" }}>
                        Start the School Finder →
                    </Link>
                </Button>
                <p className="text-caption text-ink-muted mt-4">No sign-up required to see your results</p>
            </div>

            {/* FAQ */}
            <section className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-(--shadow-lift)">
                <h2 className="font-serif font-semibold text-h2 text-ink-primary mb-8">Common Questions</h2>
                <div className="space-y-8">
                    {[
                        {
                            q: "How accurate are the school matches?",
                            a: "Our matching logic is based on 4 weighted criteria: budget, lifestyle, curriculum, and move timeline. The results surface the 2 most compatible schools from our vetted list of 4 top international schools near Lisbon. You should always visit in person before committing.",
                        },
                        {
                            q: "What if none of the schools feel right?",
                            a: "The quiz shows the best fit from our current list. For a deeper, personalised review — including schools outside our current database — contact us directly. We're adding more schools in 2026.",
                        },
                        {
                            q: "Is TrustFamily paid by the schools?",
                            a: "No. TrustFamily accepts no payments, commissions, or referral fees from schools. Our assessments are fully independent. This is non-negotiable for us.",
                        },
                    ].map(({ q, a }) => (
                        <div key={q} className="border-b border-border/50 pb-8 last:border-0 last:pb-0">
                            <h3 className="font-semibold text-ink-primary mb-3 text-h4">{q}</h3>
                            <p className="text-body-sm text-ink-secondary leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
