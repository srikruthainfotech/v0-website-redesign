import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const industries = [
  {
    title: "BANKING & FINANCIAL",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banking-financial-industies-UXRF1SPlcjqrCJafwaUkQed4aNEtAx.jpg",
    description: "We deliver secure, scalable digital solutions that help banks and financial institutions streamline operations, manage risk, and enhance customer experiences."
  },
  {
    title: "EDUCATION",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/education-industries-qTnT7Jmi5hdxiJLcVYcnU6o2kUAJmB.jpg",
    description: "We empower educational institutions with smart technology solutions that improve learning outcomes, simplify administration, and support digital transformation."
  },
  {
    title: "ENERGY & UTILITY",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/energy-utility-industries-8KElg87yVLlehjm0cuX2De62cAqN8a.jpg",
    description: "We enable energy and utility providers with intelligent systems that optimize operations, improve sustainability, and support efficient resource management."
  },
  {
    title: "GOVERNMENT",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/government-industries-67DENXPCssF3bMJIX1L1PikWWUPvwX.jpg",
    description: "We support government agencies with secure, scalable digital solutions that enhance service delivery, transparency, and operational efficiency."
  },
  {
    title: "HEALTHCARE & LIFE SCIENCE",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/healthcare-scaled-hbjQdxWmFBHj3fvdvjZ7nKjceAUt7P.jpeg",
    description: "We deliver technology solutions that improve patient care, streamline operations, and enable data-driven innovation across healthcare and life sciences."
  },
  {
    title: "LOGISTICS & WAREHOUSING",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logistics-scaled-4znB1i6GMh5rYOxa2BazASyZBM6Y7c.jpeg",
    description: "We optimize supply chains with smart systems that enhance visibility, efficiency, and real-time inventory management."
  },
  {
    title: "RETAIL & CONSUMER",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/retailprincipal-industries-3ffs6Po6e95bq0LKGhcBQNsDH4Daik.png",
    description: "We help retail and consumer brands deliver seamless omnichannel experiences through data-driven insights and digital transformation."
  },
  {
    title: "OIL & GAS",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/oil-and-gas-XNdxDfxsGvEEM5xQHj4VwBnoPXolOP.jpg",
    description: "We provide robust IT solutions that improve operational efficiency, safety, and decision-making across the oil and gas value chain."
  },
  {
    title: "TRAVEL & HOSPITALITY",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/travel-industries-QXb2SPFpusJPtD1iRGtdx9RPTznQXc.jpg",
    description: "We enable travel and hospitality businesses with digital solutions that enhance guest experiences, streamline operations, and drive growth."
  },
]

export default function IndustriesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section with Background */}
        <section
          className="relative px-4 md:px-8 flex items-center min-h-[180px] md:min-h-[260px]"
          style={{
            backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-image-%20top-01%20-7hyPuLnm3jG3akkqH8VOkUntQxzoRI.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-6xl mx-auto w-full flex justify-center md:justify-start">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center md:text-left md:ml-20 lg:ml-32">
              Industries
            </h1>
          </div>
        </section>
        {/* Mission Statement */}
        <section className="py-12 md:py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              {"Because of favourable adjustments brought about by industries, the corporate landscape continues to evolve dramatically. Immense Brains' mission is to provide world-class business solutions to a wide range of businesses by utilising cutting-edge IT components"}
            </p>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="py-8 md:py-12 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            {/* First Row - 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {industries.slice(0, 3).map((industry, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-full aspect-[4/3] overflow-hidden mb-4">
                    <Image
                      src={industry.image}
                      alt={industry.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-gray-900 mb-3 uppercase tracking-wide">
                    {industry.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Second Row - 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {industries.slice(3, 6).map((industry, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-full aspect-[4/3] overflow-hidden mb-4">
                    <Image
                      src={industry.image}
                      alt={industry.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-gray-900 mb-3 uppercase tracking-wide">
                    {industry.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Third Row - 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {industries.slice(6, 9).map((industry, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-full aspect-[4/3] overflow-hidden mb-4">
                    <Image
                      src={industry.image}
                      alt={industry.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-gray-900 mb-3 uppercase tracking-wide">
                    {industry.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
