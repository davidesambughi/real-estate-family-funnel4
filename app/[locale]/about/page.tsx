import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About TrustFamily — Independent School & Relocation Intelligence for Portugal",
    description:
        "TrustFamily is an independent platform helping affluent international families relocate to Portugal with confidence. We verify schools, neighborhoods, and relocation data — with no paid placements and no conflicts of interest.",
};

const stats = [
    { value: "200+", label: "families guided" },
    { value: "50+", label: "school visits conducted" },
    { value: "4", label: "top schools independently reviewed" },
    { value: "5", label: "neighborhoods mapped in detail" },
];

const principles = [
    {
        title: "Independence is non-negotiable",
        body: "TrustFamily accepts no payments, commissions, or referral fees from schools, real estate agencies, or relocation firms. Every assessment is fully self-funded. This is the only way our data can be trusted.",
    },
    {
        title: "Data before opinion",
        body: "We visit schools in person, interview current families, and verify published fees and acceptance rates before publishing anything. If we can't verify it, we don't publish it.",
    },
    {
        title: "Authority is earned, not claimed",
        body: "We don't call ourselves experts because we have a website. We earn credibility through specificity — acceptance rate data, real commute times, actual all-in fee breakdowns, and the things schools don't advertise.",
    },
    {
        title: "Your data is yours",
        body: "We collect structured intent data to improve our recommendations. We do not sell raw user data to third parties. If we ever introduce paid partnerships, they will be disclosed explicitly and separately from our editorial content.",
    },
];

export default function AboutPage() {
    const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "TrustFamily",
        "description":
            "Independent intelligence platform for international families relocating to Portugal. Provides verified school comparisons, neighborhood guides, and relocation resources.",
        "url": process.env.NEXT_PUBLIC_BASE_URL || "https://trustfamily.com",
        "foundingDate": "2024",
        "areaServed": "PT",
        "knowsAbout": [
            "International schools in Portugal",
            "Family relocation to Portugal",
            "Expat neighborhoods Lisbon",
            "IB British American curriculum comparison",
        ],
    };

    return (
        <main className="container mx-auto py-12 px-6 max-w-4xl">
            <JsonLd data={orgSchema} />
            <Breadcrumbs />

            {/* Hero */}
            <div className="mb-14">
                <h1 className="font-serif font-semibold text-4xl md:text-5xl text-ink-primary mb-5 leading-tight">
                    The trusted guide for families<br className="hidden md:block" /> relocating to Portugal
                </h1>
                <p className="text-lg text-ink-secondary leading-relaxed max-w-3xl">
                    TrustFamily was built on a single premise: relocating families deserve
                    verified, unbiased information — not sponsored content dressed up as advice.
                    We provide independent school and neighborhood intelligence so you can make
                    one of the most important decisions for your children with confidence.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                {stats.map((stat) => (
                    <div key={stat.label} className="text-center bg-surface-subtle rounded-xl p-6 border border-border">
                        <p className="font-serif text-3xl font-semibold text-brand mb-1">{stat.value}</p>
                        <p className="text-sm text-ink-muted">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* What we do */}
            <section className="mb-14">
                <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-5">What TrustFamily does</h2>
                <div className="prose max-w-none text-ink-secondary space-y-4">
                    <p>
                        We research, visit, and verify the top international schools and expat-friendly
                        neighborhoods in Portugal — then publish that information for free. Our coverage
                        currently focuses on the greater Lisbon area, where the concentration of
                        international schools and expat infrastructure is the highest in the country.
                    </p>
                    <p>
                        For each school, we publish real acceptance rates, all-in fee breakdowns
                        (not just headline tuition), curriculum comparisons, and editorial verdicts
                        based on first-hand visits. For each neighborhood, we map commute times to
                        relevant schools, describe the expat community, and assess family lifestyle fit.
                    </p>
                    <p>
                        We also provide a free School Finder quiz that matches families to the right
                        school and neighborhood in under 60 seconds — based on budget, lifestyle
                        preference, curriculum, and move timeline.
                    </p>
                </div>
            </section>

            {/* Principles */}
            <section className="mb-14">
                <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-6">How we operate</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {principles.map((p) => (
                        <div key={p.title} className="bg-surface-subtle border border-border rounded-xl p-6">
                            <h3 className="font-semibold text-ink-primary mb-2">{p.title}</h3>
                            <p className="text-sm text-ink-secondary leading-relaxed">{p.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Who we serve */}
            <section className="mb-14">
                <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-5">Who uses TrustFamily</h2>
                <p className="text-ink-secondary leading-relaxed mb-4">
                    Our primary audience is affluent international families — typically from the UK,
                    USA, Germany, France, the Netherlands, and the UAE — who are considering
                    relocating to Portugal and want to make school and neighborhood decisions based
                    on verified data, not marketing.
                </p>
                <p className="text-ink-secondary leading-relaxed">
                    These are families for whom school quality is the primary filter for where to live,
                    and who are prepared to invest significantly in their children's education.
                    They are experienced enough to be skeptical of generic relocation advice — and
                    demanding enough to expect specificity, honesty, and independence.
                </p>
            </section>

            {/* What we don't do */}
            <section className="mb-14 rounded-2xl bg-brand-50 border border-border p-8">
                <h2 className="font-serif font-semibold text-xl text-ink-primary mb-4">What TrustFamily does not do</h2>
                <ul className="space-y-3 text-ink-secondary text-sm">
                    {[
                        "We do not accept payment from schools, agencies, or any third party in exchange for editorial coverage.",
                        "We do not rank schools based on advertising spend or partnership agreements.",
                        "We do not sell raw user data to schools, real estate agencies, or marketing platforms.",
                        "We do not guarantee school admission — all acceptance rates are historical averages.",
                        "We do not provide legal or visa advice — always consult a licensed immigration lawyer.",
                    ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                            <span className="text-brand mt-0.5 font-bold text-base leading-none">✗</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* CTA */}
            <section className="text-center py-10 border-t border-border">
                <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-3">Ready to find your match?</h2>
                <p className="text-ink-muted mb-6">
                    Start with our School Finder quiz or browse the full school comparison.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button size="lg" asChild>
                        <Link href="/school-finder">Take the School Finder Quiz</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/best-private-and-public-international-schools-portugal-2026">
                            Browse All Schools
                        </Link>
                    </Button>
                </div>
            </section>
        </main>
    );
}
