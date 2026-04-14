"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JobSearchFilter } from "@/components/job-opportunities/job-search-filter"
import { JobCard } from "@/components/job-opportunities/job-card"
import { jobs } from "@/lib/job-data"
import { ArrowRight, Briefcase, Users, TrendingUp, Award, Zap } from "lucide-react"
import Link from "next/link"

const whyJoinUs = [
  {
    icon: Briefcase,
    title: "Top Clients",
    description: "Work with top clients across multiple industries",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Continuous learning and career development opportunities",
  },
  {
    icon: Users,
    title: "Inclusive Culture",
    description: "Collaborative and inclusive work culture",
  },
  {
    icon: Award,
    title: "Great Benefits",
    description: "Competitive compensation and benefits",
  },
  {
    icon: Zap,
    title: "Cutting-Edge Tech",
    description: "Exposure to cutting-edge technologies and projects",
  },
]

const openRoles = [
  "Recruitment Specialist",
  "Talent Acquisition Executive",
  "HR Coordinator",
  "Business Development Executive",
  "Account Manager",
]

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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-64 md:h-80"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-image-%20top-01%20-d0DVfkB38tDfCiDMxUg4Okp1gqN6Ps.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#0a1628]/70">
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full h-full flex flex-col justify-center">
            <div className="max-w-2xl pl-2 md:pl-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Careers at Our Company
              </h1>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                Build your future with a team that connects talent with opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              We are a leading staffing solutions company dedicated to bridging the gap between 
              exceptional talent and top organizations. At our core, we believe people are the 
              driving force behind innovation and success. Join us to be part of a dynamic, 
              growth-focused environment where your skills make a real impact.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Why Join Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {whyJoinUs.map((item, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-[#0066ff]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-[#0066ff]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section className="py-12 md:py-16 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Open Roles
          </h2>
          <p className="text-lg text-gray-300 text-center mb-10">
            Explore opportunities in areas like:
          </p>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {openRoles.map((role, index) => (
              <span 
                key={index}
                className="bg-white/10 text-white px-5 py-3 rounded-full text-base font-medium border border-white/20 hover:bg-white/20 transition-colors"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-[#0066ff] to-[#0052cc]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Join our team and grow your career with us
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Explore open positions and take the next step toward success.
          </p>
          <Link 
            href="#open-positions"
            className="inline-flex items-center gap-2 bg-white text-[#0066ff] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            View Open Positions
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Job Listings Section */}
      <main id="open-positions" className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">
            Current Openings
          </h2>
          
          {/* Search Filter */}
          <div className="mb-8">
            <JobSearchFilter onSearch={handleSearch} />
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500 text-lg">
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
