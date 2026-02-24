/**
 * Testimonials — pull quotes only, no section/container wrappers.
 * The section header (overline + H2) and layout container live
 * in the parent article in page.tsx.
 */

const featured = [
    {
        id: 1,
        quote: "We spent months researching schools before finding TrustFamily. Within a week of using the guide, we had shortlisted St. Julian's and CAISL, visited both, and made our decision. The acceptance rate data alone saved us from an embarrassing situation.",
        attribution: "Caroline & James H.",
        detail: "London → Cascais, 2024",
    },
    {
        id: 2,
        quote: "What I trusted about TrustFamily is what it doesn't do — no sponsored content, no affiliate links, no sales pressure. The school comparison is honest. We enrolled at United Lisbon International School and it was exactly as described.",
        attribution: "Pieter V.",
        detail: "Amsterdam → Parque das Nações, 2024",
    },
    {
        id: 3,
        quote: "I've used relocation consultants before and paid a lot of money for generic advice. TrustFamily's free guide was more specific and honest than anything I paid for. Parque das Nações was the right call — I can walk my son to United Lisbon every morning.",
        attribution: "David O.",
        detail: "Dubai → Lisbon, 2024",
    },
];

const supporting = [
    {
        id: 4,
        quote: "TASIS Portugal wasn't on our radar at all until TrustFamily's guide. The 'parent whisper' quotes felt genuine — not marketing copy. We visited, loved it, applied, and our daughter started in September.",
        attribution: "Amélie & François D.",
        detail: "Paris → Sintra, 2023",
    },
    {
        id: 5,
        quote: "Three kids, three different ages, two curriculum preferences — our situation was complicated. The school finder quiz helped us realise that St. Julian's IB + British path was actually the right compromise.",
        attribution: "Markus & Claudia S.",
        detail: "Munich → Cascais, 2023",
    },
    {
        id: 6,
        quote: "I needed clarity, not more noise. TrustFamily gave me a real cost breakdown — not just headline fees — and explained what a shadow day is and how to request one. Those details made a huge difference.",
        attribution: "Katherine M.",
        detail: "New York → Estoril, 2024",
    },
];

export function Testimonials() {
    return (
        <>
            {/* Featured pull quotes — 3 large, full editorial weight */}
            <div className="space-y-14 mb-20">
                {featured.map((item) => (
                    <blockquote
                        key={item.id}
                        className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6 md:gap-12 items-start border-t border-border pt-10"
                    >
                        {/* Attribution — left column on desktop */}
                        <div>
                            <p className="font-semibold text-ink-primary text-body">{item.attribution}</p>
                            <p className="text-caption text-ink-muted mt-1">{item.detail}</p>
                        </div>
                        {/* Quote — right column, large serif italic */}
                        <p className="font-serif italic text-xl md:text-2xl text-ink-primary leading-relaxed">
                            &ldquo;{item.quote}&rdquo;
                        </p>
                    </blockquote>
                ))}
            </div>

            {/* Supporting quotes — 3 compact, 3-col grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-border pt-14">
                {supporting.map((item) => (
                    <blockquote key={item.id}>
                        <p className="text-body-sm text-ink-secondary italic leading-relaxed mb-4">
                            &ldquo;{item.quote}&rdquo;
                        </p>
                        <footer>
                            <p className="text-sm font-semibold text-ink-primary">{item.attribution}</p>
                            <p className="text-caption text-ink-muted">{item.detail}</p>
                        </footer>
                    </blockquote>
                ))}
            </div>
        </>
    );
}
