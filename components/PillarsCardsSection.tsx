import Link from "next/link"; // Keeping next/link for now as no explicit locale routing was used in original, but should ideally be i18n link if needed. Reverting to i18n link for consistency.
import { Link as I18nLink } from "@/i18n/navigation";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";

export function PillarsCardsSection() {
    const t = useTranslations('Pillars');

    return (
        <section id="pillars-teaser" className="py-16 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <I18nLink href="/best-private-and-public-international-schools-portugal-2026">
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-blue-600">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold mb-2">{t('educationTitle')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-slate-600">
                                {t('educationDesc')}
                            </p>
                        </CardContent>
                    </Card>
                </I18nLink>
                <I18nLink href="/family-friendly-neighborhoods-portugal">
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-teal-600">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold mb-2">{t('livingTitle')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-slate-600">
                                {t('livingDesc')}
                            </p>
                        </CardContent>
                    </Card>
                </I18nLink>
                <I18nLink href="/family-relocation-guide-2026">
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-amber-500">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold mb-2">{t('softLandingTitle')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-slate-600">
                                {t('softLandingDesc')}
                            </p>
                        </CardContent>
                    </Card>
                </I18nLink>
            </div>
        </section>
    );
}
