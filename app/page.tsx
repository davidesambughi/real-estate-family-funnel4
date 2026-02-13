import Hero from "@/components/Hero";
import { PillarsCardsSection } from "@/components/PillarsCardsSection";
import { LeadMagnetSection } from "@/components/LeadMagnetSection";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <PillarsCardsSection />
      <LeadMagnetSection />
      <Testimonials />

    </main>
  );
}
