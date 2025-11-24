import Link from "next/link"
import { Facebook, Instagram, Youtube, Twitter, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#0a3d62] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand & Copyright */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-[#ff6b35] font-serif mb-1">EXPLORERS</h3>
            <p className="text-xs text-gray-400">
              &copy; 2025 Explorers Transworld Pvt. Ltd. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex gap-6 text-sm text-gray-300">
            <Link href="/about" className="hover:text-[#ff6b35] transition-colors">About</Link>
            <Link href="/contact" className="hover:text-[#ff6b35] transition-colors">Contact</Link>
            <Link href="/packages" className="hover:text-[#ff6b35] transition-colors">Packages</Link>
            <Link href="/terms" className="hover:text-[#ff6b35] transition-colors">Terms</Link>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3">
            <SocialIcon icon="facebook" />
            <SocialIcon icon="instagram" />
            <SocialIcon icon="twitter" />
            <SocialIcon icon="youtube" />
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ icon }: { icon: "facebook" | "instagram" | "twitter" | "youtube" }) {
  const Icon = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
  }[icon]

  return (
    <a
      href="#"
      className="bg-white/10 p-2 rounded-full hover:bg-[#ff6b35] hover:text-[#0a3d62] transition-all duration-300 hover:-translate-y-1"
    >
      <Icon className="h-5 w-5" />
    </a>
  )
}
