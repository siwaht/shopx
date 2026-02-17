// In-memory store for the entire site data
// This serves as the single source of truth for admin panel and frontend
// API routes expose this data for MCP/AI agent operations

export interface Product {
  id: number
  name: string
  price: number
  originalPrice: number | null
  stock: number
  status: string
  category: string
  image: string
  color: string
  description: string
  isNew: boolean
  rating: number
  reviews: number
}

export interface Order {
  id: string
  customer: string
  email: string
  total: number
  items: number
  status: string
  date: string
  payment: string
  address: string
  products: { name: string; qty: number; price: number }[]
}

export interface Customer {
  id: number
  name: string
  email: string
  location: string
  orders: number
  spent: number
  joined: string
  status: string
  recentOrders: { id: string; date: string; total: number; status: string }[]
}

export interface StoreSettings {
  storeName: string
  contactEmail: string
  phone: string
  currency: string
  description: string
  address: string
  notifications: {
    newOrders: boolean
    lowStock: boolean
    reviews: boolean
    weeklyReports: boolean
    marketing: boolean
  }
  payments: {
    creditCards: boolean
    paypal: boolean
    applePay: boolean
    googlePay: boolean
    bankTransfer: boolean
  }
}

export interface SiteContent {
  header: {
    logo: string
    announcement: string
    showAnnouncement: boolean
    menuItems?: { label: string; href: string }[]
  }
  hero: {
    badge: string
    headline: string
    highlightWord: string
    description: string
    primaryButtonText: string
    secondaryButtonText: string
    heroImage: string
  }
  featuredCollections: { badge: string; headline: string; description: string }
  testimonials: { badge: string; headline: string; description: string }
  newsletter: { badge: string; headline: string; description: string }
  footer: { description: string; copyright: string }
}

// ─── Default Data ───────────────────────────────────────────────

const defaultProducts: Product[] = [
  { id: 1, name: "Royal Velvet Blazer", price: 1495, originalPrice: null, stock: 24, status: "active", category: "Outerwear", image: "/images/product-blue-blazer.jpg", color: "Sapphire Blue", description: "Luxurious velvet blazer with satin lining", isNew: true, rating: 4.9, reviews: 127 },
  { id: 2, name: "Marigold Cashmere Scarf", price: 385, originalPrice: 450, stock: 18, status: "active", category: "Accessories", image: "/images/product-yellow-scarf.jpg", color: "Golden Yellow", description: "Pure cashmere scarf in warm golden tones", isNew: false, rating: 4.8, reviews: 89 },
  { id: 3, name: "Italian Leather Loafers", price: 595, originalPrice: null, stock: 32, status: "active", category: "Footwear", image: "/images/bestseller-3.jpg", color: "Cognac Brown", description: "Handcrafted Italian leather loafers", isNew: false, rating: 5.0, reviews: 214 },
  { id: 4, name: "Amethyst Silk Dress", price: 1295, originalPrice: null, stock: 15, status: "active", category: "Dresses", image: "/images/product-purple-dress.jpg", color: "Deep Purple", description: "Flowing silk dress with elegant draping", isNew: true, rating: 4.9, reviews: 156 },
  { id: 5, name: "Coral Oversized Coat", price: 1695, originalPrice: 1895, stock: 8, status: "low_stock", category: "Outerwear", image: "/images/product-orange-coat.jpg", color: "Sunset Orange", description: "Statement oversized coat in vibrant coral", isNew: false, rating: 4.7, reviews: 98 },
  { id: 6, name: "Saffron Leather Clutch", price: 495, originalPrice: null, stock: 45, status: "active", category: "Bags", image: "/images/bestseller-6.jpg", color: "Bright Yellow", description: "Compact leather clutch with gold hardware", isNew: true, rating: 4.8, reviews: 73 },
  { id: 7, name: "Ocean Silk Tie", price: 185, originalPrice: null, stock: 56, status: "active", category: "Accessories", image: "/images/bestseller-7.jpg", color: "Blue & Gold", description: "Hand-printed silk tie with ocean motif", isNew: false, rating: 4.9, reviews: 167 },
  { id: 8, name: "Linen Wide-Leg Trousers", price: 425, originalPrice: 525, stock: 22, status: "active", category: "Trousers", image: "/images/bestseller-4.jpg", color: "Oatmeal", description: "Relaxed-fit linen trousers for effortless style", isNew: false, rating: 4.6, reviews: 142 },
  { id: 9, name: "Midnight Velvet Dress", price: 890, originalPrice: null, stock: 0, status: "out_of_stock", category: "Dresses", image: "/images/bestseller-1.jpg", color: "Midnight Black", description: "Elegant velvet evening dress", isNew: false, rating: 4.8, reviews: 201 },
  { id: 10, name: "Pearl Silk Blouse", price: 320, originalPrice: null, stock: 8, status: "low_stock", category: "Tops", image: "/images/bestseller-2.jpg", color: "Pearl White", description: "Delicate silk blouse with pearl buttons", isNew: false, rating: 4.7, reviews: 134 },
  { id: 11, name: "Golden Hour Scarf", price: 245, originalPrice: null, stock: 38, status: "active", category: "Accessories", image: "/images/bestseller-3.jpg", color: "Warm Gold", description: "Lightweight scarf perfect for layering", isNew: false, rating: 4.5, reviews: 88 },
  { id: 12, name: "Emerald Wool Coat", price: 1250, originalPrice: null, stock: 5, status: "low_stock", category: "Outerwear", image: "/images/bestseller-8.jpg", color: "Forest Green", description: "Premium wool coat with silk lining", isNew: true, rating: 4.9, reviews: 176 },
]

