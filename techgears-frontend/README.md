# 🛒 TechGears E-Commerce Frontend

Modern technology e-commerce platform built with React 19, TypeScript, Tailwind CSS 4, and Vite.

> **⚠️ Important:** This project is designed to match the UI_TechGears.pdf design specification pixel-perfectly. Please refer to the design file for visual accuracy.

## 📸 Screenshots

[Coming soon - Will match PDF design exactly]

## Tech Stack

### Framework & Library Utama
- **React 19** - Library UI modern
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool yang cepat
- **Tailwind CSS 4** - Utility-first CSS framework

### State Management & Routing
- **Zustand** - State management yang ringan
- **React Router DOM** - Client-side routing

### Form & Validation
- **React Hook Form** - Performant form handling
- **Zod** - Schema validation

### UI & Icons
- **Lucide React** - Icon library
- **Headless UI** - Unstyled accessible components

### HTTP Client & Utilities
- **Axios** - HTTP client
- **clsx & tailwind-merge** - Conditional className utilities
- **date-fns** - Date formatting utilities

## Struktur Folder

```
src/
├── components/
│   └── layout/
│       ├── Layout.tsx
│       ├── Header.tsx
│       └── Footer.tsx
├── pages/
│   ├── Home.tsx
│   ├── Products.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Profile.tsx
│   ├── Orders.tsx
│   └── NotFound.tsx
├── store/
│   ├── cartStore.ts
│   └── authStore.ts
├── lib/
│   ├── utils.ts
│   └── axios.ts
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Laravel backend (optional - can use mock data)

### 1. Clone & Install
```bash
git clone <repository-url>
cd techgears-frontend
npm install
```

### 2. Environment Setup
Create `.env` file in root:
```env
VITE_API_URL=http://localhost:8000/api
VITE_USE_MOCK=false
VITE_API_TIMEOUT=10000
```

For mock API during development:
```env
VITE_USE_MOCK=true
```

### 3. Run Development Server
```bash
npm run dev
```

Application runs at: `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
npm run preview
```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check TypeScript errors |
| `npm run type-check` | Run TypeScript compiler check |

## Fitur

### Sudah Tersedia
✅ Routing dengan React Router
✅ State management (Cart & Auth) dengan Zustand
✅ Layout responsif dengan Tailwind CSS
✅ Halaman utama (Home, Products, Cart, Checkout, dll)
✅ Komponen Header & Footer
✅ Axios interceptor untuk authentication
✅ Utility functions (formatPrice, formatDate, cn)
✅ Type definitions untuk Product, Cart, Order, dll

### Yang Perlu Dikembangkan
- Integrasi dengan backend API
- Product listing dengan data real
- Search functionality
- Filter & sorting products
- Payment gateway integration
- Order tracking
- Product reviews & ratings
- Wishlist feature
- User profile management
- Address management

## Store Management

### Cart Store
```typescript
const { items, addItem, removeItem, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCartStore()
```

### Auth Store
```typescript
const { user, isAuthenticated, login, logout, updateUser } = useAuthStore()
```

## Utility Functions

### cn (className merger)
```typescript
import { cn } from '@/lib/utils'
cn('base-class', condition && 'conditional-class')
```

### formatPrice
```typescript
import { formatPrice } from '@/lib/utils'
formatPrice(1000000)
```

### formatDate
```typescript
import { formatDate } from '@/lib/utils'
formatDate(new Date())
```

## API Configuration

Axios instance sudah dikonfigurasi dengan:
- Base URL dari environment variable
- Automatic token injection dari localStorage
- Response interceptor untuk handle 401 errors
- Request/Response type safety

File: `src/lib/axios.ts`

## Styling

Project ini menggunakan Tailwind CSS dengan konfigurasi custom:
- Custom color palette (primary colors)
- Inter font family
- Custom scrollbar utilities
- Responsive breakpoints

## Type Definitions

Semua type definitions tersedia di `src/types/index.ts`:
- Product
- CartItem
- User
- Address
- Order
- Category

## 🌐 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Latest ✅ |
| Firefox | Latest ✅ |
| Safari | Latest ✅ |
| Edge | Latest ✅ |
| Mobile Safari | iOS 13+ ✅ |
| Mobile Chrome | Latest ✅ |

## 📚 Documentation

- [📊 Evaluation Report](./EVALUATION_REPORT.md) - Gap analysis & action plan
- [🔌 API Contract](./API_CONTRACT.md) - Backend integration guide
- [✅ Component Checklist](./COMPONENT_CHECKLIST.md) - Component completion status
- [🎨 Style Guide](./STYLE_GUIDE.md) - Design system & theming

## 🤝 Contributing

1. Follow the PDF design specification exactly
2. Maintain responsive design (mobile-first)
3. Keep accessibility in mind (WCAG AA)
4. Write semantic HTML
5. Test on multiple devices

## 📝 License

Private - TechGears Project

