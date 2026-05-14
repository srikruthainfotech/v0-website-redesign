"use client"

import { useState, useRef } from "react"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { supabase } from "@/lib/supabase"
import { Loader2 } from "lucide-react"

interface JobApplicationFormProps {
  postId?: string
  onClose?: () => void
  onCloseAttempt?: () => void
  showCloseButton?: boolean
}

export function JobApplicationForm({ postId, onClose, onCloseAttempt, showCloseButton = false }: JobApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  })
  const [fileName, setFileName] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitMessage(null)

    // Validation
    if (!formData.name.trim()) {
      setSubmitMessage({ type: "error", text: "Name is required" })
      return
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      setSubmitMessage({ type: "error", text: "Please enter a valid email address" })
      return
    }
    if (!formData.phone.trim()) {
      setSubmitMessage({ type: "error", text: "Phone number is required" })
      return
    }
    const file = fileInputRef.current?.files?.[0]
    if (!file) {
      setSubmitMessage({ type: "error", text: "Resume is required" })
      return
    }

    setIsSubmitting(true)

    try {
      // Step 1: Upload resume to Supabase Storage
      const fileExt = file.name.split(".").pop()
      const filePath = `${Date.now()}-${file.name}`

      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(filePath, file)

      if (uploadError) {
        console.error("Upload error:", uploadError)
        setSubmitMessage({ type: "error", text: "Failed to upload resume. Please try again." })
        setIsSubmitting(false)
        return
      }

      // Step 2: Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("resumes")
        .getPublicUrl(filePath)

      const resumeUrl = publicUrlData.publicUrl

      // Step 3: Insert into database
      const { error: insertError } = await supabase
        .from("job_applications")
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            cover_letter: formData.coverLetter.trim() || null,
            resume_url: resumeUrl,
            post_id: postId || null,
          },
        ])

      if (insertError) {
        console.error("Insert error:", insertError)
        setSubmitMessage({ type: "error", text: "Failed to submit application. Please try again." })
        setIsSubmitting(false)
        return
      }

      // Success
      setSubmitMessage({ type: "success", text: "Application submitted successfully!" })

      // Clear form
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

      // Close modal after short delay if onClose is provided
      if (onClose) {
        setTimeout(() => {
          onClose()
        }, 1500)
      }
    } catch (err) {
      console.error("Unexpected error:", err)
      setSubmitMessage({ type: "error", text: "An unexpected error occurred. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Apply For This Job</h3>

      {/* Success/Error Message */}
      {submitMessage && (
        <div
          className={`p-3 rounded text-sm ${submitMessage.type === "success"
            ? "bg-green-50 border border-green-200 text-green-700"
            : "bg-red-50 border border-red-200 text-red-700"
            }`}
        >
          {submitMessage.text}
        </div>
      )}

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
          disabled={isSubmitting}
          className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
          disabled={isSubmitting}
          className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
            disabled={isSubmitting}
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
          disabled={isSubmitting}
          className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-y disabled:bg-gray-100 disabled:cursor-not-allowed"
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
            disabled={isSubmitting}
          />
          <button
            type="button"
            onClick={handleBrowseClick}
            disabled={isSubmitting}
            className="px-4 py-1.5 bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs font-medium rounded transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
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
            disabled={isSubmitting}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Close
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white text-sm font-medium rounded transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Application"
          )}
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

        .phone-input-wrapper .react-tel-input.disabled .form-control {
          background-color: #f3f4f6;
          cursor: not-allowed;
        }
        
        .phone-input-wrapper .react-tel-input.disabled .flag-dropdown {
          cursor: not-allowed;
        }
      `}</style>
    </form>
  )
}
