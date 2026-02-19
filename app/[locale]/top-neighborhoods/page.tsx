import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { NeighborhoodsList } from "@/components/NeighborhoodsList";

export default function Page() {
    return (
        <div className="container mx-auto py-12 px-6">
            <Breadcrumbs />
            <h1 className="text-4xl font-bold mb-6">Family Friendly Neighborhoods Portugal 2026</h1>
            <p className="mb-4">KEYWORDS : family friendly neighborhoods Lisbon Portugal,
                best areas to live Portugal with kids expats
            </p>
            <p className="mb-12">KEY CONTENT : Focus Lisbon + suburbs (Campo de Ourique, Alvalade,
                Estrela, Parque das Nações, Cascais/Estoril, Oeiras),
                Algarve, Porto. Parchi, sicurezza, vicinanza scuole internazionali,
                vibe expat, costi affitto/case.
            </p>

            <NeighborhoodsList />


            <section className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Nearby International Schools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link href="/best-private-and-public-international-schools-portugal-2026">
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardHeader>
                                <CardTitle>Top Schools near Lisbon</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Explore curriculum options in the Lisbon area.</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/best-private-and-public-international-schools-portugal-2026">
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardHeader>
                                <CardTitle>Schools in Cascais</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Find the best education options on the coast.</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}
