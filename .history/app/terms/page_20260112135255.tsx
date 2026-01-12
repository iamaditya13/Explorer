import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions - Headway Travels",
  description: "Review the terms and conditions for booking holidays and services with Headway Travels.",
}

export default function TermsPage() {
  return (
    <div className="font-sans py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-[#0a3d62] font-serif mb-8">Terms & Conditions</h1>
        <div className="prose max-w-none text-gray-700">
            <p className="mb-4">Please read these Terms & Conditions carefully before booking with Headway Travels Pvt. Ltd.</p>
            
            <h3 className="text-xl font-bold text-[#0a3d62] mt-6 mb-3">1. Booking & Payments</h3>
            <p className="mb-4">A non-refundable registration amount is required to secure your booking. The balance payment schedule must be adhered to as per the package terms.</p>

            <h3 className="text-xl font-bold text-[#0a3d62] mt-6 mb-3">2. Cancellations & Refunds</h3>
            <p className="mb-4">Cancellation charges apply based on the time of cancellation relative to the departure date. Refunds, if any, will be processed within 30 working days.</p>
            
            <h3 className="text-xl font-bold text-[#0a3d62] mt-6 mb-3">3. Changes to Itinerary</h3>
            <p className="mb-4">The company reserves the right to modify the itinerary due to force majeure events, airline schedule changes, or local conditions.</p>
        </div>
      </div>
    </div>
  )
}
