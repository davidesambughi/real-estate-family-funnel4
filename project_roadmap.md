# TrustFamily Relocation Platform - Implementation Roadmap

- [ ] **Phase 1: Critical Infrastructure & Multilingual Core (Priority)**
  - [ ] **Infrastructure Audit**: Verify `next-intl` setup on existing pages (`/schools`, `/neighborhoods`, `/guide`). <!-- id: 8 -->
  - [ ] **Localized Routing**: Ensure correct slug handling: Path segments translated (e.g., `/pt/escolas`), but **School Slugs stay English** for LLM consistency. <!-- id: 9 -->
  - [ ] **SEO Metadata Strategy**: Implement dynamic `generateMetadata` for all locales with "Trust" keywords. <!-- id: 10 -->
  - [ ] **Geo-Location Schemas**: Add `Organization` and `Place` schemas formatted in the **Page Language**. <!-- id: 11 -->
  - [ ] **Language Switcher Logic**: Sticky, Flags+Code, Cookie preference, Redirects to equivalent path. <!-- id: 23 -->

- [ ] **Phase 2: Trust-First UI Components ("Calm Authority")**
  - [ ] **Component: Trust Bar**: Create `TrustBar.tsx` (Independent data, updated date). <!-- id: 12 -->
  - [ ] **Component: Methodology Badge**: Create `MethodologyBadge.tsx` for school/neighborhood cards. <!-- id: 13 -->
  - [ ] **Component: Language Switcher**: Build the UI (Dropdown with Flag Icons + Code). <!-- id: 24 -->
  - [ ] **Hero Refactor**: Implement "Split Strategy" (Deep Image for Desktop, Gradient/Text-First for Mobile). <!-- id: 14 -->
  - [ ] **Navigation Trust**: Update Header/Footer with authority links and integrate Language Switcher. <!-- id: 15 -->

- [ ] **Phase 3: Interactive Intelligence (Engagement)**
  - [ ] **Component: Soft-Landing Quiz**: Create the skeleton for the "Find Your Perfect Fit" quiz (Lead Magnet). <!-- id: 16 -->
  - [ ] **Component: Map Strategy**:
    - [ ] `SchoolMap.tsx`: "Commute Validator" placeholder logic. <!-- id: 17 -->
    - [ ] `NeighborhoodMap.tsx`: "Amenity Radar" placeholder logic. <!-- id: 18 -->

- [ ] **Phase 4: Content Structure & SEO Optimization**
  - [ ] **Translation Rules Enforcement**:
    - [ ] **Translate**: UI Labels, Descriptions, FAQ, Answer Capsules.
    - [ ] **Keep English**: School Names, Curriculum Names (IB/British), Visas (D7/D8), Fees.
  - [ ] **Homepage Microcopy**: Implement H1/H2 hierarchy with "Relocation Overwhelm" solution focus. <!-- id: 19 -->
  - [ ] **School Page Structure**: Add sections for "The Verdict" and "Parent Whisper" (Placeholders). <!-- id: 20 -->
  - [ ] **Neighborhood Page Structure**: Add "Commute Context" and "Vibe Verification" tags (Placeholders). <!-- id: 21 -->
  - [ ] **Contextual CTAs**: Insert "Download Fee Structure" buttons inside school cards. <!-- id: 22 -->
