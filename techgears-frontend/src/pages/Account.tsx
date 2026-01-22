import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { 
  User, 
  MapPin, 
  CreditCard, 
  Package, 
  RotateCcw, 
  XCircle, 
  Heart, 
  LogOut, 
  Settings,
  ShieldCheck,
  ChevronRight
} from 'lucide-react'

export default function Account() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menuGroups = [
    {
      title: "Kelola Akun Saya",
      items: [
        { label: "Profil Saya", icon: User, path: "/account", active: true },
        { label: "Buku Alamat", icon: MapPin, path: "/account/address" },
        { label: "Metode Pembayaran", icon: CreditCard, path: "/account/payment" },
      ]
    },
    {
      title: "Pesanan Saya",
      items: [
        { label: "Riwayat Pesanan", icon: Package, path: "/account/orders" },
        { label: "Pengembalian", icon: RotateCcw, path: "/account/returns" },
        { label: "Pembatalan", icon: XCircle, path: "/account/cancellations" },
      ]
    }
  ]

  return (
    <div className="bg-muted-50 min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <nav className="flex items-center gap-2 text-sm text-muted-500">
            <Link to="/" className="hover:text-accent transition">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-dark font-medium">Akun Saya</span>
          </nav>
          <div className="flex items-center gap-2">
            <span className="text-muted-600">Selamat datang,</span>
            <span className="font-bold text-dark">{user?.name || 'User'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-muted-200 overflow-hidden">
              {menuGroups.map((group, idx) => (
                <div key={idx} className="p-4 border-b last:border-0">
                  <h3 className="text-xs font-bold text-muted-400 uppercase tracking-wider mb-4 px-2">
                    {group.title}
                  </h3>
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                          item.active 
                            ? 'bg-accent/10 text-accent' 
                            : 'text-muted-600 hover:bg-muted-50 hover:text-dark'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="p-4 bg-muted-50/50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-danger hover:bg-danger/10 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Keluar dari Akun
                </button>
              </div>
            </div>

            {/* Loyalty Card Prompt */}
            <div className="bg-dark rounded-2xl p-6 text-white relative overflow-hidden shadow-lg shadow-dark/20">
              <div className="relative z-10">
                <p className="text-xs text-muted-400 font-bold uppercase mb-1">Status Akun</p>
                <h4 className="text-lg font-bold mb-4">Silver Member</h4>
                <Link to="/loyalty" className="text-xs bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition inline-block">
                  Lihat Benefit
                </Link>
              </div>
              <ShieldCheck className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5" />
            </div>
          </aside>

          {/* Profile Edit Form */}
          <main className="lg:col-span-9">
            <div className="bg-white rounded-2xl shadow-sm border border-muted-200 p-6 sm:p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <Settings className="w-8 h-8 text-accent animate-spin-slow" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-dark">Edit Profil</h2>
                  <p className="text-sm text-muted-500">Perbarui informasi dasar dan pengaturan akun Anda.</p>
                </div>
              </div>

              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-700">Nama Depan</label>
                    <input
                      type="text"
                      defaultValue={user?.name?.split(' ')[0] || ''}
                      className="w-full px-4 py-3 bg-muted-50 border border-muted-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-700">Nama Belakang</label>
                    <input
                      type="text"
                      defaultValue={user?.name?.split(' ')[1] || ''}
                      className="w-full px-4 py-3 bg-muted-50 border border-muted-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-700">Alamat Email</label>
                    <input
                      type="email"
                      defaultValue={user?.email || ''}
                      className="w-full px-4 py-3 bg-muted-50 border border-muted-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-700">Alamat Utama</label>
                    <input
                      type="text"
                      placeholder="Masukkan alamat lengkap"
                      className="w-full px-4 py-3 bg-muted-50 border border-muted-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-muted-100">
                  <h3 className="text-lg font-bold text-dark mb-6">Ubah Kata Sandi</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="password"
                      placeholder="Kata Sandi Saat Ini"
                      className="w-full px-4 py-3 bg-muted-50 border border-muted-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="password"
                        placeholder="Kata Sandi Baru"
                        className="w-full px-4 py-3 bg-muted-50 border border-muted-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition"
                      />
                      <input
                        type="password"
                        placeholder="Konfirmasi Kata Sandi"
                        className="w-full px-4 py-3 bg-muted-50 border border-muted-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
                  <button
                    type="button"
                    className="px-8 py-3 text-sm font-bold text-muted-600 hover:bg-muted-100 rounded-xl transition"
                  >
                    Batalkan
                  </button>
                  <button
                    type="submit"
                    className="bg-accent text-white px-10 py-3 rounded-xl font-bold hover:bg-accent-600 transition shadow-lg shadow-accent/20"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}