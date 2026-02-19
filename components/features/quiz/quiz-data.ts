// Quiz data — static, no DB required.
// Filtering logic lives in QuizWidget.tsx (client-side)

export type QuizStepId = "budget" | "lifestyle" | "curriculum" | "timeline";

export interface QuizOption {
  value: string;
  label: string; // i18n key suffix, resolved in component
  emoji: string;
}

export interface QuizStep {
  id: QuizStepId;
  questionKey: string; // i18n key: Quiz.{questionKey}
  options: QuizOption[];
}

export const quizSteps: QuizStep[] = [
  {
    id: "budget",
    questionKey: "budgetQuestion",
    options: [
      { value: "low",    label: "budgetLow",    emoji: "💰" },
      { value: "mid",    label: "budgetMid",    emoji: "💰💰" },
      { value: "high",   label: "budgetHigh",   emoji: "💰💰💰" },
    ],
  },
  {
    id: "lifestyle",
    questionKey: "lifestyleQuestion",
    options: [
      { value: "coastal", label: "lifestyleCoastal", emoji: "🏖️" },
      { value: "city",    label: "lifestyleCity",    emoji: "🏙️" },
      { value: "nature",  label: "lifestyleNature",  emoji: "🌲" },
    ],
  },
  {
    id: "curriculum",
    questionKey: "curriculumQuestion",
    options: [
      { value: "british",  label: "curriculumBritish",  emoji: "🇬🇧" },
      { value: "american", label: "curriculumAmerican", emoji: "🇺🇸" },
      { value: "flexible", label: "curriculumFlexible", emoji: "🌍" },
    ],
  },
  {
    id: "timeline",
    questionKey: "timelineQuestion",
    options: [
      { value: "urgent",    label: "timelineUrgent",    emoji: "⚡" },
      { value: "planning",  label: "timelinePlanning",  emoji: "📅" },
      { value: "exploring", label: "timelineExploring", emoji: "🔭" },
    ],
  },
];

// ── Match logic ────────────────────────────────────────────────────────────────

export interface QuizAnswers {
  budget?: string;
  lifestyle?: string;
  curriculum?: string;
  timeline?: string;
}

// School slugs that match given answers (score-based ranking)
export function matchSchools(answers: QuizAnswers): string[] {
  const scores: Record<string, number> = {
    "st-julians-school": 0,
    "tasis-portugal": 0,
    "carlucci-american-international-school": 0,
    "united-lisbon-international-school": 0,
  };

  // Budget
  if (answers.budget === "low")  { scores["carlucci-american-international-school"] += 3; scores["united-lisbon-international-school"] += 2; }
  if (answers.budget === "mid")  { scores["tasis-portugal"] += 2; scores["carlucci-american-international-school"] += 2; }
  if (answers.budget === "high") { scores["st-julians-school"] += 3; scores["tasis-portugal"] += 3; }

  // Lifestyle
  if (answers.lifestyle === "coastal") { scores["st-julians-school"] += 3; scores["tasis-portugal"] += 2; }
  if (answers.lifestyle === "city")    { scores["united-lisbon-international-school"] += 3; }
  if (answers.lifestyle === "nature")  { scores["tasis-portugal"] += 3; scores["carlucci-american-international-school"] += 2; }

  // Curriculum
  if (answers.curriculum === "british")  { scores["st-julians-school"] += 3; }
  if (answers.curriculum === "american") { scores["tasis-portugal"] += 2; scores["carlucci-american-international-school"] += 3; scores["united-lisbon-international-school"] += 2; }
  if (answers.curriculum === "flexible") { scores["st-julians-school"] += 1; scores["tasis-portugal"] += 2; scores["carlucci-american-international-school"] += 1; scores["united-lisbon-international-school"] += 1; }

  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([slug]) => slug);
}

// Neighborhood slugs that match lifestyle
export function matchNeighborhoods(answers: QuizAnswers): string[] {
  if (answers.lifestyle === "coastal") return ["cascais", "estoril"];
  if (answers.lifestyle === "city")    return ["parquedasnacoes", "campodeourique"];
  if (answers.lifestyle === "nature")  return ["sintra", "cascais"];
  return ["cascais", "parquedasnacoes"];
}
