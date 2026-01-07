import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'
import Wishlist from './pages/Wishlist'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import ProductComparison from './pages/ProductComparison'
import TrackOrder from './pages/TrackOrder'
import Notification from './pages/Notification'
import LiveChat from './pages/LiveChat'
import CustomerReviews from './pages/CustomerReviews'
import SellerProductManagement from './pages/seller/ProductManagement'
import SellerAddProduct from './pages/seller/AddProduct'
import SellerOrderManagement from './pages/seller/OrderManagement'
import LoyaltyProgram from './pages/LoyaltyProgram'
import FAQ from './pages/FAQ'
import Terms from './pages/Terms'
import PrivacyPolicy from './pages/PrivacyPolicy'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:slug" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<Account />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="comparison" element={<ProductComparison />} />
          <Route path="track-order" element={<TrackOrder />} />
          <Route path="notifications" element={<Notification />} />
          <Route path="chat" element={<LiveChat />} />
          <Route path="reviews/:productId" element={<CustomerReviews />} />
          <Route path="loyalty" element={<LoyaltyProgram />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          
          <Route path="seller/products" element={<SellerProductManagement />} />
          <Route path="seller/products/add" element={<SellerAddProduct />} />
          <Route path="seller/orders" element={<SellerOrderManagement />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App

