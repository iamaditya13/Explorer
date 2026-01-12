// LocalStorage architecture for Flamingo Travels clone
// Single root key: flamingo_v0

export interface ExplorersData {
  siteContent: SiteContent
  bookings: Booking[]
  inquiries: Inquiry[]
  newsletter: Newsletter[]
  careerApplications: CareerApplication[]
}

export interface SiteContent {
  home: HomeContent
  packages: Package[]
  themes: Theme[]
  destinations: Destination[]
  blogs: Blog[]
  branches: Branch[]
  pages: {
    about: string
    testimonials: Testimonial[]
    faq: FAQ[]
    privacy: string
    terms: string
    csr: string
    paymentProcedure: string
    travelGuide: string
  }
}

export interface HomeContent {
  hero: {
    title: string
    subtitle: string
    searchPlaceholder: string
    images: string[]
  }
  about: {
    title: string
    description: string
  }
}

export interface Package {
  id: string
  slug: string
  title: string
  description: string
  price: number
  duration: string
  images: string[]
  theme: string
  destination: string
  itinerary: ItineraryDay[]
  inclusions: string[]
  exclusions: string[]
  featured: boolean
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
}

export interface Theme {
  id: string
  slug: string
  name: string
  description: string
  image: string
  tourCount: number
}

export interface Destination {
  id: string
  name: string
  slug: string
  image: string
  priceFrom: number
  description: string
  featured: boolean
}

export interface Branch {
  id: string
  name: string
  address: string
  phone: string
  email: string
  hours: string
  mapLink: string
}

export interface Booking {
  id: string
  packageId: string
  packageName: string
  customerName: string
  email: string
  phone: string
  date: string
  guests: number
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
}

export interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  destination: string
  message: string
  createdAt: string
}

export interface Newsletter {
  id: string
  email: string
  subscribedAt: string
}

export interface CareerApplication {
  id: string
  position: string
  fullName: string
  email: string
  phone: string
  resume: string
  coverLetter: string
  createdAt: string
}

export interface Blog {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  date: string
  category: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  comment: string
  date: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

const STORAGE_KEY = "explorers_v0"

export function read(): ExplorersData | null {
  if (typeof window === "undefined") return null
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return null
    return JSON.parse(data)
  } catch (e) {
    console.error("Failed to read from storage", e)
    return null
  }
}

export function write(data: ExplorersData): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error("Failed to write to storage", e)
  }
}

export function clear(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
}

