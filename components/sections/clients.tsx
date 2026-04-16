import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function ClientsSection() {
  // Original clients for first row (Arrow Right)
  const clientsRow1 = [
    { type: "cambia", label: "CAMBIA" },
    { type: "abc", label: "ABC Supply Inc." },
    { type: "psrtek", label: "PSRTEK" },
    { type: "triumvirate", label: "TRIUMVIRATE" },
  ]

  // Row 2 - Arrow Left: FIS, Paloalto, Illumina, Truglobal
  const clientsRow2 = [
    { name: "FIS", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FIS_image-05.png-eJgPn8ikIv4uK6WR3p1CfVxM5HX6dF.jpeg", width: 140, height: 50, maxH: "max-h-12" },
    { name: "Palo Alto", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/panloaltgo-image-06-ftxq9GMMzXINd5vLd14XX4IhZ4SvQb.svg", width: 140, height: 50, maxH: "max-h-12" },
    { name: "Illumina", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/illumina-logo-image-07-Cdr8NBpWV2ByzR0LLcVrnKvvSsnFFl.jpg", width: 160, height: 60, maxH: "max-h-14" },
    { name: "Truglobal", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/truglobal-o8.png-3haxn4WKnUbzIsUjgXm6IArEllxJQB.jpeg", width: 140, height: 50, maxH: "max-h-12" },
  ]

  // Row 3 - Arrow Right: Neev Systems, HCL, Johnson, KForce
  const clientsRow3 = [
    { name: "Neev Systems", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/neevsystems_logo-09-9hUE01OiigXtalOeeUDA0f45T9SyBm.jpg", width: 180, height: 70, maxH: "max-h-16" },
    { name: "HCL Tech", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hcl-super-progress-10-ndRymbJNyPwlKZ5Bt4WbUopLLh0Ari.png", width: 180, height: 70, maxH: "max-h-16" },
    { name: "Johnson & Johnson", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/johnson-johnson-logo-image-11-dlnsqbS8341XtqGxvI567pIJRGKBMX.svg", width: 140, height: 50, maxH: "max-h-12" },
    { name: "KForce", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/k-force-12-A60iXP5uYMoREmT1RdKX2ifCMYpGdr.png", width: 140, height: 50, maxH: "max-h-12" },
  ]

  // Row 4 - Arrow Left: ALKU, Altimetrik, Capgemini, N2S
  const clientsRow4 = [
    { name: "ALKU", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ALKU-logo-image-13-ZTlf3cQ1G7MjM0M65QASMT2GBpCUrx.png", width: 140, height: 50, maxH: "max-h-12" },
    { name: "Altimetrik", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/altimetrik-14-7WEbWwANVE6CAsE2doSoW37mut4pfE.png", width: 160, height: 60, maxH: "max-h-14" },
    { name: "Capgemini", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/capgeminiBlue-img-15-g0gLr5SVyTGpYJJcCyXbxn5B8evsMD.svg", width: 140, height: 50, maxH: "max-h-12" },
    { name: "N2S", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/n2s-img-16-6RzQBGevAvoCLQHUgrTOV3jsxcZFiY.webp", width: 140, height: 50, maxH: "max-h-12" },
  ]

  // Row 5 - Arrow Right: Deloitte, L&T, Randstad, Quadrant
  const clientsRow5 = [
    { name: "Deloitte", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/deloitte-print-17.webp-Cw6ciL6hnHvm2F73EKPm5cuwJa70Jj.png", width: 140, height: 50, maxH: "max-h-12" },
    { name: "L&T", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/l%26t-18-A2kfIX3IslezNfDvUtdE7bepPCDsES.svg", width: 140, height: 50, maxH: "max-h-12" },
    { name: "Randstad", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/randstad-logo-19-oCpam3uRZuS39643M37Y0OYVYqmN7O.png", width: 140, height: 50, maxH: "max-h-12" },
    { name: "Quadrant", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Quadrant-logo-20-k9zcbmQhSEZJnd5fR3i3dVpKCwnFLX.png", width: 140, height: 50, maxH: "max-h-12" },
  ]

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-[#f5f7fa]">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-[#00d4ff] text-sm font-medium uppercase tracking-wider mb-2">
          Our Clients
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-12">
          Partners and Long-Term Clients
        </h2>

        {/* Row 1 - Original clients (Arrow Right) */}
        <div className="relative overflow-hidden mb-6 mx-auto w-[85%]">
          <div className="flex animate-marquee">
            {[...clientsRow1, ...clientsRow1, ...clientsRow1].map((client, index) => (
              <div key={index} className="flex-shrink-0 mx-8 sm:mx-12 md:mx-16 flex items-center justify-center min-w-[180px]">
                {client.type === "cambia" && (
                  <div className="text-xl sm:text-2xl font-bold text-gray-400 tracking-wider">
                    <span className="text-[#00c853]">@</span>CAMBIA
                  </div>
                )}
                {client.type === "abc" && (
                  <div className="flex items-center">
                    <span className="text-xl sm:text-2xl font-bold text-[#cc0000]">ABC</span>
                    <span className="text-[#cc0000] text-xs ml-1 italic">Supply Inc.</span>
                  </div>
                )}
                {client.type === "psrtek" && (
                  <div className="text-xl sm:text-2xl font-bold text-gray-800 tracking-wider">
                    PSRTEK
                  </div>
                )}
                {client.type === "triumvirate" && (
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      <div className="w-2 h-5 sm:h-6 bg-[#00a0dc] rounded-sm"></div>
                      <div className="w-2 h-5 sm:h-6 bg-[#00c853] rounded-sm ml-0.5"></div>
                      <div className="w-2 h-5 sm:h-6 bg-[#ff6b00] rounded-sm ml-0.5"></div>
                    </div>
                    <span className="text-base sm:text-lg font-semibold text-gray-700 ml-2">TRIUMVIRATE</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Arrow Left: FIS, Paloalto, Illumina, Truglobal */}
        <div className="relative overflow-hidden mb-6 mx-auto w-[85%]">
          <div className="flex animate-marquee-reverse">
            {[...clientsRow2, ...clientsRow2, ...clientsRow2].map((client, index) => (
              <div key={index} className="flex-shrink-0 mx-8 sm:mx-12 md:mx-16 flex items-center justify-center min-w-[180px] h-16">
                <Image
                  src={client.src}
                  alt={client.name}
                  width={client.width}
                  height={client.height}
                  className={`object-contain ${client.maxH} w-auto`}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 3 - Arrow Right: Neev Systems, HCL, Johnson, KForce */}
        <div className="relative overflow-hidden mb-6 mx-auto w-[85%]">
          <div className="flex animate-marquee">
            {[...clientsRow3, ...clientsRow3, ...clientsRow3].map((client, index) => (
              <div key={index} className="flex-shrink-0 mx-8 sm:mx-12 md:mx-16 flex items-center justify-center min-w-[180px] h-16">
                <Image
                  src={client.src}
                  alt={client.name}
                  width={client.width}
                  height={client.height}
                  className={`object-contain ${client.maxH} w-auto`}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 4 - Arrow Left: ALKU, Altimetrik, Capgemini, N2S */}
        <div className="relative overflow-hidden mb-6 mx-auto w-[85%]">
          <div className="flex animate-marquee-reverse">
            {[...clientsRow4, ...clientsRow4, ...clientsRow4].map((client, index) => (
              <div key={index} className="flex-shrink-0 mx-8 sm:mx-12 md:mx-16 flex items-center justify-center min-w-[180px] h-16">
                <Image
                  src={client.src}
                  alt={client.name}
                  width={client.width}
                  height={client.height}
                  className={`object-contain ${client.maxH} w-auto`}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 5 - Arrow Right: Deloitte, L&T, Randstad, Quadrant */}
        <div className="relative overflow-hidden mb-10 mx-auto w-[85%]">
          <div className="flex animate-marquee">
            {[...clientsRow5, ...clientsRow5, ...clientsRow5].map((client, index) => (
              <div key={index} className="flex-shrink-0 mx-8 sm:mx-12 md:mx-16 flex items-center justify-center min-w-[180px] h-16">
                <Image
                  src={client.src}
                  alt={client.name}
                  width={client.width}
                  height={client.height}
                  className={`object-contain ${client.maxH} w-auto`}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        <button className="bg-[#0066ff] hover:bg-[#0052cc] text-white px-6 py-3 rounded-md font-medium inline-flex items-center gap-2 transition-colors">
          Become A Partner
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  )
}
