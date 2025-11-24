"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Download, Upload, Trash2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { read, write, clear, seed, type ExplorersData } from "@/lib/storage"

export default function AdminPage() {
  const [data, setData] = useState<ExplorersData | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    loadData()
  }, [refreshKey])

  const loadData = () => {
    const loadedData = read()
    setData(loadedData)
  }

  const handleDownload = () => {
    if (data) {
      const dataStr = JSON.stringify(data, null, 2)
      const blob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `explorers-data-${new Date().toISOString()}.json`
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string)
          write(json)
          setRefreshKey((prev) => prev + 1)
          alert("Data imported successfully!")
        } catch (error) {
          alert("Error importing data. Please check the file format.")
        }
      }
      reader.readAsText(file)
    }
  }

  const handleSeed = () => {
    if (confirm("This will replace all existing data with sample data. Continue?")) {
      seed()
      setRefreshKey((prev) => prev + 1)
      alert("Sample data seeded successfully!")
    }
  }

  const handleClear = () => {
    if (confirm("This will permanently delete all data. Are you sure?")) {
      clear()
      setRefreshKey((prev) => prev + 1)
      alert("All data cleared!")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0a3d62] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-xl text-gray-200">Manage localStorage data</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Button onClick={handleSeed} className="bg-green-600 hover:bg-green-700 p-6 h-auto flex flex-col gap-2">
            <RefreshCw className="h-8 w-8" />
            <span>Seed Sample Data</span>
          </Button>

          <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700 p-6 h-auto flex flex-col gap-2">
            <Download className="h-8 w-8" />
            <span>Download JSON</span>
          </Button>

          <label className="cursor-pointer">
            <div className="bg-[#ff6b35] hover:bg-[#0a3d62] text-white p-6 h-auto flex flex-col gap-2 items-center rounded-lg transition-colors">
              <Upload className="h-8 w-8" />
              <span>Upload JSON</span>
            </div>
            <input type="file" accept=".json" onChange={handleUpload} className="hidden" />
          </label>

          <Button onClick={handleClear} variant="destructive" className="p-6 h-auto flex flex-col gap-2">
            <Trash2 className="h-8 w-8" />
            <span>Clear All Data</span>
          </Button>
        </div>

        {data && (
          <Card>
            <CardHeader>
              <CardTitle>Current Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <Card className="bg-blue-50">
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold text-blue-600">{data.siteContent.packages.length}</p>
                    <p className="text-sm text-gray-600">Packages</p>
                  </CardContent>
                </Card>
                <Card className="bg-green-50">
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold text-green-600">{data.bookings.length}</p>
                    <p className="text-sm text-gray-600">Bookings</p>
                  </CardContent>
                </Card>
                <Card className="bg-yellow-50">
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold text-yellow-600">{data.inquiries.length}</p>
                    <p className="text-sm text-gray-600">Inquiries</p>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50">
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold text-purple-600">{data.newsletter.length}</p>
                    <p className="text-sm text-gray-600">Newsletter</p>
                  </CardContent>
                </Card>
                <Card className="bg-pink-50">
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold text-pink-600">{data.careerApplications.length}</p>
                    <p className="text-sm text-gray-600">Applications</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
