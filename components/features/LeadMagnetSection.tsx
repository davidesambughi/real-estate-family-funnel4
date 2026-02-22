import { getTranslations } from "next-intl/server";
import Form from "@/components/form";
import { CheckCircle2, MessageSquare, Bell, UserPlus } from "lucide-react";

export async function LeadMagnetSection({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: "LeadMagnet" });

    return (
        <section id="lead-magnet" className="py-20 px-6 bg-surface-subtle">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-start">

                {/* Left Column: Copy & Benefits */}
                <div className="flex-1 space-y-8">
                    <div>
                        <h2 className="font-serif font-semibold text-h2 text-ink-primary mb-4 leading-tight">
                            {t("heading")} <br />
                            <span className="text-brand">{t("headingHighlight")}</span>
                        </h2>
                        <p className="section-body max-w-xl">
                            {t("subheading")}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-card p-2 rounded-full shadow-(--shadow-hair) text-brand mt-1 shrink-0">
                                <MessageSquare className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-serif font-semibold text-h4 text-ink-primary">{t("benefit1Title")}</h3>
                                <p className="text-ink-secondary text-body-sm">{t("benefit1Desc")}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-card p-2 rounded-full shadow-(--shadow-hair) text-brand mt-1 shrink-0">
                                <Bell className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-serif font-semibold text-h4 text-ink-primary">{t("benefit2Title")}</h3>
                                <p className="text-ink-secondary text-body-sm">{t("benefit2Desc")}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-card p-2 rounded-full shadow-(--shadow-hair) text-brand mt-1 shrink-0">
                                <UserPlus className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-serif font-semibold text-h4 text-ink-primary">{t("benefit3Title")}</h3>
                                <p className="text-ink-secondary text-body-sm">{t("benefit3Desc")}</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex items-center gap-2 text-body-sm text-ink-muted">
                        <CheckCircle2 className="h-4 w-4 text-trust shrink-0" />
                        <span>{t("trustBadge1")}</span>
                        <div className="w-1 h-1 bg-border rounded-full mx-2" />
                        <CheckCircle2 className="h-4 w-4 text-trust shrink-0" />
                        <span>{t("trustBadge2")}</span>
                    </div>
                </div>

                {/* Right Column: The Form */}
                <div className="flex-1 w-full max-w-md lg:max-w-xl">
                    <div className="bg-card rounded-2xl shadow-(--shadow-float) border border-border overflow-hidden">
                        <div className="bg-brand p-6 text-primary-foreground text-center">
                            <h3 className="font-serif text-h3 font-semibold">{t("formTitle")}</h3>
                            <p className="text-primary-foreground/70 text-body-sm mt-1">{t("formSubtitle")}</p>
                        </div>
                        <div className="p-6">
                            <Form />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
