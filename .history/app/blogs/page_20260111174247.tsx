import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const blogs = [
  {
    title: "10 Reasons Why Europe Should Be Your Next Summer Destination",
    excerpt: "From the Swiss Alps to the canals of Venice, discover why Europe is perfect for a summer family holiday.",
    date: "May 15, 2026",
    image: "/placeholder.svg?height=300&width=400"
  },
  {
    title: "A Vegetarians Guide to Travelling in Japan",
    excerpt: "Worried about food in Japan? Here are the best vegetarian-friendly spots and dishes to try.",
    date: "April 28, 2026",
    image: "/placeholder.svg?height=300&width=400"
  },
  {
    title: "Dubai Beyond Shopping: Culture, Adventure & Desert",
    excerpt: "Explore the adventurous and cultural side of Dubai beyond the malls and skyscrapers.",
    date: "April 10, 2026",
    image: "/placeholder.svg?height=300&width=400"
  }
]

export default function BlogsPage() {
  return (
    <div className="font-sans py-20">
        <div className="container mx-auto px-4">
             <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-[#0a3d62] font-serif mb-4">Travel Blogs</h1>
                <p className="text-gray-600">Expert tips, destination guides, and travel stories to inspire your next journey.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {blogs.map((blog, i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className="relative h-60 overflow-hidden rounded-xl mb-4">
                             <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                        </div>
                        <p className="text-sm text-[#ff6b35] font-medium mb-2">{blog.date}</p>
                        <h3 className="text-xl font-bold text-[#0a3d62] mb-3 group-hover:text-[#ff6b35] transition-colors">{blog.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>
                        <Link href="#" className="font-bold text-[#0a3d62] hover:underline">Read Article</Link>
                    </div>
                ))}
            </div>
             <div className="text-center mt-12">
                 <Button className="bg-[#0a3d62] text-white rounded-full px-8">View All Blogs</Button>
             </div>
        </div>
    </div>
  )
}
