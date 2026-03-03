# TrustFamily Relocation Funnel — Project Status
> Ultimo aggiornamento: 2026-03-03 | Sessione 11

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
| School Finder (quiz) | ✅ Funzionante | Quiz in homepage (`#quiz`); slug verificati; school-finder page = landing editoriale con CTA → `/#quiz` |
| **Scuole: 4 curated** | ✅ Completo | Testo editoriale, 6 locali, schema, tutto |
| **Scuole: 73 imported** | ⚠️ Architettura ✅, dati in attesa | Directory + paginazione implementati; JSON arricchito atteso dal progetto scraping |
| **School listing (pillar page)** | ⚠️ Implementato con bug noti | SchoolsList split + SchoolDirectory; bug B6-B11 da fixare dopo nuovo JSON |
| **Quartieri: 5 curated** | ✅ Completo | Testo editoriale, 6 locali, schema, tutto |
| **Quartieri: 59 imported** | ✅ Mapping completo (sessione 7) | Tutti i campi JSON ora mappati e renderizzati |
| CRM / Form | ⚠️ Web3Forms integrato, in attesa chiave agenzia | Form con 7 campi + Zod + 6 locali + honeypot ✅; backend Web3Forms implementato in `lib/actions.ts`; `WEB3FORMS_ACCESS_KEY` vuota — in attesa dell'email dell'agenzia |
| Immagini | ⚠️ Reali ma generiche/condivise | `schools-img.jpg` + `neighborhoods-img.jpg` caricate; una sola immagine per tutte le scuole/quartieri |
| Mappe | ⚠️ Stub accettabile | Link a Google Maps, nessuna mappa embedded |

---

## DATA STATUS — ANALISI OGGETTIVA

### Scuole (schools-database.json)
> **92 entries raw** → **77 valide** (15 filtrate: Low confidence + Wikipedia) | 4 curated | 73 imported

**Copertura dati per le 77 valide (stato attuale, pre-nuovo JSON):**
```
nome             : 77/77 (100%) ✅
coordinate       : ~73/77 (95%) ✅ (fallback Lisbon center per le restanti)
curriculum       : 77/77 (100%) ✅
fees (min/max)   : ~65/77 (84%) ✅
age_range        : ~65/77 (84%) ✅
qualifications   : ~60/77 (78%) ✅
english_primary  : ~64/77 (83%) ✅
website          : ~60/77 (78%) ✅
description      :  4/77  (5%)  ❌ solo le 4 curated; le 73 imported = auto-description
acceptance_rate  :  4/77  (5%)  ❌ solo le 4 curated; 0 nel JSON scraper
location.city    : ~50/77 (65%) ⚠️ alcune scuole imported hanno city=null → location="Portugal"
```

**Nuovo JSON atteso domani (obiettivo arricchimento):**
- ~61 scuole TIER A: 12-16 campi compilati + description testuale (150-300 parole)
- ~16 scuole TIER B: 7-11 campi compilati, senza description
- Nuovi campi attesi: `description`, `admission_process`, `language_support`, `extracurricular_activities`, `transport`
- Campi da rimuovere: `notable_alumni`, `cultural_diversity_score`, `safety_rating`, `acceptance_rate`

**Il JSON attuale rimane in uso fino all'arrivo di quello arricchito.**

---

### Quartieri (neighborhoods-database.json)
> **64 entries totali** | 5 curated (contenuto editoriale completo, 6 locali) | 59 imported

**Disponibilità dati:**
```
nome                    : 64/64 (100%) ✅
coordinate              : 64/64 (100%) ✅
vibe_description        : 64/64 (100%) ✅
pros/cons               : 64/64 (100%) ✅
prezzi immobili         : 64/64 (100%) ✅
family_living scores    : 64/64 (100%) ✅
demographics            : 64/64 (100%) ✅
cost_of_living          : 64/64 (100%) ✅
expat_community         : 64/64 (100%) ✅
transport               : 64/64 (100%) ✅
commute_to_lisbon       : 44/64 (69%)  ⚠️ parziale
```

**Stato:** Mapping completo ✅ — tutti i campi mappati e renderizzati condizionalmente nel detail page.

---

## BUG ATTIVI

### Bug pre-esistenti (sessioni precedenti)

| # | Bug | Impatto | File | Priorità |
|---|---|---|---|---|
| B5 | `SchoolMap`: "Open in Maps" hardcoded EN; `NeighborhoodMap`: "Explore on Maps" + labels amenità (Schools/Cafés/Parks) hardcoded EN | i18n incompleto | `SchoolMap.tsx:57`, `NeighborhoodMap.tsx:20-23,73` | BASSA |
| B-form | Bottone "Contact" in school detail page non ha azione né link — è un `<Button>` morto | Funnel lead rotto sulle pagine scuola | `schools/[slug]/page.tsx:149` | ALTA (dopo CRM) |
| B-quiz-ui | "Your Results" hardcoded EN in QuizResult — non usa la prop `translations` | i18n incompleto nel risultato quiz | `QuizResult.tsx:39` | BASSA |
| B-faq-sf | FAQPage schema school-finder: 2 item nello schema, 3 FAQ renderizzate nell'HTML — mismatch | Google Rich Snippets potrebbe rifiutare | `school-finder/page.tsx:69-92` | MEDIA |

