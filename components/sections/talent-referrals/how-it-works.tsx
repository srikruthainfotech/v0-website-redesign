import { CheckCircle } from "lucide-react"

const steps = [
  {
    title: "Submit Referral",
    description: "Complete the referral form with candidate details and your recommendation.",
  },
  {
    title: "HR Review",
    description: "Our HR team reviews the referral and contacts the candidate if there's a match.",
  },
  {
    title: "Interview Process",
    description: "Candidate goes through our standard interview and evaluation process.",
  },
  {
    title: "Earn Reward",
    description: "Receive your referral bonus after the candidate completes 90 days of employment.",
  },
]

export function HowItWorks() {
  return (
    <section
      className="relative py-16 md:py-20 px-4 md:px-8"
      style={{
        backgroundImage: "url('/images/background-image-how-it-works.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-[#0a1628]/80" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-white font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
