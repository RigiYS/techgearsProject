import { useState } from 'react'
import { X, Plus, Minus, ShoppingCart, Heart } from 'lucide-react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types'
import toast from 'react-hot-toast'

interface QuickViewModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('black')
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  
  const addItem = useCartStore((state) => state.addItem)

  const sizes = ['XS', 'S', 'M', 'L', 'XL']
  const colors = [
    { name: 'black', value: '#0A0A0A' },
    { name: 'white', value: '#FFFFFF' },
    { name: 'blue', value: '#0B3D91' }
  ]

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    
    try {
      addItem(product, quantity)
      
      toast.success(
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          <span>Added to cart!</span>
        </div>,
        {
          duration: 2000,
          position: 'top-center',
        }
      )
      
      setTimeout(() => {
        onClose()
        setQuantity(1)
      }, 500)
    } catch (error) {
      toast.error('Failed to add to cart')
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose} 
      className="relative z-50"
    >
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <DialogPanel className="mx-auto max-w-4xl w-full bg-white rounded-xl shadow-2xl animate-scale-in">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-muted-100 transition shadow-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
              <div className="relative bg-muted-50 rounded-lg overflow-hidden aspect-square">
                {discount > 0 && (
                  <span className="absolute top-3 left-3 z-10 bg-danger text-white text-xs font-semibold px-3 py-1 rounded">
                    -{discount}%
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              <div className="flex flex-col">
                <DialogTitle className="text-2xl font-heading font-bold text-dark-900 mb-3">
                  {product.name}
                </DialogTitle>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'fill-muted-200 text-muted-200'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  {product.reviews && (
                    <span className="text-sm text-muted-600">({product.reviews} reviews)</span>
                  )}
                  <span className={`text-sm font-medium ${product.stock > 0 ? 'text-success' : 'text-danger'}`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl font-bold text-accent">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-700 mb-6 line-clamp-3">
                  {product.description}
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm font-medium text-dark-900 mb-2 block">
                      Color:
                    </label>
                    <div className="flex gap-2">
                      {colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`w-8 h-8 rounded-full border-2 transition ${
                            selectedColor === color.name
                              ? 'ring-2 ring-accent ring-offset-2'
                              : 'border-muted-300 hover:border-accent'
                          }`}
                          style={{ backgroundColor: color.value }}
                          aria-label={`Select ${color.name} color`}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-dark-900 mb-2 block">
                      Size:
                    </label>
                    <div className="flex gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border-2 rounded-lg font-medium transition ${
                            selectedSize === size
                              ? 'border-accent bg-accent text-white'
                              : 'border-muted-300 text-dark-900 hover:border-accent'
                          }`}
                          aria-label={`Select size ${size}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-dark-900 mb-2 block">
                      Quantity:
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border-2 border-muted-300 rounded-lg overflow-hidden">
                        <button
                          onClick={handleDecrement}
                          disabled={quantity <= 1}
                          className="p-3 hover:bg-muted-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-6 py-3 font-semibold border-x-2 border-muted-300 min-w-[60px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={handleIncrement}
                          disabled={quantity >= product.stock}
                          className="p-3 hover:bg-muted-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-sm text-muted-600">
                        {product.stock} available
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart || product.stock === 0}
                    className="flex-1 bg-accent text-white py-3 px-6 rounded-lg font-semibold hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                  >
                    {isAddingToCart ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                  <button
                    className="p-3 border-2 border-accent text-accent rounded-lg hover:bg-accent-50 transition"
                    aria-label="Add to wishlist"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}



