import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Sun, ShieldCheck, GraduationCap, ChevronRight } from "lucide-react";
import { StickyTOC } from "@/components/StickyTOC";


interface PageProps {
    params: Promise<{ locale: string }>;
}

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://trustfamily.com';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "RelocationGuidePage" });
    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
        alternates: {
            canonical: `${BASE}/en/family-relocation-guide-2026`,
            languages: {
                'en': `${BASE}/en/family-relocation-guide-2026`,
                'pt': `${BASE}/pt/guia-relocacao-familia-2026`,
                'de': `${BASE}/de/familien-umzugs-guide-2026`,
                'fr': `${BASE}/fr/guide-relocalisation-famille-2026`,
                'nl': `${BASE}/nl/familie-verhuisgids-2026`,
                'es': `${BASE}/es/guia-relocacion-familia-2026`,
                'x-default': `${BASE}/en/family-relocation-guide-2026`,
            },
        },
        openGraph: {
            title: t("metaTitle"),
            description: t("metaDescription"),
            url: `${BASE}/en/family-relocation-guide-2026`,
            siteName: "TrustFamily",
            locale: "en_US",
            type: "article",
            images: [{ url: `${BASE}/opengraph-image`, width: 1200, height: 630, alt: 'TrustFamily — International Schools & Neighborhoods in Portugal' }],
        },
        twitter: {
            card: "summary_large_image",
            title: t("metaTitle"),
            description: t("metaDescription"),
        },
    };
}

// ISR: visa rules and cost data change — regenerate every 12 h
export const revalidate = 43200;

const sections = [
    { id: "why-portugal", label: "Why Portugal" },
    { id: "visas", label: "Visas" },
    { id: "schools", label: "Schools" },
    { id: "neighborhoods", label: "Where to Live" },
    { id: "housing", label: "Housing" },
    { id: "cost-of-living", label: "Cost of Living" },
    { id: "healthcare", label: "Healthcare" },
    { id: "children-integration", label: "Children & Integration" },
    { id: "timeline", label: "12-Month Timeline" },
];

