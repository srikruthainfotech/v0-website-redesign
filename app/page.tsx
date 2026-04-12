import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero"
import { ServicesSection } from "@/components/sections/services"
import { ExperienceSection } from "@/components/sections/experience"
import { WhyChooseSection } from "@/components/sections/why-choose"
import { ExpertiseSection } from "@/components/sections/expertise"
import { WorkforceSection } from "@/components/sections/workforce"
import { ClientsSection } from "@/components/sections/clients"
import { CareersSection } from "@/components/sections/careers"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <ExperienceSection />
      <WhyChooseSection />
      <ExpertiseSection />
      <WorkforceSection />
      <ClientsSection />
      <CareersSection />
      <Footer />
    </main>
  )
}
