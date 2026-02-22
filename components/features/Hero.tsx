import { TrustBar } from "./TrustBar";
import { useTranslations } from "next-intl";

export default function Hero() {
    const t = useTranslations('Hero');

    return (
        <section id="hero" className="py-16 md:py-28 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Split: title left, empathetic text right */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-14">
                    <div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-ink-primary">
                            {t('title')}
                        </h1>
                    </div>
                    <div className="md:border-l md:border-border md:pl-12">
                        <p className="text-lg text-ink-secondary leading-relaxed">
                            {t('subtitle')}
                        </p>
                    </div>
                </div>

                <TrustBar />
            </div>
        </section>
    );
}
