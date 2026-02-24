# Checklist avanzamento — Audit editoriale TrustFamily

> Riferimento: **EDITORIAL_DESIGN_AUDIT.md** (fonte unica di verità).
> Procedere a fasi; spuntare man mano.
> Ultimo audit codice: 2026-02-23 — branch `testing-languages-and-routing`
> Ultima sessione fix: 2026-02-23 — completati tutti i 🔴 Critici

---

## Fase 1 — Audit visivo e critici

| Stato | Azione | Note |
|-------|--------|------|
| ✅ | **Hero**: immagine LCP (next/image, priority, 16:9, placeholder blur) | `Hero.tsx` — split layout, `priority`, `blurDataURL` |
| ✅ | **Hero**: rimosso `unoptimized={true}` da `Hero.tsx` | Fix 2026-02-23 |
| ✅ | **Hero**: tipografia da token (text-hero, section-body) | `Hero.tsx` — `font-serif text-hero`, `section-body` |
| ✅ | **Hero**: spacing da scala (py-20, gap-8/gap-10, mb-10/mb-12) | `Hero.tsx` — `py-20`, `gap-8 md:gap-10`, `mb-10 md:mb-12` |
| ✅ | **Token tipografia**: definiti in globals.css (--ds-text-* + @theme) e usati in Hero, Pillars, LeadMagnet, Testimonials, Header, TrustBar | Tutti i componenti feature usano token corretti |
| ✅ | **Colori non-token nelle pagine pillar**: rimossi tutti `slate-*`, `blue-*`, `red-*`, `green-*`, `teal-*` da best-private e top-neighborhoods | Fix 2026-02-23 — vedere tabella dettaglio sotto |
| ✅ | **Colori non-token in form.tsx**: `text-red-500` → `text-destructive` | Fix 2026-02-23 |
| ✅ | **Spacing**: `mb-14` → `mb-12` in `PillarsCardsSection.tsx` | Fix 2026-02-23 |
| ✅ | **H1 pagine pillar**: `text-4xl md:text-5xl` → `text-h1` | Fix 2026-02-23 — best-private e top-neighborhoods |
| ✅ | **Doc di riferimento**: **EDITORIAL_DESIGN_AUDIT.md** (audit e strategia). Fonte implementazione = **globals.css**. design_system.md non esiste. | |

### Dettaglio colori non-token — ✅ tutti corretti il 2026-02-23 (storico)

