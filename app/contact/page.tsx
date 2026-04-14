"use client"

import { useState } from "react"
import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Mail, MapPin, Clock, Building2, Send } from "lucide-react"

const officeLocations = [
  {
    title: "USA Headquarters",
    address: ["2860 South Circle Dr, Suite 237", "Colorado Springs, CO 80906", "United States"],
    icon: Building2,
  },
  {
    title: "Mailing Address",
    subtitle: "(For Correspondence Only)",
    address: ["6760 Corporate Dr, Suite 100", "PMB #111", "Colorado Springs, CO 80919", "United States"],
    icon: MapPin,
  },
  {
    title: "India Office",
    address: ["Flat 104, Sai Green Meadows", "Nallagandla", "Telangana 500046", "India"],
    icon: Building2,
  },
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
            <div className="w-full md:w-1/2 flex items-center pl-4 md:pl-30">
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
        <section className="bg-white py-16 md:py-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0a1628] mb-2">Get In Touch With Us</h2>
              <p className="text-gray-600">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="bg-[#0a1628] rounded-xl p-10 text-center shadow-lg">
                <div className="w-20 h-20 bg-[#00d4ff]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10 text-[#00d4ff]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Message Sent Successfully!
                </h3>
                <p className="text-gray-300 mb-8 max-w-md mx-auto">
                  Thank you for reaching out. Our team will review your message and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#0066ff] hover:bg-[#0052cc] text-white font-medium py-2.5 px-8 rounded-md transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#f5f7fa] border border-gray-200 rounded-md p-6 md:p-8 shadow-sm">
                {/* Personal Information */}
                <div className="mb-6">
                  <h3 className="text-[#0a1628] font-medium mb-4">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Your Name"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                    />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Your Email ID"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Inquiry Details */}
                <div className="mb-6">
                  <h3 className="text-[#0a1628] font-medium mb-4">Inquiry Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Enter Your Company Name"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                    />
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter Subject"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <h3 className="text-[#0a1628] font-medium mb-4">Your Message</h3>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter Your Message"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-medium py-2.5 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
