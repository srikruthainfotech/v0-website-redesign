import { ArrowRight } from "lucide-react"

export function ExpertiseSection() {
  return (
    <section className="bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#0a1628] text-white py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
            We Have Expertise To Build
            <br />
            Customization Software
            <br />
            From Idea
          </h2>
          <button className="mt-8 bg-[#0066ff] hover:bg-[#0052cc] text-white px-6 py-3 rounded-md font-medium inline-flex items-center gap-2 transition-colors">
            Explore Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
