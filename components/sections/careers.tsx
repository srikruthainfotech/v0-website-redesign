import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CareersSection() {
  return (
    <section className="bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#0a1628] text-white py-16 md:py-24 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content - Left aligned on all screens */}
          <div className="text-left relative z-10">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">
              CAREERS
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Seize the future
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
              Our teams are leading change on every front. From deploying the most advanced and complex technologies for the world&apos;s most iconic companies, to building a greener, more inclusive and healthier world for our communities.
            </p>
            <Link 
              href="/job-opportunities" 
              className="bg-[#0066ff] hover:bg-[#0052cc] text-white px-6 py-3 rounded-md font-medium inline-flex items-center gap-2 transition-colors"
            >
              Come join us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {/* Image - Hidden on mobile, visible on lg screens */}
          <div className="hidden lg:flex justify-end">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0066ff]/20 to-[#00d4ff]/20 rounded-2xl" />
              <div className="absolute inset-4 border border-[#0066ff]/30 rounded-xl" />
              <div className="absolute inset-8 bg-gradient-to-br from-[#0066ff]/10 to-transparent rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-[#0066ff]/40">Join</div>
                  <div className="text-2xl text-[#00d4ff]/60 mt-2">Our Team</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
