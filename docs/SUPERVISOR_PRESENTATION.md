# TrustFamily Relocation Funnel — Project Status
> Prepared: March 3, 2026 | Verified against actual codebase

---

## What We Are Building

**TrustFamily** is a comprehensive, multilingual relocation guide for international families moving to Portugal. Built on three content pillars:

1. **International Schools** — 77 verified schools with curriculum, fees, age range, and admissions data
2. **Family-Friendly Neighborhoods** — 64 neighborhoods with real estate prices, lifestyle scores, demographics, and expat community data
3. **Relocation Guide** — visas, timelines, cost of living, step-by-step process

**Target audience:** English-speaking expat families (primary), plus French, German, Dutch, Spanish, and Portuguese speakers.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS · next-intl · Vercel

---

## 1. SEO & GEO — Architecture Complete

> All pre-launch SEO blockers resolved. What remains is post-launch monitoring and optional enhancements.

### What is implemented ✅

| Category | Detail |
|---|---|
| **Canonical URLs** | Every page has a canonical. Detail pages → EN canonical. Homepage → self-referencing per locale. |
| **hreflang** | 6 locales + `x-default → /en/...` on every page type, including blog. |
| **Structured data (JSON-LD)** | 10 schema types across all pages. Zero mismatches between schema and rendered HTML (verified). |
| **Open Graph + Twitter cards** | All 10 page types. OG images 1200×630 via edge-rendered generator. |
| **ISR** | All dynamic pages: 24h revalidation (detail) / 12h (pillar). No full rebuilds on data changes. |
| **GEO — Key Takeaways boxes** | All 3 pillar guides. "Key Takeaways" is the first content block — the format AI engines use for AI Overviews (ChatGPT, Perplexity, Gemini). |
| **Speakable schema** | All 3 guides: `cssSelector: ["#key-takeaways", "#faq"]`. Optimizes for voice search. |
| **HowTo schema** | Relocation guide — 6-step process targeting "how to relocate to Portugal" in AI Overviews. |
| **E-E-A-T signals** | Person schema on About page. External citations to Global Peace Index, AIMA, IBO.org. |
| **robots.txt** | AI training bots blocked (GPTBot, CCBot). AI inference bots allowed (PerplexityBot, ChatGPT-User, Google-Extended). |
| **llms.txt** | Citation policy for LLM systems. Lists authoritative pages and data freshness. |
| **Security headers** | X-Frame-Options, X-Content-Type-Options, Referrer-Policy, HSTS in next.config.ts. |
| **Sitemap** | All pages including 3 blog posts. Real `lastModified` dates. No ghost URLs. |
| **TypeScript** | Zero compilation errors. |

### JSON-LD schemas by page

| Page | Schemas |
|---|---|
| Homepage | Organization · WebSite + SearchAction · BreadcrumbList |
| Schools pillar guide | FAQPage · Speakable · ItemList · BreadcrumbList |
| Neighborhoods pillar guide | FAQPage · Speakable · ItemList · BreadcrumbList |
| Relocation guide | FAQPage · HowTo · Speakable · BreadcrumbList |
| School detail | EducationalOrganization · BreadcrumbList |
| Neighborhood detail | Place · BreadcrumbList |
| Blog article | Article · Person · BreadcrumbList |
| About | Person · BreadcrumbList |

### Post-launch SEO (deliberate, non-blocking)

- Google Search Console setup and sitemap submission (requires live domain)
- Rich Results Test validation on all schemas (requires deployed URL)
- `sameAs` social profiles in Organization schema (social accounts not yet active)
- OG images locale-aware (EN-only OG is acceptable at launch)
- LLM referral UTM tracking
- Vercel Analytics, IndexNow, Core Web Vitals audit

---

## 2. Content Status

> Editorial content is complete for all curated entries. The database (77 schools, 64 neighborhoods) has all structured data mapped and rendering. Narrative text for non-curated school entries is the primary gap — being addressed by the parallel scraping project.

### Schools — 77 published entries