const defaultOrders: Order[] = [
  { id: "ORD-001", customer: "Sarah Johnson", email: "sarah@email.com", total: 680, items: 3, status: "completed", date: "Feb 6, 2026", payment: "Paid", address: "123 Fifth Ave, New York, NY", products: [{ name: "Royal Velvet Blazer", qty: 1, price: 680 }] },
  { id: "ORD-002", customer: "Michael Chen", email: "michael@email.com", total: 495, items: 2, status: "processing", date: "Feb 6, 2026", payment: "Paid", address: "456 Market St, San Francisco, CA", products: [{ name: "Saffron Leather Clutch", qty: 1, price: 495 }] },
  { id: "ORD-003", customer: "Emma Williams", email: "emma@email.com", total: 1250, items: 4, status: "shipped", date: "Feb 5, 2026", payment: "Paid", address: "789 Oxford St, London, UK", products: [{ name: "Emerald Wool Coat", qty: 1, price: 1250 }] },
  { id: "ORD-004", customer: "James Brown", email: "james@email.com", total: 385, items: 1, status: "pending", date: "Feb 5, 2026", payment: "Pending", address: "321 Queen St, Toronto, CA", products: [{ name: "Marigold Cashmere Scarf", qty: 1, price: 385 }] },
  { id: "ORD-005", customer: "Olivia Davis", email: "olivia@email.com", total: 890, items: 3, status: "completed", date: "Feb 4, 2026", payment: "Paid", address: "654 Rue de Rivoli, Paris, FR", products: [{ name: "Midnight Velvet Dress", qty: 1, price: 890 }] },
  { id: "ORD-006", customer: "Liam Martinez", email: "liam@email.com", total: 1650, items: 5, status: "shipped", date: "Feb 4, 2026", payment: "Paid", address: "987 Ocean Dr, Miami, FL", products: [{ name: "Emerald Wool Coat", qty: 1, price: 1250 }, { name: "Ocean Silk Tie", qty: 2, price: 200 }] },
  { id: "ORD-007", customer: "Sophia Taylor", email: "sophia@email.com", total: 320, items: 1, status: "cancelled", date: "Feb 3, 2026", payment: "Refunded", address: "147 Friedrichstr, Berlin, DE", products: [{ name: "Pearl Silk Blouse", qty: 1, price: 320 }] },
  { id: "ORD-008", customer: "Noah Wilson", email: "noah@email.com", total: 745, items: 2, status: "completed", date: "Feb 3, 2026", payment: "Paid", address: "258 George St, Sydney, AU", products: [{ name: "Saffron Leather Clutch", qty: 1, price: 495 }, { name: "Golden Hour Scarf", qty: 1, price: 245 }] },
]

