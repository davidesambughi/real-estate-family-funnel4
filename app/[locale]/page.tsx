import Image from "next/image";
import Hero from "@/components/features/Hero";
import { PillarsCardsSection } from "@/components/features/PillarsCardsSection";
import { LeadMagnetSection } from "@/components/features/LeadMagnetSection";
import { QuizSection } from "@/components/features/quiz/QuizSection";
import { Testimonials } from "@/components/features/Testimonials";
import { JsonLd } from "@/components/JsonLd";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://trustfamily.com';

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `${base}/${locale}`,
      siteName: "TrustFamily",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://trustfamily.com";

  // Organization schema — primary entity for the site
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TrustFamily",
    "url": base,
    "logo": {
      "@type": "ImageObject",
      "url": `${base}/logo.png`,
      "width": 200,
      "height": 60,
    },
    "description": "Independent intelligence platform for international families relocating to Portugal. Verified school comparisons, neighborhood guides, and relocation resources.",
    "foundingDate": "2024",
    "areaServed": "PT",
    "knowsAbout": [
      "International schools in Portugal",
      "Family relocation to Portugal",
      "Expat neighborhoods Lisbon",
      "IB British American curriculum comparison",
    ],
    // sameAs: add social/directory profiles when available
    // "sameAs": ["https://www.linkedin.com/company/trustfamily", "https://twitter.com/trustfamilypt"],
  };

  // WebSite schema — enables Google Sitelinks Search Box + AI engine entity recognition
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "TrustFamily",
    "url": base,
    "description": "Independent intelligence for families relocating to Portugal — verified school comparisons, neighborhood guides, and relocation resources.",
    "inLanguage": ["en", "pt", "de", "fr", "nl", "es"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${base}/en/school-finder?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <main className="flex flex-col min-h-screen">
      <JsonLd data={organizationSchema} />
      <JsonLd data={webSiteSchema} />
      <Hero />
      <PillarsCardsSection />
      <QuizSection locale={locale} />
      {/* Respiro — Quiz → Lead Magnet */}
      <div className="relative w-full aspect-21/9 overflow-hidden">
        <Image
          src="/homepage-respiro-img.png"
          alt="Family life in Portugal — TrustFamily relocation"
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <LeadMagnetSection locale={locale} />
      <Testimonials />
    </main>
  );
}
