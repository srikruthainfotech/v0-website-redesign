import { ArrowRight } from "lucide-react"

export function CareersSection() {
  return (
    <section className="bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#0a1628] text-white py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-xl">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">
            CAREERS
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Seize the future
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
            Our teams are leading change on every front. From deploying the most advanced and complex technologies for the world&apos;s most iconic companies, to building a greener, more inclusive and healthier world for our communities.
          </p>
          <button className="bg-[#00d4ff] hover:bg-[#00b8e6] text-white px-6 py-3 rounded-md font-medium inline-flex items-center gap-2 transition-colors">
            Come join us
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
