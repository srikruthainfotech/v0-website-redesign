import { ArrowRight } from "lucide-react"
import Image from "next/image"

// Row 1: 6 clients
const row1 = [
  { name: "FIS", logo: "/images/clients/fis.png" },
  { name: "Capgemini", logo: "/images/clients/capgemini.svg" },
  { name: "Illumina", logo: "/images/clients/illumina.svg" },
  { name: "Johnson & Johnson", logo: "/images/clients/johnson-johnson.svg" },
  { name: "Palo Alto Networks", logo: "/images/clients/paloalto.svg" },
  { name: "Altimetrik", logo: "/images/clients/altimetrik.png" },
]

// Row 2: 3 clients (will be expanded later)
const row2 = [
  { name: "HCL Tech", logo: "/images/clients/hcl.svg" },
  { name: "TruGlobal", logo: "/images/clients/truglobal.png" },
  { name: "Neev Systems", logo: "/images/clients/neev-systems.png" },
]

interface MarqueeRowProps {
  items: { name: string; logo: string }[]
  speed: "normal" | "slow" | "fast"
}

function MarqueeRow({ items, speed }: MarqueeRowProps) {
  const animationClass = {
    normal: "animate-marquee",
    slow: "animate-marquee-slow",
    fast: "animate-marquee-fast",
  }[speed]

  // Duplicate items 3 times for seamless loop
  const duplicatedItems = [...items, ...items, ...items]

  return (
    <div className="relative overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
      <div className={`flex ${animationClass}`}>
        {duplicatedItems.map((client, index) => (
          <div key={index} className="flex-shrink-0 mx-8 md:mx-14 flex items-center justify-center">
            <Image
              src={client.logo}
              alt={client.name}
              width={120}
              height={50}
              className="h-10 md:h-12 w-auto object-contain opacity-70 hover:opacity-100 hover:scale-105 transition duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function ClientsSection() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-[#f5f7fa]">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-[#00d4ff] text-sm font-medium uppercase tracking-wider mb-2">
          Our Clients
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-balance">
          Partners and Long-Term Clients
        </h2>

        {/* Multi-row Marquee Container */}
        <div className="space-y-8 md:space-y-10 w-[85%] mx-auto">
          <MarqueeRow items={row1} speed="normal" />
          <MarqueeRow items={row2} speed="slow" />
        </div>

        <button className="mt-12 bg-[#0066ff] hover:bg-[#0052cc] text-white px-6 py-3 rounded-md font-medium inline-flex items-center gap-2 transition-colors">
          Become A Partner
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  )
}
