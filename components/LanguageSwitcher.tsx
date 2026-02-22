'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const localeLabels: Record<string, string> = {
    en: 'EN',
    pt: 'PT',
    de: 'DE',
    fr: 'FR',
    nl: 'NL',
    es: 'ES',
};

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // `pathname` from usePathname() is always the current page's route key,
        // so it's safe to cast — next-intl's types don't unify static and dynamic overloads.
        router.replace(pathname as never, { locale: e.target.value });
    };

    return (
        <select
            value={locale}
            onChange={handleChange}
            className="text-sm bg-transparent border border-input rounded-md px-2 py-1 cursor-pointer hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Select language"
        >
            {routing.locales.map((loc) => (
                <option key={loc} value={loc}>
                    {localeLabels[loc]}
                </option>
            ))}
        </select>
    );
}
