"use client"

import { X, Briefcase, MapPin, Calendar } from "lucide-react"
import type { Job } from "@/lib/job-data"
import { JobApplicationForm } from "./job-application-form"

interface QuickApplyModalProps {
  job: Job
  isOpen: boolean
  onClose: () => void
}

export function QuickApplyModal({ job, isOpen, onClose }: QuickApplyModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 pb-10 overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white w-full max-w-4xl mx-4 rounded-md shadow-xl my-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with background */}
        <div 
          className="relative h-32 rounded-t-md overflow-hidden"
          style={{
            backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-image-%20top-01%20-d0DVfkB38tDfCiDMxUg4Okp1gqN6Ps.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-blue-600/80" />
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          {/* Job Title */}
          <h2 className="text-xl font-semibold text-blue-600 mb-3">
            Post ID: {job.postId}. {job.title}
          </h2>

          {/* Job Details Row */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-4">
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

          {/* Qualifications */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Qualifications</h3>
            <ul className="space-y-1.5">
              {job.qualifications.map((qual, index) => (
                <li key={index} className="flex items-start text-sm text-gray-600">
                  <span className="text-red-500 mr-2">*</span>
                  <span>{qual}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Application Form */}
          <div className="border-t border-gray-200 pt-4">
            <JobApplicationForm onClose={onClose} showCloseButton={true} />
          </div>
        </div>
      </div>
    </div>
  )
}
