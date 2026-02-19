# Strategic Trust & Cognitive Design Plan

## TrustFamily Relocation Intelligence Platform

> **Objective**: Transform the current functional prototype into a "Trust-First" intelligence platform that reduces cognitive load for affluent families and positions the brand as the undisputed authority on Portuguese education and relocation.

---

## Implementation Status (2026-02-19)

| Phase                                  | Status        | Summary                                                          |
| -------------------------------------- | ------------- | ---------------------------------------------------------------- |
| **Phase 1** — Multilingual Core        | ✅ Completata | Routing, i18n, SEO metadata, sitemap, robots, OG image           |
| **Phase 2** — Trust-First UI           | ✅ Completata | TrustBar, MethodologyBadge, Hero H1 mobile fix, 404 locale-aware |
| **Phase 3** — Interactive Intelligence | 🔲 TODO       | Quiz, Maps                                                       |
| **Phase 4** — Content Structure        | 🔲 TODO       | Microcopy, Verdict, Whisper, CTAs                                |

---

## 1. Critical Diagnosis: The "Trust Gap"

**Current State (updated)**:

- **Structure**: ✅ Hero → TrustBar → Pillars → Lead Magnet flow implementato. TrustBar aggiunto immediatamente sotto l'H1 per "Authority Anchoring".
- **Content**: Microcopy di base implementato in EN/PT/DE/FR/NL/ES. Traduzioni vere (non meccaniche) per PT. Altre lingue richiedono revisione culturale (Phase 4).
- **Visuals**: Placeholder `placehold.co` attivi. Schema JSON-LD Organization presente.
- **Authority**: TrustBar ("100% Independent Data", "Validated by Families", "Updated 2026") e MethodologyBadge creati e deployati.

**Remaining gap**: Il sito dichiara autorità ma non la "dimostra" ancora con dati reali (inspections, parent reviews effettive). Questo è il target di Phase 4.

---

## 2. Cognitive Content Strategy

### A. The "Calm Authority" Homepage — ✅ Struttura implementata

| Section      | Status | Note                                                                        |
| ------------ | ------ | --------------------------------------------------------------------------- |
| Hero         | ✅     | H1 sempre visibile, testo sopra immagine (mobile-first), TrustBar sotto CTA |
| Trust Anchor | ✅     | TrustBar con 3 badge authority                                              |
| Pillars      | ✅     | 3 card con routing localizzato corretto                                     |

**Phase 4 backlog**:

- Aggiornare H1 a "Secure Your Children's Future in Portugal" (da `strategic_plan_final.md §2A`)
- Implementare microcopy "The Intelligence Engine" sotto TrustBar

### B. The "Objective Advisor" Schools Page — 🔲 Struttura esistente, contenuto da completare

- ✅ SchoolsList component creato, MethodologyBadge integrato
- 🔲 "The Verdict" e "Parent Whisper" per ogni scuola (Phase 4)
- 🔲 Dati fees reali (Phase 4)

### C. The "Lifestyle Matcher" Neighborhoods Page — 🔲 Struttura esistente, contenuto da completare

- ✅ NeighborhoodsList component creato
- 🔲 "Commute Context" — distanza da scuole top (Phase 4)
- 🔲 "Vibe Verification" — 3 aggettivi per quartiere (Phase 4, già parzialmente nei dati)

---

## 3. Visual Strategy: Cognitive Prioritization (Mobile vs Desktop)

### A. Hero Image — ✅ Implementato (parzialmente)

| Device      | Status | Implementazione                                                         |
| ----------- | ------ | ----------------------------------------------------------------------- |
| **Mobile**  | ✅     | Text-first (H1 sempre in DOM, sopra immagine). Nessun `hidden md:block` |
| **Desktop** | ✅     | Immagine a piena larghezza con aspect-ratio 21:9, shadow-2xl            |

**Pending**: Sostituire `placehold.co` con immagine reale di Lisbona (Phase 4, richiede CDN — vedi `next.config.ts` TODO).

