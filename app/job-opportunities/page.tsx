"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JobSearchFilter } from "@/components/job-opportunities/job-search-filter"
import { JobCard } from "@/components/job-opportunities/job-card"
import { jobs } from "@/lib/job-data"

export default function JobOpportunitiesPage() {
  const [filteredJobs, setFilteredJobs] = useState(jobs)

  const handleSearch = (filters: {
    keywords: string
    category: string
    jobType: string
    location: string
  }) => {
    let results = jobs

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
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-48 md:h-56"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-image-%20top-01%20-d0DVfkB38tDfCiDMxUg4Okp1gqN6Ps.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0">
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full h-full flex items-center">
            <div className="w-full md:w-1/2 flex items-center pl-6 md:pl-23">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Job Opportunities
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Search Filter */}
          <div className="mb-6">
            <JobSearchFilter onSearch={handleSearch} />
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
        </div>
      </main>

      <Footer />
    </div>
  )
}
