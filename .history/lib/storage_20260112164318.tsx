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

export interface HotelDetails {
  name: string
  city: string
  starRating: number
  image: string
  isIncluded: boolean
}

export interface SightseeingPoint {
  title: string
  description: string
  image: string
  city: string
  type: "required" | "optional"
  price?: number
}

export interface Policy {
  cancellation: string[]
  payment: string[]
  tcs: string[]
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
  // New Fields
  tourCode?: string
  tourType?: "Group" | "Private" | "Special"
  taxes?: { gst: number; tcs: number }
  hotels?: HotelDetails[]
  sightseeing?: SightseeingPoint[]
  policies?: Policy
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
  meals?: string[] // e.g., ["Breakfast", "Lunch", "Dinner"]
  overnightCity?: string
  highlights?: string[]
}

export interface Theme {
  id: string
  slug: string
  name: string
  description: string
  image: string
  tourCount: number
  bestFor?: string[]
  includes?: string[]
}

export interface Destination {
  id: string
  name: string
  slug: string
  image: string
  priceFrom: number
  description: string
  featured: boolean
  whyVisit?: string[]
  idealFor?: string[]
  popularExperiences?: string[]
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

const STORAGE_KEY = "HEADWAY_DATA_V7"

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
          title: "Explore the World with Headway Travels",
          subtitle: "Discover amazing places at exclusive deals",
          searchPlaceholder: "Where do you want to go?",
          images: ["/placeholder.svg"],
        },
        about: {
          title: "Headway Travels – Your Trusted International Tour Operator",
          description:
            "With years of experience as a leading International Tour Operator, Headway Travels is a name you can trust and rely on for all your holiday needs. From thoughtful itineraries to our signature tour packages with hassle-free booking and 24/7 client support, we bring comfort and care to your travels across the globe.",
        },
      },
      packages: [
        {
          id: "1",
          title: "Highlights of USA",
          slug: "highlights-usa",
          description: "Discover the energy, diversity, and grandeur of the United States with a perfectly planned tour covering iconic cities, breathtaking landscapes, and unforgettable attractions.",
          price: 250000,
          duration: "5 Days / 4 Nights",
          images: ["/usa_travel.png"],
          featured: true,
          theme: "exotic-tours",
          destination: "usa",
          inclusions: ["Sightseeing", "Hotels", "Transfers", "Theme Parks"],
          exclusions: ["Visa", "Personal Expenses"],
          itinerary: [
             { day: 1, title: "Arrival in USA", description: "Arrive at the international airport. Meet our representative and transfer to your hotel. Check-in and rest after your long journey." },
             { day: 2, title: "City Sightseeing", description: "Guided city tour covering major landmarks, iconic streets, and photo stops. Enjoy free time for shopping or exploring nearby attractions." },
             { day: 3, title: "Entertainment / Theme Park Day", description: "Full day visit to a world-famous theme park or entertainment zone. Enjoy rides, shows, and attractions. Return to hotel." },
             { day: 4, title: "Nature / Scenic Experience", description: "Visit a famous natural attraction or national park. Experience scenic views and leisure time for photography." },
             { day: 5, title: "Departure", description: "Check-out and transfer to airport for your return flight." }
          ],
        },
        {
          id: "2",
          title: "Dubai Delight",
          slug: "dubai-delight",
          description: "Dubai is where modern luxury meets Arabian tradition. This tour offers the perfect introduction to the city’s iconic skyline, thrilling desert adventures, and vibrant lifestyle.",
          price: 80000,
          duration: "5 Days / 4 Nights",
          images: ["/blog-dubai.png"],
          featured: true,
          theme: "short-break",
          destination: "dubai",
          inclusions: ["Visa", "Hotels", "Desert Safari", "Burj Khalifa"],
          exclusions: ["Flights", "Personal Expenses"],
          itinerary: [
              { day: 1, title: "Arrival in Dubai", description: "Arrival and transfer to hotel. Evening at leisure or optional dhow cruise." },
              { day: 2, title: "Desert Safari", description: "Morning at leisure. Afternoon desert safari with dune bashing, cultural shows, and BBQ dinner." },
              { day: 3, title: "Dubai City Tour", description: "Visit famous landmarks, shopping areas, and photo stops including modern and traditional Dubai." },
              { day: 4, title: "Leisure / Optional Theme Park", description: "Free day for shopping or optional visit to theme parks or observation decks." },
              { day: 5, title: "Departure", description: "Check-out and transfer to airport." }
          ],
        },
        {
          id: "3",
          title: "Wonders of Japan",
          slug: "wonders-japan",
          description: "Experience the perfect harmony of ancient traditions and cutting-edge modern life in Japan.",
          price: 180000,
          duration: "5 Days / 4 Nights",
          images: ["/blog-japan.png"],
          featured: true,
          theme: "exotic-tours",
          destination: "japan",
          inclusions: ["Hotels", "Meals", "Sightseeing", "Transfers"],
          exclusions: ["Visa", "Flights"],
          itinerary: [
              { day: 1, title: "Arrival in Japan", description: "Arrival and transfer to hotel. Evening at leisure." },
              { day: 2, title: "Tokyo City Tour", description: "Visit popular districts, cultural sites, and shopping areas." },
              { day: 3, title: "Cultural & Scenic Experience", description: "Explore traditional temples, gardens, and scenic viewpoints." },
              { day: 4, title: "Leisure / Optional Excursion", description: "Free day for shopping or optional day trip to nearby scenic regions." },
              { day: 5, title: "Departure", description: "Check-out and transfer to airport." }
          ],
        },
        {
          id: "4",
          title: "Amazing Thailand",
          slug: "amazing-thailand",
          description: "Thailand is a perfect blend of vibrant nightlife, rich culture, and stunning beaches.",
          price: 35000,
          duration: "5 Days / 4 Nights",
          images: ["/southeast-asia-beaches-and-temples.jpg"],
          featured: true,
          theme: "short-break",
          destination: "thailand",
          inclusions: ["Hotels", "Breakfast", "Island Tour", "Transfers"],
          exclusions: ["Visa", "Water Sports"],
          itinerary: [
              { day: 1, title: "Arrival in Thailand", description: "Arrival and transfer to hotel. Evening at leisure." },
              { day: 2, title: "City Sightseeing", description: "Guided city tour including temples, markets, and cultural landmarks." },
              { day: 3, title: "Island / Beach Experience", description: "Enjoy island hopping or a full beach leisure day." },
              { day: 4, title: "Leisure & Shopping", description: "Free time for shopping or optional activities." },
              { day: 5, title: "Departure", description: "Transfer to airport." }
          ],
        },
        {
          id: "5",
          title: "Singapore & Malaysia",
          slug: "singapore-malaysia",
          description: "Enjoy the best of Southeast Asia with this twin-destination tour. Explore ultra-modern Singapore and culturally rich Malaysia.",
          price: 95000,
          duration: "6 Days / 5 Nights",
          images: ["/singapore-cruise-ship-universal-studios.jpg"],
          featured: true,
          theme: "group-tours",
          destination: "singapore",
          inclusions: ["Hotels", "Transfers", "Sightseeing", "Visa"],
          exclusions: ["Personal Expenses"],
          itinerary: [
              { day: 1, title: "Arrival in Singapore", description: "Arrival and hotel transfer." },
              { day: 2, title: "Singapore City Tour", description: "Visit iconic attractions and shopping districts." },
              { day: 3, title: "Theme Park / Leisure", description: "Optional theme park visit or free time." },
              { day: 4, title: "Transfer to Malaysia", description: "Travel to Malaysia and check-in." },
              { day: 5, title: "Malaysia City Tour", description: "Explore landmarks and local markets." },
              { day: 6, title: "Departure", description: "Transfer to airport." }
          ],
        },
        {
          id: "6",
          title: "European Highlights",
          slug: "european-highlights",
          description: "Explore Europe’s timeless charm through historic cities, romantic streets, and scenic countryside.",
          price: 240000,
          duration: "5 Days / 4 Nights",
          images: ["/blog-europe.png"],
          featured: true,
          theme: "group-tours",
          destination: "europe",
          inclusions: ["Hotels", "Breakfast", "Sightseeing", "Train Tickets"],
          exclusions: ["Visa", "City Tax"],
          itinerary: [
              { day: 1, title: "Arrival in Europe", description: "Arrival and hotel transfer." },
              { day: 2, title: "City Sightseeing", description: "Guided tour of major European landmarks." },
              { day: 3, title: "Scenic Excursion", description: "Visit scenic countryside or nearby towns." },
              { day: 4, title: "Leisure Day", description: "Free time for shopping or optional tours." },
              { day: 5, title: "Departure", description: "Transfer to airport." }
          ],
        },
        {
          id: "7",
          title: "Beautiful Bali",
          slug: "beautiful-bali",
          description: "Bali offers a peaceful retreat with tropical beaches, spiritual culture, and scenic beauty.",
          price: 60000,
          duration: "5 Days / 4 Nights",
          images: ["/romantic-couple-beach-sunset-honeymoon.jpg"],
          featured: true,
          theme: "honeymoon",
          destination: "bali",
          inclusions: ["Villa Stay", "Breakfast", "Temple Tour", "Transfers"],
          exclusions: ["Flights", "Spa"],
          itinerary: [
              { day: 1, title: "Arrival in Bali", description: "Arrival and transfer to hotel." },
              { day: 2, title: "Cultural Tour", description: "Visit temples and cultural landmarks." },
              { day: 3, title: "Beach & Leisure", description: "Relax at beaches or enjoy optional water activities." },
              { day: 4, title: "Leisure / Spa Day", description: "Free day for spa or shopping." },
              { day: 5, title: "Departure", description: "Transfer to airport." }
          ],
        },
        {
          id: "8",
          title: "Australia Explorer",
          slug: "australia-explorer",
          description: "Australia offers vibrant cities, unique wildlife, and breathtaking landscapes.",
          price: 195000,
          duration: "5 Days / 4 Nights",
          images: ["/australia_travel.png"],
          featured: true,
          theme: "self-drive-tours",
          destination: "australia",
          inclusions: ["Hotels", "Wildlife Pass", "Transfers"],
          exclusions: ["Visa", "Flights"],
          itinerary: [
              { day: 1, title: "Arrival in Australia", description: "Arrival and hotel transfer." },
              { day: 2, title: "City Tour", description: "Explore famous city attractions." },
              { day: 3, title: "Nature & Wildlife Experience", description: "Visit wildlife parks or scenic locations." },
              { day: 4, title: "Leisure Day", description: "Free time for optional activities." },
              { day: 5, title: "Departure", description: "Transfer to airport." }
          ],
        },
        {
          id: "9",
          title: "New Zealand Escape",
          slug: "new-zealand-escape",
          description: "New Zealand is a paradise for nature lovers, offering dramatic landscapes, peaceful surroundings, and unforgettable scenic beauty.",
          price: 260000,
          duration: "5 Days / 4 Nights",
          images: ["/new-zealand-mountains-and-lakes-milford-sound.jpg"],
          featured: true,
          theme: "exotic-tours",
          destination: "new-zealand",
          inclusions: ["Hotels", "Transfers", "Sightseeing"],
          exclusions: ["Visa", "Personal Meals"],
          itinerary: [
              { day: 1, title: "Arrival in New Zealand", description: "Arrival and hotel transfer." },
              { day: 2, title: "Scenic Sightseeing", description: "Visit lakes, mountains, and viewpoints." },
              { day: 3, title: "Adventure / Leisure", description: "Optional adventure activities or free day." },
              { day: 4, title: "Nature Exploration", description: "Explore countryside and natural attractions." },
              { day: 5, title: "Departure", description: "Transfer to airport." }
          ],
        },
        {
          id: "10",
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
          id: "7",
          slug: "exotic-tours",
          name: "Exotic Tours",
          description: "Discover the world's most unique destinations",
          image: "/exotic_tours.png",
          tourCount: 15,
        },
        {
          id: "8",
          slug: "self-drive-tours",
          name: "Self-Drive Tours",
          description: "Explore at your own pace",
          image: "/self_drive_tours.png",
          tourCount: 5,
        },
      ],
      destinations: [
        {
          id: "1",
          slug: "usa",
          name: "USA",
          description: "The United States offers a perfect blend of iconic cities, natural wonders, and world-class entertainment. From vibrant metropolises to breathtaking national parks, the USA promises unforgettable experiences for every kind of traveler.",
          image: "/usa_travel.png",
          priceFrom: 150000,
          featured: true,
          whyVisit: ["Iconic cities like New York, Los Angeles & Las Vegas", "National parks such as Grand Canyon & Yellowstone", "World-famous theme parks & entertainment", "Diverse culture, shopping & cuisine"],
          idealFor: ["Families", "Couples", "Adventure seekers", "Theme park lovers"],
          popularExperiences: ["City sightseeing & shopping", "Theme parks & shows", "Scenic road trips", "Nature & wildlife tours"]
        },
        {
          id: "2",
          slug: "dubai",
          name: "UAE - Dubai",
          description: "Dubai is a dazzling destination where luxury meets adventure. Known for its futuristic skyline, desert safaris, and premium shopping, Dubai offers a perfect short international getaway.",
          image: "/blog-dubai.png",
          priceFrom: 45000,
          featured: true,
          whyVisit: ["Desert safaris & dune bashing", "Luxury shopping & nightlife", "Iconic attractions like Burj Khalifa", "Family-friendly experiences"],
          idealFor: ["Families", "Honeymooners", "Luxury travelers"],
          popularExperiences: ["Desert safari with BBQ dinner", "City tours & dhow cruises", "Theme parks & water parks", "Shopping festivals"]
        },
        {
          id: "3",
          slug: "japan",
          name: "Japan",
          description: "Japan is a fascinating blend of ancient traditions and modern innovation. From cherry blossoms and temples to advanced technology and vibrant cities, Japan delivers a truly unique travel experience.",
          image: "/blog-japan.png",
          priceFrom: 180000,
          featured: true,
          whyVisit: ["Rich culture & heritage", "Cherry blossom seasons", "Clean, safe & efficient travel", "Modern cities with deep traditions"],
          idealFor: ["Couples", "Culture lovers", "Food enthusiasts"],
          popularExperiences: ["Temple & shrine visits", "City tours of Tokyo & Osaka", "Cultural shows & shopping", "Scenic countryside exploration"]
        },
        {
          id: "4",
          slug: "thailand",
          name: "Thailand",
          description: "Thailand is known for its tropical beaches, vibrant nightlife, rich culture, and delicious cuisine. It is one of the most popular and affordable international destinations.",
          image: "/southeast-asia-beaches-and-temples.jpg",
          priceFrom: 30000,
          featured: true,
          whyVisit: ["Beautiful islands & beaches", "Night markets & nightlife", "Rich Buddhist culture", "Budget-friendly luxury"],
          idealFor: ["Friends", "Couples", "First-time international travelers"],
          popularExperiences: ["Island hopping", "Beach relaxation", "City nightlife", "Cultural sightseeing"]
        },
        {
          id: "5",
          slug: "singapore",
          name: "Singapore & Malaysia",
          description: "This dual-destination journey offers the perfect mix of modern cities, cultural heritage, and family-friendly attractions. Experience two countries in one seamless trip.",
          image: "/singapore-cruise-ship-universal-studios.jpg",
          priceFrom: 65000,
          featured: true,
          whyVisit: ["Clean, modern cities", "Theme parks & attractions", "Shopping & food paradise", "Cultural diversity"],
          idealFor: ["Families", "Couples", "Short international trips"],
          popularExperiences: ["Universal Studios", "City sightseeing", "Shopping streets", "Cultural tours"]
        },
        {
          id: "6",
          slug: "europe",
          name: "Europe",
          description: "Europe is a dream destination offering historic cities, romantic landscapes, scenic countryside, and world-renowned art and architecture.",
          image: "/blog-europe.png",
          priceFrom: 250000,
          featured: true,
          whyVisit: ["Multiple countries in one trip", "Iconic landmarks & history", "Romantic experiences", "Scenic rail & road journeys"],
          idealFor: ["Couples", "Honeymooners", "Explorers"],
          popularExperiences: ["City walking tours", "Scenic countryside trips", "Museums & landmarks", "Cultural experiences"]
        },
        {
          id: "7",
          slug: "bali",
          name: "Bali",
          description: "Bali is a tropical paradise known for its beaches, temples, lush landscapes, and relaxed vibe. It is ideal for both romantic escapes and peaceful holidays.",
          image: "/romantic-couple-beach-sunset-honeymoon.jpg",
          priceFrom: 40000,
          featured: true,
          whyVisit: ["Tropical beaches & sunsets", "Spiritual & cultural experiences", "Affordable luxury resorts", "Wellness & relaxation"],
          idealFor: ["Honeymooners", "Couples", "Wellness travelers"],
          popularExperiences: ["Beach resorts", "Temple tours", "Spa & wellness retreats", "Nature sightseeing"]
        },
        {
          id: "8",
          slug: "australia",
          name: "Australia",
          description: "Australia offers stunning coastlines, modern cities, wildlife, and adventure. From vibrant cities to natural wonders, it’s a perfect long-haul destination.",
          image: "/australia_travel.png",
          priceFrom: 180000,
          featured: true,
          whyVisit: ["Unique wildlife", "World-famous cities", "Natural wonders", "Adventure activities"],
          idealFor: ["Families", "Adventure lovers", "Long vacations"],
          popularExperiences: ["City tours", "Wildlife parks", "Coastal drives", "Adventure sports"]
        },
        {
          id: "9",
          slug: "new-zealand",
          name: "New Zealand",
          description: "New Zealand is known for its dramatic landscapes, peaceful environment, and outdoor adventures. A paradise for nature lovers and photographers.",
          image: "/new-zealand-mountains-and-lakes-milford-sound.jpg",
          priceFrom: 280000,
          featured: true,
          whyVisit: ["Breathtaking scenery", "Clean & peaceful environment", "Adventure sports", "Scenic road trips"],
          idealFor: ["Nature lovers", "Couples", "Photographers"],
          popularExperiences: ["Scenic lake visits", "Mountain landscapes", "Adventure activities", "Road trips"]
        },
        {
            id: "10",
            slug: "south-africa",
            name: "South Africa",
            description: "Wildlife safaris and stunning landscapes",
            image: "/placeholder.jpg", // Kept as placeholder since not in update list but keeping for structure
            priceFrom: 125000,
            featured: true,
        },
        {
             id: "11",
             slug: "vietnam",
             name: "Vietnam",
             description: "Rich history and beautiful landscapes",
             image: "/placeholder.jpg",
             priceFrom: 89000,
             featured: true,
        }
      ],
      blogs: [
        {
          id: "1",
          slug: "best-time-visit-japan",
          title: "Best Time to Visit Japan: A Complete Guide",
          excerpt: "Discover when to visit Japan for cherry blossoms, autumn colors, or winter snow.",
          content: `<h2>Introduction</h2><p>Japan is a year-round destination, but the best time to visit depends on what you want to experience...</p>`,
          image: "/placeholder.svg",
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
          image: "/placeholder.svg",
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
          image: "/placeholder.svg",
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
