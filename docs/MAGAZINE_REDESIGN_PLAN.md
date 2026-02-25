# TrustFamily — Piano Redesign Magazine Layout

> **STATO (2026-02-24):**
> - **Homepage** → ✅ COMPLETATA (Hero, PillarsCardsSection, Testimonials, page.tsx come `<article>`)
> - **Pillar pages** → ⏸ DECISIONE POST-LANCIO — funzionali e SEO-corrette, redesign non bloccante per go-live
>
> Questo documento è operativo solo dopo il lancio. Per priorità pre-lancio → `LAUNCH_CHECKLIST.md`

**Sessione di avvio:** 2026-02-24
**Branch:** `testing-languages-and-routing`
**Scope:** Homepage + 3 Pillar pages (relocation-guide, best-private-schools, top-neighborhoods)

> **Cognition trace** — questo documento è la memoria operativa tra sessioni.
> Aggiornare dopo ogni sessione: spuntare le voci completate, aggiungere note.
> Riferimento visivo: magazine digitale editoriale (Monocle, Kinfolk, The Atlantic) — **non landing page SaaS**.

---

## Principi guida (non negoziabili)

1. **Flusso narrativo continuo** — il contenuto scorre come un articolo, non come sezioni impilate
2. **Immagini integrate nel testo** — float left/right, non banner divisori full-width
3. **Nessun "box culture"** — le informazioni non devono sempre stare in un bordered card
4. **Asimmetrie controllate** — un elemento principale + elementi secondari più piccoli (non 3 card identiche)
5. **Ritmo tipografico** — variazione di peso, dimensione, interlinea tra blocchi
6. **Zero sensazione SaaS** — no feature grids, no CTA boxes centrati con padding simmetrico
7. **SEO/GEO intatto** — nessun elemento SEO-critico viene rimosso o spostato (Key Takeaways, FAQ, JSON-LD, hreflang)

---

## Invarianti SEO/GEO (NON toccare)

| Elemento | Dove | Perché |
|----------|------|--------|
| `id="key-takeaways"` | Tutte le pillar pages | Speakable schema CSS selector |
| `id="faq"` | Tutte le pillar pages | Speakable schema CSS selector |
| `id="main-content"` | layout.tsx | Skip nav WCAG |
| JSON-LD (tutti gli schema) | In `<head>` via `<JsonLd>` | Mai spostare, mai modificare struttura |
| H1 unico per pagina | Ovunque | SEO fondamentale |
| `next/image` con `priority` sull'immagine hero/LCP | Hero, pillar pages | Core Web Vitals |
| Alt text descrittivi con geo-reference | Tutte le immagini | SEO immagini + GEO |
| Breadcrumbs con BreadcrumbList JSON-LD | Tutte le pillar pages | Structured data navigazione |
| Canonical + hreflang (6 locale + x-default) | Tutte le pagine | i18n SEO |

---

## HOMEPAGE — Piano dettagliato

### Struttura attuale (da sostituire)
```
Hero (split 50/50)
→ PillarsCardsSection (3 card identiche in grid md:3)
→ QuizSection (sezione isolata)
→ Respiro image (aspect-21/9 full-width)
→ LeadMagnetSection
→ Testimonials (card grid)
```

### Struttura target (magazine)
```
Hero (editorial opener, asimmetrico)
→ PillarsSpread (cover story + 2 sidebar)
→ QuizInterlude (editorial pull quote + CTA)
→ LeadMagnetSection (lettera editoriale)
→ Testimonials (pull quotes, non card)
```

### 1. Hero — "Editorial Opener"

**Cambiamenti:**
- **Immagine:** non più in un `rounded-xl` box. L'immagine deve sforare verso destra (negative margin right, o overflow-hidden sul container padre rimosso). Sensazione di foto che "esce" dalla griglia.
- **Titolo:** mantiene `font-serif text-hero` ma il copy deve essere più editoriale (da definire)
- **Sottotitolo:** aggiungere un **overline** sopra all'H1 (`section-overline` in small caps): tipo "The independent guide for relocating families — Portugal 2026"
- **Aggiungere deck:** una riga italic serif tra il sottotitolo e la TrustBar, tipo "Verified by 200+ families who have made the move."
- **TrustBar:** ridurla a una byline tipografica sottile, non un componente con icone e padding generoso
- **Nessun CTA button** nell'hero — l'invito narrativo arriva dal contenuto

