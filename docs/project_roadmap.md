# TrustFamily Relocation Platform - Implementation Roadmap

- [ ] **Phase 1: Critical Infrastructure & Multilingual Core (Priority)**
  - [ ] **Infrastructure Audit**: Verify `next-intl` setup on existing pages (`/schools`, `/neighborhoods`, `/guide`).
  - [ ] **Localized Routing**: Ensure correct slug handling for SEO (e.g., `/en/schools` vs `/pt/escolas`).
  - [ ] **SEO Metadata Strategy**: Implement dynamic `generateMetadata` for all locales with "Trust" keywords.
  - [ ] **Geo-Location Schemas**: Add `Organization` and `Place` schemas for SEO authority.

- [ ] **Phase 2: Trust-First UI Components ("Calm Authority")**
  - [ ] **Component: Trust Bar**: Create `TrustBar.tsx` (Independent data, updated date).
  - [ ] **Component: Methodology Badge**: Create `MethodologyBadge.tsx` for school/neighborhood cards.
  - [ ] **Hero Refactor**: Implement "Split Strategy" (Deep Image for Desktop, Gradient/Text-First for Mobile).
  - [ ] **Navigation Trust**: Update Header/Footer with authority links (About/Methodology).

- [ ] **Phase 3: Interactive Intelligence (Engagement)**
  - [ ] **Component: Soft-Landing Quiz**: Create the skeleton for the "Find Your Perfect Fit" quiz (Lead Magnet).
  - [ ] **Component: Map Strategy**:
    - [ ] `SchoolMap.tsx`: "Commute Validator" placeholder logic.
    - [ ] `NeighborhoodMap.tsx`: "Amenity Radar" placeholder logic.

- [ ] **Phase 4: Content Structure & SEO Optimization**
  - [ ] **Homepage Microcopy**: Implement H1/H2 hierarchy with "Relocation Overwhelm" solution focus.
  - [ ] **School Page Structure**: Add sections for "The Verdict" and "Parent Whisper" (Placeholders).
  - [ ] **Neighborhood Page Structure**: Add "Commute Context" and "Vibe Verification" tags (Placeholders).
  - [ ] **Contextual CTAs**: Insert "Download Fee Structure" buttons inside school cards.
