import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function AddProduct() {
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    variants: [
      { color: 'red', name: '', price: '' },
      { color: 'green', name: '', price: '' },
      { color: 'blue', name: '', price: '' },
    ]
  })

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/seller/products" className="hover:text-black">Seller Account</Link>
        </div>

        <h1 className="text-3xl font-semibold mb-8">Adding New Product</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Product name</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Variant</label>
              <div className="space-y-3">
                {productData.variants.map((variant, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex-shrink-0"
                      style={{ backgroundColor: variant.color }}
                    ></div>
                    <input
                      type="text"
                      placeholder="Variant name"
                      className="flex-1 px-4 py-2 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      placeholder="Price"
                      className="w-24 px-4 py-2 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex gap-4">
              <button className="px-8 py-3 border rounded hover:bg-gray-50 transition bg-secondary/10 text-secondary">
                Cancel
              </button>
              <button className="flex-1 bg-primary text-white px-8 py-3 rounded hover:bg-primary/90 transition">
                Add
              </button>
            </div>
          </div>

          <div className="bg-gray-200 rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-6">Product card preview</h3>
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="aspect-square bg-gray-300"></div>
              <div className="p-4">
                <h4 className="font-semibold mb-2">Product name</h4>
                <div className="text-sm text-gray-600 mb-2 line-clamp-2">Product description...</div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                  <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                  <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">$00.00</span>
                  <div className="flex text-yellow-400">
                    ⭐⭐⭐⭐⭐ (0)
                  </div>
                </div>
                <button className="w-full mt-3 bg-black text-white py-2 rounded">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

