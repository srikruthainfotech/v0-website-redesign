"use client"

import { useState } from "react"
import Link from "next/link"
import { Briefcase, MapPin, Calendar } from "lucide-react"
import type { Job } from "@/lib/job-data"
import { QuickApplyModal } from "./quick-apply-modal"

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4 md:p-6">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
          {/* Job Title */}
          <h3 className="text-base font-semibold text-gray-900">
            Post ID: {job.postId}. <span className="font-bold">{job.title}</span>
          </h3>

          {/* Job Details */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
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
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          Qualifications {job.description}
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white text-sm font-medium rounded-md transition-colors"
          >
            Quick Apply
          </button>
          <Link
            href={`/job-opportunities/${job.id}`}
            className="px-5 py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white text-sm font-medium rounded-md transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>

      {/* Quick Apply Modal */}
      <QuickApplyModal
        job={job}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
