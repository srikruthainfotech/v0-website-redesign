import { notFound } from "next/navigation"
import { Briefcase, MapPin, Calendar } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JobApplicationForm } from "@/components/job-opportunities/job-application-form"
import { supabase, type JobOpening } from "@/lib/supabase"

interface JobDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function JobDetailPage({
  params,
}: JobDetailPageProps) {

  const { id } = await params

  // FETCH SINGLE JOB FROM DB
  const { data, error } = await supabase
    .from("job_openings")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !data) {
    notFound()
  }

  const job: JobOpening = data

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
                <span>{job.job_type}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Posted {job.posting_date}</span>
              </div>
            </div>
            {/* Job Posting Notice */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-center text-black mb-8">
                JOB POSTING NOTICE
              </h3>
              <div className="border border-gray-300 p-6 text-sm text-black space-y-6">
                {[
                  ["POSITION", job.position],
                  ["NUMBER OF OPENINGS", job.number_of_openings],
                  ["LOCATION", job.location],
                  ["JOB DUTIES", job.job_duties],
                  ["EDUCATION", job.education],
                  ["EXPERIENCE", job.experience],
                  ["POSTED BY", job.posted_by],
                  ["DESIGNATION", job.designation],
                ].map(([label, value], index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[220px_20px_1fr] gap-4"
                  >
                    {/* Left Label */}
                    <div className="font-bold uppercase whitespace-pre-line">
                      {label}
                    </div>
                    {/* Colon */}
                    <div className="font-bold text-center">
                      :
                    </div>

                    {/* Right Value */}
                    <div className="leading-7 break-words whitespace-pre-line">
                      {value || ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Form */}
            <div className="border-t border-gray-200 pt-6">
              <JobApplicationForm postId={job.post_id} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
