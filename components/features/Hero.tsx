import Image from "next/image";
import { TrustBar } from "./TrustBar";
import { useTranslations } from "next-intl";

/* Placeholder blur (tiny gray) to avoid CLS until image loads */
const HERO_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PJyYzYwIGZpbGw9IiM5NGEzYjgiLz48L3N2Zz4=";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section id="hero" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center mb-10 md:mb-12">
          {/* Copy — Z-pattern left */}
          <div className="order-2 md:order-1">
            <h1 className="font-serif text-hero font-bold tracking-tight text-ink-primary leading-[1.15]">
              {t("title")}
            </h1>
            <div className="mt-6 md:border-l md:border-border md:pl-8 md:ml-0">
              <p className="section-body text-ink-secondary">
                {t("subtitle")}
              </p>
            </div>
          </div>

          {/* Hero image — LCP, right on desktop */}
          <div className="order-1 md:order-2 relative aspect-video md:aspect-4/3 w-full overflow-hidden rounded-xl bg-surface-subtle">
            <Image
              src="https://placehold.co/1440x810/94a3b8/cbd5e1?text=Hero"
              alt="Expat family in Lisbon, Portugal - TrustFamily relocation guide"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={HERO_BLUR}
              className="object-cover"
            />
          </div>
        </div>

        <TrustBar />
      </div>
    </section>
  );
}
