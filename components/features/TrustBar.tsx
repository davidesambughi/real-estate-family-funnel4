import { ShieldCheck, UserCheck, CalendarCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export function TrustBar() {
    const t = useTranslations('TrustBar');

    return (
        <div className="w-full border-y border-border/60 py-4">
            <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-6">
                <div className="flex items-center gap-2.5">
                    <ShieldCheck className="h-4 w-4 text-trust shrink-0" />
                    <span className="text-body-sm font-medium text-ink-secondary tracking-wide">{t('independent')}</span>
                </div>
                <div className="hidden md:block w-px h-5 bg-border" />
                <div className="flex items-center gap-2.5">
                    <UserCheck className="h-4 w-4 text-trust shrink-0" />
                    <span className="text-body-sm text-ink-secondary">{t('validated')}</span>
                </div>
                <div className="hidden md:block w-px h-5 bg-border" />
                <div className="flex items-center gap-2.5">
                    <CalendarCheck className="h-4 w-4 text-trust shrink-0" />
                    <span className="text-body-sm text-ink-secondary">{t('updated')}</span>
                </div>
            </div>
        </div>
    );
}
