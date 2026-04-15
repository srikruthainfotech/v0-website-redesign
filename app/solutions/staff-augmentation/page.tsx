import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClipboardList, Users, UserCheck, Headphones, Globe, Smartphone, Cloud, Palette, ClipboardCheck, Settings } from "lucide-react"

const whatWeOffer = [
  {
    title: "On-Demand Talent",
    description: "Access a pool of pre-vetted, skilled professionals ready to contribute.",
    image: "/images/offer-1.jpg",
  },
  {
    title: "Flexible Engagement Models",
    description: "Scale resources up or down based on your project needs.",
    image: "/images/offer-2.jpg",
  },
  {
    title: "Specialized Expertise",
    description: "Domain experts across technologies and industries.",
    image: "/images/offer-3.jpg",
  },
  {
    title: "Seamless Integration",
    description: "Resources aligned with your workflows and processes.",
    image: "/images/offer-4.jpg",
  },
  {
    title: "Rapid Deployment",
    description: "Reduce hiring time and accelerate project timelines.",
    image: "/images/offer-5.jpg",
  },
]

const whyChoose = [
  {
    title: "Access to Skilled Professionals",
    description: "Get immediate access to vetted experts across multiple technologies.",
    image: "/images/why-1.jpg",
  },
  {
    title: "Faster Hiring Process",
    description: "Reduce time-to-hire from months to days with our ready talent pool.",
    image: "/images/why-2.jpg",
  },
  {
    title: "Flexible Scaling",
    description: "Easily scale your team up or down based on project demands.",
    image: "/images/why-3.jpg",
  },
  {
    title: "Cost Efficiency",
    description: "Reduce overhead costs associated with full-time hiring.",
    image: "/images/why-4.jpg",
  },
  {
    title: "Seamless Team Integration",
    description: "Our professionals integrate smoothly with your existing workflows.",
    image: "/images/why-5.jpg",
  },
  {
    title: "Improved Productivity",
    description: "Boost output with experienced talent ready to contribute from day one.",
    image: "/images/why-6.jpg",
  },
]

const processSteps = [
  {
    title: "Requirement Analysis",
    description: "We understand your project needs, skill requirements, and timeline expectations.",
    icon: ClipboardList,
    image: "/images/process-1.png",
  },
  {
    title: "Talent Matching",
    description: "Our team identifies and shortlists the best-fit professionals from our talent pool.",
    icon: Users,
    image: "/images/process-2.png",
  },
  {
    title: "Onboarding",
    description: "Selected resources are onboarded and aligned with your team and processes.",
    icon: UserCheck,
    image: "/images/process-3.png",
  },
  {
    title: "Execution & Support",
    description: "Ongoing support and performance monitoring to ensure project success.",
    icon: Headphones,
    image: "/images/process-4.png",
  },
]

const keyBenefits = [
  {
    title: "Flexibility",
    description: "Easily scale your workforce based on project demands without long-term commitments.",
    image: "/images/benefit-1.jpg",
  },
  {
    title: "Cost Efficiency",
    description: "Reduce hiring, training, and operational costs while optimizing your budget.",
    image: "/images/benefit-2.jpg",
  },
  {
    title: "Skilled Talent",
    description: "Access experienced professionals across multiple technologies and domains.",
    image: "/images/benefit-3.jpg",
  },
  {
    title: "Faster Delivery",
    description: "Accelerate project timelines with ready-to-deploy resources.",
    image: "/images/benefit-4.jpg",
  },
]

const ourServices = [
  {
    title: "Web Development",
    description: "Build scalable and high-performance web applications tailored to your business needs.",
    icon: Globe,
  },
  {
    title: "Mobile App Development",
    description: "Develop user-friendly mobile applications for iOS and Android platforms.",
    icon: Smartphone,
  },
  {
    title: "Cloud Solutions",
    description: "Design and deploy secure, scalable cloud-based infrastructure and applications.",
    icon: Cloud,
  },
  {
    title: "UI/UX Design",
    description: "Create intuitive and engaging user experiences that enhance customer satisfaction.",
    icon: Palette,
  },
  {
    title: "QA & Testing",
    description: "Ensure software quality with comprehensive testing and performance validation.",
    icon: ClipboardCheck,
  },
  {
    title: "Maintenance & Support",
    description: "Provide ongoing support, updates, and performance monitoring.",
    icon: Settings,
  },
]

export default function StaffAugmentationPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[450px] md:min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/staff-hero.jpg"
            alt="Staff Augmentation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Staff Augmentation
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-4">
              Enhance your workforce with skilled professionals, aligned to your business goals.
            </p>
            <p className="text-base text-gray-300 leading-relaxed mb-8">
              Our Staff Augmentation services enable organizations to quickly scale their teams with highly qualified talent, without the complexities of traditional hiring.
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
            Staff Augmentation
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Enhance your workforce with skilled professionals, aligned to your business goals. Our Staff Augmentation services enable organizations to quickly scale their teams with highly qualified talent, without the complexities of traditional hiring. We provide experienced professionals who seamlessly integrate with your existing teams, ensuring continuity, productivity, and faster delivery. Whether you need specialized expertise for a critical project or additional capacity to meet deadlines, we offer flexible engagement models tailored to your requirements.
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

      {/* Our Services Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ourServices.map((service) => (
              <div key={service.title} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="w-14 h-14 bg-[#1e90ff]/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-7 h-7 text-[#1e90ff]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">{service.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
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

      {/* Why Choose Staff Augmentation Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
            Why Choose Staff Augmentation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
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
              <div key={benefit.title} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 relative">
                  <Image
                    src={benefit.image}
                    alt={benefit.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
            Build Your Team with the Right Talent.
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Partner with us to scale your workforce efficiently and achieve your business goals faster. Let us help you bridge skill gaps and drive success with the right talent at the right time.
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
