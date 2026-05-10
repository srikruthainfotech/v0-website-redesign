"use client"

import { useState } from "react"
import { JobSearchFilter } from "./job-search-filter"
import { JobCard } from "./job-card"
import type { Job } from "@/lib/job-data"

interface JobListingsProps {
  initialJobs: Job[]
  categories: string[]
  jobTypes: string[]
  locations: string[]
}

export function JobListings({ initialJobs, categories, jobTypes, locations }: JobListingsProps) {
  const [filteredJobs, setFilteredJobs] = useState(initialJobs)

  const handleSearch = (filters: {
    keywords: string
    category: string
    jobType: string
    location: string
  }) => {
    let results = initialJobs

    // Filter by keywords
    if (filters.keywords) {
      const keywords = filters.keywords.toLowerCase()
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(keywords) ||
          job.description.toLowerCase().includes(keywords)
      )
    }

    // Filter by category
    if (filters.category && filters.category !== "All Categories") {
      results = results.filter((job) => job.category === filters.category)
    }

    // Filter by job type
    if (filters.jobType && filters.jobType !== "All Types") {
      results = results.filter((job) => job.type === filters.jobType)
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
          categories={categories}
          jobTypes={jobTypes}
          locations={locations}
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
