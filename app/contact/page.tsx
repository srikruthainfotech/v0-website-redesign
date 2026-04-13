"use client"

import { useState } from "react"
import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Mail, MapPin, Clock, Building2, Send } from "lucide-react"

const officeLocations = [
  {
    title: "Mailing Address",
    subtitle: "(For Correspondence Only)",
    address: ["6760 Corporate Dr, Suite 100", "PMB #111", "Colorado Springs, CO 80919, USA"],
    icon: MapPin,
  },
  {
    title: "USA Headquarters",
    address: ["2860 South Circle Dr, Suite 237", "Colorado Springs, CO 80906, USA"],
    icon: Building2,
  },
  {
    title: "India Office",
    address: ["Flat 104, Sai Green Meadows", "Nallagandla", "Telangana 500046"],
    icon: Building2,
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: "", email: "", company: "", subject: "", message: "" })
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
            <div className="w-full md:w-1/2 flex items-center pl-22 md:pl-30">
              <h1 className="text-3xl md:text-5xl font-bold text-white">Contact Us</h1>
            </div>
          </div>
        </section>

        {/* We're Here to Help Section */}
        <section className="py-12 md:py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">{"We're Here to Help You"}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Have a question or want to discuss how we can help your business? Reach out to us through any of the channels below.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {/* Email Card */}
              <div className="bg-[#0a1628] rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-[#00d4ff]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-[#00d4ff]" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Email Us</h3>
                <a href="mailto:info@immensebrains.com" className="text-[#00d4ff] hover:underline">
                  info@immensebrains.com
                </a>
              </div>

              {/* Business Hours Card */}
              <div className="bg-[#0a1628] rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-[#00d4ff]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-[#00d4ff]" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Business Hours</h3>
                <div className="text-gray-300 text-sm space-y-1">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              {/* Visit Us Card */}
              <div className="bg-[#0a1628] rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-[#00d4ff]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7 text-[#00d4ff]" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Visit Us</h3>
                <p className="text-gray-300 text-sm">
                  See our office locations below
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Office Locations Section */}
        <section className="py-12 md:py-16 px-4 md:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">Our Office Locations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {officeLocations.map((location, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center">
                      <location.icon className="w-5 h-5 text-[#00d4ff]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{location.title}</h3>
                      {location.subtitle && (
                        <p className="text-xs text-gray-500">{location.subtitle}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-gray-600 text-sm space-y-1">
                    {location.address.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 md:py-20 px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Get In Touch With Us</h2>
              <p className="text-gray-600">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 hover:bg-[#1a7fe0]" />
                </div>
                <p className="hover:bg-[#1a7fe0]">
                  Thank you for reaching out. We&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 hover:bg-[#1a7fe0] hover:underline font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Your Name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Your Email ID"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Enter Your Company Name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter Your Message"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-[#00d4ff] hover:bg-[#00b8e0] text-white font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
