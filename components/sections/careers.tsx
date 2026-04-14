import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CareersSection() {
  return (
    <section className="bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#0a1628] text-white py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">
            CAREERS
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Build Your Future With Us
          </h2>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
            We are a leading staffing solutions company dedicated to bridging the gap between 
            exceptional talent and top organizations.
          </p>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
            Join us to be part of a dynamic, growth-focused environment where your skills make a real impact.
          </p>
          <Link 
            href="/job-opportunities"
            className="bg-[#0066ff] hover:bg-[#0052cc] text-white px-6 py-3 rounded-md font-medium inline-flex items-center gap-2 transition-colors"
          >
            View Open Positions
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
