/**
 * Testimonials — pull quotes only, no section/container wrappers.
 * The section header (overline + H2) and layout container live
 * in the parent article in page.tsx.
 */

import { getLocale } from "next-intl/server";
import { featuredTestimonials, supportingTestimonials, getTestimonialT } from "@/lib/testimonials-data";

export async function Testimonials() {
    const locale = await getLocale();

    return (
        <>
            {/* Featured pull quotes — 3 large, full editorial weight */}
            <div className="space-y-14 mb-20">
                {featuredTestimonials.map((item) => {
                    const { quote } = getTestimonialT(item, locale);
                    return (
                        <blockquote
                            key={item.id}
                            className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6 md:gap-12 items-start border-t border-border pt-10"
                        >
                            {/* Attribution — left column on desktop */}
                            <div>
                                <p className="font-semibold text-ink-primary text-body">{item.attribution}</p>
                                <p className="text-caption text-ink-muted mt-1">{item.detail}</p>
                            </div>
                            {/* Quote — right column, large serif italic */}
                            <p className="font-serif italic text-xl md:text-2xl text-ink-primary leading-relaxed">
                                &ldquo;{quote}&rdquo;
                            </p>
                        </blockquote>
                    );
                })}
            </div>

            {/* Supporting quotes — 3 compact, 3-col grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-border pt-14">
                {supportingTestimonials.map((item) => {
                    const { quote } = getTestimonialT(item, locale);
                    return (
                        <blockquote key={item.id}>
                            <p className="text-body-sm text-ink-secondary italic leading-relaxed mb-4">
                                &ldquo;{quote}&rdquo;
                            </p>
                            <footer>
                                <p className="text-sm font-semibold text-ink-primary">{item.attribution}</p>
                                <p className="text-caption text-ink-muted">{item.detail}</p>
                            </footer>
                        </blockquote>
                    );
                })}
            </div>
        </>
    );
}
