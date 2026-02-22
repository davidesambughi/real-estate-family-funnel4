import { Link as I18nLink } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

const pillars = [
    {
        href: "/best-private-and-public-international-schools-portugal-2026",
        titleKey: "educationTitle" as const,
        descKey: "educationDesc" as const,
        accentClass: "bg-brand",
    },
    {
        href: "/top-neighborhoods",
        titleKey: "livingTitle" as const,
        descKey: "livingDesc" as const,
        accentClass: "bg-trust",
    },
    {
        href: "/relocation-guide",
        titleKey: "softLandingTitle" as const,
        descKey: "softLandingDesc" as const,
        accentClass: "bg-warm",
    },
];

export function PillarsCardsSection() {
    const t = useTranslations('Pillars');

    return (
        <section id="pillars-teaser" className="py-20 px-6 bg-surface-subtle">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {pillars.map(({ href, titleKey, descKey, accentClass }) => (
                    <I18nLink key={href} href={href} className="group block h-full">
                        <Card className="h-full cursor-pointer overflow-hidden">
                            {/* Thin editorial accent bar */}
                            <div className={`h-[3px] w-full ${accentClass}`} />
                            <CardContent className="p-6 flex flex-col h-full">
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="font-serif font-semibold text-h3 text-ink-primary leading-tight">
                                        {t(titleKey)}
                                    </h3>
                                    <span className="text-ink-muted ml-3 mt-1 translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300 text-body">
                                        →
                                    </span>
                                </div>
                                <p className="text-ink-secondary leading-relaxed text-body-sm">
                                    {t(descKey)}
                                </p>
                            </CardContent>
                        </Card>
                    </I18nLink>
                ))}
            </div>
        </section>
    );
}
