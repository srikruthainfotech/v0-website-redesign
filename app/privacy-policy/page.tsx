import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <p className="text-[#00d4ff] text-sm font-medium uppercase tracking-wider mb-2">
              Legal
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              Privacy Policy
            </h1>
          </div>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>
              We are committed to protecting your privacy and ensuring that your personal information is handled in a secure and responsible manner.
            </p>
            <p>
              We may collect basic information such as your name, email address, and contact details when you interact with our website, submit forms, or use our services. This information is used solely to improve our services, respond to inquiries, and provide a better user experience.
            </p>
            <p>
              We do not sell, trade, or share your personal information with third parties, except as required by law or to deliver our services effectively.
            </p>
            <p>
              We implement appropriate security measures to protect your data from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is completely secure.
            </p>
            <p>
              By using our website, you consent to the collection and use of your information as outlined in this policy.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
