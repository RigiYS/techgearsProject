import { Link } from 'react-router-dom'
import { ArrowRight, Smartphone, Monitor, Watch, Camera, Headphones, Gamepad2, TruckIcon, ShieldCheck, HeadphonesIcon, Tablet } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import ProductCard from '@/components/ui/ProductCard'
import CategoryIcon from '@/components/ui/CategoryIcon'
import CountdownTimer from '@/components/ui/CountdownTimer'
import { Product } from '@/types'
import { useEffect, useState } from 'react'
import { ProductAPI } from '@/services/api.service'

const flashSaleProducts: Product[] = [
  { id: '1', name: 'Gaming Mechanical Keyboard RGB', price: 89, originalPrice: 129, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop', category: 'Accessories', stock: 10, rating: 5, reviews: 88, slug: 'gaming-mechanical-keyboard' },
  { id: '2', name: 'Wireless Gaming Mouse Pro', price: 45, originalPrice: 65, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop', category: 'Accessories', stock: 25, rating: 4.5, reviews: 156, slug: 'wireless-gaming-mouse' },
  { id: '3', name: '27" 4K Gaming Monitor 144Hz', price: 399, originalPrice: 549, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=300&fit=crop', category: 'Monitors', stock: 15, rating: 5, reviews: 243, slug: '4k-gaming-monitor' },
  { id: '4', name: 'Wireless Noise Cancelling Headphones', price: 199, originalPrice: 279, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', category: 'Audio', stock: 30, rating: 4.5, reviews: 189, slug: 'wireless-headphones' },
]

const bestSellingProducts: Product[] = [
  { id: '5', name: 'MacBook Pro 16" M3 Pro', price: 2499, originalPrice: 2799, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop', category: 'Laptops', stock: 8, rating: 5, reviews: 312, slug: 'macbook-pro-16-m3' },
  { id: '6', name: 'iPhone 15 Pro Max 256GB', price: 1199, originalPrice: 1299, image: 'https://images.unsplash.com/photo-1592286927505-4fd30698e553?w=300&h=300&fit=crop', category: 'Smartphones', stock: 12, rating: 5, reviews: 456, slug: 'iphone-15-pro-max' },
  { id: '7', name: 'Samsung Galaxy Tab S9 Ultra', price: 899, originalPrice: 1099, image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=300&h=300&fit=crop', category: 'Tablets', stock: 18, rating: 4.5, reviews: 178, slug: 'galaxy-tab-s9-ultra' },
  { id: '8', name: 'Sony WH-1000XM5 Headphones', price: 349, originalPrice: 399, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&h=300&fit=crop', category: 'Audio', stock: 25, rating: 5, reviews: 892, slug: 'sony-wh1000xm5' },
]

export default function Home() {
  const flashSaleEndDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)

  return (
    <div>
      <section className="border-b">
        <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="w-8 sm:w-10" />
                <span className="text-base sm:text-lg">Latest Tech Products</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 sm:mb-8 leading-tight">
                Up to 40% Off<br />On Electronics
              </h1>
              <Link to="/products" className="inline-flex items-center gap-2 text-base sm:text-lg font-medium underline hover:no-underline transition">
                Shop Now
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
            <div className="relative order-first lg:order-last">
              <img src="https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&h=600&fit=crop" alt="Latest Tech" className="w-full rounded-lg object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <SectionHeader
            tag="Today's"
            title="Flash Sales"
            action={<div className="hidden sm:block"><CountdownTimer targetDate={flashSaleEndDate} /></div>}
          />

          <div className="sm:hidden mb-6">
            <CountdownTimer targetDate={flashSaleEndDate} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {flashSaleProducts.map((product) => (
              <ProductCard key={product.id} product={product} badge="-40%" />
            ))}
          </div>

          <div className="text-center">
            <Link to="/products" className="inline-block bg-secondary text-white px-8 sm:px-12 py-3 sm:py-4 rounded hover:bg-secondary/90 transition text-sm sm:text-base">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <div className="border-t">
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <SectionHeader
              tag="Categories"
              title="Browse By Category"
            />

            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
              <CategoryIcon icon={Smartphone} label="Smartphones" href="/products?category=smartphones" />
              <CategoryIcon icon={Monitor} label="Laptops" href="/products?category=laptops" />
              <CategoryIcon icon={Watch} label="Smartwatches" href="/products?category=smartwatches" />
              <CategoryIcon icon={Camera} label="Cameras" href="/products?category=cameras" />
              <CategoryIcon icon={Headphones} label="Audio" href="/products?category=audio" />
              <CategoryIcon icon={Gamepad2} label="Gaming" href="/products?category=gaming" />
            </div>
          </div>
        </section>
      </div>

      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <SectionHeader
            tag="This Month"
            title="Best Selling Products"
            action={
              <Link to="/products" className="hidden sm:inline-block bg-secondary text-white px-8 sm:px-12 py-2.5 sm:py-3 rounded hover:bg-secondary/90 transition text-sm sm:text-base">
                View All
              </Link>
            }
          />

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link to="/products" className="inline-block bg-secondary text-white px-8 py-3 rounded hover:bg-secondary/90 transition text-sm">
              View All
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="text-blue-500 font-semibold mb-3 sm:mb-4 block text-sm sm:text-base">Featured Products</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 sm:mb-8">
                Premium Audio<br />Experience
              </h2>
              <div className="mb-6 sm:mb-8">
                <CountdownTimer targetDate={new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)} />
              </div>
              <Link to="/products?category=audio" className="inline-block bg-blue-500 text-white px-8 sm:px-12 py-3 sm:py-4 rounded hover:bg-blue-600 transition text-sm sm:text-base">
                Shop Now!
              </Link>
            </div>
            <div className="order-first lg:order-last">
              <img src="https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&h=400&fit=crop" alt="Premium Headphones" className="w-full rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <SectionHeader tag="Our Products" title="Explore Our Products" />

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...flashSaleProducts, ...bestSellingProducts].slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border-4 sm:border-8 border-gray-200">
                <TruckIcon className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2">FREE AND FAST DELIVERY</h3>
              <p className="text-xs sm:text-sm text-gray-600">Free delivery for all orders over $140</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border-4 sm:border-8 border-gray-200">
                <HeadphonesIcon className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2">24/7 CUSTOMER SERVICE</h3>
              <p className="text-xs sm:text-sm text-gray-600">Friendly 24/7 customer support</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border-4 sm:border-8 border-gray-200">
                <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2">MONEY BACK GUARANTEE</h3>
              <p className="text-xs sm:text-sm text-gray-600">We return money within 30 days</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

