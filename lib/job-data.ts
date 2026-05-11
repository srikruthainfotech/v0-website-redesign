import { supabase } from "@/lib/supabase"

export interface Job {
  id: number
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
}

export async function getJobs(): Promise<Job[]> {
  const { data, error } = await supabase
    .from("job_openings")
    .select("*")
    .order("id", { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data || []
}

export async function getJobById(id: string): Promise<Job | null> {
  const { data, error } = await supabase
    .from("job_openings")
    .select("*")
    .eq("post_id", id)
    .single()

  if (error) {
    console.error(error)
    return null
  }

  return data
}

export const categories = ["All Categories"]
export const jobTypes = ["All Types"]
export const locations = ["All Locations"]