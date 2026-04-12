import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About Us - Immense Brains",
  description: "At Immense Brains, we exist to create opportunity – for our clients, our candidates, and each other.",
}

const coreValues = [
  {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trust-about-itDjSoKgRWYvnrxVzuDzjOoiRar7xg.png",
    title: "Respect",
    description: "Set trends for your peers and the industry in general to follow.",
  },
  {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/value-about-6i4xV5nMvoJYSFpoaoYv4mp6NdkY8V.png",
    title: "Exceptional value",
    description: "Understand and exceed customer's expectations all the time.",
  },
  {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/group-about-GrJ2wyjxBkSpCAyFor3cHY2ECf4XaE.png",
    title: "Authenticity",
    description: "Be sincere, honest, and open in dealings to ensure trustworthiness.",
  },
  {
    icon: "/leadership-icon.png",
    title: "Leadership",
    description: "Lead by example, drive innovation, and create positive change across teams.",
  },
]

const keyClients = [
  { name: "TruGlobal", logo: "/clients/truglobal.png" },
  { name: "Palo Alto", logo: "/clients/paloalto.png" },
  { name: "Neo Systems", logo: "/clients/neo.png" },
  { name: "Triumvirate", logo: "/clients/triumvirate.png" },
  { name: "PSRTEK", logo: "/clients/psrtek.png" },
  { name: "ABC Supply", logo: "/clients/abc.png" },
  { name: "Cambia", logo: "/clients/cambia.png" },
  { name: "FIS", logo: "/clients/fis.png" },
  { name: "Illumina", logo: "/clients/illumina.png" },
  { name: "Johnson & Johnson", logo: "/clients/jnj.png" },
  { name: "HCL Tech", logo: "/clients/hcltech.png" },
]

