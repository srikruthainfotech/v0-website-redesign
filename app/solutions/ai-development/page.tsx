import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChevronDown, FileText, Scan, Tags, Activity, Box, Shapes } from "lucide-react"

const aiServices = [
  {
    title: "Enterprise AI Solutions",
    description: "Design and deploy enterprise-grade AI systems with scalable architectures, enabling advanced analytics, process automation, and intelligent decision-making across business workflows.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ai-enterprise-solutions-1PXHfyIiB8QBFhnyZ0pnjU2hXbRQLo.jpg",
  },
  {
    title: "AI App development",
    description: "Develop AI-powered applications integrating machine learning models, APIs, and data pipelines to deliver intelligent, responsive, and production-ready solutions.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ai-app-development-nglBSqXIeCZ3Xl4ByIT2hwc59yGyHo.jpg",
  },
  {
    title: "AI proof of concept (PoC)",
    description: "Build rapid AI prototypes to validate model feasibility, data readiness, and performance benchmarks before full-scale implementation.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ai-proof-concept-beNlOEa5PToIFEQKFrTFQxAkbff9Iz.jpg",
  },
  {
    title: "AI model training",
    description: "Train and optimize machine learning and deep learning models using structured and unstructured data, ensuring high accuracy, generalization, and performance.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ai-model-training-02-CKj9DmAqacPtaAaZOChQ1FrYzucjHw.webp",
  },
  {
    title: "Post-launch support",
    description: "Provide continuous monitoring, model retraining, performance tuning, and system maintenance to ensure reliability and long-term scalability.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/post-launch-support-i1D3WVzp3STVcYYROXCjzpKo9L12Nl.jpg",
  },
  {
    title: "Edge AI setup",
    description: "Deploy AI models on edge devices for low-latency inference, real-time processing, and efficient on-device computation.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/edge-ai-02-DAMn4HYmvaekftVU8szWyGz1Kh7Ilh.jpg",
  },
  {
    title: "AI Accelerators",
    description: "Leverage pre-built AI frameworks, reusable components, and optimized pipelines to accelerate development cycles and reduce engineering overhead.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ai.accelarates-02-k1UC6vKsYzJGTIl38EHiUXAflZHSEf.jpg",
  },
  {
    title: "MLOps",
    description: "Implement end-to-end MLOps pipelines for model versioning, CI/CD, deployment automation, monitoring, and lifecycle management.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mlops-02-kAsB9ESm33PrSIWkcCA0RQS69Wfqhf.webp",
  },
]

const aiCapabilities = [
  {
    icon: FileText,
    title: "Manual task automation",
    description: "Optical character recognition and intelligent data capture solutions that extract information from documents of any format, reducing manual effort and improving accuracy.",
  },
  {
    icon: Scan,
    title: "Facial recognition",
    description: "Person identification solutions based on live captures and digital images, enabling reliable biometric authentication, access control, and enhanced security.",
  },
  {
    icon: Tags,
    title: "Image data labeling",
    description: "Deep learning models that automatically identify and tag people and objects in images and video content.",
  },
  {
    icon: Activity,
    title: "Human activity recognition",
    description: "Intelligent models for human posture recognition across sports training, surveillance, healthcare, and other industries.",
  },
  {
    icon: Box,
    title: "Object detection",
    description: "Advanced algorithms for object detection and identification in images and videos across retail analytics, autonomous systems, and smart surveillance environments.",
  },
  {
    icon: Shapes,
    title: "Pattern recognition",
    description: "Sophisticated AI systems that recognize patterns in data to support predictive analytics, anomaly detection, and personalized experiences.",
  },
]

const faqs = [
  {
    question: "What makes our company stand out in the field of artificial intelligence development services?",
    answer: "With over a decade of experience in artificial intelligence, we have established ourselves as trusted leaders in the field. Our team combines deep technical expertise with a strong understanding of diverse industries, enabling the creation of intelligent solutions tailored to unique business objectives and delivering meaningful, measurable results.",
  },
  {
    question: "How your AI software development company meets our business objectives?",
    answer: "We work closely with your team to understand your specific business goals and challenges. Our AI solutions are custom-designed to address your unique requirements, ensuring seamless integration with existing systems and delivering measurable ROI.",
  },
  {
    question: "What measures do you take to ensure data privacy and security in AI applications?",
    answer: "We implement industry-leading security protocols, including data encryption, access controls, and compliance with regulations like GDPR and HIPAA. Our AI systems are designed with privacy-by-design principles to protect sensitive information.",
  },
  {
    question: "Can AI/ML be integrated with existing systems and technologies?",
    answer: "Yes, our AI solutions are designed for seamless integration with your existing infrastructure. We use modern APIs, microservices architecture, and proven integration patterns to ensure smooth deployment without disrupting your operations.",
  },
  {
    question: "What kind of support can we expect after the deployment of an AI solution?",
    answer: "We provide comprehensive post-deployment support including monitoring, maintenance, model retraining, performance optimization, and 24/7 technical assistance to ensure your AI solution continues to deliver value over time.",
  },
]

export default function AIDevelopmentPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[400px] md:min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/ai-development-bg.webp"
            alt="AI Development"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              AI software development services for real-world impact
            </h1>
            <p className="text-base md:text-lg text-gray-200 leading-relaxed">
              We focus on building AI that delivers consistent, measurable results – turning cutting-edge tech into everyday business value.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            We are enterprise-grade artificial intelligence company focused on delivering intelligent solutions that help organizations innovate, adapt, and grow. Whether you are exploring AI opportunities or expanding existing initiatives, our team supports businesses in building smarter, data-driven futures.
          </p>
        </div>
      </section>

      {/* AI Services Grid */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiServices.map((service) => (
              <div key={service.title} className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-52 relative">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    quality={100}
                    unoptimized
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-24 flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AI-industry-background-image-wKUcEyQaes5mMmfVUYEMZpnHGQhahr.jpg"
            alt="AI Industry Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0a1628]/70" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Kickstart Your Custom AI Solution Faster
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Looking for end-to-end AI product development? Contact us today to turn your vision into reality. Our expert team will ensure a seamless process from concept to deployment, delivering innovative solutions tailored to your needs.
          </p>
        </div>
      </section>

      {/* Company Description */}
      <section className="py-16 md:py-24 bg-[#e0f2fe]">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          {/* Description */}
          <p className="text-gray-800 text-lg md:text-xl leading-relaxed md:leading-8 text-left">
            As an artificial intelligence software company, we believe in AI&apos;s limitless potential to transform businesses.
            We explore a wide range of AI use cases that showcase how intelligent technologies can drive meaningful impact.
            From enhancing operational efficiency to unlocking new growth opportunities, our solutions are designed to deliver
            measurable value and long-term success.
          </p>

          {/* Address */}
          <div className="mt-10 flex items-start gap-3 text-gray-700 text-base md:text-lg">
            <span className="text-gray-800 text-xl leading-none">●</span>
            <span className="leading-relaxed">
              2860 South Circle Dr, Suite 237<br />
              Colorado Springs, CO 80906<br />
              United States
            </span>
          </div>
        </div>
      </section>
      {/* AI Capabilities Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">
            AI solutions to analyze and comprehend the physical world.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiCapabilities.map((capability) => (
              <div key={capability.title} className="flex flex-col">
                <div className="w-14 h-14 bg-[#e6faff] rounded-lg flex items-center justify-center mb-4">
                  <capability.icon className="w-7 h-7 text-[#00d4ff]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{capability.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            AI Solutions FAQ&apos;s
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white border border-gray-200 rounded-lg"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-5 pb-5 pt-0">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
