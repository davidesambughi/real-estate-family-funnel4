"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations('Locale');

    const handleValueChange = (nextLocale: string) => {
        // Cast pathname to any to bypass strict typing issues with dynamic route unions
        // The runtime behavior of next-intl handles this correctly
        router.replace(pathname as any, { locale: nextLocale });
    };

    const FlagIcon = ({ code }: { code: string }) => {
        switch (code) {
            case 'en': return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-5 h-3.5 object-cover rounded-sm border border-slate-200">
                    <path fill="#012169" d="M0 0h640v480H0z" />
                    <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-179L0 62V0h75z" />
                    <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z" />
                    <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z" />
                    <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" />
                </svg>
            );
            case 'pt': return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-5 h-3.5 object-cover rounded-sm border border-slate-200">
                    <path fill="#e03c31" d="M240 0h400v480H240z" />
                    <path fill="#006600" d="M0 0h240v480H0z" />
                    <path fill="#f1b434" d="M240 80c0 0 80 0 80 80s-30 80-80 80c-50 0-80-80-80-80s80-80 80-80z" />
                    <circle cx="240" cy="180" r="40" fill="#fff" />
                    <path fill="#000099" d="M220 160h40v40h-40z" />
                </svg>
            );
            case 'de': return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-5 h-3.5 object-cover rounded-sm border border-slate-200">
                    <path fill="#ffce00" d="M0 320h640v160H0z" />
                    <path fill="#000" d="M0 0h640v160H0z" />
                    <path fill="#d00" d="M0 160h640v160H0z" />
                </svg>
            );
            case 'fr': return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-5 h-3.5 object-cover rounded-sm border border-slate-200">
                    <path fill="#fff" d="M0 0h640v480H0z" />
                    <path fill="#002395" d="M0 0h213.3v480H0z" />
                    <path fill="#ed2939" d="M426.7 0H640v480H426.7z" />
                </svg>
            );
            case 'nl': return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-5 h-3.5 object-cover rounded-sm border border-slate-200">
                    <path fill="#21468b" d="M0 320h640v160H0z" />
                    <path fill="#fff" d="M0 160h640v160H0z" />
                    <path fill="#ae1c28" d="M0 0h640v160H0z" />
                </svg>
            );
            case 'es': return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-5 h-3.5 object-cover rounded-sm border border-slate-200">
                    <path fill="#c60b1e" d="M0 0h640v480H0z" />
                    <path fill="#ffc400" d="M0 120h640v240H0z" />
                </svg>
            );
            default: return null;
        }
    };

    return (
        <Select defaultValue={locale} onValueChange={handleValueChange}>
            <SelectTrigger className="w-auto gap-2 border-none shadow-none font-medium text-slate-600 hover:text-slate-900 focus:ring-0 px-2 bg-transparent">
                <div className="flex items-center gap-2">
                    <FlagIcon code={locale} />
                    <span className="uppercase text-xs font-bold tracking-wide">{locale}</span>
                </div>
            </SelectTrigger>
            <SelectContent align="end" className="w-[180px]" position="popper">
                {routing.locales.map((cur: string) => (
                    <SelectItem key={cur} value={cur} className="cursor-pointer">
                        <div className="flex items-center gap-3">
                            <FlagIcon code={cur} />
                            <span className="text-sm">{t(cur)}</span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
