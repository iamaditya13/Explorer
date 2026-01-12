import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="font-sans py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
           <h1 className="text-4xl font-bold text-[#0a3d62] font-serif mb-4">Frequently Asked Questions</h1>
           <p className="text-gray-600">Find answers to common questions about travelling with Headway.</p>
        </div>

        <Accordion type="single" collapsible className="w-full bg-white p-6 rounded-xl shadow-sm">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-medium text-[#0a3d62]">Do you provide vegetarian food on international tours?</AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Yes, absolutely. We specialise in catering to Indian dietary preferences. Most of our group tours include pure vegetarian meals prepared by Indian chefs (Maharaj) or at vetted Indian restaurants.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-medium text-[#0a3d62]">What is included in the tour package price?</AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Our packages are comprehensive. They typically include return airfare, visa fees, accommodation, meals (as per itinerary), sightseeing, transfers, and the services of a professional tour manager. Specific inclusions are listed on each package page.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-medium text-[#0a3d62]">How do I book a tour?</AccordionTrigger>
            <AccordionContent className="text-gray-600">
              You can book online through our website, call our support team, or visit any of our branches. You can initially block your seat by paying a booking deposit.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-medium text-[#0a3d62]">Can I customize a group tour?</AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Group tours have fixed itineraries to ensure smooth logistics for everyone. However, if you prefer flexibility, we can create a customized 'Private Tour' for you and your family with your preferred dates and sightseeing.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-medium text-[#0a3d62]">What happens if my visa is rejected?</AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Visa issuance is at the sole discretion of the respective embassy. In case of rejection, cancellation charges will apply as per our policy and the airline/hotel terms. Our visa experts will guide you to minimize chances of rejection.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