const defaultCustomers: Customer[] = [
  { id: 1, name: "Sarah Johnson", email: "sarah@email.com", location: "New York, US", orders: 12, spent: 8450, joined: "Jan 2025", status: "active", recentOrders: [{ id: "ORD-001", date: "Feb 6, 2026", total: 680, status: "completed" }, { id: "ORD-012", date: "Jan 15, 2026", total: 495, status: "completed" }] },
  { id: 2, name: "Michael Chen", email: "michael@email.com", location: "San Francisco, US", orders: 8, spent: 5230, joined: "Mar 2025", status: "active", recentOrders: [{ id: "ORD-002", date: "Feb 6, 2026", total: 495, status: "processing" }] },
  { id: 3, name: "Emma Williams", email: "emma@email.com", location: "London, UK", orders: 15, spent: 12680, joined: "Dec 2024", status: "vip", recentOrders: [{ id: "ORD-003", date: "Feb 5, 2026", total: 1250, status: "shipped" }, { id: "ORD-015", date: "Jan 20, 2026", total: 890, status: "completed" }] },
  { id: 4, name: "James Brown", email: "james@email.com", location: "Toronto, CA", orders: 3, spent: 1250, joined: "Nov 2025", status: "active", recentOrders: [{ id: "ORD-004", date: "Feb 5, 2026", total: 385, status: "pending" }] },
  { id: 5, name: "Olivia Davis", email: "olivia@email.com", location: "Paris, FR", orders: 21, spent: 18900, joined: "Sep 2024", status: "vip", recentOrders: [{ id: "ORD-005", date: "Feb 4, 2026", total: 890, status: "completed" }, { id: "ORD-018", date: "Jan 28, 2026", total: 1650, status: "completed" }] },
  { id: 6, name: "Liam Martinez", email: "liam@email.com", location: "Miami, US", orders: 6, spent: 3450, joined: "Jun 2025", status: "active", recentOrders: [{ id: "ORD-006", date: "Feb 4, 2026", total: 1650, status: "shipped" }] },
  { id: 7, name: "Sophia Taylor", email: "sophia@email.com", location: "Berlin, DE", orders: 1, spent: 320, joined: "Jan 2026", status: "new", recentOrders: [{ id: "ORD-007", date: "Feb 3, 2026", total: 320, status: "cancelled" }] },
  { id: 8, name: "Noah Wilson", email: "noah@email.com", location: "Sydney, AU", orders: 9, spent: 6780, joined: "Apr 2025", status: "active", recentOrders: [{ id: "ORD-008", date: "Feb 3, 2026", total: 745, status: "completed" }] },
]

const defaultContent: SiteContent = {
  header: {
    logo: "MAISON",
    announcement: "New Collection — Free shipping over $500",
    showAnnouncement: true,
    menuItems: [
      { label: "Home", href: "#hero" },
      { label: "Collections", href: "#collections" },
      { label: "Shop", href: "#products" },
    ],
  },
  hero: {
    badge: "Spring/Summer 2026",
    headline: "Discover Vibrant Elegance",
    highlightWord: "Vibrant",
    description: "Immerse yourself in a world of bold colors and impeccable craftsmanship. Our new collection celebrates the art of standing out with refined sophistication.",
    primaryButtonText: "Explore Collection",
    secondaryButtonText: "View Lookbook",
    heroImage: "/images/hero-vibrant.jpg",
  },
  featuredCollections: { badge: "Curated Selection", headline: "Featured Collections", description: "Explore our carefully curated collections." },
  testimonials: { badge: "Client Stories", headline: "Loved Worldwide", description: "Discover why fashion enthusiasts choose MAISON." },
  newsletter: { badge: "Stay Connected", headline: "Join Our World", description: "Subscribe to receive exclusive updates." },
  footer: { description: "Curating timeless elegance since 2010.", copyright: "© 2026 MAISON. All rights reserved." },
}

