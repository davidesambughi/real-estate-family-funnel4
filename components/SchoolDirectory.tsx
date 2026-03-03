/**
 * SchoolDirectory — Client Component
 *
 * Renders the full school catalog (all 77 schools) with:
 * - Filter bar: region, curriculum, price range, language of instruction
 * - Compact 3-col mini-card grid (not the rich editorial card)
 * - Client-side pagination (12 per page — no extra HTTP requests)
 *
 * Data is passed as a serialised prop from SchoolsList (Server Component)
 * so the full JSON never ships to the browser bundle.
 *
 * Performance: ~5 kB of filtered item data per render, not the full schoolsData.
 */

"use client";

import { useState, useMemo } from "react";
import { Link } from "@/i18n/navigation";
import { MapPin, Coins, Users, Filter, X, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// ── Types ─────────────────────────────────────────────────────────────────────

export type SchoolDirectoryItem = {
  slug: string;
  name: string;
  location: string;
  /** Canonical region used for filtering (e.g. "Lisbon", "Algarve") */
  region: string;
  /** Full curriculum string for display (e.g. "British, IB Diploma") */
  curriculum: string;
  /** Normalised primary curriculum for filter matching (e.g. "British") */
  curriculumTag: string;
  fees: string;
  /** Numeric minimum annual fee for range filtering; null = "Contact school" */
  feesMin: number | null;
  ageRange: string | null;
  englishAsPrimary: boolean | null;
  /** true for the 4 hand-curated schools → shows "Featured" badge */
  isCurated: boolean;
  /** Extracurricular activities list from the raw JSON (null if not available) */
  extracurriculars: string[] | null;
  /** Official school website URL (null if not in dataset) */
  website: string | null;
  /** true when all 7 key profile fields are populated */
  isFullProfile: boolean;
};

type Filters = {
  region: string;
  curriculum: string;
  price: string;
  language: string;
};

// ── Constants ─────────────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 12;

// ── Main component ────────────────────────────────────────────────────────────

export function SchoolDirectory({ schools }: { schools: SchoolDirectoryItem[] }) {
  const [filters, setFilters] = useState<Filters>({
    region: "all",
    curriculum: "all",
    price: "all",
    language: "all",
  });
  const [page, setPage] = useState(1);

  // Derive unique values from data (stable unless schools prop changes)
  const regions = useMemo(() => {
    const set = new Set(schools.map((s) => s.region));
    return Array.from(set).sort();
  }, [schools]);

  const curricula = useMemo(() => {
    const set = new Set(schools.map((s) => s.curriculumTag));
    return Array.from(set).sort();
  }, [schools]);

  const isFiltered =
    filters.region !== "all" ||
    filters.curriculum !== "all" ||
    filters.price !== "all" ||
    filters.language !== "all";

  const filtered = useMemo(() => {
    return schools.filter((s) => {
      if (filters.region !== "all" && s.region !== filters.region) return false;
      if (filters.curriculum !== "all" && s.curriculumTag !== filters.curriculum) return false;
      if (filters.price !== "all") {
        const min = s.feesMin;
        if (filters.price === "under10k" && (min === null || min >= 10_000)) return false;
        if (filters.price === "10k-20k" && (min === null || min < 10_000 || min >= 20_000)) return false;
        if (filters.price === "over20k" && (min === null || min < 20_000)) return false;
        if (filters.price === "contact" && min !== null) return false;
      }
      if (filters.language === "english" && !s.englishAsPrimary) return false;
      return true;
    });
  }, [schools, filters]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  function updateFilter(key: keyof Filters, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // reset page whenever a filter changes
  }

  function clearFilters() {
    setFilters({ region: "all", curriculum: "all", price: "all", language: "all" });
    setPage(1);
  }

  return (
    <div>
      {/* ── Filter bar ── */}
      <div className="flex flex-wrap items-center gap-3 mb-5 p-4 bg-surface-subtle border border-border rounded-xl">
        <div className="flex items-center gap-1.5 shrink-0">
          <Filter className="h-4 w-4 text-ink-muted" />
          <span className="text-sm font-medium text-ink-primary">Filter:</span>
        </div>

        <select
          value={filters.region}
          onChange={(e) => updateFilter("region", e.target.value)}
          aria-label="Filter by region"
          className="text-sm border border-border rounded-lg px-3 py-1.5 bg-white text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand/20 cursor-pointer"
        >
          <option value="all">All regions</option>
          {regions.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <select
          value={filters.curriculum}
          onChange={(e) => updateFilter("curriculum", e.target.value)}
          aria-label="Filter by curriculum"
          className="text-sm border border-border rounded-lg px-3 py-1.5 bg-white text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand/20 cursor-pointer"
        >
          <option value="all">All curricula</option>
          {curricula.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={filters.price}
          onChange={(e) => updateFilter("price", e.target.value)}
          aria-label="Filter by annual fees"
          className="text-sm border border-border rounded-lg px-3 py-1.5 bg-white text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand/20 cursor-pointer"
        >
          <option value="all">Any price</option>
          <option value="under10k">Under €10,000 / yr</option>
          <option value="10k-20k">€10,000 – €20,000 / yr</option>
          <option value="over20k">Over €20,000 / yr</option>
          <option value="contact">Contact school</option>
        </select>

        <select
          value={filters.language}
          onChange={(e) => updateFilter("language", e.target.value)}
          aria-label="Filter by language of instruction"
          className="text-sm border border-border rounded-lg px-3 py-1.5 bg-white text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand/20 cursor-pointer"
        >
          <option value="all">Any language</option>
          <option value="english">English medium</option>
        </select>

        {isFiltered && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-ink-muted hover:text-ink-primary ml-auto transition-colors"
          >
            <X className="h-3.5 w-3.5" />
            Clear filters
          </button>
        )}
      </div>

      {/* ── Results count ── */}
      <p className="text-xs text-ink-muted mb-4">
        {filtered.length} {filtered.length === 1 ? "school" : "schools"}
        {isFiltered && ` (filtered from ${schools.length} total)`}
      </p>

      {/* ── School grid ── */}
      {paginated.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {paginated.map((school) => (
            <SchoolMiniCard key={school.slug} school={school} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-border rounded-xl">
          <p className="text-ink-muted mb-2 text-sm">No schools match your filters.</p>
          <button
            onClick={clearFilters}
            className="text-sm text-brand hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ← Previous
          </Button>
          <span className="text-sm text-ink-secondary tabular-nums">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next →
          </Button>
        </div>
      )}
    </div>
  );
}

// ── Compact mini-card ─────────────────────────────────────────────────────────

const MAX_EXTRACURRICULARS = 3;

function SchoolMiniCard({ school }: { school: SchoolDirectoryItem }) {
  const extraCount =
    school.extracurriculars && school.extracurriculars.length > MAX_EXTRACURRICULARS
      ? school.extracurriculars.length - MAX_EXTRACURRICULARS
      : 0;
  const visibleExtras = school.extracurriculars?.slice(0, MAX_EXTRACURRICULARS);

  return (
    <div className="group border border-border rounded-xl p-4 bg-card hover:border-brand/30 hover:shadow-sm transition-all flex flex-col h-full">
      {/* Top row: curriculum + status badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-brand-50 text-brand border border-brand/15">
          {school.curriculumTag}
        </span>
        {school.englishAsPrimary && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100">
            English
          </span>
        )}
        {school.isCurated && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-warm-light text-warm border border-warm/20">
            Featured
          </span>
        )}
        {/* Profile completeness badge — only for non-curated schools */}
        {!school.isCurated && (
          <span
            className={`ml-auto flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${
              school.isFullProfile
                ? "bg-green-50 text-green-700 border-green-100"
                : "bg-surface-subtle text-ink-muted border-border"
            }`}
            title={
              school.isFullProfile
                ? "All key profile fields are populated"
                : "Some profile fields are not publicly available"
            }
          >
            {school.isFullProfile ? (
              <CheckCircle2 className="h-3 w-3 shrink-0" />
            ) : (
              <AlertCircle className="h-3 w-3 shrink-0" />
            )}
            {school.isFullProfile ? "Full profile" : "Partial profile"}
          </span>
        )}
      </div>

      {/* Name */}
      <h3 className="font-semibold text-sm text-ink-primary leading-snug mb-1.5 flex-1 group-hover:text-brand transition-colors">
        {school.name}
      </h3>

      {/* Location */}
      <div className="flex items-center gap-1 text-xs text-ink-muted mb-3">
        <MapPin className="h-3 w-3 shrink-0" />
        <span>{school.location}</span>
      </div>

      {/* Key facts — only render rows with actual data */}
      <dl className="space-y-1 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-ink-secondary">
          <Coins className="h-3 w-3 text-warm shrink-0" />
          <span>{school.fees}</span>
        </div>
        {school.ageRange && (
          <div className="flex items-center gap-1.5 text-xs text-ink-muted">
            <Users className="h-3 w-3 shrink-0" />
            <span>Ages {school.ageRange}</span>
          </div>
        )}
      </dl>

      {/* Extracurriculars — only if available */}
      {visibleExtras && visibleExtras.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {visibleExtras.map((activity) => (
            <span
              key={activity}
              className="text-xs px-1.5 py-0.5 rounded bg-surface-subtle text-ink-muted border border-border"
            >
              {activity}
            </span>
          ))}
          {extraCount > 0 && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-surface-subtle text-ink-muted border border-border">
              +{extraCount} more
            </span>
          )}
        </div>
      )}

      {/* CTA: curated → internal profile page; non-curated → official website (if known) */}
      {school.isCurated ? (
        <Link
          href={{ pathname: "/schools/[slug]", params: { slug: school.slug } }}
          className="block w-full text-center text-xs font-medium text-brand border border-brand/25 rounded-lg py-2 hover:bg-brand-50 transition-colors"
        >
          View Profile →
        </Link>
      ) : school.website ? (
        <a
          href={school.website}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center text-xs font-medium text-brand border border-brand/25 rounded-lg py-2 hover:bg-brand-50 transition-colors"
        >
          Official Website →
        </a>
      ) : null}
    </div>
  );
}
