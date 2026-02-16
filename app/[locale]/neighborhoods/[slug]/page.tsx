import { notFound } from "next/navigation";
import Link from "next/link";
import { neighborhoodsData } from "@/lib/neighborhoods-data";
import { schoolsData } from "@/lib/schools-data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Check, GraduationCap, Coins } from "lucide-react";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate static params for all neighborhoods
export function generateStaticParams() {
    return neighborhoodsData.map((n) => ({
        slug: n.slug,
    }));
}

export default async function NeighborhoodDetailPage(props: PageProps) {
    const params = await props.params;
    const neighborhood = neighborhoodsData.find((n) => n.slug === params.slug);

    if (!neighborhood) {
        notFound();
    }

    // Find schools in this neighborhood
    const schoolsInArea = schoolsData.filter((s) => s.neighborhoodSlug === neighborhood.slug);

    return (
        <div className="container mx-auto py-12 px-6">
            <Breadcrumbs />

            <div className="flex flex-col md:flex-row gap-8 justify-between items-start mb-8">
                <div>
                    <h1 className="text-4xl font-bold mb-2">{neighborhood.name}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-5 w-5" />
                        <span className="text-lg">{neighborhood.location}</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button size="lg">Contact Relocation Expert</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="prose max-w-none">
                        <h2 className="text-2xl font-bold mb-4">About {neighborhood.name}</h2>
                        <p className="text-lg leading-relaxed text-muted-foreground">{neighborhood.description}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Why Families Love It</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {neighborhood.highlights.map((highlight, index) => (
                                <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                                    <Check className="h-5 w-5 text-green-600" />
                                    <span className="font-medium">{highlight}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Schools in {neighborhood.name}</h2>
                        {schoolsInArea.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6">
                                {schoolsInArea.map((school) => (
                                    <Card key={school.id} className="hover:shadow-md transition-shadow">
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle>{school.name}</CardTitle>
                                                    <CardDescription className="flex items-center gap-1 mt-1">
                                                        <MapPin className="h-4 w-4" /> {school.location}
                                                    </CardDescription>
                                                </div>
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/schools/${school.slug}`}>View School</Link>
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <GraduationCap className="h-4 w-4" />
                                                    {school.curriculum}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Coins className="h-4 w-4" />
                                                    {school.fees}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground italic">No international schools listed specifically in this neighborhood yet. Check nearby areas.</p>
                        )}
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card className="bg-blue-50 border-blue-100">
                        <CardHeader>
                            <CardTitle className="text-blue-900">Vibe Check</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg font-medium text-blue-800 mb-2">
                                {neighborhood.vibe}
                            </p>
                            <p className="text-sm text-blue-700">
                                Perfect for families looking for a specific lifestyle.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
