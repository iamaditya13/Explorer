import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Partner With Us - Headway Travels",
  description: "Join the Headway Travels network as a travel agent or franchisee. Grow your business with our support.",
}

export default function PartnerWithUsPage() {
  return (
    <div className="font-sans py-20">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <h1 className="text-4xl font-bold text-[#0a3d62] font-serif mb-6">Partner With Headway</h1>
        <p className="text-lg text-gray-700 mb-12">
          Grow your business by partnering with one of India's most trusted international tour operators. We invite travel agents, franchisees, and corporate partners to join our network.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 text-left">
           <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-[#ff6b35] mb-4">For Travel Agents</h3>
              <p className="text-gray-600 mb-6">Become a Headway Authorized Agent and offer our premium packages to your clients with attractive commissions and full support.</p>
              <ul className="list-disc pl-5 mb-6 text-gray-600 space-y-2">
                 <li>Competitive commissions</li>
                 <li>Dedicated B2B support desk</li>
                 <li>Marketing material support</li>
                 <li>Regular training and updates</li>
              </ul>
              <Button className="bg-[#0a3d62] text-white w-full">Register as Agent</Button>
           </div>
           
           <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-[#ff6b35] mb-4">For Franchisee</h3>
              <p className="text-gray-600 mb-6">Start your own travel business with the Headway brand name. We provide end-to-end setup assistance and operational guidance.</p>
              <ul className="list-disc pl-5 mb-6 text-gray-600 space-y-2">
                 <li>Brand recognition</li>
                 <li>Technology support</li>
                 <li>Operational training</li>
                 <li>Lead generation support</li>
              </ul>
              <Button className="bg-[#0a3d62] text-white w-full">Enquire for Franchise</Button>
           </div>
        </div>
      </div>
    </div>
  )
}
