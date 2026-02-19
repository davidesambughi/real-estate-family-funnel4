# TrustFamily Relocation — Task Tracker

> Ultimo aggiornamento: 2026-02-19 | Leggi `docs/strategic_plan_final.md` e `docs/project_roadmap.md` per contesto completo.

---

## ✅ Sprint 1 — COMPLETATO (Alta Priorità)

- [x] **P1** — Chiavi logiche in `Header.tsx` e `PillarsCardsSection.tsx`; rimossi `as any`
- [x] **P3** — `messages/*.json` sincronizzati: navigation completa (schools/neighborhoods/guides/schoolFinder/about), rimossa chiave fantasma `blog`, metaTitle/Desc aggiunti (tutti e 6 i locale)
- [x] **P10** — `Hero.tsx`: `<h1>` sempre nel DOM, layout text-first mobile (rimosso `hidden md:block`)

## ✅ Sprint 2 — COMPLETATO (Media Priorità)

- [x] **P2** — `lib/breadcrumbs.ts`: costanti tipizzate × chiave logica, mapping 6 locale (aggiunto NL+ES)
- [x] **P4** — `app/sitemap.ts`: 11 route statiche + 24 scuole + 30 quartieri, URL SEO localizzati, hreflang
- [x] **P7** — `lib/actions.ts`: typo `recieved→received`, TODO CRM block (Resend/Supabase/HubSpot)
- [x] **P8** — `app/robots.ts` + `app/opengraph-image.tsx` (edge, 1200×630)
- [x] **P11** — `app/[locale]/not-found.tsx` + namespace `NotFound` in tutti e 6 i JSON

## ✅ Tech Debt — COMPLETATO (Bassa Priorità)

- [x] **P6** — `next.config.ts`: CDN stubs documentati come commento
- [x] **P9** — `app/[locale]/blog/page.tsx`: placeholder con `robots: noindex`
- [x] **P12** — Cartella rinominata `buidling_logs` → `building_logs`
- [x] **DOC** — `docs/project_roadmap.md`: checkboxes aggiornati, architettura documentata
- [x] **DOC** — `docs/strategic_plan_final.md`: status per fase + regole architetturali

## ✅ Sprint 0 (Bug Critici) — COMPLETATO (2026-02-19)

- [x] **BUG-1** — `next/link` → `@/i18n/navigation` Link in 6 file: `schools/[slug]`, `neighborhoods/[slug]`, `best-private-schools` (index), `top-neighborhoods` (index), `school-finder`, `Footer.tsx`
- [x] **BUG-2** — URL SEO hardcoded rimossi: tutti i cross-link ora usano chiavi logiche (`/top-neighborhoods`, `/relocation-guide`, `/best-private-and-public-international-schools-portugal-2026`)
- [x] **BUG-3** — `generateMetadata` aggiunto a: `schools/[slug]`, `neighborhoods/[slug]`, `top-neighborhoods`, `best-private-schools` (index)
- [x] **BUG-4** — `LeadMagnetSection.tsx` convertito a Server Component i18n con namespace `LeadMagnet` (6 locale)
- [x] **CONTENT** — Hero H1 aggiornato a "Secure Your Children's Future in Portugal" in tutti e 6 i JSON
- [x] **CONTENT** — `Hero.tsx`: aggiunto secondo CTA `ctaSecondary` ("Start School Review")
- [x] **JSON-LD** — `EducationalOrganization` schema in `schools/[slug]/page.tsx`
- [x] **JSON-LD** — `Place` schema in `neighborhoods/[slug]/page.tsx`
- [x] **DOM** — Rimosso testo placeholder KEYWORDS/KEY CONTENT visibile agli utenti
- [x] **BUILD** — Verificato: `npm run build` exit 0, compiled in 5.3s ✅

---

## ✅ Phase 3 — Interactive Intelligence — COMPLETATO (2026-02-19)

- [x] **QUIZ** — `components/features/quiz/quiz-data.ts`: scoring logic, 4 steps (budget/lifestyle/curriculum/timeline), `matchSchools()` e `matchNeighborhoods()`
- [x] **QUIZ** — `QuizWidget.tsx` (use client): multi-step, animated progress bar, emoji option cards, back/next navigation
- [x] **QUIZ** — `QuizResult.tsx` (use client): top-2 schools (Best Match badge) + top-2 neighborhoods matched, i18n Link
- [x] **QUIZ** — `QuizSection.tsx` (Server Component): fetch translations → pass as serializable props to QuizWidget
- [x] **QUIZ** — namespace `Quiz` aggiunto a tutti e 6 i `messages/*.json` (30 chiavi × 6 locale)
- [x] **QUIZ** — `QuizSection` montato su homepage (tra PillarsCardsSection e LeadMagnetSection)
- [x] **MAP** — `SchoolMap.tsx`: stub statico con grid animato + pin + Google Maps link; montato su `schools/[slug]/page.tsx`
- [x] **MAP** — `NeighborhoodMap.tsx`: stub statico con amenity badges (Schools/Cafés/Parks) + pin + Google Maps link; montato su `neighborhoods/[slug]/page.tsx`
- [x] **BUILD** — `npm run build` → exit 0, compilato in 5.9s ✅

### Regole aggiuntive (Phase 3)

- Pattern: traduzione su Server, stato su Client. Il server wrapper passa tutte le traduzioni come plain props al componente client.
- Slug di scuole/quartieri usati nel quiz devono combaciare con i slug in `lib/schools-data.ts` e `lib/neighborhoods-data.ts`.
- In Phase 5: sostituire i due stub con embed Mapbox/Google Maps reali.

---

### ✅ Phase 4 — Content & SEO — COMPLETATO (2026-02-19)

- [x] Aggiornare `schools-data.ts`: aggiungere `verdict`, `parentWhisper`, `feeDocument`
- [x] `SchoolsList.tsx`: sezioni "The Verdict" + "Parent Whisper" + CTA "Download Fee Structure"
- [x] Aggiornare `neighborhoods-data.ts`: aggiungere `commuteContext`, `vibeAdjectives`, `amenities`
- [x] `NeighborhoodsList.tsx`: sezioni "Commute Context" + "Vibe Verification"
- [x] Immagini reali → aggiungere CDN hostname a `next.config.ts` (Pending in Tech Debt)
- [x] Blog: contenuto reale (rimuovere noindex)
- [ ] Revisione culturale DE/FR/NL/ES (Moved to Future Phase)

### CRM Integration (P7 — pre-launch critico)

- [ ] Scegliere tra Resend / Supabase / HubSpot (stubs già in `lib/actions.ts`)
- [ ] Aggiungere env vars e test end-to-end lead form

---

## ⚠️ Regole critiche per future sessioni

1. **Routing**: `Link` e `redirect` di `@/i18n/navigation` richiedono la **chiave logica** di `i18n/routing.ts`, NON l'URL SEO tradotto.
   - ✅ `href="/top-neighborhoods"` (chiave logica)
   - ❌ `href="/family-friendly-neighborhoods-portugal"` (URL en — solo per utenti en)

2. **proxy.ts**: Il middleware è in `proxy.ts` (non `middleware.ts`). Non rinominarlo.

3. **Nuove namespace i18n**: Ogni nuovo namespace va aggiunto a TUTTI e 6 i file `messages/*.json` simultaneamente.

4. **Sitemap**: Si aggiorna automaticamente da `lib/schools-data.ts` e `lib/neighborhoods-data.ts` — nessun intervento manuale.

5. **LeadMagnetSection**: Ora è un async Server Component — richiede `locale` prop dalla parent page.
