import express from 'express'
import cors from 'cors'
import { mockProducts, mockCategories, mockUsers } from './mockData.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

let cartItems = []
let wishlistItems = []

app.get('/api/products', (req, res) => {
  const { category, search, page = 1, limit = 12, sort } = req.query
  
  let filteredProducts = [...mockProducts]
  
  if (category) {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    )
  }
  
  if (search) {
    const searchLower = search.toLowerCase()
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(searchLower) ||
      p.category.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
    )
  }
  
  if (sort) {
    if (sort === 'price-asc') {
      filteredProducts.sort((a, b) => a.price - b.price)
    } else if (sort === 'price-desc') {
      filteredProducts.sort((a, b) => b.price - a.price)
    } else if (sort === 'name') {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
    }
  }
  
  const startIndex = (parseInt(page) - 1) * parseInt(limit)
  const endIndex = startIndex + parseInt(limit)
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
  
  setTimeout(() => {
    res.json({
      products: paginatedProducts,
      total: filteredProducts.length,
      page: parseInt(page),
      totalPages: Math.ceil(filteredProducts.length / parseInt(limit))
    })
  }, 300)
})

app.get('/api/products/search/suggestions', (req, res) => {
  const { q } = req.query
  
  if (!q || q.length < 2) {
    return res.json({ products: [], categories: [] })
  }
  
  const searchLower = q.toLowerCase()
  const products = mockProducts
    .filter(p => p.name.toLowerCase().includes(searchLower))
    .slice(0, 6)
  
  const categories = mockCategories
    .filter(c => c.name.toLowerCase().includes(searchLower))
    .slice(0, 3)
  
  setTimeout(() => {
    res.json({ products, categories })
  }, 200)
})

app.get('/api/products/:id', (req, res) => {
  const product = mockProducts.find(p => p.slug === req.params.id || p.id === req.params.id)
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' })
  }
  
  setTimeout(() => {
    res.json({ product })
  }, 200)
})

app.get('/api/categories', (req, res) => {
  setTimeout(() => {
    res.json({ categories: mockCategories })
  }, 100)
})

app.get('/api/cart', (req, res) => {
  setTimeout(() => {
    res.json({ items: cartItems })
  }, 200)
})

app.post('/api/cart', (req, res) => {
  const { productId, quantity } = req.body
  const product = mockProducts.find(p => p.id === productId)
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' })
  }
  
  const existingItem = cartItems.find(item => item.product.id === productId)
  
  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cartItems.push({
      product,
      quantity
    })
  }
  
  setTimeout(() => {
    res.json({ 
      item: existingItem || cartItems[cartItems.length - 1],
      message: 'Product added to cart'
    })
  }, 300)
})

app.put('/api/cart/:itemId', (req, res) => {
  const { quantity } = req.body
  const item = cartItems.find(item => item.product.id === req.params.itemId)
  
  if (!item) {
    return res.status(404).json({ error: 'Cart item not found' })
  }
  
  item.quantity = quantity
  
  setTimeout(() => {
    res.json({ item, message: 'Cart updated' })
  }, 200)
})

app.delete('/api/cart/:itemId', (req, res) => {
  cartItems = cartItems.filter(item => item.product.id !== req.params.itemId)
  
  setTimeout(() => {
    res.json({ success: true, message: 'Item removed from cart' })
  }, 200)
})

app.post('/api/cart/coupon', (req, res) => {
  const { code } = req.body
  const validCoupons = {
    'SAVE10': 10,
    'SAVE20': 20,
    'TECHGEARS': 15
  }
  
  const discount = validCoupons[code]
  
  if (discount) {
    setTimeout(() => {
      res.json({ 
        discount, 
        message: `Coupon applied! ${discount}% discount` 
      })
    }, 300)
  } else {
    res.status(400).json({ 
      error: 'Invalid coupon code' 
    })
  }
})

app.post('/api/checkout', (req, res) => {
  const order = {
    id: 'ORD-' + Date.now(),
    userId: 'user-1',
    items: cartItems,
    total: cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
    status: 'pending',
    shippingAddress: req.body.billingDetails,
    paymentMethod: req.body.paymentMethod,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  cartItems = []
  
  setTimeout(() => {
    res.json({ 
      order,
      message: 'Order placed successfully' 
    })
  }, 500)
})

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body
  
  const existingUser = mockUsers.find(u => u.email === email)
  
  if (existingUser) {
    return res.status(400).json({ error: 'Email already exists' })
  }
  
  const user = {
    id: 'user-' + Date.now(),
    name,
    email,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`
  }
  
  mockUsers.push(user)
  
  setTimeout(() => {
    res.json({ 
      user,
      token: 'mock-token-' + Date.now(),
      message: 'Registration successful'
    })
  }, 400)
})

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  
  const user = mockUsers.find(u => u.email === email)
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  
  setTimeout(() => {
    res.json({
      user,
      token: 'mock-token-' + Date.now(),
      message: 'Login successful'
    })
  }, 400)
})

app.post('/api/auth/logout', (req, res) => {
  setTimeout(() => {
    res.json({ success: true })
  }, 200)
})

app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  
  setTimeout(() => {
    res.json({ user: mockUsers[0] })
  }, 200)
})

app.get('/api/wishlist', (req, res) => {
  setTimeout(() => {
    res.json({ products: wishlistItems })
  }, 200)
})

app.post('/api/wishlist', (req, res) => {
  const { productId } = req.body
  const product = mockProducts.find(p => p.id === productId)
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' })
  }
  
  if (!wishlistItems.find(p => p.id === productId)) {
    wishlistItems.push(product)
  }
  
  setTimeout(() => {
    res.json({ success: true, message: 'Added to wishlist' })
  }, 200)
})

app.delete('/api/wishlist/:productId', (req, res) => {
  wishlistItems = wishlistItems.filter(p => p.id !== req.params.productId)
  
  setTimeout(() => {
    res.json({ success: true, message: 'Removed from wishlist' })
  }, 200)
})

app.get('/api/orders', (req, res) => {
  setTimeout(() => {
    res.json({ orders: [] })
  }, 200)
})

app.get('/api/orders/:id', (req, res) => {
  setTimeout(() => {
    res.status(404).json({ error: 'Order not found' })
  }, 200)
})

app.listen(PORT, () => {
  console.log(`🚀 Mock API Server running on http://localhost:${PORT}`)
  console.log(`📚 API Endpoints available at http://localhost:${PORT}/api`)
  console.log(`✅ Ready to accept requests`)
})



