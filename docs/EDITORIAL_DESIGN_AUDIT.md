# TrustFamily Relocation — Audit visivo, strategia fotografica e coerenza design system

> **Team**: Sara (Editorial Design), Marco (Design System), Lucia (SEO & Performance)  
> **Contesto**: Next.js 16, React 19, Tailwind v4 · Blog/directory locale per famiglie expat a Lisbona/Portogallo  
> **Target**: Genitori expat/internazionali 28–42 anni · Lingue: EN, PT, DE, FR, NL, ES · Geo: Lisbona, Portogallo

---

## Contesto progetto (sintesi)

| Attributo | Valore |
|-----------|--------|
| **Tipo sito** | Directory locale + blog + funnel (lead magnet, quiz) |
| **Target** | Genitori expat che scelgono scuola e quartiere in Portogallo |
| **Design system** | Token in `globals.css` (OKLCH, ink/surface/brand/trust/warm); doc `design_system.md` parzialmente disallineata (palette “Me You and Lisbon” vs implementazione blu/teal) |
| **Max content width** | Doc: 1200px · Codice: `max-w-7xl` (1280px) e `max-w-4xl` (896px) su pagine articolo |

---

# Fase 1 — Audit visivo

## 1.1 Gerarchia visiva e flusso di lettura (Sara)

| Problema | Sezione | Dettaglio |
|----------|---------|-----------|
| **Hero senza immagine** | Hero | Solo titolo + sottotitolo + TrustBar. Nessun elemento visivo “hero” (foto, illustrazione). Il design system indica “Fotografia: luminosa, naturale, lifestyle” — assente. Flusso F-pattern si ferma al testo; nessun ancoraggio emotivo. |
| **Peso visivo uniforme** | Homepage | Sequenza: Hero (testo) → Pillars (3 card) → Quiz (box) → LeadMagnet (2 col) → Testimonials (6 card). Poche pause; nessuna immagine che rompa il ritmo. |
| **Titoli e scale** | Vari | Hero usa `text-4xl md:text-5xl lg:text-6xl` (valori Tailwind raw) invece di token `text-hero` dal design system. Sezione testimonials usa `section-heading` (coerente) ma Hero no. |
| **Ritmo densità/respiro** | Pillars, Quiz, LeadMagnet | Tre sezioni con `py-20` e `bg-surface-subtle` consecutive: alternanza solo colore di sfondo, nessuna variazione di “peso” (tutto medio-alto). Manca una sezione a “basso” peso (es. una strip con una sola frase o una foto full-bleed). |

**Soluzione proposta (sintesi)**  
- Introdurre un’immagine hero (o composizione testo + immagine) con aspect-ratio e posizionamento definiti (v. Fase 2).  
- Allineare tutti i titoli alla scala tipografica del design system (`text-hero`, `text-h1`, `text-h2`).  
- Alternare sezioni “heavy” (card grid, form) con sezioni “light” (una frase + foto, o strip con sfondo brand sottile).

**Token/variabili**  
- `text-hero` per H1 hero; `text-h1` per titolo pagina; `text-h2` / `section-heading` per titoli sezione.  
- Spacing sezioni: `space-16` / `space-20` (doc) invece di solo `py-20`.

**Priorità**: 🔴 Critico (hero e titoli) | 🟡 Importante (ritmo)

---

## 1.2 Design token non rispettati (Marco)

