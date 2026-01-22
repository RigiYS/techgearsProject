import { Link } from 'react-router-dom'
import { Trash2, ArrowLeft, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'

export default function Cart() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-muted-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart className="w-12 h-12 text-muted-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Keranjang Kosong</h1>
        <p className="text-muted-600 mb-8 max-w-md mx-auto">
          Sepertinya Anda belum menambahkan perangkat teknologi apa pun ke keranjang Anda.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-lg hover:bg-accent-600 transition shadow-lg shadow-accent/20"
        >
          <ArrowLeft className="w-4 h-4" />
          Mulai Belanja
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-muted-50 min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb Terintegrasi */}
        <nav className="flex items-center gap-2 text-sm text-muted-500 mb-8">
          <Link to="/" className="hover:text-accent transition">Home</Link>
          <span>/</span>
          <span className="text-dark font-medium">Shopping Cart</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* List Produk (2/3 Kolom) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-muted-200 overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 p-6 bg-muted-50/50 border-b text-sm font-semibold text-muted-600">
                <div className="col-span-6">Produk</div>
                <div className="col-span-2 text-center">Harga</div>
                <div className="col-span-2 text-center">Kuantitas</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {items.map((item) => (
                <div key={item.product.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 items-center border-b last:border-0 hover:bg-muted-50/30 transition">
                  {/* Info Produk */}
                  <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-20 h-20 bg-muted-100 rounded-lg object-cover border border-muted-200" 
                    />
                    <div className="min-w-0">
                      <h3 className="font-semibold text-dark truncate">{item.product.name}</h3>
                      <button 
                        onClick={() => removeItem(item.product.id)}
                        className="text-xs text-danger hover:underline mt-1 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Hapus
                      </button>
                    </div>
                  </div>

                  {/* Harga Desktop */}
                  <div className="hidden md:block col-span-2 text-center text-muted-600 font-medium">
                    {formatPrice(item.product.price)}
                  </div>

                  {/* Kuantitas */}
                  <div className="col-span-1 md:col-span-2 flex justify-center">
                    <div className="flex items-center bg-white border border-muted-300 rounded-lg overflow-hidden h-10 shadow-sm">
                      <button 
                        onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="px-3 hover:bg-muted-100 transition text-muted-600"
                      >-</button>
                      <span className="w-10 text-center font-semibold text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 hover:bg-muted-100 transition text-muted-600"
                      >+</button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="col-span-1 md:col-span-2 text-right">
                    <span className="md:hidden text-muted-500 text-sm">Total: </span>
                    <span className="font-bold text-accent">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <Link to="/products" className="flex items-center gap-2 text-sm font-medium text-muted-600 hover:text-accent transition">
                <ArrowLeft className="w-4 h-4" /> Kembali Belanja
              </Link>
            </div>
          </div>

          {/* Ringkasan Belanja (1/3 Kolom) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md border border-muted-200 p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-6 pb-4 border-b">Ringkasan Pesanan</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-muted-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-dark">{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-muted-600">
                  <span>Pengiriman</span>
                  <span className="text-success font-medium">Gratis</span>
                </div>
                <div className="pt-4 border-t flex justify-between items-end">
                  <span className="font-bold text-dark">Total</span>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-accent">{formatPrice(getTotalPrice())}</p>
                    <p className="text-xs text-muted-400">Termasuk PPN</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Kode Kupon" 
                    className="w-full pl-4 pr-20 py-3 bg-muted-50 border border-muted-300 rounded-lg text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition" 
                  />
                  <button className="absolute right-2 top-1.5 bottom-1.5 px-4 bg-dark text-white text-xs font-semibold rounded-md hover:bg-dark-800 transition">
                    Pakai
                  </button>
                </div>
                
                <Link
                  to="/checkout"
                  className="block w-full bg-accent text-white py-4 rounded-xl text-center font-bold hover:bg-accent-600 transition shadow-lg shadow-accent/20"
                >
                  Checkout Sekarang
                </Link>
              </div>

              <div className="mt-6 flex items-center justify-center gap-4 grayscale opacity-50">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}