import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
// <CHANGE> Import global components
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { StorageInit } from "@/components/storage-init"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  // <CHANGE> Update metadata for Headway Travels
  title: "Headway Travels - Your Trusted International Travel Partner",
  description:
    "Explore the world with Headway Travels. Best tour packages, holiday deals, and international travel experiences crafted for comfort.",
  generator: "v0.app",
    icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
}

import { AuthProvider } from "@/lib/auth"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <AuthProvider>
          <StorageInit />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
