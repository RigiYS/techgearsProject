import { Link } from 'react-router-dom'
import { Search, ChevronDown } from 'lucide-react'

export default function OrderManagement() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <span>Seller Account</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow">
              <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>
              <h3 className="font-semibold">Dashboard</h3>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h1 className="text-3xl font-semibold mb-6">Order Management</h1>

            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b flex items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                  Filter <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-6 py-4">#12345</td>
                    <td className="px-6 py-4">John Doe</td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                        Processing
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold">$250.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

