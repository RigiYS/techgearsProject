import { Link } from 'react-router-dom'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

export default function Cart() {
  const { items, updateQuantity, getTotalPrice } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Cart</h1>
          <p className="text-gray-600 mb-8">Your cart is empty</p>
          <Link
            to="/products"
            className="inline-block bg-secondary text-white px-8 py-3 rounded hover:bg-secondary/90 transition"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-4 sm:py-8">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-600 mb-6 sm:mb-8">
          <Link to="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <span>Cart</span>
        </div>

        <div className="mb-8">
          <div className="bg-white shadow-md rounded overflow-hidden">
            <div className="hidden md:grid grid-cols-4 gap-4 p-6 bg-white border-b font-semibold">
              <div>Product</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Subtotal</div>
            </div>

            {items.map((item) => (
              <div key={item.product.id} className="border-b">
                <div className="hidden md:grid grid-cols-4 gap-4 p-6 items-center">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img src={item.product.image} alt={item.product.name} className="w-16 h-16 bg-gray-100 rounded object-cover" />
                    </div>
                    <span className="text-sm lg:text-base">{item.product.name}</span>
                  </div>
                  <div className="text-center">${item.product.price}</div>
                  <div className="flex items-center justify-center">
                    <div className="flex items-center border rounded">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                        className="w-16 px-2 py-1 text-center border-x focus:outline-none"
                      />
                      <div className="flex flex-col">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 hover:bg-gray-100"
                        >
                          <ChevronUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                          className="px-2 hover:bg-gray-100"
                        >
                          <ChevronDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right font-semibold">${item.product.price * item.quantity}</div>
                </div>

                <div className="md:hidden p-4 flex gap-4">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-20 bg-gray-100 rounded object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-medium mb-2">{item.product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">${item.product.price}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                          className="px-2 py-1 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border-x text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-semibold">${item.product.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
            <Link
              to="/products"
              className="border border-black px-8 sm:px-12 py-3 sm:py-4 rounded hover:bg-gray-100 transition text-center"
            >
              Return To Shop
            </Link>
            <button className="border border-black px-8 sm:px-12 py-3 sm:py-4 rounded hover:bg-gray-100 transition">
              Update Cart
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="text"
              placeholder="Coupon Code"
              className="flex-1 px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <button className="bg-secondary text-white px-8 sm:px-12 py-3 rounded hover:bg-secondary/90 transition whitespace-nowrap">
              Apply Coupon
            </button>
          </div>

          <div className="border-2 border-black rounded p-6">
            <h3 className="font-semibold text-lg mb-6">Cart Total</h3>
            <div className="space-y-4">
              <div className="flex justify-between pb-4 border-b">
                <span>Subtotal:</span>
                <span>${getTotalPrice()}</span>
              </div>
              <div className="flex justify-between pb-4 border-b">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>${getTotalPrice()}</span>
              </div>
              <Link
                to="/checkout"
                className="block w-full bg-secondary text-white py-4 rounded text-center hover:bg-secondary/90 transition mt-4"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

