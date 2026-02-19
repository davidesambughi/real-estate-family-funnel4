import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Header() {
    const t = useTranslations('Navigation');

    const navItems = [
        { href: "/", label: t('home') },
        { href: "/best-private-and-public-international-schools-portugal-2026", label: "Schools" }, // TODO: Add translation keys
        { href: "/family-friendly-neighborhoods-portugal", label: "Neighborhoods" }, // TODO: Add translation keys
        { href: "/family-relocation-guide-2026", label: "Guides" }, // TODO: Add translation keys
        { href: "/school-finder", label: "School Finder" }, // TODO: Add translation keys
        { href: "/about", label: t('about') },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight text-primary">TrustFamily</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href as any}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <div className="hidden md:block">
                        <LanguageSwitcher />
                    </div>

                    {/* Mobile Navigation */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-4 mt-8">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href as any}
                                        className="text-lg font-medium hover:text-primary transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <div className="mt-4 pt-4 border-t">
                                    <LanguageSwitcher />
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
