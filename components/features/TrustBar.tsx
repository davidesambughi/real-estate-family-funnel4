import { ShieldCheck, UserCheck, CalendarCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export function TrustBar() {
    const t = useTranslations('TrustBar');

    return (
        <div className="w-full bg-slate-50 border-y border-slate-200 py-4">
            <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-4 text-sm md:text-base text-slate-600">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{t('independent')}</span>
                </div>
                <div className="hidden md:block w-px h-6 bg-slate-300" />
                <div className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-blue-600" />
                    <span>{t('validated')}</span>
                </div>
                <div className="hidden md:block w-px h-6 bg-slate-300" />
                <div className="flex items-center gap-2">
                    <CalendarCheck className="h-5 w-5 text-blue-600" />
                    <span>{t('updated')}</span>
                </div>
            </div>
        </div>
    );
}
