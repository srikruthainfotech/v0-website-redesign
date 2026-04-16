import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function CareersSection() {
  // Row 1 - ALKU, Altimetrik, HCL Tech
  const logosRow1 = [
    { name: "ALKU", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ALKU-logo-image-13-pSUkTQrcwv1j5e6k2NGhbHMughhU3E.png" },
    { name: "Altimetrik", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/altimetrik-14-nSTpLsp2nkPi7gfhCWfJMOekSphQwm.png" },
    { name: "HCL Tech", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hcl-super-progress-10-DiBuuJIdcvgNG17j98p6bfSM1XcU9I.png" },
  ]

  // Row 2 - Illumina, Neev Systems
  const logosRow2 = [
    { name: "Illumina", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/illumina-logo-image-07-NafWWoasGyIYFHtHxWvT3h9H9oCdYG.jpg" },
    { name: "Neev Systems", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/neevsystems_logo-09-sViBUTd7aiSyb4RM6NJSMvq5YcwerL.jpg" },
  ]

  // Row 3 - Randstad, Quadrant
  const logosRow3 = [
    { name: "Randstad", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/randstad-logo-19-73xygvSDOWsC2w2dDde8xZXydxAx23.png" },
    { name: "Quadrant", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Quadrant-logo-20-Rf30PBT1iKt9tfpsrlCBF2esXlq0NY.png" },
  ]

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

          {/* Company Logos - Right side */}
          <div className="relative z-10 flex flex-col gap-6">
            {/* Row 1 - ALKU, Altimetrik, HCL Tech */}
            <div className="flex items-center justify-center gap-6 md:gap-8">
              {logosRow1.map((logo, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 flex items-center justify-center h-16 w-28 md:h-20 md:w-36"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={120}
                    height={60}
                    className="object-contain max-h-12 md:max-h-14 w-auto"
                    unoptimized
                  />
                </div>
              ))}
            </div>

            {/* Row 2 - Illumina, Neev Systems */}
            <div className="flex items-center justify-center gap-6 md:gap-8">
              {logosRow2.map((logo, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 flex items-center justify-center h-16 w-28 md:h-20 md:w-36"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={120}
                    height={60}
                    className="object-contain max-h-12 md:max-h-14 w-auto"
                    unoptimized
                  />
                </div>
              ))}
            </div>

            {/* Row 3 - Randstad, Quadrant */}
            <div className="flex items-center justify-center gap-6 md:gap-8">
              {logosRow3.map((logo, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 flex items-center justify-center h-16 w-28 md:h-20 md:w-36"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={120}
                    height={60}
                    className="object-contain max-h-12 md:max-h-14 w-auto"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
