"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Search } from "lucide-react"

interface JobApplicationFormProps {
  onClose?: () => void
  showCloseButton?: boolean
}

// Country data with flags and dial codes
const countries = [
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳" },
  { code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
  { code: "AE", name: "UAE", dialCode: "+971", flag: "🇦🇪" },
  { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
  { code: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱" },
  { code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹" },
  { code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸" },
  { code: "MX", name: "Mexico", dialCode: "+52", flag: "🇲🇽" },
  { code: "RU", name: "Russia", dialCode: "+7", flag: "🇷🇺" },
  { code: "KR", name: "South Korea", dialCode: "+82", flag: "🇰🇷" },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦" },
  { code: "ZA", name: "South Africa", dialCode: "+27", flag: "🇿🇦" },
]

export function JobApplicationForm({ onClose, showCloseButton = false }: JobApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  })
  const [selectedCountry, setSelectedCountry] = useState(countries[0]) // Default to India
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const [countrySearch, setCountrySearch] = useState("")
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Filter countries based on search
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      country.dialCode.includes(countrySearch) ||
      country.code.toLowerCase().includes(countrySearch.toLowerCase())
  )

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false)
        setCountrySearch("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, "")
    setFormData((prev) => ({ ...prev, phone: value }))
  }

  const handleCountrySelect = (country: typeof countries[0]) => {
    setSelectedCountry(country)
    setIsCountryDropdownOpen(false)
    setCountrySearch("")
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
    const fullPhone = `${selectedCountry.dialCode}${formData.phone}`
    console.log("Form submitted:", { ...formData, phone: fullPhone }, fileName)
    alert("Application submitted successfully!")
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

      {/* Phone Field with Country Code */}
      <div className="flex items-center">
        <label className="w-28 text-sm text-gray-700 flex-shrink-0">
          Phone <span className="text-red-500">*</span>
        </label>
        <div className="flex-1 flex items-stretch border border-gray-300 rounded overflow-hidden focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
          {/* Country Code Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
              className="h-full px-2 py-2 bg-gray-50 border-r border-gray-300 text-sm text-gray-700 flex items-center gap-1 hover:bg-gray-100 transition-colors min-w-[90px]"
            >
              <span className="text-lg">{selectedCountry.flag}</span>
              <span className="text-gray-600">{selectedCountry.dialCode}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {/* Dropdown Menu */}
            {isCountryDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-64 overflow-hidden">
                {/* Search Input */}
                <div className="p-2 border-b border-gray-100">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      placeholder="Search country..."
                      className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:border-blue-500"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Country List */}
                <div className="max-h-48 overflow-y-auto">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => handleCountrySelect(country)}
                        className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 flex items-center gap-2 ${
                          selectedCountry.code === country.code ? "bg-blue-50" : ""
                        }`}
                      >
                        <span className="text-lg">{country.flag}</span>
                        <span className="flex-1">{country.name}</span>
                        <span className="text-gray-500">{country.dialCode}</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-gray-500">No countries found</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Phone Number Input */}
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="Enter phone number"
            required
            className="flex-1 px-3 py-2 text-sm focus:outline-none"
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
        {showCloseButton && onClose && (
          <button
            type="button"
            onClick={onClose}
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
    </form>
  )
}
