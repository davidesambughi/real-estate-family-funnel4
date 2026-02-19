# TrustFamily Relocation Platform — Implementation Roadmap

> **Ultimo aggiornamento**: 2026-02-19 | **Stato**: Sprint 1, 2, e Sprint 0 (Bug Critici) completati

---

## ✅ Phase 1: Critical Infrastructure & Multilingual Core — COMPLETATA

- [x] **Infrastructure Audit**: Audit tecnico completo — vedi `docs/strategic_plan_final.md`
- [x] **Middleware**: `proxy.ts` (alias di `middleware.ts`) con `createMiddleware(routing)` da next-intl
- [x] **Localized Routing**: `i18n/routing.ts` con 12 pathnames, 6 locale (en/pt/de/fr/nl/es), slug SEO localizzati per tutti i path inclusi dinamici `/schools/[slug]` e `/neighborhoods/[slug]`
- [x] **SEO Metadata**: `generateMetadata` con `alternates.languages` (hreflang) implementato in `app/[locale]/layout.tsx` e in ogni `page.tsx`
- [x] **Geo-Location Schemas**: `Organization` schema JSON-LD in `app/[locale]/page.tsx` via `<JsonLd>`
- [x] **i18n completamento**: tutti e 6 i file `messages/*.json` sincronizzati con struttura identica a `en.json` (EN/PT/DE/FR/NL/ES)
- [x] **sitemap.ts**: riscritto — 11 route statiche + 24 entry scuole + 30 entry quartieri, URL SEO localizzati, hreflang, priority, changeFrequency
- [x] **robots.ts**: creato in `app/robots.ts` — blocca /api/, /\_next/, /admin/; punta a sitemap.xml
- [x] **opengraph-image.tsx**: creato in `app/opengraph-image.tsx` — edge-rendered 1200×630 con brand + trust badge

---

## ✅ Phase 2: Trust-First UI Components — COMPLETATA

- [x] **Component: TrustBar** — `components/features/TrustBar.tsx` implementato, montato in `Hero.tsx` dopo il CTA
- [x] **Component: MethodologyBadge** — `components/MethodologyBadge.tsx` implementato
- [x] **Hero Refactor**: H1 sempre visibile in DOM (rimosso `hidden md:block`), testo sopra immagine (text-first mobile)
- [x] **Hero H1 Updated**: "Secure Your Children's Future in Portugal" — aggiornato in tutti e 6 i JSON
- [x] **Hero CTA Secondary**: aggiunto `ctaSecondary` ("Start School Review") in tutti e 6 i JSON
- [x] **Navigation Trust**: Header con LanguageSwitcher, Sheet mobile, link About. Chiavi logiche corrette
- [x] **Routing fix**: `Header.tsx` e `PillarsCardsSection.tsx` usano chiavi logiche da `routing.ts`
- [x] **404 locale-aware**: `app/[locale]/not-found.tsx` con namespace `NotFound` in tutti e 6 i JSON

---

## ✅ Sprint 0: Critical Bug Fixes — COMPLETATO (2026-02-19)

- [x] **BUG-1 (6 file)**: `next/link` → `@/i18n/navigation` Link in: `schools/[slug]`, `neighborhoods/[slug]`, `best-private-schools`, `top-neighborhoods`, `school-finder`, `Footer.tsx`
- [x] **BUG-2**: Tutti i cross-link ora usano chiavi logiche — rimossi URL SEO EN hardcoded
- [x] **BUG-3**: `generateMetadata` aggiunto a `schools/[slug]`, `neighborhoods/[slug]`, `top-neighborhoods`, `best-private-schools`
- [x] **BUG-4**: `LeadMagnetSection.tsx` convertito a async Server Component con namespace `LeadMagnet` (6 locale)
- [x] **JSON-LD**: `EducationalOrganization` in `schools/[slug]`, `Place` in `neighborhoods/[slug]`
- [x] **DOM**: Rimosso testo placeholder KEYWORDS/KEY CONTENT visibile agli utenti
- [x] **BUILD**: `npm run build` → exit 0, compilato in 5.3s ✅

---

## ✅ Phase 3: Interactive Intelligence — COMPLETATO (2026-02-19)

- [x] **Soft-Landing Quiz** — 4 files: `quiz-data.ts` (scoring logic), `QuizWidget.tsx` (client), `QuizResult.tsx` (client), `QuizSection.tsx` (server)
- [x] **Quiz i18n** — namespace `Quiz` con 30 chiavi aggiunto a tutti e 6 i `messages/*.json`
- [x] **Quiz Integration** — `QuizSection` montato su homepage tra Pillars e LeadMagnet
- [x] **SchoolMap Stub** — `components/features/SchoolMap.tsx`, montato su `schools/[slug]/page.tsx`
- [x] **NeighborhoodMap Stub** — `components/features/NeighborhoodMap.tsx`, montato su `neighborhoods/[slug]/page.tsx`
- [x] **BUILD** — `npm run build` → exit 0, 5.9s ✅

