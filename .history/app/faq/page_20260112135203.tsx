import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQs - Headway Travels",
  description: "Find answers to frequently asked questions about booking, payments, visas, and travel policies with Headway Travels.",
}

export default function FAQPage() {
  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="relative h-[300px] flex items-center justify-center text-white text-center">
        <div className="absolute inset-0">
            <Image 
                src="/faq-support.png" 
                alt="Customer Support" 
                fill 
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-[#0a3d62]/80 mix-blend-multiply" />
        </div>
        <div className="relative z-10 container mx-auto px-4 pt-10">
           <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Frequently Asked Questions</h1>
           <p className="text-xl text-gray-100 max-w-2xl mx-auto">We're here to help. Find answers to common questions about travelling with Headway.</p>
        </div>
      </section>

      <section className="py-20 -mt-20 relative z-20">
        <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-white p-8 rounded-2xl shadow-xl">
                <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="border-b-0">
                    <AccordionTrigger className="text-lg font-bold text-[#0a3d62] bg-gray-50 px-6 py-4 rounded-lg hover:bg-gray-100 transition-colors [&[data-state=open]]:bg-[#eff6ff] [&[data-state=open]]:text-[#ff6b35]">
                        Do you provide vegetarian food on international tours?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 px-6 pt-4 pb-2 text-base leading-relaxed">
                    Yes, absolutely. We specialise in catering to Indian dietary preferences. Most of our group tours include pure vegetarian meals prepared by Indian chefs (Maharaj) or at vetted Indian restaurants. Jain food options are also available on request.
                    </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2" className="border-b-0">
                    <AccordionTrigger className="text-lg font-bold text-[#0a3d62] bg-gray-50 px-6 py-4 rounded-lg hover:bg-gray-100 transition-colors [&[data-state=open]]:bg-[#eff6ff] [&[data-state=open]]:text-[#ff6b35]">
                        What is included in the tour package price?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 px-6 pt-4 pb-2 text-base leading-relaxed">
                    Our packages are comprehensive. They typically include return airfare, visa fees, accommodation, meals (as per itinerary), sightseeing, transfers, and the services of a professional tour manager. Specific inclusions are listed on each package page. Personal expenses and tips are generally excluded.
                    </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3" className="border-b-0">
                    <AccordionTrigger className="text-lg font-bold text-[#0a3d62] bg-gray-50 px-6 py-4 rounded-lg hover:bg-gray-100 transition-colors [&[data-state=open]]:bg-[#eff6ff] [&[data-state=open]]:text-[#ff6b35]">
                        How do I book a tour?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 px-6 pt-4 pb-2 text-base leading-relaxed">
                    You can book online through our website, call our support team, or visit any of our branches. You can initially block your seat by paying a booking deposit. The balance payment schedule will be shared with you by your travel consultant.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-b-0">
                    <AccordionTrigger className="text-lg font-bold text-[#0a3d62] bg-gray-50 px-6 py-4 rounded-lg hover:bg-gray-100 transition-colors [&[data-state=open]]:bg-[#eff6ff] [&[data-state=open]]:text-[#ff6b35]">
                        Can I customize a group tour?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 px-6 pt-4 pb-2 text-base leading-relaxed">
                    Group tours have fixed itineraries to ensure smooth logistics for everyone. However, if you prefer flexibility, we can create a customized 'Private Tour' for you and your family with your preferred dates and sightseeing (FIT Packages).
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border-b-0">
                    <AccordionTrigger className="text-lg font-bold text-[#0a3d62] bg-gray-50 px-6 py-4 rounded-lg hover:bg-gray-100 transition-colors [&[data-state=open]]:bg-[#eff6ff] [&[data-state=open]]:text-[#ff6b35]">
                        What happens if my visa is rejected?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 px-6 pt-4 pb-2 text-base leading-relaxed">
                    Visa issuance is at the sole discretion of the respective embassy. In case of rejection, cancellation charges will apply as per our policy and the airline/hotel terms. Our visa experts will guide you to minimize chances of rejection by carefully reviewing your documents.
                    </AccordionContent>
                </AccordionItem>
                </Accordion>
            </div>
        </div>
      </section>
    </div>
  )
}
