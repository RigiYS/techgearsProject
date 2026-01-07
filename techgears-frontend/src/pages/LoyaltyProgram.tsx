import { Link } from 'react-router-dom'
import { Search, ChevronDown } from 'lucide-react'

export default function LoyaltyProgram() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <span>Seller Account</span>
        </div>

        <h1 className="text-3xl font-semibold mb-8">Customer Loyalty Program</h1>

        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search customers..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              Filter <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <table className="w-full">
            <thead className="bg-yellow-400">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Level</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">Gold</td>
                <td className="px-6 py-4">John Doe</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Jane Smith</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">Bronze</td>
                <td className="px-6 py-4">Mike Johnson</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

