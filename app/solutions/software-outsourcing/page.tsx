import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClipboardList, Lightbulb, Code2, Headphones } from "lucide-react"

const whatWeOffer = [
  {
    title: "End-to-End Development",
    description: "From concept to deployment and support.",
    image: "/images/offer-1.jpg",
  },
  {
    title: "Custom Software Solutions",
    description: "Tailored applications built to your requirements.",
    image: "/images/offer-2.jpg",
  },
  {
    title: "Quality Assurance",
    description: "Rigorous testing to ensure reliability and performance.",
    image: "/images/offer-3.jpg",
  },
  {
    title: "Cost Optimization",
    description: "Reduce operational and development costs.",
    image: "/images/offer-4.jpg",
  },
  {
    title: "Ongoing Support & Maintenance",
    description: "Ensure long-term stability and scalability.",
    image: "/images/offer-5.jpg",
  },
]

const whyChoose = [
  {
    title: "Access to Global Talent",
    description: "Work with skilled experts across technologies and domains.",
    image: "/images/why-1.jpg",
  },
  {
    title: "Reduced Costs",
    description: "Minimize infrastructure, hiring, and operational expenses.",
    image: "/images/why-2.jpg",
  },
  {
    title: "Focus on Core Business",
    description: "Concentrate on strategic priorities while we handle development.",
    image: "/images/why-3.jpg",
  },
  {
    title: "Faster Time-to-Market",
    description: "Accelerate delivery with experienced development teams.",
    image: "/images/why-4.jpg",
  },
  {
    title: "Scalable Engagement",
    description: "Adjust resources based on project requirements.",
    image: "/images/why-5.jpg",
  },
  {
    title: "Latest Technologies",
    description: "Leverage modern tools and frameworks for better solutions.",
    image: "/images/why-6.jpg",
  },
]

const processSteps = [
  {
    title: "Requirement Analysis",
    description: "Understand your project needs and business goals.",
    icon: ClipboardList,
    image: "/images/process-1.png",
  },
  {
    title: "Planning & Strategy",
    description: "Define roadmap, timelines, and execution strategy.",
    icon: Lightbulb,
    image: "/images/process-2.png",
  },
  {
    title: "Development & Execution",
    description: "Build and implement high-quality solutions.",
    icon: Code2,
    image: "/images/process-3.png",
  },
  {
    title: "Delivery & Support",
    description: "Ensure smooth deployment and ongoing maintenance.",
    icon: Headphones,
    image: "/images/process-4.png",
  },
]

export default function SoftwareOutsourcingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[450px] md:min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/outsourcing-hero.jpg"
            alt="Software Outsourcing"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Software Outsourcing
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-4">
              Drive innovation and efficiency by outsourcing your software development to trusted experts.
            </p>
            <p className="text-base text-gray-300 leading-relaxed mb-8">
              Our Software Outsourcing services help organizations reduce operational complexity while accelerating delivery through expert-driven development.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold px-6 py-3 rounded-md transition-colors"
            >
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Software Outsourcing
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Drive innovation and efficiency by outsourcing your software development to trusted experts. Our Software Outsourcing services help organizations reduce operational complexity while accelerating delivery through expert-driven development. We take full ownership of your software projects—from design and development to testing and deployment—ensuring high quality and timely execution. With a focus on scalability, security, and performance, we deliver solutions that meet enterprise standards and business expectations.
          </p>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {whatWeOffer.map((item) => (
              <div key={item.title} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-40 relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Software Outsourcing Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
            Why Choose Software Outsourcing
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
            Our Process
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="relative mb-4">
                  <div className="w-20 h-20 mx-auto bg-[#e6faff] rounded-full flex items-center justify-center">
                    <step.icon className="w-10 h-10 text-[#00d4ff]" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#0066ff] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-24 flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cta-bg.jpg"
            alt="CTA Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0a1628]/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Transform Your Business with Software Outsourcing
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Partner with us to outsource your software development and achieve faster, cost-effective, and high-quality results. Focus on innovation while we take care of your technology needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold px-6 py-3 rounded-md transition-colors"
          >
            Get Started
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
