# Translation Audit — TrustFamily Relocation Funnel

**Data audit:** 2026-02-25
**Scope:** 10 pagine, 6 file messages, 3 file dati, 3 componenti chiave
**Locali:** en · pt · de · fr · nl · es

---

## Legenda categorie

| Cat. | Tipo | Descrizione |
|------|------|-------------|
| **A** | UI / metadata | Già in next-intl o semplice da aggiungere ai JSON. Nessuna traduzione professionale. |
| **B** | Prose editoriale | Paragrafi, heading, label hardcoded nel JSX. Serve traduzione professionale o AI-assisted. |
| **C** | Dati strutturati | Campi in `schoolsData`, `neighborhoodsData`, `blog-data.ts` — sempre serviti in EN. |

---

## 1. Homepage — `app/[locale]/page.tsx`

### A — Già i18n (namespaces attivi)

| Namespace | Chiavi | Contenuto |
|-----------|--------|-----------|
| `HomePage` | `metaTitle`, `metaDescription` | Titolo e meta tag pagina |
| `Hero` | `overline`, `title`, `subtitle` | `subtitle` contiene ~390 parole di testo editoriale — **già tradotto in 5 lingue** |
| `TrustBar` | `independent`, `validated`, `updated` | Badge di trust |
| `Pillars` | 8 chiavi | Intros e card dei 3 pillar |
| `LeadMagnet` | 9 chiavi | Testo sezione form lead magnet |
| `Quiz` | 23 chiavi | Tutte le domande, opzioni, bottoni del quiz |

> **Nota:** Hero.subtitle (~390 parole) è l'unico blocco di testo lungo già tradotto professionalmente in tutti e 6 i locale. Modello da replicare.

### B — Prose hardcoded in inglese (JSX)

| Blocco | Righe | Parole (~) | Contenuto |
|--------|-------|-----------|-----------|
| H2 "Why Portugal" + 4 paragrafi | 145–217 | ~1,100 | Sicurezza, clima, scuole, cost asymmetry |
| Pull-stat sidebar (Global Peace Index) | 182–213 | ~80 | Statistica + citazione fonte |
| Image caption | ~200 | ~18 | "Lisbon's waterfront..." |
| H2 "School decision = relocation decision" + 3 paragrafi | 229–277 | ~680 | St. Julian's, ammissioni, timeline |
| Pull-quote sidebar | ~255 | ~18 | "Choose the school first..." |
| Bridge prose pre-quiz | 284–291 | ~50 | "Not sure which school fits..." |
| H2 "Independent intelligence" + 3 paragrafi | 319–362 | ~840 | Metodologia, indipendenza, E-E-A-T |
| Pull-quote italics | ~340 | ~28 | "The information that matters most..." |
| Testimonials section header | 368–375 | ~12 | "What families say" + subtitle |

**Totale B – Homepage: ~2,830 parole hardcoded EN**

> Le 3 prose blocks sono il corpo dell'articolo editoriale principale. Per design sono magazine-style — vedasi commento in testa al file.

### C — Dati statici (non applicabile)
Nessuno. Homepage non usa dati da data files nel JSX (solo schemas JSON-LD).

---

## 2. Schools Guide — `app/[locale]/best-private-and-public-international-schools-portugal-2026/page.tsx`

### A — i18n
- `getTranslations({ locale, namespace: "Metadata" })` importato ma risultato scartato (`void t`) — **nessun namespace attivo su questa pagina**
- Metadata `title` e `description` hardcoded in inglese direttamente in `generateMetadata`

### B — Prose hardcoded in inglese

| Sezione | Parole (~) |
|---------|-----------|
| H1 + subtitle header | ~45 |
| Key Takeaways (7 bullet points) | ~180 |
| Table of Contents labels (7 voci) | ~20 |
| § 1 Overview (H2 + 3 paragrafi) | ~180 |
| § 2 Curriculum Guide (H2 + intro + 3 card) | ~450 |
| § 3 The Real Cost (H2 + tabella + 3 paragrafi) | ~350 |
| § 4 Admissions Reality (H2 + intro + 4 card + rule box) | ~300 |
| § 5 Methodology (H2 + 3 card) | ~180 |
| § 6 header "School profiles" | ~5 |
| § 7 FAQ header | ~5 |
| FAQ 4 Q&A | ~220 |
| Related neighborhoods (H2 + 3 card) | ~80 |

