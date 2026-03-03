# TrustFamily — Roadmap verso Production-Ready
> Ultimo aggiornamento: 2026-03-03 | Sessione 11

---

## LEGENDA
- 🔴 Bloccante per lancio
- 🟡 Importante ma non bloccante
- 🟢 Post-lancio
- ✅ Completato
- ⚠️ Implementato con bug noti / in attesa di dati

---

## FASE 1 — Stabilizzazione (da fare prima del lancio)

### 1.1 — Scuole: dati e bug critici ✅ COMPLETATO sessione 8
| Task | Priorità | Stato | Note |
|---|---|---|---|
| Nuovo JSON scuole (scraper v2) | 🔴 | ✅ | curriculum 100% pulito, age_range, qualifications, english_as_primary, data_confidence |
| Fix B1: `neighborhoodSlug: "portugal"` → 404 | 🔴 | ✅ | `neighborhoodSlug` ora opzionale; card Neighborhood Match condizionale |
| Fix B2: pagine detail scuole imported → contenuto vuoto | 🔴 | ✅ | Auto-description fattuale generata da dati strutturati |
| Filtro entry invalide (Wikipedia:FAQ + Low confidence) | 🔴 | ✅ | 92 raw → 77 valide |
| Slug sanitization (URL-encoding + accenti) | 🟡 | ✅ | decodeURIComponent + traslitterazione accenti |
| Nuovi campi sidebar: ageRange, website, englishAsPrimary, schoolBusRoutes, studentCount | 🟡 | ✅ | Mostrati condizionalmente nel detail page |

### 1.2 — School listing: paginazione e filtri ⚠️ IMPLEMENTATO con bug — sessione 9
| Task | Priorità | Stato | Note |
|---|---|---|---|
| Split pillar page: Top Picks (4 curated) + Directory (77 compact) | 🟡 | ✅ | `SchoolsList.tsx` modificato; pillar page invariata |
| Filtri client-side (region, curriculum, price, language) | 🟡 | ⚠️ | Implementati; bug B6-B11 da fixare (vedi sotto) |
| Paginazione 12 per pagina | 🟡 | ⚠️ | Implementata; manca scroll-to-top (B9) |
| **Fix B7: `extractRegion` usa `includes("set")` troppo generico** | 🟡 | ❌ | `SchoolsList.tsx:71` — fix rapido, 5 min |
| **Fix B9: paginazione senza scroll-to-top** | 🟡 | ❌ | `SchoolDirectory.tsx` — fix rapido, 10 min |
| **Fix B10: `<dl>` senza `<dt>`/`<dd>` nella mini-card** | 🟡 | ❌ | `SchoolDirectory.tsx:193` — fix rapido, 5 min |
| **Fix B6/B8/B11: dipendono dal nuovo JSON** | 🟡 | ⏳ | Rivedere region+fees+curriculum dopo arrivo JSON arricchito |

### 1.3 — Nuovo JSON scuole arricchito (dal progetto scraping)
| Task | Priorità | Stato | Note |
|---|---|---|---|
| Ricevere nuovo JSON (TIER A: 61 scuole, TIER B: 16 scuole) | 🔴 | ⏳ | In progress nel progetto scraping parallelo — dati attesi: description, admission_process, language_support, extracurricular, transport |
| Aggiornare `School` type con nuovi campi | 🔴 | ❌ | Dipende da struttura JSON arricchito |
| Aggiornare `buildAutoDescription` o rimuoverla se ci sono description reali | 🔴 | ❌ | Per TIER A: usare description dal JSON; per TIER B: mantieni auto-description |
| Aggiornare detail page `/schools/[slug]` per nuove sezioni (admission, extracurricular, transport) | 🟡 | ❌ | Layout differenziato TIER A vs TIER B |
| Re-verificare bug B6 (region), B8 (fees contact), B11 (curriculum "Other") dopo nuovo JSON | 🟡 | ❌ | Dipende da copertura dati location.city nel nuovo JSON |
| Aggiornare `normalizeCurriculum` se arrivano nuovi curriculum types | 🟡 | ❌ | |

### 1.4 — Quartieri: arricchire il mapping del JSON ✅ COMPLETATO sessione 7
| Task | Priorità | Stato | Note |
|---|---|---|---|
| Testo descrittivo, pros/cons, prezzi immobili, scores, demographics, cost of living, transport | 🟡 | ✅ | 64/64 — tutti i campi mappati e renderizzati |
| Fix B4: city="Lisbon" hardcoded in NeighborhoodMap | 🟡 | ✅ | Ora usa neighborhood.location |

