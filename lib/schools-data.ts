import type { School } from "./types";

export type { School };

export const schoolsData: School[] = [
  {
    id: "1",
    slug: "st-julians-school",
    name: "St. Julian's School",
    location: "Carcavelos, Cascais",
    neighborhoodSlug: "cascais",
    curriculum: "British, IB Diploma",
    fees: "€16,000 – €26,000",
    description:
      "Historic British international school with extensive grounds near the Cascais coastline. Known for academic rigour, a very competitive entry process, and one of the strongest IB results in Portugal.",
    highlights: ["Historic Campus", "Strong Sports Program", "Excellent IB Results"],
    trustBadges: ["Non-Profit", "CIS Accredited", "High Demand"],
    inspectionDate: "2024-11-15",
    acceptanceRate: "8%",
    visitCount: 7,
    // Phase 4 — Editorial
    verdict:
      "The gold standard for British families — if you can get a place, take it.",
    parentWhisper:
      "\"The community here is incredible. Our kids made lifelong friends within weeks.\" — British parent, relocated 2023",
    // Phase 4 — SEO/GEO
    coordinates: { lat: 38.6731, lng: -9.3396 },
  },
  {
    id: "2",
    slug: "tasis-portugal",
    name: "TASIS Portugal",
    location: "Sintra",
    neighborhoodSlug: "sintra",
    curriculum: "American, IB Diploma",
    fees: "€18,000 – €32,000",
    description:
      "The newest luxury campus in Portugal, set in the forested hills of Sintra. TASIS offers exceptional arts and STEM facilities under the American curriculum plus IB Diploma — and the smallest class sizes of any school on this list.",
    highlights: ["Modern Facilities", "Arts & Music Focus", "Global Network"],
    trustBadges: ["NEASC Accredited", "Modern Campus", "Small Class Sizes"],
    inspectionDate: "2025-01-20",
    acceptanceRate: "18%",
    visitCount: 4,
    // Phase 4 — Editorial
    verdict:
      "Premium choice for creative families who want a US-track education in a stunning European setting.",
    parentWhisper:
      "\"The teachers actually know each child by name — the small size is a huge differentiator.\" — American parent, relocated 2024",
    // Phase 4 — SEO/GEO
    coordinates: { lat: 38.7976, lng: -9.3917 },
  },
  {
    id: "3",
    slug: "carlucci-american-international-school",
    name: "Carlucci American International School (CAISL)",
    location: "Sintra / Linho",
    neighborhoodSlug: "sintra",
    curriculum: "American, IB Diploma",
    fees: "€14,000 – €24,000",
    description:
      "The only US State Department-supported school in Portugal. CAISL combines an inclusive admissions policy with solid IB results and a close-knit community feel — making it the best value for American families.",
    highlights: ["US State Dept Support", "Inclusive Community", "Strong STEM"],
    trustBadges: ["Non-Profit", "US State Dept Supported", "Inclusive"],
    inspectionDate: "2024-10-05",
    acceptanceRate: "35%",
    visitCount: 5,
    // Phase 4 — Editorial
    verdict:
      "Best value for American families — official US State Dept backing with a real community atmosphere.",
    parentWhisper:
      "\"We looked at four schools. CAISL felt like home from day one — the parents' network is extraordinary.\" — German-American family, relocated 2023",
    // Phase 4 — SEO/GEO
    coordinates: { lat: 38.8089, lng: -9.4167 },
  },
  {
    id: "4",
    slug: "united-lisbon-international-school",
    name: "United Lisbon International School",
    location: "Lisbon (Parque das Nações)",
    neighborhoodSlug: "parquedasnacoes",
    curriculum: "American, IB Diploma",
    fees: "€12,000 – €22,000",
    description:
      "A modern vertical campus in the heart of Lisbon's most contemporary district. United Lisbon places technology, entrepreneurship, and future skills at the centre of every program — ideal for families who want city living without compromising on quality.",
    highlights: ["Tech-Focused", "Modern Campus", "Central Location"],
    trustBadges: ["Tech-Focused", "Central Location", "Growing Reputation"],
    inspectionDate: "2025-02-01",
    acceptanceRate: "45%",
    visitCount: 3,
    // Phase 4 — Editorial
    verdict:
      "The urban choice for tech-forward families — most accessible fees on this list with real Lisbon energy.",
    parentWhisper:
      "\"Living and schooling in Parque das Nações is seamless. We walk to school past the river every morning.\" — Dutch parent, relocated 2024",
    // Phase 4 — SEO/GEO
    coordinates: { lat: 38.7656, lng: -9.0979 },
  },
];
