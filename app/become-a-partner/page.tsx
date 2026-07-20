"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MultiSelectCountries } from "@/components/multi-select-countries"
import { supabase } from "@/lib/supabase"
import { getCurrentTenantId } from "@/lib/tenant"
import {
  Briefcase,
  Zap,
  HeadsetIcon,
  Globe,
  Mail,
  Phone,
  Send,
  ChevronDown,
  Upload,
} from "lucide-react"

const partnerBenefits = [
  {
    title: "Business Growth",
    description: "Expand your market opportunities through collaboration.",
    icon: Briefcase,
  },
  {
    title: "Technology Collaboration",
    description: "Build innovative solutions together.",
    icon: Zap,
  },
  {
    title: "Dedicated Partnership",
    description: "Receive continuous support from our partnership team.",
    icon: HeadsetIcon,
  },
  {
    title: "Global Opportunities",
    description: "Collaborate on enterprise projects across industries.",
    icon: Globe,
  },
]

const sidebarBenefits = [
  {
    title: "Business Growth",
    icon: Briefcase,
  },
  {
    title: "Technology Excellence",
    icon: Zap,
  },
  {
    title: "Dedicated Support",
    icon: HeadsetIcon,
  },
  {
    title: "Mutual Success",
    icon: Globe,
  },
  {
    title: "Global Presence",
    icon: Globe,
  },
]

