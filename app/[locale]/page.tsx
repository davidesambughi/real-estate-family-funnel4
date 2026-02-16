import Hero from "@/components/Hero";
import { PillarsCardsSection } from "@/components/PillarsCardsSection";
import { LeadMagnetSection } from "@/components/LeadMagnetSection";
import { Testimonials } from "@/components/Testimonials";
import { JsonLd } from "@/components/JsonLd";

export default function Home() {
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
      <LeadMagnetSection />
      <Testimonials />
    </main>
  );
}
