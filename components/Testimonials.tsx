import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Relocated from London",
        content: "TrustFamily made our move to Lisbon incredibly smooth. Finding a school for our two kids was my biggest worry, but their school finder tool was a lifesaver.",
        rating: 5,
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Tech Entrepreneur",
        content: "The neighborhood guides are spot on. We chose Campo de Ourique based on the recommendation and it's exactly the village vibe we were looking for.",
        rating: 5,
    },
    {
        id: 3,
        name: "Elena Rossi",
        role: "Expat Mom",
        content: "I was overwhelmed by the options. having a clear comparison of curriculums and fees helped us choose St. Julian's with confidence. Highly recommended!",
        rating: 4,
    },
    {
        id: 4,
        name: "David Smith",
        role: "Digital Nomad Family",
        content: "Great resource for families. We needed clarity on the visa process and school locations. This site provided both in a very easy to understand format.",
        rating: 5,
    },
    {
        id: 5,
        name: "Jessica & Tom",
        role: "Moved from USA",
        content: "Moving from New York to Cascais was a huge change. The relocation guide helped us navigate the bureaucracy and settle in much faster than expected.",
        rating: 5,
    },
    {
        id: 6,
        name: "Lars Jensen",
        role: "From Copenhagen",
        content: "Professional and reliable information. The school reviews are detailed and honest. It felt like having a local friend guiding us through the process.",
        rating: 4,
    },
];

export function Testimonials() {
    return (
        <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-4">Trusted by Families</h2>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Hear from families who have successfully relocated and settled in Portugal using our guides and tools.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.id} className="h-full flex flex-col hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
