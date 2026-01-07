import { Link } from 'react-router-dom'
import { Package, Truck, MapPin } from 'lucide-react'

export default function TrackOrder() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-600 mb-8">
          <Link to="/account" className="hover:text-black">Account</Link>
          <span className="mx-2">/</span>
          <Link to="/notifications" className="hover:text-black">Notification</Link>
          <span className="mx-2">/</span>
          <span>Track Order</span>
        </div>

        <h1 className="text-3xl font-semibold mb-12">Track Order</h1>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                  <Package className="w-8 h-8 text-gray-600" />
                </div>
              </div>
              <div className="w-32 h-1 bg-gray-300"></div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                  <Truck className="w-8 h-8 text-gray-600" />
                </div>
              </div>
              <div className="w-32 h-1 bg-gray-300"></div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-8">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 bg-black rounded-full border-4 border-white ring-2 ring-black"></div>
                  <div className="w-0.5 h-full bg-gray-300 my-2"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">The order is being delivered to the destination address</h3>
                  <p className="text-sm text-gray-600">Current status</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                  <div className="w-0.5 h-full bg-gray-300 my-2"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-500 mb-1">The order has been handed over to the delivery service</h3>
                  <p className="text-sm text-gray-400">Completed</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-500 mb-1">The order is being processed by the seller</h3>
                  <p className="text-sm text-gray-400">Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

