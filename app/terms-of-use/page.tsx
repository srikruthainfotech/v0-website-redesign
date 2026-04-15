import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsOfUsePage() {
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
              Terms of Use
            </h1>
          </div>
          <div className="space-y-6 text-gray-600 leading-relaxed">
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
      </section>
      <Footer />
    </main>
  )
}
