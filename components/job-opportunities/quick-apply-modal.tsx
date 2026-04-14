"use client"

import { useState } from "react"
import { X, Briefcase, MapPin, Calendar } from "lucide-react"
import type { Job } from "@/lib/job-data"
import { JobApplicationForm } from "./job-application-form"

interface QuickApplyModalProps {
  job: Job
  isOpen: boolean
  onClose: () => void
}

export function QuickApplyModal({ job, isOpen, onClose }: QuickApplyModalProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  if (!isOpen) return null

  const handleCloseAttempt = () => {
    setShowConfirmDialog(true)
  }

  const handleConfirmClose = () => {
    setShowConfirmDialog(false)
    onClose()
  }

  const handleCancelClose = () => {
    setShowConfirmDialog(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/50 overflow-y-auto py-10">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={handleCloseAttempt}
      />

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="fixed inset-0 bg-black/30" onClick={handleCancelClose} />
          <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-sm mx-4 z-[61]">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Confirmation</h4>
            <p className="text-sm text-red-600 mb-6">
              Are you sure you want to close? All the unsaved data will be lost.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleConfirmClose}
                className="px-6 py-2 bg-[#8B4513] hover:bg-[#6b3410] text-white text-sm font-medium rounded-full transition-colors"
              >
                OK
              </button>
              <button
                onClick={handleCancelClose}
                className="px-6 py-2 bg-[#DEB887] hover:bg-[#c9a476] text-gray-800 text-sm font-medium rounded-full transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <div className="relative bg-white w-full max-w-6xl mx-4 rounded-sm shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={handleCloseAttempt}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 z-10 transition-colors"
        >
          <X className="w-4 h-4" />
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
            <JobApplicationForm onClose={onClose} onCloseAttempt={handleCloseAttempt} showCloseButton={true} />
          </div>
        </div>
      </div>
    </div>
  )
}
