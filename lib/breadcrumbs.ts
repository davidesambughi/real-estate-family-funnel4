/**
 * Breadcrumbs Mapping Configuration
 *
 * Maps URL segments (as they appear in the actual browser URL, per locale)
 * to their LOGICAL parent route key (the key used in i18n/routing.ts `pathnames`).
 *
 * next-intl's Link/redirect functions require the LOGICAL KEY, not the translated URL.
 * This map supports all 6 locales: en, pt, de, fr, nl, es.
 */

// ─── Schools ──────────────────────────────────────────────────────────────────
// Logical key: '/best-private-and-public-international-schools-portugal-2026'
// en-URL: /best-private-and-public-international-schools-portugal-2026
// (other locales: see routing.ts)

const SCHOOLS_LOGICAL_KEY =
  '/best-private-and-public-international-schools-portugal-2026' as const;

// ─── Neighborhoods ────────────────────────────────────────────────────────────
// Logical key: '/top-neighborhoods'
// en-URL: /family-friendly-neighborhoods-portugal

const NEIGHBORHOODS_LOGICAL_KEY = '/top-neighborhoods' as const;

// ─── Breadcrumb Mapping ───────────────────────────────────────────────────────
// Keys: the URL path SEGMENT as it appears in the browser for a given locale.
// Values: the LOGICAL route key to pass to next-intl Link / redirect.

export const BREADCRUMB_MAPPING: Record<string, string> = {
  // English
  'school': SCHOOLS_LOGICAL_KEY,
  'schools': SCHOOLS_LOGICAL_KEY,
  'neighborhood': NEIGHBORHOODS_LOGICAL_KEY,
  'neighborhoods': NEIGHBORHOODS_LOGICAL_KEY,
  // The en SEO slug for neighborhoods (appears in the URL after routing.ts maps it)
  'family-friendly-neighborhoods-portugal': NEIGHBORHOODS_LOGICAL_KEY,
  // The en SEO slug for schools
  'best-private-and-public-international-schools-portugal-2026': SCHOOLS_LOGICAL_KEY,

  // Portuguese
  'escola': SCHOOLS_LOGICAL_KEY,
  'escolas': SCHOOLS_LOGICAL_KEY,
  'bairro': NEIGHBORHOODS_LOGICAL_KEY,
  'bairros': NEIGHBORHOODS_LOGICAL_KEY,

  // German
  'schule': SCHOOLS_LOGICAL_KEY,
  'schulen': SCHOOLS_LOGICAL_KEY,
  'nachbarschaft': NEIGHBORHOODS_LOGICAL_KEY,
  'nachbarschaften': NEIGHBORHOODS_LOGICAL_KEY,

  // French
  'ecole': SCHOOLS_LOGICAL_KEY,
  'ecoles': SCHOOLS_LOGICAL_KEY,
  'quartier': NEIGHBORHOODS_LOGICAL_KEY,
  'quartiers': NEIGHBORHOODS_LOGICAL_KEY,

  // Dutch
  'school-zoeker': SCHOOLS_LOGICAL_KEY, // school-finder slug
  'scholen': SCHOOLS_LOGICAL_KEY,
  'buurt': NEIGHBORHOODS_LOGICAL_KEY,
  'buurten': NEIGHBORHOODS_LOGICAL_KEY,

  // Spanish
  'escuela': SCHOOLS_LOGICAL_KEY,
  'escuelas': SCHOOLS_LOGICAL_KEY,
  'barrio': NEIGHBORHOODS_LOGICAL_KEY,
  'barrios': NEIGHBORHOODS_LOGICAL_KEY,
};

/**
 * Returns the LOGICAL route key for use with next-intl Link/redirect,
 * given a URL segment from the actual browser URL.
 * Returns null if no mapping exists.
 */
export function getBreadcrumbPath(segment: string): string | null {
  const normalized = segment.toLowerCase();
  return BREADCRUMB_MAPPING[normalized] ?? null;
}
