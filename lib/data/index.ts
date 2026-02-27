/**
 * lib/data/index.ts — barrel export for all entity data.
 *
 * Usage:
 *   import { schoolsData, getSchoolT } from "@/lib/data"
 *   import { neighborhoodsData }       from "@/lib/data"
 *   import { blogArticles }            from "@/lib/data"
 *
 * Raw JSON sources live in lib/data/raw/ (never import directly — use typed wrappers above).
 */
export * from "./schools";
export * from "./neighborhoods";
export * from "./testimonials";
export * from "./blog";
