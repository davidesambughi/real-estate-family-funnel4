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
import { schoolsData } from "@/lib/schools-data";
import { MapPin, GraduationCap, Coins, CalendarCheck, Quote, Sparkles, Users } from "lucide-react";
import { MethodologyBadge } from "./MethodologyBadge";

export function SchoolsList() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {schoolsData.map((school, index) => (
                <Card
                    key={school.id}
                    className="flex flex-col h-full hover:shadow-xl transition-all duration-300 border-slate-200 group"
                >
                    <CardHeader className="pb-3">
                        {/* Trust badges + acceptance rate row */}
                        <div className="flex justify-between items-start gap-2 mb-3">
                            <div className="flex flex-wrap gap-1.5">
                                {school.trustBadges?.map((badge) => (
                                    <MethodologyBadge key={badge} type="independent" label={badge} />
                                ))}
                            </div>
                            {school.acceptanceRate && (
                                <div className="flex items-center gap-1 text-xs text-slate-500 whitespace-nowrap shrink-0">
                                    <Users className="h-3 w-3" />
                                    <span>Acceptance: <strong className="text-slate-700">{school.acceptanceRate}</strong></span>
                                </div>
                            )}
                        </div>

                        {/* School name */}
                        <CardTitle className="text-xl leading-tight group-hover:text-blue-700 transition-colors">
                            {school.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1.5 mt-1.5">
                            <MapPin className="h-3.5 w-3.5 shrink-0" />
                            <span>{school.location}</span>
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1 space-y-4">
                        {/* Description */}
                        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                            {school.description}
                        </p>

                        {/* Key stats */}
                        <div className="flex flex-col gap-2 text-sm border-t border-slate-100 pt-3">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4 text-blue-500 shrink-0" />
                                <span className="font-medium text-slate-700">Curriculum:</span>
                                <span className="text-slate-600">{school.curriculum}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Coins className="h-4 w-4 text-yellow-500 shrink-0" />
                                <span className="font-medium text-slate-700">Annual Fees:</span>
                                <span className="text-slate-600">{school.fees}</span>
                            </div>
                            {school.inspectionDate && (
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <CalendarCheck className="h-3 w-3 shrink-0" />
                                    <span>TrustFamily inspected: {school.inspectionDate}</span>
                                    {school.visitCount && <span>· {school.visitCount} visits</span>}
                                </div>
                            )}
                        </div>

                        {/* THE VERDICT */}
                        <div className="rounded-lg bg-blue-50 border border-blue-100 px-4 py-3">
                            <div className="flex items-center gap-1.5 mb-1.5">
                                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                                <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">The Verdict</span>
                            </div>
                            <p className="text-sm font-medium text-blue-900 leading-snug">
                                {school.verdict}
                            </p>
                        </div>

                        {/* PARENT WHISPER */}
                        <div className="rounded-lg bg-slate-50 border border-slate-100 px-4 py-3">
                            <div className="flex items-center gap-1.5 mb-1.5">
                                <Quote className="h-3.5 w-3.5 text-slate-400" />
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Parent Whisper</span>
                            </div>
                            <p className="text-sm text-slate-600 italic leading-snug">
                                {school.parentWhisper}
                            </p>
                        </div>
                    </CardContent>

                    <CardFooter className="pt-2">
                        <Button asChild className="w-full group-hover:bg-blue-700 transition-colors">
                            <Link href={{ pathname: "/schools/[slug]", params: { slug: school.slug } }}>
                                View Full School Profile →
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
