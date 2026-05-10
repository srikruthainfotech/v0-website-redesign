"use client"

import { useState } from "react"
import { JobSearchFilter } from "./job-search-filter"
import { JobCard } from "./job-card"
import type { Job } from "@/lib/job-data"

interface JobListingsProps {
  initialJobs: Job[]
  locations: string[]
  designations: string[]
}

export function JobListings({ initialJobs, locations, designations }: JobListingsProps) {
  const [filteredJobs, setFilteredJobs] = useState(initialJobs)

  const handleSearch = (filters: {
    keywords: string
    designation: string
    location: string
  }) => {
    let results = initialJobs

    // Filter by keywords
    if (filters.keywords) {
      const keywords = filters.keywords.toLowerCase()
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(keywords) ||
          job.jobDuties.toLowerCase().includes(keywords) ||
          job.postId.toLowerCase().includes(keywords)
      )
    }

    // Filter by designation
    if (filters.designation && filters.designation !== "All Designations") {
      results = results.filter((job) => job.designation === filters.designation)
    }

    // Filter by location
    if (filters.location && filters.location !== "All Locations") {
      results = results.filter((job) => job.location === filters.location)
    }

    setFilteredJobs(results)
  }

  return (
    <>
      {/* Search Filter */}
      <div className="mb-6">
        <JobSearchFilter 
          onSearch={handleSearch}
          locations={locations}
          designations={designations}
        />
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            No jobs found matching your criteria.
          </div>
        )}
      </div>
    </>
  )
}
