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
  id: number
  post_id: string
  posting_date: string
  position: string | null
  number_of_openings: number | null
  job_role: string | null
  job_type: string | null
  job_description: string | null
  location: string | null
  job_duties: string | null
  education: string | null
  experience: string | null
  posted_by: string | null
  designation: string | null
  status?: string
  created_at: string
}

export type JobApplication = {
  id: number
  name: string
  email: string
  phone: string
  cover_letter: string | null
  resume_url: string | null
  post_id: string | null
  created_at: string
}

export type UserManagement = {
  id: number
  user_id: string
  username: string
  first_name: string
  last_name: string
  employee_id: string
  password: string
  start_date: string
  end_date: string | null
  created_at: string
}
