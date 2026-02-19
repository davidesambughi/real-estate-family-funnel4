import Image from "next/image";
import { TrustBar } from "./TrustBar";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

export default function Hero() {
    const t = useTranslations('Hero');

    return (
        <section id="hero" className="flex flex-col items-center justify-center py-12 md:py-20 px-6 text-center relative overflow-hidden bg-white/50">
            <div className="w-full max-w-7xl mx-auto mb-8 relative aspect-video md:aspect-[21/9] rounded-xl overflow-hidden shadow-2xl">
                <Image
                    src="https://placehold.co/1200x600/e2e8f0/1e293b?text=Happy+Family+Walking+in+Lisbon"
                    alt="Relocating to Portugal with family - professional guidance"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                <div className="absolute bottom-4 left-4 right-4 text-white md:hidden text-left">
                    <p className="text-xs font-medium uppercase tracking-wider mb-1 text-white/80">TrustFamily Relocation</p>
                    <h2 className="text-xl font-bold leading-tight shadow-black drop-shadow-md">
                        {t('title')}
                    </h2>
                </div>
            </div>

            <div className="md:mt-0 max-w-4xl mx-auto">
                <h1 className="hidden md:block text-5xl md:text-6xl font-bold mb-6 text-slate-900 tracking-tight leading-tight">
                    {t('title')}
                </h1>
                <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-8 text-slate-600 leading-relaxed">
                    {t('subtitle')}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <Button size="lg" className="text-lg px-8 py-6 h-auto w-full sm:w-auto shadow-xl shadow-blue-900/10 hover:shadow-blue-900/20 transition-all duration-300">
                        {t('cta')}
                    </Button>
                </div>
            </div>

            <TrustBar />
        </section>
    );
}