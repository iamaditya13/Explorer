import Image from "next/image"
import { CheckCircle2, Award, Users, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="font-sans">
      {/* Hero */}
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=400&width=1200"
            alt="About Headway"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold font-serif mb-4">About Headway Travels</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">Building trust, creating memories, and delivering comfort across the globe.</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a3d62] font-serif mb-6">Your Trusted International Travel Partner</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  With decades of experience in planning international holidays, Headway Travels stands for trust, comfort, and thoughtfully curated journeys. Headquartered in India, we specialise in crafting tour packages that cater specifically to the needs of Indian travellers.
                </p>
                <p>
                  We understand that travel is personal. That's why we focus on the details that matter most to you—whether it's ensuring vegetarian food options in Europe, providing Hindi-speaking guides, or creating leisurely itineraries that aren't rushed.
                </p>
                <p>
                  From the moment you dream of a destination to the moment you return home with a bag full of memories, Headway is with you every step of the way.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                 <div className="bg-[#0a3d62] text-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-4xl font-bold mb-2">25+</h3>
                    <p className="text-sm">Years of Experience</p>
                 </div>
                 <Image src="/placeholder.svg?height=300&width=300" alt="Office" width={300} height={300} className="rounded-2xl object-cover h-48 w-full" />
              </div>
              <div className="space-y-4 pt-8">
                 <Image src="/placeholder.svg?height=300&width=300" alt="Team" width={300} height={300} className="rounded-2xl object-cover h-48 w-full" />
                 <div className="bg-[#ff6b35] text-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-4xl font-bold mb-2">50k+</h3>
                    <p className="text-sm">Happy Travellers</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission/Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-[#0a3d62]">
              <Award className="h-10 w-10 text-[#ff6b35] mb-4" />
              <h3 className="text-xl font-bold text-[#0a3d62] mb-3">Our Mission</h3>
              <p className="text-gray-600">To provide seamless, comfortable, and memorable travel experiences that connect people with the world's beauty and culture.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-[#0a3d62]">
              <Globe className="h-10 w-10 text-[#ff6b35] mb-4" />
              <h3 className="text-xl font-bold text-[#0a3d62] mb-3">Our Vision</h3>
              <p className="text-gray-600">To be the most trusted and preferred travel partner for Indian families offering global experiences with a touch of home.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-[#0a3d62]">
              <Users className="h-10 w-10 text-[#ff6b35] mb-4" />
              <h3 className="text-xl font-bold text-[#0a3d62] mb-3">Our Values</h3>
              <p className="text-gray-600">Integrity, customer-centricity, and a relentless commitment to quality and comfort in every journey we plan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0a3d62] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 font-serif">Ready to plan your next adventure?</h2>
          <Button className="bg-[#ff6b35] hover:bg-[#e65100] text-white rounded-full px-8 h-12">Contact Us Today</Button>
        </div>
      </section>
    </div>
  )
}
