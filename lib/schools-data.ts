/* TEMPORARY DATA - TO BE REPLACED WITH REAL DATA */


export interface School {
  id: string;
  slug: string;
  name: string;
  location: string;
  neighborhoodSlug: string; // Relation to Neighborhood
  curriculum: string;
  fees: string;
  description: string;
  highlights: string[];
  // Trust Intelligence Data
  trustBadges: string[]; // e.g. "Independent", "Non-Profit"
  inspectionDate?: string;
  acceptanceRate?: string;
  visitCount?: number; // "Visited by us X times"
}

export const schoolsData: School[] = [
  {
    id: "1",
    slug: "st-julians-school",
    name: "St. Julian's School",
    location: "Carcavelos, Cascais",
    neighborhoodSlug: "cascais",
    curriculum: "British, IB Diploma",
    fees: "€16,000 - €26,000",
    description: "Historic British international school with extensive grounds. Known for academic rigor and a very competitive entry process.",
    highlights: ["Historic Campus", "Strong Sports Program", "Excellent IB Results"],
    trustBadges: ["Non-Profit", "CIS Accredited", "High Demand"],
    inspectionDate: "2024-11-15",
    acceptanceRate: "8%",
    visitCount: 7
  },
  {
    id: "2",
    slug: "tasis-portugal",
    name: "TASIS Portugal",
    location: "Sintra",
    neighborhoodSlug: "sintra",
    curriculum: "American, IB Diploma",
    fees: "€18,000 - €32,000",
    description: "Newest luxury campus in Sintra. exceptional arts and STEM facilities using the American curriculum + IB Diploma.",
    highlights: ["Modern Facilities", "Arts & Music Focus", "Global Network"],
    trustBadges: ["Family-Owned", "NEASC Accredited", "Modern Campus"],
    inspectionDate: "2025-01-20",
    acceptanceRate: "18%",
    visitCount: 4
  },
  {
    id: "3",
    slug: "carlucci-american-international-school",
    name: "Carlucci American International School (CAISL)",
    location: "Sintra / Linho",
    neighborhoodSlug: "sintra",
    curriculum: "American, IB Diploma",
    fees: "€14,000 - €24,000",
    description: "The only US State Department supported school. Strong community feel, inclusive admissions, and solid IB results.",
    highlights: ["US State Dept Support", "Inclusive Community", "Strong STEM"],
    trustBadges: ["Non-Profit", "US State Dept Supported", "Inclusive"],
    inspectionDate: "2024-10-05",
    acceptanceRate: "35%",
    visitCount: 5
  },
  {
    id: "4",
    slug: "united-lisbon-international-school",
    name: "United Lisbon International School",
    location: "Lisbon (Parque das Nações)",
    neighborhoodSlug: "parquedasnacoes",
    curriculum: "American, IB Diploma",
    fees: "€12,000 - €22,000",
    description: "Modern vertical campus in the city center. Heavy focus on technology, entrepreneurship, and future skills.",
    highlights: ["Tech-Focused", "Modern Campus", "Central Location"],
    trustBadges: ["For-Profit", "Tech-Focused", "Central Location"],
    inspectionDate: "2025-02-01",
    acceptanceRate: "45%",
    visitCount: 3
  }
];
