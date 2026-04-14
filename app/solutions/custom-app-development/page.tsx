import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckCircle2, ClipboardList, Lightbulb, Code2, TestTube2, Rocket, Layers, ShieldCheck, Palette, Plug, Monitor, Zap, ChevronDown } from "lucide-react"

export const metadata = {
  title: "Custom App Development | Immense Brains",
  description: "Build scalable, secure & high-performance applications tailored to your business needs. We transform ideas into powerful digital solutions.",
}

const services = [
  {
    title: "Web Application Development",
    description: "We build responsive, fast, and secure web applications.",
    image: "/images/service-web.jpg",
  },
  {
    title: "Mobile App Development",
    description: "We develop Android & iOS apps with high performance.",
    image: "/images/service-mobile.jpg",
  },
  {
    title: "Enterprise Applications",
    description: "Robust solutions to manage business processes efficiently.",
    image: "/images/service-enterprise.jpg",
  },
  {
    title: "Cloud-Based Applications",
    description: "Scalable cloud solutions for flexibility and cost savings.",
    image: "/images/service-cloud.jpg",
  },
]

const processSteps = [
  {
    icon: ClipboardList,
    title: "Requirement Analysis",
    step: 1,
  },
  {
    icon: Lightbulb,
    title: "Planning & Design",
    step: 2,
  },
  {
    icon: Code2,
    title: "Development",
    step: 3,
  },
  {
    icon: TestTube2,
    title: "Testing",
    step: 4,
  },
  {
    icon: Rocket,
    title: "Deployment & Support",
    step: 5,
  },
]

const whyChooseUs = [
  "Experienced development team",
  "Latest technologies & tools",
  "On-time project delivery",
  "End-to-end support",
  "Client-focused approach",
]

const keyFeatures = [
  {
    icon: Layers,
    title: "Scalable Architecture",
    description: "Designed to handle growth with flexible and scalable system design.",
  },
  {
    icon: ShieldCheck,
    title: "High Security Standards",
    description: "Built with strong security practices to protect data and applications.",
  },
  {
    icon: Palette,
    title: "User-Friendly Design",
    description: "Intuitive and modern UI/UX for better user engagement.",
  },
  {
    icon: Plug,
    title: "API Integration",
    description: "Seamless integration with third-party services and systems.",
  },
  {
    icon: Monitor,
    title: "Cross-Platform Compatibility",
    description: "Applications that work smoothly across devices and platforms.",
  },
  {
    icon: Zap,
    title: "High Performance",
    description: "Optimized for speed, reliability, and efficiency.",
  },
]

const faqs = [
  {
    question: "How long does it take to build a custom application?",
    answer: "The timeline depends on the complexity and requirements of the project. Typically, it can range from a few weeks to several months.",
  },
  {
    question: "Do you provide post-launch support?",
    answer: "Yes, we offer ongoing maintenance, updates, and support to ensure your application runs smoothly.",
  },
  {
    question: "Can you upgrade existing applications?",
    answer: "Yes, we can enhance, modernize, and scale your existing applications based on your business needs.",
  },
  {
    question: "What technologies do you use?",
    answer: "We use modern technologies such as React, Next.js, Node.js, Python, cloud platforms, and more based on project requirements.",
  },
]

export default function CustomAppDevelopmentPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[450px] md:min-h-[550px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/custom-app-hero-bg.jpg"
            alt="Custom App Development"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/70 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Custom App Development
            </h1>
            <p className="text-xl md:text-2xl text-[#00d4ff] font-medium mb-4">
              Build Scalable, Secure & High-Performance Applications
            </p>
            <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-8">
              We design and develop custom applications tailored to your business needs. From startups to enterprises, we transform ideas into powerful digital solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#1e90ff] hover:bg-[#1a7fe0] text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Custom App Development
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Build scalable, secure, and user-friendly applications tailored to your business needs.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mt-4">
            We transform your ideas into powerful digital solutions that improve efficiency, enhance user experience, and support long-term business growth.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Tailored Solutions for Your Business
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We develop custom applications designed specifically for your business requirements. Our solutions are secure, scalable, and optimized for high performance.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From planning to deployment, we handle the complete development lifecycle, ensuring smooth functionality and seamless integration.
              </p>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/about-custom-app.jpg"
                alt="Tailored Solutions for Your Business"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
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

      {/* Development Process Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Development Process
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
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block w-16 lg:w-24 h-0.5 bg-[#1e90ff]/30 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyChooseUs.map((item) => (
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

      {/* Key Features Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
            Key Features of Our Applications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-[#1e90ff]/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-[#1e90ff]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-gray-50 rounded-lg overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-gray-900 hover:bg-gray-100 transition-colors">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-200" />
                </summary>
                <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <Image
            src="/images/cta-build-app-bg.jpg"
            alt="Call to Action Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0a1628]/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            {"Let's Build Your Custom Application"}
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            {"Have an idea? We'll turn it into a powerful digital solution."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#1e90ff] hover:bg-[#1a7fe0] text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Contact Us Today
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
