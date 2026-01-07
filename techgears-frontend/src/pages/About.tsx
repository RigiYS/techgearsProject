import { Link } from 'react-router-dom'
import { TruckIcon, HeadphonesIcon, ShieldCheck, ShoppingBag, DollarSign, Users } from 'lucide-react'

export default function About() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <span>About</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h1 className="text-5xl font-semibold mb-8">Our Story</h1>
            <div className="space-y-4 text-gray-700">
              <p>
                Launched in 2026, TechGears was founded in Sukabumi, West Java, Indonesia,
                with a vision to revolutionize the way Indonesians shop for technology products.
                From our humble beginnings, we've grown into a trusted e-commerce platform
                offering cutting-edge electronics, gadgets, and tech accessories to customers
                across the nation.
              </p>
              <p>
                At TechGears, we believe technology should be accessible to everyone. Our
                carefully curated selection features products from leading global brands
                alongside innovative local manufacturers. With competitive pricing, secure
                payment options, and nationwide delivery, we're committed to making your
                tech shopping experience seamless and enjoyable.
              </p>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
              alt="Our Story"
              className="w-full rounded-lg object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          <div className="border rounded-lg p-8 text-center transition-all duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] group">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:bg-blue-500">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-2">10.5k</h3>
            <p className="text-sm">Sallers active our site</p>
          </div>

          <div className="border rounded-lg p-8 text-center transition-all duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] group">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:bg-blue-500">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-2">33k</h3>
            <p className="text-sm">Mopnthly Produduct Sale</p>
          </div>

          <div className="border rounded-lg p-8 text-center transition-all duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] group">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:bg-blue-500">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-2">45.5k</h3>
            <p className="text-sm">Customer active in our site</p>
          </div>

          <div className="border rounded-lg p-8 text-center transition-all duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] group">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:bg-blue-500">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-2">25k</h3>
            <p className="text-sm">Anual gross sale in our site</p>
          </div>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 border-8 border-gray-200">
              <TruckIcon className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2">FREE AND FAST DELIVERY</h3>
            <p className="text-sm">Free delivery for all orders over $140</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 border-8 border-gray-200">
              <HeadphonesIcon className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2">24/7 CUSTOMER SERVICE</h3>
            <p className="text-sm">Friendly 24/7 customer support</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 border-8 border-gray-200">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2">MONEY BACK GUARANTEE</h3>
            <p className="text-sm">We return money within 30 days</p>
          </div>
        </div>
      </div>
    </div>
  )
}

