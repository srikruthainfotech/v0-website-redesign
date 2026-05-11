import { notFound } from "next/navigation"
import { Briefcase, MapPin, Calendar } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JobApplicationForm } from "@/components/job-opportunities/job-application-form"
import { getJobById } from "@/lib/job-data"

interface JobDetailPageProps {
  params: Promise<{ id: string }>
}


export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params
  const job = await getJobById(id)

  if (!job) {
    notFound()
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
              Post ID: {job.post_id}. {job.position}
            </h2>

            {/* Job Details Row */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                <span>Full-time</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  Posted {new Date(job.posting_date).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="space-y-6 mb-8">

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  JOB DUTIES
                </h3>

                <p className="text-sm text-gray-700 leading-relaxed">
                  {job.job_duties}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  EDUCATION
                </h3>

                <p className="text-sm text-gray-700 leading-relaxed">
                  {job.education}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  EXPERIENCE
                </h3>

                <p className="text-sm text-gray-700 leading-relaxed">
                  {job.experience}
                </p>
              </div>

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
