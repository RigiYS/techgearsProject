import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('bank')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    setTimeout(() => {
      clearCart()
      setLoading(false)
      navigate('/account')
    }, 1500)
  }

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="py-4 sm:py-8">
      <div className="container mx-auto px-4">
        <div className="text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/account" className="hover:text-black">Account</Link>
          <span className="mx-2">/</span>
          <Link to="/account" className="hover:text-black">My Account</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-black">Product</Link>
          <span className="mx-2">/</span>
          <Link to="/cart" className="hover:text-black">View Cart</Link>
          <span className="mx-2">/</span>
          <span>CheckOut</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-8 sm:mb-12">Billing Details</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-600 mb-2">First Name*</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-2">Company Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-2">Street Address*</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-2">Apartment, floor, etc. (optional)</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-2">Town/City*</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-2">Phone Number*</label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-2">Email Address*</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 text-secondary" />
                <span className="text-sm">Save this information for faster check-out next time</span>
              </label>
            </form>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded object-cover flex-shrink-0" />
                    <span className="font-medium text-sm sm:text-base truncate">{item.product.name}</span>
                  </div>
                  <span className="text-sm sm:text-base flex-shrink-0">${item.product.price}</span>
                </div>
              ))}
            </div>

            <div className="border-b pb-4 mb-4 space-y-3">
              <div className="flex justify-between text-sm sm:text-base">
                <span>Subtotal:</span>
                <span>${getTotalPrice()}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>${getTotalPrice()}</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <label className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border rounded cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="text-sm sm:text-base">Bank</span>
                </div>
                <div className="flex gap-2 pl-7 sm:pl-0">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-5 sm:h-6" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 sm:h-6" />
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border rounded cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="text-sm sm:text-base">Cash on delivery</span>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
              <input
                type="text"
                placeholder="Coupon Code"
                className="flex-1 px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-secondary text-sm sm:text-base"
              />
              <button className="bg-secondary text-white px-6 sm:px-8 py-3 rounded hover:bg-secondary/90 transition whitespace-nowrap text-sm sm:text-base">
                Apply Coupon
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-secondary text-white px-8 sm:px-12 py-3 sm:py-4 rounded hover:bg-secondary/90 transition disabled:opacity-50 text-sm sm:text-base font-medium"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

