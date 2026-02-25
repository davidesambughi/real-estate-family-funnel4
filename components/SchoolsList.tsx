/**
 * SchoolsList — Phase 4 Rich Card
 *
 * Server Component. Renders all schools from schoolsData with:
 * - Trust badges + acceptance rate
 * - "The Verdict" editorial sentence
 * - "Parent Whisper" anonymous quote
 * - Curriculum / Fees / Last Inspected metadata
 * - Hover animation, mobile-first layout
 *
 * GEO note: The content here (verdict + parentWhisper) is deliberately
 * written as citable, factual statements — optimized for AI Overviews.
 */

import { Link } from "@/i18n/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { schoolsData, getSchoolT } from "@/lib/schools-data";
import { MapPin, GraduationCap, Coins, CalendarCheck, Quote, Sparkles, Users } from "lucide-react";
import { MethodologyBadge } from "./MethodologyBadge";
import { getLocale, getTranslations } from "next-intl/server";

export async function SchoolsList() {
    const locale = await getLocale();
    const t = await getTranslations({ locale, namespace: "SchoolDetail" });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {schoolsData.map((school) => {
                const schoolT = getSchoolT(school, locale);
                return (
                    <Card
                        key={school.id}
                        className="flex flex-col h-full group"
                    >
                        <CardHeader className="pb-3">
                            {/* Trust badges + acceptance rate row */}
                            <div className="flex justify-between items-start gap-2 mb-3">
                                <div className="flex flex-wrap gap-1.5">
                                    {schoolT.trustBadges?.map((badge) => (
                                        <MethodologyBadge key={badge} type="independent" label={badge} />
                                    ))}
                                </div>
                                {school.acceptanceRate && (
                                    <div className="flex items-center gap-1 text-xs text-ink-muted whitespace-nowrap shrink-0">
                                        <Users className="h-3 w-3" />
                                        <span>Acceptance: <strong className="text-ink-secondary">{school.acceptanceRate}</strong></span>
                                    </div>
                                )}
                            </div>

                            {/* School name */}
                            <CardTitle className="text-h3 leading-tight group-hover:text-brand transition-colors">
                                {school.name}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-1.5 mt-1.5">
                                <MapPin className="h-3.5 w-3.5 shrink-0" />
                                <span>{school.location}</span>
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="flex-1 space-y-4">
                            {/* Description */}
                            <p className="text-sm text-ink-secondary line-clamp-3 leading-relaxed">
                                {schoolT.description}
                            </p>

                            {/* Key stats */}
                            <div className="flex flex-col gap-2 text-sm border-t border-border pt-3">
                                <div className="flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4 text-brand shrink-0" />
                                    <span className="font-medium text-ink-primary">{t("curriculumLabel")}:</span>
                                    <span className="text-ink-secondary">{school.curriculum}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Coins className="h-4 w-4 text-warm shrink-0" />
                                    <span className="font-medium text-ink-primary">{t("annualFeesLabel")}:</span>
                                    <span className="text-ink-secondary">{school.fees}</span>
                                </div>
                                {school.inspectionDate && (
                                    <div className="flex items-center gap-2 text-xs text-ink-muted">
                                        <CalendarCheck className="h-3 w-3 shrink-0" />
                                        <span>TrustFamily inspected: {school.inspectionDate}</span>
                                        {school.visitCount && <span>· {school.visitCount} visits</span>}
                                    </div>
                                )}
                            </div>

                            {/* THE VERDICT */}
                            <div className="rounded-xl bg-brand-light border border-brand/20 px-4 py-3">
                                <div className="flex items-center gap-1.5 mb-1.5">
                                    <Sparkles className="h-3.5 w-3.5 text-brand" />
                                    <span className="text-xs font-bold text-brand uppercase tracking-wide">{t("verdictLabel")}</span>
                                </div>
                                <p className="text-sm font-medium text-ink-primary leading-snug">
                                    {schoolT.verdict}
                                </p>
                            </div>

                            {/* PARENT WHISPER */}
                            <div className="rounded-xl bg-surface-subtle border border-border px-4 py-3">
                                <div className="flex items-center gap-1.5 mb-1.5">
                                    <Quote className="h-3.5 w-3.5 text-ink-muted" />
                                    <span className="text-xs font-bold text-ink-muted uppercase tracking-wide">{t("parentWhisperLabel")}</span>
                                </div>
                                <p className="text-sm text-ink-secondary italic leading-snug">
                                    {schoolT.parentWhisper}
                                </p>
                            </div>
                        </CardContent>

                        <CardFooter className="pt-2">
                            <Button asChild className="w-full">
                                <Link href={{ pathname: "/schools/[slug]", params: { slug: school.slug } }}>
                                    View Full School Profile →
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
}
