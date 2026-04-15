import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClipboardList, Compass, Code, CheckCircle, Smartphone, Wifi, Bell, Monitor, Shield, Zap, Globe, Palette, Settings, Headphones, Database } from "lucide-react"

const whatWeOffer = [
  {
    title: "App-like User Experience",
    description: "Smooth, intuitive interfaces that feel like native mobile apps.",
    image: "/images/offer-1.jpg",
  },
  {
    title: "Offline Functionality",
    description: "Access key features even without an internet connection.",
    image: "/images/offer-2.jpg",
  },
  {
    title: "Push Notifications",
    description: "Re-engage users with timely updates and alerts.",
    image: "/images/offer-3.jpg",
  },
  {
    title: "Cross-Platform Compatibility",
    description: "One solution that works across mobile, tablet, and desktop.",
    image: "/images/offer-4.jpg",
  },
  {
    title: "Secure & Reliable",
    description: "Built with HTTPS to ensure data protection and trust.",
    image: "/images/offer-5.jpg",
  },
]

const whyChoose = [
  {
    title: "Improved Performance",
    description: "Fast loading speeds and smooth interactions enhance user experience.",
    image: "/images/why-1.jpg",
  },
  {
    title: "Cost Efficiency",
    description: "Single application reduces development and maintenance costs.",
    image: "/images/why-2.jpg",
  },
  {
    title: "No App Store Dependency",
    description: "Users can access apps directly from the browser without downloads.",
    image: "/images/why-3.jpg",
  },
  {
    title: "Wider Reach",
    description: "Reach users across all devices with a single solution.",
    image: "/images/why-4.jpg",
  },
  {
    title: "Enhanced Engagement",
    description: "Increase retention with push notifications and offline access.",
    image: "/images/why-5.jpg",
  },
  {
    title: "Easy Maintenance",
    description: "Update your application instantly without requiring user action.",
    image: "/images/why-6.jpg",
  },
]

const processSteps = [
  {
    title: "Requirement Analysis",
    description: "Understand your business goals and user requirements.",
    icon: ClipboardList,
    image: "/images/process-1.png",
  },
  {
    title: "Planning & Strategy",
    description: "Define architecture, features, and performance goals.",
    icon: Compass,
    image: "/images/process-2.png",
  },
  {
    title: "Development & Implementation",
    description: "Build fast, scalable, and reliable PWA solutions.",
    icon: Code,
    image: "/images/process-3.png",
  },
  {
    title: "Testing & Deployment",
    description: "Ensure quality, performance, and seamless deployment.",
    icon: CheckCircle,
    image: "/images/process-4.png",
  },
]

const keyBenefits = [
  {
    title: "Faster Performance",
    description: "Deliver lightning-fast experiences with optimized loading and caching.",
    image: "/images/benefit-1.jpg",
  },
  {
    title: "Offline Access",
    description: "Ensure uninterrupted usage even in low or no network conditions.",
    image: "/images/benefit-2.jpg",
  },
  {
    title: "Increased Engagement",
    description: "Boost user interaction with app-like features and notifications.",
    image: "/images/benefit-3.jpg",
  },
  {
    title: "Cross-Platform Reach",
    description: "Reach users on any device with a single web application.",
    image: "/images/benefit-4.jpg",
  },
]

const ourServices = [
  {
    title: "PWA Development",
    description: "Build modern progressive web applications with cutting-edge technologies.",
    icon: Smartphone,
  },
  {
    title: "UI/UX Design",
    description: "Create intuitive and engaging user experiences that delight customers.",
    icon: Palette,
  },
  {
    title: "Performance Optimization",
    description: "Optimize loading times, caching strategies, and overall app performance.",
    icon: Zap,
  },
  {
    title: "API Integration",
    description: "Seamlessly connect your PWA with backend services and third-party APIs.",
    icon: Database,
  },
  {
    title: "Maintenance & Support",
    description: "Provide ongoing support, updates, and performance monitoring.",
    icon: Headphones,
  },
]

export default function PWADevelopmentPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[450px] md:min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/pwa-hero.jpg"
            alt="Progressive Web App Development"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Progressive Web App Development
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-4">
              Deliver fast, reliable, and app-like experiences directly through the web.
            </p>
            <p className="text-base text-gray-300 leading-relaxed mb-8">
              Our Progressive Web App (PWA) development services help businesses create modern web applications that combine the best of websites and mobile apps.
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
            Progressive Web App Development
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Deliver fast, reliable, and app-like experiences directly through the web. Our Progressive Web App (PWA) development services help businesses create modern web applications that combine the best of websites and mobile apps. With PWAs, your customers can enjoy a seamless, high-performance experience across all devices—without the need to download anything from an app store. We build PWAs that are fast, responsive, and work even in low or no network conditions. By leveraging advanced technologies like service workers and offline caching, we ensure your application remains accessible anytime, anywhere.
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

      {/* Why Choose PWA Development Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
            Why Choose PWA Development
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

      {/* Services We Offer Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
            Services We Offer
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
            Transform Your Web Experience with PWA
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Partner with us to build fast, reliable, and engaging progressive web applications that deliver seamless user experiences across all devices.
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
