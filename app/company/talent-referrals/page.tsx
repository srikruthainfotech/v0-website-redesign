import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TalentReferralsHero } from "@/components/sections/talent-referrals/hero"
import { ProgramOverview } from "@/components/sections/talent-referrals/program-overview"
import { HowItWorks } from "@/components/sections/talent-referrals/how-it-works"
import { ReferralForm } from "@/components/sections/talent-referrals/referral-form"

export const metadata = {
  title: "Talent Referrals - Immense Brains",
  description: "Help us find amazing talent. Refer someone exceptional to join our team and earn rewards while helping us build the future of technology.",
}

export default function TalentReferralsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <TalentReferralsHero />
      <ProgramOverview />
      <HowItWorks />
      <ReferralForm />
      <Footer />
    </main>
  )
}
