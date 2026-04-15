import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-[#0a1628]">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Terms of Use</h1>
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>
              By accessing and using this website, you agree to comply with and be bound by the following terms and conditions. These terms govern your use of our website, services, and any content provided herein.
            </p>
            <p>
              You agree to use this website only for lawful purposes and in a manner that does not infringe upon the rights of others or restrict their use of the site. Unauthorized use, including misuse of content, data, or services, is strictly prohibited.
            </p>
            <p>
              All content on this website is provided for general informational purposes only. While we strive for accuracy, we do not guarantee the completeness or reliability of any information. We reserve the right to modify or update content, services, or these terms at any time without prior notice.
            </p>
            <p>
              Your continued use of the website constitutes acceptance of any changes made to these Terms of Use.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
