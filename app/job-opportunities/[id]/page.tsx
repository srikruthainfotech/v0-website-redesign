import { notFound } from "next/navigation"
import { MapPin, Calendar, Users } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JobApplicationForm } from "@/components/job-opportunities/job-application-form"
import { getJobById, getJobs } from "@/lib/job-data"

interface JobDetailPageProps {
  params: Promise<{ id: string }>
}

export const revalidate = 60 // Revalidate every 60 seconds

export async function generateStaticParams() {
  const jobs = await getJobs()
  return jobs.map((job) => ({
    id: job.id, // post_id is used as id
  }))
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params
  const job = await getJobById(id)

  if (!job) {
    notFound()
  }

  // Format the posted date
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    } catch {
      return dateStr
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-gray-50 rounded-sm p-5">
            {/* Job Title */}
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
              Post ID: {job.postId}. {job.title}
            </h2>

            {/* Job Details Row */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{job.numberOfOpenings} Opening{job.numberOfOpenings !== 1 ? "s" : ""}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Posted {formatDate(job.postedDate)}</span>
              </div>
            </div>

            {/* Job Details Sections */}
            <div className="mb-8 space-y-6">
              {/* Job Duties */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Duties</h3>
                <p className="text-sm text-gray-700 whitespace-pre-line">{job.jobDuties}</p>
              </div>

              {/* Education */}
              {job.education && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Education</h3>
                  <p className="text-sm text-gray-700">{job.education}</p>
                </div>
              )}

              {/* Experience */}
              {job.experience && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Experience</h3>
                  <p className="text-sm text-gray-700">{job.experience}</p>
                </div>
              )}

              {/* Posted By */}
              {job.postedBy && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Posted By</h3>
                  <p className="text-sm text-gray-700">{job.postedBy}</p>
                </div>
              )}
            </div>

            {/* Application Form */}
            <div className="border-t border-gray-200 pt-6">
              <JobApplicationForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