**Totale B – Schools Guide: ~2,015 parole hardcoded EN**

### C — Dati da `schoolsData`
- `school.name`, `school.curriculum`, `school.fees`, `school.location` — usati nelle sezioni fees/admissions
- ItemListSchema usa `school.name` e `school.description` per JSON-LD

---

## 3. Neighborhoods Guide — `app/[locale]/top-neighborhoods/page.tsx`

### A — i18n
- Stesso pattern della schools guide: `void t`, nessun namespace attivo
- Metadata hardcoded in inglese

### B — Prose hardcoded in inglese

| Sezione | Parole (~) |
|---------|-----------|
| H1 + subtitle header | ~40 |
| Key Takeaways (7 bullet points) | ~250 |
| Table of Contents (8 voci) | ~25 |
| § 1 Overview (H2 + 3 paragrafi) | ~150 |
| § 2 School-First Rule (H2 + intro + tabella + nota) | ~200 |
| § 3 Coastal Belt / Cascais & Estoril (H2 + intro + 2 card) | ~400 |
| § 4 Sintra (H2 + 2 paragrafi + sidebar) | ~200 |
| § 5 Inside Lisbon / Campo de Ourique & Parque das Nações (H2 + 2 card) | ~250 |
| § 6 How to Choose (H2 + intro + 5 checklist item) | ~280 |
| § 7 header "Neighborhood profiles" | ~5 |
| § 8 FAQ header + 4 Q&A | ~185 |
| Related schools (H2 + 2 card) | ~80 |

**Totale B – Neighborhoods Guide: ~2,065 parole hardcoded EN**

### C — Dati da `neighborhoodsData`
- `neighborhood.name`, `neighborhood.location`, `neighborhood.vibe`, `neighborhood.description`, `neighborhood.highlights`, `neighborhood.commuteContext`, `neighborhood.amenities`

---

## 4. Relocation Guide — `app/[locale]/relocation-guide/page.tsx`

### A — i18n
- Nessun namespace attivo. Metadata hardcoded in inglese.

### B — Prose hardcoded in inglese
- Pagina non letta nel dettaglio ma strutturalmente identica alle pillar pages (magazine article con sezioni sequential)
- Stimato: **~2,500 parole** (guide più lunga, include HowTo con 6 step + timeline + FAQ)

### C — Dati
- Nessuno. Tutti i dati sono inlinati nel JSX.

---

## 5. School Detail — `app/[locale]/schools/[slug]/page.tsx`

### A — i18n
- `getTranslations({ locale, namespace: "Metadata" })` — usato solo per il fallback title quando school non trovata
- Tutto il contenuto reale è data-driven

### B — Prose hardcoded in inglese (label e section header)

| Elemento | Testo | ~Parole |
|----------|-------|---------|
| Section header | "About the School" | 3 |
| Card title | "The Verdict" | 2 |
| Card title | "Parent Whisper" | 2 |
| Section header | "Key Highlights" | 2 |
| Section header | "School Details" | 2 |
| Label | "Curriculum" | 1 |
| Label | "Annual Fees" | 2 |
| Card title | "Neighborhood Match" | 2 |
| Label | "School Location" | 2 |
| Button | "Contact School Advisor" | 3 |
| Link text | "Explore {schoolName}" | 1 (+ dynamic) |
| Image alt | hardcoded ("school campus" pattern) | ~5 |

**Totale B – School Detail: ~27 parole di label hardcoded EN**

### C — Dati da `schoolsData` (rendered nel JSX)

| Campo | Contenuto | ~Parole/scuola |
|-------|-----------|---------------|
| `school.description` | Paragrafo editoriale | 42–50 |
| `school.verdict` | Frase di verdetto | 12–18 |
| `school.parentWhisper` | Citazione genitore | 18–22 |
| `school.highlights[]` | 3 bullet points | 6–12 |

**Totale C – schools-data.ts: ~330 parole × 4 scuole = 330 parole totali EN**

---

## 6. Neighborhood Detail — `app/[locale]/neighborhoods/[slug]/page.tsx`

### A — i18n
- Nessun namespace attivo nel JSX

### B — Prose hardcoded in inglese (label)