| Tier | Count | Content |
|---|---|---|
| **Curated** (editorial) | 4 | Full editorial text, expert verdict, parent tips. Translated into all 6 languages. ✅ |
| **Imported** (from scraping) | 73 | Structured data 78-100% complete. Auto-generated factual description from data fields. |
| Filtered/removed | 15 | Low-confidence or invalid entries (Wikipedia stubs) — not shown. |

**Structured data completeness across all 77 schools:**

| Field | Coverage |
|---|---|
| Name | 100% ✅ |
| Curriculum | 100% ✅ |
| GPS Coordinates | 95% ✅ |
| Annual fees | 84% ✅ |
| Age range | 84% ✅ |
| English as primary language | 83% ✅ |
| Website | 78% ✅ |
| Qualifications offered | 78% ✅ |
| **Narrative description** | **5%** ⚠️ — 4 curated schools only. 73 imported = auto-generated. |

**What the scraping project will deliver:**
- ~61 Tier A schools: 12-16 fields + real narrative description (150-300 words)
- ~16 Tier B schools: 7-11 fields (auto-description maintained)
- New fields: `description`, `admission_process`, `language_support`, `extracurricular_activities`, `transport`

### Neighborhoods — 64 published entries

| Tier | Count | Content |
|---|---|---|
| **Curated** (editorial) | 5 | Full editorial text, translated into all 6 languages. ✅ |
| **Imported** | 59 | All structured fields fully mapped and rendering. ✅ |

All 64 neighborhoods have: description, pros/cons, real estate prices, family living scores, demographics, cost of living, expat community data, transport links. All sections render conditionally (only shown when data exists).

### Blog

- 3 published articles with Article schema, author attribution, and full hreflang.
- Individual article pages at `/[locale]/blog/[slug]/`.

### 3 Pillar Guides

All three are complete with full editorial content, FAQ sections, and structured data.

---

## 3. Multilingual Status — UI Layer Complete

> All UI text is fully translated in 6 languages. Data translations are complete for curated content. Non-curated entries display in English with a clean fallback — no broken UI.

**6 supported locales:** English · Portuguese · German · French · Dutch · Spanish

| Layer | Status |
|---|---|
| All UI text (buttons, labels, navigation, forms, error messages) | ✅ 6 locales, all pages |
| 3 Pillar guides | ✅ 6 locales |
| Homepage | ✅ 6 locales |
| Blog pages (listing + articles) | ✅ 6 locales |
| About, School Finder, 404 | ✅ 6 locales |
| 4 curated schools — editorial text | ✅ 6 locales |
| 5 curated neighborhoods — editorial text | ✅ 6 locales |
| 73 imported schools — data field labels translated, values in English | ✅ Labels translated |
| 59 imported neighborhoods — descriptions in English with i18n fallback | ✅ Labels translated |

**Translation architecture:** `translations[locale] ?? translations.en`. Helper functions return the locale version or fall back to English. The site never renders empty or broken content.

**Remaining i18n gaps (post-launch, not blocking):**
- Translating descriptive text for imported schools/neighborhoods into 5 additional languages — requires AI batch translation or professional translators.
- One hardcoded "Open in Maps" label in SchoolMap/NeighborhoodMap components (minor, low priority).

---

## 4. Images

> Real images are uploaded and in use. They are shared/generic images — one image used across all schools, one across all neighborhoods — not per-school or per-neighborhood photos.

**Current state (verified in code):**
- `schools-img.jpg` (165 KB) — used as the hero image on **every** school detail page (`/schools/[slug]`)
- `neighborhoods-img.jpg` (141 KB) — used on every neighborhood detail page
- `school-card-img.jpg`, `neighborhood-card-img.jpg` — used on listing cards
- Hero, lead magnet, guides, and decorative section images — real photos, each one unique ✅

**What this means:** The site looks good visually. There is one generic school photo and one generic neighborhood photo shown regardless of which school or neighborhood the user is viewing. This is acceptable for a soft launch but should be improved for the full version.

**For full launch:** Sourcing one real photo per curated school (4 photos) and per curated neighborhood (5 photos) would significantly improve quality on those pages.

---

## 5. Known Bugs (Verified in Code)

All bugs were verified by reading the actual source files.

