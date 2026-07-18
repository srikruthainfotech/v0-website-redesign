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
  roles?: string[]

  user_roles?: {
    role_id: number
    roles: {
      role_name: string
    } | null
  }[]
}

export type Tenant = {
  id: string
  tenant_code: string
  company_name: string
  domain: string
  start_date: string
  end_date: string | null
  created_at: string
  updated_at: string
}

export type TenantHistory = {
  id: string
  tenant_id: string
  tenant_code: string
  action_type: string
  old_data: any
  new_data: any
  changed_by: string
  changed_at: string
}

export type Partnership = {
  id: number
  tenant_id: string
  company_name: string
  company_email: string
  website: string | null
  phone: string | null
  country: string | null
  company_size: string | null
  industry: string | null
  address: string | null
  city: string | null
  first_name: string | null
  last_name: string | null
  designation: string | null
  business_email: string | null
  mobile_number: string | null
  linkedin: string | null
  partnership_type: string | null
  services_offered: string | null
  years_in_business: string | null
  number_of_employees: string | null
  countries_served: string | null
  major_clients: string | null
  certifications: string | null
  partnership_reason: string | null
  additional_notes: string | null
  agree_terms: boolean
  agree_privacy: boolean
  company_profile_url: string | null
  company_brochure_url: string | null
  created_at: string
}
