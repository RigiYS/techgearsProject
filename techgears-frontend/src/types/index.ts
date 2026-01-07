export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  category: string
  stock: number
  rating?: number
  reviews?: number
  slug: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  phone?: string
  address?: Address[]
}

export interface Address {
  id: string
  name: string
  phone: string
  street: string
  city: string
  province: string
  postalCode: string
  isDefault: boolean
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: Address
  paymentMethod: string
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  image?: string
  productCount?: number
}

