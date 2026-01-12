import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Careers - Headway Travels",
  description: "Join the Headway Travels family. We are looking for passionate individuals to help us craft memorable travel experiences.",
}

export default function CareersPage() {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-white text-center">
        <div className="absolute inset-0">
          <Image 
            src="/team-photo.png" 
            alt="Team Headway" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6">Join the Headway Family</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">We are always looking for passionate people to join our journey. If you love travel and helping others explore the world, we'd love to hear from you.</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-[#0a3d62] font-serif mb-12 text-center">Open Positions</h2>
          
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-[#ff6b35] hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                 <div>
                    <h3 className="text-2xl font-bold text-[#0a3d62] mb-1">Senior Travel Consultant</h3>
                    <p className="text-gray-500 font-medium">Ahmedabad • Full Time • 3+ Years Experience</p>
                 </div>
                 <Button variant="outline" className="border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white shrink-0">Apply Now</Button>
              </div>
               <p className="text-gray-700 leading-relaxed">We are looking for an experienced consultant with deep knowledge of European and South East Asian destinations. You will be responsible for crafting itineraries and managing booking operations.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-[#ff6b35] hover:shadow-lg transition-shadow">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                 <div>
                   <h3 className="text-2xl font-bold text-[#0a3d62] mb-1">Tour Manager</h3>
                   <p className="text-gray-500 font-medium">Mumbai • Contract/Full Time</p>
                 </div>
                 <Button variant="outline" className="border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white shrink-0">Apply Now</Button>
               </div>
               <p className="text-gray-700 leading-relaxed">Seeking energetic tour managers who can lead groups with confidence and care. Must be fluent in English and Hindi, with problem-solving skills.</p>
            </div>
          </div>

          <div className="mt-16 text-center bg-[#0a3d62] text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Don't see a suitable role?</h3>
              <p className="mb-6 opacity-90">We are always open to meeting talented individuals. Send your resume and tell us how you can contribute.</p>
              <a href="mailto:careers@headwaytravels.com" className="inline-block bg-[#ff6b35] px-6 py-3 rounded-full font-bold hover:bg-[#e65100] transition-colors">Email Us Your Resume</a>
          </div>
        </div>
      </div>
    </div>
  )
}
