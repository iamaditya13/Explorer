import { Quote, Star } from "lucide-react"

const testimonials = [
  {
    text: "We had an amazing Europe trip with Headway Travels. The Indian food arrangements were excellent, and the tour manager was very helpful. Highly recommended!",
    author: "Rajesh & Priya Mehta",
    location: "Ahmedabad",
    rating: 5
  },
  {
    text: "The Japan cherry blossom tour was a dream come true. Everything was perfectly organized. Headway really takes care of comfort.",
    author: "Suresh Patel",
    location: "Mumbai",
    rating: 5
  },
  {
    text: "Our honeymoon in Bali was magical. The hotels were luxurious and the itinerary was relaxed, just as we wanted. Thank you Team Headway!",
    author: "Amit & Neha Sharma",
    location: "Delhi",
    rating: 5
  },
  {
    text: "Great experience with the Group Tour to Singapore. My parents felt very comfortable with the Indian chef on board.",
    author: "Vikram Singh",
    location: "Pune",
    rating: 4
  }
]

export default function TestimonialsPage() {
  return (
    <div className="font-sans py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#0a3d62] font-serif mb-4">What Our Travellers Say</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Read honest reviews from travellers who have explored the world with Headway.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-md relative">
              <Quote className="h-10 w-10 text-[#ff6b35] absolute top-6 left-6 opacity-20" />
              <div className="relative z-10">
                <div className="flex gap-1 mb-4 text-yellow-400">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
                <p className="text-gray-700 text-lg mb-6 italic">"{t.text}"</p>
                <div>
                  <h4 className="font-bold text-[#0a3d62]">{t.author}</h4>
                  <p className="text-sm text-gray-500">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
