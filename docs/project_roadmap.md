# TrustFamily Relocation Platform — Implementation Roadmap

> **Ultimo aggiornamento**: 2026-02-19 | **Stato**: Sprint 1 e 2 completati

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
- [x] **Hero Refactor**: H1 sempre visibile in DOM (rimosso `hidden md:block`), testo sopra immagine (text-first mobile), layout compatibile con Google mobile-first indexing
- [x] **Navigation Trust**: Header con LanguageSwitcher, Sheet mobile, link About. Chiavi logiche corrette (no URL SEO hardcoded)
- [x] **Routing fix**: `Header.tsx` e `PillarsCardsSection.tsx` usano chiavi logiche da `routing.ts`, non URL tradotti
- [x] **404 locale-aware**: `app/[locale]/not-found.tsx` con namespace `NotFound` in tutti e 6 i JSON

---

## 🔲 Phase 3: Interactive Intelligence (Engagement) — TODO

- [ ] **Component: Soft-Landing Quiz** — scheletro "Find Your Perfect Fit" (Lead Magnet)
- [ ] **SchoolMap.tsx** — "Commute Validator" con pin scuola + raggio 20min
- [ ] **NeighborhoodMap.tsx** — "Amenity Radar" con pin quartiere + scuole vicine

---

## 🔲 Phase 4: Content Structure & SEO Optimization — TODO

- [ ] **Microcopy Homepage**: H1/H2 con focus "Relocation Overwhelm" solution (allineamento con `strategic_plan_final.md` §2A)
- [ ] **School Page**: sezioni "The Verdict" e "Parent Whisper" (placeholder)
- [ ] **Neighborhood Page**: sezioni "Commute Context" e "Vibe Verification"
- [ ] **Contextual CTAs**: "Download Fee Structure" dentro le school card
- [ ] **Blog**: contenuto reale in `app/[locale]/blog/page.tsx` (ora placeholder con noindex)

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
