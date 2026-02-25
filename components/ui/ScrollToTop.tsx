"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

/**
 * ScrollToTop Component
 * A floating action button that appears after scrolling 400px.
 * Uses framer-motion for Entry/Exit animations and follows the brand design system.
 */
export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const t = useTranslations("Common");

    useEffect(() => {
        const handleScroll = () => {
            // Show button after 400px scroll
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    onClick={scrollToTop}
                    aria-label={t("scrollToTop")}
                    className={cn(
                        "fixed bottom-6 right-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full",
                        "bg-brand text-white shadow-float ring-1 ring-brand-light",
                        "transition-colors duration-200 hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
                        "md:bottom-8 md:right-8 lg:bottom-10 lg:right-10"
                    )}
                >
                    <ArrowUp className="h-5 w-5" aria-hidden="true" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};
