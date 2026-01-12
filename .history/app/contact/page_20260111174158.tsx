import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <div className="font-sans">
      <section className="bg-[#0a3d62] py-20 text-white text-center">
        <h1 className="text-4xl font-bold font-serif mb-4">Contact Us</h1>
        <p className="max-w-xl mx-auto opacity-90">We are here to help you plan your perfect trip. Reach out to us for any queries or assistance.</p>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-[#0a3d62] font-serif mb-8">Get in Touch</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-[#eff6ff] p-3 rounded-full text-[#0a3d62]">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#0a3d62]">Head Office</h3>
                    <p className="text-gray-600">201/202, Gala Business Centre, St. Xaviers College Corner,<br/>Near Classic Gold Hotel, Off C.G. Road,<br/>Ahmedabad 380 009, Gujarat, India.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#eff6ff] p-3 rounded-full text-[#0a3d62]">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#0a3d62]">Phone</h3>
                    <p className="text-gray-600">+91 98250 81806</p>
                    <p className="text-gray-600">079 4000 1500</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#eff6ff] p-3 rounded-full text-[#0a3d62]">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#0a3d62]">Email</h3>
                    <p className="text-gray-600">world@headwaytravels.com</p>
                    <p className="text-gray-600">support@headwaytravels.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#eff6ff] p-3 rounded-full text-[#0a3d62]">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#0a3d62]">Opening Hours</h3>
                    <p className="text-gray-600">Mon - Sat: 10:00 AM - 7:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold text-[#0a3d62] font-serif mb-6">Send us a Message</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <Input type="tel" placeholder="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <Textarea placeholder="Tell us about your travel plans..." className="min-h-[120px]" />
                </div>
                <Button className="w-full bg-[#ff6b35] hover:bg-[#e65100] text-white">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
