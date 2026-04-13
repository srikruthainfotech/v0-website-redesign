import Image from "next/image"

export function TalentReferralsHero() {
  return (
    <section className="relative w-full">
      {/* Hero with background image */}
      <div className="relative h-[200px] md:h-[250px] w-full overflow-hidden">
        <Image
          src="/images/background-image-top-01.png"
          alt="Talent Referrals Background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Centered heading */}
        <div className="absolute inset-0 flex items-center justify-start px-4 md:px-32">
          <h1 className="text-2.5xl md:text-3xl lg:text-4xl font-bold text-white">
            Talent Referrals
          </h1>
        </div>
      </div>

      {/* Sub-hero section */}
      <div className="bg-white py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0a1628] mb-4">
            Help Us Find Amazing Talent
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Know someone exceptional? Refer them to join our team and earn rewards while helping us build the future of technology.
          </p>
        </div>
      </div>
    </section>
  )
}
