import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#0a1628] text-white py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            We deliver expertise no
            <br />
            one else has
          </h1>
          <p className="text-[#00d4ff] text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
            so you can
          </p>
          <p className="text-lg md:text-xl text-gray-300 mt-4">
            explore opportunities no
            <br />
            one else can see
          </p>
          <button className="mt-8 bg-[#00d4ff] hover:bg-[#00b8e6] text-white px-6 py-3 rounded-md font-medium inline-flex items-center gap-2 transition-colors">
            Explore Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
