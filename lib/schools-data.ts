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
}

export const schoolsData: School[] = [
  {
    id: "1",
    slug: "st-julians-school",
    name: "St. Julian's School",
    location: "Carcavelos, Cascais",
    neighborhoodSlug: "cascais",
    curriculum: "British, IB Diploma",
    fees: "€10,000 - €22,000",
    description: "St. Julian's School is one of the oldest and most prestigious international schools in Portugal, offering a British curriculum and the IB Diploma program. Located near the beach in Carcavelos, it has a rich history and a strong community.",
    highlights: ["Historic Campus", "Strong Sports Program", "Excellent IB Results"]
  },
  {
    id: "2",
    slug: "tasis-portugal",
    name: "TASIS Portugal",
    location: "Sintra",
    neighborhoodSlug: "sintra",
    curriculum: "American, IB Diploma",
    fees: "€11,000 - €24,000",
    description: "TASIS Portugal is a relatively new addition to the prestigious TASIS family of schools. It offers a rigorous American curriculum leading to the IB Diploma, set in a beautiful campus in Sintra.",
    highlights: ["Modern Facilities", "Arts & Music Focus", "Global Network"]
  },
  {
    id: "3",
    slug: "carlucci-american-international-school",
    name: "Carlucci American International School of Lisbon (CAISL)",
    location: "Sintra",
    neighborhoodSlug: "sintra",
    curriculum: "American, IB Diploma",
    fees: "€9,000 - €21,000",
    description: "CAISL is the only school in Portugal supported by the US State Department. It offers an American inquiry-based approach and the IB Diploma, serving a diverse international community.",
    highlights: ["US State Dept Support", "Inclusive Community", "Strong STEM"]
  },
  {
    id: "4",
    slug: "united-lisbon-international-school",
    name: "United Lisbon International School",
    location: "Lisbon (Parque das Nações)",
    neighborhoodSlug: "parquedasnacoes",
    curriculum: "American, IB Diploma",
    fees: "€10,500 - €20,000",
    description: "United Lisbon is a modern international school located in the heart of the tech hub of Lisbon. It focuses on technology, entrepreneurship, and preparing students for the future.",
    highlights: ["Tech-Focused", "Modern Campus", "Central Location"]
  }
];
