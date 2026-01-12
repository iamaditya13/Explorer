import type { Metadata } from "next"
import DestinationsPage from "./client"

export const metadata: Metadata = {
  title: "Destinations - Headway Travels",
  description: "Explore our handpicked international and domestic travel destinations. Plan your perfect getaway.",
}

export default function Page() {
  return <DestinationsPage />
}
