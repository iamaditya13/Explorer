import { Play } from "lucide-react"

export default function VideoGalleryPage() {
  return (
    <div className="font-sans py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold font-serif mb-4">Travel Inspiration Gallery</h1>
          <p className="opacity-80">Watch our travellers explore the world and experience Headway hospitality.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden group cursor-pointer border border-gray-700">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="h-8 w-8 text-white fill-current ml-1" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}
