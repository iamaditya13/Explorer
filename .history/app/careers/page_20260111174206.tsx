import { Button } from "@/components/ui/button"

export default function CareersPage() {
  return (
    <div className="font-sans py-20">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h1 className="text-4xl font-bold text-[#0a3d62] font-serif mb-6">Join the Headway Family</h1>
        <p className="text-lg text-gray-700 mb-12">
          We are always looking for passionate people to join our journey. If you love travel and helping others explore the world, we'd love to hear from you.
        </p>
        
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 text-left mb-8">
           <h3 className="text-xl font-bold text-[#0a3d62] mb-2">Senior Travel Consultant</h3>
           <p className="text-gray-600 mb-4">Ahmedabad - Full Time - 3+ Years Experience</p>
           <p className="text-gray-700 mb-4">We are looking for an experienced consultant with deep knowledge of European and South East Asian destinations.</p>
           <Button variant="outline" className="border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white">Apply Now</Button>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 text-left">
           <h3 className="text-xl font-bold text-[#0a3d62] mb-2">Tour Manager</h3>
           <p className="text-gray-600 mb-4">Mumbai - Contract/Full Time</p>
           <p className="text-gray-700 mb-4">Seeking energetic tour managers who can lead groups with confidence and care.</p>
           <Button variant="outline" className="border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white">Apply Now</Button>
        </div>

        <div className="mt-12 text-gray-600">
            <p>Don't see a role for you? Send your resume to <a href="mailto:careers@headwaytravels.com" className="text-[#ff6b35] font-semibold">careers@headwaytravels.com</a></p>
        </div>
      </div>
    </div>
  )
}
