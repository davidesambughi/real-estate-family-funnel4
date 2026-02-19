import Image from "next/image";
import { TrustBar } from "./TrustBar";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

export default function Hero() {
    const t = useTranslations('Hero');

    return (
        <section id="hero" className="flex flex-col items-center justify-center py-12 md:py-20 px-6 text-center relative overflow-hidden bg-white/50">
            {/*
              P10 FIX: <h1> is now ALWAYS in the DOM — visible on every viewport.
              Previously hidden with `hidden md:block`, which caused Google's
              mobile-first crawler to find no <h1>. SEO critical fix.
            */}
            <div className="max-w-4xl mx-auto mb-8 w-full">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-slate-900 tracking-tight leading-tight">
                    {t('title')}
                </h1>
                <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-8 text-slate-600 leading-relaxed">
                    {t('subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                    <Button size="lg" className="text-lg px-8 py-6 h-auto w-full sm:w-auto shadow-xl shadow-blue-900/10 hover:shadow-blue-900/20 transition-all duration-300">
                        {t('cta')}
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto w-full sm:w-auto">
                        {t('ctaSecondary')}
                    </Button>
                </div>
            </div>

            <div className="w-full max-w-7xl mx-auto relative aspect-video md:aspect-[21/9] rounded-xl overflow-hidden shadow-2xl">
                <Image
                    src="https://placehold.co/1200x600/e2e8f0/1e293b?text=Happy+Family+Walking+in+Lisbon"
                    alt="Relocating to Portugal with family - professional guidance"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <TrustBar />
        </section>
    );
}