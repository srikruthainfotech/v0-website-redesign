"use client"

import { X } from "lucide-react"
import type { JobOpening } from "@/lib/supabase"

interface PrintJobNoticeDetailProps {
  job: JobOpening
  isOpen: boolean
  onClose: () => void
}

export function PrintJobNoticeDetail({ job, isOpen, onClose }: PrintJobNoticeDetailProps) {
  if (!isOpen) return null

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/50 overflow-y-auto py-10">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-4xl mx-4 rounded-sm shadow-xl max-h-[90vh] overflow-y-auto no-print">
        {/* Header with buttons */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between no-print">
          <h3 className="text-lg font-semibold text-gray-900">
            Print Job Notice
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white text-sm font-medium rounded-md transition-colors no-print"
            >
              Print
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors no-print"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Document Content */}
        <div className="px-6 py-8 bg-white print:p-0">
          {/* PAGE 1 */}
          <div className="page-break pb-8 print:pb-0">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-lg font-bold text-gray-900">
                IMMENSE BRAINS
              </h1>
              <p className="text-sm text-gray-600">
                IT Consulting and Development Services
              </p>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-center text-black mb-12">
              JOB POSTING NOTICE
            </h2>

            {/* Posting Date - Top Right */}
            <div className="text-right mb-8 text-sm text-gray-700">
              <p>Posting Date: {job.posting_date}</p>
            </div>

            {/* Page 1 Content */}
            <div className="space-y-4 text-sm text-gray-900">
              <div className="grid grid-cols-[200px_20px_1fr] gap-4 items-start">
                <span className="font-bold">POSITION</span>
                <span className="font-bold">:</span>
                <span>{job.position || "N/A"}</span>
              </div>

              <div className="grid grid-cols-[200px_20px_1fr] gap-4 items-start">
                <span className="font-bold">NUMBER OF<br/>OPENINGS</span>
                <span className="font-bold">:</span>
                <span>{job.number_of_openings || "N/A"}</span>
              </div>

              <div className="grid grid-cols-[200px_20px_1fr] gap-4 items-start">
                <span className="font-bold">LOCATION</span>
                <span className="font-bold">:</span>
                <span>{job.location || "N/A"}</span>
              </div>

              <div className="grid grid-cols-[200px_20px_1fr] gap-4 items-start">
                <span className="font-bold">JOB TYPE</span>
                <span className="font-bold">:</span>
                <span>{job.job_type || "N/A"}</span>
              </div>

              <div className="grid grid-cols-[200px_20px_1fr] gap-4 items-start">
                <span className="font-bold">POSTED BY</span>
                <span className="font-bold">:</span>
                <span>{job.posted_by || "N/A"}</span>
              </div>

              <div className="grid grid-cols-[200px_20px_1fr] gap-4 items-start">
                <span className="font-bold">DESIGNATION</span>
                <span className="font-bold">:</span>
                <span>{job.designation || "N/A"}</span>
              </div>
            </div>

            {/* Page break marker */}
            <div className="page-break-after print:page-break-after-always"></div>
          </div>

          {/* PAGE 2 */}
          <div className="page-break pb-8 print:pb-0 print:page-break-before-always">
            <h2 className="text-3xl font-bold text-center text-black mb-8">
              JOB POSTING NOTICE
            </h2>

            <div className="text-right mb-8 text-sm text-gray-700">
              <p>Posting Date: {job.posting_date}</p>
            </div>

            <div className="mb-4">
              <h3 className="font-bold text-gray-900 mb-4">JOB DUTIES</h3>
              <div className="text-sm text-gray-900 leading-7 whitespace-pre-line break-words">
                {job.job_duties || "N/A"}
              </div>
            </div>

            <div className="mt-20 text-center text-xs text-gray-500">
              Page 2 of 4
            </div>
          </div>

          {/* PAGE 3 */}
          <div className="page-break pb-8 print:pb-0 print:page-break-before-always">
            <h2 className="text-3xl font-bold text-center text-black mb-8">
              JOB POSTING NOTICE
            </h2>

            <div className="text-right mb-8 text-sm text-gray-700">
              <p>Posting Date: {job.posting_date}</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-4">EDUCATION</h3>
                <div className="text-sm text-gray-900 leading-7 whitespace-pre-line break-words">
                  {job.education || "N/A"}
                </div>
              </div>

              <div className="mt-12">
                <h3 className="font-bold text-gray-900 mb-4">EXPERIENCE</h3>
                <div className="text-sm text-gray-900 leading-7 whitespace-pre-line break-words">
                  {job.experience || "N/A"}
                </div>
              </div>
            </div>

            <div className="mt-20 text-center text-xs text-gray-500">
              Page 3 of 4
            </div>
          </div>

          {/* PAGE 4 */}
          <div className="page-break pb-8 print:pb-0 print:page-break-before-always">
            <h2 className="text-3xl font-bold text-center text-black mb-12">
              JOB POSTING NOTICE
            </h2>

            <div className="text-right mb-12 text-sm text-gray-700">
              <p>Posting Date: {job.posting_date}</p>
            </div>

            <div className="text-center space-y-6 mb-20">
              <h3 className="text-lg font-bold text-gray-900">
                RECRUITMENT NOTICE
              </h3>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-900">
                  Immense Brains
                </p>
                <p className="text-sm text-gray-700">
                  Recruitment Department
                </p>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-6">
              <p className="text-xs text-gray-600 text-center leading-6">
                <strong>Declaration:</strong><br />
                This document is generated from the official job posting system of Immense Brains.
                All information contained herein is accurate and reflects the current job opening requirements.
              </p>
            </div>

            <div className="mt-20 text-center text-xs text-gray-500">
              Page 4 of 4
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          @page {
            size: A4 portrait;
            margin: 15mm;
          }

          body {
            margin: 0;
            padding: 0;
          }

          .no-print {
            display: none !important;
          }

          .page-break {
            page-break-after: always;
            break-after: page;
          }

          .print\\:page-break-before-always {
            page-break-before: always;
          }

          .print\\:page-break-after-always {
            page-break-after: always;
          }

          .print\\:pb-0 {
            padding-bottom: 0 !important;
          }

          .print\\:p-0 {
            padding: 0 !important;
          }

          .print\\:page-break-before-always {
            page-break-before: always !important;
          }

          .print\\:page-break-after-always {
            page-break-after: always !important;
          }

          h1, h2, h3, h4, h5, h6 {
            page-break-after: avoid;
            page-break-inside: avoid;
          }

          p {
            page-break-inside: avoid;
          }

          div {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  )
}
