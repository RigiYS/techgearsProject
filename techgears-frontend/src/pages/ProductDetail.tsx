import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Minus, Plus, Star, TruckIcon, RefreshCw } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import ProductCard from '@/components/ui/ProductCard'
import { Product } from '@/types'

const relatedProducts: Product[] = [
  { id: '1', name: 'Wireless Gaming Headset 7.1', price: 149, originalPrice: 199, image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=300&h=300&fit=crop', category: 'Gaming', stock: 10, rating: 5, reviews: 88, slug: 'wireless-gaming-headset' },
  { id: '2', name: 'Mechanical Gaming Keyboard', price: 89, originalPrice: 129, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop', category: 'Accessories', stock: 15, rating: 4.5, reviews: 156, slug: 'mechanical-gaming-keyboard' },
  { id: '3', name: 'Wireless Gaming Mouse RGB', price: 59, originalPrice: 79, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop', category: 'Accessories', stock: 20, rating: 5, reviews: 243, slug: 'wireless-gaming-mouse' },
  { id: '4', name: 'USB-C Hub 7-in-1', price: 39, originalPrice: 59, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=300&h=300&fit=crop', category: 'Accessories', stock: 35, rating: 4.5, reviews: 178, slug: 'usb-c-hub-7in1' },
]

export default function ProductDetail() {
  const { slug } = useParams()
  const [quantity, setQuantity] = useState(2)
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('red')

  const sizes = ['XS', 'S', 'M', 'L', 'XL']
  const colors = [
    { name: 'white', value: '#FFFFFF' },
    { name: 'red', value: '#DB4444' }
  ]

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-600 mb-8">
          <Link to="/account" className="hover:text-black">Account</Link>
          <span className="mx-2">/</span>
          <Link to="/products/gaming" className="hover:text-black">Gaming</Link>
          <span className="mx-2">/</span>
          <span>Havic HV G-92 Gamepad</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-4">
            <div className="bg-gray-100 rounded p-8 aspect-square flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop" alt="Product" className="w-full h-full object-contain" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[
                'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=100&h=100&fit=crop',
                'https://images.unsplash.com/photo-1585490350230-08ce573a08a8?w=100&h=100&fit=crop',
                'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=100&h=100&fit=crop',
                'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=100&h=100&fit=crop'
              ].map((img, i) => (
                <div key={i} className="bg-gray-100 rounded aspect-square p-4 cursor-pointer hover:border-2 hover:border-secondary">
                  <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-semibold mb-3">Dualsense controller PS5</h1>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-current' : ''}`} />
                ))}
              </div>
              <span className="text-sm text-gray-600">(150 Reviews)</span>
              <span className="text-green-600 text-sm">In Stock</span>
            </div>

            <p className="text-3xl font-medium mb-6">$192.00</p>

            <p className="text-sm pb-6 border-b">
              PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.
            </p>

            <div className="py-6 space-y-6">
              <div>
                <span className="text-lg mb-3 block">Colours:</span>
                <div className="flex gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-6 h-6 rounded-full border-2 ${selectedColor === color.name ? 'ring-2 ring-offset-2 ring-black' : 'border-gray-300'}`}
                      style={{ backgroundColor: color.value }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className="text-lg mb-3 block">Size:</span>
                <div className="flex gap-4">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-2 border rounded ${selectedSize === size ? 'bg-secondary text-white border-secondary' : 'hover:border-secondary'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center border rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-gray-100"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-8 py-3 border-x font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 bg-secondary text-white hover:bg-secondary/90"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <button className="flex-1 bg-secondary text-white py-3 px-12 rounded hover:bg-secondary/90 transition">
                  Buy Now
                </button>
                <button className="border rounded p-3 hover:bg-gray-50">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="border rounded">
              <div className="flex gap-4 p-6 border-b">
                <TruckIcon className="w-10 h-10" />
                <div>
                  <h4 className="font-medium mb-1">Free Delivery</h4>
                  <p className="text-sm underline">Enter your postal code for Delivery Availability</p>
                </div>
              </div>
              <div className="flex gap-4 p-6">
                <RefreshCw className="w-10 h-10" />
                <div>
                  <h4 className="font-medium mb-1">Return Delivery</h4>
                  <p className="text-sm">Free 30 Days Delivery Returns. Details</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section>
          <SectionHeader tag="Related Item" title="" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} badge="-30%" />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

