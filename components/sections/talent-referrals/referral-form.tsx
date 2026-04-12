"use client"

import { useState } from "react"

export function ReferralForm() {
  const [formData, setFormData] = useState({
    yourName: "",
    yourEmail: "",
    candidateName: "",
    candidateEmail: "",
    positionOfInterest: "",
    candidateLocation: "",
    resume: null as File | null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, resume: file }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    alert("Thank you for your referral! We will review the submission and get back to you.")
  }

  return (
    <section className="bg-white py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0a1628] mb-2">
            Submit a Referral
          </h2>
          <p className="text-gray-600">Help us find your next amazing colleague</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#f5f7fa] rounded-lg p-6 md:p-8">
          {/* Your Information */}
          <div className="mb-6">
            <h3 className="text-[#0a1628] font-medium mb-4">Your Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="yourName"
                value={formData.yourName}
                onChange={handleInputChange}
                placeholder="Enter Your Name"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                required
              />
              <input
                type="email"
                name="yourEmail"
                value={formData.yourEmail}
                onChange={handleInputChange}
                placeholder="Enter Your Email"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Candidate Information */}
          <div className="mb-6">
            <h3 className="text-[#0a1628] font-medium mb-4">Candidate Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="candidateName"
                value={formData.candidateName}
                onChange={handleInputChange}
                placeholder="Enter Candidate Name"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                required
              />
              <input
                type="email"
                name="candidateEmail"
                value={formData.candidateEmail}
                onChange={handleInputChange}
                placeholder="Enter Candidate Email"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                required
              />
              <input
                type="text"
                name="positionOfInterest"
                value={formData.positionOfInterest}
                onChange={handleInputChange}
                placeholder="Enter Position of Interest"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                required
              />
              <input
                type="text"
                name="candidateLocation"
                value={formData.candidateLocation}
                onChange={handleInputChange}
                placeholder="Enter Candidate Location"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Resume Upload */}
          <div className="mb-6">
            <h3 className="text-[#0a1628] font-medium mb-4">Upload Resume</h3>
            <input
              type="file"
              name="resume"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#0a1628] file:text-white hover:file:bg-[#0f2847] cursor-pointer"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#0a1628] hover:bg-[#0f2847] text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}