**File da modificare:** `components/features/Hero.tsx`

**Vincoli SEO:**
- H1 rimane unico e con le keyword (gestito via i18n)
- Immagine: `priority={true}` rimane (LCP element)
- Alt text rimane geo-referenziato

**Checklist Hero:**
- [x] Aggiungere overline sopra H1 — `t("overline")` in `section-overline`
- [x] Rimuovere `border-l border-border pl-8` dal subtitle — prosa libera
- [x] Modificare immagine: rimosso `rounded-xl`, portrait `aspect-[4/5]`, bleed destra `-mr-6 lg:-mr-12`
- [x] Grid asimmetrico: `grid-cols-[1fr_42%]` invece di 50/50
- [x] TrustBar separata sotto con `border-t` — non embedded nel grid
- [x] i18n: aggiunto `Hero.overline` in tutti e 6 i locale

---

### 2. PillarsCardsSection — "Editorial Feature Spread"

**Layout target:**
```
┌────────────────────────────────────────────────────────┐
│  OVERLINE + H2 (editorial intro — rimane)             │
├──────────────────────────┬─────────────────────────────┤
│                          │  [img 16:9 piccola]         │
│  [IMMAGINE DOMINANTE     │  INTERNATIONAL SCHOOLS       │
│   Relocation Guide,      │  "The complete comparison"  │
│   55-60% larghezza,      │  → Read the guide           │
│   altezza piena,         ├─────────────────────────────┤
│   no border/radius]      │  [img 16:9 piccola]         │
│                          │  TOP NEIGHBORHOODS           │
│  RELOCATION GUIDE        │  "School-first approach"    │
│  [2-3 righe di teaser    │  → Read the guide           │
│   editoriale, non solo   │                             │
│   descrizione]           │                             │
│                          │                             │
│  → Read the cover story  │                             │
└──────────────────────────┴─────────────────────────────┘
```

**Cambiamenti:**
- Rimuovere `grid grid-cols-1 md:grid-cols-3 gap-8` (3 card identiche)
- Sostituire con layout a 2 colonne: `grid grid-cols-1 md:grid-cols-[3fr_2fr]`
- Card sinistra (cover story — Relocation Guide): immagine senza border-radius, titolo grande, 2-3 righe di teaser narrativo (non solo `t(descKey)`), link in stile editoriale
- Colonna destra: 2 card impilate (Schools + Neighborhoods) — più compatte, immagine piccola, titolo + 1 riga + link
- Rimuovere accent bar colorata — gerarchia via dimensione tipografica
- Link: `"Read the guide →"` non `<Button>` o card cliccabile intera

**File da modificare:** `components/features/PillarsCardsSection.tsx`

**Vincoli SEO:**
- Link interni ai 3 pillar rimangono (anchor text descrittivi)
- H2 della sezione rimane (keyword per SEO)
- Le 3 pagine pillar devono essere linkate — non ridurre a 2

**Checklist PillarsSection:**
- [x] Grid layout: `grid-cols-[3fr_2fr]` su `lg`, 1 col su mobile
- [x] Cover story sinistra: immagine `aspect-[4/3]` senza radius, overline + h2 serif + teaser narrativo
- [x] Sidebar destra: 2 card con `border-l border-border pl-10`, `hr` divisore
- [x] Rimossa accent bar (sostituita da overline tipografica)
- [x] Rimossi `<Card>` shadcn — markup semantico puro
- [x] Link editoriali: `inline-flex` con gap animato su hover
- [x] i18n: aggiunti `Pillars.softLandingTeaser` e `Pillars.readGuide` in tutti e 6 i locale

---

### 3. QuizSection — "Editorial Interlude"

**Cambiamento:**
- Aggiungere sopra alla `<QuizSection>` un wrapper con:
  - Pull quote sinistra (40%): citazione editoriale da TrustFamily Research
  - CTA narrativa destra (60%): copy che introduce il quiz come un editoriale, non come un prodotto
- Oppure (più semplice): aggiungere solo un editorial header sopra alla QuizSection esistente con overline + deck

**File da modificare:** `app/[locale]/page.tsx` (wrapper) o creare componente wrapper

**Checklist Quiz:**
- [ ] Aggiungere editorial header sopra QuizSection
- [ ] Valutare se il pull quote è fattibile senza toccare QuizSection.tsx

