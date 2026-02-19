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

  const data = validatedFields.data;

  // ─────────────────────────────────────────────────────────────────────────────
  // TODO (P7): Replace the section below with your preferred CRM/email integration.
  //
  // Option A — Resend (recommended for transactional email):
  //   import { Resend } from 'resend';
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({ from: 'leads@trustfamily.com', to: 'team@trustfamily.com', ... });
  //
  // Option B — Supabase (recommended if you need a leads database):
  //   import { createClient } from '@supabase/supabase-js';
  //   const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
  //   await supabase.from('leads').insert([data]);
  //
  // Option C — HubSpot CRM API:
  //   POST https://api.hubapi.com/crm/v3/objects/contacts  { properties: { ...data } }
  //
  // Required env vars depending on option:
  //   RESEND_API_KEY, SUPABASE_URL, SUPABASE_ANON_KEY, HUBSPOT_API_KEY
  // ─────────────────────────────────────────────────────────────────────────────

  // Temporary: log to server console until CRM is integrated
  console.log('Lead received:', data); // Fixed typo: "recieved" → "received"

  return {
    success: true,
    message: 'Lead created successfully.',
  };
}
