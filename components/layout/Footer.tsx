import { Link } from "@/i18n/navigation";

export default function Footer() {
    return (
        <footer className="py-12 px-6 mt-auto bg-slate-900 text-slate-300">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Brand */}
                <div>
                    <Link href="/" className="text-xl font-bold text-white mb-3 block tracking-tight">
                        TrustFamily
                    </Link>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Independent intelligence for families relocating to Portugal.
                        We verify schools and neighborhoods so you can move with confidence.
                    </p>
                    <p className="text-slate-500 text-xs mt-4">
                        100% independent · No paid placements
                    </p>
                </div>

                {/* Explore */}
                <div>
                    <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Explore</h3>
                    <div className="flex flex-col gap-2 text-sm">
                        <Link href="/best-private-and-public-international-schools-portugal-2026" className="hover:text-white transition-colors">
                            International Schools
                        </Link>
                        <Link href="/top-neighborhoods" className="hover:text-white transition-colors">
                            Family Neighborhoods
                        </Link>
                        <Link href="/relocation-guide" className="hover:text-white transition-colors">
                            Relocation Guide
                        </Link>
                        <Link href="/school-finder" className="hover:text-white transition-colors">
                            School Finder Quiz
                        </Link>
                        <Link href="/blog" className="hover:text-white transition-colors">
                            Blog & Guides
                        </Link>
                    </div>
                </div>

                {/* Company */}
                <div>
                    <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Company</h3>
                    <div className="flex flex-col gap-2 text-sm">
                        <Link href="/about" className="hover:text-white transition-colors">
                            About TrustFamily
                        </Link>
                        <Link href="/contact" className="hover:text-white transition-colors">
                            Contact Us
                        </Link>
                    </div>
                </div>

                {/* Legal */}
                <div>
                    <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Legal</h3>
                    <div className="flex flex-col gap-2 text-sm">
                        <Link href="/privacy" className="hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                    <p className="text-slate-500 text-xs mt-6">
                        © {new Date().getFullYear()} TrustFamily.<br />
                        All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
