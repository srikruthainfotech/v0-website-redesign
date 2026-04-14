import Link from "next/link"
import { Mail, MapPin } from "lucide-react"

const footerLinks = {
  topSolutions: [
    { name: "AI Development", href: "#" },
    { name: "Custom App Development", href: "#" },
    { name: "Progressive Web App Development", href: "#" },
    { name: "QA Testing & Automation", href: "#" },
  ],
  enterprise: [
    { name: "Backup Solutions", href: "#" },
    { name: "Oracle Cloud Applications", href: "#" },
    { name: "Digital Transformation", href: "#" },
  ],
  staffing: [
    { name: "Staff Augmentation", href: "#" },
    { name: "Dedicated Teams", href: "#" },
    { name: "Software Outsourcing", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#0a1628] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Top Solutions */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold text-sm tracking-wide mb-6">
              Top Solutions
            </h3>
            <ul className="space-y-3">
              {footerLinks.topSolutions.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#00d4ff] text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enterprise Focused */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold text-sm tracking-wide mb-6">
              Enterprise Focused
            </h3>
            <ul className="space-y-3">
              {footerLinks.enterprise.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#00d4ff] text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Staffing Solutions */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold text-sm tracking-wide mb-6">
              Staffing Solutions
            </h3>
            <ul className="space-y-3">
              {footerLinks.staffing.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-[#00d4ff] text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold text-sm tracking-wide mb-6">
              Get In Touch
            </h3>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#0066ff] hover:bg-[#0052cc] text-white px-6 py-2.5 rounded-md font-medium text-sm transition-colors w-fit mb-6"
            >
              Contact Us
            </Link>
            <div className="space-y-4">
              <a
                href="mailto:info@immensebrains.com"
                className="flex items-center gap-3 text-gray-400 hover:text-[#00d4ff] text-sm transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@immensebrains.com</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-400 text-sm leading-relaxed">
                  6760 Corporate Dr, Suite 100<br />
                  PMB #111<br />
                  Colorado Springs, CO 80919, USA
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-gray-400 text-sm">Follow us</span>
              <a
                href="https://www.linkedin.com/company/immensebrains"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#00d4ff] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>Copyright @ 2025 Immense Brains.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-[#00d4ff] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-[#00d4ff] transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
