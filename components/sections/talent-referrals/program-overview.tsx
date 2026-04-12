import Image from "next/image"
import { ThumbsUp } from "lucide-react"

const benefits = [
  {
    title: "Referral Bonus",
    description: "Earn up to $2,000 for successful referrals",
  },
  {
    title: "Payment Timeline",
    description: "Referral bonuses are paid after the referred employee completes 90 days and receives a satisfactory performance review.",
  },
  {
    title: "Multiple Referrals",
    description: "If multiple employees refer the same candidate, the bonus goes to the first referrer.",
  },
  {
    title: "Family Members",
    description: "Employees may refer immediate family members, but no referral bonus will be paid for those hires.",
  },
]

export function ProgramOverview() {
  return (
    <section className="bg-[#f5f7fa] py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Program Overview Text */}
        <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-[#0a1628] mb-4">
            Program Overview
          </h2>
          <div className="text-gray-600 text-sm md:text-base space-y-4 leading-relaxed">
            <p>
              Our Employee Referral Program is designed to leverage the power of our team&apos;s network to find exceptional talent. We believe that our employees are our best ambassadors and know the kind of people who would thrive in our innovative environment.
            </p>
            <p>
              When you refer a candidate who gets hired and successfully completes their probationary period, you&apos;ll receive a referral bonus as our way of saying thank you for helping us grow our team with quality professionals.
            </p>
            <p>
              We&apos;re always looking for talented individuals across all departments - from software development and engineering to sales, marketing, and operations. If you know someone who shares our values of innovation, excellence, and collaboration, we&apos;d love to meet them.
            </p>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left - Image */}
            <div className="relative h-[300px] md:h-auto">
              <Image
                src="/images/program-overview-talent.jpg"
                alt="Two professionals having a meeting"
                fill
                className="object-cover"
              />
            </div>

            {/* Right - Benefits Cards */}
            <div className="p-4 md:p-6 space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-[#f5f7fa] rounded-lg"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-[#e8f5e9] rounded-full flex items-center justify-center">
                    <ThumbsUp className="w-5 h-5 text-[#00c853]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a1628] mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
