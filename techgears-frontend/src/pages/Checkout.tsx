import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import { CheckCircle2, CreditCard, Truck, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('bank')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulasi proses transaksi
    setTimeout(() => {
      clearCart()
      setLoading(false)
      navigate('/account')
    }, 2000)
  }

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="bg-muted-50 min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <nav className="flex items-center gap-2 text-sm text-muted-500 mb-2">
              <Link to="/cart" className="hover:text-accent transition flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Keranjang
              </Link>
              <span>/</span>
              <span className="text-dark font-medium">Checkout</span>
            </nav>
            <h1 className="text-3xl font-bold text-dark">Detail Pengiriman</h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-600 bg-white p-3 rounded-lg border border-muted-200 shadow-sm">
            <div className="flex items-center gap-2 text-accent font-semibold">
              <span className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs">1</span>
              Pengiriman
            </div>
            <div className="w-8 h-px bg-muted-300"></div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-muted-200 text-muted-500 flex items-center justify-center text-xs">2</span>
              Pembayaran
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Utama (7 Kolom) */}
          <div className="lg:col-span-7 space-y-6">
            <form id="checkout-form" onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-muted-200 p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-accent" /> Informasi Kontak
                  </h3>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-700">Nama Lengkap*</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: John Doe"
                    className="w-full px-4 py-3 bg-muted-50 border border-muted-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-700">Nomor Telepon*</label>
                  <input
                    type="tel"
                    required
                    placeholder="0812xxxx"
                    className="w-full px-4 py-3 bg-muted-50 border border-muted-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-muted-700">Alamat Email*</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-muted-50 border border-muted-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition"
                  />
                </div>

                <div className="md:col-span-2 pt-4">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent" /> Alamat Pengiriman
                  </h3>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-muted-700">Alamat Lengkap*</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Nama jalan, nomor rumah, RT/RW..."
                    className="w-full px-4 py-3 bg-muted-50 border border-muted-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition resize-none"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-700">Kota/Kabupaten*</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-muted-50 border border-muted-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-700">Kode Pos*</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-muted-50 border border-muted-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition"
                  />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded border-muted-300 text-accent focus:ring-accent transition" />
                  <span className="text-sm text-muted-600 group-hover:text-dark transition">Simpan informasi ini untuk pembelian berikutnya</span>
                </label>
              </div>
            </form>
          </div>

          {/* Sidebar Ringkasan (5 Kolom) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl shadow-md border border-muted-200 overflow-hidden sticky top-24">
              <div className="p-6 border-b bg-muted-50/50">
                <h2 className="text-lg font-bold text-dark">Ringkasan Pesanan</h2>
              </div>
              
              <div className="p-6 space-y-4 max-h-[40vh] overflow-y-auto custom-scrollbar">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-4">
                    <div className="relative">
                      <img src={item.product.image} alt={item.product.name} className="w-16 h-16 bg-muted-100 rounded-lg object-cover border border-muted-100" />
                      <span className="absolute -top-2 -right-2 bg-dark text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-dark truncate">{item.product.name}</h4>
                      <p className="text-xs text-muted-500">{formatPrice(item.product.price)}</p>
                    </div>
                    <span className="text-sm font-bold text-dark">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-muted-50/30 space-y-3 border-t">
                <div className="flex justify-between text-muted-600 text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-muted-600 text-sm">
                  <span>Biaya Pengiriman</span>
                  <span className="text-success font-medium">Gratis</span>
                </div>
                <div className="flex justify-between text-dark font-bold text-lg pt-2 border-t border-muted-200">
                  <span>Total</span>
                  <span className="text-accent">{formatPrice(getTotalPrice())}</span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-dark mb-4 uppercase tracking-wider">Metode Pembayaran</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'bank' ? 'border-accent bg-accent/5 ring-1 ring-accent' : 'border-muted-200 hover:border-muted-300'}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" value="bank" checked={paymentMethod === 'bank'} onChange={(e) => setPaymentMethod(e.target.value)} className="hidden" />
                        <CreditCard className={`w-5 h-5 ${paymentMethod === 'bank' ? 'text-accent' : 'text-muted-400'}`} />
                        <span className="text-sm font-medium">Transfer Bank</span>
                      </div>
                      <div className="flex gap-1">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-3" />
                      </div>
                    </label>

                    <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'cod' ? 'border-accent bg-accent/5 ring-1 ring-accent' : 'border-muted-200 hover:border-muted-300'}`}>
                      <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} className="hidden" />
                      <Truck className={`w-5 h-5 ${paymentMethod === 'cod' ? 'text-accent' : 'text-muted-400'}`} />
                      <span className="text-sm font-medium">Bayar di Tempat (COD)</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input type="text" placeholder="Kode Promo" className="flex-1 px-4 py-2 bg-muted-50 border border-muted-200 rounded-lg text-sm outline-none focus:border-accent" />
                  <button className="px-4 py-2 bg-dark text-white text-sm font-bold rounded-lg hover:bg-dark-800 transition">Gunakan</button>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-accent text-white py-4 rounded-xl font-bold hover:bg-accent-600 transition shadow-lg shadow-accent/20 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Memproses...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" /> Buat Pesanan Sekarang
                    </>
                  )}
                </button>
                
                <p className="text-[10px] text-center text-muted-400">
                  Dengan menekan tombol di atas, Anda menyetujui Syarat dan Ketentuan TechGears.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}