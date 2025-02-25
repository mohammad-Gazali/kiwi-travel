import Link from "next/link"
import { Plane } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted text-foreground py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <Plane className="h-6 w-6" />
              <span className="text-xl font-bold">TravelEase</span>
            </Link>
            <p className="mt-2 text-sm">Discover the world with us</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Trips
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex flex-col gap-4">
              <Link href="#" className="hover:text-primary">
                Facebook
              </Link>
              <Link href="#" className="hover:text-primary">
                Twitter
              </Link>
              <Link href="#" className="hover:text-primary">
                Instagram
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-foreground/20 text-center">
          <p>&copy; {new Date().getFullYear()} TravelEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

