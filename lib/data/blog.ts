/**
 * lib/data/blog.ts
 * Re-export layer — canonical source remains lib/blog-data.ts until full migration.
 * Consumers should import from 'lib/data' (barrel) or directly from here.
 */
export { blogArticles, getBlogArticle } from "../blog-data";
export type { BlogArticle, BlogSection } from "../blog-data";
