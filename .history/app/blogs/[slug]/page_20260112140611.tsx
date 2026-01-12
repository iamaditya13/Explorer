"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User, Clock, ArrowLeft, Tag, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { read, type Blog } from "@/lib/storage"

export default function BlogDetailPage() {
  const params = useParams()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([])

  useEffect(() => {
    const data = read()
    if (data && params.slug) {
      const foundBlog = data.siteContent.blogs.find((b) => b.slug === params.slug)
      setBlog(foundBlog || null)

      if (foundBlog) {
        const related = data.siteContent.blogs
          .filter((b) => b.category === foundBlog.category && b.id !== foundBlog.id)
          .slice(0, 3)
        setRelatedBlogs(related)
      }
    }
  }, [params.slug])

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading blog post...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px]">
        <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold font-serif max-w-4xl mx-auto leading-tight shadow-sm">
              {blog.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Link href="/blogs" className="inline-flex items-center text-[#ff6b35] hover:text-[#e65100] font-medium mb-6 group transition-colors">
          <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Blogs
        </Link>
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600 p-8 md:p-12 pb-0">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag className="h-4 w-4" />
              <span className="text-[#ff6b35] font-semibold">{blog.category}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 text-balance p-8 md:p-12 pt-4">
            {blog.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed p-8 md:p-12 pt-0">{blog.excerpt}</p>

          {/* Share Button */}
          <div className="flex gap-3 mb-8 pb-8 border-b p-8 md:p-12 pt-0">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none p-8 md:p-12 pt-0" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link key={relatedBlog.id} href={`/blogs/${relatedBlog.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow group overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={relatedBlog.image || "/placeholder.svg"}
                        alt={relatedBlog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2 group-hover:text-[#ff6b35] transition-colors line-clamp-2">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{relatedBlog.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