export function seed(): void {
  const current = read()
  if (current) return // Don't overwrite if exists

  const defaultData: ExplorersData = {
    siteContent: {
      home: {
        hero: {
          title: "Explore the World with Explorers",
          subtitle: "Discover amazing places at exclusive deals",
          searchPlaceholder: "Where do you want to go?",
          images: ["/placeholder.svg"],
        },
        about: {
          title: "Explorers – Your Trusted International Tour Operator",
          description:
            "With years of experience as a leading International Tour Operator, Explorers is a name you can trust and rely on for all your holiday needs. From thoughtful itineraries to our signature tour packages with hassle-free booking and 24/7 client support, we bring comfort and care to your travels across the globe.",
        },
      },
      packages: [
        {
          id: "1",
          title: "Majestic Switzerland",
          slug: "majestic-switzerland",
          description: "Experience the beauty of the Swiss Alps",
          price: 150000,
          duration: "7 Days / 6 Nights",
          images: ["/placeholder.svg"],
          featured: true,
          theme: "winter-tours",
          destination: "europe",
          inclusions: ["Flights", "Hotels", "Meals", "Sightseeing"],
          exclusions: ["Visa", "Personal Expenses"],
          itinerary: [
            { day: 1, title: "Arrival in Zurich", description: "Welcome to Switzerland" },
            { day: 2, title: "Lucerne Tour", description: "Visit Chapel Bridge and Lion Monument" },
          ],
        },
        {
          id: "2",
          title: "Dubai Extravaganza",
          slug: "dubai-extravaganza",
          description: "Luxury shopping, ultramodern architecture and lively nightlife",
          price: 80000,
          duration: "5 Days / 4 Nights",
          images: ["/placeholder.svg"],
          featured: true,
          theme: "short-break",
          destination: "dubai",
          inclusions: ["Visa", "Hotels", "Desert Safari", "Burj Khalifa"],
          exclusions: ["Flights", "Personal Expenses"],
          itinerary: [{ day: 1, title: "Arrival in Dubai", description: "Transfer to hotel" }],
        },
        {
          id: "3",
          title: "Simply Singapore",
          slug: "simply-singapore",
          description: "A melting pot of culture, food and architecture",
          price: 65000,
          duration: "5 Days / 4 Nights",
          images: ["/placeholder.svg"],
          featured: true,
          theme: "short-break",
          destination: "singapore",
          inclusions: ["Flights", "Hotels", "Sentosa Island", "Universal Studios"],
          exclusions: ["Visa", "Personal Expenses"],
          itinerary: [{ day: 1, title: "Arrival in Singapore", description: "Night Safari" }],
        },
        {
          id: "4",
          title: "European Dream",
          slug: "european-dream",
          description: "Visit Paris, Brussels, Amsterdam and more",
          price: 220000,
          duration: "10 Days / 9 Nights",
          images: ["/placeholder.svg"],
          featured: false,
          theme: "group-tours",
          destination: "europe",
          inclusions: ["Flights", "Hotels", "Eurail Pass", "Sightseeing"],
          exclusions: ["Visa", "Personal Expenses"],
          itinerary: [{ day: 1, title: "Arrival in Paris", description: "Seine Cruise" }],
        },
        {
          id: "5",
          title: "Kerala Backwaters",
          slug: "kerala-backwaters",
          description: "Relax in the serene backwaters of God's Own Country",
          price: 35000,
          duration: "6 Days / 5 Nights",
          images: ["/placeholder.svg"],
          featured: true,
          theme: "honeymoon",
          destination: "india",
          inclusions: ["Houseboat Stay", "Meals", "Transfers"],
          exclusions: ["Flights"],
          itinerary: [{ day: 1, title: "Arrival in Cochin", description: "Transfer to Munnar" }],
        },
        {
          id: "6",
          title: "Rajasthan Royal Tour",
          slug: "rajasthan-royal",
          description: "Experience the royalty of Jaipur, Jodhpur and Udaipur",
          price: 45000,
          duration: "7 Days / 6 Nights",
          images: ["/placeholder.svg"],
          featured: true,
          theme: "maharaj-tour",
          destination: "india",
          inclusions: ["Heritage Hotels", "Guide", "Transport"],
          exclusions: ["Entry Fees"],
          itinerary: [{ day: 1, title: "Arrival in Jaipur", description: "Pink City Tour" }],
        },
        {
          id: "7",
          title: "Bali Bliss",
          slug: "bali-bliss",
          description: "Beaches, temples and rice terraces",
          price: 60000,
          duration: "6 Days / 5 Nights",
          images: ["/placeholder.svg"],
          featured: true,
          theme: "honeymoon",
          destination: "bali",
          inclusions: ["Villa Stay", "Water Sports", "Breakfast"],
          exclusions: ["Flights"],
          itinerary: [{ day: 1, title: "Arrival in Bali", description: "Transfer to Villa" }],
        },
      ],
      themes: [
        {
          id: "1",
          slug: "super-seller",
          name: "Super Seller Packages",
          description: "Our most popular and best-selling tour packages",
          image: "/popular-tourist-destinations-colorful-city.jpg",
          tourCount: 75,
        },
        {
          id: "2",
          slug: "winter-tours",
          name: "Winter Tours",
          description: "Experience magical winter destinations",
          image: "/snow-mountains-winter-resort-skiing.jpg",
          tourCount: 45,
        },
        {
          id: "3",
          slug: "group-tours",
          name: "Group Tours",
          description: "Perfect packages for group travelers",
          image: "/group-of-tourists-famous-landmarks.jpg",
          tourCount: 62,
        },
        {
          id: "4",
          slug: "maharaj-tour",
          name: "Maharaj Tour (Indian Chef)",
          description: "Experience luxury with authentic Indian cuisine",
          image: "/luxury-travel-indian-chef-cooking.jpg",
          tourCount: 34,
        },
        {
          id: "5",
          slug: "honeymoon",
          name: "Honeymoon",
          description: "Romantic getaways for newlyweds",
          image: "/romantic-couple-beach-sunset-honeymoon.jpg",
          tourCount: 39,
        },
        {
          id: "6",
          slug: "short-break",
          name: "Short Break",
          description: "Quick weekend escapes",
          image: "/weekend-getaway-quick-vacation.jpg",
          tourCount: 52,
        },
      ],
      destinations: [
        {
          id: "1",
          slug: "south-africa",
          name: "South Africa",
          description: "Wildlife safaris and stunning landscapes",
          image: "/placeholder.svg?height=300&width=400",
          priceFrom: 125000,
          featured: true,
        },
        {
          id: "2",
          slug: "japan",
          name: "Japan",
          description: "Ancient temples meet modern technology",
          image: "/placeholder.svg?height=300&width=400",
          priceFrom: 180000,
          featured: true,
        },
        {
          id: "3",
          slug: "europe",
          name: "All Of Europe",
          description: "Explore the best of European culture",
          image: "/placeholder.svg?height=300&width=400",
          priceFrom: 195000,
          featured: true,
        },
        {
          id: "4",
          slug: "new-zealand",
          name: "New Zealand",
          description: "Adventure in stunning natural beauty",
          image: "/placeholder.svg?height=300&width=400",
          priceFrom: 280000,
          featured: true,
        },
        {
          id: "5",
          slug: "vietnam",
          name: "Vietnam",
          description: "Rich history and beautiful landscapes",
          image: "/placeholder.svg?height=300&width=400",
          priceFrom: 89000,
          featured: true,
        },
        {
          id: "6",
          slug: "dubai",
          name: "UAE - Dubai",
          description: "Luxury and modern architecture",
          image: "/placeholder.svg?height=300&width=400",
          priceFrom: 54200,
          featured: true,
        },
        {
          id: "7",
          slug: "singapore",
          name: "Singapore",
          description: "The Lion City awaits",
          image: "/placeholder.svg?height=300&width=400",
          priceFrom: 45000,
          featured: true,
        },
      ],
      blogs: [
        {
          id: "1",
          slug: "best-time-visit-japan",
          title: "Best Time to Visit Japan: A Complete Guide",
          excerpt: "Discover when to visit Japan for cherry blossoms, autumn colors, or winter snow.",
          content: `<h2>Introduction</h2><p>Japan is a year-round destination, but the best time to visit depends on what you want to experience...</p>`,
          image: "/placeholder.svg?height=400&width=800",
          author: "Priya Sharma",
          date: "2024-01-15",
          category: "Travel Tips",
        },
        {
          id: "2",
          slug: "top-10-things-dubai",
          title: "Top 10 Things to Do in Dubai",
          excerpt: "From the Burj Khalifa to desert safaris, explore the best attractions in Dubai.",
          content: `<h2>1. Burj Khalifa</h2><p>Visit the world's tallest building...</p>`,
          image: "/placeholder.svg?height=400&width=800",
          author: "Rahul Patel",
          date: "2024-01-20",
          category: "Destination Guide",
        },
        {
          id: "3",
          slug: "european-travel-tips",
          title: "Essential Tips for First-Time Europe Travelers",
          excerpt: "Planning your first trip to Europe? Here are essential tips to make it memorable.",
          content: `<h2>Getting Around</h2><p>Europe has excellent train connections...</p>`,
          image: "/placeholder.svg?height=400&width=800",
          author: "Anjali Singh",
          date: "2024-02-01",
          category: "Travel Tips",
        },
      ],
      branches: [
        {
          id: "1",
          name: "Head Office - Mumbai",
          address:
            "123 Adventure Avenue, Wanderlust City, Mumbai 400001, India",
          phone: "+91 98765 43210",
          email: "hello@explorers.co.in",
          hours: "Monday to Saturday: 10:30 AM to 07:00 PM",
          mapLink: "https://maps.google.com/?q=Explorers+Travels+Mumbai",
        },
        {
          id: "2",
          name: "Branch Office - Delhi",
          address: "456 Journey Road, Traveler's Hub, Delhi 110001",
          phone: "+91 11 2345 6789",
          // LocalStorage architecture for Explorers Travels clone
          // Single root key: explorers_v0
          email: "delhi@explorers.co.in",
          hours: "Monday to Saturday: 10:00 AM to 07:00 PM",
          mapLink: "https://maps.google.com/?q=Explorers+Travels+Delhi",
        },
      ],
      pages: {
        about: `<h1>About Explorers Travels</h1><p>With years of experience as a leading International Tour Operator, Explorers Travels is a name you can trust and rely on for all your holiday needs.</p><p>From thoughtful itineraries to our signature tour packages with hassle-free booking and 24/7 client support, we bring comfort and care to your travels across the globe.</p>`,
        testimonials: [
          {
            id: "1",
            name: "Amit & Priya Desai",
            location: "Ahmedabad, Gujarat",
            rating: 5,
            comment:
              "Our Europe tour was absolutely amazing! Explorers Travels took care of every detail. Highly recommended!",
            date: "2024-01-10",
          },
          {
            id: "2",
            name: "Rajesh Kumar",
            location: "Mumbai, Maharashtra",
            rating: 5,
            comment:
              "Best travel agency in India! Their Japan tour package exceeded our expectations. Professional service from start to finish.",
            date: "2024-01-25",
          },
          {
            id: "3",
            name: "Sneha & Karan",
            location: "Delhi",
            rating: 5,
            comment: "Perfect honeymoon in Maldives! Thank you Explorers Travels for making our trip so memorable.",
            date: "2024-02-05",
          },
        ],
        faq: [
          {
            id: "1",
            question: "How do I book a tour package?",
            answer:
              "You can book a tour package by filling out the booking form on our package pages or by contacting us directly via phone or email.",
            category: "Booking",
          },
          {
            id: "2",
            question: "What is included in the tour price?",
            answer:
              "Each package has specific inclusions listed. Generally, it includes flights, accommodation, transfers, and selected meals and tours.",
            category: "Pricing",
          },
          {
            id: "3",
            question: "Do you provide visa assistance?",
            answer:
              "Yes, we provide complete visa assistance for all destinations. Visa fees are additional and not included in the package price.",
            category: "Documentation",
          },
          {
            id: "4",
            question: "What is your cancellation policy?",
            answer:
              "Cancellation charges vary depending on the destination and time of cancellation. Please refer to our terms and conditions or contact us for specific details.",
            category: "Cancellation",
          },
        ],
        privacy: `<h1>Privacy Policy</h1><p>Your privacy is important to us. This policy explains how we collect, use, and protect your personal information...</p>`,
        terms: `<h1>Terms and Conditions</h1><p>These terms govern your use of our website and services. By booking with Explorers Travels, you agree to these terms...</p>`,
        csr: `<h1>Corporate Social Responsibility</h1><p>Explorers Travels is committed to sustainable and responsible tourism practices...</p>`,
        paymentProcedure: `<h1>Payment Procedure</h1><p>We accept multiple payment methods including bank transfer, credit/debit cards, and online payment gateways...</p>`,
        travelGuide: `<h1>Travel Guide</h1><p>Comprehensive travel information, tips, and guides for various destinations...</p>`,
      },
    },
    bookings: [],
    inquiries: [],
    newsletter: [],
    careerApplications: [],
  }

  write(defaultData)
}

// Initialize if no data exists
export function init(): void {
  const data = read()
  if (!data) {
    seed()
  }
}
