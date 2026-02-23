import Image from "next/image";
import { Link as I18nLink } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

const pillars = [
    {
        href: "/best-private-and-public-international-schools-portugal-2026" as const,
        titleKey: "educationTitle" as const,
        descKey: "educationDesc" as const,
        accentClass: "bg-brand",
        img: "/school-card-img.png",
        imgAlt: "International school campus in Portugal — TrustFamily schools guide",
    },
    {
        href: "/top-neighborhoods" as const,
        titleKey: "livingTitle" as const,
        descKey: "livingDesc" as const,
        accentClass: "bg-trust",
        img: "/neighborhood-card-img.png",
        imgAlt: "Family-friendly neighborhood in Cascais, Portugal — TrustFamily neighborhoods guide",
    },
    {
        href: "/relocation-guide" as const,
        titleKey: "softLandingTitle" as const,
        descKey: "softLandingDesc" as const,
        accentClass: "bg-warm",
        img: "/guides-card-img.png",
        imgAlt: "Family relocating to Portugal — TrustFamily relocation guide 2026",
    },
];

export function PillarsCardsSection() {
    const t = useTranslations('Pillars');

    return (
        <section id="pillars-teaser" className="py-20 px-6 bg-surface-subtle">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {pillars.map(({ href, titleKey, descKey, accentClass, img, imgAlt }) => (
                    <I18nLink key={href} href={href} className="group block h-full">
                        <Card className="h-full cursor-pointer overflow-hidden">
                            {/* Card image */}
                            <div className="relative w-full aspect-video overflow-hidden">
                                <Image
                                    src={img}
                                    alt={imgAlt}
                                    fill
                                    loading="lazy"
                                    sizes="(max-width: 768px) calc(100vw - 48px), 400px"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
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
