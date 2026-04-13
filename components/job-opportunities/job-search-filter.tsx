"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { categories, jobTypes, locations } from "@/lib/job-data"

interface JobSearchFilterProps {
  onSearch: (filters: {
    keywords: string
    category: string
    jobType: string
    location: string
  }) => void
}

export function JobSearchFilter({ onSearch }: JobSearchFilterProps) {
  const [keywords, setKeywords] = useState("")
  const [category, setCategory] = useState(categories[0])
  const [jobType, setJobType] = useState(jobTypes[0])
  const [location, setLocation] = useState(locations[0])

  const handleSearch = () => {
    onSearch({ keywords, category, jobType, location })
  }

  return (
    <div className="bg-gray-100 rounded-md p-6">
      {/* Keywords Input */}
      <input
        type="text"
        placeholder="Keywords"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-sm text-sm bg-white focus:outline-none focus:border-blue-500 mb-4"
      />

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 px-3 py-2.5 border border-gray-300 rounded-sm text-sm bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "All Categories" ? "Category" : cat}
            </option>
          ))}
        </select>

        {/* Job Type Dropdown */}
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="flex-1 px-3 py-2.5 border border-gray-300 rounded-sm text-sm bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          {jobTypes.map((type) => (
            <option key={type} value={type}>
              {type === "All Types" ? "Job Type" : type}
            </option>
          ))}
        </select>

        {/* Location Dropdown */}
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 px-3 py-2.5 border border-gray-300 rounded-sm text-sm bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc === "All Locations" ? "Location" : loc}
            </option>
          ))}
        </select>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="px-8 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-sm flex items-center justify-center gap-2 transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
