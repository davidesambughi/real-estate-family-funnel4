"use server";

// This is a server actions file
// Re-export actions from lib/actions for backward compatibility
export { submitLead } from "@/lib/actions";
export type { State } from "@/lib/actions";
