import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'

const products = [
  {
    id: '1',
    name: 'Rexus ASTA GX150 Wireless Gamepad',
    price: 14.39,
    rating: 5,
    reviews: 159,
    image: 'https://via.placeholder.com/300',
    inStock: true,
    colors: ['black', 'red'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Wireless gamepad from Rexus. Key features: wireless connectivity, anti-drift buttons, responsive triggering, compatible with PCs, Android devices, and possibly other devices.'
  },
  {
    id: '2',
    name: 'Sony DualShock 4 Wireless Controller',
    price: 7.23,
    rating: 4,
    reviews: 150,
    image: 'https://via.placeholder.com/300',
    inStock: true,
    colors: ['white', 'red'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Official controller for PlayStation 4 (and often compatible with PCs). Ergonomic design, solid build quality, buttons & touchpad features, vibration feedback.'
  },
]

export default function ProductComparison() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-600 mb-8">
          <Link to="/account" className="hover:text-black">Account</Link>
          <span className="mx-2">/</span>
          <Link to="/products/gaming" className="hover:text-black">Gaming</Link>
          <span className="mx-2">/</span>
          <Link to="/products/havic-hv-g-92-gamepad" className="hover:text-black">Havic HV G-92 Gamepad</Link>
          <span className="mx-2">/</span>
          <span>Product Comparison</span>
        </div>

        <h1 className="text-3xl font-semibold mb-12">Product Comparison</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-square bg-gray-100 flex items-center justify-center p-8">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews} Reviews)</span>
                  {product.inStock && (
                    <span className="text-sm text-green-600">In Stock</span>
                  )}
                </div>

                <p className="text-2xl font-bold mb-4">${product.price}</p>

                <p className="text-sm text-gray-700 mb-6">{product.description}</p>

                <div className="border-t pt-4">
                  <div className="mb-4">
                    <span className="text-sm font-medium">Colours:</span>
                    <div className="flex gap-2 mt-2">
                      {product.colors.map((color) => (
                        <div
                          key={color}
                          className={`w-6 h-6 rounded-full border-2 border-gray-300`}
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-sm font-medium">Size:</span>
                    <div className="flex gap-2 mt-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          className="px-3 py-1 border rounded hover:bg-secondary hover:text-white hover:border-secondary transition"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border rounded">
                      <button className="px-3 py-2 hover:bg-gray-100">-</button>
                      <span className="px-4 py-2">1</span>
                      <button className="px-3 py-2 bg-secondary text-white hover:bg-secondary/90">+</button>
                    </div>
                    <button className="flex-1 bg-secondary text-white py-3 rounded hover:bg-secondary/90 transition">
                      Buy Now
                    </button>
                    <button className="p-3 border rounded hover:bg-gray-100">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

