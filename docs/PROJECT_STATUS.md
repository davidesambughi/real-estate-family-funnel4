# TrustFamily Relocation Funnel — Project Status
> Ultimo aggiornamento: 2026-03-02 | Sessione 8

---

## OBIETTIVO FINALE

Una guida completa, autorevole e multilingua per famiglie internazionali che si trasferiscono in Portogallo.

**Tre pilastri:**
1. **Scuole internazionali** — confronto completo, dati verificati, 77 scuole
2. **Quartieri family-friendly** — guida completa, 60+ quartieri, dati immobiliari + stile di vita
3. **Relocation guide** — visti, timeline, come fare la mossa giusta

**Target:** production-ready per il supervisor = stabile, usabile, presentabile. Non perfetto.

---

## STATO ATTUALE — SINTESI

| Area | Stato | Dettaglio |
|---|---|---|
| SEO / GEO | ✅ Pronto per lancio | Architettura completa. Gap = post-lancio. |
| Multilingua (UI) | ✅ Completo | 6 locali, tutte le pagine |
| Homepage | ✅ Completo | Prose editoriale, 6 locali, JSON-LD |
| Guide pillar (3) | ✅ Completo | Relocation, Schools, Neighborhoods |
| Blog | ✅ Completo | Listing + individual pages, Article schema |
| About | ✅ Completo | |
| School Finder (quiz) | ⚠️ Da verificare | Quiz esiste, integrazione end-to-end non verificata |
| **Scuole: 4 curated** | ✅ Completo | Testo editoriale, 6 locali, schema, tutto |
| **Scuole: 73 imported** | ✅ Dati strutturali completi (sessione 8) | Auto-description fattuale; no testo narrativo (post-lancio) |
| **Quartieri: 5 curated** | ✅ Completo | Testo editoriale, 6 locali, schema, tutto |
| **Quartieri: 59 imported** | ✅ Mapping completo (sessione 7) | Tutti i campi JSON ora mappati e renderizzati |
| CRM / Form | ❌ Non integrato | P0 bloccante |
| Immagini reali | ❌ Placeholder | Immagine generica per tutte le scuole/quartieri |
| Mappe | ⚠️ Stub accettabile | Link a Google Maps, nessuna mappa embedded |

---

## DATA STATUS — ANALISI OGGETTIVA

### Scuole (schools-database.json)
> **92 entries raw** → **77 valide** (15 filtrate: Low confidence + Wikipedia) | 4 curated (contenuto editoriale completo) | 73 imported (dati strutturali grezzi)

**Disponibilità dati nel JSON grezzo (92 raw, 77 valide dopo filtering):**
```
nome             : 92/92 (100%) ✅
coordinate       : 92/92 (100%) ✅
fees (min/max)   : 77/92 (84%)  ✅
curriculum       : 77/77 (100%) ✅ (scraper v2 — dato pulito)
acceptance rate  :  0/77 (0%)   ❌ non raccolto dallo scraper
description      :  0/77 (0%)   ❌ non raccolto dallo scraper
facilities       :  0/77 (0%)   ❌ non raccolto dallo scraper
expat_features   :  0/77 (0%)   ❌ non raccolto dallo scraper
```

**Causa del problema:** Lo scraper ha raccolto dati strutturati da directory pubblici (international-schools-database.com) ma non ha estratto testo descrittivo. I campi narrativi (`description`, `verdict`, `parentWhisper`, `highlights`, `trustBadges`) non esistono nel JSON sorgente — non è un bug di rendering.

**Stato sessione 8 — Mapping e fix completati:**
- Nuovo JSON (scraper v2): curriculum 100% pulito, age_range 84%, qualifications 80%, english_as_primary 83%, data_confidence 100%
- Auto-description fattuale generata in TypeScript da dati strutturati (es: *"St. Julian's School is an international school in Lisbon. Curriculum: IB, British, Portuguese. Ages 3–18. Annual fees: €12,384 – €29,097."*)
- B1 risolto: card "Neighborhood Match" non appare per scuole senza `neighborhoodSlug`
- B2 risolto: le sezioni vuote (verdict, parentWhisper, highlights) non vengono renderizzate
- 1 entry invalida rimossa (Wikipedia:FAQ/Categorization)
- Slug sanitization: URL-encoding decodificato + traslitterazione accenti (é→e, ç→c)
- Nuovi campi nel sidebar: ageRange, website, englishAsPrimary, schoolBusRoutes, studentCount

