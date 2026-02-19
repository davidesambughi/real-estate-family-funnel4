import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { schoolsData } from '@/lib/schools-data';
import { neighborhoodsData } from '@/lib/neighborhoods-data';

const host = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

/**
 * Resolves the translated URL for a logical pathname key and a given locale.
 * Returns the locale-specific path from routing.ts pathnames, or the key itself
 * as a fallback (for routes where key === URL, e.g. '/about').
 */
function resolveLocalePath(
  logicalKey: keyof typeof routing.pathnames,
  locale: string
): string {
  const pathData = routing.pathnames[logicalKey];
  if (typeof pathData === 'string') return pathData;
  return (pathData as Record<string, string>)[locale] ?? logicalKey;
}

/** Build a full sitemap entry with all hreflang alternates. */
function buildEntry(
  logicalKey: keyof typeof routing.pathnames,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly'
): MetadataRoute.Sitemap[number] {
  const enPath = resolveLocalePath(logicalKey, 'en');
  const canonical = `${host}/en${enPath === '/' ? '' : enPath}`;

  const languages = Object.fromEntries(
    routing.locales.map((locale) => {
      const path = resolveLocalePath(logicalKey, locale);
      return [locale, `${host}/${locale}${path === '/' ? '' : path}`];
    })
  );

  return {
    url: canonical,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  // ── 1. Static pages ─────────────────────────────────────────────────────────
  const staticEntries = [
    buildEntry('/', 1.0, 'weekly'),
    buildEntry('/best-private-and-public-international-schools-portugal-2026', 0.9, 'weekly'),
    buildEntry('/top-neighborhoods', 0.9, 'weekly'),
    buildEntry('/relocation-guide', 0.8, 'monthly'),
    buildEntry('/school-finder', 0.8, 'monthly'),
    buildEntry('/about', 0.6, 'yearly'),
    buildEntry('/schools', 0.7, 'weekly'),
    buildEntry('/neighborhoods', 0.7, 'weekly'),
    buildEntry('/contact', 0.5, 'yearly'),
    buildEntry('/privacy', 0.3, 'yearly'),
    buildEntry('/terms', 0.3, 'yearly'),
  ];

  // ── 2. Dynamic school pages ──────────────────────────────────────────────────
  const schoolEntries: MetadataRoute.Sitemap = schoolsData.flatMap((school) =>
    routing.locales.map((locale) => {
      // Logical key for dynamic route: '/schools/[slug]'
      const logicalKey = '/schools/[slug]';
      const pathData = routing.pathnames[logicalKey];
      // e.g. en → '/school/[slug]', pt → '/escola/[slug]'
      const templatePath =
        typeof pathData === 'string'
          ? pathData
          : (pathData as Record<string, string>)[locale] ?? `/school/[slug]`;

      const resolvedPath = templatePath.replace('[slug]', school.slug);
      const url = `${host}/${locale}${resolvedPath}`;

      // Build alternates across locales for this specific slug
      const languages = Object.fromEntries(
        routing.locales.map((l) => {
          const tmpl =
            typeof pathData === 'string'
              ? pathData
              : (pathData as Record<string, string>)[l] ?? `/school/[slug]`;
          return [l, `${host}/${l}${tmpl.replace('[slug]', school.slug)}`];
        })
      );

      return {
        url,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        alternates: { languages },
      };
    })
  );

  // ── 3. Dynamic neighborhood pages ───────────────────────────────────────────
  const neighborhoodEntries: MetadataRoute.Sitemap = neighborhoodsData.flatMap(
    (neighborhood) =>
      routing.locales.map((locale) => {
        const logicalKey = '/neighborhoods/[slug]';
        const pathData = routing.pathnames[logicalKey];
        const templatePath =
          typeof pathData === 'string'
            ? pathData
            : (pathData as Record<string, string>)[locale] ?? `/neighborhood/[slug]`;

        const resolvedPath = templatePath.replace('[slug]', neighborhood.slug);
        const url = `${host}/${locale}${resolvedPath}`;

        const languages = Object.fromEntries(
          routing.locales.map((l) => {
            const tmpl =
              typeof pathData === 'string'
                ? pathData
                : (pathData as Record<string, string>)[l] ?? `/neighborhood/[slug]`;
            return [l, `${host}/${l}${tmpl.replace('[slug]', neighborhood.slug)}`];
          })
        );

        return {
          url,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
          alternates: { languages },
        };
      })
  );

  return [...staticEntries, ...schoolEntries, ...neighborhoodEntries];
}