---

### 4. Testimonials — "Pull Quotes"

**Cambiamento:**
- Sostituire il grid di card con 3 pull quotes in stile editoriale:
  - Grande virgolette di apertura (decorative, serif, `text-6xl text-brand/20`)
  - Testo citazione in `font-serif italic text-xl`
  - Attribuzione: `— Nome, città, anno` in `text-sm text-ink-muted`
- Layout: alternati (1 col full, poi 2 col affiancate, poi 1 col full) — o semplicemente 3 in colonna con spazio generoso

**File da modificare:** `components/features/Testimonials.tsx`

**Vincoli SEO:** Se si aggiunge Review schema in futuro, il markup semantico deve supportarlo

**Checklist Testimonials:**
- [x] Rimosse `<Card>` e stelle rating
- [x] 3 featured: `<blockquote>` grid 2-col (attribution sx, quote grande serif italic dx)
- [x] 3 supporting: grid 3-col compatto, corpo più piccolo
- [x] `border-t` su section e su ogni featured quote per ritmo verticale
- [x] HTML semantico: `<blockquote>`, `<footer>` per attribution

---

## PILLAR PAGES — Piano condiviso

Tutte e 3 le pillar pages (relocation-guide, best-private-schools, top-neighborhoods) condividono lo stesso pattern di redesign.

### Pattern comune — modifiche su ogni pillar page

#### A. Article Header — "Editorial Opener"
- **Aggiungere OVERLINE** sopra all'H1: es. `"Family Intelligence · Relocation"` in `section-overline`
- **Aggiungere DECK** dopo l'H1: una riga italic serif che non sia uguale al meta-description — è la promessa editoriale dell'articolo
- Byline (data · read time · autore): aggiungere un `<hr>` sottile sopra, dare più respiro
- Drop cap sul primo paragrafo del corpo: `first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-2 first-letter:mt-1`

#### B. Key Takeaways — da box full-width a sidebar float (desktop)
- Su desktop (md+): float right, 40% larghezza, il primo paragrafo scorre accanto
- Su mobile: rimane inline full-width
- CSS: usare `md:float-right md:w-[40%] md:ml-8 mb-6`
- Mantenere `id="key-takeaways"` per Speakable schema

#### C. TOC — Sidebar sticky (desktop)
- Attuale: nav box inline, occupa tutta la colonna
- Target: su desktop, sidebar sticky a sinistra, corpo articolo a destra
- Implementazione: container wrapper `grid grid-cols-[200px_1fr] gap-12 items-start` con TOC `sticky top-24 self-start`
- Su mobile: `<details>` collassabile orizzontale
- **Impatto SEO:** la sidebar TOC migliora la navigazione interna e il tempo sulla pagina (segnale SEO indiretto)

#### D. Immagini — da banner divisori a floated editorial
- Rimuovere `div.relative.aspect-21/9` usate come "respiro divisori"
- Sostituire con `<figure>` con immagine floated (50-60% width) + `<figcaption>` italic
- Almeno 1 immagine per sezione principale — integrata nel testo, non sopra/sotto
- Pattern: `float-right md:w-[50%] ml-8 mb-4` o `float-left md:w-[50%] mr-8 mb-4`

#### E. Pull-stat moments (dati importanti)
- Per statistiche chiave (8%, €4.650/mo, 300+ giorni di sole):
  ```
  <div class="text-7xl font-serif text-brand/30 leading-none">8%</div>
  <hr class="border-brand/20 my-2">
  <p class="text-sm text-ink-secondary">Acceptance rate at St. Julian's...</p>
  ```
- Non boxed, non bordered — il numero da solo è l'elemento visivo

#### F. Section dividers — tipografici, non immagini
- Sostituire le immagini divisore aspect-21/9 con un elemento tipografico:
  - Una `<hr>` con ornamento centrale
  - O una pull quote estratta dal paragrafo successivo

---

## PILLAR PAGE 1 — Relocation Guide

**File:** `app/[locale]/relocation-guide/page.tsx`

**Modifiche specifiche:**
- Timeline (sezione 9): da "cerchio + bordered card" a "prosa con titolo mese grande"
  - `"MONTHS 12–10"` come overline grande, poi titolo, poi testo in prosa (non bullet list)
