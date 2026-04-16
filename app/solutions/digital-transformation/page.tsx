import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckCircle2, ClipboardList, Target, Cog, BarChart3, TrendingUp, DollarSign, Layers } from "lucide-react"

export const metadata = {
  title: "Digital Transformation | Immense Brains",
  description: "Reimagine your enterprise for the digital era with intelligent, scalable, and future-ready solutions. Transform your business processes and drive sustainable growth.",
}

const whatWeOffer = [
  {
    title: "Digital Strategy & Advisory",
    description: "Develop a forward-looking roadmap aligned with enterprise goals",
    image: "/images/offer-1.jpg",
  },
  {
    title: "Intelligent Process Automation",
    description: "Optimize operations through automation and workflow transformation",
    image: "/images/offer-2.jpg",
  },
  {
    title: "Cloud Transformation",
    description: "Accelerate adoption of secure, scalable, and resilient cloud platforms",
    image: "/images/offer-3.jpg",
  },
  {
    title: "Application Modernization",
    description: "Transform legacy systems into agile, high-performance digital solutions",
    image: "/images/offer-4.jpg",
  },
  {
    title: "Data & Advanced Analytics",
    description: "Harness data for predictive insights and informed decision-making",
    image: "/images/offer-5.jpg",
  },
  {
    title: "Experience Transformation",
    description: "Deliver seamless, personalized, and engaging customer journeys",
    image: "/images/offer-6.jpg",
  },
]

const whyChoosePoints = [
  "Align technology strategy with business goals",
  "Improve operational efficiency through automation",
  "Enhance customer experience and engagement",
  "Enable faster decision-making with real-time data",
  "Reduce costs through optimized digital processes",
  "Build a scalable and future-ready enterprise",
]

const servicesWeOffer = [
  {
    title: "Cloud Services",
    description: "Scalable and secure cloud transformation solutions",
    image: "/images/service-1.jpg",
  },
  {
    title: "Data & Analytics",
    description: "Advanced analytics for insights and decision-making",
    image: "/images/service-2.jpg",
  },
  {
    title: "Automation Solutions",
    description: "Streamline operations with intelligent automation",
    image: "/images/service-3.jpg",
  },
  {
    title: "Application Development",
    description: "Build modern and scalable digital applications",
    image: "/images/service-4.jpg",
  },
  {
    title: "Customer Experience Solutions",
    description: "Enhance engagement with personalized digital experiences",
    image: "/images/service-5.jpg",
  },
  {
    title: "IT Consulting",
    description: "Strategic guidance for digital transformation initiatives",
    image: "/images/service-6.jpg",
  },
]

const processSteps = [
  {
    icon: ClipboardList,
    title: "Requirement Analysis",
    description: "Understand business goals and challenges",
    step: 1,
  },
  {
    icon: Target,
    title: "Strategy & Planning",
    description: "Define roadmap and transformation strategy",
    step: 2,
  },
  {
    icon: Cog,
    title: "Implementation",
    description: "Execute solutions using modern technologies",
    step: 3,
  },
  {
    icon: BarChart3,
    title: "Optimization",
    description: "Continuously improve performance and outcomes",
    step: 4,
  },
]

const keyBenefits = [
  {
    icon: TrendingUp,
    title: "Operational Excellence",
    description: "Improve efficiency and streamline workflows across your organization",
  },
  {
    icon: DollarSign,
    title: "Cost Efficiency",
    description: "Reduce operational costs through automation and optimization",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Decisions",
    description: "Leverage analytics for smarter and faster business decisions",
  },
  {
    icon: Layers,
    title: "Scalability",
    description: "Adapt and grow with flexible digital infrastructure",
  },
]

export default function DigitalTransformationPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[450px] md:min-h-[550px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/digital-hero.jpg"
            alt="Digital Transformation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/70 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Digital Transformation
            </h1>
            <p className="text-xl md:text-2xl text-[#00d4ff] font-medium mb-4">
              Reimagine your enterprise for the digital era with intelligent, scalable, and future-ready solutions.
            </p>
            <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-8">
              Our Digital Transformation services empower organizations to modernize processes, enhance customer experiences, and drive sustainable growth.
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
            Digital Transformation
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Reimagine your enterprise for the digital era with intelligent, scalable, and future-ready solutions.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mt-4">
            Our Digital Transformation services empower organizations to modernize core business processes, elevate customer experiences, and drive sustainable growth in a rapidly evolving digital landscape. We take a strategic, outcome-driven approach—aligning technology initiatives with your business objectives to deliver measurable value.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mt-4">
            From vision to execution, we enable your organization to navigate complexity, enhance operational efficiency, and unlock new opportunities through the adoption of advanced digital technologies.
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
            {whatWeOffer.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Digital Transformation Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
            Why Choose Digital Transformation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyChoosePoints.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg"
              >
                <CheckCircle2 className="w-6 h-6 text-[#1e90ff] flex-shrink-0" />
                <span className="text-gray-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services We Offer Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
            Services We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesWeOffer.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 relative">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">{service.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-16 md:py-20 bg-white">
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
                  <span className="text-sm font-medium text-gray-700 max-w-[120px]">{step.title}</span>
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
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
            Key Benefits of Digital Transformation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
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
            Transform Your Business with Digital Innovation
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Partner with us to accelerate your digital transformation journey and unlock new growth opportunities with scalable, future-ready solutions.
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
