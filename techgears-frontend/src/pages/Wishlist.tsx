import { Trash2, ShoppingBag } from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'
import { Link, useNavigate } from 'react-router-dom'
import { Product } from '@/types'
import { useEffect, useState } from 'react'
import { ProductAPI } from '@/services/api.service'
import toast from 'react-hot-toast'

export default function Wishlist() {
  const navigate = useNavigate()
  const { items: wishlistItems, removeItem, clearWishlist } = useWishlistStore()
  const { addItem: addToCart } = useCartStore()
  const [justForYouProducts, setJustForYouProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Fetch recommendations
    const fetchRecommendations = async () => {
      try {
        setIsLoading(true)
        const response = await ProductAPI.getAll({ limit: 4 })
        // Laravel wraps in { success, data: { products: [...] } }
        const data: any = response.data?.data || response.data
        setJustForYouProducts(data?.products || [])
      } catch (error) {
        console.error('Failed to fetch recommendations:', error)
        // Set empty array on error to prevent blocking the page
        setJustForYouProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecommendations()
  }, [])

  const handleRemoveItem = (productId: string) => {
    removeItem(productId)
    toast.success('Item removed from wishlist', {
      duration: 2000,
      position: 'top-center',
    })
  }

  const handleMoveAllToBag = () => {
    if (wishlistItems.length === 0) {
      toast.error('Your wishlist is empty', {
        duration: 2000,
        position: 'top-center',
      })
      return
    }

    wishlistItems.forEach((product) => {
      addToCart(product, 1)
    })

    clearWishlist()

    toast.success(
      <div className="flex items-center gap-2">
        <ShoppingBag className="w-4 h-4" />
        <span>All items moved to cart!</span>
      </div>,
      {
        duration: 2000,
        position: 'top-center',
      }
    )

    navigate('/cart')
  }

  const discount = (product: Product) => {
    return product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-600 mb-8">
        <Link to="/" className="hover:text-dark transition">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-dark">Wishlist</span>
      </div>

      {/* Wishlist Section */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold">Wishlist ({wishlistItems.length})</h2>
          {wishlistItems.length > 0 && (
            <button
              onClick={handleMoveAllToBag}
              className="border-2 border-dark text-dark px-8 py-3 rounded hover:bg-dark hover:text-white transition-all duration-200 font-medium"
            >
              Move All To Bag
            </button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16 bg-muted-50 rounded-lg">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-muted-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-12 h-12 text-muted-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
              <p className="text-muted-600 mb-6">
                Save your favorite items here to easily find them later!
              </p>
              <Link
                to="/products"
                className="inline-block bg-accent text-white px-8 py-3 rounded hover:bg-accent-600 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard
                  product={product}
                  badge={product.originalPrice ? `-${discount(product)}%` : undefined}
                  badgeColor="danger"
                />
                <button
                  onClick={() => handleRemoveItem(product.id)}
                  className="absolute top-3 right-3 z-20 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-danger hover:text-white transition-all duration-200 shadow-lg"
                  aria-label="Remove from wishlist"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Just For You Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-5 h-10 bg-accent rounded"></div>
            <h2 className="text-xl font-semibold">Just For You</h2>
          </div>
          <Link
            to="/products"
            className="border-2 border-dark text-dark px-8 py-3 rounded hover:bg-dark hover:text-white transition-all duration-200 font-medium w-fit"
          >
            See All
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <ProductCard key={i} product={{} as Product} loading />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {justForYouProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                badge={product.originalPrice ? `-${discount(product)}%` : 'NEW'}
                badgeColor={product.originalPrice ? 'danger' : 'success'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

