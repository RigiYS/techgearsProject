import { Link } from 'react-router-dom'
import { Phone, Mail } from 'lucide-react'

export default function Contact() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <span>Contact</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-8">
            <div className="bg-white shadow-md rounded-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Call To Us</h3>
              </div>
              <p className="text-sm mb-4">We are available 24/7, 7 days a week.</p>
              <p className="text-sm font-medium">Phone: +8801611112222</p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Write To US</h3>
              </div>
              <p className="text-sm mb-4">
                Fill out our form and we will contact you within 24 hours.
              </p>
              <p className="text-sm">Emails: customer@exclusive.com</p>
              <p className="text-sm">Emails: support@exclusive.com</p>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  className="px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  className="px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <input
                  type="tel"
                  placeholder="Your Phone *"
                  className="px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <textarea
                placeholder="Your Massage"
                rows={8}
                className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
              ></textarea>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-secondary text-white px-12 py-4 rounded hover:bg-secondary/90 transition"
                >
                  Send Massage
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

