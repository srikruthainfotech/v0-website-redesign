import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function CopyrightPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0a1628]">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Copyright Policy</h1>
          <div className="space-y-6 text-gray-300 leading-relaxed">
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
      </main>
      <Footer />
    </div>
  )
}
