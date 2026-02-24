import Image from "next/image";
import { TrustBar } from "./TrustBar";
import { useTranslations } from "next-intl";

/* Placeholder blur (tiny gray) to avoid CLS until image loads */
const HERO_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PJyYzYwIGZpbGw9IiM5NGEzYjgiLz48L3N2Zz4=";

/**
 * Hero — article header content, no section/container wrappers.
 * The parent article in page.tsx provides all layout context.
 */
export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <>
      {/* Editorial grid — copy left, image right (bleeds off-canvas on desktop).
          items-stretch: both columns reach the same height — left column text
          top + secondary image bottom, right column portrait fills full height. */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_42%] gap-8 md:gap-12 items-stretch pt-16">

        {/* Copy — article header copy */}
        <div className="order-2 md:order-1 flex flex-col justify-start md:pt-10 md:pb-8">
          <p className="section-overline mb-5 tracking-widest">{t("overline")}</p>
          <h1 className="font-serif text-hero font-bold tracking-tight text-ink-primary leading-[1.1] mb-7">
            {t("title")}
          </h1>
          <p className="text-body text-ink-secondary leading-relaxed max-w-lg">
            {t("subtitle")}
          </p>
        </div>

        {/* Hero image — fills full column height via grid stretch, bleeds right on desktop */}
        <div className="order-1 md:order-2 relative aspect-[3/4] md:aspect-auto w-full md:-mr-6 lg:-mr-12 overflow-hidden bg-surface-subtle">
          <Image
            src="/hero-img.jpg"
            alt="Expat family in Lisbon, Portugal - TrustFamily relocation guide"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 45vw"
            placeholder="blur"
            blurDataURL={HERO_BLUR}
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* TrustBar — editorial byline strip, separated by thin rule */}
      <div className="border-t border-border mt-10 pt-6 pb-8">
        <TrustBar />
      </div>
    </>
  );
}
