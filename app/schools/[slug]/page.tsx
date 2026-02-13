import { notFound } from "next/navigation";
import Link from "next/link";
import { schoolsData } from "@/lib/schools-data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, MapPin, GraduationCap, Coins } from "lucide-react";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate static params for all schools
export function generateStaticParams() {
    return schoolsData.map((school) => ({
        slug: school.slug,
    }));
}

export default async function SchoolDetailPage(props: PageProps) {
    const params = await props.params;
    const school = schoolsData.find((s) => s.slug === params.slug);

    if (!school) {
        console.log("School not found for slug:", params.slug);
        notFound();
    }

    return (
        <div className="container mx-auto py-12 px-6">
            <Breadcrumbs />

            <div className="flex flex-col md:flex-row gap-8 justify-between items-start mb-8">
                <div>
                    <h1 className="text-4xl font-bold mb-2">{school.name}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-5 w-5" />
                        <span className="text-lg">{school.location}</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button size="lg">Contact School Advisor</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="prose max-w-none">
                        <h2 className="text-2xl font-bold mb-4">About the School</h2>
                        <p className="text-lg leading-relaxed text-muted-foreground">{school.description}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Key Highlights</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {school.highlights.map((highlight, index) => (
                                <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                                    <Check className="h-5 w-5 text-green-600" />
                                    <span className="font-medium">{highlight}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>School Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                                    <GraduationCap className="h-4 w-4" />
                                    <span className="text-sm font-medium">Curriculum</span>
                                </div>
                                <p className="font-medium">{school.curriculum}</p>
                            </div>
                            <div className="border-t pt-4">
                                <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                                    <Coins className="h-4 w-4" />
                                    <span className="text-sm font-medium">Annual Fees</span>
                                </div>
                                <p className="font-medium">{school.fees}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-blue-50 border-blue-100">
                        <CardHeader>
                            <CardTitle className="text-blue-900">Neighborhood Match</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-blue-800 mb-4">
                                Looking for a home near {school.name}? Check out our guide to {school.neighborhoodSlug}.
                            </p>
                            <Button variant="outline" className="w-full bg-white text-blue-900 border-blue-200 hover:bg-blue-100" asChild>
                                <Link href={`/neighborhoods/${school.neighborhoodSlug}`}>
                                    Explore {school.neighborhoodSlug}
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
