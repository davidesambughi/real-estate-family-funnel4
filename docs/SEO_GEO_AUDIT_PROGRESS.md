# SEO & GEO Audit — Progress Tracker

> **STATO (2026-02-25):** 4 sessioni completate. Tutti i blocchi pre-lancio sono risolti.
> Gli item rimanenti aperti (sameAs, OG locale-aware, alt text, UTM tracking, Search Console, Analytics, IndexNow) sono **post-lancio**.
> Per priorità pre-lancio → `LAUNCH_CHECKLIST.md`

**Audit date:** February 2026 | **Branch base:** `testing-languages-and-routing`

Legenda: `[C]` Critico · `[H]` Alto · `[M]` Medio · `[L]` Basso

---

## CRITICI — implementa subito

- [x] `[C]` Rimuovi pagine inesistenti dalla sitemap (`/contact`, `/privacy`, `/terms`) → `app/sitemap.ts`
- [x] `[C]` Fix `lastModified` in sitemap — usa date reali, non `new Date()` → `app/sitemap.ts`
- [x] `[C]` Fix schema misuse scuole — `numberOfCredits` → `acceptanceRate`, `foundingDate` → `inspectionDate` → `app/[locale]/schools/[slug]/page.tsx`

---

## ALTI — priorità immediata

- [x] `[H]` Aggiungi `x-default` hreflang in layout → `app/[locale]/layout.tsx`
- [x] `[H]` Converti URL alternates relativi → assoluti in tutte le pagine di dettaglio
  - [x] `app/[locale]/schools/[slug]/page.tsx`
  - [x] `app/[locale]/neighborhoods/[slug]/page.tsx`
  - [x] `app/[locale]/best-private-and-public-international-schools-portugal-2026/page.tsx`
  - [x] `app/[locale]/top-neighborhoods/page.tsx`
  - [x] `app/[locale]/relocation-guide/page.tsx`
- [x] `[H]` Aggiungi `openGraph` e `twitter` metadata in tutte le pagine principali
  - [x] layout.tsx (default OG)
  - [x] homepage `page.tsx`
  - [x] schools guide page
  - [x] neighborhoods guide page
  - [x] relocation guide page
  - [x] school detail page
  - [x] neighborhood detail page
  - [x] blog page
  - [x] school-finder page
  - [x] about page
- [x] `[H]` Converti `relocation-guide`, `about`, `blog` a `async generateMetadata` locale-aware
  - [x] `app/[locale]/relocation-guide/page.tsx`
  - [x] `app/[locale]/about/page.tsx`
  - [x] `app/[locale]/blog/page.tsx`
- [x] `[H]` Rimuovi dati placeholder dall'Organization schema (tel placeholder, logo URL) → `app/[locale]/page.tsx`
- [x] `[H]` Sposta BreadcrumbList JSON-LD in Server Component → `components/Breadcrumbs.tsx`
- [x] `[H]` Aggiungi `revalidate` alle pagine dinamiche (ISR)
  - [x] `app/[locale]/schools/[slug]/page.tsx` — `revalidate = 86400` (24 h)
  - [x] `app/[locale]/neighborhoods/[slug]/page.tsx` — `revalidate = 86400`
  - [x] `app/[locale]/best-private-and-public-international-schools-portugal-2026/page.tsx` — `revalidate = 43200` (12 h)
  - [x] `app/[locale]/top-neighborhoods/page.tsx` — `revalidate = 43200`
  - [x] `app/[locale]/relocation-guide/page.tsx` — `revalidate = 43200`

---

## MEDI — prossima sessione

- [x] `[M]` Aggiungi schema `WebSite` + `SearchAction` (sitelinks searchbox) → `app/[locale]/page.tsx`
- [x] `[M]` Aggiungi `Person` schema per autori (E-E-A-T) → `app/[locale]/about/page.tsx`
- [ ] `[M]` Aggiungi `sameAs` all'Organization schema → profili social reali (LinkedIn, Twitter/X)
  - Note: placeholder commentato in `app/[locale]/page.tsx` e `app/[locale]/about/page.tsx` — sblocca quando i profili social sono attivi
- [x] `[M]` Fix blog JSON-LD — URL articoli ora puntano a pagine reali `/blog/[slug]` → `lib/blog-data.ts`
- [x] `[M]` Aggiungi TL;DR / "Key takeaways" box in cima alle guide
  - [x] `app/[locale]/relocation-guide/page.tsx`
  - [x] `app/[locale]/best-private-and-public-international-schools-portugal-2026/page.tsx`
  - [x] `app/[locale]/top-neighborhoods/page.tsx`
- [x] `[M]` Aggiungi link a fonti esterne per claim verificabili (Global Peace Index, AIMA visas, IBO.org)
  - Global Peace Index → visionofhumanity.org (sezione "Why Portugal" relocation guide)
  - AIMA portal → imigracao.gov.pt (disclaimer visa, relocation guide)
  - IBO Diploma → ibo.org (dopo sezione curriculum, schools guide)
