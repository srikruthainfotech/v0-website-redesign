"use client"

import { useState } from "react"
import { X, Briefcase, MapPin, Calendar, Printer } from "lucide-react"
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

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/50 overflow-y-auto py-10 print:p-0 print:bg-white print:overflow-visible print:static print:block">
      {/* Overlay - hidden in print */}
      <div
        className="fixed inset-0 bg-black/50 print:hidden"
        onClick={handleCloseAttempt}
      />

      {/* Confirmation Dialog - hidden in print */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 print:hidden">
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
      <div className="relative bg-white w-full max-w-6xl mx-4 rounded-sm shadow-xl max-h-[90vh] overflow-y-auto print:max-w-none print:mx-0 print:rounded-none print:shadow-none print:max-h-none print:overflow-visible">
        {/* Close button - hidden in print */}
        <button
          onClick={handleCloseAttempt}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 z-10 transition-colors print:hidden"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="px-6 py-4 print:px-0 print:py-0">
          {/* Print Header - only visible in print */}
          <div className="hidden print:block print:text-center print:text-sm print:font-bold print:mb-6">
            Immense Brains - IT Consulting and Development Services
          </div>

          {/* Job Title - hidden in print */}
          <h3 className="text-base font-semibold text-gray-900 mb-3 print:hidden">
            Post ID: {job.postId}. {job.title}
          </h3>

          {/* Job Details Row - hidden in print */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-4 print:hidden">
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

          {/* Print Job Notice Button - hidden in print */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors mb-6 print:hidden"
          >
            <Printer className="w-4 h-4" />
            Print Job Notice
          </button>

          {/* Job Posting Notice - this section prints */}
          <div className="mb-6 print:mb-0" id="job-posting-notice">

            <h3 className="text-2xl font-bold text-center text-black mb-8 print:text-xl print:mb-6">
              JOB POSTING NOTICE
            </h3>

            <div className="border border-gray-300 p-6 text-sm text-black space-y-6 print:border-gray-400 print:p-8">

              {job.qualifications.map((qual, index) => {

                const [label, ...valueParts] = qual.split(":")
                const value = valueParts.join(":").trim()

                const formattedLabel =
                  label === "NUMBER OF OPENINGS"
                    ? "NUMBER OF\nOPENINGS:"
                    : `${label}:`

                const isLastMainField =
                  label === "EXPERIENCE"

                const isInlineField =
                  label === "POSTED BY" || label === "DESIGNATION"

                return (
                  <div key={index}>

                    <div
                      className={
                        isInlineField
                          ? "flex items-center gap-2"
                          : "grid grid-cols-[220px_minmax(0,1fr)] items-start print:grid-cols-[180px_minmax(0,1fr)]"
                      }
                    >

                      {/* LABEL */}
                      <div className="font-bold uppercase whitespace-pre-line leading-6">
                        {formattedLabel}
                      </div>

                      <div
                        className={
                          isInlineField
                            ? "leading-6"
                            : "leading-6 break-words text-justify"
                        }
                      >
                        {value}
                      </div>

                    </div>

                    {/* LINE AFTER EXPERIENCE */}
                    {isLastMainField && (
                      <div className="border-t border-gray-300 mt-8 print:border-gray-400"></div>
                    )}

                  </div>
                )
              })}

            </div>

          </div>
          {/* Application Form - hidden in print */}
          <div className="border-t border-gray-200 pt-4 print:hidden">
            <JobApplicationForm postId={job.postId} onClose={onClose} onCloseAttempt={handleCloseAttempt} showCloseButton={true} />
          </div>
        </div>
      </div>
    </div>
  )
}
