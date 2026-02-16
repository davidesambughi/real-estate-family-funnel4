/**
 * Breadcrumbs Mapping Configuration
 * 
 * This file centralizes the logic for mapping URL segments to their parent routes.
 * It prevents hardcoding in UI components and allows for easier maintenance.
 * 
 * Keys match URL segments (e.g., 'school', 'neighborhood').
 * Values match the internal Next.js route path (which next-intl handles).
 */

export const BREADCRUMB_MAPPING: Record<string, string> = {
  // English mappings
  'school': '/best-private-and-public-international-schools-portugal-2026',
  'schools': '/best-private-and-public-international-schools-portugal-2026',
  'neighborhood': '/family-friendly-neighborhoods-portugal',
  'neighborhoods': '/family-friendly-neighborhoods-portugal',
  
  // Portuguese mappings
  'escola': '/best-private-and-public-international-schools-portugal-2026',
  'escolas': '/best-private-and-public-international-schools-portugal-2026',
  'bairro': '/family-friendly-neighborhoods-portugal',
  'bairros': '/family-friendly-neighborhoods-portugal',
  
  // Add other languages as needed (de, fr, nl, es)
  // German
  'schule': '/best-private-and-public-international-schools-portugal-2026',
  'schulen': '/best-private-and-public-international-schools-portugal-2026',
  'nachbarschaft': '/family-friendly-neighborhoods-portugal',
  'nachbarschaften': '/family-friendly-neighborhoods-portugal',
  
  // French
  'ecole': '/best-private-and-public-international-schools-portugal-2026',
  'ecoles': '/best-private-and-public-international-schools-portugal-2026',
  'quartier': '/family-friendly-neighborhoods-portugal',
  'quartiers': '/family-friendly-neighborhoods-portugal',
};

/**
 * Helper to get the redirect path for a given segment.
 * Returns the mapped path or null if no mapping exists.
 */
export function getBreadcrumbPath(segment: string): string | null {
  const normalized = segment.toLowerCase();
  return BREADCRUMB_MAPPING[normalized] || null;
}
