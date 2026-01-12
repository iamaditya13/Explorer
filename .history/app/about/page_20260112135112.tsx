import Image from "next/image"
import { CheckCircle2, Award, Users, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - Headway Travels",
  description: "Learn about Headway Travels, your trusted partner for international holidays, tour packages, and memorable travel experiences.",
}

export default function AboutPage() {
  return (
    <div className="font-sans">
      {/* Hero */}
      <section className="relative h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about-hero.png"
            alt="About Headway Travelers"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 drop-shadow-lg">About Headway Travels</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90 drop-shadow-md">Building trust, creating memories, and delivering comfort across the globe.</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0a3d62] font-serif mb-8 leading-tight">Your Trusted International<br/>Travel Partner</h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
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
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6 transform translate-y-12">
                 <div className="bg-[#0a3d62] text-white p-8 rounded-3xl shadow-xl">
                    <h3 className="text-5xl font-bold mb-2">25+</h3>
                    <p className="text-lg opacity-80">Years of Experience</p>
                 </div>
                 <Image src="/office-interior.png" alt="Headway Office" width={400} height={400} className="rounded-3xl object-cover h-64 w-full shadow-lg" />
              </div>
              <div className="space-y-6">
                 <Image src="/team-photo.png" alt="Headway Team" width={400} height={400} className="rounded-3xl object-cover h-64 w-full shadow-lg" />
                 <div className="bg-[#ff6b35] text-white p-8 rounded-3xl shadow-xl">
                    <h3 className="text-5xl font-bold mb-2">50k+</h3>
                    <p className="text-lg opacity-80">Happy Travellers</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission/Vision */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-10 rounded-2xl shadow-xl border-t-8 border-[#0a3d62] hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <Award className="h-10 w-10 text-[#0a3d62]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0a3d62] mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">To provide seamless, comfortable, and memorable travel experiences that connect people with the world's beauty and culture.</p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-xl border-t-8 border-[#ff6b35] hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-orange-50 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <Globe className="h-10 w-10 text-[#ff6b35]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0a3d62] mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">To be the most trusted and preferred travel partner for Indian families offering global experiences with a touch of home.</p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-xl border-t-8 border-[#0a3d62] hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <Users className="h-10 w-10 text-[#0a3d62]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0a3d62] mb-4">Our Values</h3>
              <p className="text-gray-600 leading-relaxed">Integrity, customer-centricity, and a relentless commitment to quality and comfort in every journey we plan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0a3d62] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <Image src="/about-hero.png" alt="Background pattern" fill className="object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 font-serif">Ready to plan your next adventure?</h2>
          <Button className="bg-[#ff6b35] hover:bg-[#e65100] text-white rounded-full px-10 py-8 text-xl shadow-xl hover:shadow-2xl transition-all">Contact Us Today</Button>
        </div>
      </section>
    </div>
  )
}
