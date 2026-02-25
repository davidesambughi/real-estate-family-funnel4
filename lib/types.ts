/**
 * Shared domain types for TrustFamily Relocation.
 *
 * Both School and Neighborhood are consumed by:
 *   - lib/schools-data.ts / lib/neighborhoods-data.ts (data)
 *   - components/SchoolsList.tsx / NeighborhoodsList.tsx (render)
 *   - app/[locale]/schools/[slug]/page.tsx (detail + JSON-LD)
 *   - app/[locale]/neighborhoods/[slug]/page.tsx (detail + JSON-LD)
 *   - app/[locale]/best-private-.../page.tsx (ItemList JSON-LD)
 *   - app/[locale]/top-neighborhoods/page.tsx (ItemList JSON-LD)
 *
 * Phase 5 upgrade path: becomes the Zod schema for Supabase/Prisma.
 */

export interface GeoCoordinates {
  lat: number;
  lng: number;
}

// ── i18n translation buckets (Opzione C) ─────────────────────────────────────
// Only `en` is required; other locales are optional and fall back to `en`.

export interface SchoolTranslation {
  description: string;
  verdict: string;
  parentWhisper: string;
  highlights: string[];
  trustBadges: string[];
}

export interface TestimonialTranslation {
  quote: string;
}

export interface Testimonial {
  id: number;
  attribution: string;
  detail: string;
  translations: { en: TestimonialTranslation } & Partial<Record<LocaleKey, TestimonialTranslation>>;
}

export interface NeighborhoodTranslation {
  vibe: string;
  description: string;
  highlights: string[];
  commuteContext: string;
  vibeAdjectives: string[];
  amenities: string[];
}

export type LocaleKey = 'pt' | 'de' | 'fr' | 'nl' | 'es';

export interface School {
  // ── Core identity ───────────────────────────────────────────────
  id: string;
  slug: string;
  name: string;
  location: string;
  neighborhoodSlug: string;

  // ── Academic profile (non-translatable) ─────────────────────────
  curriculum: string;
  fees: string;

  // ── Trust Intelligence ──────────────────────────────────────────
  inspectionDate?: string;
  acceptanceRate?: string;
  visitCount?: number;
  feeDocument?: string;

  // ── Phase 4: SEO/GEO structured data ───────────────────────────
  coordinates: GeoCoordinates;

  // ── i18n translations ───────────────────────────────────────────
  translations: { en: SchoolTranslation } & Partial<Record<LocaleKey, SchoolTranslation>>;
}

export interface Neighborhood {
  // ── Core identity ───────────────────────────────────────────────
  id: string;
  slug: string;
  name: string;
  location: string;

  // ── Phase 4: SEO/GEO structured data ───────────────────────────
  coordinates: GeoCoordinates;

  // ── i18n translations ───────────────────────────────────────────
  translations: { en: NeighborhoodTranslation } & Partial<Record<LocaleKey, NeighborhoodTranslation>>;
}