const defaultSettings: StoreSettings = {
  storeName: "MAISON",
  contactEmail: "concierge@maison.com",
  phone: "+1 (888) 555-0123",
  currency: "USD ($)",
  description: "Curating timeless elegance since 2010. We believe in the power of exceptional craftsmanship and sustainable luxury.",
  address: "123 Fashion Avenue, New York, NY 10001",
  notifications: { newOrders: true, lowStock: true, reviews: false, weeklyReports: true, marketing: false },
  payments: { creditCards: true, paypal: true, applePay: false, googlePay: false, bankTransfer: true },
}

// ─── Global Store (singleton) ───────────────────────────────────

class Store {
  products: Product[] = [...defaultProducts]
  orders: Order[] = [...defaultOrders]
  customers: Customer[] = [...defaultCustomers]
  settings: StoreSettings = { ...defaultSettings }
  content: SiteContent = { ...defaultContent }

  // Products
  getProducts() { return this.products }
  getProduct(id: number) { return this.products.find(p => p.id === id) }
  addProduct(product: Omit<Product, "id">) {
    const id = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1
    const newProduct = { ...product, id }
    this.products.push(newProduct)
    return newProduct
  }
  updateProduct(id: number, updates: Partial<Product>) {
    const index = this.products.findIndex(p => p.id === id)
    if (index === -1) return null
    this.products[index] = { ...this.products[index], ...updates }
    return this.products[index]
  }
  deleteProduct(id: number) {
    const index = this.products.findIndex(p => p.id === id)
    if (index === -1) return false
    this.products.splice(index, 1)
    return true
  }

  // Orders
  getOrders() { return this.orders }
  getOrder(id: string) { return this.orders.find(o => o.id === id) }
  addOrder(order: Order) {
    this.orders.push(order)
    return order
  }
  updateOrderStatus(id: string, status: string) {
    const order = this.orders.find(o => o.id === id)
    if (!order) return null
    order.status = status
    return order
  }

  // Customers
  getCustomers() { return this.customers }
  getCustomer(id: number) { return this.customers.find(c => c.id === id) }

  // Settings
  getSettings() { return this.settings }
  updateSettings(updates: Partial<StoreSettings>) {
    this.settings = { ...this.settings, ...updates }
    return this.settings
  }

  // Analytics
  getAnalytics() {
    const totalRevenue = this.orders.filter(o => o.status !== "cancelled").reduce((sum, o) => sum + o.total, 0)
    const totalOrders = this.orders.length
    const totalCustomers = this.customers.length
    const completedOrders = this.orders.filter(o => o.status === "completed").length
    const pendingOrders = this.orders.filter(o => o.status === "pending").length
    const shippedOrders = this.orders.filter(o => o.status === "shipped").length
    const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0
    const vipCustomers = this.customers.filter(c => c.status === "vip").length
    const lowStockProducts = this.products.filter(p => p.stock > 0 && p.stock <= 10).length
    const outOfStockProducts = this.products.filter(p => p.stock === 0).length

    return {
      totalRevenue,
      totalOrders,
      totalCustomers,
      completedOrders,
      pendingOrders,
      shippedOrders,
      avgOrderValue,
      vipCustomers,
      lowStockProducts,
      outOfStockProducts,
      totalProducts: this.products.length,
    }
  }

  // Content
  getContent() { return this.content }
  updateContent(section: string, updates: Record<string, unknown>) {
    if (section in this.content) {
      (this.content as Record<string, unknown>)[section] = {
        ...(this.content as Record<string, Record<string, unknown>>)[section],
        ...updates,
      }
    }
    return this.content
  }

  // Reset to defaults
  reset() {
    this.products = [...defaultProducts]
    this.orders = [...defaultOrders]
    this.customers = [...defaultCustomers]
    this.settings = { ...defaultSettings }
  }
}

// Singleton instance
const globalStore = globalThis as unknown as { __store?: Store }
if (!globalStore.__store) {
  globalStore.__store = new Store()
}

export const store = globalStore.__store
