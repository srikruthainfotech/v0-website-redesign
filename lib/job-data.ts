import { supabase, type JobOpening } from "./supabase"

export interface Job {
  id: string
  postId: string
  title: string
  type: string
  location: string
  postedDate: string
  category: string
  description: string
  qualifications: string[]
}

// Transform database row to Job interface
function transformJobOpening(row: JobOpening): Job {
  return {
    id: row.id.toString(),
    postId: row.post_id,
    title: row.title,
    type: row.type,
    location: row.location,
    postedDate: row.posted_date,
    category: row.category,
    description: row.description,
    qualifications: row.qualifications || [],
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

// Fetch a single job by ID from Supabase
export async function getJobById(id: string): Promise<Job | null> {
  const { data, error } = await supabase
    .from("job_openings")
    .select("*")
    .eq("id", parseInt(id, 10))
    .single()

  if (error) {
    console.error("Error fetching job:", error)
    return null
  }

  return data ? transformJobOpening(data) : null
}

// Fetch distinct categories from Supabase
export async function getCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from("job_openings")
    .select("category")

  if (error) {
    console.error("Error fetching categories:", error)
    return ["All Categories"]
  }

  const uniqueCategories = [...new Set((data || []).map((row) => row.category))]
  return ["All Categories", ...uniqueCategories]
}

// Fetch distinct job types from Supabase
export async function getJobTypes(): Promise<string[]> {
  const { data, error } = await supabase
    .from("job_openings")
    .select("type")

  if (error) {
    console.error("Error fetching job types:", error)
    return ["All Types"]
  }

  const uniqueTypes = [...new Set((data || []).map((row) => row.type))]
  return ["All Types", ...uniqueTypes]
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

  const uniqueLocations = [...new Set((data || []).map((row) => row.location))]
  return ["All Locations", ...uniqueLocations]
}

// Static fallback data for filters (used as defaults)
export const categories = ["All Categories", "Engineering", "Design", "Marketing", "Sales", "Support"]
export const jobTypes = ["All Types", "Full-time", "Part-time", "Contract", "Remote"]
export const locations = ["All Locations", "USA", "India", "UK", "Remote"]
