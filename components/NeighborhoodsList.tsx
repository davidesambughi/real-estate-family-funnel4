import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { neighborhoodsData } from "@/lib/neighborhoods-data";
import { MapPin } from "lucide-react";

export function NeighborhoodsList() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhoodsData.map((neighborhood) => (
                <Card key={neighborhood.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle>{neighborhood.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                            <MapPin className="h-4 w-4" /> {neighborhood.location}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                            {neighborhood.description}
                        </p>
                        <div className="text-sm font-medium text-blue-600 bg-blue-50 inline-block px-2 py-1 rounded">
                            Vibe: {neighborhood.vibe}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full" variant="outline">
                            <Link href={`/neighborhoods/${neighborhood.slug}`}>
                                Explore Area
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
