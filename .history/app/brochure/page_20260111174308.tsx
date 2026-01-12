import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function BrochurePage() {
  return (
    <div className="font-sans py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-[#0a3d62] font-serif mb-6">Download E-Brochures</h1>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Get detailed itineraries, inclusion lists, and tour highlights for our most popular destinations. Download PDF brochures to plan your trip offline.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
                "Europe 2026 Collection",
                "USA & Americas",
                "Grand Japan & Asia",
                "Dubai & Middle East",
                "Australia & New Zealand",
                "Premium Honeymoon Collection"
            ].map((title, i) => (
                <div key={i} className="bg-gray-50 border border-gray-200 p-8 rounded-xl hover:shadow-lg transition-shadow">
                    <div className="bg-[#dee2e6] aspect-[3/4] mb-6 rounded-lg flex items-center justify-center text-gray-400">
                       Cover Preview
                    </div>
                    <h3 className="font-bold text-[#0a3d62] mb-4">{title}</h3>
                    <Button variant="outline" className="w-full border-[#0a3d62] text-[#0a3d62] hover:bg-[#0a3d62] hover:text-white">
                        <Download className="h-4 w-4 mr-2" /> Download PDF
                    </Button>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}