### Bug nuovi — SchoolDirectory (sessione 9)

> Questi bug sono stati identificati durante il design del componente. Alcuni dipendono dai dati attuali (risolti automaticamente col nuovo JSON), altri richiedono fix al codice.

| # | Bug | Impatto | File | Quando fixare |
|---|---|---|---|---|
| B6 | **Filtro regione inaffidabile**: location.city mancante per ~35% delle scuole imported → tutte in "Other Portugal" | Filtro regione mostra risultati fuorvianti | `SchoolsList.tsx` (`extractRegion`) + `SchoolDirectory.tsx` | Dopo nuovo JSON — verificare copertura location.city |
| B7 | **`loc.includes("set")` troppo generico** in `extractRegion` — può matchare stringhe inattese | Region assignment errato in edge case | `SchoolsList.tsx:71` *(non :50 come documentato in precedenza)* | Fix rapido |
| B8 | **Filtro "Contact school" cattura anche scuole senza dati fees** — `feesMin===null` significa sia "Contact school" che "dato mancante" | Filtro price="contact" non granulare | `SchoolDirectory.tsx` | Dopo nuovo JSON — valutare se aggiungere campo `feesAvailable: boolean` |
| B9 | **Nessuno scroll-to-top quando cambia pagina** — dopo "Next →" i nuovi risultati partono sotto la fold | UX: l'utente deve scrollare manualmente | `SchoolDirectory.tsx` (handler paginazione) | Domani (fix semplice — `scrollIntoView`) |
| B10 | **`<dl>` senza `<dt>`/`<dd>`** nella mini-card — HTML semantico scorretto | Accessibilità; validazione HTML | `SchoolDirectory.tsx:193` | Domani (fix semplice — cambiare a `<div>`) |
| B11 | **Curriculum "Other" troppo ampio** — "Private school", "Parochial", "International" tutti in un unico bucket | Filtro curriculum poco utile | `SchoolsList.tsx` (`normalizeCurriculum`) | Dopo nuovo JSON — dipende da come arrivano i dati curriculum |

---

## ARCHITETTURA SCHOOL LISTING (implementata sessione 9)

### Componenti coinvolti

```
app/.../best-private-and-public-international-schools-portugal-2026/page.tsx
  └── <SchoolsList />   ← server component, NON modificato nel pillar page

components/SchoolsList.tsx   ← SERVER COMPONENT (modificato sessione 9)
  ├── Parte 1: "Editorial Top Picks" — 4 curated, rich card invariate
  └── Parte 2: passa SchoolDirectoryItem[] a <SchoolDirectory />

components/SchoolDirectory.tsx   ← CLIENT COMPONENT (nuovo sessione 9)
  ├── Filtri: region, curriculum, price range, language
  ├── Paginazione: 12 per pagina, client-side
  └── Mini-card compatta (3 col desktop / 2 tablet / 1 mobile)
```

### Flusso dati

```
schoolsData (77 School objects, letti a build time)
  → SchoolsList (server): mappa a SchoolDirectoryItem[] (dati minimali)
  → SchoolDirectory (client): riceve ~5KB di dati serializzati
  → Browser: ZERO JSON completo nel bundle
```

### SchoolDirectoryItem (tipo serializzato al client)
```typescript
{ slug, name, location, region, curriculum, curriculumTag,
  fees, feesMin, ageRange, englishAsPrimary, isCurated }
```

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
| School listing: Top Picks (4 rich) + Directory (77 compact + filtri) | UX + performance: nessun rendering di 77 card uguali | Sessione 9 |
| SchoolDirectory = client component con dati minimali | Full JSON mai nel bundle browser | Sessione 9 |
| Curated identificate da `Boolean(translations.en.verdict)` | Discriminatore stabile, no campo extra nel tipo | Sessione 9 |

---

## ENV VARS DA CONFIGURARE

| Var | Valore produzione | Stato |
|---|---|---|
| `NEXT_PUBLIC_BASE_URL` | `https://trustfamily.com` | ❌ Mancante su Vercel |
| `WEB3FORMS_ACCESS_KEY` | chiave da web3forms.com | ⏳ In attesa email agenzia — poi aggiungere su Vercel + `.env.local` |

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
| 9 | 2026-03-02 | Architettura school listing: SchoolsList split (Top Picks + Directory), SchoolDirectory client component con filtri + paginazione; audit bug B6-B11 identificati |
| 10 | 2026-03-03 | Audit codebase vs documentazione: correzioni PROJECT_STATUS + ROADMAP; nuovi bug B-form, B-quiz-ui, B-faq-sf documentati; status immagini e form CRM corretti |
| 11 | 2026-03-03 | Form backend: Web3Forms integrato in `lib/actions.ts` (sostituisce console.log); honeypot anti-bot implementato in `components/form.tsx`; `WEB3FORMS_ACCESS_KEY` aggiunta in `.env.local` (vuota, in attesa email agenzia) |
