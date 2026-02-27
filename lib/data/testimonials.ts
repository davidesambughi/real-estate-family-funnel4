/**
 * lib/data/testimonials.ts
 * Re-export layer — canonical source remains lib/testimonials-data.ts until full migration.
 * Consumers should import from 'lib/data' (barrel) or directly from here.
 */
export {
  featuredTestimonials,
  supportingTestimonials,
  getTestimonialT,
} from "../testimonials-data";
export type { Testimonial } from "../testimonials-data";