| Elemento | Testo | ~Parole |
|----------|-------|---------|
| Section header | "About {name}" | 1 (+ dynamic) |
| Card title | "Why Families Love It" | 4 |
| Label | "Commute Context" | 2 |
| Section header | "Lifestyle & Amenities" | 3 |
| Section header | "Schools in {name}" | 2 (+ dynamic) |
| Card title | "Vibe Check" | 2 |
| Link | "Explore the Area" | 3 |
| Button | "Contact Relocation Expert" | 3 |
| Fallback text | "No international schools listed specifically in this neighborhood yet. Check nearby areas." | 14 |

**Totale B – Neighborhood Detail: ~34 parole di label hardcoded EN**

### C — Dati da `neighborhoodsData`

| Campo | Contenuto | ~Parole/quartiere |
|-------|-----------|------------------|
| `neighborhood.description` | Paragrafo editoriale | 48–60 |
| `neighborhood.commuteContext` | Frase commute | 10–15 |
| `neighborhood.vibeAdjectives[]` | 5 tag | 5–10 |
| `neighborhood.amenities[]` | 5–7 item con emoji | 15–25 |

**Totale C – neighborhoods-data.ts: ~88 parole × 5 quartieri = 440 parole totali EN**

---

## 7. Blog Listing — `app/[locale]/blog/page.tsx`

### A — i18n
- Nessun namespace attivo. Metadata hardcoded.

### B — Prose hardcoded in inglese

| Elemento | Testo | ~Parole |
|----------|-------|---------|
| H1 | "School & Relocation Guides" | 4 |
| Subtitle | "First-hand guides from a team that has helped 200+ families relocate to Portugal." | 18 |
| Link text (per articolo) | "Read full guide →" | 3 per articolo × 3 = 9 |

**Totale B – Blog Listing: ~31 parole hardcoded EN**

### C — Dati da `blogArticles`
- `article.title`, `article.subtitle`, `article.intro` (slice 220 chars), `article.readTime` — tutti EN

---

## 8. Blog Detail — `app/[locale]/blog/[slug]/page.tsx`

### A — i18n
- Nessun namespace attivo. Metadata da dati articolo.

### B — Prose hardcoded in inglese (label e UI)

| Elemento | Testo | ~Parole |
|----------|-------|---------|
| Byline | "TrustFamily Editorial" | 2 |
| H2 CTA | "Ready to go deeper?" | 4 |
| Subtitle CTA | "Use our independent guides to compare schools and neighborhoods — or take the 60-second School Finder quiz." | 20 |
| Button | "School Finder Quiz" | 3 |
| Back link | "← All articles" | 2 |

**Totale B – Blog Detail: ~31 parole hardcoded EN**

### C — Dati da `blogArticles`

| Campo | Contenuto | ~Parole/articolo |
|-------|-----------|-----------------|
| `article.title` | Titolo articolo | 8–12 |
| `article.subtitle` | Sottotitolo | 8–12 |
| `article.intro` | Paragrafo di apertura | 38–49 |
| `article.sections[]` | 3 sezioni × {heading + body} | 150–220 |
| `article.cta.text` | Testo CTA | 3–5 |

**Totale C – blog-data.ts: 3 articoli × ~215 parole = ~647 parole totali EN**

---

## 9. About — `app/[locale]/about/page.tsx`

### A — i18n
- Nessun namespace attivo. Metadata hardcoded.

### B — Prose hardcoded in inglese

| Sezione | Parole (~) |
|---------|-----------|
| H1 + paragrafo apertura | ~65 |
| Stats grid (4 item: "200+ families guided", ecc.) | ~25 |
| § "What TrustFamily does" (H2 + 3 paragrafi) | ~205 |
| § "How we operate" (H2 + 4 principle card) | ~130 |
| § "Who uses TrustFamily" (H2 + 2 paragrafi) | ~105 |
| § "What TrustFamily does not do" (H2 + 5 bullet) | ~50 |
| CTA section (H2 + paragrafo + 2 bottoni) | ~35 |

**Totale B – About: ~615 parole hardcoded EN**

---

## 10. School Finder — `app/[locale]/school-finder/page.tsx`

### A — i18n
- Metadata è un oggetto statico (`export const metadata`) — non dinamico per locale
- Nessun namespace attivo

### B — Prose hardcoded in inglese

