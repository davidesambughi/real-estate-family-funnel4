import { z } from "zod";

export const leadSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.email({ message: "Please enter a valid email address." }),
  nationality: z.string().min(2, { message: "Nationality is required." }),
  phone: z.string().optional(),
  interestedSchool: z.string().optional(),
  interestedNeighborhood: z.string().optional(),
  message: z.string().optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;
