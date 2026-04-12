import { Check } from "lucide-react"

const services = [
  "Contingent Staffing",
  "Project Staffing",
  "Master Vendor",
  "BPO - Projects and Programs",
  "Direct Hire",
  "Payroll and Transition Services",
]

export function WorkforceSection() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Our Workforce Solutions.
        </h2>
        <p className="text-gray-600 max-w-3xl text-sm md:text-base leading-relaxed mb-8">
          Our Workforce Solutions Teams don&apos;t just deliver staffing solutions - they provide business solutions. Our understanding of client&apos;s needs, unique talent supply chain, high-performing teams, and flexible engagement models help us empower businesses by delivering human intellect that can make a difference to an organization.
        </p>
        <ul className="space-y-3">
          {services.map((service) => (
            <li key={service} className="flex items-center gap-3">
              <Check className="w-4 h-4 text-[#00d4ff]" />
              <span className="text-gray-700 text-sm">{service}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
