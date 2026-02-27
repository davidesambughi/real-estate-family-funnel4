/**
 * lib/data/neighborhoods.ts
 * Re-export layer — canonical source remains lib/neighborhoods-data.ts until full migration.
 * Consumers should import from 'lib/data' (barrel) or directly from here.
 */
export { neighborhoodsData, getNeighborhoodT } from "../neighborhoods-data";
export type { Neighborhood } from "../neighborhoods-data";
