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
              <div className="flex justify-center mb-5">
                <div className="w-10 h-10 rounded-full ring-[3.5px] ring-white/80 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
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
