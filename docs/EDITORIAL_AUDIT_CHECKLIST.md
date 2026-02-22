# Checklist avanzamento — Audit editoriale TrustFamily

> Riferimento: **EDITORIAL_DESIGN_AUDIT.md** (fonte unica di verità).  
> Procedere a fasi; spuntare man mano.

---

## Fase 1 — Audit visivo e critici

| Stato | Azione |
|-------|--------|
| ☑ | **Hero**: immagine LCP (next/image, priority, 16:9, placeholder blur) |
| ☑ | **Hero**: tipografia da token (text-hero, section-body) |
| ☑ | **Hero**: spacing da scala (py-20, gap-8/gap-10, mb-10/mb-12) |
| ☑ | **Token tipografia**: definiti in globals.css (--ds-text-* + @theme) e usati in Hero, Pillars, LeadMagnet, Testimonials, Header, TrustBar |
| ⏸ | **Colori non-token**: in sospeso — si mantengono slate/blue dove danno tono (best-private, tabelle, FAQ). Testimonials: stelle → warm ✓ |
| ☑ | **Spacing**: valori fuori scala allineati a scala 4pt (Hero, Pillars p-6) |
| ☑ | **Doc di riferimento**: **EDITORIAL_DESIGN_AUDIT.md** (audit e strategia). Fonte implementazione = **globals.css**. design_system.md non esiste. |

---

## Fase 2 — Strategia fotografica

| Stato | Azione |
|-------|--------|
| ☐ | Hero: immagine reale aggiunta (public/images/hero.jpg 16:9), alt SEO |
| ☐ | Pillars: thumbnail 4:3 per card (opzionale) |
| ☐ | LeadMagnet: immagine di supporto colonna sinistra |
| ☐ | Testimonials: avatar 1:1 per testimonial |
| ☐ | SchoolsList / NeighborhoodsList: thumbnail in cima a card |

---

## Fase 3 — Composizione e ritmo

| Stato | Azione |
|-------|--------|
| ☐ | Sezione “respiro” tra Quiz e LeadMagnet (o Pillars/Quiz) |
| ☐ | Alternanza sfondo (es. Quiz su surface-ground se Pillars su surface-subtle) |
| ☐ | Wireframe homepage rispettato (visual weight, breakpoint) |
| ☐ | Pagina best-private / articoli: layout e token coerenti |

---

## Fase 4 — Coerenza design system

| Stato | Azione |
|-------|--------|
| ☐ | Card: sempre bg-card, radius da token |
| ☐ | Regole spacing applicate ovunque (tabella Fase 4 audit) |
| ☑ | Regole tipografiche applicate (Hero, Pillars, LeadMagnet, Testimonials, Header, TrustBar — token size) |
| ☑ | Regole colore applicate (rating stelle → token warm in Testimonials) |
| ☐ | Radius e ombre: nomenclatura unica (doc o globals) |

---

## Note operative

- **Fase 1** = priorità massima (Hero + tipografia + colori + doc).
- Dopo ogni sessione: aggiornare questa checklist (☐ → ☑).
- Per dettaglio su ogni voce: aprire **docs/EDITORIAL_DESIGN_AUDIT.md** (non esiste più design_system.md).
