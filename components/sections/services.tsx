import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const services = [
  {
    image: "/services/ai.png",
    title: "AI Development",
    description:
      "Powerful AI development services built for speed, scale, and real-world innovation.",
  },
  {
    image: "/services/custom-programming.png",
    title: "Custom App Development",
    description:
      "Custom app development tailored to your business goals, ensuring scalable and built-to-perform.",
  },
  {
    image: "/services/ux-uidesign.png",
    title: "UX/UI Design",
    description:
      "Intuitive UX/UI design that blends aesthetics with usability to create engaging digital experiences.",
  },
  {
    image: "/services/qatesting-automation.png",
    title: "QA Testing & Automation",
    description:
      "Comprehensive QA testing and automation to ensure reliable, high-quality, and bug-free software.",
  },
  {
    image: "/services/digitaldesigntransmission.png",
    title: "Digital Transformation",
    description:
      "End-to-end digital transformation solutions that modernize operations and drive sustainable growth.",
  },
  {
    image: "/services/erpdevelopment.png",
    title: "ERP Development",
    description:
      "Custom ERP development that streamlines processes, improves visibility, and scales with your business.",
  },
  {
    image: "/services/staffaumentation.png",
    title: "Staff Augmentation",
    description:
      "Flexible staff augmentation services that provide skilled talent to scale your team on demand.",
  },
  {
    image: "/services/softwareaggrement.png",
    title: "Software Outsourcing",
    description:
      "Reliable software outsourcing solutions delivering high-quality development with cost efficiency and speed.",
  },
]

export function ServicesSection() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#00d4ff] text-sm font-medium uppercase tracking-wider mb-2">
            Featured Services
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            Engaging Creative minds via technology
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="border border-gray-100 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white flex flex-col"
            >
              <div className="w-16 h-16 mb-5 flex items-center justify-center">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={64}
                  height={64}
                  className="object-contain"
                  style={{ width: '64px', height: '64px' }}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/contact" className="bg-[#0066ff] hover:bg-[#0052cc] text-white px-6 py-3 rounded-md font-medium inline-flex items-center gap-2 transition-colors">
            Explore Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
