# TrustFamily — Roadmap verso Production-Ready
> Ultimo aggiornamento: 2026-03-02 | Sessione 8

---

## LEGENDA
- 🔴 Bloccante per lancio
- 🟡 Importante ma non bloccante
- 🟢 Post-lancio
- ✅ Completato

---

## FASE 1 — Stabilizzazione (da fare prima del lancio)

### 1.1 — Scuole: dati e bug critici ✅ COMPLETATO sessione 8
| Task | Priorità | Stato | Note |
|---|---|---|---|
| Nuovo JSON scuole (scraper v2) | 🔴 | ✅ | curriculum 100% pulito, age_range, qualifications, english_as_primary, data_confidence |
| Fix B1: `neighborhoodSlug: "portugal"` → 404 | 🔴 | ✅ | `neighborhoodSlug` ora opzionale; card Neighborhood Match condizionale |
| Fix B2: pagine detail scuole imported → contenuto vuoto | 🔴 | ✅ | Auto-description fattuale generata da dati strutturati |
| Filtro entry invalide (Wikipedia:FAQ + Low confidence) | 🔴 | ✅ | 92 raw → 77 valide (15 filtrate: Low confidence + Wikipedia) |
| Slug sanitization (URL-encoding + accenti) | 🟡 | ✅ | `lycee-francais-charles-lepierre`, `colegio-dom-diogo-de-sousa` |
| Nuovi campi sidebar: ageRange, website, englishAsPrimary, schoolBusRoutes, studentCount | 🟡 | ✅ | Mostrati condizionalmente nel detail page |
| Fix B3: BreadcrumbList URL singolare vs plurale | 🟡 | ✅ | Non era un bug: `/school/[slug]` singolare è corretto per EN routing |

### 1.2 — Quartieri: arricchire il mapping del JSON ✅ COMPLETATO sessione 7
| Task | Priorità | Stato | Note |
|---|---|---|---|
| Testo descrittivo (vibe_description) | 🔴 | ✅ | 64/64 — mappato da `lifestyle.vibe_description` |
| Pros/cons | 🟡 | ✅ | 64/64 — mappati in highlights/cons |
| Aggiungere prezzi immobili al detail page | 🟡 | ✅ | Affitti 1/2/3-bed, prezzo/m², trend YoY |
| Aggiungere punteggi family (safety, walkability) | 🟡 | ✅ | Score bars visuali, badge beach/noise |
| Aggiungere demographics (expat %, nazionalità) | 🟡 | ✅ | Expat %, nazionalità, english friendliness |
| Aggiungere cost of living (budget mensile) | 🟡 | ✅ | Budget mensile + % vs Lisbon |
| Aggiungere expat community + transport | 🟢 | ✅ | Strength, digital nomad, NHR, metro, trains |
| Fix B4: city="Lisbon" hardcoded in NeighborhoodMap | 🟡 | ✅ | Ora usa neighborhood.location |

### 1.3 — CRM / Form
| Task | Priorità | Stato | Note |
|---|---|---|---|
| Collegare form lead magnet a CRM/email | 🔴 | ❌ | Senza questo il funnel non raccoglie lead |
| Definire CRM: HubSpot / Mailchimp / Resend / Notion | 🔴 | ❌ | Decisione da prendere |

### 1.4 — Infrastruttura
| Task | Priorità | Stato | Note |
|---|---|---|---|
| Aggiungere `NEXT_PUBLIC_BASE_URL=https://trustfamily.com` su Vercel | 🔴 | ❌ | Senza questa var, URL nei JSON-LD potrebbero essere sbagliati in prod |
| Configurare dominio `trustfamily.com` su Vercel | 🔴 | ❌ | Se non già fatto |

---

## FASE 2 — UI/UX (dopo stabilizzazione)

### 2.1 — Liste scuole e quartieri
| Task | Priorità | Stato | Note |
|---|---|---|---|
| Paginazione scuole (es. 12 per pagina) | 🟡 | ❌ | 77 card contemporaneamente è lento e inutilizzabile |
| Filtri scuole (curriculum, zona, budget) | 🟡 | ❌ | Dati ora puliti → filtraggio per curriculum è fattibile |
| Paginazione quartieri | 🟡 | ❌ | 64 card contemporaneamente |
| Filtri quartieri (zona, tipo, budget) | 🟡 | ❌ | |

### 2.2 — Immagini
| Task | Priorità | Stato | Note |
|---|---|---|---|
| Immagini reali per le 4 scuole curated | 🟡 | ❌ | Attualmente: `schools-img.jpg` generico per tutte |
| Immagini reali per i 5 quartieri curated | 🟡 | ❌ | Attualmente: `neighborhoods-img.jpg` generico |
| Immagine fallback di qualità per imported | 🟢 | ❌ | Placeholder attuale è accettabile |

### 2.3 — Mappe
| Task | Priorità | Stato | Note |
|---|---|---|---|
| Google Maps Embed (iframe, zero API key) | 🟡 | ❌ | Sostituisce lo stub visivo attuale con mappa reale embedded. Gratuito, zero JS. |

### 2.4 — School Finder
| Task | Priorità | Stato | Note |
|---|---|---|---|
| Verifica funzionamento end-to-end quiz | 🔴 | ❌ | Non verificato se il quiz produce output corretto |
| Verifica link risultati quiz → school detail | 🟡 | ❌ | |

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
| Testo narrativo scuole imported (73 scuole) | 🟢 | Opzione A: scraping headless (Playwright); Opzione B: generazione AI batch via Claude API |
| OG image locale-aware | 🟢 | |
| `sameAs` Organization schema | 🟢 | Quando profili social attivi |
| LLM referral UTM tracking | 🟢 | |
| Vercel Analytics | 🟢 | |
| IndexNow API | 🟢 | |
| Blog: nuovi articoli | 🟢 | Attualmente 3 articoli |
| Service Worker / offline | 🟢 | |

---

## PROSSIMA SESSIONE — AGENDA SUGGERITA

**Obiettivo:** CRM/form + School Finder verifica + ContactBtn

**Step nell'ordine:**
1. **CRM/form**: collegare il lead magnet form a un servizio email (decidere: Resend, Mailchimp, HubSpot)
2. **ContactBtn**: collegare il bottone Contact nelle school/neighborhood detail pages alla form o CRM
3. **School Finder quiz**: verifica end-to-end — il quiz produce risultati corretti? I link portano alle giuste scuole?
4. **(opzionale) Paginazione scuole**: 77 card contemporaneamente → non scalabile, ma non bloccante

**Chiarimenti necessari:**
- Quale CRM/email per il form? (Resend è il più semplice per Next.js; HubSpot se vuoi CRM completo)
- ContactBtn deve aprire un form inline, inviare email, o reindirizzare al sito della scuola/quartiere?
