"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User, Tag, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { read, type Blog } from "@/lib/storage"

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    const data = read()
    if (data) {
      setBlogs(data.siteContent.blogs)
      setFilteredBlogs(data.siteContent.blogs)
    }
  }, [])

  useEffect(() => {
    let filtered = [...blogs]

    if (searchQuery) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((blog) => blog.category === selectedCategory)
    }

    setFilteredBlogs(filtered)
  }, [searchQuery, selectedCategory, blogs])

  const categories = Array.from(new Set(blogs.map((b) => b.category)))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center text-white">
        <Image
          src="/rann-utsav-the-tent-city-india-colorful-camel.jpg"
          alt="Travel Blog"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">Travel Blog</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            Travel tips, destination guides, and inspiring stories
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-3">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-3">Categories</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className={`w-full text-left px-3 py-2 rounded transition-colors ${
                        selectedCategory === "all" ? "bg-[#ff6b35] text-white" : "hover:bg-gray-100"
                      }`}
                    >
                      All Posts
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded transition-colors ${
                          selectedCategory === category ? "bg-[#ff6b35] text-white" : "hover:bg-gray-100"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Blog Posts */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredBlogs.length} of {blogs.length} posts
              </p>
            </div>

            {filteredBlogs.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No blog posts found.</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredBlogs.map((blog) => (
                  <Card key={blog.id} className="hover:shadow-lg transition-shadow group overflow-hidden">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="relative h-64 md:h-auto">
                        <Image
                          src={blog.image || "/placeholder.svg"}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="md:col-span-2 p-6">
                        <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-600">
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
                            <span className="text-[#ff6b35]">{blog.category}</span>
                          </div>
                        </div>
                        <Link href={`/blogs/${blog.slug}`}>
                          <h2 className="text-2xl font-bold mb-3 group-hover:text-[#ff6b35] transition-colors">
                            {blog.title}
                          </h2>
                        </Link>
                        <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                        <Link href={`/blogs/${blog.slug}`}>
                          <Button
                            variant="outline"
                            className="border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white bg-transparent"
                          >
                            Read More
                          </Button>
                        </Link>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
