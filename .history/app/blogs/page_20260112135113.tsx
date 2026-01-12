import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Travel Blogs - Headway Travels",
  description: "Read expert travel tips, destination guides, and inspiring travel stories from Headway Travels.",
}

const blogs = [
  {
    title: "10 Reasons Why Europe Should Be Your Next Summer Destination",
    excerpt: "From the Swiss Alps to the canals of Venice, discover why Europe is perfect for a summer family holiday.",
    date: "May 15, 2026",
    image: "/blog-europe.png"
  },
  {
    title: "A Vegetarians Guide to Travelling in Japan",
    excerpt: "Worried about food in Japan? Here are the best vegetarian-friendly spots and dishes to try.",
    date: "April 28, 2026",
    image: "/blog-japan.png"
  },
  {
    title: "Dubai Beyond Shopping: Culture, Adventure & Desert",
    excerpt: "Explore the adventurous and cultural side of Dubai beyond the malls and skyscrapers.",
    date: "April 10, 2026",
    image: "/blog-dubai.png"
  }
]

export default function BlogsPage() {
  return (
    <div className="font-sans py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
             <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-[#0a3d62] font-serif mb-6">Travel Blogs & Stories</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Expert tips, destination guides, and travel stories to inspire your next journey. Stay updated with the latest in travel.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
                {blogs.map((blog, i) => (
                    <div key={i} className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                        <div className="relative h-64 overflow-hidden">
                             <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="p-8">
                            <p className="text-sm text-[#ff6b35] font-bold uppercase tracking-wider mb-3">{blog.date}</p>
                            <h3 className="text-xl md:text-2xl font-bold text-[#0a3d62] mb-4 group-hover:text-[#ff6b35] transition-colors leading-snug">{blog.title}</h3>
                            <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{blog.excerpt}</p>
                            <Link href="#" className="inline-flex items-center font-bold text-[#0a3d62] hover:text-[#ff6b35] transition-colors">
                                Read Article <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
             <div className="text-center mt-16">
                 <Button className="bg-[#0a3d62] hover:bg-[#082a44] text-white rounded-full px-10 py-6 text-lg shadow-lg">View All Blogs</Button>
             </div>
        </div>
    </div>
  )
}
