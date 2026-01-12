import { CheckCircle2 } from "lucide-react"

export default function PaymentProcedurePage() {
  return (
    <div className="font-sans py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-[#0a3d62] font-serif mb-8 text-center">Payment Procedure</h1>
        
        <div className="space-y-12">
            <div>
                <h2 className="text-2xl font-bold text-[#ff6b35] mb-4">1. Online Payment</h2>
                <p className="text-gray-700 mb-4">You can make secure online payments using Credit/Debit Cards, Net Banking, or UPI through our payment gateway. A convenience fee may be applicable as per the payment partner's policy.</p>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <p className="font-medium text-[#0a3d62]">Accepted Cards:</p>
                    <p className="text-gray-600">Visa, Mastercard, American Express, Rupay</p>
                </div>
            </div>

            <div>
                 <h2 className="text-2xl font-bold text-[#ff6b35] mb-4">2. Bank Transfer (NEFT/RTGS/IMPS)</h2>
                 <p className="text-gray-700 mb-4">You can transfer funds directly to our company bank account. Please share the transaction reference number with your travel consultant after transfer.</p>
                 <div className="bg-[#eff6ff] p-6 rounded-lg border border-blue-100">
                     <p className="font-bold text-[#0a3d62] mb-2">Bank Details:</p>
                     <p className="text-gray-700">Account Name: <span className="font-medium">Headway Travels Pvt. Ltd.</span></p>
                     <p className="text-gray-700">Bank Name: <span className="font-medium">HDFC Bank</span></p>
                     <p className="text-gray-700">Account No: <span className="font-medium">00000000000000</span></p>
                     <p className="text-gray-700">IFSC Code: <span className="font-medium">HDFC0000000</span></p>
                     <p className="text-gray-700">Branch: <span className="font-medium">Navrangpura, Ahmedabad</span></p>
                 </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-[#ff6b35] mb-4">3. Booking Policy</h2>
                <ul className="space-y-3 text-gray-700">
                    <li className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-[#0a3d62]" /> <span>Registration amount is required to block your seats.</span></li>
                    <li className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-[#0a3d62]" /> <span>50% payment to be made 45 days prior to departure.</span></li>
                    <li className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-[#0a3d62]" /> <span>100% payment to be cleared 20 days prior to departure.</span></li>
                    <li className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-[#0a3d62]" /> <span>For flights, 100% payment is required at the time of issuance.</span></li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  )
}