| Problema | Dove | Dettaglio |
|----------|------|-----------|
| **Valori tipografici hardcoded** | Hero, Pillars, LeadMagnet, best-private page | `text-4xl`, `text-5xl`, `text-6xl`, `text-2xl`, `text-[0.9375rem]` invece di token `text-hero`, `text-h1`, `text-h2`, `text-body-sm`. |
| **Colori fuori palette** | Testimonials, best-private page | `text-yellow-500`, `fill-yellow-500` per stelle; `bg-blue-100 text-blue-700`, `bg-red-100`, `bg-green-100`, `bg-slate-100`, `text-slate-700`, `border-slate-200`, `bg-slate-50`, `text-blue-900`, `text-blue-800` — nessuno mappato ai token (brand, trust, warm, ink, surface). |
| **Spacing arbitrario** | Vari | `py-16 md:py-28`, `gap-10 md:gap-16`, `mb-14`, `p-7`, `mb-12`, `gap-6` — non sempre riconducibili alla scala 4px (space-4, space-6, space-8, space-10, space-12, space-16, space-20). Es. `mb-14` = 56px non in scala. |
| **Radius** | Card, LeadMagnet, Quiz | Card usa `rounded-2xl`; design system ha `--radius-md` (10px), `--radius-lg` (14px). `globals.css` definisce `--radius-lg: var(--radius)` con `--radius: 0.75rem` (12px). Manca allineamento esplicito card → `radius-lg` o `radius-xl`. |
| **Ombre** | LeadMagnet | `shadow-[var(--shadow-hair)]`, `shadow-[var(--shadow-float)]` presenti in CSS; design_system.md cita `--shadow-sm`, `--shadow-md`, ecc. Due nomenclature (hair/float vs sm/md) — da unificare in doc e uso. |
| **Design system doc vs codice** | design_system.md | Doc: `--color-brand` #E8A0BF (rosa), Lato/Playfair. Codice: `--brand` blu (oklch 255), Outfit + Playfair. Doc non è single source of truth. |

**Soluzione proposta**  
- Sostituire tutte le classi tipografiche con token (es. `text-hero`, `text-h1`, `text-body-sm`).  
- Introdurre token semantici per “rating/star” (es. `--color-rating` o riuso `--color-warm`) e sostituire `yellow-500`.  
- Sostituire slate/blue/red/green con token: `surface-subtle`, `brand`, `brand-light`, `ink-*`, `border`.  
- Allineare spacing a scale: `space-*` (4, 6, 8, 10, 12, 16, 20). Es. `mb-14` → `mb-12` o `mb-16`.  
- Decidere una sola scala radius (doc o globals) e applicarla a Card, form container, Quiz box.  
- Aggiornare `design_system.md` ai token effettivi di `globals.css` (o viceversa) e dichiarare un’unica fonte.

**Token da usare**  
- Testo: `text-hero`, `text-h1`, `text-h2`, `text-h3`, `text-body`, `text-body-sm`, `text-caption`, `section-overline`.  
- Colori: `--color-*` / classi `text-ink-primary`, `bg-surface-subtle`, `bg-brand`, `bg-brand-light`, `border-border`.  
- Spacing: `p-4`→`space-4`, `gap-6`→`space-6`, `py-20`→`space-10`/`space-12` verticale.

**Priorità**: 🔴 Critico (colori fuori palette, tipografia) | 🟡 Importante (spacing, radius)

---

## 1.3 Ritmo visivo e respiro (Sara)

| Problema | Sezione | Dettaglio |
|----------|---------|-----------|
| **Troppa densità senza pausa** | Homepage | Da Pillars a Testimonials: 4 blocchi content-heavy. Manca una “pausa” (full-bleed image, strip con una citazione, o sezione con molto whitespace). |
| **Spazio vuoto senza scopo** | Hero | Area sotto il titolo/sottotitolo è solo padding; potrebbe essere “riempita” da un’immagine o da un pattern decorativo per bilanciare. |
| **Stesso pattern di sfondo** | Quiz, LeadMagnet | Entrambi `bg-surface-subtle`; subito dopo Testimonials su bianco. Due sezioni adiacenti con stesso sfondo riducono la percezione di “sezioni” distinte. |

**Soluzione proposta**  
- Inserire tra Quiz e LeadMagnet (o tra Pillars e Quiz) una sezione “respiro”: una sola frase + immagine o citazione (visual weight: basso).  
- Dare a Quiz o LeadMagnet sfondo `surface-ground` (o bianco) per contrasto con Pillars.  
- Hero: usare l’immagine hero per dare scopo allo spazio (v. Fase 2).

