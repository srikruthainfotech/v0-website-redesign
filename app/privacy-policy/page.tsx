import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0a1628]">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Privacy Policy</h1>
          <div className="space-y-6 text-gray-300 leading-relaxed">
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
      </main>
      <Footer />
    </div>
  )
}