- Visa cards (sezione 2): da 4 bordered cards identiche ad alternanza sinistra/destra con visual weight diverso
- Stats cards "Why Portugal" (sezione 1): da 3 mini-cards identiche a pull-stat moments inline nel testo

**Checklist:**
- [ ] Overline + Deck all'header
- [ ] Key Takeaways float right desktop
- [ ] TOC sidebar sticky desktop
- [ ] Drop cap primo paragrafo
- [ ] Timeline → prosa con mese tipografico
- [ ] Visa cards → alternanza L/R
- [ ] Stats Why Portugal → pull-stat moments
- [ ] Immagini respiro → float figures

---

## PILLAR PAGE 2 — Best International Schools

**File:** `app/[locale]/best-private-and-public-international-schools-portugal-2026/page.tsx`

**Modifiche specifiche:**
- School comparison cards (2-col grid): trattamento "primary + secondary listing"
  - St. Julian's: trattamento editoriale completo (immagine float, testo profilo, pull-stat "8%")
  - Le altre 3: listing compatto con dati chiave
- Fees table: rimane ma con stile newspaper (remove thead background, solo ruled lines)
- Acceptance rate stat: pull-stat moment isolato

**Checklist:**
- [ ] Overline + Deck all'header
- [ ] Key Takeaways float right desktop
- [ ] TOC sidebar sticky desktop
- [ ] Drop cap primo paragrafo
- [ ] St. Julian's editorial profile
- [ ] School listing secondario compatto
- [ ] Fees table → newspaper style
- [ ] Pull-stat acceptance rate

---

## PILLAR PAGE 3 — Top Neighborhoods

**File:** `app/[locale]/top-neighborhoods/page.tsx`

**Modifiche specifiche:**
- Neighborhood sections (Coastal, Sintra, Lisbon): ogni area ottiene una "apertura di capitolo" con immagine float e pull quote
- Commute data: rimane ma integrata nel testo, non in bordered cards

**Checklist:**
- [ ] Overline + Deck all'header
- [ ] Key Takeaways float right desktop
- [ ] TOC sidebar sticky desktop
- [ ] Drop cap primo paragrafo
- [ ] Chapter openers per area geografica
- [ ] Commute data integrata nel testo

---

## Ordine di esecuzione raccomandato

| Fase | Pagina/Componente | Priorità | SEO impact |
|------|-------------------|----------|------------|
| 1 | `Hero.tsx` — overline, deck, immagine libera | 🔴 Alta | LCP, H1 |
| 2 | `PillarsCardsSection.tsx` — layout asimmetrico | 🔴 Alta | Link interni |
| 3 | `Testimonials.tsx` — pull quotes | 🟡 Media | Review schema futuro |
| 4 | `app/page.tsx` — QuizSection editorial wrapper | 🟡 Media | Engagement |
| 5 | `relocation-guide/page.tsx` — pillar pattern completo | 🔴 Alta | GEO/AI Overview |
| 6 | `best-private-schools/page.tsx` — pillar pattern | 🔴 Alta | GEO/AI Overview |
| 7 | `top-neighborhoods/page.tsx` — pillar pattern | 🔴 Alta | GEO/AI Overview |

---

## Note tecniche importanti

### Float images e CSS
- `float-left` / `float-right` con Tailwind richiedono `clearfix` sul parent o `flow-root`
- Usare `overflow-auto` o `after:content-[''] after:block after:clear-both` sul container paragrafo
- Alternativa moderna: usare CSS `shape-outside` per flow non rettangolare (solo su immagini con bg trasparente)

### Sidebar TOC sticky
- Il container pagina deve diventare `grid grid-cols-[220px_1fr]` invece di `max-w-4xl mx-auto`
- Su mobile: TOC come `<details>` con `<summary>` "In this guide"
- **Attenzione:** verificare che i JSON-LD schema rimangano nel `<head>` (via `<JsonLd>`) — non impattati dal layout

### i18n e next-intl
- Tutto il copy nuovo (overline, deck, pull quotes) deve passare per i18n se è in Hero/Pillars (componenti shared)
- Le pillar pages per ora sono in inglese hardcoded — ok continuare così
- Se si aggiungono string i18n, aggiungerle a TUTTI e 6 i locale files

### Tailwind e design tokens
- Continuare a usare SOLO token del design system (ink-*, surface-*, brand, trust, warm)
- Mai usare slate-*, blue-*, raw hex — vedi EDITORIAL_AUDIT_CHECKLIST.md
- Per le pull-stat: usare `text-brand/30` per il numero decorativo (opacity tramite Tailwind)