**Priorità**: 🟡 Importante

---

## 1.4 Impatto SEO/Performance (Lucia)

| Problema | Dettaglio |
|----------|-----------|
| **Nessuna immagine above-the-fold** | LCP è probabilmente testo o TrustBar; nessun `next/image` con priority per LCP. |
| **Mancanza immagini** | Hero, Pillars, Testimonials, SchoolsList, NeighborhoodsList non usano immagini. Solo `opengraph-image.tsx` e URL in JSON-LD. Per Core Web Vitals e engagement, un LCP immagine è consigliato. |
| **Structured data immagini** | Article/Organization usano `logo` URL; non c’è `ImageObject` per hero o card. Quando si aggiungeranno immagini, includere in schema dove appropriato. |

**Priorità**: 🔴 Critico (LCP) quando si introducono immagini | 🟢 Nice-to-have (schema ImageObject)

---

# Fase 2 — Strategia fotografica

Per ogni sezione: tipo immagine, dimensioni, aspect-ratio, posizionamento, trattamento tecnico, alt text.

---

## Homepage

### SEZIONE: Hero

| Aspetto | Raccomandazione |
|---------|------------------|
| **Tipo** | Hero full-width (o split: testo sinistra, immagine destra su desktop). |
| **Dimensioni / aspect-ratio** | 16:9 o 3:2. Su desktop suggerito 1440×810 o 1200×800. |
| **Posizionamento** | Opzione A: full-bleed dietro titolo (overlay scuro per leggibilità). Opzione B: grid 2 col, immagine a destra (Z-pattern: titolo → sottotitolo → immagine). |
| **Trattamento tecnico** | `next/image`: `sizes="(max-width: 768px) 100vw, 50vw"` (split) o `100vw` (full-bleed); `priority={true}`; `placeholder="blur"` con `blurDataURL`; `quality={80}`. LCP element = questa immagine. |
| **Alt text** | Es. "Family with children walking in Lisbon neighborhood" o "Expat family in Cascais near international school" — descrittivo, con riferimento a località/context. |

**Priorità**: 🔴 Critico (LCP + emotional design)

---

### SEZIONE: Pillars (3 card)

| Aspetto | Raccomandazione |
|---------|------------------|
| **Tipo** | Card thumbnail sopra o accanto al titolo (editoriale). |
| **Dimensioni / aspect-ratio** | 4:3 o 16:10. Es. 400×300 o 320×200. |
| **Posizionamento** | Sopra la barra accent (thin bar) in ogni card; oppure small thumbnail a sinistra del titolo. |
| **Trattamento tecnico** | `next/image`: `sizes="(max-width: 768px) 100vw, 33vw"`; `loading="lazy"`; `placeholder="blur"`; aspect-ratio esplicito (es. `aspect-[4/3]`) per evitare CLS. |
| **Alt text** | Per pillar Education: "International school building in Portugal". Living: "Family-friendly street in Lisbon neighborhood". Soft landing: "Relocation guide and checklist". Breve, differenziato. |

**Priorità**: 🟡 Importante

---

### SEZIONE: Quiz

| Aspetto | Raccomandazione |
|---------|------------------|
| **Tipo** | Opzionale: piccola illustrazione o icona decorativa in header sezione (non nel box). |
| **Dimensioni** | Se usata: 80×80 o 120×120 (1:1). |
| **Trattamento** | Lazy; non LCP. |
| **Alt** | Es. "School finder quiz" o lasciare decorativa (alt="" se puramente illustrativa). |

**Priorità**: 🟢 Nice-to-have

---

### SEZIONE: LeadMagnet

| Aspetto | Raccomandazione |
|---------|------------------|
| **Tipo** | Immagine di supporto nella colonna sinistra (benefits): es. genitore con figlio o documento/checklist. |
| **Dimensioni / aspect-ratio** | 4:3 o 1:1. Es. 400×300. |
| **Posizionamento** | Tra benefits e trust badge, o sopra il blocco benefits. |
| **Trattamento** | `loading="lazy"`; `sizes="(max-width: 768px) 100vw, 50vw"`; aspect-ratio per CLS. |
| **Alt** | "Expat family downloading relocation guide" o simile, con keyword naturale. |

