import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Caroline & James H.",
        role: "Relocated from London to Cascais, 2024",
        content: "We spent months researching schools before finding TrustFamily. Within a week of using the guide, we had shortlisted St. Julian's and CAISL, visited both, and made our decision. The acceptance rate data alone saved us from an embarrassing situation.",
        rating: 5,
    },
    {
        id: 2,
        name: "Pieter V.",
        role: "Moved from Amsterdam to Parque das Nações, 2024",
        content: "What I trusted about TrustFamily is what it doesn't do — no sponsored content, no affiliate links, no sales pressure. The school comparison is honest. We enrolled at United Lisbon International School and it was exactly as described.",
        rating: 5,
    },
    {
        id: 3,
        name: "Amélie & François D.",
        role: "Relocated from Paris to Sintra, 2023",
        content: "TASIS Portugal wasn't on our radar at all until TrustFamily's guide. The 'parent whisper' quotes felt genuine — not marketing copy. We visited, loved it, applied, and our daughter started in September. The neighborhood match for Sintra was spot-on.",
        rating: 5,
    },
    {
        id: 4,
        name: "Katherine M.",
        role: "Single mum, relocated from New York to Estoril, 2024",
        content: "I needed clarity, not more noise. TrustFamily gave me a real cost breakdown — not just headline fees — and explained what a shadow day is and how to request one. Those details made a huge difference. We're settled in Estoril and couldn't be happier.",
        rating: 5,
    },
    {
        id: 5,
        name: "Markus & Claudia S.",
        role: "Relocated from Munich to Cascais, 2023",
        content: "Three kids, three different ages, two curriculum preferences — our situation was complicated. The school finder quiz helped us realise that St. Julian's IB + British path was actually the right compromise. The commute context for Cascais was accurate to the minute.",
        rating: 5,
    },
    {
        id: 6,
        name: "David O.",
        role: "Tech founder, relocated from Dubai to Lisbon, 2024",
        content: "I've used relocation consultants before and paid a lot of money for generic advice. TrustFamily's free guide was more specific and honest than anything I paid for. Parque das Nações was the right call — I can walk my son to United Lisbon every morning.",
        rating: 4,
    },
];

export function Testimonials() {
    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <p className="section-overline text-center mb-3">What families say</p>
                <h2 className="section-heading text-center mb-3">Real stories from real families</h2>
                <p className="text-center text-ink-secondary mb-12 max-w-2xl mx-auto">
                    Families who used TrustFamily to choose a school and neighborhood before relocating to Portugal.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.id} className="h-full flex flex-col">
                            <CardHeader>
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-border"}`}
                                        />
                                    ))}
                                </div>
                                <CardTitle className="text-base text-ink-primary">{testimonial.name}</CardTitle>
                                <p className="text-xs text-ink-muted">{testimonial.role}</p>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="text-ink-secondary italic text-sm leading-relaxed">"{testimonial.content}"</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
