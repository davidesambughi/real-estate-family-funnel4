import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'pt', 'de', 'fr', 'nl', 'es'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/about': {
      en: '/about',
      pt: '/sobre',
      de: '/uber',
      fr: '/a-propos',
      nl: '/over',
      es: '/sobre'
    },
    '/best-private-and-public-international-schools-portugal-2026': {
      en: '/best-private-and-public-international-schools-portugal-2026',
      pt: '/melhores-escolas-internacionais-privadas-e-publicas-portugal-2026',
      de: '/beste-private-und-offentliche-internationale-schulen-portugal-2026',
      fr: '/meilleures-ecoles-internationales-privees-et-publiques-portugal-2026',
      nl: '/beste-prive-en-openbare-internationale-scholen-portugal-2026',
      es: '/mejores-escuelas-internacionales-privadas-y-publicas-portugal-2026'
    },
    '/top-neighborhoods': {
      en: '/family-friendly-neighborhoods-portugal',
      pt: '/bairros-familiares-portugal',
      de: '/familienfreundliche-nachbarschaften-portugal',
      fr: '/quartiers-familiaux-portugal',
      nl: '/gezinsvriendelijke-buurten-portugal',
      es: '/barrios-familiares-portugal'
    },
    '/relocation-guide': {
      en: '/family-relocation-guide-2026',
      pt: '/guia-relocacao-familia-2026',
      de: '/familien-umzugs-guide-2026',
      fr: '/guide-relocalisation-famille-2026',
      nl: '/familie-verhuisgids-2026',
      es: '/guia-relocacion-familia-2026'
    },
    '/neighborhoods': {
      en: '/neighborhoods',
      pt: '/bairros',
      de: '/nachbarschaften',
      fr: '/quartiers',
      nl: '/buurten',
      es: '/barrios'
    },
    '/school-finder': {
      en: '/school-finder',
      pt: '/encontrar-escola',
      de: '/schulfinder',
      fr: '/trouver-ecole',
      nl: '/school-zoeker',
      es: '/buscador-escuelas'
    },
    '/contact': {
      en: '/contact',
      pt: '/contato',
      de: '/kontakt',
      fr: '/contact',
      nl: '/contact',
      es: '/contacto'
    },
    '/privacy': {
      en: '/privacy',
      pt: '/privacidade',
      de: '/datenschutz',
      fr: '/confidentialite',
      nl: '/privacy',
      es: '/privacidad'
    },
    '/terms': {
      en: '/terms',
      pt: '/termos',
      de: '/agb',
      fr: '/conditions',
      nl: '/voorwaarden',
      es: '/terminos'
    },
    '/blog': {
      en: '/blog',
      pt: '/blog',
      de: '/blog',
      fr: '/blog',
      nl: '/blog',
      es: '/blog'
    },
    '/blog/[slug]': {
      en: '/blog/[slug]',
      pt: '/blog/[slug]',
      de: '/blog/[slug]',
      fr: '/blog/[slug]',
      nl: '/blog/[slug]',
      es: '/blog/[slug]'
    },
    // Dynamic routes
    '/schools': {
      en: '/schools',
      pt: '/escolas',
      de: '/schulen',
      fr: '/ecoles',
      nl: '/scholen',
      es: '/escuelas'
    },
    '/schools/[slug]': {
      en: '/school/[slug]',
      pt: '/escola/[slug]',
      de: '/schule/[slug]',
      fr: '/ecole/[slug]',
      nl: '/school/[slug]',
      es: '/escuela/[slug]'
    },
    '/neighborhoods/[slug]': {
      en: '/neighborhood/[slug]',
      pt: '/bairro/[slug]',
      de: '/nachbarschaft/[slug]',
      fr: '/quartier/[slug]',
      nl: '/buurt/[slug]',
      es: '/barrio/[slug]'
    }
  }
});