**Priorità**: 🟡 Importante

---

### SEZIONE: Testimonials

| Aspetto | Raccomandazione |
|---------|------------------|
| **Tipo** | Avatar per ogni testimonial (foto o iniziali). |
| **Dimensioni** | 48×48 o 56×56 (1:1). |
| **Posizionamento** | In CardHeader, a sinistra di nome/ruolo. |
| **Trattamento** | `next/image` con `width={48}` `height={48}`; `loading="lazy"`; `className="rounded-full"` (radius-full). |
| **Alt** | Nome della persona: "Caroline H." — accessibilità e naturale. |

**Priorità**: 🟡 Importante (trust + umanizzazione)

---

## Pagine directory (best-private-schools, top-neighborhoods)

### Lista scuole / quartieri (SchoolsList, NeighborhoodsList)

| Aspetto | Raccomandazione |
|---------|------------------|
| **Tipo** | Thumbnail per card: edificio scuola o skyline/paesaggio quartiere. |
| **Dimensioni / aspect-ratio** | 16:9 o 4:3 per card. Es. 400×225. |
| **Posizionamento** | Top della card (sopra CardHeader), come nelle Card Post del design system. |
| **Trattamento** | `sizes="(max-width: 768px) 100vw, 50vw"` (schools 2 col) o `33vw` (neighborhoods 3 col); lazy; aspect-ratio esplicito; `placeholder="blur"`. |
| **Alt** | "[Nome scuola], [località]" / "[Nome quartiere], Lisbon area" — descrittivo + geo. |

**Priorità**: 🟡 Importante (engagement + GEO)

---

## Pagine articolo (blog, relocation-guide)

| Aspetto | Raccomandazione |
|---------|------------------|
| **Tipo** | Hero articolo (sopra H1) + eventuali inline per sezioni. |
| **Hero** | 16:9, full-width; `priority` se above-the-fold; alt con titolo/tema articolo. |
| **Inline** | 4:3 o 16:9; lazy; alt descrittivo per contesto. |
| **Open Graph** | `opengraph-image` già presente; per articoli singoli considerare `opengraph-image` dinamico per slug. |

**Priorità**: 🟡 Importante (blog) | 🟢 (inline)

---

# Fase 3 — Composizione pagina (wireframe e comportamento)

## Homepage — proposta sezione per sezione

```
SEZIONE: Hero
├── Visual weight: ALTO
├── Componente: Hero (aggiornato con immagine)
├── Token: text-hero (H1), text-body/section-body (subtitle), bg-background; spacing: space-20 verticale, space-16 gap grid
├── Immagine: Hero 16:9 o split 50% — right; priority, blur placeholder
├── Breakpoint: Mobile: stack titolo → sottotitolo → immagine (o immagine sotto); Desktop: grid 2 col, immagine destra
└── Note SEO: LCP = immagine hero; H1 unico in DOM (già ok)

SEZIONE: TrustBar
├── Visual weight: BASSO
├── Componente: TrustBar (invariato)
├── Token: border-border, text-ink-secondary, text-sm
├── Immagine: nessuna
└── Breakpoint: wrap su mobile, riga su desktop

SEZIONE: Pillars
├── Visual weight: MEDIO
├── Componente: PillarsCardsSection (con thumbnail opzionale)
├── Token: bg-surface-subtle, section-heading se titolo sezione; card: radius-lg, shadow-lift/float
├── Immagine: Card thumbnail 4:3 sopra accent bar
├── Breakpoint: 1 col mobile, 3 col md+
└── Note SEO: link interni con anchor descriptive

SEZIONE: Quiz
├── Visual weight: MEDIO
├── Componente: QuizSection
├── Token: bg-surface-ground (o white) per contrasto con Pillars; card radius-lg, shadow-float
├── Immagine: opzionale badge/icona in header
├── Breakpoint: max-w-3xl centrato
└── Note SEO: section id="quiz" per deep link

SEZIONE: [Respiro — da aggiungere]
├── Visual weight: BASSO
├── Componente: Strip con citazione o una frase + immagine decorativa
├── Token: py-12 o space-12, text-h2 o quote style
├── Immagine: opzionale 1:1 o full-bleed sfumata
└── Breakpoint: full width

SEZIONE: LeadMagnet
├── Visual weight: ALTO
├── Componente: LeadMagnetSection
├── Token: bg-surface-subtle; form card: radius-xl, shadow-float, border-border
├── Immagine: colonna sinistra, 4:3
├── Breakpoint: stack mobile (copy sopra, form sotto)
└── Note SEO: form id per analytics; heading H2 unico

SEZIONE: Testimonials
├── Visual weight: MEDIO
├── Componente: Testimonials
├── Token: section-overline, section-heading, section-body; card come sopra; stelle: color token (es. warm o rating)
├── Immagine: Avatar 1:1 per testimonial
├── Breakpoint: 1 col mobile, 2 col md, 3 col lg
└── Note SEO: eventuale schema Review/ItemList se si espande
```

