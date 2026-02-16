import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  // Base URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  // Generate alternates for all locales
  // Note: For a real production app, you might want to map the current path to other locales
  // using navigation.ts / getPathname helpers if available server-side,
  // or construct it if the structure is known. 
  // Since we are in the root layout, we might not know the *exact* deep path for every page 
  // easily without context of the children.
  // HOWEVER, for `layout.tsx`, implementing a generic alternate strategy that just points to roots
  // is often insufficient for deep linking.
  // BUT, `generateMetadata` receives `params`.
  // Ideally, each PAGE should handle its own alternates if the path structure varies significantly (slug translation).
  // For now, we will add a placeholder or simple strategy.

  // Actually, next-intl docs recommend setting `alternates` here if possible.
  // But without the current pathname (slugs), we can't generate deep links easily here.
  // We'll leave the title/description and let individual pages override alternates OR
  // rely on the sitemap for definitive hreflang (Google uses both).

  // Improving: Basic alternates for the root of the locale.
  // If we are on a layout, we don't know the segment. 
  // Retaining title/desc only for now as 'alternates' requires more context (slugs) usually found in page.tsx.

  return {
    title: t('title'),
    description: t('description'),
    // alternates: {
    //   languages: {
    //     'en': `${baseUrl}/en`,
    //     'pt': `${baseUrl}/pt`,
    //     // ...
    //   }
    // }
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${outfit.variable} antialiased font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
