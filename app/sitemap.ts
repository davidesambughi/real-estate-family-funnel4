import {MetadataRoute} from 'next';
import {routing} from '@/i18n/routing';

const host = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  // Simple example for static pages
  // In a real app, you'd iterate over routing.pathnames and fetch dynamic data
  
  const staticPages = [
    '/', 
    '/best-private-and-public-international-schools-portugal-2026',
    '/family-friendly-neighborhoods-portugal',
    '/family-relocation-guide-2026',
    '/school-finder',
    '/about'
  ];

  return staticPages.map(route => {
    return {
      url: `${host}/en${route === '/' ? '' : route}`, // Default to EN path?
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(routing.locales.map(locale => {
           // This is a simplification. Ideally use getPathname to resolve localized paths
           // taking into account the routing['pathnames'] config.
           // For now, simpler implementation:
           return [locale, `${host}/${locale}${route === '/' ? '' : route}`];
        }))
      }
    };
  });
}
