import { ArrowRight } from "lucide-react"

export function ClientsSection() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-[#f5f7fa]">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-[#00d4ff] text-sm font-medium uppercase tracking-wider mb-2">
          Our Clients
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-12">
          Partners and Long-Term Clients
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-16 mb-10">
          {/* CAMBIA */}
          <div className="text-xl sm:text-2xl font-bold text-gray-400 tracking-wider">
            <span className="text-[#00c853]">@</span>CAMBIA
          </div>
          
          {/* ABC */}
          <div className="flex items-center">
            <span className="text-xl sm:text-2xl font-bold text-[#cc0000]">ABC</span>
            <span className="text-[#cc0000] text-xs ml-1 italic">Supply Inc.</span>
          </div>

          {/* PSRTEK */}
          <div className="text-xl sm:text-2xl font-bold text-gray-800 tracking-wider">
            PSRTEK
          </div>

          {/* TRIUMVIRATE */}
          <div className="flex items-center gap-1">
            <div className="flex">
              <div className="w-2 h-5 sm:h-6 bg-[#00a0dc] rounded-sm"></div>
              <div className="w-2 h-5 sm:h-6 bg-[#00c853] rounded-sm ml-0.5"></div>
              <div className="w-2 h-5 sm:h-6 bg-[#ff6b00] rounded-sm ml-0.5"></div>
            </div>
            <span className="text-base sm:text-lg font-semibold text-gray-700 ml-2">TRIUMVIRATE</span>
          </div>
        </div>

        <button className="bg-[#00c853] hover:bg-[#00b248] text-white px-6 py-3 rounded-md font-medium inline-flex items-center gap-2 transition-colors">
          Become A Partner
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  )
}