**Testo narrativo (post-lancio):** Le 73 scuole imported non hanno descrizioni editoriali — solo auto-description fattuale. Per narrativa reale: Opzione A = scraping headless (Playwright), Opzione B = generazione AI batch via Claude API.

---

### Quartieri (neighborhoods-database.json)
> **64 entries totali** | 5 curated (contenuto editoriale completo, 6 locali) | 59 imported

**Disponibilità dati nel JSON grezzo:**
```
nome                    : 64/64 (100%) ✅
coordinate              : 64/64 (100%) ✅
vibe_description        : 64/64 (100%) ✅ — testo descrittivo reale
best_for (tag)          : 64/64 (100%) ✅
local_highlights        : 64/64 (100%) ✅
pros/cons               : 64/64 (100%) ✅
prezzi immobili         : 64/64 (100%) ✅ — €/m², affitti, fonte e data
family_living scores    : 64/64 (100%) ✅ — safety, walkability, beach_access
demographics            : 64/64 (100%) ✅ — expat %, nazionalità, english_friendliness
cost_of_living          : 64/64 (100%) ✅ — budget mensile famiglia
expat_community         : 64/64 (100%) ✅
transport               : 64/64 (100%) ✅
education_nearby        : 64/64 (100%) ✅
commute_to_lisbon       : 44/64 (69%)  ⚠️ parziale
```

**Stato sessione 7:** Mapping completato. Tutti i campi ora mappati e renderizzati condizionalmente.
- Nuove interfacce TypeScript: `NeighborhoodRealEstate`, `NeighborhoodFamilyLiving`, `NeighborhoodDemographics`, `NeighborhoodCostOfLiving`, `NeighborhoodExpatCommunity`, `NeighborhoodTransportInfo`
- Detail page: 7 nuove sezioni condizionali (nessuna sezione vuota mostrata)
- `cons?: string[]` aggiunto a `NeighborhoodTranslation` per pros_cons.cons
- B4 risolto: `city="Lisbon"` sostituito con `neighborhood.location`

---

## BUG CRITICI ATTIVI

| # | Bug | Impatto | File | Priorità |
|---|---|---|---|---|
| B1 | ~~Link neighborhood → `/neighborhoods/portugal` → 404~~ | ✅ Risolto sessione 8 | `neighborhoodSlug` opzionale; card condizionale |
| B2 | ~~Pagine detail scuole imported: contenuto vuoto~~ | ✅ Risolto sessione 8 | Auto-description fattuale generata da dati strutturati |
| B3 | ~~BreadcrumbList JSON-LD path singolari vs plurali~~ | ✅ Non era un bug | `/school/[slug]` singolare è corretto per EN routing in `i18n/routing.ts` |
| B4 | ~~NeighborhoodMap riceve `city="Lisbon"` per quartieri non a Lisbona~~ | ✅ Risolto sessione 7 | Ora usa `neighborhood.location` |
| B5 | `SchoolMap` e `NeighborhoodMap`: label "Open in Maps" / "Explore on Maps" hardcoded EN | i18n incompleto | `SchoolMap.tsx:56`, `NeighborhoodMap.tsx:72` | BASSA |

---

## ROADMAP — VERSO PRODUCTION-READY

### FASE 1 — Stabilizzazione dati (BLOCCANTE)

**F1.A — Scuole: strategia per le 73 imported**

Il JSON grezzo non contiene testo descrittivo. Tre opzioni:

| Opzione | Pro | Contro | Tempo |
|---|---|---|---|
| **A) Mostra card minima** — nome, fees, curriculum, coordinate. Nessuna description/verdict. Aggiungere label "Dati in aggiornamento" | Onesto, scalabile, funziona subito | UI meno ricca per scuole non-curated | 1-2h |
| **B) Genera description automatica** — template: "X è una scuola internazionale a Y con curriculum Z e rette da €A a €B" | Contenuto presente su ogni pagina | Contenuto generico, non editoriale | 3-4h |
| **C) Nascondere le imported** | Esperienza pulita | Contraddice l'obiettivo "guida completa" | 1h |