| # | Bug | Where | Severity | Fix effort |
|---|---|---|---|---|
| **B7** | Region filter: `loc.includes("set")` matches any string containing "set" — could misclassify schools | `SchoolsList.tsx:71` | Medium | 5 min |
| **B9** | Pagination: no scroll-to-top when clicking Next/Previous — user must scroll up manually | `SchoolDirectory.tsx` | Low–Medium (UX) | 10 min |
| **B10** | `<dl>` element contains `<div>` children without `<dt>`/`<dd>` — invalid semantic HTML | `SchoolDirectory.tsx:268` | Low | 5 min |
| **B5** | "Open in Maps" label hardcoded in English in map components | `SchoolMap.tsx`, `NeighborhoodMap.tsx` | Low | 15 min |
| **B-form** | Contact button on school detail pages is a dead button (no link, no action) | `schools/[slug]/page.tsx:149` | Medium | 30 min (after CRM decision) |

**B6, B8, B11** depend on the new enriched JSON from the scraping project (region data completeness, fees nullability, curriculum variety). These will be re-evaluated when the new data arrives.

**Total fix time for B7 + B9 + B10:** ~20 minutes.

---

## 6. CRM / Form Status

> The form UI is fully built, validated, and now connected to a live email backend. Lead submissions will be delivered to the agency inbox as soon as the access key is configured.

**What works:**
- Full form with 7 fields (name, email, nationality, phone, school interest, neighborhood interest, message)
- Zod validation with field-level error messages
- Fully translated into 6 languages
- **Honeypot anti-bot protection** — hidden field that catches automated spam submissions silently
- **Web3Forms email backend** — every form submission triggers an email to the designated agency inbox. Zero infrastructure, zero ongoing cost.
- If the webhook fails for any reason, lead data is logged to Vercel (no submission is ever silently lost)

**What remains (one step):**
- The agency must provide the email address where leads should be received. Then:
  1. Go to **web3forms.com** → enter the agency email → receive an access key
  2. Add `WEB3FORMS_ACCESS_KEY=<key>` to Vercel environment variables
  3. Form goes live immediately — no redeploy needed

**Architecture decision:** Web3Forms was chosen over Resend/Supabase/HubSpot because it requires zero infrastructure setup, zero ongoing maintenance, and is free. When lead volume grows, the backend can be swapped out by changing ~10 lines in `lib/actions.ts`.

---

## 7. Launch Timeline

### Soft Launch — Usable and indexable, collects leads
> **Realistic time: 1 working day** (6-8 hours), assuming the CRM choice is made immediately

| Task | Estimated time |
|---|---|
| Fix B7, B9, B10 (code bugs) | 20 min |
| Fix contact button on school detail pages | 30 min |
| Add `WEB3FORMS_ACCESS_KEY` to Vercel (agency email needed) | 5 min |
| Verify School Finder quiz end-to-end | 1-2 hours |
| Add `NEXT_PUBLIC_BASE_URL=https://trustfamily.com` to Vercel | 5 min |
| Connect custom domain `trustfamily.com` to Vercel | 30 min |
| **Total** | **~3-4 hours** |

At this point the site is live, SEO-indexed, multilingual, collects leads, and has 77 schools + 64 neighborhoods published.

### Full Version — Content-complete with enriched school data
> **Additional time: 1-2 working days** after the enriched JSON arrives from the scraping project

| Task | Estimated time |
|---|---|
| Integrate enriched schools JSON (Tier A: 61 schools with real descriptions) | 3-5 hours |
| Update TypeScript types and detail page for new fields (admissions, extracurriculars) | 2-3 hours |
| Add per-school photos for 4 curated schools | 1 hour (sourcing + integration) |
| Neighborhood filters + pagination (same pattern as schools, already built) | 2-3 hours |
| Embedded maps (Google Maps iframe, zero API key required) | 1-2 hours |
| Google Search Console setup + sitemap submit | 30 min |
| **Total** | **~1.5-2 working days** |

---

## 8. Code Architecture & Organization

> The codebase follows a clean Next.js App Router structure. Clear separation between data, content, UI components, and page templates.

