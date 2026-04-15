import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClipboardList, Users, UserCheck, Rocket, Globe, Smartphone, Cloud, Palette, ClipboardCheck, Settings, CheckCircle2, Layers, DollarSign, Target } from "lucide-react"

const whatWeOffer = [
  {
    title: "End-to-End Team Setup",
    description: "Fully managed teams with the right mix of skills tailored to your needs.",
    image: "/images/dedicated/offer-1.jpg",
  },
  {
    title: "Scalable Team Structure",
    description: "Expand or optimize your team as your business requirements evolve.",
    image: "/images/dedicated/offer-2.jpg",
  },
  {
    title: "Agile Delivery Model",
    description: "Continuous development with iterative improvements.",
    image: "/images/dedicated/offer-3.jpg",
  },
  {
    title: "Full Transparency",
    description: "Clear communication, reporting, and performance tracking at every stage.",
    image: "/images/dedicated/offer-4.jpg",
  },
  {
    title: "Long-Term Collaboration",
    description: "Teams aligned with your vision and business objectives.",
    image: "/images/dedicated/offer-5.jpg",
  },
]

const whyChoosePoints = [
  "Maintain full control over your dedicated team and workflows",
  "Ensure seamless communication and complete transparency",
  "Build long-term collaboration with consistent team alignment",
  "Scale your team structure based on evolving business needs",
  "Increase productivity with focused and dedicated resources",
  "Improve accountability with clearly defined roles and tracking",
]

const processSteps = [
  {
    title: "Requirement Analysis",
    description: "Understand your project scope, business goals, and technical needs.",
    icon: ClipboardList,
    image: "/images/dedicated/process-1.png",
  },
  {
    title: "Team Formation",
    description: "Build a dedicated team with the right mix of skills.",
    icon: Users,
    image: "/images/dedicated/process-2.png",
  },
  {
    title: "Onboarding",
    description: "Align the team with your workflows, tools, and processes.",
    icon: UserCheck,
    image: "/images/dedicated/process-3.png",
  },
  {
    title: "Execution & Delivery",
    description: "Continuous development, monitoring, and improvement.",
    icon: Rocket,
    image: "/images/dedicated/process-4.png",
  },
]

const ourServices = [
  {
    title: "Dedicated Development Teams",
    description: "Build a fully dedicated team aligned with your project and business goals.",
    image: "/images/dedicated/service-1.jpg",
  },
  {
    title: "Full-Stack Development",
    description: "Develop scalable front-end and back-end solutions using modern technologies.",
    image: "/images/dedicated/service-2.jpg",
  },
  {
    title: "Agile Project Management",
    description: "Ensure efficient delivery with agile methodologies and continuous iterations.",
    image: "/images/dedicated/service-3.jpg",
  },
  {
    title: "UI/UX Design",
    description: "Create intuitive and user-friendly designs for better user engagement.",
    image: "/images/dedicated/service-4.jpg",
  },
  {
    title: "Quality Assurance & Testing",
    description: "Deliver reliable and high-performance applications with thorough testing.",
    image: "/images/dedicated/service-5.jpg",
  },
  {
    title: "Ongoing Support & Maintenance",
    description: "Provide continuous monitoring, updates, and improvements post-deployment.",
    image: "/images/dedicated/service-6.jpg",
  },
]

const keyBenefits = [
  {
    title: "Full Control",
    description: "Manage your team directly and maintain full visibility into workflows and performance",
    icon: Settings,
  },
  {
    title: "Scalability",
    description: "Easily expand or reduce your team based on project needs",
    icon: Layers,
  },
  {
    title: "Dedicated Focus",
    description: "A fully committed team ensures consistent delivery and better quality",
    icon: Target,
  },
  {
    title: "Cost Efficiency",
    description: "Reduce hiring and operational costs while maintaining high performance",
    icon: DollarSign,
  },
]

export default function DedicatedTeamsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[450px] md:min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/dedicated/hero.jpg"
            alt="Dedicated Teams"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Dedicated Teams
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-4">
              Build high-performing, fully aligned teams focused on your long-term success.
            </p>
            <p className="text-base text-gray-300 leading-relaxed mb-8">
              Our Dedicated Teams model offers you a fully committed team that works exclusively on your projects, functioning as an extension of your organization. We assemble cross-functional teams tailored to your business needs, ensuring deep collaboration, transparency, and accountability.
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
            Dedicated Teams
          </h2>

          {/* Paragraph 1 */}
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Build high-performing, fully aligned teams focused on your long-term success.
          </p>

          {/* Paragraph 2 */}
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Our Dedicated Teams model offers you a fully committed team that works exclusively on your projects, functioning as an extension of your organization. We assemble cross-functional teams tailored to your business needs, ensuring deep collaboration, transparency, and accountability.
          </p>

          {/* Paragraph 3 */}
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            This approach is ideal for organizations seeking long-term partnerships and continuous product development.
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

      {/* Why Choose Dedicated Teams Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
            Why Choose Dedicated Teams
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whyChoosePoints.map((point) => (
              <div key={point} className="flex items-center gap-3 bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-[#1e90ff] flex-shrink-0" />
                <span className="text-gray-800 font-medium">{point}</span>
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
            {ourServices.map((service) => (
              <div key={service.title} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 relative">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

      {/* Key Benefits Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
            Key Benefits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyBenefits.map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
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

      {/* CTA Section */}
      <section className="relative py-20 md:py-24 flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/dedicated/cta-bg.jpg"
            alt="CTA Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0a1628]/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Build Your Dedicated Team Today
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Partner with us to create a dedicated team that works exclusively on your projects and drives long-term success. Empower your business with a reliable team that grows with your vision.
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
