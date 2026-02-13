import Link from "next/link";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function PillarsCardsSection() {
    return (
        <section id="pillars-teaser" className="py-16 px-6">
            <h3 className="text-3xl font-bold mb-4"> SECTION CARDS WITH PILLARS</h3>
            <p className="text-lg max-w-3xl mx-auto mb-8"> DESCRIPTION PARAGRAPH 2 SOLUTION & INTRODUCING THE THREE PILLARS
            </p>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <Link href="/best-private-and-public-international-schools-portugal-2026">
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold mb-2">Top International & Private Schools in Portugal</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">
                                In-depth reviews of the best schools across Portugal, including IB, British, and American curricula in Lisbon, Cascais, Porto, and Algarve. Find the perfect fit for your children's education during relocation.
                            </p>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/family-friendly-neighborhoods-portugal">
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold mb-2">Family-Friendly Neighborhoods in Portugal</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">
                                Guides to safe, vibrant areas ideal for expat families, with details on parks, proximity to schools, and community vibes in regions like Lisbon suburbs and beyond.
                            </p>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/family-relocation-guide-2026">
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold mb-2">Relocation Guide for Families to Portugal</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">
                                Step-by-step advice on visas, costs of living, housing, and integration, tailored for families prioritizing education and lifestyle in Portugal.
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </section>
    );
}
