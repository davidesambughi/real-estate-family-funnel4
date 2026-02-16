'use server';

import { z } from 'zod';
import { leadSchema } from '@/lib/schemas/lead-form';

export type State = {
  errors?: {
    [K in keyof z.infer<typeof leadSchema>]?: string[];
  };
  message?: string | null;
  success?: boolean;
};

export async function submitLead(prevState: State, formData: FormData): Promise<State> {
  // Validate fields using Zod
  const validatedFields = leadSchema.safeParse({
    fullName: formData.get('fullName'),
    email: formData.get('email'),
    nationality: formData.get('nationality'),
    phone: formData.get('phone'),
    interestedSchool: formData.get('interestedSchool'),
    interestedNeighborhood: formData.get('interestedNeighborhood'),
    message: formData.get('message'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Lead.',
      success: false,
    };
  }

  // Simulate storing data or sending email
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('Lead recieved:', validatedFields.data);

  return {
    success: true,
    message: 'Lead created successfully.',
  };
}