- [ ] `[M]` OG image locale-aware (almeno testo in lingua corrente) — ora è solo inglese
- [x] `[M]` Crea pagine individuali `app/[locale]/blog/[slug]/page.tsx` per ogni articolo
  - [x] Estratti dati in `lib/blog-data.ts`
  - [x] Creato `app/[locale]/blog/[slug]/page.tsx` con Article schema completo
  - [x] Blog listing aggiornato a teaser + link individuali
  - [x] `app/sitemap.ts` aggiornato con blog entries
  - [x] `/blog` e `/blog/[slug]` aggiunti a `i18n/routing.ts`

---

## BASSI — backlog

- [x] `[L]` `next.config.ts`: aggiungi `poweredByHeader: false`, security headers, `image/avif` format
- [ ] `[L]` Localizza alt text delle immagini con `getTranslations` nelle pagine con lang != en
- [x] `[L]` Aggiungi schema `HowTo` per guide step-by-step (relocation timeline) → `app/[locale]/relocation-guide/page.tsx`
- [x] `[L]` Aggiungi schema `Speakable` per ottimizzazione voice search
  - [x] `app/[locale]/relocation-guide/page.tsx` — cssSelector: `#key-takeaways`, `#faq`
  - [x] `app/[locale]/best-private-and-public-international-schools-portugal-2026/page.tsx`
  - [x] `app/[locale]/top-neighborhoods/page.tsx`
- [x] `[L]` Skip navigation link ("Skip to main content") — accessibilità WCAG 2.1 AA → `app/[locale]/layout.tsx`
- [ ] `[L]` Service Worker / offline strategy
- [ ] `[L]` Bundle analyzer setup (`@next/bundle-analyzer`)
- [ ] `[M]` LLM referral tracking (UTM per ChatGPT, Perplexity, Gemini referral) — spostato a [M], dato strategico 2026
- [x] `[L]` Regole robots.txt per AI bot (GPTBot, CCBot, PerplexityBot) → `public/robots.txt`
  - Training bots (GPTBot, CCBot, anthropic-ai): Disallow
  - Inference/search bots (PerplexityBot, ChatGPT-User, Google-Extended, YouBot): Allow
- [ ] `[L]` IndexNow / Google Indexing API integration

---

## MEDI — aggiunti in sessione 4

- [ ] `[M]` Core Web Vitals audit — LCP element su ogni pagina, CLS su layout shifts, INP su componenti interattivi (quiz, form). Verificare con PageSpeed Insights o Vercel Speed Insights post-deploy.
- [ ] `[M]` LLM referral UTM tracking — UTM params su CTA link (`?utm_source=chatgpt&utm_medium=referral` ecc.) per tracciare referral da ChatGPT, Perplexity, Gemini in Analytics

---

## BASSI — aggiunti in sessione 4

- [ ] `[L]` Valuta noindex su pagine non indicizzabili — `school-finder` è editorial landing (tieni indexed); valuta `robots: noindex` su eventuali URL con query params di stato quiz (se generano URL unici)
- [ ] `[L]` Valuta struttura blog flat vs categorie — `/blog/[slug]` flat è ok per ≤10 articoli; se si scala a 20+, categorie (`/blog/schools/[slug]`, `/blog/neighborhoods/[slug]`) aiutano il crawl budget e la topical authority. Decisione da prendere prima dell'indicizzazione.
- [ ] `[L]` Valida TUTTI gli schema con Google Rich Results Test post-deploy — pagine da validare: homepage (Organization+WebSite), 3 guide pillar (FAQPage+HowTo/Speakable), blog detail (Article), school detail (EducationalOrganization+BreadcrumbList), neighborhood detail (Place+BreadcrumbList)

---

## INFRASTRUTTURA / MONITORAGGIO — da pianificare

- [ ] Google Search Console configurato per lingua/paese (6 proprietà o 1 con filter)
- [ ] CrUX / RUM monitoring (Vercel Analytics o simile)
- [ ] Rank tracking per SERP + AI Overview presence
- [ ] A/B testing su title/meta per CTR (almeno 2 varianti per pagine pillar)

---

## Note di sessione

### Sessione 1 — Febbraio 2026
- Completato audit completo SEO & GEO su tutto il codebase
- Implementati tutti i critici e alti completati ✅
- TypeScript check: 0 errori nuovi (2 preesistenti su `school-finder/#quiz` e `Footer /blog` — risolto il Footer aggiungendo /blog a routing.ts)
- Branch: `testing-languages-and-routing`

### Sessione 2 — Febbraio 2026
**Implementati tutti i rimanenti [H] + tutti i [M] principali + [L] critici:**

**Batch 1 — ISR + Security + robots.txt:**
- ISR `revalidate` su 5 pagine (86400s per detail pages, 43200s per pillar pages)
- `next.config.ts`: `poweredByHeader: false`, security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS), image formats AVIF+WebP
- `public/robots.txt`: regole AI bot (training disallow, inference allow)

