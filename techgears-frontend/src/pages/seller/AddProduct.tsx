import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import { 
  Upload, 
  X, 
  ImageIcon, 
  Plus, 
  Trash2, 
  ChevronRight, 
  ArrowLeft,
  PackagePlus
} from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export default function AddProduct() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // State management yang sinkron dengan input
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    image: '', 
    variants: [
      { color: '#db4444', name: 'Standard', price: '' }
    ]
  })

  // Handler untuk input teks dasar
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProductData(prev => ({ ...prev, [name]: value }))
  }

  // Handler untuk upload gambar menggunakan FileReader
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProductData(prev => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Manajemen Varian
  const addVariant = () => {
    setProductData(prev => ({
      ...prev,
      variants: [...prev.variants, { color: '#000000', name: '', price: '' }]
    }))
  }

  const updateVariant = (index: number, field: string, value: string) => {
    const newVariants = [...productData.variants]
    newVariants[index] = { ...newVariants[index], [field]: value }
    setProductData(prev => ({ ...prev, variants: newVariants }))
  }

  const removeVariant = (index: number) => {
    setProductData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="bg-muted-50 min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <nav className="flex items-center gap-2 text-sm text-muted-500 mb-2">
              <Link to="/seller/products" className="hover:text-accent transition flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Inventaris
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-dark font-medium text-sm">Tambah Produk</span>
            </nav>
            <h1 className="text-3xl font-bold text-dark flex items-center gap-3">
              <PackagePlus className="text-accent" /> Tambah Produk Baru
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Input Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-muted-200 p-6 sm:p-8">
              <div className="space-y-6">
                
                {/* Image Upload Area */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-500 uppercase tracking-wider">Foto Produk</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative border-2 border-dashed border-muted-200 rounded-2xl p-8 text-center hover:border-accent transition cursor-pointer bg-muted-50/50 group"
                  >
                    {productData.image ? (
                      <div className="relative inline-block">
                        <img src={productData.image} alt="Preview" className="max-h-64 rounded-xl shadow-lg border border-white" />
                        <button 
                          onClick={(e) => { e.stopPropagation(); setProductData(prev => ({ ...prev, image: '' })) }}
                          className="absolute -top-3 -right-3 bg-danger text-white rounded-full p-1.5 shadow-xl hover:scale-110 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="py-4">
                        <Upload className="w-12 h-12 text-muted-300 mx-auto mb-3 group-hover:text-accent transition" />
                        <p className="text-sm text-muted-600 font-medium">Klik untuk unggah gambar produk</p>
                        <p className="text-xs text-muted-400 mt-1">Saran: Gunakan rasio 1:1 (Square)</p>
                      </div>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                  </div>
                </div>

                {/* Basic Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-muted-500 uppercase tracking-wider">Nama Produk</label>
                    <input
                      name="name"
                      type="text"
                      value={productData.name}
                      onChange={handleChange}
                      placeholder="Contoh: Keyboard Mechanical RGB"
                      className="w-full px-4 py-3 bg-muted-50 border border-muted-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-500 uppercase tracking-wider">Kategori</label>
                    <input
                      name="category"
                      type="text"
                      value={productData.category}
                      onChange={handleChange}
                      placeholder="Electronics"
                      className="w-full px-4 py-3 bg-muted-50 border border-muted-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-500 uppercase tracking-wider">Harga (USD)</label>
                    <input
                      name="price"
                      type="number"
                      value={productData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full px-4 py-3 bg-muted-50 border border-muted-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition font-mono"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-500 uppercase tracking-wider">Deskripsi Produk</label>
                  <textarea
                    name="description"
                    rows={4}
                    value={productData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-muted-50 border border-muted-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition resize-none"
                  ></textarea>
                </div>

                {/* Dynamic Variants */}
                <div className="pt-6 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-xs font-bold text-muted-500 uppercase tracking-wider">Varian & Warna</label>
                    <button onClick={addVariant} className="text-xs font-bold text-accent flex items-center gap-1 hover:underline">
                      <Plus className="w-3 h-3" /> Tambah Varian
                    </button>
                  </div>
                  <div className="space-y-3">
                    {productData.variants.map((variant, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted-50/50 rounded-xl border border-muted-100">
                        <input 
                          type="color" 
                          value={variant.color} 
                          onChange={(e) => updateVariant(index, 'color', e.target.value)}
                          className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-none" 
                        />
                        <input
                          type="text"
                          placeholder="Nama (ex: Blue)"
                          value={variant.name}
                          onChange={(e) => updateVariant(index, 'name', e.target.value)}
                          className="flex-1 px-3 py-2 bg-white border border-muted-200 rounded-lg text-sm outline-none focus:border-accent"
                        />
                        <input
                          type="number"
                          placeholder="+ Harga"
                          value={variant.price}
                          onChange={(e) => updateVariant(index, 'price', e.target.value)}
                          className="w-24 px-3 py-2 bg-white border border-muted-200 rounded-lg text-sm outline-none focus:border-accent font-mono"
                        />
                        {productData.variants.length > 1 && (
                          <button onClick={() => removeVariant(index)} className="text-muted-400 hover:text-danger transition">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Link to="/seller/products" className="px-8 py-4 border border-muted-300 rounded-xl font-bold text-muted-600 hover:bg-muted-100 transition">
                Batal
              </Link>
              <button className="flex-1 bg-accent text-white px-8 py-4 rounded-xl font-bold hover:bg-accent-600 transition shadow-lg shadow-accent/20">
                Publikasikan Produk
              </button>
            </div>
          </div>

          {/* Dynamic Preview Section */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-md border border-muted-200 p-6">
                <h3 className="text-sm font-bold text-muted-400 mb-6 uppercase tracking-wider">Live Preview</h3>
                <div className="max-w-[280px] mx-auto bg-white border border-muted-100 rounded-2xl overflow-hidden shadow-xl transition-all duration-300">
                  <div className="aspect-square bg-muted-100 flex items-center justify-center overflow-hidden">
                    {productData.image ? (
                      <img src={productData.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-16 h-16 text-muted-300 opacity-20" />
                    )}
                  </div>
                  <div className="p-5 space-y-3">
                    <h4 className="font-bold text-dark truncate">
                      {productData.name || 'Nama Produk Baru'}
                    </h4>
                    <p className="text-xs text-muted-500 line-clamp-2 h-8 leading-relaxed">
                      {productData.description || 'Deskripsi akan otomatis terisi saat Anda mengetik...'}
                    </p>
                    <div className="flex items-center gap-1.5 py-1">
                      {productData.variants.map((v, i) => (
                        <div key={i} className="w-3 h-3 rounded-full border border-muted-200 shadow-sm" style={{ backgroundColor: v.color }}></div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xl font-black text-accent">
                        {productData.price ? formatPrice(Number(productData.price)) : formatPrice(0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}