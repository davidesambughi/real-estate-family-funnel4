"use client";

import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";
import { getBreadcrumbPath } from "@/lib/breadcrumbs";

export function Breadcrumbs() {
    const pathname = usePathname();
    const locale = useLocale();

    // Don't show breadcrumbs on home page
    if (pathname === "/") return null;

    const pathSegments = pathname.split("/").filter((segment) => segment);

    return (
        <nav className="flex items-center text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
            {/* BreadcrumbList JSON-LD is rendered server-side by each page via <JsonLd> */}
            <ol className="flex items-center space-x-2">
                <li>
                    <Link href="/" className="hover:text-foreground transition-colors">
                        Home
                    </Link>
                </li>

                {pathSegments.map((segment, index) => {
                    // Reconstruct path for next-intl Link
                    let href = `/${pathSegments.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathSegments.length - 1;

                    // Use centralized mapping for parent routes
                    const mappedPath = getBreadcrumbPath(segment);
                    if (mappedPath) {
                        href = mappedPath;
                    }

                    // Format segment for display
                    const formatSegment = (str: string) => {
                        return str
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (char) => char.toUpperCase());
                    };

                    return (
                        <li key={segment} className="flex items-center">
                            <ChevronRight className="h-4 w-4 mx-2" />
                            {isLast ? (
                                <span className="font-medium text-foreground" aria-current="page">
                                    {formatSegment(segment)}
                                </span>
                            ) : (
                                <Link href={href as any} className="hover:text-foreground transition-colors">
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
