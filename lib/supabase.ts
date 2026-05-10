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

export type JobOpening = {
  post_id: string
  posting_date: string
  position: string
  number_of_openings: number
  location: string
  job_duties: string
  education: string
  experience: string
  posted_by: string
  designation: string
  created_at: string
}