| File | Elemento | Classe attuale | Token corretto |
|------|----------|----------------|----------------|
| `best-private/page.tsx:218-232` | Tag curriculum British | `bg-blue-100 text-blue-700` | `bg-brand-light text-brand` |
| `best-private/page.tsx:218-232` | Tag curriculum American | `bg-red-100 text-red-700` | `bg-warm-light text-warm` |
| `best-private/page.tsx:218-232` | Tag curriculum IB | `bg-green-100 text-green-700` | `bg-trust-light text-trust` |
| `best-private/page.tsx:235` | Border card curriculum | `border-slate-200` | `border-border` |
| `best-private/page.tsx:275-278` | Thead tabella fees | `bg-slate-100 text-slate-700` | `bg-surface-subtle text-ink-primary` |
| `best-private/page.tsx:289` | Tbody row tabella | `bg-white hover:bg-slate-50` | `bg-card hover:bg-surface-subtle` |
| `best-private/page.tsx:291-294` | Celle tabella | `text-slate-800`, `text-slate-600`, `text-slate-700` | `text-ink-primary`, `text-ink-secondary` |
| `best-private/page.tsx:282` | Divide tabella | `divide-slate-100` | `divide-border` |
| `best-private/page.tsx:329-333` | Card admissions — titolo | `text-slate-900` | `text-ink-primary` |
| `best-private/page.tsx:330` | Card admissions — meta | `text-slate-500`, `text-slate-700` | `text-ink-muted`, `text-ink-secondary` |
| `best-private/page.tsx:339` | Box admissions rule | `text-blue-900`, `text-blue-800` | `text-ink-primary`, `text-ink-secondary` |
| `best-private/page.tsx:379` | Methodology desc | `text-slate-500` | `text-ink-secondary` |
| `best-private/page.tsx:396-410` | Sezione FAQ | `bg-slate-50`, `border-slate-200`, `text-slate-600` | `bg-surface-subtle`, `border-border`, `text-ink-secondary` |
| `best-private/page.tsx:397` | FAQ H2 | `text-2xl` hardcoded | `article-heading` o `text-h2` |
| `top-neighborhoods/page.tsx:221-223` | Thead tabella | `bg-slate-100 text-slate-700` | `bg-surface-subtle text-ink-primary` |
| `top-neighborhoods/page.tsx:236-241` | Tbody tabella | `bg-white hover:bg-slate-50`, `text-slate-800/600/500` | token ink/surface |
| `top-neighborhoods/page.tsx:279-296` | Card Coastal pros/cons | `text-slate-900`, `text-green-600`, `text-green-500`, `text-slate-400/300/500` | token ink + trust/warm |
| `top-neighborhoods/page.tsx:342` | Box Sintra | `text-teal-800` | `text-trust` o `text-ink-secondary` |
| `top-neighborhoods/page.tsx:374-376` | Card Lisbon inside | `border-slate-200`, `text-slate-900` | `border-border`, `text-ink-primary` |
| `top-neighborhoods/page.tsx:403-404` | How-to-choose card | `bg-white border-slate-100`, `text-slate-900` | `bg-card border-border`, `text-ink-primary` |
| `top-neighborhoods/page.tsx:419-430` | Sezione FAQ | `bg-slate-50`, `border-slate-200`, `text-slate-600` | `bg-surface-subtle`, `border-border`, `text-ink-secondary` |
| `top-neighborhoods/page.tsx:421` | FAQ H2 | `text-2xl` hardcoded | `article-heading` o `text-h2` |
| `SchoolsList.tsx:47` | CardTitle | `text-xl` hardcoded | `text-h3` (token) |
| `NeighborhoodsList.tsx:31` | CardTitle | `text-lg` hardcoded | `text-h4` o `text-h3` (token) |

---

## Fase 2 — Strategia fotografica

| Stato | Azione | Note |
|-------|--------|------|
| ✅ | Hero: immagine aggiunta (public/hero-img.jpg, split layout), alt SEO | `Hero.tsx` — immagine reale necessaria in `public/hero-img.jpg` |
| ✅ | Pillars: thumbnail per card (aspect-video, lazy, geo-alt) | `PillarsCardsSection.tsx` — già implementato con `next/image` |
| ☐ | LeadMagnet: immagine di supporto colonna sinistra (4:3, lazy) | `LeadMagnetSection.tsx` — colonna sinistra attualmente solo testo/icone |
| ☐ | Testimonials: avatar 1:1 per testimonial (48×48, rounded-full) | `Testimonials.tsx` — nessun avatar; solo nome+ruolo |
| ☐ | SchoolsList: thumbnail in cima a card (16:9 o 4:3, lazy) | `SchoolsList.tsx` — card senza immagine in cima |
| ☐ | NeighborhoodsList: thumbnail in cima a card (16:9 o 4:3, lazy) | `NeighborhoodsList.tsx` — card senza immagine in cima |

---

## Fase 3 — Composizione e ritmo

| Stato | Azione | Note |
|-------|--------|------|
| ✅ | Sezione "respiro" aggiunta | Homepage: div immagine `aspect-21/9` tra Quiz e LeadMagnet. Pagine pillar: respiro tra sezioni articolo |
| ☐ | Alternanza sfondo homepage: Quiz su `bg-surface-ground` (o `bg-card`) se Pillars su `bg-surface-subtle` | Attualmente: Pillars=`bg-surface-subtle`, Quiz=implicito background, LeadMagnet=`bg-surface-subtle` — manca contrasto Quiz vs Pillars |
| ⚠️ | Wireframe homepage rispettato (visual weight, breakpoint) | Struttura generale OK; QuizSection manca di sfondo esplicito differenziato |
| ☐ | Pagine pillar (best-private, top-neighborhoods): layout e token coerenti | Struttura articolo buona; colori non-token da correggere (v. Fase 1) |
| ☐ | Pagine slug (schools/[slug], neighborhoods/[slug], blog/[slug]): da auditare | Non ancora analizzate |

