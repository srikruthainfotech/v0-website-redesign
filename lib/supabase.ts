import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  process.env.NEXT_PUBLIC_immense_immenseSUPABASE_URL!,
  process.env.NEXT_PUBLIC_immense_immenseSUPABASE_ANON_KEY!
)

export type ContactUs = {
  id: number
  name: string
  email: string
  company: string | null
  subject: string
  message: string
  created_at: string
}

export type User = {
  id: number
  username: string
  password: string
}

export type TalentReferral = {
  id: number
  your_name: string
  your_email: string
  candidate_name: string
  candidate_email: string
  position: string
  location: string
  resume_url: string | null
  created_at: string
}