const partnerships = [
  { name: "KForce", logo: "/partners/kforce.png" },
  { name: "ALKU", logo: "/partners/alku.png" },
  { name: "Randstad", logo: "/partners/randstad.png" },
  { name: "Altimetrik", logo: "/partners/altimetrik.png" },
  { name: "Capgemini", logo: "/partners/capgemini.png" },
  { name: "N2S", logo: "/partners/n2s.png" },
  { name: "Deloitte", logo: "/partners/deloitte.png" },
  { name: "Quadrant", logo: "/partners/quadrant.png" },
  { name: "L&T Technology", logo: "/partners/lnt.png" },
]

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section with Background Image */}
        <section 
          className="relative min-h-[200px] md:min-h-[280px] flex items-center"
          style={{
            backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-image-%20top-01%20-7hyPuLnm3jG3akkqH8VOkUntQxzoRI.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
            <h1 className="text-3xl md:text-5xl font-bold text-white">About Us</h1>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-12 md:py-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg md:text-2xl text-gray-700 leading-relaxed">
              At Immense Brains, we exist to create opportunity – for our clients, our candidates, and each other. Through a network of specialized companies, we connect great people with great opportunities, helping businesses succeed and careers soar.
            </p>
          </div>
        </section>

        {/* Three Cards Section */}
        <section className="py-8 md:py-12 px-4 md:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Join Us Card */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-join-us-OYbmzn8h8Ol0DF0IpjuFWCdWC90ZyA.jpg"
                    alt="Join Us - Team collaboration"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Join Us</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Our business is people. We discover, develop, and transform the leaders of today and tomorrow through our diverse and experienced network of advisors.
                  </p>
                </div>
              </div>

              {/* Diversity & Inclusion Card */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Diversity-Inclusion-about-aklG5SXiB4ooOiAUZTSt4Hg7pZYlbC.png"
                    alt="Diversity & Inclusion - Hands together"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Diversity & Inclusion Commitment</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Our business is people. We discover, develop, and transform the leaders of today and tomorrow through our diverse
                  </p>
                </div>
              </div>

              {/* Impact Card */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Impact-for-a-Better-World-about-YB5m84mR7fWIrdn0su5OpDYNAEdlJF.jpg"
                    alt="Impact for a Better World"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Impact for a Better World</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Our business is people. We discover, develop, and transform the leaders of today and tomorrow through our diverse and experienced network of advisors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section 
          className="py-16 md:py-24 px-4 md:px-8 relative"
          style={{
            backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AI-industry-background-image-bx3xHVjTKs2sVDtwjqkhlt9dylFuK9.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-[#0a1628]/80" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {/* Respect */}
              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 relative">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trust-about-itDjSoKgRWYvnrxVzuDzjOoiRar7xg.png"
                    alt="Respect"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Respect</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Set trends for your peers and the industry in general to follow.
                </p>
              </div>

              {/* Exceptional Value */}
              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 relative">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/value-about-6i4xV5nMvoJYSFpoaoYv4mp6NdkY8V.png"
                    alt="Exceptional value"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Exceptional value</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {"Understand and exceed customer's expectations all the time."}
                </p>
              </div>

              {/* Authenticity */}
              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 relative">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/group-about-GrJ2wyjxBkSpCAyFor3cHY2ECf4XaE.png"
                    alt="Authenticity"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Authenticity</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Be sincere, honest, and open in dealings to ensure trustworthiness.
                </p>
              </div>

              {/* Leadership */}
              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 md:w-16 md:h-16 text-[#f5b800]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="32" cy="16" r="8" />
                    <path d="M20 40 L32 28 L44 40" />
                    <path d="M32 28 L32 52" />
                    <circle cx="20" cy="48" r="6" />
                    <circle cx="44" cy="48" r="6" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Leadership</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Lead by example, drive innovation, and create positive change across teams.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Key Clients Section */}
        <section className="py-16 md:py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Key Clients</h2>
                <p className="text-gray-600 leading-relaxed">
                  We deliver exceptional technology solutions for world-class businesses in every business industry from dynamic startups and SMBs to Fortune 500 companies.
                </p>
              </div>
              <div className="lg:col-span-2">
                <div className="grid grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 items-center">
                  {/* Client logos placeholders */}
                  <div className="flex items-center justify-center h-12">
                    <span className="text-sm font-bold text-blue-900">TRUGLOBAL</span>
                  </div>
                  <div className="flex items-center justify-center h-12">
                    <span className="text-sm font-bold text-green-700">paloalto</span>
                  </div>
                  <div className="flex items-center justify-center h-12">
                    <span className="text-sm font-bold text-blue-600">neo<span className="text-orange-500">SYSTEMS</span></span>
                  </div>
                  <div className="flex items-center justify-center h-12">
                    <span className="text-xs font-bold text-green-800">TRIUMVIRATE</span>
                  </div>
                  <div className="flex items-center justify-center h-12">
                    <span className="text-sm font-bold text-blue-800">PSRTEK</span>
                  </div>
                  <div className="flex items-center justify-center h-12">
                    <span className="text-sm font-bold text-red-600">ABC</span>
                  </div>
                  <div className="flex items-center justify-center h-12">
                    <span className="text-sm font-bold text-blue-700">CAMBIA</span>
                  </div>
                  <div className="flex items-center justify-center h-12">
                    <span className="text-sm font-bold text-gray-800">FIS</span>
                  </div>
                  <div className="flex items-center justify-center h-12">
                    <span className="text-sm font-bold text-orange-600">illumina</span>
                  </div>
                  <div className="flex items-center justify-center h-12">
                    <span className="text-sm font-bold text-red-700">Johnson&Johnson</span>
                  </div>
                  <div className="flex items-center justify-center h-12">
                    <span className="text-sm font-bold text-blue-900">HCLTech</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partnerships Section */}
        <section className="py-16 md:py-20 px-4 md:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Partnerships</h2>
                <p className="text-gray-600 leading-relaxed">
                  Several valuable partnerships were forged along this journey, and our research has been published on different websites.
                </p>
              </div>
              <div className="lg:col-span-2">
                <div className="grid grid-cols-3 md:grid-cols-3 gap-6 md:gap-8 items-center">
                  {/* Partner logos placeholders */}
                  <div className="flex items-center justify-center h-12">
                    <span className="text-sm font-bold text-blue-800">KFORCE</span>
                  </div>
                  <div className="flex items-center justify-center h-12">
                    <span className="text-sm font-bold text-blue-900">ALKU</span>
                  </div>
                  <div className="flex items-center justify-center h-12">
                    <span className="text-sm font-bold text-blue-700">randstad</span>
                  </div>
                  <div className="flex items-center justify-center h-12">
                    <span className="text-sm font-bold text-purple-700">ALTIMETRIK</span>
                  </div>
                  <div className="flex items-center justify-center h-12">
                    <span className="text-sm font-bold text-blue-600">Capgemini</span>
                  </div>
                  <div className="flex items-center justify-center h-12">
                    <span className="text-sm font-bold text-teal-600">n2S</span>
                  </div>
                  <div className="flex items-center justify-center h-12">
                    <span className="text-sm font-bold text-gray-900">Deloitte.</span>
                  </div>
                  <div className="flex items-center justify-center h-12">
                    <span className="text-sm font-bold text-blue-800">QUADRANT</span>
                  </div>
                  <div className="flex items-center justify-center h-12">
                    <span className="text-xs font-bold text-blue-700">L&T Technology</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