| Sezione | Parole (~) |
|---------|-----------|
| Overline + H1 + subtitle | ~35 |
| "How it works" — 4 step con label + descrizione | ~90 |
| Trust strip — 3 badge | ~18 |
| CTA button + subtext | ~12 |
| "Common Questions" (H2 + 3 Q&A) | ~145 |

**Totale B – School Finder: ~300 parole hardcoded EN**

---

## 11. Form Component — `components/form.tsx`

### A — i18n
**Zero.** Il componente non usa `useTranslations` né riceve testo via props.

### B — Prose hardcoded in inglese ⚠️ CRITICO

| Elemento | Testo | ~Parole |
|----------|-------|---------|
| Success title | "Thank You!" | 2 |
| Success message | "Your request has been received. We will be in touch shortly with your personalized guide." | 16 |
| Reset button | "Send another request" | 3 |
| Label | "Full Name *" | 2 |
| Placeholder | "John Doe" | 2 |
| Label | "Nationality *" | 1 |
| Placeholder | "e.g. American" | 2 |
| Label | "Email *" | 1 |
| Label | "Phone (Optional)" | 2 |
| Label | "Interested School (Optional)" | 3 |
| Placeholder | "Select a school" | 3 |
| Label | "Interested Area (Optional)" | 3 |
| Placeholder | "Select an area" | 3 |
| Label | "Questions or Comments" | 3 |
| Placeholder | "Tell us what you are looking for..." | 8 |
| Submit button | "Get Your Personalized Guide" | 4 |
| Loading button | "Sending..." | 1 |
| Privacy note | "We respect your privacy. No spam, ever." | 7 |

**Totale B – Form: ~66 parole hardcoded EN**

> **Già tracciato in `docs/LAUNCH_CHECKLIST.md` come P0** — il form mostra inglese agli utenti DE/FR/NL/ES/PT.

---

## 12. Analisi file messages/ — stato completezza

| File | Chiavi | Stato |
|------|--------|-------|
| `messages/en.json` | 77 | ✅ Master |
| `messages/pt.json` | 77 | ✅ Completo |
| `messages/de.json` | 77 | ✅ Completo |
| `messages/fr.json` | 77 | ✅ Completo |
| `messages/nl.json` | 77 | ✅ Completo |
| `messages/es.json` | 77 | ✅ Completo |

**Nessuna chiave mancante in nessun locale.** Qualità traduzione: buona — placeholder (`{current}`, `{total}`) preservati, tono coerente, simboli moneta (€) corretti.

### Namespaces attivi (77 chiavi totali)

| Namespace | Chiavi | Componente che lo usa |
|-----------|--------|----------------------|
| `HomePage` | 3 | `app/[locale]/page.tsx` |
| `Locale` | 6 | Language switcher |
| `Navigation` | 6 | Nav component |
| `Metadata` | 2 | Fallback metadata |
| `Hero` | 3 | `components/features/Hero.tsx` |
| `TrustBar` | 3 | TrustBar component |
| `Pillars` | 8 | `PillarsCardsSection.tsx` |
| `LeadMagnet` | 9 | `LeadMagnetSection.tsx` |
| `Quiz` | 23 | `QuizSection.tsx` (completamente i18n) |
| `NotFound` | 3 | `not-found.tsx` |

---

## 13. Conteggio parole per categoria

### Categoria A — già i18n (stima parole per locale)

| Namespace | ~Parole EN |
|-----------|-----------|
| Hero.subtitle | ~390 |
| Quiz (23 chiavi) | ~250 |
| Pillars (8 chiavi) | ~180 |
| LeadMagnet (9 chiavi) | ~120 |
| TrustBar, Navigation, ecc. | ~80 |
| **Totale A tradotto** | **~1,020 parole** |

**Già tradotto in 5 lingue. Nessuna azione necessaria.**

---

### Categoria B — prose hardcoded in inglese nel JSX

| Pagina / Componente | ~Parole |
|--------------------|---------|
| Homepage (3 prose blocks) | ~2,830 |
| Relocation Guide | ~2,500 |
| Schools Guide | ~2,015 |
| Neighborhoods Guide | ~2,065 |
| About | ~615 |
| School Finder | ~300 |
| Form component | ~66 |
| School Detail (label) | ~27 |
| Neighborhood Detail (label) | ~34 |
| Blog Listing (label) | ~31 |
| Blog Detail (label) | ~31 |
| **Totale B** | **~10,514 parole** |

