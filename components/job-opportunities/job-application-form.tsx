"use client"

import { useState, useRef } from "react"

interface JobApplicationFormProps {
  onClose?: () => void
  showCloseButton?: boolean
}

export function JobApplicationForm({ onClose, showCloseButton = false }: JobApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  })
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData, fileName)
    alert("Application submitted successfully!")
    if (onClose) onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h3 className="text-base font-semibold text-gray-900 mb-3">Apply For This Job</h3>

      {/* Name Field */}
      <div className="flex items-center">
        <label className="w-28 text-sm text-gray-700 flex-shrink-0">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="irm-admin"
          required
          className="flex-1 px-3 py-1.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Email Field */}
      <div className="flex items-center">
        <label className="w-28 text-sm text-gray-700 flex-shrink-0">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="sorra.ramesh100@gmail.com"
          required
          className="flex-1 px-3 py-1.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Phone Field */}
      <div className="flex items-center">
        <label className="w-28 text-sm text-gray-700 flex-shrink-0">
          Phone <span className="text-red-500">*</span>
        </label>
        <div className="flex-1 flex items-center border border-gray-300 rounded-sm">
          <span className="px-2 py-1.5 bg-gray-50 border-r border-gray-300 text-sm text-gray-600 flex items-center gap-1">
            <span className="inline-block w-5 h-3 bg-gradient-to-b from-orange-500 via-white to-green-600 rounded-sm"></span>
            +91
          </span>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="0123456789"
            required
            className="flex-1 px-3 py-1.5 text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Cover Letter Field */}
      <div className="flex items-start">
        <label className="w-28 text-sm text-gray-700 flex-shrink-0">
          Phone <span className="text-red-500">*</span>
        </label>
        <textarea
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleInputChange}
          rows={3}
          className="flex-1 px-3 py-1.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-blue-500 resize-y"
        />
      </div>

      {/* Attach Resume Field */}
      <div className="flex items-center">
        <label className="w-28 text-sm text-gray-700 flex-shrink-0">
          Attach Resume <span className="text-red-500">*</span>
        </label>
        <div className="flex-1 flex items-center gap-2">
          <span className="text-sm text-blue-600 flex-1 truncate">
            {fileName || "No file chosen"}
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={handleBrowseClick}
            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded-sm"
          >
            Browse
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 pt-2">
        {showCloseButton && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 text-xs bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-sm"
          >
            Close
          </button>
        )}
        <button
          type="submit"
          className="px-3 py-1 text-xs bg-green-500 hover:bg-green-600 text-white text-sm rounded-sm"
        >
          Submit
        </button>
      </div>
    </form>
  )
}
