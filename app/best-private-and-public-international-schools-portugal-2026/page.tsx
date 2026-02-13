import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SchoolsList } from "@/components/SchoolsList";

export default function Page() {
    return (
        <div className="container mx-auto py-12 px-6">
            <Breadcrumbs />
            <h1 className="text-4xl font-bold mb-6">Best Private and Public International Schools Portugal 2026</h1>
            <p className="mb-4"> KEYWORDS :  best international schools Portugal, top private schools Portugal expats</p>
            <p className="mb-12"> KEY CONTENT : Lista top 15–20 scuole (da fonti
                come International Schools Database,
                St. Julian’s, Oeiras, United Lisbon, Carlucci American,
                CLIP Porto, Nobel Algarve…),
                curricula (IB/British/American), fees 2025/26,
                locations, pros/cons, come scegliere per expat. </p>

            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-8">Featured International Schools</h2>
                <SchoolsList />
            </section>

            <section className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Related Neighborhoods</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href="/family-friendly-neighborhoods-portugal">
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardHeader>
                                <CardTitle>Lisbon & Suburbs</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Short commute to St. Julian's and United Lisbon.</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/family-friendly-neighborhoods-portugal">
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardHeader>
                                <CardTitle>Cascais & Estoril</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Coastal living near top international schools.</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}