**Raccomandazione: Opzione A + Fix B1 (404 neighborhood link)**. Mostrare le scuole con i dati che si hanno, senza fingere di avere più dati. Per il lancio è onesto e funzionante.

**F1.B — Quartieri: arricchire il mapping**

I dati esistono nel JSON. Il mapping va espanso per includere:
- Prezzi immobili (real_estate)
- Punteggi family (safety_score, walkability_score)
- Demographics (expat %, nazionalità)
- Cost of living (budget mensile)
- Transport (metro, treno, ciclismo)

Questo richiede:
1. Aggiornare `NeighborhoodTranslation` in `lib/types.ts` con campi numerici/strutturati
2. Aggiornare il mapping in `lib/data/neighborhoods.ts`
3. Aggiornare `neighborhoods/[slug]/page.tsx` per renderizzare i nuovi campi

Stima: 4-6h

**F1.C — Fix B3 (BreadcrumbList URL)**

Fix rapido, 30 minuti.

---

### FASE 2 — UI/UX (dopo la stabilizzazione dati)

| Feature | Priorità | Note |
|---|---|---|
| Paginazione / filtri scuole | ALTA | 77 card contemporaneamente = lento e inutilizzabile |
| Filtri quartieri (per zona, budget, tipo) | ALTA | 64 card = stesso problema |
| Immagini reali (4 scuole curated) | ALTA | `schools-img.jpg` è placeholder generico |
| Mappa embedded (Google Maps Embed iframe) | MEDIA | Stub attuale è accettabile ma non ottimale |
| CRM form integration | ALTA (P0) | Form non collegato |
| School Finder: verifica end-to-end | ALTA | Quiz esiste, funzionamento non verificato |

---

### FASE 3 — Post-lancio

| Feature | Note |
|---|---|
| i18n quartieri imported | Tradurre descrizioni dei 59 quartieri imported in 5 lingue |
| Testo editoriale scuole imported | Arricchire le 73 scuole imported con descrizioni reali (richiede ricerca manuale o nuovo scraping con focus su testo) |
| OG image locale-aware | |
| Google Search Console | |
| Vercel Analytics | |
| sameAs Organization schema | Quando profili social attivi |
| Rich Results Test | Post-deploy su tutti gli schema |

---

## DECISIONI ARCHITETTURALI PRESE

| Decisione | Motivazione | Data |
|---|---|---|
| Opzione C i18n (translations[locale] ?? translations.en) | Fallback pulito, single source of truth per EN | Sessione 1 |
| Curated schools/neighborhoods con dati editoriali | Qualità > quantità per il contenuto principale | Sessione 1 |
| Import JSON grezzo per completezza catalogo | Database disponibile, usarlo come base | Sessione 6 |
| Self-referencing canonical su homepage | Ogni locale è canonical di se stesso | Sessione 4 |
| Canonical EN per pagine detail | Struttura SEO standard per siti multilingua | Sessione 2 |
| ISR per tutte le pagine dinamiche | Evitare rebuild completi su data change | Sessione 2 |

---

## ENV VARS DA CONFIGURARE

| Var | Valore produzione | Stato |
|---|---|---|
| `NEXT_PUBLIC_BASE_URL` | `https://trustfamily.com` | ❌ Mancante su Vercel |
| CRM API key | TBD | ❌ Non definita |

---

## SESSIONI DI LAVORO

| Sessione | Data | Lavoro completato |
|---|---|---|
| 1 | Feb 2026 | Setup i18n, schema JSON-LD, routing |
| 2 | Feb 2026 | ISR, security headers, blog pages, Key Takeaways GEO |
| 3 | Feb 2026 | HowTo schema, Speakable, external citations, WCAG |
| 4 | Feb 2026 | FAQPage alignment, OG images, BreadcrumbList routing-aware |
| 5 | 2026-02-26 | @id schema, hreflang blog, OG locale format, zero TS errors |
| 6 | 2026-03-02 | Audit completo, analisi dati JSON, documentazione PROJECT_STATUS + ROADMAP |
| 7 | 2026-03-02 | Mapping completo quartieri: 6 nuove interfacce TS, 7 sezioni condizionali nel detail page, fix B4 |
| 8 | 2026-03-02 | Scuole: JSON scraper v2, auto-description, slug sanitization, fix B1+B2, 7 nuovi campi School type, sidebar arricchita |
