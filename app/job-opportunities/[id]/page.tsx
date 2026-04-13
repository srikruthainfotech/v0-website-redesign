import { notFound } from "next/navigation"
import { Briefcase, MapPin, Calendar } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JobApplicationForm } from "@/components/job-opportunities/job-application-form"
import { getJobById, jobs } from "@/lib/job-data"

interface JobDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return jobs.map((job) => ({
    id: job.id,
  }))
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params
  const job = getJobById(id)

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
              Post ID: {job.postId}. {job.title}
            </h2>

            {/* Job Details Row */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Posted {job.postedDate}</span>
              </div>
            </div>

            {/* Qualifications Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Qualifications</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                {job.qualifications.map((qual, index) => (
                  <li key={index}>{qual}</li>
                ))}
              </ul>
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