---

## Pagina tipo “Best private schools” (articolo + lista)

- **Header**: Breadcrumbs, meta (data, numero scuole), H1, intro — token `text-h1`, `text-body`, `space-10` tra blocchi.
- **TOC**: nav con `bg-surface-subtle`, `radius-lg`; link con `text-brand`, `hover:text-brand-hover`.
- **Sezioni articolo**: `article-heading` per H2; body `text-ink-secondary`; tabelle e card con `border-border`, `bg-surface-subtle`/`bg-brand-light` dove previsto; nessun `slate-*`/`blue-*` raw.
- **School cards**: come SchoolsList; aggiungere immagine in cima a ogni card con aspect-ratio e alt geo.
- **FAQ**: container con token surface; titolo H2; bordi `border-border`.
- **Related**: grid 3 col; card con radius e shadow token.
- **Breakpoint**: container `max-w-4xl` o `max-w-5xl` allineato al design system (definire 1200px vs 1280px in un solo posto).

---

# Fase 4 — Coerenza design system

## 4.1 Mapping token → componenti

| Componente / contesto | Regola |
|-----------------------|--------|
| **Background card** | Sempre `bg-card` (→ `var(--surface-card)` / `var(--card)`). Mai hex o `bg-white` hardcoded. |
| **Background sezione alternata** | `bg-surface-subtle`. Sezione “chiara” = `bg-background` / `bg-surface-ground`. |
| **Testo titolo pagina** | `text-h1` (o utility che mappa a `--text-h1`). Mai `text-4xl`/`text-5xl` senza token. |
| **Testo titolo sezione** | `section-heading` o `text-h2`. |
| **Body / descrizioni** | `text-body` o `text-body-sm`; colore `text-ink-secondary` o `text-ink-primary`. |
| **Label / meta** | `text-caption` o `text-overline`; colore `text-ink-muted`. |
| **Bordi** | `border-border`. Divisori sottili `border-border-light` se definito. |
| **CTA primario** | `bg-brand`, `hover:bg-brand-hover`; testo `text-primary-foreground` (o bianco token). |
| **Accent bar (pillars)** | `bg-brand`, `bg-trust`, `bg-warm` — ok; evitare altre classi colore non token. |
| **Stelle rating** | Nuovo token `--color-rating` (es. = `--color-warm`) o riuso `text-warm`; rimuovere `text-yellow-500`. |
| **Tabelle / FAQ** | Header: `bg-surface-subtle`, `text-ink-primary`; celle: `text-ink-secondary`, `border-border`. |

---

## 4.2 Regole di spacing

