"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JobSearchFilter } from "@/components/job-opportunities/job-search-filter"
import { JobCard } from "@/components/job-opportunities/job-card"
import { jobs } from "@/lib/job-data"
import { Users, TrendingUp, Globe, Award } from "lucide-react"

export default function CareersPage() {
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

  const benefits = [
    {
      icon: Users,
      title: "Collaborative Culture",
      description: "Work alongside industry experts and talented professionals in a supportive team environment."
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Access continuous learning opportunities, certifications, and clear advancement paths."
    },
    {
      icon: Globe,
      title: "Global Opportunities",
      description: "Work with clients worldwide and gain exposure to diverse industries and technologies."
    },
    {
      icon: Award,
      title: "Competitive Benefits",
      description: "Enjoy comprehensive benefits including health coverage, flexible work arrangements, and more."
    }
  ]

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
                Careers
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0a1628] mb-4">
              Join Our Growing Team
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At Immense Brains, we connect exceptional talent with leading organizations worldwide. 
              As a premier staffing solutions company, we offer unique opportunities to work on 
              cutting-edge projects across diverse industries. Whether you&apos;re seeking full-time 
              positions, contract roles, or remote work, we have opportunities that match your skills 
              and career aspirations.
            </p>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0a1628] text-center mb-10">
            Why Build Your Career With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-[#00d4ff]" />
                </div>
                <h3 className="text-lg font-semibold text-[#0a1628] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <main className="flex-1 py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0a1628] text-center mb-8">
            Current Openings
          </h2>
          
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