---

### Categoria C — dati statici solo inglese

| File | ~Parole |
|------|---------|
| `lib/schools-data.ts` | ~330 |
| `lib/neighborhoods-data.ts` | ~440 |
| `lib/blog-data.ts` | ~647 |
| **Totale C** | **~1,417 parole** |

---

### Riepilogo

| Categoria | ~Parole | Stato |
|-----------|---------|-------|
| A — UI / metadata | ~1,020 | ✅ Tradotto in 5 lingue |
| B — Prose JSX | ~10,514 | ❌ 100% inglese hardcoded |
| C — Dati strutturati | ~1,417 | ❌ 100% inglese in TypeScript |
| **Totale da tradurre (B+C)** | **~11,931** | |

---

## 14. Raccomandazioni — cosa tradurre e in quale ordine

### Tier 1 — Tradurre ora, impatto massimo (impatto SEO + conversion)

**1. Form component (B, ~66 parole) — P0 già in LAUNCH_CHECKLIST**
- Utenti DE/FR/NL/ES/PT vedono labels in inglese nel form di lead capture
- Impatto conversion diretto. È già bloccante per il lancio.
- Effort: piccolo (~66 parole, struttura i18n già nota)

**2. Metadata pillar pages (B, ~25 parole per pagina × 6 pagine = ~150 parole)**
- Schools guide, Neighborhoods guide, Relocation guide, About, School Finder, Blog usano `title`/`description` hardcoded in inglese
- Google mostra questi testi nelle SERP per tutte e 6 le lingue — avere titolo EN su una SERP DE è un segnale di qualità negativo
- Effort: piccolo. Aggiungere 2 chiavi per pagina al proprio namespace nei JSON + usare `getTranslations` nei generateMetadata

**3. School Finder page (B, ~300 parole)**
- Landing page con contenuto SEO-indicizzabile + CTA diretta al quiz
- Ranking su query come "international school finder Portugal" nelle 6 lingue
- Effort: medio. 6 sezioni distinte, tutte label/brevi.

**4. About page (B, ~615 parole)**
- Pagina E-E-A-T con Person schema — importante per credibilità multilingua
- Effort: medio. Testo modulare, molte frasi brevi.

### Tier 2 — Impatto SEO medio, pianificare

**5. School detail labels (B, ~27 parole)**
**6. Neighborhood detail labels (B, ~34 parole)**
- Le label section header ("About the School", "The Verdict", ecc.) sono visibili su ogni scheda scuola/quartiere
- Piccolo effort, grande volume (4 scuole × 5 quartieri × 6 locale = 54 pagine con label EN)

**6. schoolsData + neighborhoodsData (C, ~770 parole)**
- `school.description`, `school.verdict`, `school.parentWhisper` e `neighborhood.description`, `neighborhood.commuteContext`
- Questi testi sono il corpo delle pagine detail — traducendoli si sblocca il contenuto locale-aware su 54 pagine
- Decisione chiave: vedi sezione architettura sotto

### Tier 3 — Post-lancio, richiede traduzione professionale

**7. Pillar page prose (B, ~9,400 parole: Homepage + 3 guide)**
- Il volume è alto (equivale a 3 articoli di rivista per lingua × 5 lingue = 15 articoli)
- SEO: con l'attuale strategia self-referencing canonical + hreflang, il mancato ranking su EN non è penalizzato
- Impatto maggiore quando il traffico organico è stabile e si vuole espandere in un nuovo mercato lingua
- Approccio suggerito: tradurre prima i mercati con traffico reale (vedere Search Console post-lancio)

**8. Blog articles (C, ~647 parole)**
- Blog è attualmente EN-only by design — aspettare CMS migration (Phase 5) prima di tradurre
- Il volume cresce ad ogni articolo: investire in una struttura prima del volume

---

## 15. Architettura tecnica per la traduzione del prose

### Opzione A — Chiavi i18n lunghe nei JSON esistenti ❌ Non raccomandato per prose

```json
// messages/en.json
{
  "SchoolsGuide": {
    "heroTitle": "Best Private & Public International Schools Portugal 2026",
    "overviewSection": "The Lisbon area has four internationally accredited schools...",
    "curriculumIntro": "Choosing the right curriculum is the most consequential...",
    ...
  }
}
```

