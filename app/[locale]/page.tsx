/**
 * Homepage — single editorial article.
 *
 * Architecture: one <article> wraps the entire page. Prose flows continuously
 * from top to bottom. Interactive components (QuizSection, LeadMagnetSection)
 * and editorial components (Hero, PillarsCardsSection, Testimonials) are
 * embedded within the article prose — not stacked as autonomous sections.
 *
 * Editorial prose: English only (consistent with pillar pages).
 * Translated UI text lives in the sub-components via useTranslations.
 *
 * SEO: H1 in Hero (via i18n). H2s on prose sections carry keyword variants.
 * GEO: each paragraph is a citable, self-contained unit. Key entities
 *      (schools, neighborhoods, visas, statistics) are named explicitly.
 */

import Image from "next/image";
import Hero from "@/components/features/Hero";
import { PillarsCardsSection } from "@/components/features/PillarsCardsSection";
import { LeadMagnetSection } from "@/components/features/LeadMagnetSection";
import { QuizSection } from "@/components/features/quiz/QuizSection";
import { Testimonials } from "@/components/features/Testimonials";
import { JsonLd } from "@/components/JsonLd";
import { Link as I18nLink } from "@/i18n/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const revalidate = 3600;

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
    // TODO: add real social profile URLs before launch
    "sameAs": [
      "https://www.linkedin.com/company/trustfamily",
    ],
  };

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
    <main>
      <JsonLd data={organizationSchema} />
      <JsonLd data={webSiteSchema} />

      {/*
        ══════════════════════════════════════════════════════════════
        THE ARTICLE — single continuous editorial flow.
        Every element below is part of one magazine article.
        The reader encounters Hero → Prose → Pillars → Prose → Quiz →
        Prose → LeadMagnet → Prose → Testimonials by reading, not clicking.
        ══════════════════════════════════════════════════════════════
      */}
      <article className="overflow-x-hidden">

        {/* ── ARTICLE HEADER ─────────────────────────────────────────
            H1 + editorial overline + opening image.
            Hero is an embedded article header, not a standalone section.
        ──────────────────────────────────────────────────────────── */}
        <header className="px-6">
          <div className="max-w-7xl mx-auto">
            <Hero />
          </div>
        </header>

        {/* ── PROSE BLOCK 1: WHY PORTUGAL ────────────────────────────
            Primary keyword: "relocating to Portugal with a family"
            Entities: Portugal, Lisbon, safety ranking, international schools,
            St. Julian's, TASIS, CAISL, United Lisbon, D7, cost of living.
        ──────────────────────────────────────────────────────────── */}
        <div className="px-6 py-16 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 lg:gap-20 items-start">

              {/* Main prose column */}
              <div className="max-w-2xl">
                <h2 id="why-portugal-families" className="article-heading mb-6">
                  Why Portugal has become the first choice for relocating families
                </h2>

                <p className="text-body text-ink-secondary leading-relaxed mb-5">
                  Something shifted around 2022. The data was already pointing in one direction — and by 2024, Portugal had moved from an aspirational destination to the most researched relocation option in Europe among international families with school-age children. The reasons are layered, but they are not accidental, and they are unlikely to reverse.
                </p>

                <p className="text-body text-ink-secondary leading-relaxed mb-5">
                  Relocating to Portugal with a family means landing in a country that ranks among the top seven safest globally (
                    <a
                      href="https://www.economicsandpeace.org/research/global-peace-index/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand underline underline-offset-2 hover:text-brand/80"
                    >
                      Global Peace Index 2025, Institute for Economics and Peace
                    </a>
                  ), records more than 300 sunny days per year in the Lisbon area, and offers a concentration of world-class international schools within a 45-minute radius of a major European capital. That specific combination — safety, climate, education quality, and urban accessibility — does not exist in the same proportion anywhere else on the continent.
                </p>

                <p className="text-body text-ink-secondary leading-relaxed mb-5">
                  The Lisbon area is home to four leading international schools: St.&nbsp;Julian&apos;s School in Carcavelos (British curriculum and IB Diploma), TASIS Portugal and Carlucci American International School (CAISL) in Sintra (American and IB curricula), and United Lisbon International School in Parque das Nações (American and IB). For a family relocating from London, Amsterdam, Munich, or New York, the curriculum compatibility is not a compromise — it is often an upgrade in terms of class size, pastoral care, and international community.
                </p>

                <p className="text-body text-ink-secondary leading-relaxed">
                  The cost asymmetry is real, though frequently misunderstood. Portugal is not inexpensive in absolute terms — particularly when international school fees, which range from €12,000 to €32,000 per child per year, are factored in. What it offers is quality-adjusted value: a lifestyle comparable to the London commuter belt or the Geneva suburbs, at roughly half the total cost of living, in a climate measurably better for outdoor family life.
                </p>
              </div>

              {/* Pull-stat sidebar — desktop only, sticky */}
              <aside className="hidden lg:flex flex-col gap-10 sticky top-24 self-start" aria-label="Key statistics">
                <div>
                  <p className="font-serif text-[68px] font-bold leading-none text-brand/20 select-none" aria-hidden="true">#7</p>
                  <hr className="border-brand/20 my-3" />
                  <p className="text-body-sm text-ink-secondary leading-snug">
                    Portugal&rsquo;s global safety ranking — Global Peace Index 2025. One of the safest countries in the world to raise children.
                  </p>
                </div>
                <div>
                  <p className="font-serif text-[68px] font-bold leading-none text-brand/20 select-none" aria-hidden="true">300+</p>
                  <hr className="border-brand/20 my-3" />
                  <p className="text-body-sm text-ink-secondary leading-snug">
                    Sunny days per year in Lisbon. Atlantic climate — mild winters, warm summers, year-round outdoor life for families.
                  </p>
                </div>
                {/* Editorial image — fills sidebar gap below stats */}
                <div>
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src="/repiro2-img.png"
                      alt="Family in Lisbon, Portugal — TrustFamily relocation 2026"
                      fill
                      loading="lazy"
                      sizes="260px"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-caption text-ink-muted mt-2 leading-snug">
                    Lisbon&rsquo;s waterfront — the setting that families describe as the moment the decision became easy.
                  </p>
                </div>
              </aside>

            </div>
          </div>
        </div>

        {/* ── PILLAR SPREAD ───────────────────────────────────────────
            The three guides appear here as the article's "what we cover".
            PillarsCardsSection has its own i18n'd editorial intro.
        ──────────────────────────────────────────────────────────── */}
        <div className="px-6 py-20 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <PillarsCardsSection />
          </div>
        </div>

        {/* ── PROSE BLOCK 2: THE SCHOOL-FIRST PRINCIPLE ──────────────
            Keyword: "international schools near Lisbon", acceptance rates.
            This is TrustFamily's core editorial thesis — the insight that
            differentiates the guide from generic relocation resources.
        ──────────────────────────────────────────────────────────── */}
        <div className="px-6 py-16 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 lg:gap-20 items-start">

              <div className="max-w-2xl">
                <h2 id="school-first-principle" className="article-heading mb-6">
                  The school decision is the relocation decision
                </h2>

                <p className="text-body text-ink-secondary leading-relaxed mb-5">
                  Every family we work with arrives believing the school choice and the neighborhood choice are two parallel decisions. They are not. In the Lisbon area, the school drives the neighborhood — because the morning school run, if misjudged, can absorb 90 minutes of daily family life in traffic. This is the single most consequential structural mistake that relocating families make, and it is almost entirely preventable with the right sequencing of decisions.
                </p>

                <p className="text-body text-ink-secondary leading-relaxed mb-5">
                  St.&nbsp;Julian&apos;s School, in Carcavelos, draws its community primarily from Cascais and Estoril — a 15-to-20 minute coastal drive. TASIS Portugal and CAISL, both in Sintra, are most naturally paired with a residence in Sintra itself or the surrounding hills. United Lisbon International School, in Parque das Nações, is walkable from the riverfront apartments surrounding it. Choose a neighborhood first, and you risk a daily commute that erodes the quality of life the move was supposed to provide.
                </p>

                <p className="text-body text-ink-secondary leading-relaxed">
                  Most international schools near Lisbon open applications for September entry in October or November of the preceding year. St.&nbsp;Julian&apos;s often closes its waitlist well before January. The families who arrive well-placed are those who applied 12 to 18 months in advance, to two or three schools simultaneously. The application is not a formality — it is the first real commitment of the relocation.
                </p>
              </div>

              {/* Stat sidebar — 8% acceptance rate + editorial principle */}
              <aside className="hidden lg:flex flex-col gap-10 sticky top-24 self-start" aria-label="Key statistics">
                <div>
                  <p className="font-serif text-[68px] font-bold leading-none text-brand/20 select-none" aria-hidden="true">8%</p>
                  <hr className="border-brand/20 my-3" />
                  <p className="text-body-sm text-ink-secondary leading-snug">
                    Acceptance rate at St.&nbsp;Julian&apos;s School — the most selective international school in Portugal. Apply to two or three schools simultaneously, and apply early.
                  </p>
                </div>
                <blockquote className="border-l-2 border-brand/30 pl-4">
                  <p className="font-serif italic text-body text-ink-primary leading-relaxed">
                    &ldquo;Choose the school first. The neighborhood follows. The commute is the quality of life.&rdquo;
                  </p>
                  <footer className="mt-2">
                    <p className="text-caption text-ink-muted">TrustFamily research principle</p>
                  </footer>
                </blockquote>
              </aside>

            </div>
          </div>
        </div>

        {/* ── QUIZ — embedded editorial tool ─────────────────────────
            Introduced by a prose bridge before the component.
            The QuizSection uses its own layout but lives inside the article.
        ──────────────────────────────────────────────────────────── */}
        <div className="px-6 pt-8 pb-6 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <p className="text-body text-ink-secondary leading-relaxed max-w-2xl">
              Not sure which school fits your family&apos;s priorities — curriculum, lifestyle, or budget? Our{" "}
              <I18nLink href="/school-finder" className="text-brand underline underline-offset-2 hover:text-brand/80">
                School Finder
              </I18nLink>{" "}
              matches your situation to the right school and neighborhood in 60 seconds.
            </p>
          </div>
        </div>
        <div className="bg-surface-subtle">
          <QuizSection locale={locale} />
        </div>

        {/* ── RESPIRO — editorial image moment ───────────────────────
            Full-bleed image break in the article flow.
        ──────────────────────────────────────────────────────────── */}
        <div className="relative w-full aspect-[21/9] overflow-hidden">
          <Image
            src="/homepage-respiro1-img.png"
            alt="Family life in Portugal — TrustFamily relocation"
            fill
            loading="lazy"
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjEiIGhlaWdodD0iOSIgZmlsbD0iI2U4ZTVlMCIvPjwvc3ZnPg=="
            className="object-cover"
          />
        </div>

        {/* ── PROSE BLOCK 3 + LEAD MAGNET — side-by-side editorial layout ──
            Left: E-E-A-T narrative (methodology + independence pledge).
            Right: signup form card — the CTA that follows naturally from the prose.
            Shared bg-surface-subtle creates a clear section break.
        ──────────────────────────────────────────────────────────────────── */}
        <div className="px-6 py-16 border-t border-border bg-surface-subtle">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 lg:gap-24 items-start">

              {/* Left: E-E-A-T prose */}
              <div className="max-w-2xl">
                <h2 id="independent-intelligence" className="article-heading mb-6">
                  What independent intelligence looks like in practice
                </h2>

                <p className="text-body text-ink-secondary leading-relaxed mb-5">
                  TrustFamily was built from a specific frustration: the near-total absence of honest, structured, non-commercial information for families seriously considering a move to Portugal. The market offered two things — relocation agencies with financial relationships with specific schools and landlords, and expat forums where individual experience often ran ahead of verified fact. Neither served families making a decision worth hundreds of thousands of euros in school fees, housing deposits, and life reorganisation.
                </p>

                <p className="text-body text-ink-secondary leading-relaxed mb-5">
                  Every school profile in our guides reflects in-person visits, direct conversations with admissions teams and parent communities, and careful verification of the data points that actually matter: real acceptance rates (not the selective figures schools publish), the full fee structure including registration and capital levy charges, curriculum transition considerations for children arriving mid-programme, and the texture of each school&apos;s culture that does not appear in any prospectus.
                </p>

                <p className="text-body text-ink-secondary leading-relaxed mb-8">
                  No school pays for placement here. No property company refers traffic to these guides. There are no affiliate links. The neighborhood commute data is observed at actual school-run times, not mapping software estimates in off-peak conditions. The visa information — covering the D7 Passive Income Visa, the D8 Digital Nomad Visa, and the restructured Golden Visa program — is reviewed against{" "}
                  <a
                    href="https://www.aima.gov.pt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand underline underline-offset-2 hover:text-brand/80"
                  >
                    official AIMA guidance
                  </a>{" "}
                  and updated when the rules change, as they did significantly between 2023 and 2025.
                </p>

                <p className="text-body text-ink-secondary leading-relaxed pl-4 border-l-2 border-brand/30 italic">
                  The information that matters most — visa changes, admission openings, school fee updates — moves faster than most guides can keep pace with. Join the families already following TrustFamily&apos;s research updates for 2026.
                </p>
              </div>

              {/* Right: lead magnet form card (compact — no duplicate copy) */}
              <div className="lg:sticky top-24">
                <LeadMagnetSection compact locale={locale} />
              </div>

            </div>
          </div>
        </div>

        {/* ── TESTIMONIALS — pull quotes closing the article ──────────
            The article closes with the voices of the families it serves.
            Section header is part of the article prose; quotes are below.
        ──────────────────────────────────────────────────────────── */}
        <div className="px-6 border-t border-border">
          <div className="max-w-7xl mx-auto pt-16 pb-4">
            <p className="section-overline mb-3">What families say</p>
            <h2 className="section-heading max-w-lg">
              Real stories from families who made the move
            </h2>
          </div>
        </div>
        <div className="px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            <Testimonials />
          </div>
        </div>

      </article>
    </main>
  );
}
