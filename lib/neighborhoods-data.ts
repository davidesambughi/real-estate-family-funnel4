export interface Neighborhood {
  id: string;
  slug: string;
  name: string;
  location: string;
  vibe: string;
  description: string;
  highlights: string[];
}

export const neighborhoodsData: Neighborhood[] = [
  {
    id: "1",
    slug: "cascais",
    name: "Cascais",
    location: "Lisbon Coast",
    vibe: "Relaxed Coastal Luxury",
    description: "Cascais is a charming coastal town known for its sandy beaches, busy marina, and historic center. It offers a relaxed lifestyle with all modern amenities, making it a top choice for expat families.",
    highlights: ["Beautiful Beaches", "International Community", "Safe & Walkable"]
  },
  {
    id: "2",
    slug: "estoril",
    name: "Estoril",
    location: "Lisbon Coast",
    vibe: "Elegant & Quiet",
    description: "Neighbor to Cascais, Estoril is famous for its casino, gardens, and grand architecture. It is quieter than Cascais but shares the same beautiful coastline and easy access to Lisbon.",
    highlights: ["Grand Casino & Gardens", "Golf Courses", "Beach Access"]
  },
  {
    id: "3",
    slug: "campodeourique",
    name: "Campo de Ourique",
    location: "Central Lisbon",
    vibe: "Village in the City",
    description: "A flat, grid-like neighborhood in Lisbon that feels like a self-contained village. It is extremely family-friendly, with a famous market, many shops, and a strong sense of community.",
    highlights: ["Campo de Ourique Market", "Flat & Walkable", "Traditional Shops"]
  },
  {
    id: "4",
    slug: "parquedasnacoes",
    name: "Parque das Nações",
    location: "East Lisbon",
    vibe: "Modern & Spacious",
    description: "The most modern part of Lisbon, built for Expo 98. It features contemporary architecture, riverfront parks, the Oceanarium, and excellent transport links.",
    highlights: ["Riverfront Parks", "Modern Apartments", "Shopping Center"]
  },
   {
    id: "5",
    slug: "sintra",
    name: "Sintra",
    location: "Greater Lisbon",
    vibe: "Fairytale & Nature",
    description: "A UNESCO World Heritage site known for its romantic palaces and misty forests. Living here offers a connection to nature and history, though it can be cooler and hillier than the coast.",
    highlights: ["Historic Palaces", "Forested Hills", "Cooler Climate"]
  }
];
