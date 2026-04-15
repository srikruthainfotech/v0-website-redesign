import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClipboardList, Target, Cog, BarChart3, TestTube2, Zap, Shield, Clock, TrendingUp, Users, RefreshCw, CheckCircle2 } from "lucide-react"

export const metadata = {
  title: "QA Testing & Automation | Immense Brains",
  description: "Ensure quality, reliability, and performance at every stage of your application lifecycle with our comprehensive QA Testing & Automation services.",
}

const offerings = [
  {
    title: "Manual & Automated Testing",
    description: "A balanced approach to ensure complete test coverage",
    image: "/images/offer-1.jpg",
  },
  {
    title: "Functional & Regression Testing",
    description: "Validate features and prevent unexpected issues",
    image: "/images/offer-2.jpg",
  },
  {
    title: "Performance Testing",
    description: "Ensure your application performs under real-world conditions",
    image: "/images/offer-3.jpg",
  },
  {
    title: "API & Integration Testing",
    description: "Verify seamless communication between systems",
    image: "/images/offer-4.jpg",
  },
  {
    title: "Test Automation Frameworks",
    description: "Speed up releases with reusable and scalable automation",
    image: "/images/offer-5.jpg",
  },
  {
    title: "Continuous Testing (CI/CD)",
    description: "Integrate testing into your development pipeline",
    image: "/images/offer-6.jpg",
  },
]

const whyChoose = [
  {
    title: "Improved Product Quality",
    description: "Identify defects early and deliver stable, high-quality applications.",
    image: "/images/why-1.jpg",
  },
  {
    title: "Faster Time-to-Market",
    description: "Accelerate releases with efficient testing and automation.",
    image: "/images/why-2.jpg",
  },
  {
    title: "Reduced Risk",
    description: "Minimize failures and ensure consistent performance.",
    image: "/images/why-3.jpg",
  },
  {
    title: "Scalable Testing",
    description: "Adapt testing processes as your application grows.",
    image: "/images/why-4.jpg",
  },
  {
    title: "Automation Efficiency",
    description: "Automate repetitive tasks to improve speed and accuracy.",
    image: "/images/why-5.jpg",
  },
  {
    title: "Continuous Improvement",
    description: "Enhance testing strategies with ongoing optimization.",
    image: "/images/why-6.jpg",
  },
]

const keyBenefits = [
  {
    title: "Faster Releases",
    description: "Accelerate development cycles with automated and continuous testing.",
    image: "/images/benefit-1.jpg",
  },
  {
    title: "Enhanced Quality",
    description: "Deliver bug-free and high-performing applications across platforms.",
    image: "/images/benefit-2.jpg",
  },
  {
    title: "Cost Efficiency",
    description: "Reduce long-term costs by identifying and fixing issues early.",
    image: "/images/benefit-3.jpg",
  },
  {
    title: "Better User Experience",
    description: "Ensure seamless performance and reliability for end users.",
    image: "/images/benefit-4.jpg",
  },
]

const processSteps = [
  {
    icon: ClipboardList,
    title: "Requirement Analysis",
    description: "Understand application requirements and testing goals.",
    image: "/images/process-1.png",
    step: 1,
  },
  {
    icon: Target,
    title: "Test Planning & Strategy",
    description: "Define test cases, tools, and execution strategy.",
    image: "/images/process-2.png",
    step: 2,
  },
  {
    icon: Cog,
    title: "Execution & Automation",
    description: "Perform manual and automated testing efficiently.",
    image: "/images/process-3.png",
    step: 3,
  },
  {
    icon: BarChart3,
    title: "Reporting & Optimization",
    description: "Analyze results and continuously improve quality.",
    image: "/images/process-4.png",
    step: 4,
  },
]

const services = [
  { title: "Manual Testing", icon: TestTube2 },
  { title: "Automation Testing", icon: Cog },
  { title: "Performance Testing", icon: Zap },
  { title: "API Testing", icon: RefreshCw },
  { title: "Security Testing", icon: Shield },
  { title: "Maintenance & Support", icon: Users },
]

export default function QATestingAutomationPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[450px] md:min-h-[550px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/qa-hero.jpg"
            alt="QA Testing & Automation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/70 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              QA Testing & Automation
            </h1>
            <p className="text-xl md:text-2xl text-[#00d4ff] font-medium mb-4">
              Ensure quality, reliability, and performance at every stage of your application lifecycle.
            </p>
            <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-8">
              Our QA Testing & Automation services help businesses deliver flawless digital experiences by identifying issues early and ensuring seamless performance.
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
            QA Testing & Automation
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Ensure quality, reliability, and performance at every stage of your application lifecycle.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mt-4">
            Our QA Testing & Automation services help businesses deliver flawless digital experiences by identifying issues early and ensuring your applications perform seamlessly across all platforms. We combine manual expertise with advanced automation tools to accelerate testing cycles and improve product quality.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mt-4">
            We focus on delivering robust, scalable, and high-performing applications by implementing comprehensive testing strategies tailored to your business needs.
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
            {offerings.map((offer) => (
              <div
                key={offer.title}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 relative">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">{offer.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{offer.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose QA Testing & Automation Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Choose QA Testing & Automation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item) => (
              <div
                key={item.title}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-40 relative">
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

      {/* Key Benefits Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
            Key Benefits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-40 relative">
                  <Image
                    src={benefit.image}
                    alt={benefit.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">{benefit.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
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
                  <p className="text-xs text-gray-500 mt-2 max-w-[140px]">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block w-16 lg:w-24 h-0.5 bg-[#1e90ff]/30 mx-2" />
                )}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 bg-[#1e90ff]/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-7 h-7 text-[#1e90ff]" />
                </div>
                <h3 className="font-medium text-gray-900 text-sm">{service.title}</h3>
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
            Deliver High-Quality Software with Confidence
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Partner with us to ensure your applications are reliable, secure, and high-performing. Achieve faster releases and better user experiences with our QA and automation expertise.
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
