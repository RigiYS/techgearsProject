import axios from '@/lib/axios'
import type { AxiosResponse } from 'axios'
import type { Product, Category, CartItem, Order, User } from '@/types'

export const ProductAPI = {
  getAll: async (params?: {
    category?: string
    search?: string
    page?: number
    limit?: number
    sort?: string
  }): Promise<AxiosResponse<{ success: boolean; data: { products: Product[]; total: number } }>> => {
    return axios.get('/products', { params })
  },

  getById: async (id: string): Promise<AxiosResponse<{ product: Product }>> => {
    return axios.get(`/products/${id}`)
  },

  searchSuggestions: async (q: string): Promise<AxiosResponse<{ success: boolean; data: { products: Product[]; categories: Category[] } }>> => {
    return axios.get('/products/search/suggestions', { params: { q } })
  },
}

export const CategoryAPI = {
  getAll: async (): Promise<AxiosResponse<{ categories: Category[] }>> => {
    return axios.get('/categories')
  },
}

export const CartAPI = {
  get: async (): Promise<AxiosResponse<{ items: CartItem[] }>> => {
    return axios.get('/cart')
  },

  add: async (productId: string, quantity: number): Promise<AxiosResponse<{ item: CartItem }>> => {
    return axios.post('/cart', { productId, quantity })
  },

  update: async (itemId: string, quantity: number): Promise<AxiosResponse<{ item: CartItem }>> => {
    return axios.put(`/cart/${itemId}`, { quantity })
  },

  remove: async (itemId: string): Promise<AxiosResponse<{ success: boolean }>> => {
    return axios.delete(`/cart/${itemId}`)
  },

  applyCoupon: async (code: string): Promise<AxiosResponse<{ discount: number; message: string }>> => {
    return axios.post('/cart/coupon', { code })
  },
}

export const CheckoutAPI = {
  createOrder: async (data: {
    billingDetails: Record<string, unknown>
    paymentMethod: string
  }): Promise<AxiosResponse<{ order: Order }>> => {
    return axios.post('/checkout', data)
  },
}

export const AuthAPI = {
  register: async (data: {
    name: string
    email: string
    password: string
  }): Promise<AxiosResponse<{ success: boolean; data: { user: User; token: string } }>> => {
    return axios.post('/auth/register', data)
  },

  login: async (data: {
    email: string
    password: string
  }): Promise<AxiosResponse<{ success: boolean; data: { user: User; token: string } }>> => {
    return axios.post('/auth/login', data)
  },

  logout: async (): Promise<AxiosResponse<{ success: boolean }>> => {
    return axios.post('/auth/logout')
  },

  getMe: async (): Promise<AxiosResponse<{ success: boolean; data: { user: User } }>> => {
    return axios.get('/auth/me')
  },
}

export const OrderAPI = {
  getAll: async (): Promise<AxiosResponse<{ orders: Order[] }>> => {
    return axios.get('/orders')
  },

  getById: async (id: string): Promise<AxiosResponse<{ order: Order }>> => {
    return axios.get(`/orders/${id}`)
  },
}

export const WishlistAPI = {
  get: async (): Promise<AxiosResponse<{ products: Product[] }>> => {
    return axios.get('/wishlist')
  },

  add: async (productId: string): Promise<AxiosResponse<{ success: boolean }>> => {
    return axios.post('/wishlist', { productId })
  },

  remove: async (productId: string): Promise<AxiosResponse<{ success: boolean }>> => {
    return axios.delete(`/wishlist/${productId}`)
  },
}

export default {
  products: ProductAPI,
  categories: CategoryAPI,
  cart: CartAPI,
  checkout: CheckoutAPI,
  auth: AuthAPI,
  orders: OrderAPI,
  wishlist: WishlistAPI,
}
