"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { quizSteps, matchSchools, matchNeighborhoods, QuizAnswers } from "./quiz-data";
import { QuizResult } from "./QuizResult";
import { Banknote, CreditCard, Gem, Waves, Building2, Trees, BookOpen, Globe, Layers, Zap, Calendar, Compass, CheckCircle2, ArrowRight, RotateCcw } from "lucide-react";

interface QuizWidgetProps {
    translations: {
        title: string;
        subtitle: string;
        stepLabel: string;
        nextBtn: string;
        backBtn: string;
        restartBtn: string;
        // option labels
        budgetLow: string; budgetMid: string; budgetHigh: string;
        budgetQuestion: string;
        lifestyleQuestion: string; lifestyleCoastal: string; lifestyleCity: string; lifestyleNature: string;
        curriculumQuestion: string; curriculumBritish: string; curriculumAmerican: string; curriculumFlexible: string;
        timelineQuestion: string; timelineUrgent: string; timelinePlanning: string; timelineExploring: string;
        resultsTitle: string;
        resultsSchoolsHeading: string;
        resultsNeighborhoodsHeading: string;
        viewSchoolBtn: string;
        viewNeighborhoodBtn: string;
    };
}

const iconMap: Record<string, React.ElementType> = {
    Banknote, CreditCard, Gem, Waves, Building2, Trees,
    BookOpen, Globe, Layers, Zap, Calendar, Compass,
};

export function QuizWidget({ translations: t }: QuizWidgetProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<QuizAnswers>({});
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isComplete, setIsComplete] = useState(false);

    const step = quizSteps[currentStep];
    const totalSteps = quizSteps.length;
    const progress = ((currentStep) / totalSteps) * 100;

    function handleOptionClick(value: string) {
        setSelectedOption(value);
    }

    function handleNext() {
        if (!selectedOption) return;
        const newAnswers = { ...answers, [step.id]: selectedOption };
        setAnswers(newAnswers);
        setSelectedOption(null);

        if (currentStep + 1 >= totalSteps) {
            setIsComplete(true);
        } else {
            setCurrentStep((s) => s + 1);
        }
    }

    function handleBack() {
        if (currentStep === 0) return;
        setCurrentStep((s) => s - 1);
        const newAnswers = { ...answers };
        delete newAnswers[quizSteps[currentStep - 1].id];
        setAnswers(newAnswers);
        setSelectedOption(answers[quizSteps[currentStep - 1].id] ?? null);
    }

    function handleRestart() {
        setCurrentStep(0);
        setAnswers({});
        setSelectedOption(null);
        setIsComplete(false);
    }

    if (isComplete) {
        const schoolSlugs = matchSchools(answers);
        const neighborhoodSlugs = matchNeighborhoods(answers);
        return (
            <QuizResult
                schoolSlugs={schoolSlugs}
                neighborhoodSlugs={neighborhoodSlugs}
                translations={t}
                onRestart={handleRestart}
            />
        );
    }

    // Resolve option label from translation
    function resolveLabel(labelKey: string): string {
        return (t as Record<string, string>)[labelKey] ?? labelKey;
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Progress bar */}
            <div className="mb-6">
                <div className="flex justify-between text-sm text-ink-muted mb-2">
                    <span>{t.stepLabel.replace("{current}", String(currentStep + 1)).replace("{total}", String(totalSteps))}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-border/40 rounded-full h-1.5">
                    <div
                        className="bg-brand h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Question */}
            <div className="mb-8 text-center">
                <h3 className="font-serif font-semibold text-2xl text-ink-primary mb-2">
                    {resolveLabel(step.questionKey)}
                </h3>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {step.options.map((option) => {
                    const isSelected = selectedOption === option.value;
                    return (
                        <button
                            key={option.value}
                            onClick={() => handleOptionClick(option.value)}
                            className={`
                flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 transition-all duration-200
                text-left cursor-pointer group
                ${isSelected
                                    ? "border-brand bg-brand-light shadow-[var(--shadow-hair)]"
                                    : "border-border bg-card hover:border-brand/40 hover:bg-brand-light/50"
                                }
              `}
                        >
                            {(() => { const Icon = iconMap[option.icon] ?? Layers; return <Icon className="h-6 w-6 text-ink-secondary group-hover:text-brand transition-colors" />; })()}
                            <span className={`text-sm font-semibold text-center leading-tight ${isSelected ? "text-brand" : "text-ink-primary"}`}>
                                {resolveLabel(option.label)}
                            </span>
                            {isSelected && <CheckCircle2 className="h-5 w-5 text-brand" />}
                        </button>
                    );
                })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
                <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                >
                    ← {t.backBtn}
                </Button>
                <Button
                    onClick={handleNext}
                    disabled={!selectedOption}
                    size="lg"
                    className="px-8"
                >
                    {currentStep + 1 === totalSteps ? t.resultsTitle : t.nextBtn}
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