### 1.5 — CRM / Form
| Task | Priorità | Stato | Note |
|---|---|---|---|
| Form UI + validazione Zod | 🔴 | ✅ | 7 campi, 6 locali, server action pronta |
| Honeypot anti-bot | 🔴 | ✅ | Campo `trap` off-screen in `form.tsx`; check Step 0 in `actions.ts` — silenzioso per i bot |
| Scegliere backend email | 🔴 | ✅ | Scelto: **Web3Forms** (zero infrastruttura, zero account obbligatorio, gratis) |
| Implementare backend in `submitLead` (`lib/actions.ts`) | 🔴 | ✅ | Web3Forms POST implementato con fallback `console.error('[LEAD_FALLBACK]')` |
| Inserire `WEB3FORMS_ACCESS_KEY` su Vercel + `.env.local` | 🔴 | ⏳ | In attesa email dell'agenzia → vai su web3forms.com → inserisci email agenzia → ottieni chiave |
| Collegare ContactBtn school detail a form/CRM (`B-form`) | 🔴 | ❌ | Bottone morto in `schools/[slug]/page.tsx:149` |

### 1.6 — Infrastruttura
| Task | Priorità | Stato | Note |
|---|---|---|---|
| Aggiungere `NEXT_PUBLIC_BASE_URL=https://trustfamily.com` su Vercel | 🔴 | ❌ | URL nei JSON-LD sbagliati in prod senza questa var |
| Configurare dominio `trustfamily.com` su Vercel | 🔴 | ❌ | Se non già fatto |

---

## FASE 2 — UI/UX (dopo stabilizzazione)

### 2.1 — Liste scuole e quartieri
| Task | Priorità | Stato | Note |
|---|---|---|---|
| Paginazione scuole | 🟡 | ⚠️ | Implementata in sessione 9; bug B9 (scroll) da fixare |
| Filtri scuole | 🟡 | ⚠️ | Implementati in sessione 9; bug B6/B8/B11 da verificare col nuovo JSON |
| Paginazione quartieri | 🟡 | ❌ | Stesso pattern di SchoolDirectory — da applicare a NeighborhoodsList |
| Filtri quartieri (zona, tipo, budget) | 🟡 | ❌ | Stessa architettura client component |

### 2.2 — Immagini
| Task | Priorità | Stato | Note |
|---|---|---|---|
| Immagini hero, guide, sezioni decorative | — | ✅ | Foto reali caricate (hero-img.jpg, guide, respiro, leadMagnet, ecc.) |
| Immagini per-scuola per le 4 curated | 🟡 | ❌ | Attualmente: `schools-img.jpg` condiviso su TUTTE le 77 pagine scuola |
| Immagini per-quartiere per i 5 curated | 🟡 | ❌ | Attualmente: `neighborhoods-img.jpg` condiviso su tutti i quartieri |
| Immagine fallback di qualità per scuole/quartieri imported | 🟢 | ⚠️ | Immagine generica esistente è accettabile per lancio |

### 2.3 — Mappe
| Task | Priorità | Stato | Note |
|---|---|---|---|
| Google Maps Embed (iframe, zero API key) | 🟡 | ❌ | Sostituisce lo stub visivo attuale con mappa reale embedded. Gratuito, zero JS. |

### 2.4 — School Finder
| Task | Priorità | Stato | Note |
|---|---|---|---|
| Verifica funzionamento end-to-end quiz | 🔴 | ✅ | Quiz è in homepage `#quiz`; slug scuole e quartieri verificati; logica `matchSchools`/`matchNeighborhoods` corretta |
| School Finder page = landing editoriale | — | ✅ | `school-finder/page.tsx` è una pagina editoriale con CTA → `/#quiz`; ha FAQ + schema propri |
| Fix B-faq-sf: FAQPage schema school-finder ha 2 item, HTML ne renderizza 3 | 🟡 | ❌ | `school-finder/page.tsx:69-92` — aggiungere 3° FAQ allo schema |
| Fix B-quiz-ui: "Your Results" hardcoded EN in QuizResult | 🟢 | ❌ | `QuizResult.tsx:39` — usare `t.resultsTitle` già disponibile nella prop |

### 2.5 — Detail pages UI
| Task | Priorità | Stato | Note |
|---|---|---|---|
| ContactBtn scuole: collegare a form/CRM | 🔴 | ❌ | Il bottone "Contact" non ha azione |
| ContactBtn quartieri: collegare a form/CRM | 🔴 | ❌ | Stesso |

---

## FASE 3 — Post-lancio

