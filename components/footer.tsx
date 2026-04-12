import Link from "next/link"
import { Mail, MapPin } from "lucide-react"

const footerLinks = {
  company: [
    { name: "Employee Referral", href: "/company/talent-referrals" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#" },
  ],
  services: [
    { name: "Custom App Development", href: "#" },
    { name: "Digital Transformation", href: "#" },
    { name: "Oracle Fusion Development", href: "#" },
    { name: "CRM Services", href: "#" },
    { name: "Cloud Infrastructure", href: "#" },
  ],
  solutions: [
    { name: "Staff Augmentation", href: "#" },
    { name: "Dedicated Teams", href: "#" },
    { name: "Software Outsourcing", href: "#" },
    { name: "UI/UX Design Solutions", href: "#" },
    { name: "Backup Solutions", href: "#" },
    { name: "Cybersecurity", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#0a1628] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#00d4ff] text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#00d4ff] text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Solutions */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Solutions</h3>
            <ul className="space-y-2">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#00d4ff] text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get In touch.</h3>
            <button className="bg-[#00c853] hover:bg-[#00b248] text-white px-4 py-2 rounded text-sm font-medium mb-4">
              Contact
            </button>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:info@immensebrains.com"
                  className="text-gray-400 hover:text-[#00d4ff] text-sm"
                >
                  info@immensebrains.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-400 text-sm">
                  2860 South Circle Dr, Suite 237,
                  <br />
                  Colorado Springs, CO, 80906.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm mb-2">Follow us.</p>
              <div className="flex gap-2">
                <a
                  href="#"
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
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>Copyright @ 2025 Immense Brains.</p>
            <div className="flex gap-6 mt-2 md:mt-0">
              <Link href="#" className="hover:text-[#00d4ff]">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-[#00d4ff]">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
