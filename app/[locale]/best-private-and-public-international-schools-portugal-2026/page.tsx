import Image from "next/image";
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

const sections = [
    { id: "overview", label: "Overview" },
    { id: "curriculum", label: "Curriculum Guide" },
    { id: "fees", label: "Real Cost of Fees" },
    { id: "admissions", label: "Admissions Reality" },
    { id: "methodology", label: "Our Methodology" },
    { id: "schools", label: "School Profiles" },
    { id: "faq", label: "FAQ" },
];

export default function Page() {
    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Best International Schools in Portugal 2026",
        "description": "Independent ranking of the top private and public international schools in Portugal, comparing IB, British and American curricula.",
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
                "address": { "@type": "PostalAddress", "addressLocality": school.location, "addressCountry": "PT" },
                "geo": { "@type": "GeoCoordinates", "latitude": school.coordinates.lat, "longitude": school.coordinates.lng },
            },
        })),
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "What is the best international school in Portugal?", "acceptedAnswer": { "@type": "Answer", "text": "St. Julian's School in Carcavelos (Cascais) is widely considered the best international school in Portugal, offering the British curriculum and IB Diploma with an acceptance rate of just 8%. TASIS Portugal in Sintra and Carlucci American International School (CAISL) are also highly regarded for American curriculum families." } },
            { "@type": "Question", "name": "How much do international schools cost in Portugal?", "acceptedAnswer": { "@type": "Answer", "text": "Annual fees at international schools in Portugal range from approximately €12,000 to €32,000. United Lisbon International School starts at €12,000, while TASIS Portugal can reach €32,000 per year. Most families budget between €15,000 and €25,000 per child per year." } },
            { "@type": "Question", "name": "Which international schools in Portugal offer the IB Diploma?", "acceptedAnswer": { "@type": "Answer", "text": "All four top international schools in Portugal — St. Julian's School, TASIS Portugal, Carlucci American International School (CAISL), and United Lisbon International School — offer the IB Diploma Programme. St. Julian's also offers the full British curriculum (IGCSE)." } },
            { "@type": "Question", "name": "What area of Portugal is best for families with children?", "acceptedAnswer": { "@type": "Answer", "text": "Cascais is the top choice for expat families in Portugal — it combines direct access to St. Julian's School with Atlantic beaches, a large international community, and a 30-minute train commute to Lisbon. Sintra is ideal for families whose children attend TASIS Portugal or CAISL." } },
        ],
    };

    return (
        <main className="container mx-auto py-12 px-6 max-w-4xl">
            <JsonLd data={itemListSchema} />
            <JsonLd data={faqSchema} />
            <Breadcrumbs />

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 text-xs text-ink-muted mb-4">
                    <time dateTime="2026-02-01">Updated February 2026</time>
                    <span>·</span>
                    <span>{schoolsData.length} schools reviewed</span>
                    <span>·</span>
                    <span>TrustFamily Editorial</span>
                </div>
                <h1 className="font-serif font-semibold text-4xl md:text-5xl text-ink-primary mb-5 leading-tight">
                    Best Private &amp; Public International<br className="hidden md:block" /> Schools Portugal 2026
                </h1>
                <p className="text-lg text-ink-secondary leading-relaxed max-w-3xl">
                    An independent comparison of the top international schools near Lisbon.
                    We review IB, British, and American curricula — with real acceptance rates,
                    all-in fee breakdowns, and editorial verdicts based on first-hand school visits.
                    No paid placements. No sponsored rankings.
                </p>
            </div>

            {/* Featured image */}
            <div className="relative w-full aspect-4/3 sm:aspect-video overflow-hidden rounded-xl mb-10">
                <Image
                    src="/schools-img.jpg"
                    alt="International school campus in Portugal — TrustFamily schools guide"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 896px"
                    className="object-cover"
                />
            </div>

            {/* Table of contents */}
            <nav className="bg-surface-subtle border border-border rounded-xl p-6 mb-14">
                <h2 className="section-overline mb-4">In this guide</h2>
                <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sections.map((s, i) => (
                        <li key={s.id}>
                            <a href={`#${s.id}`} className="text-sm text-brand hover:text-(--brand-hover) transition-colors">
                                {i + 1}. {s.label}
                            </a>
                        </li>
                    ))}
                </ol>
            </nav>

            <div className="space-y-16">

                {/* 1. Overview */}
                <section id="overview">
                    <h2 className="article-heading mb-5">1. Overview: Portugal's international school market</h2>
                    <p className="text-ink-secondary leading-relaxed mb-4">
                        Within a 45-minute radius of Lisbon, four internationally accredited schools
                        cover the three major curricula sought by relocating families: British (IGCSE + IB Diploma),
                        American (US graduation pathway + IB Diploma), and pure IB. This concentration is
                        exceptional by European standards — comparable regions in Spain, France, or Germany
                        rarely offer this level of choice within a single commuter zone.
                    </p>
                    <p className="text-ink-secondary leading-relaxed mb-4">
                        The market is not uniform. Acceptance rates range from 8% (St. Julian's School)
                        to 45% (United Lisbon International School). Annual fees span €12,000 to €32,000.
                        The right school for your family depends on curriculum alignment with your long-term
                        plan, genuine lifestyle fit, and a realistic assessment of your application strength.
                    </p>
                    <p className="text-ink-secondary leading-relaxed">
                        This guide walks through each of those dimensions before presenting the school profiles.
                        If you want a direct match based on your specific situation,
                        use our <Link href="/school-finder" className="text-brand hover:underline">60-second School Finder quiz</Link>.
                    </p>
                </section>

                {/* 2. Curriculum */}
                <section id="curriculum">
                    <h2 className="article-heading mb-5">2. Curriculum guide: which track is right for your children</h2>
                    <p className="text-ink-secondary leading-relaxed mb-6">
                        The curriculum decision is the most consequential choice you will make —
                        and the one most families underestimate. It affects university admissions,
                        exam schedules, and how smoothly your children transition if you move again.
                    </p>
                    <div className="space-y-5 mb-6">
                        {[
                            {
                                tag: "British — IGCSE + A-Levels or IB Diploma",
                                tagColor: "bg-blue-100 text-blue-700",
                                school: "St. Julian's School",
                                content: "The British track (IGCSEs at 14–16, then A-Levels or IB at 16–18) is the smoothest path for families who may return to the UK or apply to British universities. IGCSE results are internationally recognised, but A-Levels remain the gold standard for UK admissions. St. Julian's offers both pathways. If UK university admission is the primary goal, the A-Level route outperforms IB at the most selective institutions.",
                            },
                            {
                                tag: "American — US diploma + IB Diploma",
                                tagColor: "bg-red-100 text-red-700",
                                school: "TASIS Portugal · CAISL · United Lisbon",
                                content: "The American track leads to a High School Diploma recognised by US colleges, supplemented by the IB Diploma or AP courses for competitive university applications. CAISL holds US State Department affiliation — a meaningful credential for American families. For families targeting US, Canadian, or Dutch universities, this path is the clearest.",
                            },
                            {
                                tag: "IB Diploma — universally recognised",
                                tagColor: "bg-green-100 text-green-700",
                                school: "All four schools",
                                content: "All four schools on this list offer the IB Diploma Programme at 16–18. The IB is the most portable qualification available — accepted by universities across the UK, USA, Europe, Australia, and Asia without conversion. For families uncertain about their next destination, the IB provides the best hedge. Average global pass rates are around 78%, with top scores requiring genuine academic commitment.",
                            },
                        ].map((item) => (
                            <div key={item.tag} className="border border-slate-200 rounded-xl p-6">
                                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-2 ${item.tagColor}`}>
                                    {item.tag}
                                </span>
                                <p className="text-xs text-ink-muted mb-3">Offered by: {item.school}</p>
                                <p className="text-sm text-ink-secondary leading-relaxed">{item.content}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-warm-light border border-border rounded-xl p-5">
                        <p className="text-sm text-ink-secondary leading-relaxed">
                            <strong>TrustFamily note:</strong> If you're genuinely undecided between British and American tracks,
                            choose a school with a strong IB Diploma programme — all four schools on this list qualify.
                            The IB eliminates the conversion problem if your family moves again.
                        </p>
                    </div>
                </section>

                {/* 3. Fees */}
                <section id="fees">
                    <h2 className="article-heading mb-5">3. The real cost of international school fees</h2>
                    <p className="text-ink-secondary leading-relaxed mb-4">
                        Headline annual tuition is only part of the picture. Based on data from 200+ families,
                        the all-in annual cost of attending an international school in Portugal is typically
                        15–30% higher than the advertised tuition. Here is what the brochures don't highlight.
                    </p>
                    <div className="overflow-x-auto mb-6">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-slate-100 text-slate-700">
                                    <th className="text-left p-3 rounded-tl-lg">School</th>
                                    <th className="text-left p-3">Tuition (annual)</th>
                                    <th className="text-left p-3">Registration fee</th>
                                    <th className="text-left p-3 rounded-tr-lg">All-in estimate</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    { school: "St. Julian's School", tuition: "€16,000–26,000", reg: "€2,000–2,500", allin: "~€20,000–23,000" },
                                    { school: "TASIS Portugal", tuition: "€18,000–32,000", reg: "€2,500–3,000", allin: "~€23,000–30,000" },
                                    { school: "CAISL", tuition: "€14,000–24,000", reg: "€500–1,000", allin: "~€17,000–22,000" },
                                    { school: "United Lisbon", tuition: "€12,000–22,000", reg: "€1,000–1,500", allin: "~€14,000–19,000" },
                                ].map((row) => (
                                    <tr key={row.school} className="bg-white hover:bg-slate-50">
                                        <td className="p-3 font-medium text-slate-800">{row.school}</td>
                                        <td className="p-3 text-slate-600">{row.tuition}</td>
                                        <td className="p-3 text-slate-600">{row.reg}</td>
                                        <td className="p-3 text-slate-700 font-medium">{row.allin}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-ink-secondary leading-relaxed mb-3">
                        <strong>What the all-in estimate includes:</strong> tuition, registration fee (one-time),
                        school transport (if you live more than 5 km from campus), lunch programme,
                        and a standard set of extra-curricular activities. It excludes uniforms (€300–600)
                        and premium activities.
                    </p>
                    <p className="text-ink-secondary leading-relaxed">
                        <strong>Best value:</strong> United Lisbon International School — families in Parque das Nações
                        pay no transport costs and benefit from the lowest tuition range on this list.
                        <strong> Most expensive:</strong> TASIS Portugal — but also the only school here
                        with genuinely boutique class sizes (under 15 per class at most year levels).
                    </p>
                </section>

                {/* 4. Admissions */}
                <section id="admissions">
                    <h2 className="article-heading mb-5">4. The admissions reality</h2>
                    <p className="text-ink-secondary leading-relaxed mb-6">
                        The surge in expat families since 2020 has not been matched by a proportional increase
                        in school capacity. Apply early, apply to multiple schools, and understand the timeline.
                        For September entry, most schools open applications October–December of the preceding year.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {[
                            { school: "St. Julian's School", rate: "8%", wait: "12–18 months", verdict: "Apply immediately regardless of timeline. The waitlist is long and unpredictable." },
                            { school: "TASIS Portugal", rate: "18%", wait: "6–12 months", verdict: "Apply 12 months before intended start. Shadow days conducted for shortlisted applicants." },
                            { school: "CAISL", rate: "35%", wait: "3–6 months", verdict: "More accessible but still competitive at popular year levels. Best value for American families." },
                            { school: "United Lisbon", rate: "45%", wait: "1–3 months", verdict: "The most accessible on this list — but growing fast. Apply early for 2026 intake." },
                        ].map((item) => (
                            <div key={item.school} className="bg-surface-subtle border border-border rounded-xl p-5">
                                <h3 className="font-bold text-slate-900 mb-1">{item.school}</h3>
                                <div className="flex gap-4 text-xs text-slate-500 mb-3">
                                    <span>Acceptance: <strong className="text-slate-700">{item.rate}</strong></span>
                                    <span>Wait: <strong className="text-slate-700">{item.wait}</strong></span>
                                </div>
                                <p className="text-xs text-ink-secondary leading-relaxed">{item.verdict}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-brand-50 border border-border rounded-xl p-5">
                        <h3 className="font-semibold text-blue-900 mb-2">TrustFamily's admissions rule</h3>
                        <p className="text-sm text-blue-800 leading-relaxed">
                            Apply to a minimum of 2–3 schools simultaneously. Request a shadow day at each
                            shortlisted school — where your child attends classes for a full morning —
                            before signing any enrolment contract. Most schools offer this if asked directly
                            at enquiry stage, even if it isn't advertised.
                        </p>
                    </div>
                </section>

                {/* Respiro — Admissions → Methodology */}
                <div className="relative w-full aspect-21/9 overflow-hidden rounded-2xl">
                    <Image
                        src="/school-respiro-img.png"
                        alt="International school campus in Portugal — TrustFamily editorial visit"
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 896px"
                        className="object-cover"
                    />
                </div>

                {/* 5. Methodology */}
                <section id="methodology">
                    <h2 className="article-heading mb-5">5. How TrustFamily assessed these schools</h2>
                    <p className="text-ink-secondary leading-relaxed mb-5">
                        Every school on this list has been visited in person by a TrustFamily consultant
                        at least 3 times between 2023 and 2025. Our assessment combines structured school
                        visits, interviews with current families, and verification of published data
                        against primary sources.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                        {[
                            { emoji: "🏫", title: "On-site visits", desc: "Minimum 3 visits per school, including during term time." },
                            { emoji: "👨‍👩‍👧", title: "Family interviews", desc: "Structured interviews with current and recent families — not admissions staff." },
                            { emoji: "📊", title: "Data verification", desc: "Fees, acceptance rates, and IB results verified against primary sources." },
                        ].map((item) => (
                            <div key={item.title} className="bg-surface-subtle border border-border rounded-xl p-5 text-center">
                                <span className="text-3xl mb-3 block">{item.emoji}</span>
                                <h3 className="font-semibold text-ink-primary mb-2 text-sm">{item.title}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-ink-secondary leading-relaxed">
                        Schools pay nothing to appear on this list and cannot pay to alter their position,
                        verdict, or any published data. TrustFamily's editorial process is fully independent.
                    </p>
                </section>

                {/* 6. School cards */}
                <section id="schools">
                    <h2 className="article-heading mb-8">6. School profiles</h2>
                    <SchoolsList />
                </section>

                {/* 7. FAQ */}
                <section id="faq" className="bg-slate-50 rounded-2xl p-8">
                    <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            { q: "What is the best international school in Portugal?", a: "St. Julian's School in Carcavelos, Cascais — with an 8% acceptance rate and top IB results — is broadly considered the best. For American curriculum families, CAISL offers the best value with US State Department backing." },
                            { q: "How much do international schools cost in Portugal?", a: "Annual fees range from €12,000 (United Lisbon) to €32,000 (TASIS Portugal). Most families budget €15,000–25,000 per child all-in. Many schools also charge a one-time registration fee of €500–3,000." },
                            { q: "Which area is best for families near international schools?", a: "Cascais and Estoril for St. Julian's School (coast lifestyle). Sintra for TASIS and CAISL (nature, hills). Parque das Nações for United Lisbon International School (city living)." },
                            { q: "Do I need to visit schools in person before applying?", a: "Yes — always. The difference between a school's marketing and its actual atmosphere can be significant. Request a shadow day for your child at each shortlisted school before committing to an enrolment contract." },
                        ].map(({ q, a }) => (
                            <div key={q} className="border-b border-slate-200 pb-5 last:border-0 last:pb-0">
                                <h3 className="font-semibold text-ink-primary mb-2">{q}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            {/* Related Neighborhoods */}
            <section className="mt-16">
                <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-3">Find the right neighborhood to match</h2>
                <p className="text-ink-muted text-sm mb-6">School choice drives neighborhood choice. Here are the natural pairings.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: "Cascais & Estoril", desc: "Coastal living 15–20 min from St. Julian's School. Atlantic beaches, large expat community." },
                        { title: "Sintra & Surroundings", desc: "Nature and history near TASIS Portugal and CAISL. 10–15 min to both campuses by car." },
                        { title: "Parque das Nações", desc: "Modern riverfront living. Walking distance to United Lisbon International School." },
                    ].map(({ title, desc }) => (
                        <Link href="/top-neighborhoods" key={title}>
                            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                                <CardHeader><CardTitle className="text-base">{title}</CardTitle></CardHeader>
                                <CardContent><p className="text-sm text-muted-foreground">{desc}</p></CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
