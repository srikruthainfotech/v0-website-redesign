"use client"

import { useState, useRef } from "react"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"

interface JobApplicationFormProps {
  onClose?: () => void
  onCloseAttempt?: () => void
  showCloseButton?: boolean
}

export function JobApplicationForm({ onClose, onCloseAttempt, showCloseButton = false }: JobApplicationFormProps) {
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

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }))
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
    console.log("Form submitted:", formData, fileName)
    alert("Application submitted successfully!")
    // Clear form fields after successful submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      coverLetter: "",
    })
    setFileName(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    if (onClose) onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Apply For This Job</h3>

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
          placeholder="Enter your full name"
          required
          className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
          placeholder="Enter your email address"
          required
          className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Phone Field with react-phone-input-2 */}
      <div className="flex items-center">
        <label className="w-28 text-sm text-gray-700 flex-shrink-0">
          Phone <span className="text-red-500">*</span>
        </label>
        <div className="flex-1 phone-input-wrapper">
          <PhoneInput
            country="in"
            value={formData.phone}
            onChange={handlePhoneChange}
            enableSearch={true}
            searchPlaceholder="Search country..."
            inputProps={{
              name: "phone",
              required: true,
              placeholder: "Enter phone number",
            }}
            containerClass="phone-container"
            inputClass="phone-input"
            buttonClass="phone-button"
            dropdownClass="phone-dropdown"
            searchClass="phone-search"
          />
        </div>
      </div>

      {/* Cover Letter Field */}
      <div className="flex items-start">
        <label className="w-28 text-sm text-gray-700 flex-shrink-0 pt-2">
          Cover Letter
        </label>
        <textarea
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleInputChange}
          placeholder="Tell us why you're a great fit for this role..."
          rows={4}
          className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-y"
        />
      </div>

      {/* Attach Resume Field */}
      <div className="flex items-center">
        <label className="w-28 text-sm text-gray-700 flex-shrink-0">
          Attach Resume <span className="text-red-500">*</span>
        </label>
        <div className="flex-1 flex items-center gap-3 px-3 py-2 border border-gray-300 rounded bg-white">
          <span className={`text-sm flex-1 truncate ${fileName ? "text-gray-700" : "text-gray-400"}`}>
            {fileName || "No file chosen"}
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
            required
          />
          <button
            type="button"
            onClick={handleBrowseClick}
            className="px-4 py-1.5 bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs font-medium rounded transition-colors"
          >
            Browse
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-3">
        {showCloseButton && (onCloseAttempt || onClose) && (
          <button
            type="button"
            onClick={onCloseAttempt || onClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded transition-colors"
          >
            Close
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white text-sm font-medium rounded transition-colors"
        >
          Submit Application
        </button>
      </div>

      {/* Custom styles for react-phone-input-2 */}
      <style jsx global>{`
        .phone-input-wrapper .react-tel-input {
          width: 100%;
        }
        
        .phone-input-wrapper .react-tel-input .form-control {
          width: 100%;
          height: 38px;
          padding-left: 48px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          font-size: 14px;
        }
        
        .phone-input-wrapper .react-tel-input .form-control:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 1px #3b82f6;
          outline: none;
        }
        
        .phone-input-wrapper .react-tel-input .flag-dropdown {
          border: 1px solid #d1d5db;
          border-right: none;
          border-radius: 4px 0 0 4px;
          background-color: #f9fafb;
        }
        
        .phone-input-wrapper .react-tel-input .flag-dropdown:hover,
        .phone-input-wrapper .react-tel-input .flag-dropdown.open {
          background-color: #f3f4f6;
        }
        
        .phone-input-wrapper .react-tel-input .selected-flag {
          padding: 0 8px 0 10px;
          width: 46px;
        }
        
        .phone-input-wrapper .react-tel-input .country-list {
          width: 280px;
          max-height: 250px;
          border-radius: 4px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          margin-top: 2px;
        }
        
        .phone-input-wrapper .react-tel-input .country-list .search {
          padding: 10px;
          background-color: #fff;
        }
        
        .phone-input-wrapper .react-tel-input .country-list .search-box {
          width: 100%;
          padding: 8px 10px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          font-size: 14px;
        }
        
        .phone-input-wrapper .react-tel-input .country-list .search-box:focus {
          border-color: #3b82f6;
          outline: none;
        }
        
        .phone-input-wrapper .react-tel-input .country-list .country {
          padding: 8px 10px;
        }
        
        .phone-input-wrapper .react-tel-input .country-list .country:hover {
          background-color: #f3f4f6;
        }
        
        .phone-input-wrapper .react-tel-input .country-list .country.highlight {
          background-color: #eff6ff;
        }
      `}</style>
    </form>
  )
}
