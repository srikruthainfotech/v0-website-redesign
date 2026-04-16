import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckCircle2, ClipboardList, Target, Cog, BarChart3, TrendingUp, DollarSign, Layers } from "lucide-react"

export const metadata = {
  title: "Oracle Cloud Applications | Immense Brains",
  description: "Transform your business with scalable, secure, and intelligent Oracle Cloud solutions. We specialize in implementing, optimizing, and supporting Oracle Cloud solutions tailored to your business needs.",
}

const offerings = [
  {
    title: "Oracle Cloud Implementation",
    description: "End-to-end deployment of Oracle Fusion applications",
    image: "/images/offer-1.jpg",
  },
  {
    title: "HCM, ERP & SCM Solutions",
    description: "Optimize HR, finance, and supply chain processes",
    image: "/images/offer-2.jpg",
  },
  {
    title: "Cloud Migration & Upgrades",
    description: "Seamless transition from legacy systems to Oracle Cloud",
    image: "/images/offer-3.jpg",
  },
  {
    title: "Customization & Integration",
    description: "Tailored solutions integrated with your existing systems",
    image: "/images/offer-4.jpg",
  },
  {
    title: "Support & Maintenance",
    description: "Ongoing support to ensure system performance and stability",
    image: "/images/offer-5.jpg",
  },
  {
    title: "Reporting & Analytics",
    description: "Leverage data-driven insights for smarter decision-making",
    image: "/images/offer-6.jpg",
  },
]

const whyChoosePoints = [
  "Unified cloud platform with built-in intelligence and automation",
  "Real-time insights for faster and smarter decision-making",
  "Improved business agility to adapt quickly to market changes",
  "Reduced operational costs through optimized cloud infrastructure",
  "Enhanced performance with scalable and reliable solutions",
  "Future-ready technology to support long-term growth and innovation",
]

const processSteps = [
  {
    icon: ClipboardList,
    title: "Requirement Analysis",
    description: "Understand business needs",
    step: 1,
  },
  {
    icon: Target,
    title: "Planning & Strategy",
    description: "Define roadmap",
    step: 2,
  },
  {
    icon: Cog,
    title: "Implementation & Integration",
    description: "Deploy solutions",
    step: 3,
  },
  {
    icon: BarChart3,
    title: "Support & Optimization",
    description: "Continuous improvement",
    step: 4,
  },
]

const keyBenefits = [
  {
    icon: TrendingUp,
    title: "Improved Efficiency",
    description: "Streamline operations and eliminate inefficiencies",
  },
  {
    icon: DollarSign,
    title: "Cost Optimization",
    description: "Reduce infrastructure and operational costs",
  },
  {
    icon: BarChart3,
    title: "Faster Decision-Making",
    description: "Real-time insights for smarter decisions",
  },
  {
    icon: Layers,
    title: "Scalability & Growth",
    description: "Expand with flexible cloud systems",
  },
]

export default function OracleCloudApplicationsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[450px] md:min-h-[550px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/oracle-hero.jpg"
            alt="Oracle Cloud Applications"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/70 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Oracle Cloud Applications
            </h1>
            <p className="text-xl md:text-2xl text-[#00d4ff] font-medium mb-4">
              Transform your business with scalable, secure, and intelligent Oracle Cloud solutions.
            </p>
            <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-8">
              Our Oracle Cloud Applications services help organizations streamline operations, improve efficiency, and drive innovation using industry-leading cloud technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#1e90ff] hover:bg-[#1a7fe0] text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Oracle Cloud Applications
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Transform your business with scalable, secure, and intelligent Oracle Cloud solutions.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mt-4">
            Our Oracle Cloud Applications services help organizations streamline operations, improve efficiency, and drive innovation using industry-leading cloud technologies. We specialize in implementing, optimizing, and supporting Oracle Cloud solutions tailored to your business needs.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mt-4">
            Whether you are moving from on-premise systems or enhancing your existing cloud environment, we ensure a smooth and efficient transition with minimal disruption.
          </p>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((offering) => (
              <div
                key={offering.title}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 relative">
                  <Image
                    src={offering.image}
                    alt={offering.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">{offering.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{offering.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Oracle Cloud Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
            Why Choose Oracle Cloud
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyChoosePoints.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg"
              >
                <CheckCircle2 className="w-6 h-6 text-[#1e90ff] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Process
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {processSteps.map((step, index) => (
              <div key={step.title} className="flex items-center">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-[#1e90ff] rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-[#1e90ff] mb-1">Step {step.step}</span>
                  <span className="text-sm font-medium text-gray-700 max-w-[140px]">{step.title}</span>
                  <span className="text-xs text-gray-500 max-w-[140px] mt-1">{step.description}</span>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block w-16 lg:w-24 h-0.5 bg-[#1e90ff]/30 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
            Key Benefits of Oracle Cloud Applications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="w-14 h-14 bg-[#1e90ff]/10 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-7 h-7 text-[#1e90ff]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">{benefit.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <Image
            src="/images/cta-bg.jpg"
            alt="Call to Action Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0a1628]/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Transform Your Business with Oracle Cloud
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Partner with us to implement powerful Oracle Cloud solutions that drive efficiency, innovation, and growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#1e90ff] hover:bg-[#1a7fe0] text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
