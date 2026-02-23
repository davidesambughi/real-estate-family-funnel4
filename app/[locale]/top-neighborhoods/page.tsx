import Image from "next/image";
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

const sections = [
    { id: "overview", label: "Overview" },
    { id: "school-first", label: "School-First Rule" },
    { id: "coastal", label: "The Coastal Belt" },
    { id: "sintra", label: "Sintra & Hills" },
    { id: "lisbon", label: "Inside Lisbon" },
    { id: "how-to-choose", label: "How to Choose" },
    { id: "neighborhoods", label: "Neighborhood Profiles" },
    { id: "faq", label: "FAQ" },
];

export default function Page() {
    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Best Family-Friendly Neighborhoods in Portugal 2026",
        "description": "Curated list of the top neighborhoods in Portugal for expat families, comparing commutes, safety, amenities, and school proximity.",
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
                "address": { "@type": "PostalAddress", "addressLocality": n.name, "addressRegion": n.location, "addressCountry": "PT" },
                "geo": { "@type": "GeoCoordinates", "latitude": n.coordinates.lat, "longitude": n.coordinates.lng },
            },
        })),
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Where do expat families live in Lisbon?", "acceptedAnswer": { "@type": "Answer", "text": "Cascais is the most popular choice for expat families in the Lisbon area, followed by Estoril and Sintra. Within Lisbon itself, Campo de Ourique and Parque das Nações are top picks for their safety, walkability, and access to international schools." } },
            { "@type": "Question", "name": "What is the best neighborhood for families near St. Julian's School?", "acceptedAnswer": { "@type": "Answer", "text": "Cascais and Estoril are the closest neighborhoods to St. Julian's School in Carcavelos — just 15–20 minutes by car. Both offer Atlantic beaches, a large international expat community, and a direct train line to Lisbon." } },
            { "@type": "Question", "name": "Is Cascais a good place to live for families?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Cascais is consistently rated the top expat family destination in Portugal. It offers excellent international schools (St. Julian's is nearby), beaches, a safe walkable centre, and a 30-minute train to Lisbon. The international community is one of the largest in the country." } },
            { "@type": "Question", "name": "How far is Sintra from international schools?", "acceptedAnswer": { "@type": "Answer", "text": "Sintra is home to both TASIS Portugal (10 minutes by car) and Carlucci American International School — CAISL (15 minutes). Families living in Sintra have easy access to two of Portugal's top international schools." } },
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
                    <span>{neighborhoodsData.length} neighborhoods reviewed</span>
                    <span>·</span>
                    <span>TrustFamily Editorial</span>
                </div>
                <h1 className="font-serif font-semibold text-4xl md:text-5xl text-ink-primary mb-5 leading-tight">
                    Best Family-Friendly Neighborhoods<br className="hidden md:block" /> in Portugal 2026
                </h1>
                <p className="text-lg text-ink-secondary leading-relaxed max-w-3xl">
                    Where expat families with children actually choose to live in Portugal — and why.
                    We compare safety, international community, school commute times, and lifestyle fit
                    across the five neighborhoods we've mapped in detail. Based on real family data,
                    not property marketing.
                </p>
            </div>

            {/* Featured image */}
            <div className="relative w-full aspect-4/3 sm:aspect-video overflow-hidden rounded-xl mb-10">
                <Image
                    src="/neighborhoods-img.jpg"
                    alt="Family-friendly neighborhood in Portugal — TrustFamily neighborhoods guide"
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
                    <h2 className="article-heading mb-5">1. Overview: the Lisbon expat geography</h2>
                    <p className="text-ink-secondary leading-relaxed mb-4">
                        Greater Lisbon is not a single neighborhood market — it's a collection of distinct
                        micro-environments, each with its own character, commute profile, and expat community
                        density. The Atlantic coast (Cascais, Estoril) is different from the forested hills
                        (Sintra), which is different again from the urban fabric inside Lisbon itself.
                    </p>
                    <p className="text-ink-secondary leading-relaxed mb-4">
                        Expat families are distributed across these environments primarily based on one factor:
                        school location. The neighborhood-first approach — choosing where to live before choosing
                        a school — is the most common mistake we see. A beautiful villa in Cascais is a poor choice
                        if your children attend United Lisbon International School in Parque das Nações
                        (a 40-minute commute each way in morning traffic).
                    </p>
                    <p className="text-ink-secondary leading-relaxed">
                        This guide presents each zone clearly so you can match your school decision to the right
                        residential area. If you haven't chosen a school yet, start with our{" "}
                        <Link href="/best-private-and-public-international-schools-portugal-2026" className="text-brand hover:underline">
                            schools guide
                        </Link>{" "}
                        first.
                    </p>
                </section>

                {/* 2. School-first */}
                <section id="school-first">
                    <h2 className="article-heading mb-5">2. The school-first rule</h2>
                    <p className="text-ink-secondary leading-relaxed mb-6">
                        Every neighborhood in this guide is mapped against its closest international school.
                        The table below is the fastest way to understand the geography before reading the
                        detailed profiles.
                    </p>
                    <div className="overflow-x-auto mb-6">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-slate-100 text-slate-700">
                                    <th className="text-left p-3 rounded-tl-lg">Neighborhood</th>
                                    <th className="text-left p-3">Closest school</th>
                                    <th className="text-left p-3">Commute</th>
                                    <th className="text-left p-3 rounded-tr-lg">Vibe</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    { n: "Cascais", s: "St. Julian's (Carcavelos)", c: "15 min by car", v: "Coastal, expat hub" },
                                    { n: "Estoril", s: "St. Julian's (Carcavelos)", c: "20 min by car", v: "Quiet, elegant" },
                                    { n: "Sintra", s: "TASIS + CAISL", c: "10–15 min by car", v: "Nature, historic" },
                                    { n: "Parque das Nações", s: "United Lisbon", c: "Walking distance", v: "Modern, riverfront" },
                                    { n: "Campo de Ourique", s: "City schools via metro", c: "20–30 min", v: "Village in the city" },
                                ].map((row) => (
                                    <tr key={row.n} className="bg-white hover:bg-slate-50">
                                        <td className="p-3 font-medium text-slate-800">{row.n}</td>
                                        <td className="p-3 text-slate-600">{row.s}</td>
                                        <td className="p-3 text-slate-600">{row.c}</td>
                                        <td className="p-3 text-slate-500 italic text-xs">{row.v}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-warm-light border border-border rounded-xl p-5">
                        <p className="text-sm text-ink-secondary leading-relaxed">
                            <strong>Practical note:</strong> Morning school traffic on the A5 (Lisbon to Cascais)
                            and IC19 (Lisbon to Sintra) can add 20–30 minutes to stated commute times between
                            8:00–9:00am. Always test your commute at school run time before finalising a rental.
                        </p>
                    </div>
                </section>

                {/* 3. Coastal belt */}
                <section id="coastal">
                    <h2 className="article-heading mb-5">3. The coastal belt: Cascais &amp; Estoril</h2>
                    <p className="text-ink-secondary leading-relaxed mb-4">
                        The Estoril Coast — the stretch of Atlantic shoreline running from Estoril to Cascais —
                        is the most popular expat family zone in Portugal by a significant margin.
                        The combination of beaches, international community, St. Julian's School proximity,
                        and a direct 30-minute train to Lisbon creates a lifestyle that is difficult to find
                        anywhere else in Europe at this price point.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        {[
                            {
                                name: "Cascais",
                                pros: ["Largest expat community in Portugal", "Cascais town centre: walkable, safe, charming", "15 min from St. Julian's School", "Active parent network and social scene"],
                                cons: ["Premium property prices (€4,000–7,000/m²)", "Tourist congestion in summer", "30 min from Lisbon centre by car"],
                            },
                            {
                                name: "Estoril",
                                pros: ["Quieter and more residential than Cascais", "Casino gardens and Belle Époque architecture", "Same Cascais Line train access", "Slightly lower property prices"],
                                cons: ["Smaller expat community than Cascais", "Fewer English-language shops and services", "Less social infrastructure for teenagers"],
                            },
                        ].map((item) => (
                            <div key={item.name} className="bg-surface-subtle border border-border rounded-xl p-5">
                                <h3 className="font-bold text-slate-900 mb-3 text-lg">{item.name}</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">Strengths</p>
                                        <ul className="space-y-1">
                                            {item.pros.map((p) => (
                                                <li key={p} className="text-xs text-slate-600 flex items-start gap-2">
                                                    <span className="text-green-500 mt-0.5">✓</span>{p}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Trade-offs</p>
                                        <ul className="space-y-1">
                                            {item.cons.map((c) => (
                                                <li key={c} className="text-xs text-slate-500 flex items-start gap-2">
                                                    <span className="text-slate-300 mt-0.5">–</span>{c}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-ink-secondary leading-relaxed">
                        <strong>TrustFamily verdict:</strong> Families new to Portugal with children under 12 who want
                        a built-in expat network: Cascais. Families who are more settled, value quiet, and want
                        to integrate into Portuguese life: Estoril. Property prices are essentially equivalent —
                        the decision is purely lifestyle.
                    </p>
                </section>

                {/* Respiro — Coastal Belt → Sintra */}
                <div className="relative w-full aspect-[21/9] overflow-hidden rounded-2xl">
                    <Image
                        src="/neighborhoods-respiro-img.png"
                        alt="Portugal landscape — from Atlantic coast to Sintra hills, TrustFamily neighborhoods guide"
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 896px"
                        className="object-cover"
                    />
                </div>

                {/* 4. Sintra */}
                <section id="sintra">
                    <h2 className="article-heading mb-5">4. Sintra: nature, history, and two world-class schools</h2>
                    <p className="text-ink-secondary leading-relaxed mb-4">
                        Sintra is unlike anywhere else on this list. A UNESCO World Heritage Site set in forested
                        hills above the Atlantic, it has palaces, a distinctly slower pace, a cooler climate,
                        and — uniquely — two of Portugal's top international schools within 15 minutes of
                        the town centre.
                    </p>
                    <p className="text-ink-secondary leading-relaxed mb-4">
                        TASIS Portugal is 10 minutes by car. CAISL is 15 minutes. Families choosing Sintra
                        for the schools rarely regret the decision — but they do sometimes underestimate the
                        trade-offs: 45 minutes to Lisbon by train, limited English-language infrastructure,
                        and a climate that is noticeably cooler and wetter than the coast.
                    </p>
                    <div className="bg-trust-light border border-border rounded-xl p-5 mb-4">
                        <p className="text-sm text-teal-800 leading-relaxed">
                            <strong>Who Sintra suits best:</strong> Families who have already chosen TASIS or CAISL
                            and prioritise nature, space, and a slower pace over urban convenience. Also well-suited
                            to remote-working adults who don't need to commute to Lisbon regularly.
                        </p>
                    </div>
                    <p className="text-sm text-ink-secondary leading-relaxed">
                        Property prices in Sintra average €2,500–4,500/m² — significantly lower than Cascais.
                        For the same budget, families typically access larger homes with gardens.
                    </p>
                </section>

                {/* 5. Inside Lisbon */}
                <section id="lisbon">
                    <h2 className="article-heading mb-5">5. Inside Lisbon: Campo de Ourique &amp; Parque das Nações</h2>
                    <p className="text-ink-secondary leading-relaxed mb-5">
                        Not all expat families want to leave the city. For those who prefer an urban
                        environment — or whose school is inside Lisbon — two neighborhoods stand out
                        for family quality of life.
                    </p>
                    <div className="space-y-5">
                        {[
                            {
                                name: "Parque das Nações — Modern Lisbon",
                                tag: "Best for: United Lisbon School families · Tech sector · Modern living",
                                content: "Built for Expo 98 on reclaimed industrial land along the Tagus estuary, Parque das Nações is Lisbon's most functional neighborhood for families. Wide riverfront promenades, modern apartments with generous floor plans, the Oceanarium, and a dedicated shopping centre make daily life unusually convenient. United Lisbon International School is walking distance. The airport is 15 minutes. For families where one parent works in tech-sector companies in the Oriente corridor, this is the obvious choice.",
                            },
                            {
                                name: "Campo de Ourique — Village in the city",
                                tag: "Best for: City integration · Walkability · Family community feel",
                                content: "Campo de Ourique is Lisbon's most liveable neighborhood and a consistent favourite among expat families who want urban life without the chaos. It sits on a flat grid — rare in hilly Lisbon — making it genuinely walkable with a pushchair. The Mercado de Campo de Ourique is a weekly institution. The neighbourhood has a self-contained community feel and suits families whose children attend Lisbon-area schools via metro, and who want to integrate more deeply into Portuguese city life.",
                            },
                        ].map((item) => (
                            <div key={item.name} className="border border-slate-200 rounded-xl p-6">
                                <h3 className="font-bold text-slate-900 mb-1 text-lg">{item.name}</h3>
                                <span className="inline-block text-xs text-brand bg-brand-50 px-2 py-0.5 rounded mb-3">{item.tag}</span>
                                <p className="text-sm text-ink-secondary leading-relaxed">{item.content}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 6. How to choose */}
                <section id="how-to-choose">
                    <h2 className="article-heading mb-5">6. How to choose: a practical checklist</h2>
                    <p className="text-ink-secondary leading-relaxed mb-6">
                        Once you have confirmed your school choice, use this checklist to evaluate candidate
                        neighborhoods. Visit each during a school morning (8:30–9:30am) and a weekend afternoon
                        to assess both the commute and the lifestyle reality.
                    </p>
                    <div className="space-y-4">
                        {[
                            { n: "01", title: "Test the school run", desc: "Drive or take public transport from your candidate address to the school at 8:30am on a weekday. Map apps under-report morning traffic by 15–25 minutes in peak expat zones." },
                            { n: "02", title: "Walk the neighborhood at school-run time", desc: "A neighborhood that looks beautiful on a Sunday morning can feel very different at 8am on a Tuesday. Check pavements, road safety near the school, and whether children can walk or cycle safely." },
                            { n: "03", title: "Talk to parents, not agents", desc: "Every international school's parent association is your most reliable source of neighborhood intelligence. Ask which streets are noisy, where to avoid, and what daily life actually looks like." },
                            { n: "04", title: "Check English-language infrastructure", desc: "Depending on your integration ambitions, assess the density of English-speaking services: GP surgeries, supermarkets with imported brands, after-school activity providers. Cascais scores highest; Sintra and Campo de Ourique require more Portuguese." },
                            { n: "05", title: "Budget transport costs explicitly", desc: "If you are more than 5 km from school, factor in transport: school bus (€2,000–4,000/year) or car costs. Families who choose proximity over size consistently report higher satisfaction." },
                        ].map((item) => (
                            <div key={item.n} className="flex gap-5 items-start">
                                <div className="shrink-0 w-10 h-10 bg-brand text-primary-foreground rounded-xl flex items-center justify-center text-sm font-bold">
                                    {item.n}
                                </div>
                                <div className="flex-1 border border-slate-100 rounded-xl p-4 bg-white">
                                    <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                                    <p className="text-sm text-ink-secondary leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 7. Neighborhood cards */}
                <section id="neighborhoods">
                    <h2 className="article-heading mb-8">7. Neighborhood profiles</h2>
                    <NeighborhoodsList />
                </section>

                {/* 8. FAQ */}
                <section id="faq" className="bg-slate-50 rounded-2xl p-8">
                    <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            { q: "Where do expat families live in Lisbon?", a: "Cascais leads for coastal families, followed by Estoril and Sintra. Within the city: Campo de Ourique (walkable, community feel) and Parque das Nações (modern, riverfront) are top picks." },
                            { q: "What neighborhood is closest to St. Julian's School?", a: "Cascais (15 min) and Estoril (20 min) are the closest. Both are on the Cascais Line train and share the Atlantic coastline." },
                            { q: "Is Sintra good for families with international school-age children?", a: "Yes — TASIS Portugal and CAISL are both within 15 minutes by car. The trade-offs are distance to Lisbon (45 min by train) and a cooler, hillier climate." },
                            { q: "Which Lisbon neighborhood is best for families without a car?", a: "Parque das Nações (walking distance to United Lisbon International School, excellent metro access) and Campo de Ourique (flat, walkable, well-served by public transport) are the strongest choices." },
                        ].map(({ q, a }) => (
                            <div key={q} className="border-b border-slate-200 pb-5 last:border-0 last:pb-0">
                                <h3 className="font-semibold text-ink-primary mb-2">{q}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            {/* Related Schools */}
            <section className="mt-16">
                <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-3">Find the right school to match</h2>
                <p className="text-ink-muted text-sm mb-6">
                    Neighborhood choice follows school choice. Compare all four international schools with fees, acceptance rates, and first-hand verdicts.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { title: "International Schools Guide", desc: "IB, British and American curriculum options with real acceptance rates and all-in fee breakdowns.", href: "/best-private-and-public-international-schools-portugal-2026" as const },
                        { title: "School Finder Quiz", desc: "Answer 4 questions to get matched with the right school and neighborhood in 60 seconds.", href: "/school-finder" as const },
                    ].map(({ title, desc, href }) => (
                        <Link href={href} key={title}>
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
