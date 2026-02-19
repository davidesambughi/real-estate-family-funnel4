import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

/**
 * P11 — Locale-aware 404 Not Found page.
 * Next.js renders this when no route matches within the [locale] segment.
 * This is a Server Component — no 'use client' needed.
 */
export default function NotFound() {
    // Note: useTranslations is available here because this file lives inside
    // the [locale] layout, which wraps it with NextIntlClientProvider.
    // However, not-found.tsx runs as a Server Component, so we use the
    // server-side hook pattern here.
    const t = useTranslations('NotFound');

    return (
        <main className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
            <p className="text-7xl font-black text-primary mb-4">404</p>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">{t('title')}</h1>
            <p className="text-lg text-slate-500 max-w-md mb-8">{t('description')}</p>
            <Link
                href="/"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
                {t('backHome')}
            </Link>
        </main>
    );
}