---

## Fase 4 — Coerenza design system

| Stato | Azione | Note |
|-------|--------|------|
| ⚠️ | Card: bg-card OK (via shadcn), ma radius hardcoded (`rounded-xl`, `rounded-2xl`) invece di token | `LeadMagnetSection.tsx:67` usa `rounded-2xl`; token `--radius-xl` disponibile |
| ⚠️ | Spacing: `mb-14` in `PillarsCardsSection.tsx:41` — 56px, fuori scala 4pt | Correggere in `mb-12` (48px) o `mb-16` (64px) |
| ✅ | Regole tipografiche applicate (Hero, Pillars, LeadMagnet, Testimonials, Header, TrustBar — token size) | Componenti feature OK; pagine pillar NON OK (v. Fase 1) |
| ✅ | Regole colore applicate (rating stelle → token warm in Testimonials) | `Testimonials.tsx` — `text-warm fill-warm` |
| ☐ | Radius e ombre: nomenclatura unica verificata — shadows usano `--shadow-hair`, `--shadow-float`, `--shadow-lift` (in globals.css); verificare uso in tutti i componenti | `LeadMagnetSection.tsx` usa `shadow-(--shadow-hair)` correttamente |
| ☐ | Sezioni FAQ nelle pagine pillar: portare a token (`bg-surface-subtle`, `border-border`, `text-ink-*`) e heading da `text-2xl` a `article-heading` | v. tabella Fase 1 |

---

## Priorità d'azione (aggiornata 2026-02-23)

| Priorità | Azione | File | Effort |
|----------|--------|------|--------|
| ✅ | Rimosso `unoptimized={true}` da Hero | Fix 2026-02-23 |
| ✅ | H1 pagine pillar: `text-4xl md:text-5xl` → `text-h1` | Fix 2026-02-23 |
| ✅ | Colori non-token pagine pillar: tutti sostituiti con token | Fix 2026-02-23 |
| ✅ | FAQ heading pagine pillar: `text-2xl` → `article-heading` | Fix 2026-02-23 |
| ✅ | `mb-14` → `mb-12` in PillarsCardsSection | Fix 2026-02-23 |
| ✅ | CardTitle token: `text-xl` → `text-h3` (SchoolsList); `text-lg` → `text-h4` (NeighborhoodsList) | Fix 2026-02-23 |
| ✅ | `text-red-500` → `text-destructive` in form.tsx | Fix 2026-02-23 |
| 🟡 | Immagine LeadMagnet colonna sinistra | `LeadMagnetSection.tsx` | medio |
| 🟡 | Avatar Testimonials | `Testimonials.tsx` | medio |
| 🟡 | Thumbnail SchoolsList cards | `SchoolsList.tsx` | medio |
| 🟡 | Thumbnail NeighborhoodsList cards | `NeighborhoodsList.tsx` | medio |
| 🟡 | Alternanza sfondo Quiz: aggiungere `bg-card` esplicito su `QuizSection` | `QuizSection.tsx` | 1 riga |
| 🟢 | Audit pagine slug (schools/[slug], neighborhoods/[slug], blog/[slug], relocation-guide) | Da fare | alto |

---

## Note operative

- **Fase 1** = priorità massima (Hero + tipografia + colori + doc).
- Dopo ogni sessione: aggiornare questa checklist (☐ → ✅).
- Per dettaglio su ogni voce: aprire **docs/EDITORIAL_DESIGN_AUDIT.md** (non esiste più design_system.md).
- **Pagine slug non ancora auditate**: `schools/[slug]/page.tsx`, `neighborhoods/[slug]/page.tsx`, `blog/page.tsx`, `blog/[slug]/page.tsx`, `relocation-guide/page.tsx` — probabilmente hanno gli stessi problemi delle pagine pillar.
