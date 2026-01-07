import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Heart, User, Search, ChevronDown, Menu, X } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useAuthStore } from '@/store/authStore'
import { useState, useEffect, useRef, useCallback } from 'react'
import { ProductAPI } from '@/services/api.service'
import type { Product, Category } from '@/types'

export default function Header() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState<{ products: Product[]; categories: Category[] }>({
    products: [],
    categories: []
  })
  const [isSearching, setIsSearching] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const totalItems = useCartStore((state) => state.getTotalItems())
  const wishlistCount = useWishlistStore((state) => state.getTotalItems())
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const debounceTimerRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchFocused(false)
        setMobileMenuOpen(false)
        searchInputRef.current?.blur()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchFocused(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSearchSuggestions({ products: [], categories: [] })
      return
    }

    try {
      setIsSearching(true)
      const response = await ProductAPI.searchSuggestions(query)
      // Laravel wraps data in { success: true, data: {...} }
      const data: any = response.data?.data || response.data
      setSearchSuggestions({
        products: data?.products || [],
        categories: data?.categories || []
      })
    } catch (error) {
      console.error('Search suggestions error:', error)
      // Set empty data on error to prevent crash
      setSearchSuggestions({ products: [], categories: [] })
    } finally {
      setIsSearching(false)
    }
  }, [])

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    if (searchQuery.trim()) {
      debounceTimerRef.current = setTimeout(() => {
        fetchSuggestions(searchQuery)
      }, 300)
    } else {
      setSearchSuggestions({ products: [], categories: [] })
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [searchQuery, fetchSuggestions])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
      setSearchFocused(false)
      setMobileMenuOpen(false)
    }
  }

  const handleSuggestionClick = (slug: string) => {
    navigate(`/products/${slug}`)
    setSearchQuery('')
    setSearchFocused(false)
    setSearchSuggestions({ products: [], categories: [] })
  }

  const handleCategoryClick = (categorySlug: string) => {
    navigate(`/products?category=${categorySlug}`)
    setSearchQuery('')
    setSearchFocused(false)
    setSearchSuggestions({ products: [], categories: [] })
  }

  const showSuggestions = searchFocused && (searchSuggestions.products.length > 0 || searchSuggestions.categories.length > 0)

  return (
    <>
      <div className="bg-dark text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex-1 text-center">
              <p className="text-xs sm:text-sm">
                Limited Time Offer: Up to 40% Off on All Electronics + Free Shipping!{' '}
                <Link
                  to="/products"
                  className="font-semibold underline ml-2 hidden sm:inline hover:text-accent transition"
                  aria-label="Shop electronics now"
                >
                  Shop Now
                </Link>
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <span>English</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      <header
        className={`bg-white border-b sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md py-2' : 'py-4'
          }`}
        role="banner"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className={`font-heading font-bold text-primary hover:text-accent transition-all duration-300 ${isScrolled ? 'text-xl sm:text-2xl' : 'text-xl sm:text-3xl'
                }`}
              aria-label="TechGears Home"
            >
              TechGears
            </Link>

            <nav className="hidden lg:flex items-center gap-8" role="navigation" aria-label="Main navigation">
              <Link
                to="/"
                className="hover:text-accent transition-colors"
                aria-current="page"
              >
                Home
              </Link>
              <Link
                to="/contact"
                className="hover:text-accent transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/about"
                className="hover:text-accent transition-colors"
              >
                About
              </Link>
              <Link
                to="/register"
                className="hover:text-accent transition-colors"
              >
                Sign Up
              </Link>
            </nav>

            <div className="flex items-center gap-3 sm:gap-6">
              <div
                ref={searchContainerRef}
                className="hidden lg:block relative"
              >
                <form onSubmit={handleSearch} className="flex items-center bg-muted-100 rounded-lg px-4 py-2.5 border-2 border-transparent focus-within:border-blue-500 transition-all">
                  <input
                    ref={searchInputRef}
                    type="search"
                    placeholder="What are you looking for?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    className="bg-transparent text-sm outline-none border-0 focus:ring-0 w-48 xl:w-64"
                    aria-label="Search products"
                    aria-autocomplete="list"
                    aria-controls="search-suggestions"
                    aria-expanded={showSuggestions}
                  />
                  <button
                    type="submit"
                    aria-label="Submit search"
                    className="hover:text-accent transition"
                  >
                    <Search className="w-5 h-5 ml-2" />
                  </button>
                </form>

                {showSuggestions && (
                  <div
                    id="search-suggestions"
                    className="absolute top-full mt-2 w-full min-w-[400px] bg-white border border-muted-200 rounded-lg shadow-lg max-h-96 overflow-y-auto animate-fade-in"
                    role="listbox"
                  >
                    {searchSuggestions.categories.length > 0 && (
                      <div className="p-3 border-b border-muted-100">
                        <h3 className="text-xs font-semibold text-muted-600 uppercase mb-2">Categories</h3>
                        <div className="space-y-1">
                          {searchSuggestions.categories.map((category) => (
                            <button
                              key={category.id}
                              onClick={() => handleCategoryClick(category.slug)}
                              className="w-full text-left px-3 py-2 hover:bg-accent-50 rounded transition text-sm"
                              role="option"
                            >
                              {category.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {searchSuggestions.products.length > 0 && (
                      <div className="p-3">
                        <h3 className="text-xs font-semibold text-muted-600 uppercase mb-2">Products</h3>
                        <div className="space-y-2">
                          {searchSuggestions.products.map((product) => (
                            <button
                              key={product.id}
                              onClick={() => handleSuggestionClick(product.slug)}
                              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-accent-50 rounded transition"
                              role="option"
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded"
                                loading="lazy"
                              />
                              <div className="flex-1 text-left">
                                <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                                <p className="text-sm text-accent font-semibold">${product.price}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {isSearching && (
                      <div className="p-4 text-center text-sm text-muted-600">
                        Searching...
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <Link
                  to="/wishlist"
                  className="relative hidden sm:block hover:text-accent transition"
                  aria-label={`Wishlist, ${wishlistCount} items`}
                >
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/cart"
                  className="relative hover:text-accent transition"
                  aria-label={`Shopping cart, ${totalItems} items`}
                >
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                      {totalItems}
                    </span>
                  )}
                </Link>
                {isAuthenticated ? (
                  <Link
                    to="/account"
                    className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white hover:bg-accent-600 transition"
                    aria-label="My account"
                  >
                    <User className="w-5 h-5" />
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="hover:text-accent transition"
                    aria-label="Login or register"
                  >
                    <User className="w-5 h-5 sm:w-6 sm:h-6" />
                  </Link>
                )}

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-1 hover:text-accent transition"
                  aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden border-t py-4 space-y-4 animate-fade-in">
              <form onSubmit={handleSearch} className="flex items-center bg-muted-100 rounded-lg px-4 py-2.5">
                <input
                  type="search"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm outline-none flex-1"
                  aria-label="Search products"
                />
                <button type="submit" aria-label="Submit search">
                  <Search className="w-5 h-5 ml-2" />
                </button>
              </form>

              <nav className="flex flex-col space-y-3" role="navigation" aria-label="Mobile navigation">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition py-2">
                  Home
                </Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition py-2">
                  Contact
                </Link>
                <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition py-2">
                  About
                </Link>
                <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition py-2 sm:hidden flex items-center justify-between">
                  <span>Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition py-2">
                  Sign Up
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}

