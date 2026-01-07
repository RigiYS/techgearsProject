import { useMemo, useState } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import ProductCard from '@/components/ui/ProductCard'
import { Product } from '@/types'
import { SlidersHorizontal, X, Grid3x3, LayoutGrid, Search } from 'lucide-react'

const allProducts: Product[] = [
  { id: '1', name: 'Gaming Mechanical Keyboard RGB', price: 89, originalPrice: 129, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop', category: 'Accessories', stock: 10, rating: 5, reviews: 88, slug: 'gaming-mechanical-keyboard' },
  { id: '2', name: 'Wireless Gaming Mouse Pro', price: 45, originalPrice: 65, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop', category: 'Accessories', stock: 25, rating: 4.5, reviews: 156, slug: 'wireless-gaming-mouse' },
  { id: '3', name: '27" 4K Gaming Monitor 144Hz', price: 399, originalPrice: 549, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=300&fit=crop', category: 'Monitors', stock: 15, rating: 5, reviews: 243, slug: '4k-gaming-monitor' },
  { id: '4', name: 'Wireless Noise Cancelling Headphones', price: 199, originalPrice: 279, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', category: 'Audio', stock: 30, rating: 4.5, reviews: 189, slug: 'wireless-headphones' },
  { id: '5', name: 'MacBook Pro 16" M3 Pro', price: 2499, originalPrice: 2799, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop', category: 'Laptops', stock: 8, rating: 5, reviews: 312, slug: 'macbook-pro-16-m3' },
  { id: '6', name: 'iPhone 15 Pro Max 256GB', price: 1199, originalPrice: 1299, image: 'https://images.unsplash.com/photo-1592286927505-4fd30698e553?w=300&h=300&fit=crop', category: 'Smartphones', stock: 12, rating: 5, reviews: 456, slug: 'iphone-15-pro-max' },
  { id: '7', name: 'Samsung Galaxy Tab S9 Ultra', price: 899, originalPrice: 1099, image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=300&h=300&fit=crop', category: 'Tablets', stock: 18, rating: 4.5, reviews: 178, slug: 'galaxy-tab-s9-ultra' },
  { id: '8', name: 'Sony WH-1000XM5 Headphones', price: 349, originalPrice: 399, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&h=300&fit=crop', category: 'Audio', stock: 25, rating: 5, reviews: 892, slug: 'sony-wh1000xm5' },
  { id: '9', name: 'Dell XPS 15 Laptop Intel i9', price: 1899, originalPrice: 2199, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=300&fit=crop', category: 'Laptops', stock: 6, rating: 4.5, reviews: 234, slug: 'dell-xps-15-i9' },
  { id: '10', name: 'iPad Pro 12.9" M2 Chip', price: 1099, originalPrice: 1299, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop', category: 'Tablets', stock: 14, rating: 5, reviews: 567, slug: 'ipad-pro-m2' },
  { id: '11', name: 'Samsung 49" Odyssey G9 Gaming Monitor', price: 1299, originalPrice: 1599, image: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa8c?w=300&h=300&fit=crop', category: 'Monitors', stock: 5, rating: 5, reviews: 198, slug: 'samsung-odyssey-g9' },
  { id: '12', name: 'Logitech MX Master 3S Mouse', price: 99, originalPrice: 129, image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&h=300&fit=crop', category: 'Accessories', stock: 40, rating: 4.5, reviews: 423, slug: 'logitech-mx-master-3s' },
]

const categories = ['All', 'Accessories', 'Monitors', 'Audio', 'Laptops', 'Smartphones', 'Tablets']

export default function Products() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  const categoryFilter = searchParams.get('category') || ''
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [gridCols, setGridCols] = useState<3 | 4>(4)

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      )
    }

    // Apply category filter
    if (categoryFilter && categoryFilter !== 'All') {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === categoryFilter.toLowerCase()
      )
    }

    // Apply sorting
    let sorted = [...filtered]
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'newest':
        // Keep original order for newest
        break
      default:
        // Featured - keep original order
        break
    }

    return sorted
  }, [searchQuery, categoryFilter, sortBy])

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams)
    if (category === 'All') {
      params.delete('category')
    } else {
      params.set('category', category)
    }
    setSearchParams(params)
  }

  const clearFilters = () => {
    navigate('/products')
    setSortBy('featured')
  }

  const discount = (product: Product) => {
    return product.originalPrice 
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0
  }

  const hasActiveFilters = searchQuery || (categoryFilter && categoryFilter !== 'All')

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-600 mb-8">
          <Link to="/" className="hover:text-dark transition">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-dark">Products</span>
          {categoryFilter && (
            <>
              <span className="mx-2">/</span>
              <span className="text-dark">{categoryFilter}</span>
            </>
          )}
        </div>

        {/* Header */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                {searchQuery ? (
                  <span>Search Results for <span className="text-accent">"{searchQuery}"</span></span>
                ) : categoryFilter && categoryFilter !== 'All' ? (
                  categoryFilter
                ) : (
                  'All Products'
                )}
              </h1>
              <p className="text-sm text-muted-600">
                {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Grid toggle */}
              <div className="hidden md:flex items-center gap-1 border border-muted-300 rounded-lg p-1">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-2 rounded ${gridCols === 3 ? 'bg-accent text-white' : 'hover:bg-muted-100'}`}
                  aria-label="3 columns"
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-2 rounded ${gridCols === 4 ? 'bg-accent text-white' : 'hover:bg-muted-100'}`}
                  aria-label="4 columns"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>

              {/* Sort dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-muted-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* Filter toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-muted-300 rounded-lg hover:bg-muted-50 transition"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>

          {/* Active filters */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-600">Active filters:</span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent-50 text-accent rounded-full text-sm">
                  Search: {searchQuery}
                  <button
                    onClick={() => {
                      const params = new URLSearchParams(searchParams)
                      params.delete('search')
                      setSearchParams(params)
                    }}
                    className="hover:text-accent-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {categoryFilter && categoryFilter !== 'All' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent-50 text-accent rounded-full text-sm">
                  Category: {categoryFilter}
                  <button
                    onClick={() => handleCategoryChange('All')}
                    className="hover:text-accent-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-accent hover:text-accent-700 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Filters sidebar */}
        {showFilters && (
          <div className="mb-8 p-6 bg-muted-50 rounded-lg border border-muted-200">
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-lg border transition ${
                    (categoryFilter === category) || (!categoryFilter && category === 'All')
                      ? 'bg-accent text-white border-accent'
                      : 'border-muted-300 hover:border-accent hover:bg-accent-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Products grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className={`grid grid-cols-2 sm:grid-cols-2 ${gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-4 sm:gap-6`}>
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                badge={product.originalPrice ? `-${discount(product)}%` : undefined}
                badgeColor="danger"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-muted-50 rounded-lg">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-muted-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-muted-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-600 mb-6">
                {searchQuery 
                  ? `We couldn't find any products matching "${searchQuery}"`
                  : "We couldn't find any products matching your filters"}
              </p>
              <button
                onClick={clearFilters}
                className="inline-block bg-accent text-white px-8 py-3 rounded hover:bg-accent-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