| Task | Priorità | Note |
|---|---|---|
| Google Search Console setup | 🟢 | Prima del primo indexing |
| Rich Results Test su tutti gli schema | 🟢 | Post-deploy |
| i18n quartieri imported (59 quartieri, 5 lingue) | 🟢 | Descrizioni solo in EN; traduzione = post-lancio |
| Testo narrativo scuole imported | 🟢 | Parzialmente risolto dal nuovo JSON (TIER A); per TIER B valutare AI batch via Claude API |
| Paginazione quartieri | 🟢 | Stesso pattern SchoolDirectory — da applicare a NeighborhoodsList |
| OG image locale-aware | 🟢 | |
| `sameAs` Organization schema | 🟢 | Quando profili social attivi |
| LLM referral UTM tracking | 🟢 | |
| Vercel Analytics | 🟢 | |
| IndexNow API | 🟢 | |
| Blog: nuovi articoli | 🟢 | Attualmente 3 articoli |
| Service Worker / offline | 🟢 | |

---

## PROSSIMA SESSIONE — AGENDA (priorità ordinate)

### Step 1 — Fix rapidi SchoolDirectory (30 min, da fare prima del nuovo JSON)
1. **Fix B7** — `SchoolsList.tsx:50`: sostituire `loc.includes("set")` con `loc.includes("setúbal") || loc.includes("setubal")`
2. **Fix B9** — `SchoolDirectory.tsx`: aggiungere `scrollIntoView` sulla sezione directory quando cambia pagina
3. **Fix B10** — `SchoolDirectory.tsx:193`: sostituire `<dl>` con `<div>` nel mini-card key facts

### Step 2 — Integrare il nuovo JSON scuole arricchito (priorità massima appena arriva)
1. Leggere la struttura del nuovo JSON — verificare campi nuovi e rimossi
2. Aggiornare il tipo `School` in `lib/types.ts` con i nuovi campi
3. Aggiornare il mapping in `lib/data/schools.ts` (`importedSchools` e `buildAutoDescription`)
4. Aggiornare `SchoolsList.tsx` → `normalizeCurriculum` e `extractRegion` se i dati cambiano
5. Aggiornare `schools/[slug]/page.tsx` per renderizzare nuove sezioni (TIER A vs TIER B)
6. Re-verificare bug B6 (region), B8 (fees contact), B11 (curriculum "Other")

### Step 3 — CRM / Form (quasi completo)
1. ✅ Web3Forms implementato — backend pronto
2. ⏳ Inserire `WEB3FORMS_ACCESS_KEY` su Vercel quando arriva l'email dall'agenzia
3. ❌ Collegare i ContactBtn nelle school/neighborhood detail pages (B-form)

### Step 4 — School Finder verifica (dopo JSON)
1. Verificare end-to-end: il quiz produce risultati corretti?
2. Verificare che i link risultati portino alle giuste pagine scuola

---

## BUG TRACKER RAPIDO (copia veloce per inizio sessione)

| # | Descrizione | File | Fix |
|---|---|---|---|
| B5 | Maps label EN hardcoded | `SchoolMap.tsx:56`, `NeighborhoodMap.tsx:72` | i18n key — BASSA priorità |
| B6 | Region filter inaffidabile (35% scuole in "Other Portugal") | `SchoolsList.tsx` extractRegion | Dopo nuovo JSON |
| B7 | `includes("set")` troppo generico in extractRegion | `SchoolsList.tsx:71` | Fix rapido — 5 min |
| B-form | Bottone "Contact" morto in school detail (no link/azione) | `schools/[slug]/page.tsx:149` | 30 min (dopo CRM) |
| B-faq-sf | FAQPage schema school-finder: 2 item schema vs 3 FAQ renderizzate | `school-finder/page.tsx:69-92` | Fix rapido — 10 min |
| B-quiz-ui | "Your Results" hardcoded EN in QuizResult | `QuizResult.tsx:39` | Fix rapido — 5 min |
| B8 | Filtro "contact" cattura anche scuole senza fees | `SchoolDirectory.tsx` price filter | Dopo nuovo JSON |
| B9 | Paginazione senza scroll-to-top | `SchoolDirectory.tsx` | Fix rapido — 10 min |
| B10 | `<dl>` senza `<dt>`/`<dd>` nella mini-card | `SchoolDirectory.tsx:193` | Fix rapido — 5 min |
| B11 | Curriculum "Other" troppo ampio per essere utile nel filtro | `SchoolsList.tsx` normalizeCurriculum | Dopo nuovo JSON |
