import { z } from "zod";

export const leadSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name must be 100 characters or fewer." }),

  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .max(254, { message: "Email address is too long." }), // RFC 5321 max

  nationality: z
    .string()
    .min(2, { message: "Nationality is required." })
    .max(100, { message: "Nationality must be 100 characters or fewer." }),

  // Allows digits, spaces, +, -, (, ), . — rejects scripts/SQL
  phone: z
    .string()
    .max(30, { message: "Phone number is too long." })
    .regex(/^[+\d\s\-(). ]*$/, { message: "Phone number contains invalid characters." })
    .optional()
    .or(z.literal("")),

  // Max length only — allowlist validation happens in the Server Action
  // against the live schoolsData / neighborhoodsData arrays
  interestedSchool: z.string().max(200).optional(),
  interestedNeighborhood: z.string().max(200).optional(),

  message: z
    .string()
    .max(2000, { message: "Message must be 2000 characters or fewer." })
    .optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;
