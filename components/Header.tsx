import { Link } from "@/i18n/navigation";

export function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-background border-b">
            <div className="flex items-center">
                <Link href="/" className="text-xl font-bold">
                    LOGO
                </Link>
            </div>
            <nav className="flex gap-6 items-center">
                <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                    Home
                </Link>
                <Link href="/best-private-and-public-international-schools-portugal-2026" className="text-sm font-medium hover:text-primary transition-colors">
                    Schools
                </Link>
                <Link href="/family-friendly-neighborhoods-portugal" className="text-sm font-medium hover:text-primary transition-colors">
                    Neighborhoods
                </Link>
                <Link href="/family-relocation-guide-2026" className="text-sm font-medium hover:text-primary transition-colors">
                    Guides
                </Link>
                <Link href="/school-finder" className="text-sm font-medium hover:text-primary transition-colors">
                    School Finder
                </Link>
                <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                    About
                </Link>
            </nav>
            <div className="flex items-center gap-4">
                {/* Placeholder for optional CTA button */}
            </div>
        </header>
    );
}
