import { getTranslations } from "next-intl/server";
import Form from "@/components/form";
import { CheckCircle2, MessageSquare, Bell, UserPlus } from "lucide-react";

export async function LeadMagnetSection({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: "LeadMagnet" });

    return (
        <section id="lead-magnet" className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-50/50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-start">

                {/* Left Column: Copy & Benefits */}
                <div className="flex-1 space-y-8">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
                            {t("heading")} <br />
                            <span className="text-blue-600">{t("headingHighlight")}</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                            {t("subheading")}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-white p-2 rounded-full shadow-sm text-blue-600 mt-1">
                                <MessageSquare className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900">{t("benefit1Title")}</h3>
                                <p className="text-slate-600">{t("benefit1Desc")}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-white p-2 rounded-full shadow-sm text-blue-600 mt-1">
                                <Bell className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900">{t("benefit2Title")}</h3>
                                <p className="text-slate-600">{t("benefit2Desc")}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-white p-2 rounded-full shadow-sm text-blue-600 mt-1">
                                <UserPlus className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900">{t("benefit3Title")}</h3>
                                <p className="text-slate-600">{t("benefit3Desc")}</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex items-center gap-2 text-sm text-slate-500">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>{t("trustBadge1")}</span>
                        <div className="w-1 h-1 bg-slate-300 rounded-full mx-2" />
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>{t("trustBadge2")}</span>
                    </div>
                </div>

                {/* Right Column: The Form */}
                <div className="flex-1 w-full max-w-md lg:max-w-xl">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                        <div className="bg-blue-600 p-6 text-white text-center">
                            <h3 className="text-2xl font-bold">{t("formTitle")}</h3>
                            <p className="text-blue-100 text-sm mt-1">{t("formSubtitle")}</p>
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
