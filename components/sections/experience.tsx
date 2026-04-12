import { ArrowRight } from "lucide-react"

export function ExperienceSection() {
  return (
    <section className="bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#0a1628] text-white py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-[#00d4ff] text-sm font-medium uppercase tracking-wider mb-4">
          Over 5 Years of Experience
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold max-w-3xl mx-auto leading-tight">
          Offer The Latest Software And
          <br />
          Solutions To Our customers!
        </h2>
        <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Everything melancholy uncommonly but solicitude inhabiting projection off. Connection stimulated estimating excellence an to impression. lasted by coming properly marked so should. brandy letters it amongst herself dearest an windows by. Wooded ladies she basket season.
        </p>
        <button className="mt-8 bg-[#0066ff] hover:bg-[#0052cc] text-white px-6 py-3 rounded-md font-medium inline-flex items-center gap-2 transition-colors">
          Explore More
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  )
}
