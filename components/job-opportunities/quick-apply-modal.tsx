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
    <div className="fixed inset-0 z-50 flex justify-center bg-black/50 overflow-y-auto py-10">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-6xl mx-4 rounded-sm shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="px-6 py-4">
          {/* Job Title */}
          <h3 className="text-base font-semibold text-gray-900 mb-3">
            Post ID: {job.postId}. {job.title}
          </h3>

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
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              {job.qualifications.map((qual, index) => (
                <li key={index}>{qual}</li>
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
