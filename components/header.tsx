"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Mail, Menu, X } from "lucide-react"

const solutionsMenu = {
  topSolutions: [
    { name: "AI Development", href: "/solutions/ai-development" },
    { name: "Custom App Development", href: "/solutions/custom-app-development" },
    { name: "Progressive Web App Development", href: "/solutions/pwa-development" },
    { name: "UI/UX Design", href: "#" },
    { name: "Machine Learning", href: "#" },
    { name: "QA Testing & Automation", href: "/solutions/qa-testing-automation" },
  ],
  enterpriseFocused: [
    { name: "Oracle Cloud Applications", href: "#" },
    { name: "Digital Transformation", href: "#" },
  ],
  staffingSolutions: [
    { name: "Staff Augmentation", href: "/solutions/staff-augmentation" },
    { name: "Dedicated Teams", href: "/solutions/dedicated-teams" },
    { name: "Software Outsourcing", href: "/solutions/software-outsourcing" },
  ],
}

const companyMenu = [
  { name: "About Us", href: "/company/about-us" },
  { name: "Talent Referrals", href: "/company/talent-referrals" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false)

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-[#0a1628] text-white py-2 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <a href="mailto:info@immensebrains.com" className="hover:text-[#00d4ff] text-xs sm:text-sm truncate">
              info@immensebrains.com
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <Link href="/company/talent-referrals" className="hover:text-[#00d4ff]">
              Talent Referrals
            </Link>
            <Link href="/contact" className="hover:text-[#00d4ff]">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-white border-b border-gray-100 relative">
        <div className="max-w-7xl mx-auto pl-0 pr-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/immense-brains-logo-01-M78OjHE7FsmPJIblZLuT4qqU6GMLZm.png"
                alt="Immense Brains"
                width={200}
                height={40}
                style={{ width: 'auto', height: 'auto' }}
                className="max-h-8 sm:max-h-10"
                priority
              />
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 -mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-8">
              {/* Solutions dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <button className="flex items-center gap-1 text-gray-700 hover:text-[#00d4ff] font-medium py-4">
                  Solutions
                  <ChevronDown className="w-4 h-4" />
                </button>

                {solutionsOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] bg-white shadow-xl border border-gray-100 rounded-lg p-6 z-50">
                    <div className="grid grid-cols-3 gap-8">
                      {/* Top Solutions */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                          TOP SOLUTIONS
                        </h3>
                        <ul className="space-y-2">
                          {solutionsMenu.topSolutions.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className="text-sm text-gray-600 hover:text-[#00d4ff] block"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Enterprise Focused */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                          ENTERPRISE FOCUSED
                        </h3>
                        <ul className="space-y-2">
                          {solutionsMenu.enterpriseFocused.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className="text-sm text-gray-600 hover:text-[#00d4ff] block"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Staffing Solutions */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                          STAFFING SOLUTIONS
                        </h3>
                        <ul className="space-y-2">
                          {solutionsMenu.staffingSolutions.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className="text-sm text-gray-600 hover:text-[#00d4ff] block"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Industries */}
              <Link href="/industries" className="text-gray-700 hover:text-[#00d4ff] font-medium">
                Industries
              </Link>

              {/* Company dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCompanyOpen(true)}
                onMouseLeave={() => setCompanyOpen(false)}
              >
                <button className="flex items-center gap-1 text-gray-700 hover:text-[#00d4ff] font-medium py-4">
                  Company
                  <ChevronDown className="w-4 h-4" />
                </button>

                {companyOpen && (
                  <div className="absolute top-full left-0 w-48 bg-white shadow-xl border border-gray-100 rounded-lg py-2 z-50">
                    {companyMenu.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-[#00d4ff] hover:bg-gray-50"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Careers */}
              <Link href="/job-opportunities" className="text-gray-700 hover:text-[#00d4ff] font-medium">
                Careers
              </Link>
            </div>


          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute top-full left-0 right-0 z-50 shadow-lg max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-4">
              {/* Solutions accordion */}
              <div className="border-b border-gray-100">
                <button
                  className="flex items-center justify-between w-full py-3 text-gray-700 font-medium"
                  onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                >
                  Solutions
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileSolutionsOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileSolutionsOpen && (
                  <div className="pb-4 space-y-4">
                    {/* Top Solutions */}
                    <div>
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        TOP SOLUTIONS
                      </h3>
                      <ul className="space-y-2">
                        {solutionsMenu.topSolutions.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className="text-sm text-gray-600 hover:text-[#00d4ff] block py-1"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Enterprise Focused */}
                    <div>
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        ENTERPRISE FOCUSED
                      </h3>
                      <ul className="space-y-2">
                        {solutionsMenu.enterpriseFocused.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className="text-sm text-gray-600 hover:text-[#00d4ff] block py-1"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Staffing Solutions */}
                    <div>
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        STAFFING SOLUTIONS
                      </h3>
                      <ul className="space-y-2">
                        {solutionsMenu.staffingSolutions.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className="text-sm text-gray-600 hover:text-[#00d4ff] block py-1"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Industries */}
              <Link
                href="/industries"
                className="block py-3 text-gray-700 font-medium border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Industries
              </Link>

              {/* Company accordion */}
              <div className="border-b border-gray-100">
                <button
                  className="flex items-center justify-between w-full py-3 text-gray-700 font-medium"
                  onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                >
                  Company
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileCompanyOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileCompanyOpen && (
                  <div className="pb-4">
                    <ul className="space-y-2">
                      {companyMenu.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="text-sm text-gray-600 hover:text-[#00d4ff] block py-1"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Careers */}
              <Link
                href="/job-opportunities"
                className="block py-3 text-gray-700 font-medium border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Careers
              </Link>

              {/* Mobile-only links from top bar */}
              <div className="pt-4 space-y-2 sm:hidden">
                <Link
                  href="/company/talent-referrals"
                  className="block py-2 text-sm text-[#00d4ff] font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Talent Referrals
                </Link>
                <Link
                  href="/contact"
                  className="block py-2 text-sm text-[#00d4ff] font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
