import type { Neighborhood } from "./types";

export type { Neighborhood };

export const neighborhoodsData: Neighborhood[] = [
  {
    id: "1",
    slug: "cascais",
    name: "Cascais",
    location: "Lisbon Coast",
    vibe: "Relaxed Coastal Luxury",
    description:
      "Portugal's most sought-after expat address. Cascais blends sandy Atlantic beaches, a bustling marina, and a historic town centre — all 30 minutes from Lisbon by train. It is home to the largest expat community in the country and hosts St. Julian's School, one of Europe's top-ranked international schools.",
    highlights: ["Beautiful Beaches", "International Community", "Safe & Walkable"],
    // Phase 4 — Lifestyle context
    commuteContext: "15 min to St. Julian's School by car · 30 min to Lisbon Oriente by train",
    vibeAdjectives: ["Safe", "Walkable", "Expat Hub", "Beach Town", "Dog-Friendly"],
    amenities: ["🏖 Atlantic beaches", "🏫 St. Julian's School", "🚋 Train to Lisbon", "⛵ Marina", "🛒 Cascais Shopping"],
    // Phase 4 — SEO/GEO structured data
    coordinates: { lat: 38.6969, lng: -9.4227 },
  },
  {
    id: "2",
    slug: "estoril",
    name: "Estoril",
    location: "Lisbon Coast",
    vibe: "Elegant & Quiet",
    description:
      "Neighbour to Cascais and just as beautiful — without the tourist crowds. Estoril is famous for its grand casino gardens, Belle Époque architecture, and pristine beaches. It shares the Cascais Line train, making Lisbon and St. Julian's School equally accessible.",
    highlights: ["Grand Casino & Gardens", "Golf Courses", "Beach Access"],
    // Phase 4 — Lifestyle context
    commuteContext: "20 min to St. Julian's School by car · 28 min to Lisbon Oriente by train",
    vibeAdjectives: ["Quiet", "Elegant", "Upscale", "Peaceful", "Beachfront"],
    amenities: ["🏖 Estoril beach", "🎰 Casino Gardens", "⛳ Golf courses", "🚋 Train to Lisbon", "🏫 Near St. Julian's"],
    // Phase 4 — SEO/GEO structured data
    coordinates: { lat: 38.7063, lng: -9.3967 },
  },
  {
    id: "3",
    slug: "campodeourique",
    name: "Campo de Ourique",
    location: "Central Lisbon",
    vibe: "Village in the City",
    description:
      "Lisbon's most liveable neighbourhood — a flat, grid-like area that feels like a self-contained village inside the city. Famous for its Mercado de Campo de Ourique, independent cafés, and an exceptionally strong sense of community. Perfect for families who want urban convenience with a calm, safe pace.",
    highlights: ["Campo de Ourique Market", "Flat & Walkable", "Traditional Shops"],
    // Phase 4 — Lifestyle context
    commuteContext: "20 min to United Lisbon International School by metro · 35 min to Cascais schools by car",
    vibeAdjectives: ["Walkable", "Family-Friendly", "Artsy", "Safe", "Community"],
    amenities: ["🛒 Mercado de Campo de Ourique", "🏫 Near city schools", "🚇 Metro access", "☕ Café culture", "🌳 Jardim da Parada"],
    // Phase 4 — SEO/GEO structured data
    coordinates: { lat: 38.7205, lng: -9.1624 },
  },
  {
    id: "4",
    slug: "parquedasnacoes",
    name: "Parque das Nações",
    location: "East Lisbon",
    vibe: "Modern & Spacious",
    description:
      "Built for Expo 98 and still Lisbon's most contemporary neighbourhood. Wide riverfront promenades, modern apartments, the Oceanarium, and excellent metro connections make it a natural choice for tech-sector expats. United Lisbon International School is within walking distance.",
    highlights: ["Riverfront Parks", "Modern Apartments", "Shopping Center"],
    // Phase 4 — Lifestyle context
    commuteContext: "Walking distance to United Lisbon International School · 15 min to Lisbon airport",
    vibeAdjectives: ["Modern", "Spacious", "Tech Hub", "Riverfront", "International"],
    amenities: ["🌊 Tagus riverfront", "🏫 United Lisbon School (walking)", "✈️ 15 min to airport", "🛒 Vasco da Gama Shopping", "🐟 Oceanarium"],
    // Phase 4 — SEO/GEO structured data
    coordinates: { lat: 38.7686, lng: -9.0969 },
  },
  {
    id: "5",
    slug: "sintra",
    name: "Sintra",
    location: "Greater Lisbon",
    vibe: "Fairytale & Nature",
    description:
      "A UNESCO World Heritage site nestled in misty forested hills with romantic palaces and centuries of history. Living in Sintra offers a unique connection to nature and slower pace — and direct access to both TASIS Portugal and CAISL, two of Portugal's most respected international schools.",
    highlights: ["Historic Palaces", "Forested Hills", "Cooler Climate"],
    // Phase 4 — Lifestyle context
    commuteContext: "10 min to TASIS Portugal · 15 min to CAISL · 45 min to Lisbon by train",
    vibeAdjectives: ["Nature", "Historic", "Peaceful", "Cool Climate", "Unique"],
    amenities: ["🏰 UNESCO palaces", "🏫 TASIS Portugal & CAISL", "🌲 Arrábida forests", "🚋 Train to Lisbon", "🏖 20 min to beaches"],
    // Phase 4 — SEO/GEO structured data
    coordinates: { lat: 38.7998, lng: -9.3878 },
  },
];
