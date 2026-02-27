/**
 * lib/data/schools.ts
 * Re-export layer — canonical source remains lib/schools-data.ts until full migration.
 * Consumers should import from 'lib/data' (barrel) or directly from here.
 */
export { schoolsData, getSchoolT } from "../schools-data";
export type { School } from "../schools-data";
