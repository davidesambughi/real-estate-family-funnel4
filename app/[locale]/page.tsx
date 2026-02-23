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

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TrustFamily Relocation",
    "url": process.env.NEXT_PUBLIC_BASE_URL || "https://trustfamily.com",
    "logo": "https://trustfamily.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-234-567-890",
      "contactType": "Customer Service"
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      <JsonLd data={organizationSchema} />
      <Hero />
      <PillarsCardsSection />
      <QuizSection locale={locale} />
      {/* Respiro — Quiz → Lead Magnet */}
      <div className="relative w-full aspect-[21/9] overflow-hidden">
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
