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

      {/* Hero Section */}
      <section
        className="relative h-48 md:h-56"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-image-%20top-01%20-d0DVfkB38tDfCiDMxUg4Okp1gqN6Ps.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Job Opportunities
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-gray-50 rounded-md p-6 md:p-8">
            {/* Job Title */}
            <h2 className="text-xl md:text-2xl font-semibold text-blue-600 mb-4">
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
              <ul className="space-y-2">
                {job.qualifications.map((qual, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-600">
                    <span className="text-red-500 mr-2">*</span>
                    <span>{qual}</span>
                  </li>
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