| Contesto | Token / valore | Esempio |
|----------|-----------------|--------|
| Gap tra elementi inline (icona + testo) | space-2 | `gap-2` |
| Padding interno card piccolo | space-3 / space-4 | `p-3`, `p-4` |
| Padding card standard | space-5 / space-6 | CardContent `p-6` |
| Gap tra card / blocchi in grid | space-6 / space-8 | `gap-6`, `gap-8` |
| Margine tra blocchi in sezione | space-8 / space-10 | `mb-8`, `space-y-10` |
| Padding verticale sezione | space-10 / space-12 / space-16 | `py-10`, `py-12`, `py-16` |
| Separazione tra sezioni pagina | space-16 / space-20 | `py-16`, `py-20` |
| Hero vertical padding | space-20 | `py-20` (evitare `py-28` se non in scala; altrimenti definire space-24) |

**Regola**: non usare valori che non siano nella scala (es. `mb-14`, `p-7`) salvo eccezione documentata.

---

## 4.3 Regole tipografiche

| Contenuto | Font | Size token | Weight | Colore |
|-----------|------|------------|--------|--------|
| Hero H1 | serif | text-hero | 700 | ink-primary |
| Titolo pagina | serif | text-h1 | 700 | ink-primary |
| Titolo sezione | serif | text-h2 / section-heading | 600 | ink-primary |
| Titolo card / post | serif o sans | text-h3 | 600 | ink-primary |
| Sottotitolo | sans | text-h4 | 600 | ink-primary |
| Body | sans | text-body | 400 | ink-primary / ink-secondary |
| Body secondario | sans | text-body-sm | 400 | ink-secondary |
| Label, meta, caption | sans | text-caption / text-overline | 500/600 | ink-muted |
| Overline sezione | sans | text-overline | 600, uppercase | brand |

---

## 4.4 Regole colore

| Uso | Token | Note |
|-----|--------|------|
| Brand (CTA, link primari) | brand, brand-hover | Non usare blue-600/slate per “primario”. |
| Sfondo soft brand | brand-light, brand-50 | Callout, badge, chip. |
| Trust / successo | trust, trust-light | Check, badge “verified”. |
| Warm / attenzione soft | warm, warm-light | Commute, avvisi non critici. |
| Testo | ink-primary, ink-secondary, ink-muted | Mai slate-700/800 per body. |
| Superfici | surface-ground, surface-subtle, surface-card | Non `bg-gray-50` o `bg-white` diretto. |
| Errori / distruttivo | destructive (o error dal doc) | Bottoni elimina, messaggi errore. |
| Rating (stelle) | rating o warm | Sostituire yellow-500. |

---

## 4.5 Allineamento design_system.md e globals.css

- **Priorità**: 🔴 Critico per manutenzione.
- **Problema**: design_system.md descrive palette rosa “Me You and Lisbon” e Lato; codice usa blu/teal/Outfit e token in OKLCH in `globals.css`.
- **Soluzione**: (1) Aggiornare design_system.md con i token effettivi di `globals.css` (ink, surface, brand, trust, warm, radius, shadow-lift/float/hair, font Outfit + Playfair). Oppure (2) dichiarare in doc che “riferimento implementazione = globals.css” e rimuovere tabelle colore/font duplicate. In ogni caso, una sola fonte per colori, font e scale.

---

# Riepilogo priorità

| Priorità | Azioni |
|----------|--------|
| 🔴 Critico | Hero con immagine (LCP); allineare tipografia a token; rimuovere colori non-token (slate, blue, yellow); unificare doc/codice design system. |
| 🟡 Importante | Spacing da scala 4px; radius card/form; thumbnail Pillars e LeadMagnet; avatar Testimonials; immagini card Schools/Neighborhoods; sezione “respiro” homepage. |
| 🟢 Nice-to-have | Illustrazione Quiz; schema Review per testimonials; opengraph per articoli singoli. |

---

*Documento generato dall’audit congiunto Editorial Design, Design System e SEO/Performance. Per implementazione incrementale, partire da Critici poi Importanti.*
