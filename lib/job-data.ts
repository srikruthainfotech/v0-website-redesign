import { supabase, type JobOpening } from "./supabase"

export interface Job {
  id: string // post_id used for routing
  postId: string
  title: string // position
  numberOfOpenings: number
  location: string
  postedDate: string // posting_date
  jobDuties: string
  education: string
  experience: string
  postedBy: string
  designation: string
}

// Transform database row to Job interface
function transformJobOpening(row: JobOpening): Job {
  return {
    id: row.post_id, // Use post_id for routing
    postId: row.post_id,
    title: row.position,
    numberOfOpenings: row.number_of_openings,
    location: row.location,
    postedDate: row.posting_date,
    jobDuties: row.job_duties,
    education: row.education,
    experience: row.experience,
    postedBy: row.posted_by,
    designation: row.designation,
  }
}

// Fetch all jobs from Supabase
export async function getJobs(): Promise<Job[]> {
  const { data, error } = await supabase
    .from("job_openings")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching jobs:", error)
    return []
  }

  return (data || []).map(transformJobOpening)
}

// Fetch a single job by post_id from Supabase
export async function getJobById(postId: string): Promise<Job | null> {
  const { data, error } = await supabase
    .from("job_openings")
    .select("*")
    .eq("post_id", postId)
    .single()

  if (error) {
    console.error("Error fetching job:", error)
    return null
  }

  return data ? transformJobOpening(data) : null
}

// Fetch distinct locations from Supabase
export async function getLocations(): Promise<string[]> {
  const { data, error } = await supabase
    .from("job_openings")
    .select("location")

  if (error) {
    console.error("Error fetching locations:", error)
    return ["All Locations"]
  }

  const uniqueLocations = [...new Set((data || []).map((row) => row.location).filter(Boolean))]
  return ["All Locations", ...uniqueLocations]
}

// Fetch distinct designations from Supabase (used as category/type filter)
export async function getDesignations(): Promise<string[]> {
  const { data, error } = await supabase
    .from("job_openings")
    .select("designation")

  if (error) {
    console.error("Error fetching designations:", error)
    return ["All Designations"]
  }

  const uniqueDesignations = [...new Set((data || []).map((row) => row.designation).filter(Boolean))]
  return ["All Designations", ...uniqueDesignations]
}

// Static fallback data for filters (used as defaults)
export const locations = ["All Locations"]
export const designations = ["All Designations"]