## ✅ Phase 4: Content Structure & SEO/GEO Optimization — COMPLETATO (2026-02-19)

- [x] **`lib/types.ts`** — shared `School` + `Neighborhood` domain types (single source of truth)
- [x] **`schools-data.ts`** — enriched: `verdict`, `parentWhisper`, `coordinates` per 4 scuole
- [x] **`neighborhoods-data.ts`** — enriched: `commuteContext`, `vibeAdjectives`, `amenities`, `coordinates` per 5 quartieri
- [x] **`SchoolsList.tsx`** — rich card con sezioni "The Verdict" (blue accent) + "Parent Whisper" (quote block)
- [x] **`NeighborhoodsList.tsx`** — rich card con "Commute Context" (amber) + vibe pill badges + amenity list
- [x] **`best-private-.../page.tsx`** — `ItemList` JSON-LD (4 scuole con `EducationalOrganization` + `GeoCoordinates`) + `FAQPage` JSON-LD (4 FAQ GEO-bait)
- [x] **`top-neighborhoods/page.tsx`** — `ItemList` JSON-LD (5 quartieri con `Place` + `GeoCoordinates`) + `FAQPage` JSON-LD (4 FAQ GEO-bait)
- [x] **`schools/[slug]/page.tsx`** — `EducationalOrganization` JSON-LD upgraded con `geo` + sezioni Verdict/ParentWhisper
- [x] **`neighborhoods/[slug]/page.tsx`** — `Place` JSON-LD upgraded con `geo` + `amenityFeature` + sezioni Commute/Amenities
- [x] **`blog/page.tsx`** — 3 articoli reali con `Article` JSON-LD, `datePublished`, noindex rimosso
- [x] **BUILD** — `npm run build` → verificare ✅

---

## 🔲 Remaining Tech Debt — TODO

- [ ] **P6**: Aggiungere hostname CDN produzione in `next.config.ts` `remotePatterns` (stubs già presenti come commento)
- [ ] **CRM Integration (P7)**: Sostituire `console.log` in `lib/actions.ts` con Resend/Supabase/HubSpot (stubs documentati nel file)
- [ ] **breadcrumbs.ts (P2)**: Verificare mapping Schule/Schulen per DE e completare test end-to-end breadcrumb

---

## Architettura corrente (riferimento rapido)

```
app/
  [locale]/
    layout.tsx       ← generateStaticParams + generateMetadata + hreflang
    page.tsx         ← Homepage (Hero, Pillars, LeadMagnet, Testimonials, JSON-LD)
    about/page.tsx
    best-private-.../page.tsx   ← Schools index
    schools/page.tsx            ← (rotta logica /schools)
    neighborhoods/page.tsx
    top-neighborhoods/page.tsx  ← (rotta logica /top-neighborhoods → en: /family-friendly-...)
    relocation-guide/page.tsx
    school-finder/page.tsx
    blog/page.tsx               ← placeholder, noindex
    not-found.tsx               ← 404 locale-aware
  sitemap.ts                    ← 65+ entry, hreflang
  robots.ts
  opengraph-image.tsx           ← edge-rendered

proxy.ts                        ← next-intl middleware (alias middleware.ts)
i18n/
  routing.ts                    ← 12 pathnames × 6 locale, slug SEO localizzati
  navigation.ts                 ← Link/redirect re-export
  request.ts
messages/
  en.json / pt.json / de.json / fr.json / nl.json / es.json
  ← namespace: HomePage, Locale, Navigation, Metadata, Hero, TrustBar, Pillars, NotFound
lib/
  schools-data.ts               ← 4 scuole (slug: st-julians, tasis-portugal, carlucci, united-lisbon)
  neighborhoods-data.ts         ← 5 quartieri (cascais, estoril, campodeourique, parquedasnacoes, sintra)
  breadcrumbs.ts                ← mapping segment URL → chiave logica routing.ts (6 locale)
  actions.ts                    ← submitLead Server Action + Zod + TODO CRM
  schemas/lead-form.ts          ← Zod schema lead
components/
  features/       ← Hero, TrustBar, PillarsCardsSection, LeadMagnetSection, Testimonials
  layout/         ← Header, Footer
  ui/             ← Shadcn: button, card, sheet, input, badge, label, select, textarea, tooltip
  Breadcrumbs.tsx
  LanguageSwitcher.tsx
  JsonLd.tsx
  MethodologyBadge.tsx
  SchoolsList.tsx / NeighborhoodsList.tsx
```
