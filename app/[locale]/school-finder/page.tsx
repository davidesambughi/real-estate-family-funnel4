import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function SchoolFinderPage() {
    return (
        <div className="container mx-auto py-12 px-6">
            <Breadcrumbs />
            <h1 className="text-4xl font-bold mb-6">School Finder Tool</h1>
            <p className="text-xl text-muted-foreground mb-8">
                Find the perfect school for your child based on curriculum, location, and budget.
            </p>

            <Card className="max-w-2xl mx-auto text-center py-12">
                <CardHeader>
                    <CardTitle className="text-2xl">Coming Soon</CardTitle>
                    <CardDescription>
                        We are building a comprehensive tool to help you compare international schools in Portugal.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="mb-6">
                        In the meantime, explore our curated list of top schools or contact us for personalized assistance.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button asChild>
                            <Link href="/best-private-and-public-international-schools-portugal-2026">
                                Browse Top Schools
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/contact">
                                Contact Us
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
