import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Linkedin, Send } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-auto">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">TechGears</h3>
            <h4 className="font-medium mb-4">Subscribe</h4>
            <p className="text-sm mb-4">Get 10% off your first electronics order</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent border border-white rounded px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-white"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>Sukabumi, West Java 43111,<br />Indonesia</li>
              <li>
                <a href="mailto:support@techgears.com" className="hover:underline">
                  support@techgears.com
                </a>
              </li>
              <li>
                <a href="tel:+62-812-3456-7890" className="hover:underline">
                  +62-812-3456-7890
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Account</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/account" className="hover:underline">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:underline">
                  Login / Register
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:underline">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:underline">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:underline">
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Quick Link</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:underline">
                  Terms Of Use
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Download App</h4>
            <p className="text-xs text-gray-400 mb-3">Save $3 with App New User Only</p>
            <div className="flex gap-2 mb-4">
              <div className="w-20 h-20 bg-white rounded flex items-center justify-center">
                <div className="w-16 h-16 bg-black"></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="bg-white rounded px-3 py-1 flex items-center gap-1">
                  <img src="/google-play.svg" alt="Get it on Google Play" className="h-6" />
                </div>
                <div className="bg-white rounded px-3 py-1 flex items-center gap-1">
                  <img src="/app-store.svg" alt="Download on App Store" className="h-6" />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-4 text-center text-sm text-gray-400">
          <p>&copy; Copyright TechGears 2026. All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}

