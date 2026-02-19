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

- [x] **P6** — `next.config.ts`: CDN stubs documentati come commento (placehold.co + 4 opzioni CDN prod)
- [x] **P9** — `app/[locale]/blog/page.tsx`: placeholder con `robots: noindex`
- [x] **P12** — Cartella rinominata `buidling_logs` → `building_logs`
- [x] **DOC** — `docs/project_roadmap.md`: checkboxes aggiornati, architettura documentata
- [x] **DOC** — `docs/strategic_plan_final.md`: status per fase + regole architetturali per future sessioni
- [x] **DOC** — `nextstep.md` root: deprecato (redirect a docs/nextstep.md)

---

## 🔲 Prossimi Sprint

### Phase 3 — Interactive Intelligence

- [ ] Soft-Landing Quiz (`components/features/quiz/`) — "Find Your Perfect Fit"
- [ ] SchoolMap.tsx — Commute Validator (pin scuola + raggio 20min rush-hour)
- [ ] NeighborhoodMap.tsx — Amenity Radar (quartiere + scuole vicine)

### Phase 4 — Content & SEO

- [ ] Aggiornare H1 homepage a "Secure Your Children's Future in Portugal"
- [ ] "The Verdict" + "Parent Whisper" per ogni school card
- [ ] "Commute Context" + "Vibe Verification" per neighborhood card
- [ ] "Download Fee Structure" CTA contestuale dentro school card
- [ ] Immagini reali (Lisbon, campus) → aggiungere CDN hostname a `next.config.ts`
- [ ] Blog: contenuto reale (rimuovere noindex da `app/[locale]/blog/page.tsx`)
- [ ] Revisione culturale DE/FR/NL/ES (non solo traduzione meccanica)

### CRM Integration (P7 — pre-launch critico)

- [ ] Scegliere tra Resend / Supabase / HubSpot (stubs già in `lib/actions.ts`)
- [ ] Aggiungere env vars: `RESEND_API_KEY` o `SUPABASE_URL + SUPABASE_ANON_KEY`
- [ ] Test end-to-end form → CRM con lead reale

---

## ⚠️ Regole critiche per future sessioni

1. **Routing**: `Link` e `redirect` di `@/i18n/navigation` richiedono la **chiave logica** di `i18n/routing.ts`, NON l'URL SEO tradotto.
   - ✅ `href="/top-neighborhoods"` (chiave logica)
   - ❌ `href="/family-friendly-neighborhoods-portugal"` (URL en — solo per utenti en)

2. **proxy.ts**: Il middleware è in `proxy.ts` (non `middleware.ts`). Non rinominarlo.

3. **Nuove namespace i18n**: Ogni nuovo namespace va aggiunto a TUTTI e 6 i file `messages/*.json` simultaneamente.

4. **Sitemap**: Si aggiorna automaticamente da `lib/schools-data.ts` e `lib/neighborhoods-data.ts` — nessun intervento manuale.