### B. Image Strategy for Inner Pages — 🔲 TODO (Phase 4)

- School Pages: "Campus Carousel" (lazy-loaded)
- Neighborhood Pages: "Vibe Thumbnails" + hero shot

---

## 4. Missing UI Components — Status

| Component                       | Status          | File                                                |
| ------------------------------- | --------------- | --------------------------------------------------- |
| TrustBar                        | ✅ Implementato | `components/features/TrustBar.tsx`                  |
| MethodologyBadge                | ✅ Implementato | `components/MethodologyBadge.tsx`                   |
| JsonLd                          | ✅ Implementato | `components/JsonLd.tsx`                             |
| Breadcrumbs                     | ✅ Implementato | `components/Breadcrumbs.tsx` + `lib/breadcrumbs.ts` |
| LanguageSwitcher                | ✅ Implementato | `components/LanguageSwitcher.tsx`                   |
| Soft-Landing Quiz               | 🔲 TODO         | Phase 3                                             |
| SchoolMap (Commute Validator)   | 🔲 TODO         | Phase 3                                             |
| NeighborhoodMap (Amenity Radar) | 🔲 TODO         | Phase 3                                             |
| Contextual CTAs (Fee Download)  | 🔲 TODO         | Phase 4                                             |

---

## 5. Multilingual Architecture Strategy — ✅ Implementata

**Principio**: "Cultural Adaptation, Not Translation"

- ✅ **6 locale**: en, pt, de, fr, nl, es — tutti con pathnames SEO localizzati in `routing.ts`
- ✅ **PT**: Traduzioni vere (non meccaniche) in tutte le sezioni
- ⚠️ **DE/FR/NL/ES**: Traduzioni tecnicamente corrette ma non ancora "culturalmente adattate" — da rivedere in Phase 4

**⚠️ Regola critica per future sessioni**:

> Il `Link` di `@/i18n/navigation` richiede la **chiave logica** di `routing.pathnames`, NON l'URL tradotto.
> Esempio: usare `href="/top-neighborhoods"`, NON `href="/family-friendly-neighborhoods-portugal"`.
> Il sistema di routing next-intl risolve automaticamente la URL per ogni locale.

---

## 6. Implementation Roadmap — vedi `project_roadmap.md`

1. ✅ **Phase 1**: Multilingual Core (Audit, Routing, SEO Schemas) — completata
2. ✅ **Phase 2**: Trust-First UI (TrustBar, MethodologyBadge, Hero mobile fix, 404) — completata
3. 🔲 **Phase 3**: Interactive Intelligence (Quiz, Maps)
4. 🔲 **Phase 4**: Content Structure (Microcopy, Verdicts, CTAs, immagini reali)

---

## 7. Regole architetturali per future sessioni

> ⚠️ **IMPORTANTE** — Leggere prima di fare qualsiasi modifica al routing:

1. **Chiavi logiche vs URL SEO**: I componenti di navigazione (Link, redirect) usano SEMPRE le chiavi logiche di `i18n/routing.ts`. Le URL SEO (es. `/family-friendly-neighborhoods-portugal`) sono generate automaticamente da next-intl per ogni locale.

2. **proxy.ts**: Il file `middleware.ts` è nominato `proxy.ts` per convenzione del progetto. Non rinominarlo — Next.js lo trova tramite il `config.matcher` export.

3. **Struttura locale**: Ogni nuova namespace di traduzione va aggiunta a TUTTI e 6 i file `messages/*.json` contemporaneamente.

4. **Sitemap dinamica**: `app/sitemap.ts` legge i slug reali da `lib/schools-data.ts` e `lib/neighborhoods-data.ts`. Quando si aggiungono scuole/quartieri, la sitemap si aggiorna automaticamente.

5. **OG Image**: L'immagine default è `app/opengraph-image.tsx`. Ogni route può sovrascriverla con il proprio `opengraph-image.tsx` nella sua cartella.
