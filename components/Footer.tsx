import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-8 px-6 mt-auto bg-background border-t">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <Link href="/" className="text-xl font-bold mb-2 block">LOGO AND NAME</Link>
                    <p className="text-muted-foreground">Trust-first platform for expat families relocating to Portugal.</p>
                </div>
                <div className="flex flex-col gap-2">
                    <Link href="/best-private-and-public-international-schools-portugal-2026" className="hover:underline hover:text-primary transition-colors">Schools</Link>
                    <Link href="/family-friendly-neighborhoods-portugal" className="hover:underline hover:text-primary transition-colors">Neighborhoods</Link>
                    <Link href="/family-relocation-guide-2026" className="hover:underline hover:text-primary transition-colors">Relocation Guide</Link>
                    <Link href="/school-finder" className="hover:underline hover:text-primary transition-colors">School Finder</Link>
                </div>
                <div className="flex flex-col gap-2">
                    <Link href="/about" className="hover:underline hover:text-primary transition-colors">About Us</Link>
                    <Link href="/contact" className="hover:underline hover:text-primary transition-colors">Contact</Link>
                </div>
                <div className="flex flex-col gap-2">
                    <Link href="/privacy" className="hover:underline hover:text-primary transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:underline hover:text-primary transition-colors">Terms of Service</Link>
                    <p className="text-sm text-muted-foreground">© 2026 Relocate Portugal Insights</p>
                </div>
            </div>
        </footer>
    );
}