```
app/
├── layout.tsx                 # Root — metadataBase, global defaults
├── opengraph-image.tsx        # OG image generator (1200×630, shared)
├── sitemap.ts                 # Dynamic sitemap
├── robots.ts                  # Robots.txt generation
└── [locale]/                  # All pages, locale-prefixed URL
    ├── layout.tsx             # html/body, lang attr, hreflang
    ├── page.tsx               # Homepage
    ├── about/
    ├── blog/[slug]/           # Individual articles
    ├── school-finder/         # Interactive quiz
    ├── schools/[slug]/        # School detail pages (77 pages)
    ├── neighborhoods/[slug]/  # Neighborhood detail pages (64 pages)
    ├── best-private-and-public-international-schools-portugal-2026/  # Schools pillar
    ├── top-neighborhoods/     # Neighborhoods pillar
    └── relocation-guide/      # Relocation pillar

components/
├── layout/                    # Header, Footer
├── features/                  # Hero, Quiz, TrustBar, Maps, Testimonials, LeadMagnet
├── ui/                        # Button, Card, Badge, Input, Select, etc.
├── SchoolsList.tsx            # Server component — Top Picks + passes data to directory
├── SchoolDirectory.tsx        # Client component — filters, pagination, mini-cards
├── NeighborhoodsList.tsx      # Server component — neighborhoods listing
├── Breadcrumbs.tsx            # BreadcrumbList JSON-LD
└── StickyTOC.tsx              # Table of contents for pillar guides

lib/
├── types.ts                   # All TypeScript interfaces
├── data/                      # schools.ts, neighborhoods.ts, testimonials.ts, blog.ts
├── content/                   # Editorial copy (homepage, schools guide facts)
├── schemas/lead-form.ts       # Zod validation schema
└── actions.ts                 # Server Actions (form submission — CRM stub)

i18n/
├── routing.ts                 # Typed routes (next-intl)
├── navigation.ts              # Locale-aware Link wrappers
└── request.ts                 # Server request config

messages/                      # en.json pt.json de.json fr.json nl.json es.json
public/                        # Images + robots.txt + llms.txt
```

### Key architectural patterns

| Pattern | What it does |
|---|---|
| **Server Components for all pages** | Data never fetched on client. Pages rendered at build time via ISR. |
| **SchoolDirectory as Client Component with minimal payload** | Full School objects (with editorial content) stay on server. Only 9 serialized fields sent to browser. |
| **`translations[locale] ?? translations.en`** | Single source of truth. Any missing translation falls back to English silently. |
| **JSON-LD always uses `translations.en`** | Structured data is always canonical English regardless of page locale — correct for international SEO. |
| **`proxy.ts` as middleware** | Next.js 16 renamed middleware.ts → proxy.ts. Handles locale routing and redirects. |
| **`NEXT_PUBLIC_BASE_URL` for all absolute URLs** | All JSON-LD, canonical, and OG URLs built from this env var. Fallback to `trustfamily.com` hardcoded. |

---

## Summary

| Area | Status | Launch blocker? |
|---|---|---|
| SEO / GEO architecture | ✅ Complete | No |
| Multilingual UI (6 languages) | ✅ Complete | No |
| Homepage | ✅ Complete | No |
| 3 Pillar guides | ✅ Complete | No |
| Blog (3 articles) | ✅ Complete | No |
| 4 Curated schools (full editorial) | ✅ Complete | No |
| 5 Curated neighborhoods (full editorial) | ✅ Complete | No |
| School directory (77 schools, filters, pagination) | ✅ Working, 3 minor bugs | No |
| Neighborhood directory (64 neighborhoods) | ✅ Working | No |
| Images | ✅ Real images — generic/shared per section | No |
| School Finder quiz | ⚠️ Not verified end-to-end | Should verify |
| Contact buttons on detail pages | ❌ Dead button (no action) | Yes |
| CRM / Form backend | ⏳ Web3Forms integrated — awaiting agency email for access key | **Yes (1 step away)** |
| Vercel env var (`NEXT_PUBLIC_BASE_URL`) | ❌ Not set in production | **Yes** |
| Custom domain on Vercel | ❌ Not configured | **Yes** |
| Enriched school descriptions (73 schools) | ⏳ Scraping project in progress | No |
| TypeScript | ✅ Zero errors | No |
