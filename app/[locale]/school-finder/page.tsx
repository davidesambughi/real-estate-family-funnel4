import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { CheckCircle2, Clock, Target } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "School Finder — Find Your Perfect International School in Portugal | TrustFamily",
    description:
        "Answer 4 questions and get matched with the right international school and neighborhood in Portugal. Free, unbiased, based on your budget, curriculum preference, and lifestyle.",
};

const steps = [
    {
        icon: "💰",
        label: "Your budget",
        desc: "Annual school fees from €12,000 to €32,000+ — we match you to realistic options.",
    },
    {
        icon: "🏖️",
        label: "Your lifestyle",
        desc: "Coastal, city, or nature — Portugal has the right neighborhood for each family.",
    },
    {
        icon: "🎓",
        label: "Curriculum preference",
        desc: "British IGCSE, American AP, or IB Diploma — we explain the difference clearly.",
    },
    {
        icon: "📅",
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
        <div className="container mx-auto py-12 px-6 max-w-4xl">
            <JsonLd data={faqSchema} />
            <Breadcrumbs />

            {/* Header */}
            <div className="text-center mb-12">
                <p className="section-overline mb-4">Free · 60 seconds</p>
                <h1 className="font-serif font-semibold text-4xl text-ink-primary mb-4">
                    Find Your Perfect School in Portugal
                </h1>
                <p className="text-lg text-ink-secondary max-w-2xl mx-auto">
                    Answer 4 questions about your budget, lifestyle, curriculum preference, and timeline.
                    We match you with the right school <em>and</em> the right neighborhood — together.
                </p>
            </div>

            {/* How it works */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {steps.map((step) => (
                    <div key={step.label} className="flex items-start gap-4 p-5 bg-surface-subtle rounded-xl border border-border">
                        <span className="text-2xl mt-0.5">{step.icon}</span>
                        <div>
                            <p className="font-semibold text-ink-primary mb-1">{step.label}</p>
                            <p className="text-sm text-ink-muted leading-relaxed">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Trust strip */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 text-sm text-ink-muted">
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
            <div className="text-center mb-16">
                <Button size="lg" className="text-lg px-10 py-6 h-auto shadow-xl shadow-blue-900/10" asChild>
                    <Link href="/#quiz">
                        Start the School Finder →
                    </Link>
                </Button>
                <p className="text-xs text-ink-muted mt-3">No sign-up required to see your results</p>
            </div>

            {/* FAQ */}
            <section className="bg-surface-subtle rounded-2xl p-8">
                <h2 className="font-serif font-semibold text-xl text-ink-primary mb-6">Common Questions</h2>
                <div className="space-y-5">
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
                        <div key={q} className="border-b border-border pb-5 last:border-0 last:pb-0">
                            <h3 className="font-semibold text-ink-primary mb-2">{q}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">{a}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