export default function BecomeAPartnerPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyWebsite: "",
    companyEmail: "",
    phoneNumber: "",
    country: "",
    companySize: "",
    industry: "",
    address: "",
    city: "",
    firstName: "",
    lastName: "",
    designation: "",
    businessEmail: "",
    mobileNumber: "",
    linkedinProfile: "",
    partnershipType: "",
    servicesOffered: "",
    yearsInBusiness: "",
    numberOfEmployees: "",
    countriesServed: [] as string[],
    majorClients: "",
    partnershipReason: "",
    companyProfile: null as File | null,
    companyBrochure: null as File | null,
    certifications: {
      iso9001: false,
      iso27001: false,
      cmmi: false,
      microsoftPartner: false,
      awsPartner: false,
      googlePartner: false,
      oraclePartner: false,
      sapPartner: false,
      other: false,
    },
    additionalNotes: "",
    agreeTerms: false,
    agreePrivacy: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const brochureInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      if (name.startsWith("certification_")) {
        const certKey = name.replace("certification_", "")
        setFormData((prev) => ({
          ...prev,
          certifications: {
            ...prev.certifications,
            [certKey]: (e.target as HTMLInputElement).checked,
          },
        }))
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: (e.target as HTMLInputElement).checked,
        }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleCountriesChange = (countries: string[]) => {
    setFormData((prev) => ({
      ...prev,
      countriesServed: countries,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    // ✅ Allow only PDF, DOC, DOCX
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, DOC, and DOCX files are allowed")

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      return
    }

    // ✅ Max file size = 10MB
    const maxSize = 10 * 1024 * 1024

    if (file.size > maxSize) {
      alert("Please upload a file up to 10MB")

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      return
    }

    setFormData((prev) => ({
      ...prev,
      companyProfile: file,
    }))
  }

  const handleBrochureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    // ✅ Allow only PDF, DOC, DOCX
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, DOC, and DOCX files are allowed")

      if (brochureInputRef.current) {
        brochureInputRef.current.value = ""
      }

      return
    }

    // ✅ Max file size = 10MB
    const maxSize = 10 * 1024 * 1024

    if (file.size > maxSize) {
      alert("Please upload a file up to 10MB")

      if (brochureInputRef.current) {
        brochureInputRef.current.value = ""
      }

      return
    }

    setFormData((prev) => ({
      ...prev,
      companyBrochure: file,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate that at least one country is selected
    if (formData.countriesServed.length === 0) {
      alert("Please select at least one country")
      setIsSubmitting(false)
      return
    }

    try {
      let companyProfileUrl = null
      let companyBrochureUrl = null

      // ✅ STEP 1: Upload Company Profile to Supabase Storage
      if (formData.companyProfile) {
        const fileName = `${Date.now()}-${formData.companyProfile.name}`

        const { error: uploadError } = await supabase.storage
          .from("partnership-files")
          .upload(fileName, formData.companyProfile)

        if (uploadError) {
          console.error("Error uploading company profile:", uploadError)
          alert("Failed to upload company profile")
          return
        }

        // ✅ STEP 2: Get public URL for Company Profile
        const { data: publicUrlData } = supabase.storage
          .from("partnership-files")
          .getPublicUrl(fileName)

        companyProfileUrl = publicUrlData.publicUrl
      }

      // ✅ STEP 3: Upload Company Brochure to Supabase Storage
      if (formData.companyBrochure) {
        const fileName = `${Date.now()}-${formData.companyBrochure.name}`

        const { error: uploadError } = await supabase.storage
          .from("partnership-files")
          .upload(fileName, formData.companyBrochure)

        if (uploadError) {
          console.error("Error uploading company brochure:", uploadError)
          alert("Failed to upload company brochure")
          return
        }

        // ✅ STEP 4: Get public URL for Company Brochure
        const { data: publicUrlData } = supabase.storage
          .from("partnership-files")
          .getPublicUrl(fileName)

        companyBrochureUrl = publicUrlData.publicUrl
      }

      // ✅ STEP 5: Insert into database with file URLs
      const tenantId = await getCurrentTenantId()
      const { error } = await supabase.from("partnership_registration").insert([
        {
          tenant_id: tenantId,
          company_name: formData.companyName,
          company_email: formData.companyEmail,
          company_website: formData.companyWebsite,
          phone_number: formData.phoneNumber,
          country: formData.country,
          company_size: formData.companySize,
          industry: formData.industry,
          address: formData.address,
          city: formData.city,
          first_name: formData.firstName,
          last_name: formData.lastName,
          business_email: formData.businessEmail,
          designation: formData.designation,
          mobile_number: formData.mobileNumber,
          linkedin_profile: formData.linkedinProfile,
          partnership_type: formData.partnershipType,
          services_offered: formData.servicesOffered,
          years_in_business: formData.yearsInBusiness,
          number_of_employees: formData.numberOfEmployees,
          countries_served: formData.countriesServed.join(", "),
          major_clients: formData.majorClients,
          certifications: formData.certifications,
          company_profile_url: companyProfileUrl,
          company_brochure_url: companyBrochureUrl,
          partnership_reason: formData.partnershipReason,
          additional_notes: formData.additionalNotes,
          agree_terms: formData.agreeTerms,
          agree_privacy: formData.agreePrivacy,
        },
      ])

      if (error) {
        console.error("Error submitting form:", error)
        alert("Failed to submit form. Please try again.")
        return
      }

      setSubmitted(true)
      setFormData({
        companyName: "",
        companyWebsite: "",
        companyEmail: "",
        phoneNumber: "",
        country: "",
        companySize: "",
        industry: "",
        address: "",
        city: "",
        firstName: "",
        lastName: "",
        designation: "",
        businessEmail: "",
        mobileNumber: "",
        linkedinProfile: "",
        partnershipType: "",
        servicesOffered: "",
        yearsInBusiness: "",
        numberOfEmployees: "",
        countriesServed: [],
        majorClients: "",
        partnershipReason: "",
        companyProfile: null,
        companyBrochure: null,
        certifications: {
          iso9001: false,
          iso27001: false,
          cmmi: false,
          microsoftPartner: false,
          awsPartner: false,
          googlePartner: false,
          oraclePartner: false,
          sapPartner: false,
          other: false,
        },
        additionalNotes: "",
        agreeTerms: false,
        agreePrivacy: false,
      })

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      if (brochureInputRef.current) {
        brochureInputRef.current.value = ""
      }
    } catch (err) {
      console.error("Error submitting form:", err)
      alert("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section
          className="relative min-h-[200px] md:min-h-[280px] flex items-center"
          style={{
            backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-image-%20top-01%20-7hyPuLnm3jG3akkqH8VOkUntQxzoRI.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full h-full flex items-center">
            <div className="w-full md:w-1/2 flex items-center pl-4 md:pl-30">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Become A Partner
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-12 md:py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                Become Our Trusted Partner
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                At Immense Brains, we believe in building long-term strategic
                partnerships that create value for both organizations. Whether
                you are a technology company, staffing firm, consulting
                organization, or implementation partner, we welcome
                collaboration that drives innovation and business growth.
              </p>
            </div>
          </div>
        </section>

        {/* Partner Benefits Section */}
        <section className="py-12 md:py-16 px-4 md:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
              Partner Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnerBenefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#00d4ff]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Main Form Section */}
        <section className="bg-white py-16 md:py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {submitted ? (
              <div className="bg-[#0a1628] rounded-xl p-10 text-center shadow-lg max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-[#00d4ff]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10 text-[#00d4ff]" />
                </div>
                <h2 className="text-white text-2xl font-bold mb-2">Thank You!</h2>
                <p className="text-gray-300 mb-8">
                  Your partnership request has been submitted successfully. Our
                  partnership team will review your request and contact you soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#0066ff] hover:bg-[#0052cc] text-white font-medium py-2.5 px-8 rounded-md transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form - Left side */}
                <div className="lg:col-span-2">
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#0a1628] mb-2">
                      Partnership Registration
                    </h2>
                    <p className="text-gray-600">
                      Please fill out the form below to register your partnership
                      interest.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="bg-[#f5f7fa] border border-gray-200 rounded-md p-6 md:p-8 shadow-sm"
                  >
                    {/* Company Information */}
                    <div className="mb-8">
                      <h3 className="text-[#0a1628] font-medium text-lg mb-6">
                        Company Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {/* Column 1 */}
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-2">
                            Company Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="companyName"
                            required
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="Enter company name"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-2">
                            Company Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="companyEmail"
                            required
                            value={formData.companyEmail}
                            onChange={handleChange}
                            placeholder="Enter email address"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-2">
                            Industry
                          </label>
                          <select
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                          >
                            <option value="">Select industry</option>
                            <option value="Information Technology">Information Technology</option>
                            <option value="Software Development">Software Development</option>
                            <option value="Cloud Computing">Cloud Computing</option>
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                            <option value="Machine Learning">Machine Learning</option>
                            <option value="Cyber Security">Cyber Security</option>
                            <option value="Staffing">Staffing</option>
                            <option value="Consulting">Consulting</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Finance">Finance</option>
                            <option value="Retail">Retail</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Education">Education</option>
                            <option value="Telecommunications">Telecommunications</option>
                            <option value="Government">Government</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        {/* Column 2 */}
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-2">
                            Company Website
                          </label>
                          <input
                            type="url"
                            name="companyWebsite"
                            value={formData.companyWebsite}
                            onChange={handleChange}
                            placeholder="Enter website URL"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-2">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phoneNumber"
                            required
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-2">
                            Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter full address"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                          />
                        </div>

                        {/* Column 3 */}
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Enter city"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-2">
                            Country <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="country"
                            required
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Enter country"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-2">
                            Company Size
                          </label>
                          <select
                            name="companySize"
                            value={formData.companySize}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                          >
                            <option value="">Select company size</option>
                            <option value="1-10">1-10 Employees</option>
                            <option value="11-50">11-50 Employees</option>
                            <option value="51-200">51-200 Employees</option>
                            <option value="201-500">201-500 Employees</option>
                            <option value="500+">500+ Employees</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Primary Contact Person */}
                    <div className="mb-8">
                      <h3 className="text-[#0a1628] font-medium text-lg mb-6">
                        Primary Contact Person
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {/* Column 1 */}
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-2">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter first name"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-2">
                            Business Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="businessEmail"
                            required
                            value={formData.businessEmail}
                            onChange={handleChange}
                            placeholder="Enter business email"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                          />
                        </div>

                        {/* Column 2 */}
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-2">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter last name"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-2">
                            Mobile Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            name="mobileNumber"
                            required
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            placeholder="Enter mobile number"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                          />
                        </div>

                        {/* Column 3 */}
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-2">
                            Designation <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="designation"
                            required
                            value={formData.designation}
                            onChange={handleChange}
                            placeholder="Enter designation"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-2">
                            LinkedIn Profile
                          </label>
                          <input
                            type="url"
                            name="linkedinProfile"
                            value={formData.linkedinProfile}
                            onChange={handleChange}
                            placeholder="https://www.linkedin.com/in/username"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Partnership Details */}
                    <div className="mb-8">
                      <h3 className="text-[#0a1628] font-medium text-lg mb-6">
                        Partnership Details
                      </h3>
                      
                      {/* Row 1 - Two columns */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-2">
                            Partnership Type <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="partnershipType"
                            value={formData.partnershipType}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                          >
                            <option value="">Select partnership type</option>
                            <option value="Technology Partner">
                              Technology Partner
                            </option>
                            <option value="Consulting Partner">
                              Consulting Partner
                            </option>
                            <option value="Referral Partner">
                              Referral Partner
                            </option>
                            <option value="Staffing Partner">
                              Staffing Partner
                            </option>
                            <option value="Implementation Partner">
                              Implementation Partner
                            </option>
                            <option value="Strategic Alliance">
                              Strategic Alliance
                            </option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-2">
                            Services Offered <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="servicesOffered"
                            value={formData.servicesOffered}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                          >
                            <option value="">Select services offered</option>
                            <option value="AI Development">AI Development</option>
                            <option value="Custom Application Development">Custom Application Development</option>
                            <option value="Cloud Services">Cloud Services</option>
                            <option value="Digital Transformation">Digital Transformation</option>
                            <option value="ERP Development">ERP Development</option>
                            <option value="Oracle Cloud Applications">Oracle Cloud Applications</option>
                            <option value="QA Testing & Automation">QA Testing & Automation</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="Staff Augmentation">Staff Augmentation</option>
                            <option value="Dedicated Teams">Dedicated Teams</option>
                            <option value="Software Outsourcing">Software Outsourcing</option>
                            <option value="Business Consulting">Business Consulting</option>
                            <option value="IT Support">IT Support</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      {/* Row 2 - Three columns */}
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-2">
                            Years in Business <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="yearsInBusiness"
                            value={formData.yearsInBusiness}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                          >
                            <option value="">Select years in business</option>
                            <option value="Less than 1 year">Less than 1 year</option>
                            <option value="1–3 Years">1–3 Years</option>
                            <option value="4–7 Years">4–7 Years</option>
                            <option value="8–10 Years">8–10 Years</option>
                            <option value="11–15 Years">11–15 Years</option>
                            <option value="16–20 Years">16–20 Years</option>
                            <option value="20+ Years">20+ Years</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-2">
                            Number of Employees <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="numberOfEmployees"
                            value={formData.numberOfEmployees}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                          >
                            <option value="">Select number of employees</option>
                            <option value="1–10">1–10</option>
                            <option value="11–50">11–50</option>
                            <option value="51–100">51–100</option>
                            <option value="101–250">101–250</option>
                            <option value="251–500">251–500</option>
                            <option value="501–1000">501–1000</option>
                            <option value="1000+">1000+</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-2">
                            Countries Served <span className="text-red-500">*</span>
                          </label>
                          <MultiSelectCountries
                            selected={formData.countriesServed}
                            onChange={handleCountriesChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Row 3 - Full width textarea */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                          Tell us about your major clients
                        </label>
                        <textarea
                          name="majorClients"
                          rows={4}
                          value={formData.majorClients}
                          onChange={handleChange}
                          placeholder="Enter details about your major clients"
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent resize-none"
                        />
                      </div>
                    </div>

                    {/* Company Documents & Additional Information */}
                    <div className="mb-8">
                      <h3 className="text-[#0a1628] font-medium text-lg mb-6">
                        Company Documents & Additional Information
                      </h3>

                      {/* Row 1: Certifications | Company Profile */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Left Column - Certifications */}
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-4">
                            Certifications
                          </label>
                          <div className="grid grid-cols-3 gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                name="certification_iso9001"
                                checked={formData.certifications.iso9001}
                                onChange={handleChange}
                                className="w-4 h-4 accent-[#00d4ff]"
                              />
                              <span className="text-sm text-gray-700">ISO 9001</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                name="certification_iso27001"
                                checked={formData.certifications.iso27001}
                                onChange={handleChange}
                                className="w-4 h-4 accent-[#00d4ff]"
                              />
                              <span className="text-sm text-gray-700">ISO 27001</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                name="certification_cmmi"
                                checked={formData.certifications.cmmi}
                                onChange={handleChange}
                                className="w-4 h-4 accent-[#00d4ff]"
                              />
                              <span className="text-sm text-gray-700">CMMI</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                name="certification_microsoftPartner"
                                checked={formData.certifications.microsoftPartner}
                                onChange={handleChange}
                                className="w-4 h-4 accent-[#00d4ff]"
                              />
                              <span className="text-sm text-gray-700">Microsoft Partner</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                name="certification_awsPartner"
                                checked={formData.certifications.awsPartner}
                                onChange={handleChange}
                                className="w-4 h-4 accent-[#00d4ff]"
                              />
                              <span className="text-sm text-gray-700">AWS Partner</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                name="certification_googlePartner"
                                checked={formData.certifications.googlePartner}
                                onChange={handleChange}
                                className="w-4 h-4 accent-[#00d4ff]"
                              />
                              <span className="text-sm text-gray-700">Google Partner</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                name="certification_oraclePartner"
                                checked={formData.certifications.oraclePartner}
                                onChange={handleChange}
                                className="w-4 h-4 accent-[#00d4ff]"
                              />
                              <span className="text-sm text-gray-700">Oracle Partner</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                name="certification_sapPartner"
                                checked={formData.certifications.sapPartner}
                                onChange={handleChange}
                                className="w-4 h-4 accent-[#00d4ff]"
                              />
                              <span className="text-sm text-gray-700">SAP Partner</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                name="certification_other"
                                checked={formData.certifications.other}
                                onChange={handleChange}
                                className="w-4 h-4 accent-[#00d4ff]"
                              />
                              <span className="text-sm text-gray-700">Other</span>
                            </label>
                          </div>
                        </div>

                        {/* Right Column - Company Profile Upload */}
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-2">
                            Company Profile <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              ref={fileInputRef}
                              type="file"
                              name="companyProfile"
                              onChange={handleFileChange}
                              accept=".pdf,.doc,.docx"
                              className="hidden"
                            />
                            <div
                              onClick={() => fileInputRef.current?.click()}
                              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#00d4ff] hover:bg-[#f5f7fa] transition-colors bg-white"
                            >
                              <div className="flex justify-center mb-4">
                                <div className="w-12 h-12 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center">
                                  <Upload className="w-6 h-6 text-[#00d4ff]" />
                                </div>
                              </div>
                              <p className="text-[#0a1628] font-medium mb-2">
                                Click to upload or drag and drop
                              </p>
                              <p className="text-gray-500 text-sm">
                                PDF, DOC, DOCX (Max. 10MB)
                              </p>
                              {formData.companyProfile && (
                                <p className="text-[#00d4ff] text-sm font-medium mt-4">
                                  ✓ {formData.companyProfile.name}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Row 2: Company Brochure | Why do you want to partner with us? */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Left Column - Company Brochure Upload */}
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-2">
                            Company Brochure (Optional)
                          </label>
                          <div className="relative">
                            <input
                              ref={brochureInputRef}
                              type="file"
                              name="companyBrochure"
                              onChange={handleBrochureChange}
                              accept=".pdf,.doc,.docx"
                              className="hidden"
                            />
                            <div
                              onClick={() => brochureInputRef.current?.click()}
                              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#00d4ff] hover:bg-[#f5f7fa] transition-colors bg-white"
                            >
                              <div className="flex justify-center mb-4">
                                <div className="w-12 h-12 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center">
                                  <Upload className="w-6 h-6 text-[#00d4ff]" />
                                </div>
                              </div>
                              <p className="text-[#0a1628] font-medium mb-2">
                                Click to upload or drag and drop
                              </p>
                              <p className="text-gray-500 text-sm">
                                PDF, DOC, DOCX (Max. 10MB)
                              </p>
                              {formData.companyBrochure && (
                                <p className="text-[#00d4ff] text-sm font-medium mt-4">
                                  ✓ {formData.companyBrochure.name}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Why do you want to partner with us? */}
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-2">
                            Why do you want to partner with us? <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            name="partnershipReason"
                            rows={7}
                            value={formData.partnershipReason}
                            onChange={handleChange}
                            placeholder="Enter your message"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent resize-none"
                          />
                        </div>
                      </div>

                      {/* Row 3: Additional Notes (Full Width) */}
                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                          Additional Notes (Optional)
                        </label>
                        <textarea
                          name="additionalNotes"
                          rows={4}
                          value={formData.additionalNotes}
                          onChange={handleChange}
                          placeholder="Any additional information you would like to share"
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent resize-none"
                        />
                      </div>
                    </div>

                    {/* Agreement Checkboxes */}
                    <div className="mb-8 space-y-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                          className="mt-1 w-4 h-4 accent-[#00d4ff]"
                        />
                        <span className="text-sm text-gray-600">
                          I agree to <Link href="/terms-of-use" className="hover:text-[#00d4ff] transition-colors">
                            Terms & Conditions
                          </Link>
                        </span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreePrivacy"
                          checked={formData.agreePrivacy}
                          onChange={handleChange}
                          className="mt-1 w-4 h-4 accent-[#00d4ff]"
                        />
                        <span className="text-sm text-gray-600">
                          I agree to <Link href="/privacy-policy" className="hover:text-[#00d4ff] transition-colors">
                            Privacy Policy
                          </Link>
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={
                        isSubmitting ||
                        !formData.agreeTerms ||
                        !formData.agreePrivacy
                      }
                      className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-medium py-2.5 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Partnership Request"}
                    </button>
                  </form>
                </div>

                {/* Sidebar - Right side */}
                <div className="lg:col-span-1">
                  {/* Why Partner Card */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 sticky top-8">
                    <h3 className="text-[#0a1628] font-semibold text-lg mb-6">
                      Why Partner with Immense Brains?
                    </h3>
                    <div className="space-y-4">
                      {sidebarBenefits.map((benefit, index) => {
                        const Icon = benefit.icon
                        return (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Icon className="w-4 h-4 text-[#00d4ff]" />
                            </div>
                            <p className="text-sm text-gray-700">
                              {benefit.title}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Need Assistance Card */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-96">
                    <h3 className="text-[#0a1628] font-semibold text-lg mb-6">
                      Need Assistance?
                    </h3>
                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                          Email
                        </p>
                        <a
                          href="mailto:info@immensebrains.com"
                          className="text-[#00d4ff] hover:underline text-sm font-medium"
                        >
                          info@immensebrains.com
                        </a>
                      </div>
                    </div>
                    <a
                      href="/contact"
                      className="w-full inline-block text-center bg-[#0066ff] hover:bg-[#0052cc] text-white font-medium py-2.5 px-4 rounded-md transition-colors"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
