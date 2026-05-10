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
  // Build qualifications array from education and experience
  const qualifications: string[] = []
  if (row.education) {
    qualifications.push(`Education: ${row.education}`)
  }
  if (row.experience) {
    qualifications.push(`Experience: ${row.experience}`)
  }
  if (row.job_duties) {
    // Split job duties by newlines or periods to create list items
    const duties = row.job_duties.split(/[\n]+/).filter(d => d.trim())
    qualifications.push(...duties)
  }

  return {
    id: row.post_id,
    postId: row.post_id,
    title: row.position,
    type: row.designation || "Full-time", // Use designation as type
    location: row.location,
    postedDate: formatDate(row.posting_date),
    category: row.designation || "General", // Use designation as category
    description: row.job_duties ? row.job_duties.substring(0, 200) + (row.job_duties.length > 200 ? "..." : "") : "",
    qualifications,
  }
}

// Format date to relative time
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 1) return "Today"
  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
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

// Static filter arrays - these match original UI exactly
export const categories = ["All Categories", "Engineering", "Design", "Marketing", "Sales", "Support"]
export const jobTypes = ["All Types", "Full-time", "Part-time", "Contract", "Remote"]
export const locations = ["All Locations", "USA", "India", "UK", "Remote"]
