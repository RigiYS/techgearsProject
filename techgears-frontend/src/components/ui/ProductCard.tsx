import { Link } from 'react-router-dom'
import { Heart, Eye, Star, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import QuickViewModal from './QuickViewModal'
import type { Product } from '@/types'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
  badge?: string
  badgeColor?: 'danger' | 'success'
  loading?: boolean
}

export default function ProductCard({ product, badge, badgeColor = 'danger', loading = false }: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const addItem = useCartStore((state) => state.addItem)
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const isWishlisted = isInWishlist(product.id)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsAddingToCart(true)

    try {
      addItem(product, 1)

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
    } catch (error) {
      toast.error('Failed to add to cart')
    } finally {
      setTimeout(() => setIsAddingToCart(false), 500)
    }
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsQuickViewOpen(true)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isWishlisted) {
      removeFromWishlist(product.id)
      toast.success(
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4" />
          <span>Removed from wishlist</span>
        </div>,
        {
          duration: 2000,
          position: 'top-center',
        }
      )
    } else {
      addToWishlist(product)
      toast.success(
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 fill-current" />
          <span>Added to wishlist</span>
        </div>,
        {
          duration: 2000,
          position: 'top-center',
        }
      )
    }
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  if (loading) {
    return (
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="aspect-square bg-muted-200 animate-skeleton" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-muted-200 rounded animate-skeleton w-3/4" />
          <div className="h-4 bg-muted-200 rounded animate-skeleton w-1/2" />
          <div className="h-4 bg-muted-200 rounded animate-skeleton w-2/3" />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="group relative bg-white rounded-lg overflow-hidden border-2 border-blue-500/30 hover:border-blue-500 transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:scale-105">
        <div className="relative bg-muted-50 rounded-lg overflow-hidden aspect-square mb-3">
          {badge && (
            <span className={`absolute top-3 left-3 z-10 ${badgeColor === 'danger' ? 'bg-danger' : 'bg-success'} text-white text-xs font-semibold px-3 py-1 rounded`}>
              {badge || `-${discount}%`}
            </span>
          )}

          {product.stock === 0 && (
            <div className="absolute inset-0 bg-dark-900/60 z-10 flex items-center justify-center">
              <span className="bg-white text-dark-900 px-4 py-2 rounded-lg font-semibold">
                Out of Stock
              </span>
            </div>
          )}

          <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300">
            <button
              onClick={handleWishlist}
              className={`w-10 h-10 bg-white rounded-full flex items-center justify-center transition shadow-lg ${isWishlisted
                  ? 'bg-danger text-white hover:bg-danger-600'
                  : 'hover:bg-accent hover:text-white'
                }`}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleQuickView}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition shadow-lg"
              aria-label="Quick view"
              title="Quick view"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>

          <Link to={`/products/${product.slug}`} className="block">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
          </Link>

          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || product.stock === 0}
            className="absolute bottom-0 left-0 right-0 bg-dark text-white py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 font-semibold z-10 hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Add to cart"
          >
            {isAddingToCart ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Adding...</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add To Cart</span>
              </>
            )}
          </button>
        </div>

        <div className="px-2">
          <Link to={`/products/${product.slug}`}>
            <h3 className="font-medium text-dark-900 mb-2 hover:text-accent transition line-clamp-2 min-h-[3rem]">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-accent font-bold text-lg">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-muted-400 line-through text-sm">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {product.rating && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating!)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-muted-200 text-muted-200'
                      }`}
                  />
                ))}
              </div>
              {product.reviews && (
                <span className="text-sm text-muted-600">({product.reviews})</span>
              )}
            </div>
          )}
        </div>
      </div>

      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  )
}

