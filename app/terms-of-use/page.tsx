import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Use - Headway Travels",
  description: "Read the terms of use for accessing and using the Headway Travels website.",
}

export default function TermsOfUsePage() {
  return (
    <div className="font-sans py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-[#0a3d62] font-serif mb-8">Terms of Use</h1>
        <div className="prose max-w-none text-gray-700">
            <p className="mb-4">By accessing this website (headwaytravels.in / headwaytravels.com), you agree to comply with these Terms of Use.</p>
            
            <h3 className="text-xl font-bold text-[#0a3d62] mt-6 mb-3">1. Website Content</h3>
            <p className="mb-4">All content on this website, including text, images, and itineraries, is the property of Headway Travels and strictly for personal use.</p>

            <h3 className="text-xl font-bold text-[#0a3d62] mt-6 mb-3">2. User Conduct</h3>
            <p className="mb-4">You agree not to use this website for any unlawful purpose or to disrupt its functionality.</p>
            
            <h3 className="text-xl font-bold text-[#0a3d62] mt-6 mb-3">3. Accuracy of Information</h3>
            <p className="mb-4">While we strive for accuracy, Headway Travels does not guarantee that all information on the website is free from errors or omissions.</p>
        </div>
      </div>
    </div>
  )
}