---

## Aggiornamenti di sessione

### Sessione 2026-02-24 — Homepage completata

**File modificati:**
- `components/features/Hero.tsx` — overline, grid asimmetrico 1fr/42%, immagine portrait senza radius, bleed destra, TrustBar separata sotto border-t
- `components/features/PillarsCardsSection.tsx` — layout cover story (3fr) + sidebar (2fr), rimossi Card/shadcn, immagini senza radius, overline tipografica, link editoriali animati
- `components/features/Testimonials.tsx` — pull quotes serif italic, 3 featured (grid 2-col) + 3 supporting (grid 3-col), rimossi Card e stelle
- `app/[locale]/page.tsx` — QuizSection avvolta in `bg-surface-subtle`, fix `aspect-[21/9]`
- `messages/en.json` + `pt.json` + `de.json` + `fr.json` + `nl.json` + `es.json` — aggiunti: `Hero.overline`, `Pillars.softLandingTeaser`, `Pillars.readGuide`

**HomepageEditorial aggiunto (sessione 2026-02-24):**
- [x] Creato `components/features/HomepageEditorial.tsx` — nuovo componente Server
- [x] 3 sezioni editoriali: "Why Portugal", "School-first principle", "Independent intelligence"
- [x] Layout 2-col: body `max-w-2xl` sx + sidebar sticky con pull-stats (72px serif, `text-brand/20`) dx
- [x] Pull-stats: #7 safety rank, 8% acceptance rate, 200+ families
- [x] Pull quote: "Choose the school first" — principio di ricerca TrustFamily
- [x] `id` su sezione e sui 3 H2 per deep linking e GEO extractability
- [x] Integrato in `app/[locale]/page.tsx` tra PillarsCardsSection e QuizSection

**SEO/GEO della sezione:**
- Primary keyword: "relocating to Portugal with a family" — primo paragrafo + H2
- Entità nominate: St. Julian's, TASIS, CAISL, United Lisbon, Cascais, Sintra, Parque das Nações, D7, D8, AIMA, Global Peace Index
- Ogni paragrafo è self-contained e citable da AI engines
- Nessun tono commerciale — voce editoriale autoriale

**Architettura articolo unico completata (sessione 2026-02-24):**
- [x] `page.tsx` — riscritto come singolo `<article>`. Una sola sezione semantica, prosa continua che introduce ogni componente
- [x] `Hero.tsx` — rimosso wrapper `<section>` e `max-w-7xl`. Diventa `<header>` embedded nell'articolo
- [x] `PillarsCardsSection.tsx` — rimosso wrapper `<section>` e `max-w-7xl`. Embedded nella prosa
- [x] `Testimonials.tsx` — rimosso wrapper `<section>` + header interno. Solo blockquote, il titolo è nella prosa dell'articolo
- [x] `HomepageEditorial.tsx` — ELIMINATO. La prosa va inline in `page.tsx`
- [x] TypeScript check: 0 errori nuovi (1 pre-esistente: school-finder/#quiz)

**Struttura prosa dell'articolo:**
1. `<header>` → Hero (i18n: overline, H1, subtitle) + TrustBar
2. **PROSE 1** — "Why Portugal has become the first choice for relocating families" + pull-stat sidebar (#7, 300+)
3. **PILLAR SPREAD** — PillarsCardsSection embedded (i18n'd intro + cover story + sidebar)
4. **PROSE 2** — "The school decision is the relocation decision" + pull-stat inline (8%) + sidebar (200+, pull quote)
5. **QUIZ** — editorial bridge paragraph + QuizSection component
6. **RESPIRO** — immagine full-bleed
7. **PROSE 3** — "What independent intelligence looks like in practice" + transizione editoriale al lead magnet
8. **LEAD MAGNET** — LeadMagnetSection component
9. **TESTIMONIALS** — titolo nella prosa dell'articolo + Testimonials component (pull quotes)

**Prossimi step (pillar pages):**
- [ ] `relocation-guide/page.tsx` — overline + deck, Key Takeaways float, sidebar TOC, drop cap, timeline prosa
- [ ] `best-private-schools/page.tsx` — stessi pattern
- [ ] `top-neighborhoods/page.tsx` — stessi pattern
