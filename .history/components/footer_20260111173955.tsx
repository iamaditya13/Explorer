import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#0a3d62] text-white pt-16 pb-8 font-sans">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Top Destinations */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#ff6b35]">Top Destinations</h3>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/destinations/usa" className="hover:text-white transition-colors">USA</Link></li>
              <li><Link href="/destinations/dubai" className="hover:text-white transition-colors">Dubai</Link></li>
              <li><Link href="/destinations/japan" className="hover:text-white transition-colors">Japan</Link></li>
              <li><Link href="/destinations/thailand" className="hover:text-white transition-colors">Thailand</Link></li>
              <li><Link href="/destinations/singapore-malaysia" className="hover:text-white transition-colors">Singapore & Malaysia</Link></li>
              <li><Link href="/destinations/europe" className="hover:text-white transition-colors">Europe</Link></li>
              <li><Link href="/destinations/bali" className="hover:text-white transition-colors">Bali</Link></li>
              <li><Link href="/destinations/australia" className="hover:text-white transition-colors">Australia</Link></li>
              <li><Link href="/destinations/new-zealand" className="hover:text-white transition-colors">New Zealand</Link></li>
            </ul>
          </div>

          {/* Column 2: Top Travel Themes */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#ff6b35]">Top Travel Themes</h3>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/themes/super-saver" className="hover:text-white transition-colors">Super Saver Packages</Link></li>
              <li><Link href="/themes/group-tours" className="hover:text-white transition-colors">Group Tours</Link></li>
              <li><Link href="/themes/honeymoon" className="hover:text-white transition-colors">Honeymoon Packages</Link></li>
              <li><Link href="/themes/winter-tours" className="hover:text-white transition-colors">Winter Tours</Link></li>
              <li><Link href="/themes/maharaj-tours" className="hover:text-white transition-colors">Maharaj Tours (Indian Chef)</Link></li>
              <li><Link href="/themes/short-breaks" className="hover:text-white transition-colors">Short Breaks</Link></li>
              <li><Link href="/themes/exotic-tours" className="hover:text-white transition-colors">Exotic Tours</Link></li>
              <li><Link href="/themes/self-drive" className="hover:text-white transition-colors">Self-Drive Tours</Link></li>
            </ul>
          </div>

          {/* Column 3: General Pages & Support */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#ff6b35]">Company</h3>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/about" className="hover:text-white transition-colors">About Headway</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/blogs" className="hover:text-white transition-colors">Blogs</Link></li>
              <li><Link href="/brochure" className="hover:text-white transition-colors">Brochure</Link></li>
              <li><Link href="/video-gallery" className="hover:text-white transition-colors">Video Gallery</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Partner */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#ff6b35]">Quick Links & Policies</h3>
            <ul className="space-y-3 text-gray-300">
                <li><Link href="/partner-with-us" className="hover:text-white transition-colors">Partner With Us</Link></li>
                <li><Link href="/advertise-with-us" className="hover:text-white transition-colors">Advertise With Us</Link></li>
                <li><Link href="/retrieve-booking" className="hover:text-white transition-colors">Retrieve Booking</Link></li>
                <li><Link href="/payment-procedure" className="hover:text-white transition-colors">Payment Procedure</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link></li>
                <li><Link href="/csr-policy" className="hover:text-white transition-colors">CSR Policy</Link></li>
            </ul>

            <div className="mt-8">
                <h4 className="text-md font-bold text-white mb-2">Regional Websites</h4>
                <div className="flex gap-4 text-sm text-gray-400">
                   <a href="https://www.headwaytravels.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff6b35]">India</a>
                   <span>|</span>
                   <a href="https://www.headwaytravels.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff6b35]">International</a>
                </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            &copy; 2026 Headway Travels Pvt. Ltd. All Rights Reserved.
          </div>
          <div className="flex gap-4">
            <Link href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#ff6b35] transition-colors text-white">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#ff6b35] transition-colors text-white">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#ff6b35] transition-colors text-white">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="p-2 bg-gray-800 rounded-full hover:bg-[#ff6b35] transition-colors text-white">
              <Youtube className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