**Pro:** Nessuna nuova infrastruttura, stesso pattern attuale
**Contro:** File JSON diventano enormi (10,000+ parole per file), non editabili da non-developer, nessun supporto per markdown nel testo, diff illeggibili in git

**Soglia:** Adatto solo per testi < 200 parole (label, section header, metadata)

---

### Opzione B — File MDX per locale ✅ Raccomandato per pillar pages

```
content/
├── schools-guide/
│   ├── en.mdx
│   ├── pt.mdx
│   ├── de.mdx
│   ├── fr.mdx
│   ├── nl.mdx
│   └── es.mdx
├── neighborhoods-guide/
│   └── ...
└── relocation-guide/
    └── ...
```

Il page component carica il file MDX corretto in base al locale:
```typescript
// app/[locale]/best-private-and-public-international-schools.../page.tsx
const { default: Content } = await import(`@/content/schools-guide/${locale}.mdx`);
```

**Pro:** Markdown nativo, file separati per lingua (diff puliti), editabile da redattori, supporta headings/lists/callout nativamente
**Contro:** Richiede `@next/mdx` o `next-mdx-remote`, i componenti React inline nel JSX devono essere esplicitati nel MDX

**Quando usarla:** Per i 3 pillar guides (Homepage, Schools, Neighborhoods, Relocation) quando si decide di tradurre il prose lungo

---

### Opzione C — Oggetti TypeScript locale-keyed ✅ Raccomandato per dati strutturati

Per `schoolsData` e `neighborhoodsData`:

```typescript
// lib/schools-data.ts
interface SchoolTranslations {
  description: string;
  verdict: string;
  parentWhisper: string;
  highlights: string[];
}

interface School {
  slug: string;
  name: string; // non si traduce
  // ... altri campi statici
  translations: {
    en: SchoolTranslations;
    pt?: SchoolTranslations;
    de?: SchoolTranslations;
    fr?: SchoolTranslations;
    nl?: SchoolTranslations;
    es?: SchoolTranslations;
  };
}
```

Nei page components:
```typescript
const t = school.translations[locale] ?? school.translations.en;
// render t.description, t.verdict, t.parentWhisper
```

**Pro:** Nessuna dipendenza nuova, type-safe, fallback su EN automatico se traduzione mancante, graduale (aggiungi locale quando è pronto)
**Contro:** File TypeScript più pesanti, editing richiede developer
**Quando usarla:** Per `schoolsData` e `neighborhoodsData` nel Tier 2

---

### Opzione D — CMS (Sanity / Contentful / Payload) ✅ Raccomandato long-term

Già citato come Phase 5 nel codebase. Adatto quando:
- Numero articoli blog > 10
- Il team di contenuti non è developer
- Le traduzioni hanno un workflow di revisione (translator → review → publish)

**Implementazione:** `getSanitySchoolData(slug, locale)` sostituisce `schoolsData.find()`

---

## 16. Piano di attività

| Priorità | Azione | Categoria | ~Parole | Effort | Impatto |
|----------|--------|-----------|---------|--------|---------|
| P0 | Form i18n (già in LAUNCH_CHECKLIST) | B | ~66 | S | 🔴 Conversion |
| P1 | Metadata pillar pages in i18n | B | ~150 | S | 🟠 SERP |
| P2 | School Finder page traduzione | B | ~300 | M | 🟠 SEO |
| P2 | About page traduzione | B | ~615 | M | 🟡 E-E-A-T |
| P3 | Detail page labels (schools + neighborhoods) | B | ~61 | S | 🟡 UX |
| P3 | schoolsData + neighborhoodsData i18n (Opzione C) | C | ~770 | M | 🟠 SEO detail |
| P4 | Pillar page prose (Opzione B — MDX) | B | ~9,400 | XL | 🟢 SEO pillar |
| P5 | Blog articles (CMS migration) | C | ~647+ | XL | 🟢 SEO blog |

**Legenda effort:** S = giorni · M = 1–2 settimane · L = 1 mese · XL = progetto separato

---

*Documento generato in sessione 4 — 2026-02-25. Aggiornare dopo ogni sessione di traduzione.*
