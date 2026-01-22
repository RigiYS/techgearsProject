import { Link } from 'react-router-dom'
import { Phone, Mail, MessageSquare, Send } from 'lucide-react'

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementasi pengiriman pesan
  }

  return (
    <div className="bg-muted-50 min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-500 mb-8">
          <Link to="/" className="hover:text-accent transition">Home</Link>
          <span>/</span>
          <span className="text-dark font-medium">Contact Us</span>
        </nav>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar Info (4 Kolom) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-muted-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-dark">Hubungi Kami</h3>
                    <p className="text-sm text-muted-500">Tersedia 24/7</p>
                  </div>
                </div>
                <p className="text-sm text-muted-600 mb-4 leading-relaxed">
                  Tim kami siap menjawab pertanyaan teknis Anda kapan saja.
                </p>
                <a href="tel:+8801611112222" className="text-lg font-semibold text-dark hover:text-accent transition">
                  +880 1611 112 222
                </a>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-muted-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-dark">Email Support</h3>
                    <p className="text-sm text-muted-500">Respon dalam 24 jam</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm flex items-center justify-between">
                    <span className="text-muted-500">Customer:</span>
                    <span className="font-medium text-dark">customer@techgears.com</span>
                  </p>
                  <p className="text-sm flex items-center justify-between">
                    <span className="text-muted-500">Technical:</span>
                    <span className="font-medium text-dark">support@techgears.com</span>
                  </p>
                </div>
              </div>

              <div className="bg-dark rounded-2xl p-8 shadow-lg text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-2">Butuh bantuan cepat?</h3>
                  <p className="text-gray-400 text-sm mb-6">Gunakan fitur Live Chat untuk bicara langsung dengan teknisi kami.</p>
                  <Link to="/live-chat" className="inline-flex items-center gap-2 bg-white text-dark px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-accent hover:text-white transition">
                    <MessageSquare className="w-4 h-4" /> Mulai Chat
                  </Link>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
              </div>
            </div>

            {/* Contact Form (8 Kolom) */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-md border border-muted-200">
                <h2 className="text-2xl font-bold text-dark mb-2">Kirim Pesan</h2>
                <p className="text-muted-500 mb-8">Punya pertanyaan atau masukan? Kami senang mendengarnya dari Anda.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-500 uppercase tracking-wider">Nama Anda</label>
                      <input
                        type="text"
                        placeholder="Nama Lengkap"
                        className="w-full px-4 py-3 bg-muted-50 border border-muted-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-500 uppercase tracking-wider">Email</label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        className="w-full px-4 py-3 bg-muted-50 border border-muted-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-500 uppercase tracking-wider">Telepon</label>
                      <input
                        type="tel"
                        placeholder="0812xxxx"
                        className="w-full px-4 py-3 bg-muted-50 border border-muted-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-500 uppercase tracking-wider">Pesan</label>
                    <textarea
                      placeholder="Apa yang bisa kami bantu?"
                      rows={6}
                      className="w-full px-4 py-3 bg-muted-50 border border-muted-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition resize-none"
                      required
                    ></textarea>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-3 bg-accent text-white px-10 py-4 rounded-xl font-bold hover:bg-accent-600 transition shadow-lg shadow-accent/20"
                    >
                      Kirim Pesan Sekarang
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}