**Batch 2 — Schema improvements:**
- `WebSite` + `SearchAction` schema in homepage (Google Sitelinks search box)
- `Person` schema E-E-A-T in about page (editorial team with `knowsAbout`)
- `sameAs` commentato con placeholder (sblocca quando profili social attivi)

**Batch 3 — GEO Key Takeaways (impatto massimo per AI Overviews):**
- TL;DR "Key takeaways" box con 7 bullet points in tutte e 3 le guide pillar
- Estratti direttamente sopra featured image — primo contenuto che AI engines leggono

**Batch 4 — Blog individual pages:**
- Creato `lib/blog-data.ts` con dati condivisi e `BlogArticle` type
- Creato `app/[locale]/blog/[slug]/page.tsx` con Article schema completo, datePublished/Modified, author Person
- Blog listing aggiornato: teaser + link a pagine individuali (no duplicate content)
- Sitemap aggiornata con blog listing + 3 post entries
- routing.ts: aggiunte `/blog` e `/blog/[slug]`

**TypeScript post-sessione 2:** 0 errori nuovi (1 preesistente: `school-finder/#quiz`)

**Preesistenti da sistemare separatamente (non SEO):**
- `school-finder/page.tsx:138` — `href="/#quiz"` non è un typed next-intl route

---

---

### Sessione 3 — Febbraio 2026

**Batch 5 — HowTo schema + Speakable schema:**
- `HowTo` schema (6 step, totalTime P12M) in relocation guide — targeting AI Overviews per "how to relocate to Portugal"
- `Speakable` schema su tutte e 3 le guide pillar (cssSelector: `#key-takeaways` + `#faq`)
- `id="key-takeaways"` aggiunto ai Key Takeaways box per target CSS selector

**Batch 6 — External source citations:**
- Global Peace Index 2025 (visionofhumanity.org) → sezione Why Portugal, relocation guide
- AIMA immigration portal (imigracao.gov.pt) → disclaimer visa, relocation guide
- IBO Diploma Programme (ibo.org) → sezione curriculum, schools guide

**Batch 7 — Accessibilità WCAG 2.1 AA:**
- Skip navigation link ("Skip to main content") in layout.tsx
- `id="main-content"` wrapper su `{children}` nel layout

**TypeScript post-sessione 3:** 0 errori nuovi (1 preesistente: `school-finder/#quiz`)

---

---

### Sessione 4 — 2026-02-25

**Batch 8 — FAQPage schema/HTML alignment (tutte e 3 le guide):**
- Fix mismatch schema ↔ HTML: schools guide (Q3 e Q4 completamente diverse), neighborhoods guide (Q3 e Q4 diverse), relocation guide (ordine Q2/Q3 invertito + tutte le risposte diverse)
- Regola: FAQPage schema DEVE corrispondere esattamente alle domande/risposte visibili nell'HTML

**Batch 9 — Homepage alternates + canonical:**
- Aggiunto `alternates.canonical` (self-referencing per locale) e `alternates.languages` (tutti 6 locale + x-default → EN) in `app/[locale]/page.tsx`
- Strategia: self-referencing canonical su homepage (non cross-lingua), con hreflang completi

**Batch 10 — Alternates routing-aware su pagine detail:**
- `schools/[slug]/page.tsx`: ora usa `routing.pathnames['/schools/[slug]']` per risolvere path locale-specifici
- `neighborhoods/[slug]/page.tsx`: stesso pattern
- Pattern riusabile: `routing.pathnames[key] as Record<string, string>` + `.replace('[slug]', slug)`

**Batch 11 — OG images su tutte le pagine:**
- Aggiunto `openGraph.images: [{ url: \`${BASE}/opengraph-image\`, 1200x630 }]` su tutte le 10 pagine
- Root `app/opengraph-image.tsx` già esisteva (genera OG image edge-rendered)

**Batch 12 — ISR + llms.txt:**
- Homepage `revalidate`: 3600 → 43200 (12h, allineato alle pillar pages)
- Creato `public/llms.txt`: citation policy, authoritative pages (guide + school detail pages per URL), data freshness, do-not-use section

**TypeScript post-sessione 4:** 0 errori (1 preesistente school-finder/#quiz — fuori scope)

---

## Prossimi step raccomandati

1. **Rich Results Test** — Validare TUTTI gli schema su Google Rich Results Test dopo il deploy: Organization, WebSite, FAQPage (3 guide), Article (blog detail), EducationalOrganization (school detail), Place (neighborhood detail), BreadcrumbList
2. **Google Search Console** — Configurare PRIMA del lancio (property verification, sitemap submit)
3. **`sameAs`** — Aggiungi URL profili social reali (LinkedIn, X/Twitter) quando attivi
4. **OG image locale-aware** — Genera immagini OG con testo nella lingua corrente
5. **Localizza alt text immagini** — `getTranslations` per pagine non-English
6. **LLM referral tracking** — UTM params su CTA link (priorità MEDIA — dato strategico 2026)
7. **Vercel Analytics** — Configura per CrUX/RUM monitoring
8. **IndexNow** — Notifica motori di ricerca su nuovi contenuti
