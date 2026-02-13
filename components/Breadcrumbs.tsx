"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs() {
    const pathname = usePathname();

    // Don't show breadcrumbs on home page
    if (pathname === "/") return null;

    const pathSegments = pathname.split("/").filter((segment) => segment);

    return (
        <nav className="flex items-center text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
                <li>
                    <Link href="/" className="hover:text-foreground transition-colors">
                        Home
                    </Link>
                </li>
                {pathSegments.map((segment, index) => {
                    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathSegments.length - 1;

                    // Format segment for display (replace hyphens with spaces and capitalize)
                    const formatSegment = (str: string) => {
                        return str
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (char) => char.toUpperCase());
                    };

                    // Handle dynamic school names (pretty print)
                    // If we are on a school detail page, the last segment is the slug
                    // We can try to make it look nicer by replacing hyphens, but ideally we'd fetch the name.
                    // For now, formatter is good enough.
                    // Custom mapping for pillar pages
                    let targetHref = href;
                    if (segment === "schools") {
                        targetHref = "/best-private-and-public-international-schools-portugal-2026";
                    } else if (segment === "neighborhoods") {
                        targetHref = "/family-friendly-neighborhoods-portugal";
                    }

                    return (
                        <li key={segment} className="flex items-center">
                            <ChevronRight className="h-4 w-4 mx-2" />
                            {isLast ? (
                                <span className="font-medium text-foreground" aria-current="page">
                                    {formatSegment(segment)}
                                </span>
                            ) : (
                                <Link href={targetHref} className="hover:text-foreground transition-colors">
                                    {formatSegment(segment)}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
