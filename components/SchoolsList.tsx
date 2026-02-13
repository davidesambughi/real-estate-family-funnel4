import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { schoolsData } from "@/lib/schools-data";
import { MapPin, GraduationCap, Coins } from "lucide-react";

export function SchoolsList() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schoolsData.map((school) => (
                <Card key={school.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle>{school.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                            <MapPin className="h-4 w-4" /> {school.location}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                            {school.description}
                        </p>
                        <div className="flex flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4 text-blue-500" />
                                <span className="font-medium">Curriculum:</span> {school.curriculum}
                            </div>
                            <div className="flex items-center gap-2">
                                <Coins className="h-4 w-4 text-yellow-500" />
                                <span className="font-medium">Fees:</span> {school.fees}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full">
                            <Link href={`/schools/${school.slug}`}>
                                View Details
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
