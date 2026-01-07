import { Link } from 'react-router-dom'
import { Search, Edit, Trash2 } from 'lucide-react'

export default function ProductManagement() {
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
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-semibold">Product Management</h1>
              <Link
                to="/seller/products/add"
                className="bg-primary text-white px-6 py-3 rounded hover:bg-primary/90 transition"
              >
                Add Product
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Product Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-6 py-4">Sample Product</td>
                    <td className="px-6 py-4 text-gray-600">Product description here</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button className="hover:text-primary">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button className="hover:text-secondary">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
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

