import { Settings, Users, Target, Cpu, Clock, Heart } from "lucide-react"

const features = [
  {
    icon: Settings,
    title: "Precision Engineered AI & Software Solutions",
  },
  {
    icon: Users,
    title: "Scalable Delivery with Dedicated Expert Teams",
  },
  {
    icon: Target,
    title: "Cross-Functional, Outcome-Driven Teams",
  },
  {
    icon: Cpu,
    title: "Robust Architecture Built for High Performance",
  },
  {
    icon: Clock,
    title: "Proven Quality & On-Time Delivery",
  },
  {
    icon: Heart,
    title: "Human-Centered UI/UX Excellence",
  },
]

export function WhyChooseSection() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#00d4ff] text-sm font-medium uppercase tracking-wider mb-2">
            Why Us
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            Why Global Brands Choose Immense Brains
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Trusted by startups, enterprises, and global brands for secure, scalable, and future-ready digital solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="border border-gray-100 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white flex items-start gap-4"
            >
              <div className="w-10 h-10 bg-[#e6faff] rounded-lg flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-5 h-5 text-[#00d4ff]" />
              </div>
              <h3 className="text-sm font-medium text-gray-900">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
