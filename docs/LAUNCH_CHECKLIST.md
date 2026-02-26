# Launch Checklist — TrustFamily Relocation Funnel

**Ultimo aggiornamento:** 2026-02-24
**Obiettivo:** app funzionante e senza bug visibili in tutte e 6 le lingue, pronta per il lancio

---

## P0 — Blockers (l'app non può andare live senza questi)

### 1. CRM Integration
**File:** `lib/actions.ts`, `components/form.tsx`
**Problema:** Il form di lead capture fa solo `console.log`. Zero lead vengono catturati.
- [ ] Scegliere strumento: Resend (email semplice) | Supabase (DB + email) | HubSpot (CRM completo)
- [ ] Aggiungere env vars (`.env.local` + Vercel environment)
- [ ] Sostituire `console.log('Lead received:', data)` con chiamata reale in `lib/actions.ts`
- [ ] Test end-to-end: submit form → lead ricevuto

### 2. Fix i18n — stringhe EN hardcoded nel form
**✅ COMPLETATO — sessione 6 (2026-02-25)**
Tutte le stringhe del form sono state convertite in chiavi namespace `Form`.
Confermato da `docs/TRANSLATION_AUDIT.md` — 249 chiavi × 6 locale, tutti i namespace completi.
Il LAUNCH_CHECKLIST non era stato sincronizzato dopo la sessione 6.

---

## P1 — Importanti pre-lancio

### 3. Immagini reali
**Problema:** Il sito usa `placehold.co` — in produzione sembra un sito demo.
- [ ] Immagine hero (`public/hero-img.jpg` — già referenziata in `Hero.tsx`)
- [ ] Thumbnail pillar card Relocation Guide (referenziata in `PillarsCardsSection.tsx`)
- [ ] Thumbnail pillar card Schools (referenziata in `PillarsCardsSection.tsx`)
- [ ] Thumbnail pillar card Neighborhoods (referenziata in `PillarsCardsSection.tsx`)
- [ ] Se immagini remote: aggiungere hostname CDN a `next.config.ts` remotePatterns
- [ ] **Post-lancio opzionale:** thumbnail card scuole (`SchoolsList`), thumbnail card quartieri (`NeighborhoodsList`), immagine supporto LeadMagnet, avatar testimonials

### 4. Maps — stub o decisione
**File:** `components/features/SchoolMap.tsx`, `components/features/NeighborhoodMap.tsx`
**Problema:** Le pagine scuola/quartiere mostrano un placeholder animato invece di una mappa reale.
- [ ] **Opzione A (rapida):** Rimuovere i componenti map dalle pagine — effort minimo, nessun debito visivo
- [ ] **Opzione B (completa):** Connettere Mapbox o Google Maps embed — i dati `coordinates` sono già in `schools-data.ts` e `neighborhoods-data.ts`

### 5. Fix TypeScript error preesistente
**✅ COMPLETATO — commit precedente**
`app/[locale]/school-finder/page.tsx` usa già `href={{ pathname: "/", hash: "quiz" }}` alla riga 140.
Confermato da `npx tsc --noEmit` — zero errori. LAUNCH_CHECKLIST non era sincronizzato.

---

## P2 — Post-lancio (non aprire prima del go-live)

| Area | Documento di riferimento |
|------|--------------------------|
| SEO/GEO backlog (`sameAs` social, OG image locale-aware, alt text, Search Console, Analytics, IndexNow) | `SEO_GEO_AUDIT_PROGRESS.md` |
| Redesign pillar pages (magazine layout — homepage già completata) | `MAGAZINE_REDESIGN_PLAN.md` |
| Refactoring architetturale (DAL, JSON-LD extraction, hooks, testing) | `SOLID_REFACTOR_CHECKLIST.md` |

---

## Regole architetturali critiche (non dimenticare mai)

1. **Chiavi logiche vs URL SEO** — `Link` e `redirect` usano SEMPRE la chiave logica di `i18n/routing.ts`, mai l'URL tradotto.
   - ✅ `href="/top-neighborhoods"` — corretto
   - ❌ `href="/family-friendly-neighborhoods-portugal"` — rompe gli altri locale

2. **proxy.ts** — Il middleware è in `proxy.ts` (non `middleware.ts`). Non rinominarlo.

3. **Nuove namespace i18n** — Ogni nuovo namespace va aggiunto a TUTTI e 6 i `messages/*.json` contemporaneamente.

4. **Server Components** — Non introdurre `"use client"` su: `SchoolsList`, `NeighborhoodsList`, `QuizSection`, `LeadMagnetSection`.

5. **next-intl hash anchors** — Usare `href={{ pathname: "/", hash: "quiz" }}`, non `href="/#quiz"`.

6. **JSON-LD e id SEO** — Non rimuovere mai: `id="key-takeaways"`, `id="faq"`, `id="main-content"`. Sono CSS selector di Speakable schema e WCAG.

---

## Smoke test pre-go-live (eseguire tutto prima del lancio)

- [ ] `npm run build` esce con code 0, zero errori TypeScript
- [ ] Homepage: routing corretto in EN / PT / DE / FR / NL / ES
- [ ] Form lead capture in EN: submit → CRM riceve il lead
- [ ] Form in DE (o FR): nessuna stringa inglese visibile
- [ ] Quiz: 4 step completi → risultati con scuole e quartieri
- [ ] Blog: listing `/blog` → pagina individuale `/blog/[slug]`
- [ ] School detail: URL localizzato corretto in tutti i locale
- [ ] Neighborhood detail: URL localizzato corretto in tutti i locale
- [ ] Sitemap accessibile: `/sitemap.xml`
- [ ] robots.txt accessibile: `/robots.txt`
- [ ] Language switcher: cambia locale senza 404
