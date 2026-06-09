"use client"

import { useState } from "react"
import type { JobOpening } from "@/lib/supabase"
import { PrintJobNoticeDetail } from "./print-job-notice-detail"

interface JobDetailClientProps {
  job: JobOpening
}

export function JobDetailClient({ job }: JobDetailClientProps) {
  const [isPrintOpen, setIsPrintOpen] = useState(false)

  return (
    <>
      {/* Job Posting Notice */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-center text-black flex-1">
            JOB POSTING NOTICE
          </h3>
          <button
            onClick={() => setIsPrintOpen(true)}
            className="px-4 py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white text-sm font-medium rounded-md transition-colors whitespace-nowrap ml-4"
          >
            Print Job Notice
          </button>
        </div>
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

      {/* Print Job Notice Modal */}
      <PrintJobNoticeDetail
        job={job}
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
      />
    </>
  )
}