export default function RelocationGuidePage() {
    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to relocate your family to Portugal — 12-month step-by-step guide",
        "description": "A practical month-by-month relocation framework for families moving to Portugal, based on 200+ family relocations handled by TrustFamily consultants.",
        "totalTime": "P12M",
        "step": [
            {
                "@type": "HowToStep",
                "position": 1,
                "name": "Research & school applications (Months 12–10)",
                "text": "Identify top 3 schools and their admission requirements. Request information packs and schedule school visits. Submit applications — do not wait, wait lists form early. Begin visa research with a licensed immigration lawyer.",
                "url": `${BASE}/en/family-relocation-guide-2026#timeline`,
            },
            {
                "@type": "HowToStep",
                "position": 2,
                "name": "Shortlisting & visas (Months 9–7)",
                "text": "Attend shadow days at 2–3 shortlisted schools. Receive and compare school offers. Compile documents for D7 or D8 visa application. Begin remote Portuguese language lessons for children.",
                "url": `${BASE}/en/family-relocation-guide-2026#timeline`,
            },
            {
                "@type": "HowToStep",
                "position": 3,
                "name": "Decision & logistics (Months 6–4)",
                "text": "Confirm school enrolment and pay deposit. Book scouting trip to shortlist neighborhoods. Sign a furnished rental contract remotely where possible. Submit visa application at Portuguese consulate in home country.",
                "url": `${BASE}/en/family-relocation-guide-2026#timeline`,
            },
            {
                "@type": "HowToStep",
                "position": 4,
                "name": "Pre-arrival (Months 3–1)",
                "text": "Receive visa and organize travel. Ship or store furniture and belongings. Register with GP and private health insurer. Organize Portuguese bank account (required for SNS registration).",
                "url": `${BASE}/en/family-relocation-guide-2026#timeline`,
            },
            {
                "@type": "HowToStep",
                "position": 5,
                "name": "Arrival & first week (Month 0)",
                "text": "Register at Junta de Freguesia within 30 days (EU) or confirm residence permit (non-EU). Register children with school for orientation. Obtain NIF (Portuguese tax number). Join school parent WhatsApp group immediately.",
                "url": `${BASE}/en/family-relocation-guide-2026#timeline`,
            },
            {
                "@type": "HowToStep",
                "position": 6,
                "name": "First quarter — settling in (Months 1–3)",
                "text": "Attend school welcome events. Enrol children in 1–2 extra-curricular activities. Explore neighborhood and build local routines. Begin Portuguese lessons if not already started.",
                "url": `${BASE}/en/family-relocation-guide-2026#timeline`,
            },
        ],
    };

    const speakableSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "speakable": {
            "@type": "SpeakableSpecification",
            "cssSelector": ["#key-takeaways", "#faq"],
        },
        "url": `${BASE}/en/family-relocation-guide-2026`,
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What visa do I need to move to Portugal with my family?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "EU/EEA citizens need no visa — just register as residents. Non-EU families most commonly use the D7 Passive Income Visa or the D8 Digital Nomad Visa. The Golden Visa no longer covers real estate purchases as of 2024. Always verify with a licensed immigration lawyer.",
                },
            },
            {
                "@type": "Question",
                "name": "When should I apply to international schools?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For September entry, apply the October–December before. St. Julian's often has a 12–18 month waitlist. Apply to 2–3 schools simultaneously — acceptance rates range from 8% to 45%.",
                },
            },
            {
                "@type": "Question",
                "name": "How much does it cost to live in Portugal as a family of 4?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Excluding school fees: €4,650–8,750/month depending on lifestyle. School fees add €12,000–32,000 per child per year on top of living costs.",
                },
            },
            {
                "@type": "Question",
                "name": "Is the public healthcare system good enough for expat families?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Solid for emergencies and primary care. Most expat families add private insurance (€200–500/month for a family of 4) for specialist access and English-speaking doctors. Providers: CUF, Luz Saúde, HPA.",
                },
            },
        ],
    };

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Family Relocation Guide Portugal 2026",
        "description": "Complete guide to relocating your family to Portugal in 2026. Covers visas, housing, schools, healthcare, and a step-by-step timeline.",
        "datePublished": "2026-01-01",
        "dateModified": "2026-02-01",
        "author": { "@type": "Organization", "name": "TrustFamily" },
        "publisher": {
            "@type": "Organization",
            "name": "TrustFamily",
            "logo": { "@type": "ImageObject", "url": "https://trustfamily.com/logo.png" },
        },
    };

    return (
        <main className="container mx-auto py-12 px-6 max-w-4xl">
            <JsonLd data={faqSchema} />
            <JsonLd data={articleSchema} />
            <JsonLd data={howToSchema} />
            <JsonLd data={speakableSchema} />
            <Breadcrumbs />
            <StickyTOC sections={sections} />

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 text-xs text-ink-muted mb-4">
                    <time dateTime="2026-02-01">Updated February 2026</time>
                    <span>·</span>
                    <span>25 min read</span>
                    <span>·</span>
                    <span>TrustFamily Editorial</span>
                </div>
                <h1 className="font-serif font-semibold text-4xl md:text-5xl text-ink-primary mb-5 leading-tight">
                    Family Relocation Guide<br className="hidden md:block" /> Portugal 2026
                </h1>
                <p className="text-lg text-ink-secondary leading-relaxed max-w-3xl">
                    A complete, independent guide to moving your family to Portugal — from choosing
                    the right visa to selecting a school, finding a home, and getting your children
                    settled. Based on verified data from 200+ families who have made the move.
                </p>
            </div>

            {/* ── KEY TAKEAWAYS — GEO/AI OVERVIEW OPTIMISATION ── */}
            {/* Structured summary extracted verbatim by AI search engines */}
            <div id="key-takeaways" className="bg-brand-50 border border-brand/20 rounded-2xl p-6 mb-8">
                <h2 className="section-overline mb-4">Key takeaways</h2>
                <ul className="space-y-2">
                    {[
                        "EU/EEA citizens need no visa — just register as residents within 30 days of arrival.",
                        "Non-EU families most commonly use the D7 Passive Income Visa (~€760/month income requirement) or D8 Digital Nomad Visa (€3,040/month minimum).",
                        "Monthly cost of living for a family of 4 in Lisbon area: €4,650–8,750/month excluding school fees.",
                        "International school fees: €12,000–32,000 per child per year. Apply to 2–3 schools 12–18 months in advance — St. Julian's has an 8% acceptance rate.",
                        "Top family neighborhoods: Cascais (coastal, expat hub, 15 min from St. Julian's), Sintra (nature, 2 schools nearby), Parque das Nações (city, walking distance to United Lisbon).",
                        "Private health insurance recommended for expat families: €200–500/month for a family of 4 (providers: CUF, Luz Saúde, HPA).",
                        "Portugal ranks in the top 7 safest countries globally (Global Peace Index 2025) with 300+ sunny days per year in Lisbon.",
                    ].map((point) => (
                        <li key={point} className="flex items-start gap-3 text-sm text-ink-secondary leading-snug">
                            <span className="shrink-0 text-brand font-bold mt-0.5">✓</span>
                            <span>{point}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Featured image */}
            <div className="relative w-full aspect-4/3 sm:aspect-video overflow-hidden rounded-xl mb-10">
                <Image
                    src="/softLanding-img.png"
                    alt="Family arriving in Portugal — TrustFamily soft landing guide"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 896px"
                    className="object-cover"
                />
            </div>

            {/* Table of contents */}
            <nav className="bg-surface-subtle border border-border rounded-xl p-6 mb-12">
                <h2 className="section-overline mb-4">In this guide</h2>
                <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sections.map((s, i) => (
                        <li key={s.id}>
                            <a href={`#${s.id}`} className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                                {i + 1}. {s.label}
                            </a>
                        </li>
                    ))}
                </ol>
            </nav>

            <div className="space-y-16">

                {/* 1. Why Portugal */}
                <section id="why-portugal">
                    <h2 className="article-heading mb-5">1. Why families choose Portugal</h2>
                    <p className="text-ink-secondary leading-relaxed mb-4">
                        Portugal has become the top destination for affluent international families in Europe for a converging set of reasons that are unlikely to reverse: political stability, Atlantic climate, low crime, world-class international schools, and a quality of life that is difficult to replicate at equivalent cost elsewhere in Western Europe.
                    </p>
                    <p className="text-ink-secondary leading-relaxed mb-4">
                        The Lisbon area in particular offers the highest concentration of international school options in the country — IB, British, and American curricula — within a 45-minute radius. This means families rarely have to choose between education quality and lifestyle.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                        {[
                            { icon: <Sun className="h-5 w-5" />, title: "Climate", desc: "300+ sunny days per year in Lisbon. Mild winters, warm summers without extreme heat." },
                            { icon: <ShieldCheck className="h-5 w-5" />, title: "Safety", desc: "Portugal ranks in the top 7 safest countries globally (Global Peace Index 2025)." },
                            { icon: <GraduationCap className="h-5 w-5" />, title: "Education", desc: "4 top international schools within 45 min of Lisbon — IB, British, and American curricula." },
                        ].map((item) => (
                            <div key={item.title} className="bg-card rounded-2xl p-6 border border-border shadow-(--shadow-hair) hover:shadow-md transition-all">
                                <div className="bg-warm-light/30 text-warm p-2.5 rounded-xl w-fit mb-4 shadow-(--shadow-hair)">
                                    {item.icon}
                                </div>
                                <h3 className="font-semibold text-ink-primary mb-2 text-h4 leading-tight">{item.title}</h3>
                                <p className="text-body-sm text-ink-secondary leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-ink-muted mt-3">
                        Source:{" "}
                        <a
                            href="https://www.visionofhumanity.org/maps/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-ink-secondary transition-colors"
                        >
                            Global Peace Index 2025 — Institute for Economics & Peace
                        </a>
                    </p>
                </section>

                {/* 2. Visas */}
                <section id="visas">
                    <h2 className="article-heading mb-5">2. Visas: which route is right for your family</h2>
                    <p className="text-ink-secondary leading-relaxed mb-6">
                        Portugal's visa landscape changed significantly in 2024. The Golden Visa program no longer covers most real estate purchases — the most common route used by international families. Here is the current picture, accurate as of January 2026. Always consult a licensed Portuguese immigration lawyer before applying.
                    </p>

                    <div className="space-y-6">
                        {[
                            {
                                tag: "Most common for non-EU families",
                                tagColor: "bg-blue-100 text-blue-700",
                                title: "D7 — Passive Income Visa",
                                content: "The D7 is designed for families with a stable, passive income source — rental income, dividends, pension, or foreign salary from a remote employer. Requirements: proof of income of approximately €760/month per adult + €380 per child (2026 figures), valid health insurance, and a rental contract or property deed in Portugal. Processing time: 2–4 months. The D7 grants a 2-year residence permit, renewable for 3 years, and leads to permanent residency after 5 years.",
                            },
                            {
                                tag: "Remote workers",
                                tagColor: "bg-purple-100 text-purple-700",
                                title: "D8 — Digital Nomad Visa",
                                content: "For employees or freelancers who work remotely for a company based outside Portugal. Minimum income threshold: €3,040/month (4× Portuguese minimum wage). This visa is valid for 1 year (employed) or 2 years (self-employed) and is renewable. Note: if your income fluctuates or your employer is Portugal-based, the D8 may not apply — consult a lawyer.",
                            },
                            {
                                tag: "EU / EEA / Swiss citizens",
                                tagColor: "bg-green-100 text-green-700",
                                title: "EU Free Movement — No visa required",
                                content: "Citizens of EU/EEA member states and Switzerland can move to Portugal freely and simply register as residents at the local Junta de Freguesia within 30 days of arrival. You'll receive an EUFP residence certificate. Your family members (including non-EU spouses and children) are covered under EU family reunification rights.",
                            },
                            {
                                tag: "2024 update — restricted",
                                tagColor: "bg-amber-100 text-amber-700",
                                title: "Golden Visa — Limited options remaining",
                                content: "Portugal's Golden Visa program was restructured in October 2023 (Law 56/2023). Real estate purchases — the most popular investment route — were removed. Remaining eligible investments include: qualifying investment funds (minimum €500,000), science/technology company investments, and cultural heritage donations. The GV still leads to residency and eventual citizenship, but it is no longer accessible via property purchase.",
                            },
                        ].map((item) => (
                            <div key={item.title} className="border border-slate-200 rounded-xl p-6">
                                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${item.tagColor}`}>
                                    {item.tag}
                                </span>
                                <h3 className="text-lg font-semibold text-ink-primary mb-2">{item.title}</h3>
                                <p className="text-sm text-ink-secondary leading-relaxed">{item.content}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-ink-muted mt-4 italic">
                        Disclaimer: visa rules change frequently. This is editorial guidance, not legal advice. Always verify current requirements with a licensed immigration lawyer and the official{" "}
                        <a
                            href="https://www.imigracao.gov.pt/en/services/entry-stay-or-live-in-pt"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-ink-secondary transition-colors"
                        >
                            AIMA immigration portal
                        </a>.
                    </p>
                </section>

                {/* Respiro — Visas → Schools */}
                <div className="relative w-full aspect-21/9 overflow-hidden rounded-2xl">
                    <Image
                        src="/guide-respiro-img1.png"
                        alt="Family beginning a new life in Portugal — TrustFamily relocation guide"
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 896px"
                        className="object-cover"
                    />
                </div>

                {/* 3. Schools */}
                <section id="schools">
                    <h2 className="article-heading mb-5">3. Choosing an international school</h2>
                    <p className="text-ink-secondary leading-relaxed mb-4">
                        Portugal's four leading international schools near Lisbon cover the three major curricula: British (IGCSE + IB Diploma), American (US graduation + IB Diploma), and pure IB. Here is a brief orientation — for the full comparison, see our dedicated schools guide.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {[
                            { school: "St. Julian's School", tag: "British / IB", location: "Carcavelos", fees: "€16,000–26,000", rate: "8%" },
                            { school: "TASIS Portugal", tag: "American / IB", location: "Sintra", fees: "€18,000–32,000", rate: "18%" },
                            { school: "CAISL", tag: "American / IB", location: "Sintra / Linho", fees: "€14,000–24,000", rate: "35%" },
                            { school: "United Lisbon", tag: "American / IB", location: "Parque das Nações", fees: "€12,000–22,000", rate: "45%" },
                        ].map((s) => (
                            <div key={s.school} className="bg-surface-subtle border border-border rounded-xl p-5">
                                <span className="inline-block bg-brand-light text-brand text-xs font-semibold px-2 py-0.5 rounded mb-2">{s.tag}</span>
                                <h3 className="font-bold text-slate-900 mb-1">{s.school}</h3>
                                <p className="text-xs text-slate-500 mb-2">{s.location} · Fees: {s.fees}/yr · Acceptance: {s.rate}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-ink-secondary leading-relaxed mb-4">
                        <strong>Key rule:</strong> Apply to 2–3 schools simultaneously. With acceptance rates as low as 8%, single-school strategies are high-risk. Most schools require applications 12–18 months before the intended start date, and many run shadow days (where your child attends for a morning) before confirming a place.
                    </p>
                    <Link href="/best-private-and-public-international-schools-portugal-2026" className="inline-flex items-center text-sm font-medium text-brand hover:text-(--brand-hover) transition-colors">
                        Full school comparison with fees and verdicts →
                    </Link>
                </section>

                {/* 4. Neighborhoods */}
                <section id="neighborhoods">
                    <h2 className="article-heading mb-5">4. Where to live — school proximity first</h2>
                    <p className="text-ink-secondary leading-relaxed mb-4">
                        The most common mistake expat families make is choosing a neighborhood before choosing a school. In the Lisbon area, school location should drive residential location — not the other way around. Morning school runs across Lisbon can take 45–60 minutes in traffic.
                    </p>
                    <div className="space-y-4 mb-6">
                        {[
                            { neighborhood: "Cascais & Estoril", school: "St. Julian's School (Carcavelos)", commute: "15–20 min", vibe: "Coastal luxury, large expat community, Atlantic beaches." },
                            { neighborhood: "Sintra", school: "TASIS Portugal + CAISL", commute: "10–15 min", vibe: "UNESCO heritage, forests, slower pace. 45 min to Lisbon by train." },
                            { neighborhood: "Parque das Nações", school: "United Lisbon International School", commute: "Walking distance", vibe: "Modern, riverfront, urban. 15 min to airport." },
                            { neighborhood: "Campo de Ourique", school: "City schools via metro", commute: "20–30 min", vibe: "Village feel inside Lisbon. Flat, walkable, family-friendly." },
                        ].map((item) => (
                            <div key={item.neighborhood} className="border-l-4 border-brand/30 pl-5 py-2">
                                <h3 className="font-semibold text-slate-900">{item.neighborhood}</h3>
                                <p className="text-xs text-blue-600 mb-1">→ {item.school} · {item.commute} commute</p>
                                <p className="text-sm text-slate-500">{item.vibe}</p>
                            </div>
                        ))}
                    </div>
                    <Link href="/top-neighborhoods" className="inline-flex items-center text-sm font-medium text-brand hover:text-(--brand-hover) transition-colors">
                        Full neighborhood guide with commute data and lifestyle profiles →
                    </Link>
                </section>

                {/* 5. Housing */}
                <section id="housing">
                    <h2 className="article-heading mb-5">5. Housing: renting vs buying in 2026</h2>
                    <p className="text-ink-secondary leading-relaxed mb-4">
                        Portugal's property market has risen significantly since 2020, particularly in expat-heavy coastal areas. Most families arriving on a D7 or D8 visa rent first for 12–24 months before deciding whether to buy. This is sensible: it avoids rushed decisions and allows you to evaluate the school and neighborhood fit before committing.
                    </p>

                    <h3 className="font-serif font-semibold text-lg text-ink-primary mb-3">Typical rental costs (2026)</h3>
                    <div className="overflow-x-auto mb-6">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-slate-100 text-slate-700">
                                    <th className="text-left p-3 rounded-tl-lg">Area</th>
                                    <th className="text-left p-3">3-bed apartment</th>
                                    <th className="text-left p-3 rounded-tr-lg">4-bed villa/house</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    { area: "Cascais / Estoril", apt: "€2,800–4,500", villa: "€4,500–8,000+" },
                                    { area: "Sintra (town)", apt: "€1,800–3,000", villa: "€3,000–6,000" },
                                    { area: "Parque das Nações", apt: "€2,500–4,000", villa: "N/A (urban)" },
                                    { area: "Campo de Ourique", apt: "€2,200–3,500", villa: "N/A (urban)" },
                                ].map((row) => (
                                    <tr key={row.area} className="bg-white hover:bg-slate-50">
                                        <td className="p-3 font-medium text-slate-800">{row.area}</td>
                                        <td className="p-3 text-slate-600">{row.apt}</td>
                                        <td className="p-3 text-slate-600">{row.villa}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <p className="text-ink-secondary leading-relaxed mb-4">
                        <strong>Budget tip:</strong> Furnished rentals (with a full kitchen and appliances) command a 10–20% premium but save significant upfront cost for families who haven't yet shipped furniture. Negotiate a longer lease (2–3 years) in exchange for a price reduction — landlords in premium areas value stability.
                    </p>
                    <p className="text-ink-secondary leading-relaxed">
                        <strong>Buying:</strong> Property prices in Cascais average €4,000–7,000/m², comparable to mid-range areas of London or Paris. A suitable family home (4 bedrooms, garden, close to schools) typically costs €1.2–2.5M in premium coastal areas. Transfer tax (IMT) and stamp duty add approximately 6–8% to the purchase price.
                    </p>
                </section>

                {/* 6. Cost of living */}
                <section id="cost-of-living">
                    <h2 className="article-heading mb-5">6. Cost of living — what to budget</h2>
                    <p className="text-ink-secondary leading-relaxed mb-6">
                        Portugal's cost of living is lower than comparable Northern European cities for groceries, dining, childcare, and services — but not for international school fees or premium housing. The table below reflects a realistic all-in monthly budget for a family of 4 in the Cascais/Sintra corridor.
                    </p>
                    <div className="overflow-x-auto mb-6">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-slate-100 text-slate-700">
                                    <th className="text-left p-3 rounded-tl-lg">Category</th>
                                    <th className="text-left p-3">Moderate</th>
                                    <th className="text-left p-3 rounded-tr-lg">Premium</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    { cat: "Rent (3-4 bed home)", mod: "€2,500", prem: "€4,500+" },
                                    { cat: "Groceries & food", mod: "€800", prem: "€1,400" },
                                    { cat: "School transport", mod: "€200", prem: "€400" },
                                    { cat: "Dining out", mod: "€400", prem: "€900" },
                                    { cat: "Activities & sport", mod: "€300", prem: "€700" },
                                    { cat: "Health insurance", mod: "€250", prem: "€500" },
                                    { cat: "Utilities + internet", mod: "€200", prem: "€350" },
                                    { cat: "Total (excl. school fees)", mod: "~€4,650/mo", prem: "~€8,750/mo" },
                                ].map((row) => (
                                    <tr key={row.cat} className={`bg-white hover:bg-slate-50 ${row.cat.startsWith("Total") ? "font-semibold text-slate-900" : ""}`}>
                                        <td className="p-3 text-slate-800">{row.cat}</td>
                                        <td className="p-3 text-slate-600">{row.mod}</td>
                                        <td className="p-3 text-slate-600">{row.prem}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-sm text-slate-400 italic mb-4">
                        School fees are separate: €12,000–32,000 per child per year, billed annually or termly.
                    </p>
                </section>

                {/* 7. Healthcare */}
                <section id="healthcare">
                    <h2 className="article-heading mb-5">7. Healthcare for expat families</h2>
                    <p className="text-ink-secondary leading-relaxed mb-4">
                        Portugal's National Health Service (Serviço Nacional de Saúde — SNS) is available to all registered residents. Quality is solid for primary care and emergencies, but waiting times for specialist appointments can be significant in the public system. Most expat families use a hybrid model: SNS for emergencies and GP visits, private insurance for specialists and planned care.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        {[
                            {
                                title: "SNS (Public)",
                                points: ["Free or low-cost for residents", "Good for GP and emergency care", "Longer specialist wait times", "Portuguese language standard"],
                            },
                            {
                                title: "Private Insurance",
                                points: ["€200–500/month for family of 4", "English-speaking doctors available", "Same-day specialist access", "Major providers: CUF, Luz Saúde, HPA"],
                            },
                        ].map((item) => (
                            <div key={item.title} className="bg-surface-subtle border border-border rounded-xl p-5">
                                <h3 className="font-bold text-slate-900 mb-3">{item.title}</h3>
                                <ul className="space-y-1">
                                    {item.points.map((p) => (
                                        <li key={p} className="text-sm text-slate-600 flex items-start gap-2">
                                            <span className="text-green-500 mt-0.5">✓</span>{p}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <p className="text-ink-secondary leading-relaxed">
                        Pediatric care is excellent in private clinics. The Hospital da Luz Lisbon and CUF Descobertas are the most commonly used private hospitals by the expat community — both have English-speaking paediatric departments.
                    </p>
                </section>

                {/* Respiro — Healthcare → Children & Integration */}
                <div className="relative w-full aspect-21/9 overflow-hidden rounded-2xl">
                    <Image
                        src="/guide-respiro-img2.png"
                        alt="Children settling into life in Portugal — TrustFamily family integration guide"
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 896px"
                        className="object-cover"
                    />
                </div>

                {/* 8. Children & integration */}
                <section id="children-integration">
                    <h2 className="article-heading mb-5">8. Getting your children settled</h2>
                    <p className="text-ink-secondary leading-relaxed mb-4">
                        The school decision is step one, but integration is an ongoing process. Portugal's international school communities are generally welcoming to new families, particularly in Cascais and Sintra where the expat population is large and well-organized.
                    </p>
                    <div className="space-y-5">
                        {[
                            {
                                title: "Request a shadow day before enrolment",
                                body: "Most international schools in Portugal offer shadow days — where your child attends classes for a morning alongside current students. This is the single most useful way to assess fit before committing. Ask at the admissions stage, even if it is not advertised.",
                            },
                            {
                                title: "Portuguese language matters more than it seems",
                                body: "International school curricula are delivered in English, but Portuguese is woven into daily life — grocery shopping, sports clubs, making local friends. Most international schools offer Portuguese as a subject. Investing in a private Portuguese tutor for your children in the first 6 months pays dividends in integration and confidence.",
                            },
                            {
                                title: "Extra-curricular activities are the fastest integration path",
                                body: "Surf lessons, football academies, tennis clubs, and sailing schools in Cascais and Estoril have both expat and local Portuguese children. These are often where children make their first real local friendships — outside the school bubble.",
                            },
                            {
                                title: "Parent communities are active and useful",
                                body: "Each international school has active parent WhatsApp groups and associations that organise welcome events, second-hand uniform sales, and social activities. Joining immediately is strongly recommended — these networks surface practical local knowledge that no website can replicate.",
                            },
                        ].map((item) => (
                            <div key={item.title} className="border-l-4 border-trust/40 pl-5 py-1">
                                <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                                <p className="text-sm text-ink-secondary leading-relaxed">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 9. Timeline */}
                <section id="timeline">
                    <h2 className="article-heading mb-5">9. Your 12-month relocation timeline</h2>
                    <p className="text-ink-secondary leading-relaxed mb-6">
                        The families who relocate most smoothly start planning 12–18 months before their target arrival date. Below is a practical month-by-month framework based on what TrustFamily has observed working consistently across 200+ family relocations.
                    </p>
                    <div className="space-y-4">
                        {[
                            { months: "Months 12–10", title: "Research & school applications", tasks: ["Identify top 3 schools and their admission requirements", "Request information packs and schedule school visits", "Submit applications — do not wait, wait lists form early", "Begin visa research with a licensed immigration lawyer"] },
                            { months: "Months 9–7", title: "Shortlisting & visas", tasks: ["Attend shadow days at 2–3 shortlisted schools", "Receive and compare school offers", "Compile documents for D7 or D8 visa application", "Begin remote Portuguese language lessons for children"] },
                            { months: "Months 6–4", title: "Decision & logistics", tasks: ["Confirm school enrolment and pay deposit", "Book scouting trip to shortlist neighborhoods", "Sign a furnished rental contract remotely where possible", "Submit visa application at Portuguese consulate in home country"] },
                            { months: "Months 3–1", title: "Pre-arrival", tasks: ["Receive visa — organize travel", "Ship or store furniture and belongings", "Register with GP and private health insurer", "Organize Portuguese bank account (required for SNS registration)"] },
                            { months: "Month 0", title: "Arrival & first week", tasks: ["Register at Junta de Freguesia within 30 days (EU) / confirm residence permit (non-EU)", "Register children with school for orientation", "Obtain NIF (Portuguese tax number) — required for almost everything", "Join school parent WhatsApp group immediately"] },
                            { months: "Months 1–3", title: "First quarter — settling in", tasks: ["Attend school welcome events", "Enrol children in 1–2 extra-curricular activities", "Explore neighborhood and build local routines", "Begin Portuguese lessons if not already started"] },
                        ].map((phase, i) => (
                            <div key={phase.months} className="flex gap-5">
                                <div className="shrink-0 w-8 h-8 bg-brand text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-1">
                                    {i + 1}
                                </div>
                                <div className="flex-1 border border-slate-100 rounded-xl p-5 bg-white">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-xs font-semibold text-brand bg-brand-50 px-2 py-0.5 rounded">{phase.months}</span>
                                        <h3 className="font-bold text-slate-900">{phase.title}</h3>
                                    </div>
                                    <ul className="space-y-1">
                                        {phase.tasks.map((task) => (
                                            <li key={task} className="text-sm text-slate-600 flex items-start gap-2">
                                                <span className="text-slate-300 mt-1 text-xs">▶</span>{task}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section id="faq">
                    <h2 className="article-heading mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-5">
                        {[
                            { q: "What visa do I need to move to Portugal with my family?", a: "EU/EEA citizens need no visa — just register as residents. Non-EU families most commonly use the D7 Passive Income Visa or the D8 Digital Nomad Visa. The Golden Visa no longer covers real estate purchases as of 2024. Always verify with a licensed immigration lawyer." },
                            { q: "When should I apply to international schools?", a: "For September entry, apply the October–December before. St. Julian's often has a 12–18 month waitlist. Apply to 2–3 schools simultaneously — acceptance rates range from 8% to 45%." },
                            { q: "How much does it cost to live in Portugal as a family of 4?", a: "Excluding school fees: €4,650–8,750/month depending on lifestyle. School fees add €12,000–32,000 per child per year on top of living costs." },
                            { q: "Is the public healthcare system good enough for expat families?", a: "Solid for emergencies and primary care. Most expat families add private insurance (€200–500/month for a family of 4) for specialist access and English-speaking doctors. Providers: CUF, Luz Saúde, HPA." },
                        ].map(({ q, a }) => (
                            <div key={q} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                                <h3 className="font-semibold text-ink-primary mb-2">{q}</h3>
                                <p className="text-sm text-ink-secondary leading-relaxed">{a}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            {/* CTA */}
            <div className="mt-16 bg-brand-50 border border-border rounded-2xl p-8 text-center">
                <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-3">Ready to find the right school?</h2>
                <p className="text-slate-600 mb-6 max-w-xl mx-auto">
                    Take our free School Finder quiz to get matched with the right school
                    and neighborhood in 60 seconds.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button size="lg" asChild>
                        <Link href="/school-finder">Take the School Finder Quiz</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/best-private-and-public-international-schools-portugal-2026">
                            Compare All Schools
                        </Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}
