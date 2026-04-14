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
          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full h-full flex items-center">
            <div className="w-full md:w-1/2 flex items-center pl-4 md:pl-30">
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                About Us
              </h1>
            </div>
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
          <div className="absolute inset-0 bg-[#0a1628]/60" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Respect */}
              <div className="bg-[#1a2a4a]/60 backdrop-blur-md rounded-xl border border-[#3a5a8a]/40 p-6 text-center shadow-[0_0_20px_rgba(58,90,138,0.3)]">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 relative">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trust-about-itDjSoKgRWYvnrxVzuDzjOoiRar7xg.png"
                    alt="Respect"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">Respect</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Set trends for your peers and the industry in general to follow.
                </p>
              </div>

              {/* Exceptional Value */}
              <div className="bg-[#1a2a4a]/60 backdrop-blur-md rounded-xl border border-[#3a5a8a]/40 p-6 text-center shadow-[0_0_20px_rgba(58,90,138,0.3)]">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 relative">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/value-about-6i4xV5nMvoJYSFpoaoYv4mp6NdkY8V.png"
                    alt="Exceptional value"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">Exceptional value</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {"Understand and exceed customer's expectations all the time."}
                </p>
              </div>

              {/* Authenticity */}
              <div className="bg-[#1a2a4a]/60 backdrop-blur-md rounded-xl border border-[#3a5a8a]/40 p-6 text-center shadow-[0_0_20px_rgba(58,90,138,0.3)]">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 relative">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/group-about-GrJ2wyjxBkSpCAyFor3cHY2ECf4XaE.png"
                    alt="Authenticity"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">Authenticity</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Be sincere, honest, and open in dealings to ensure trustworthiness.
                </p>
              </div>

              {/* Leadership */}
              <div className="bg-[#1a2a4a]/60 backdrop-blur-md rounded-xl border border-[#3a5a8a]/40 p-6 text-center shadow-[0_0_20px_rgba(58,90,138,0.3)]">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 relative">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/leadership-development-about-yIcfXNuzrp9xJttnQWubWoILvJiWd5.png"
                    alt="Leadership"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">Leadership</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Lead by example, drive innovation, and create positive change across teams.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Key Clients & Partnerships Section */}
        <section className="py-16 md:py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Key Clients & Partnerships</h2>
              <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
                We deliver exceptional technology solutions for world-class businesses in every industry, from dynamic startups and SMBs to Fortune 500 companies. Several valuable partnerships were forged along this journey, and our research has been published on different websites.
              </p>
            </div>
            <div className="flex flex-col items-center gap-6">
              <div className="w-full max-w-3xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/partners-about-m2dmo0y19JLsLDP7mkEm7KNdWc6lxd.png"
                  alt="Our Key Clients - TruGlobal, Palo Alto, Neev Systems, Triumvirate, PSRTEK, ABC Supply, Cambia, FIS, Illumina, Johnson & Johnson, HCLTech"
                  width={700}
                  height={300}
                  className="object-contain w-full h-auto"
                />
              </div>
              <div className="w-full max-w-3xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/partners-about-02-FrHUQcQLsZ0ZPsjmV4BRJpuFUwyZSS.png"
                  alt="Partnerships - Kforce, ALKU, Randstad, Altimetrik, Capgemini, N2S, Deloitte, Quadrant, L&T Technology Services"
                  width={700}
                  height={300}
                  className="object-contain w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
