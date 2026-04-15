import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CopyrightPolicyPage() {
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
              Copyright Policy
            </h1>
          </div>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>
              All content on this website, including text, graphics, logos, images, and software, is the property of the company or its content providers and is protected by applicable copyright and intellectual property laws.
            </p>
            <p>
              You may not copy, reproduce, distribute, modify, or republish any content from this website without prior written permission.
            </p>
            <p>
              Unauthorized use of any materials may violate copyright, trademark, and other applicable laws and could result in legal action.
            </p>
            <p>
              If you believe that any content on this website infringes your copyright, please contact us with the relevant details, and we will promptly review and take appropriate action.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
