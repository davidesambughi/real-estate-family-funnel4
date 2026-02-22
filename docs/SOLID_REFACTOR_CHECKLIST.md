# SOLID + KISS + DRY Refactor Checklist — TrustFamily Relocation Funnel

> **Versione**: 2.0 | **Aggiornato**: 2026-02-19
> **Filtro applicato**: KISS (Keep It Simple) + YAGNI (You Ain't Gonna Need It) — ogni blocco è stato valutato per ROI reale, non purezza teorica.
>
> Documento inter-sessione. Spunta ogni task al completamento. Non modificare l'ordine dei blocchi — le dipendenze sono sequenziali.

---

## Principio guida

> **Applica SOLID solo quando risolve un problema che hai, non un problema che potresti avere.**
>
> Questa codebase è già ben strutturata. I blocchi ATTIVI risolvono problemi concreti (migrazione dati imminente, DRY reale, SEO a rischio). I blocchi RIMANDATI aggiungerebbero indirection senza beneficio a scala attuale.

---

## Regole Invarianti (non negoziabili)

Prima di ogni modifica, garantire che queste condizioni non vengano mai violate:

- `generateStaticParams()` deve continuare a pre-buildare **tutti** i locale × slug al build time
- `generateMetadata()` con `alternates.languages` (hreflang) deve restare intatto in ogni page
- Tutti i JSON-LD schema (`EducationalOrganization`, `Place`, `ItemList`, `FAQPage`, `Organization`) devono restare presenti e corretti
- `sitemap.ts` deve continuare a generare tutte le entry (65+) automaticamente
- I Server Components devono restare Server Components — nessun drift accidentale verso `"use client"`
- I link devono continuare a usare `Link` da `@/i18n/navigation` con **chiavi logiche**, mai URL SEO tradotti

---

## Blocco 1 — Data Access Layer (DAL) ✅ ATTIVO

> **Principio**: DIP | **Filtro YAGNI**: ✅ Supabase è già nel roadmap — questa astrazione pagherà dividendi certi nella prossima fase.
>
> **Impatto SEO**: ✅ Neutro — nessuna modifica al rendering o ai dati. `generateStaticParams()` e `sitemap.ts` usano le stesse funzioni, ora async.
>
> **Strategia**: creare `lib/dal/` con funzioni async tipizzate. I dati statici restano in `lib/schools-data.ts` e `lib/neighborhoods-data.ts` — cambiano solo i consumer. Quando si migrerà a Supabase, si toccherà solo il DAL.

### 1.1 — Creare il Data Access Layer

- [ ] Creare `lib/dal/schools.ts` con le seguenti funzioni esportate:
  ```ts
  export async function getSchools(): Promise<School[]>
  export async function getSchoolBySlug(slug: string): Promise<School | null>
  export async function getSchoolsByNeighborhood(neighborhoodSlug: string): Promise<School[]>
  ```
  Internamente delegano a `schoolsData` (fonte attuale). Annotare con `// TODO: replace with Supabase query`.

- [ ] Creare `lib/dal/neighborhoods.ts` con:
  ```ts
  export async function getNeighborhoods(): Promise<Neighborhood[]>
  export async function getNeighborhoodBySlug(slug: string): Promise<Neighborhood | null>
  ```

### 1.2 — Aggiornare i consumer (Server Components e pagine)

- [ ] `app/[locale]/schools/[slug]/page.tsx`
  — Sostituire `schoolsData.find((s) => s.slug === params.slug)` con `await getSchoolBySlug(params.slug)`
  — `generateStaticParams()` usa `await getSchools()` invece di `schoolsData` diretto
  — Verificare che `notFound()` sia chiamato se `school === null`

- [ ] `app/[locale]/neighborhoods/[slug]/page.tsx`
  — Sostituire `neighborhoodsData.find(...)` con `await getNeighborhoodBySlug(params.slug)`
  — Sostituire `schoolsData.filter((s) => s.neighborhoodSlug === ...)` con `await getSchoolsByNeighborhood(neighborhood.slug)`
  — `generateStaticParams()` usa `await getNeighborhoods()`

- [ ] `app/[locale]/best-private-and-public-international-schools-portugal-2026/page.tsx`
  — Sostituire import diretto `schoolsData` con `await getSchools()`
  — Il componente `<SchoolsList />` riceverà `schools` come prop (vedi 1.3)

- [ ] `app/[locale]/top-neighborhoods/page.tsx`
  — Sostituire import diretto `neighborhoodsData` con `await getNeighborhoods()`

- [ ] `app/sitemap.ts`
  — Sostituire import diretti `schoolsData` e `neighborhoodsData` con `await getSchools()` e `await getNeighborhoods()`
  — **SEO critico**: verificare output sitemap identico post-modifica

### 1.3 — Decoupling dei componenti dai dati

- [ ] `components/SchoolsList.tsx`
  — Rimuovere `import { schoolsData }`
  — Aggiungere prop: `interface SchoolsListProps { schools: School[] }`
  — Iterare su `props.schools` invece di `schoolsData`
  — La page parent passa `schools={await getSchools()}`

- [ ] `components/NeighborhoodsList.tsx`
  — Stesso pattern: aggiungere `neighborhoods: Neighborhood[]` come prop
  — Rimuovere import diretto `neighborhoodsData`

- [ ] `components/form.tsx`
  — Rimuovere righe 10-11: `import { schoolsData }` e `import { neighborhoodsData }`
  — Aggiungere tipo ristretto in `lib/types.ts`:
    ```ts
    export type SelectOption = { id: string; name: string }
    ```
  — Firma componente: `export default function Form({ schoolOptions, neighborhoodOptions }: FormProps)`
  — La parent `LeadMagnetSection` risolve i dati via DAL e li passa come props

- [ ] `components/features/quiz/QuizResult.tsx`
  — Rimuovere righe 7-8: import diretti `schoolsData` e `neighborhoodsData`
  — Rimuovere la logica di risoluzione slug→oggetto (righe 26-32)
  — Modificare le props: ricevere `schools: School[]` e `neighborhoods: Neighborhood[]` già risolti
  — `QuizSection` (Server) risolve gli slug via DAL e passa gli oggetti completi a `QuizWidget` come prop iniziale

---

## Blocco 2 — JSON-LD Extraction ✅ ATTIVO

> **Principio**: SRP + DRY | **Filtro YAGNI**: ✅ I JSON-LD sono complessi, duplicati su 4 pagine, e un bug silenzioso qui è danno SEO diretto. Il ROI è reale e immediato.
>
> **Impatto SEO**: 🟡 Alto rischio durante la migrazione — dopo ogni estrazione verificare con `npm run build` + ispezione HTML output.

- [ ] Creare `lib/jsonld/school.ts`:
  ```ts
  export function buildSchoolJsonLd(school: School): object
  ```
  Spostare il blocco `EducationalOrganization` da `schools/[slug]/page.tsx` in questa funzione.

- [ ] Creare `lib/jsonld/neighborhood.ts`:
  ```ts
  export function buildNeighborhoodJsonLd(neighborhood: Neighborhood, schools: School[]): object
  ```
  Spostare il blocco `Place` + `amenityFeature` da `neighborhoods/[slug]/page.tsx`.

- [ ] Creare `lib/jsonld/schools-list.ts`:
  ```ts
  export function buildSchoolsListJsonLd(schools: School[]): { itemList: object; faq: object }
  ```
  Spostare `ItemList` + `FAQPage` da `best-private-.../page.tsx`.

- [ ] Creare `lib/jsonld/neighborhoods-list.ts`:
  ```ts
  export function buildNeighborhoodsListJsonLd(neighborhoods: Neighborhood[]): { itemList: object; faq: object }
  ```
  Spostare da `top-neighborhoods/page.tsx`.

- [ ] Aggiornare le 4 pagine di origine per usare le funzioni importate. Le pagine restano responsabili solo di: fetch dati + metadata + rendering UI.

- [ ] **Verifica obbligatoria**: dopo ogni estrazione, `npm run build` deve passare e le pagine devono contenere gli stessi `<script type="application/ld+json">` di prima.

---

## Blocco 3 — Quiz State Hook ✅ ATTIVO

> **Principio**: SRP | **Filtro YAGNI**: ✅ `QuizWidget` ha 4 stati + 4 handler + rendering in 164 righe. L'hook migliora leggibilità reale e abilita il testing (Blocco 7).

- [ ] Creare `hooks/use-quiz.ts`:
  ```ts
  export function useQuiz(totalSteps: number) {
    // gestisce: currentStep, answers, selectedOption, isComplete
    // espone: handleOptionClick, handleNext, handleBack, handleRestart
    return { state, handlers }
  }
  ```

- [ ] `QuizWidget.tsx` — rimuovere i 4 `useState` (righe 32-35) e le 4 handler functions (righe 41-72). Delegare a `useQuiz()`.

---

## Blocco 4 — QuizSection DRY ✅ ATTIVO

> **Principio**: DRY | **Filtro KISS**: ✅ 33 righe quasi identiche di estrazione manuale chiavi i18n (righe 14-47 di `QuizSection.tsx`) → 1 chiamata a factory. Zero complessità aggiuntiva, puro DRY.

- [ ] Creare `lib/utils/quiz-translations.ts`:
  ```ts
  export function buildQuizTranslations(t: (key: string) => string): QuizTranslations
  ```
  Incapsula tutta l'estrazione delle 33 chiavi.

- [ ] `QuizSection.tsx` — sostituire le righe 14-47 con:
  ```ts
  const translations = buildQuizTranslations(t)
  ```

---

## Blocco 5 — Type Safety e Clean Code ✅ ATTIVO

> **Principio**: Clean Code | **Filtro KISS**: ✅ Correzioni puntuali, nessun refactor strutturale. Ogni item è una riga o due.

- [ ] `components/form.tsx` riga 16 — rimuovere `// @ts-ignore`. Fix:
  ```ts
  const [state, formAction, isPending] = useActionState<State, FormData>(submitLead, initialState)
  ```

- [ ] `QuizWidget.tsx` riga 89 — rimuovere il cast unsafe `(t as Record<string, string>)`.
  Usare un tipo union esplicito per le label keys di `QuizOption`.

- [ ] `QuizWidget.tsx` riga 97 — sostituire `t.stepLabel.replace("{current}", ...)` con interpolazione next-intl nativa:
  ```ts
  t("stepLabel", { current: currentStep + 1, total: totalSteps })
  ```
  Aggiornare la chiave `stepLabel` in tutti i 6 `messages/*.json` (es. `"Step {current} of {total}"`).

- [ ] `lib/dal/schools.ts` e `lib/dal/neighborhoods.ts` — aggiungere `unstable_cache` per caching con tag invalidabili:
  ```ts
  import { unstable_cache } from "next/cache"
  export const getSchools = unstable_cache(
    async () => schoolsData,
    ["schools"],
    { tags: ["schools"] }
  )
  ```

---

## Blocco 6 — i18n Completeness ✅ ATTIVO

> **Principio**: Clean Code + i18n consistency | **Filtro YAGNI**: ✅ Impatta utenti reali non-EN. Le stringhe hardcoded in inglese rompono l'esperienza per PT/DE/FR/NL/ES.

- [ ] `components/form.tsx` — convertire tutte le stringhe hardcoded in chiavi i18n nel namespace `LeadForm`:
  - `"Thank You!"` → `t("success.title")`
  - `"Your request has been received..."` → `t("success.message")`
  - `"Send another request"` → `t("success.resetBtn")`
  - `"Full Name *"` → `t("fields.fullName")`
  - `"Nationality *"` → `t("fields.nationality")`
  - `"Email *"` → `t("fields.email")`
  - `"Phone (Optional)"` → `t("fields.phone")`
  - `"Interested School (Optional)"` → `t("fields.school")`
  - `"Interested Area (Optional)"` → `t("fields.neighborhood")`
  - `"Select a school"` → `t("fields.schoolPlaceholder")`
  - `"Select an area"` → `t("fields.neighborhoodPlaceholder")`
  - `"Get Your Personalized Guide"` → `t("submitBtn")`
  - `"Sending..."` → `t("submittingBtn")`
  - `"We respect your privacy..."` → `t("privacyNote")`
  - Aggiungere namespace `LeadForm` a tutti i 6 `messages/*.json`

- [ ] `components/features/quiz/QuizResult.tsx` riga 55 — `"Best Match"` hardcoded → chiave `Quiz.bestMatchBadge` in tutti i 6 JSON

- [ ] Audit rapido su `Hero.tsx`, `TrustBar.tsx`, `Testimonials.tsx` — verificare assenza di stringhe EN hardcoded

---

## Blocco 7 — Next.js Best Practices ✅ ATTIVO

> **Principio**: Modern Next.js 15/16 | **Filtro KISS**: ✅ Effort minimo (3 file da creare), beneficio SEO e UX reale. `not-found.tsx` evita 200 su slug inesistenti.

- [ ] Creare `app/[locale]/schools/[slug]/not-found.tsx` — 404 locale-aware per slug scuola inesistente

- [ ] Creare `app/[locale]/neighborhoods/[slug]/not-found.tsx` — stesso pattern per quartieri

- [ ] Creare `app/[locale]/error.tsx` — error boundary locale-aware (`"use client"`, gestisce errori runtime)

- [ ] `app/[locale]/schools/[slug]/page.tsx` — verificare che `notFound()` sia chiamato esplicitamente quando `getSchoolBySlug()` ritorna `null`

- [ ] `app/[locale]/neighborhoods/[slug]/page.tsx` — stesso check per `getNeighborhoodBySlug()`

- [ ] Aggiungere `export const revalidate = 86400` sulle pagine di dettaglio — preparazione per ISR quando arriva Supabase

---

## Blocco 8 — Testing ✅ ATTIVO

> **Principio**: Qualità + safety net per i refactor | **Priorità**: più prezioso di quasi tutti i blocchi SOLID. Senza test ogni refactor è un rischio; con test ogni refactor è sicuro.
>
> **Stack suggerito**: Vitest + React Testing Library (unit/integration) + Playwright (e2e)

### 8.1 — Setup

- [ ] Installare dipendenze: `vitest`, `@vitest/coverage-v8`, `@testing-library/react`, `@testing-library/jest-dom`
- [ ] Configurare `vitest.config.ts` con alias `@/*` coerente con `tsconfig.json`
- [ ] Aggiungere script in `package.json`: `"test": "vitest"`, `"test:coverage": "vitest run --coverage"`

### 8.2 — Unit test: funzioni pure (massimo ROI, zero setup)

- [ ] `lib/jsonld/school.ts` — `buildSchoolJsonLd(school)`:
  snapshot test che verifica `@type`, `name`, `geo.latitude`, `geo.longitude` nell'output

- [ ] `lib/jsonld/neighborhood.ts` — `buildNeighborhoodJsonLd(neighborhood, schools)`:
  snapshot test che verifica `@type: "Place"` e presenza `amenityFeature`

- [ ] `lib/jsonld/schools-list.ts` — `buildSchoolsListJsonLd(schools)`:
  verifica che `numberOfItems` corrisponda a `schools.length`

- [ ] `components/features/quiz/quiz-data.ts` — `matchSchools(answers)`:
  ```ts
  it("budget high + lifestyle coastal → st-julians primo", ...)
  it("budget low + curriculum american → carlucci primo", ...)
  it("risposta parziale non crasha", ...)
  ```

- [ ] `components/features/quiz/quiz-data.ts` — `matchNeighborhoods(answers)`:
  ```ts
  it("coastal → cascais, estoril", ...)
  it("lifestyle mancante → fallback", ...)
  ```

- [ ] `hooks/use-quiz.ts` (dopo Blocco 3) — `useQuiz(totalSteps)`:
  ```ts
  it("handleNext avanza lo step", ...)
  it("handleBack torna indietro e cancella risposta", ...)
  it("ultimo step → isComplete true", ...)
  it("handleRestart resetta tutto a zero", ...)
  ```

### 8.3 — Integration test: Server Actions

- [ ] `lib/actions.ts` — `submitLead`:
  ```ts
  it("input valido → success true", ...)
  it("email mancante → errors.email presente", ...)
  it("fullName < 2 chars → errors.fullName presente", ...)
  ```

### 8.4 — E2E test con Playwright (pre-launch)

- [ ] Installare `@playwright/test`, configurare `playwright.config.ts`
- [ ] Test quiz flow: apertura → 4 step → visualizzazione risultati → restart
- [ ] Test lead form: compilazione campi obbligatori → submit → stato success visibile
- [ ] Test lingua: switch da EN a PT → URL cambia → contenuto cambia → form ancora funzionante

---

## Blocco 9 — Tech Debt Pre-Launch ✅ ATTIVO

> Elementi documentati in `docs/project_roadmap.md` e `docs/nextstep.md`. Bloccanti per il lancio.

- [ ] **P7 — CRM Integration** `lib/actions.ts`
  — Scegliere tra Resend / Supabase / HubSpot (stubs già documentati nel file)
  — Sostituire `console.log('Lead received:', data)` con la chiamata CRM reale
  — Aggiungere variabili d'ambiente necessarie (`.env.local` + Vercel env)
  — Coprire con integration test (Blocco 8.3)

- [ ] **P6 — CDN Images** `next.config.ts`
  — Aggiungere hostname CDN produzione in `remotePatterns`
  — Sostituire URL `placehold.co` con immagini reali nelle data files

- [ ] **Maps** `components/features/SchoolMap.tsx` e `NeighborhoodMap.tsx`
  — Sostituire stub statici con embed Mapbox o Google Maps reali
  — Usare `coordinates: { lat, lng }` già presenti in `School` e `Neighborhood`
  — **SEO/GEO note**: mappe reali aggiungono segnali geo per AI Overviews

- [ ] **Revisione culturale traduzioni** `messages/de.json`, `fr.json`, `nl.json`, `es.json`
  — Adattamento culturale (non solo traduzione letterale) per mercati DE/FR/NL/ES

---

## Blocchi Rimandati ⏸

> Valutati e deliberatamente esclusi. Rileggere quando la condizione indicata si verifica.

| Blocco | Descrizione | Rimanda a quando | Perché non ora |
|--------|-------------|-----------------|----------------|
| **Quiz scoring config** | Estrarre `SCHOOL_SCORING` come oggetto config separato da `matchSchools()` | Quando le scuole superano **10** | Con 4 scuole il codice diretto è più leggibile della config. YAGNI puro: l'indirection costa più del beneficio. |
| **ISP QuizWidget translations** | Spezzare `QuizWidgetProps.translations` in interfacce per step | Quando il quiz supera **6 step** o i tipi causano errori reali | Le 20 chiavi sono tutte usate. Creare 4 interfacce aggiunge file e tipi senza risolvere un problema concreto. |
| **FormSuccess component** | Estrarre il blocco success di `form.tsx` (10 righe) in `FormSuccess.tsx` | Quando il blocco success diventa **riutilizzato in >1 posto** | 10 righe non giustificano un file. KISS: la logica condizionale in-file è più chiara. |
| **Strategy Pattern per matching** | Rendere `matchSchools()` un engine generico con algoritmo iniettabile | Quando servono **algoritmi alternativi** (A/B test, ML scoring) | Over-engineering classico. Un'unica funzione lineare è corretta per il problema attuale. |
| **Error boundaries per-componente** | `<ErrorBoundary>` intorno a sezioni individuali della pagina | Quando si integrano **API esterne** (mappe, CRM widget) con rischio di crash isolato | `error.tsx` al livello locale copre il 95% dei casi reali. La granularità per-componente è YAGNI. |

---

## Checklist Regressione SEO/GEO

> Da eseguire dopo **ogni** blocco completato. Fail = rollback immediato.

- [ ] `npm run build` esce con code 0 (zero errori TypeScript e Next.js)
- [ ] `app/sitemap.ts` — l'output include tutti i locale × slug per scuole e quartieri
- [ ] Ogni pagina scuola ha `<script type="application/ld+json">` con `@type: "EducationalOrganization"` e `geo` coordinates
- [ ] Ogni pagina quartiere ha JSON-LD con `@type: "Place"` e `amenityFeature`
- [ ] Le pagine lista hanno `ItemList` + `FAQPage` JSON-LD
- [ ] La homepage ha `Organization` JSON-LD
- [ ] `generateMetadata()` sulle pagine di dettaglio include `alternates.languages` con tutti i 6 locale
- [ ] I link in tutti i componenti usano `Link` da `@/i18n/navigation` (non `next/link`)
- [ ] `SchoolsList` e `NeighborhoodsList` sono Server Components (nessun `"use client"`)
- [ ] `QuizSection` è un Server Component anche dopo refactoring (passa props al Client `QuizWidget`)

---

## Riepilogo Finale

| Blocco | Principio | Effort | Status |
|--------|-----------|--------|--------|
| 1 — DAL | DIP | Alto | ✅ Attivo — Supabase è imminente |
| 2 — JSON-LD Extraction | SRP + DRY | Medio | ✅ Attivo — SEO safety |
| 3 — Quiz State Hook | SRP | Basso | ✅ Attivo — abilita testing |
| 4 — QuizSection DRY | DRY | Minimo | ✅ Attivo — 33 righe → 1 |
| 5 — Type Safety | Clean Code | Minimo | ✅ Attivo — fix puntuali |
| 6 — i18n Completeness | Clean Code | Medio | ✅ Attivo — impatta utenti reali |
| 7 — Next.js Practices | Best Practices | Basso | ✅ Attivo — SEO/UX |
| 8 — Testing | Qualità | Medio | ✅ Attivo — safety net per tutto il resto |
| 9 — Tech Debt | Roadmap | Alto | ✅ Attivo — blocca il lancio |
| Quiz scoring config | OCP | — | ⏸ Rimandato — YAGNI a 4 scuole |
| ISP Quiz interfaces | ISP | — | ⏸ Rimandato — nessun pain reale |
| FormSuccess component | SRP | — | ⏸ Rimandato — 10 righe, KISS |
| Strategy Pattern | OCP | — | ⏸ Rimandato — over-engineering |
| Error boundaries granulari | Best Practices | — | ⏸ Rimandato — error.tsx sufficiente |

> **Regola operativa**: completare un blocco intero prima di iniziare il successivo. Eseguire la checklist regressione SEO/GEO dopo ogni blocco. Il Blocco 8 (Testing) può procedere in parallelo con qualsiasi altro blocco.
