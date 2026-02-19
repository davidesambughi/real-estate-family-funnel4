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

export interface School {
  // ── Core identity ───────────────────────────────────────────────
  id: string;
  slug: string;
  name: string;
  location: string;
  neighborhoodSlug: string;

  // ── Academic profile ────────────────────────────────────────────
  curriculum: string;
  fees: string;
  description: string;
  highlights: string[];

  // ── Trust Intelligence ──────────────────────────────────────────
  trustBadges: string[];
  inspectionDate?: string;
  acceptanceRate?: string;
  visitCount?: number;

  // ── Phase 4: Editorial & GEO content ───────────────────────────
  verdict: string;
  parentWhisper: string;
  feeDocument?: string;

  // ── Phase 4: SEO/GEO structured data ───────────────────────────
  coordinates: GeoCoordinates;
}

export interface Neighborhood {
  // ── Core identity ───────────────────────────────────────────────
  id: string;
  slug: string;
  name: string;
  location: string;

  // ── Editorial profile ───────────────────────────────────────────
  vibe: string;
  description: string;
  highlights: string[];

  // ── Phase 4: Commute & lifestyle content ────────────────────────
  commuteContext: string;
  vibeAdjectives: string[];
  amenities: string[];

  // ── Phase 4: SEO/GEO structured data ───────────────────────────
  coordinates: GeoCoordinates;
}
