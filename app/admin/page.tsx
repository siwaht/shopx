"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Settings,
  BarChart3,
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  Menu,
  X,
  Search,
  Bell,
  Plus,
  MoreHorizontal,
  ArrowUpRight,
  CreditCard,
  Webhook,
  Cpu,
  Palette,
  Save,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Edit3,
  GripVertical,
  Filter,
  Download,
  Globe,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { ContentProvider, useContent } from "@/lib/content-context"

// Navigation items
const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { name: "Content Editor", icon: Palette, id: "content" },
  { name: "Products", icon: Package, id: "products" },
  { name: "Orders", icon: ShoppingCart, id: "orders" },
  { name: "Customers", icon: Users, id: "customers" },
  { name: "Payments", icon: CreditCard, id: "payments" },
  { name: "Webhooks", icon: Webhook, id: "webhooks" },
  { name: "MCP", icon: Cpu, id: "mcp" },
  { name: "Analytics", icon: BarChart3, id: "analytics" },
  { name: "Settings", icon: Settings, id: "settings" },
]

// Stats data
const stats = [
  { name: "Total Revenue", value: "$45,231", change: "+12.5%", trend: "up", icon: DollarSign },
  { name: "Total Orders", value: "1,234", change: "+8.2%", trend: "up", icon: ShoppingCart },
  { name: "Active Customers", value: "5,678", change: "+15.3%", trend: "up", icon: Users },
  { name: "Page Views", value: "89,432", change: "-2.4%", trend: "down", icon: Eye },
]

// Recent orders
const recentOrders = [
  { id: "ORD-001", customer: "Sarah Johnson", email: "sarah@email.com", total: 680, status: "completed", date: "2 hours ago", items: 3 },
  { id: "ORD-002", customer: "Michael Chen", email: "michael@email.com", total: 495, status: "processing", date: "4 hours ago", items: 2 },
  { id: "ORD-003", customer: "Emma Williams", email: "emma@email.com", total: 1250, status: "shipped", date: "6 hours ago", items: 4 },
  { id: "ORD-004", customer: "James Brown", email: "james@email.com", total: 385, status: "pending", date: "8 hours ago", items: 1 },
  { id: "ORD-005", customer: "Olivia Davis", email: "olivia@email.com", total: 890, status: "completed", date: "12 hours ago", items: 2 },
]

// Top products
const topProducts = [
  { name: "Ocean Silk Tie", sales: 234, revenue: 43290, image: "/images/bestseller-7.jpg" },
  { name: "Saffron Leather Clutch", sales: 189, revenue: 93555, image: "/images/bestseller-6.jpg" },
  { name: "Coral Cashmere Sweater", sales: 156, revenue: 60060, image: "/images/bestseller-5.jpg" },
  { name: "Azure Linen Blazer", sales: 142, revenue: 98690, image: "/images/bestseller-4.jpg" },
]

// Initial content state - removed, now using content context

// Webhook templates
const webhookTemplates = [
  { id: 1, name: "Order Created", url: "https://api.example.com/webhooks/orders", events: ["order.created"], status: "active" },
  { id: 2, name: "Payment Received", url: "https://api.example.com/webhooks/payments", events: ["payment.completed"], status: "active" },
  { id: 3, name: "Inventory Update", url: "https://api.example.com/webhooks/inventory", events: ["product.updated"], status: "inactive" },
]

// Payment providers
const paymentProviders = [
  { id: "stripe", name: "Stripe", description: "Credit cards, Apple Pay, Google Pay", connected: true, icon: "💳" },
  { id: "paypal", name: "PayPal", description: "PayPal and Venmo", connected: true, icon: "🅿️" },
  { id: "cod", name: "Cash on Delivery", description: "Pay when you receive your order", connected: true, icon: "💵" },
  { id: "klarna", name: "Klarna", description: "Buy now, pay later", connected: false, icon: "🛒" },
  { id: "affirm", name: "Affirm", description: "Monthly payments", connected: false, icon: "💰" },
]

// MCP Connections
const mcpConnections = [
  { id: "openai", name: "OpenAI", description: "GPT models for product descriptions", status: "connected", model: "gpt-4" },
  { id: "anthropic", name: "Anthropic", description: "Claude for customer support", status: "connected", model: "claude-3" },
  { id: "stability", name: "Stability AI", description: "Image generation for products", status: "disconnected", model: null },
]

// Products data
const productsData = [
  { id: 1, name: "Royal Velvet Blazer", price: 1495, stock: 24, category: "Outerwear", status: "active", image: "/images/product-blue-blazer.jpg" },
  { id: 2, name: "Marigold Cashmere Scarf", price: 385, stock: 56, category: "Accessories", status: "active", image: "/images/product-yellow-scarf.jpg" },
  { id: 3, name: "Italian Leather Loafers", price: 595, stock: 18, category: "Footwear", status: "active", image: "/images/bestseller-3.jpg" },
  { id: 4, name: "Amethyst Silk Dress", price: 1295, stock: 12, category: "Dresses", status: "active", image: "/images/product-purple-dress.jpg" },
  { id: 5, name: "Coral Oversized Coat", price: 1695, stock: 8, category: "Outerwear", status: "low_stock", image: "/images/product-orange-coat.jpg" },
  { id: 6, name: "Saffron Leather Clutch", price: 495, stock: 32, category: "Bags", status: "active", image: "/images/bestseller-6.jpg" },
  { id: 7, name: "Ocean Silk Tie", price: 185, stock: 45, category: "Accessories", status: "active", image: "/images/bestseller-7.jpg" },
  { id: 8, name: "Linen Wide-Leg Trousers", price: 445, stock: 0, category: "Bottoms", status: "out_of_stock", image: "/images/bestseller-4.jpg" },
]

// Customers data
const customersData = [
  { id: 1, name: "Sarah Johnson", email: "sarah@email.com", orders: 12, spent: 4580, joined: "Jan 2024", status: "active" },
  { id: 2, name: "Michael Chen", email: "michael@email.com", orders: 8, spent: 2340, joined: "Feb 2024", status: "active" },
  { id: 3, name: "Emma Williams", email: "emma@email.com", orders: 23, spent: 8920, joined: "Dec 2023", status: "vip" },
  { id: 4, name: "James Brown", email: "james@email.com", orders: 3, spent: 890, joined: "Mar 2024", status: "active" },
  { id: 5, name: "Olivia Davis", email: "olivia@email.com", orders: 15, spent: 5670, joined: "Jan 2024", status: "active" },
  { id: 6, name: "Ahmed Hassan", email: "ahmed@email.com", orders: 7, spent: 3200, joined: "Feb 2024", status: "active" },
  { id: 7, name: "Fatima Al-Said", email: "fatima@email.com", orders: 19, spent: 7450, joined: "Nov 2023", status: "vip" },
]

// Analytics data
const analyticsData = {
  revenue: [
    { month: "Jan", value: 32000 },
    { month: "Feb", value: 28000 },
    { month: "Mar", value: 45000 },
    { month: "Apr", value: 38000 },
    { month: "May", value: 52000 },
    { month: "Jun", value: 48000 },
  ],
  topCategories: [
    { name: "Outerwear", sales: 234, percentage: 35 },
    { name: "Dresses", sales: 189, percentage: 28 },
    { name: "Accessories", sales: 156, percentage: 23 },
    { name: "Footwear", sales: 94, percentage: 14 },
  ],
  trafficSources: [
    { source: "Direct", visits: 12450, percentage: 42 },
    { source: "Organic Search", visits: 8320, percentage: 28 },
    { source: "Social Media", visits: 5890, percentage: 20 },
    { source: "Email", visits: 2940, percentage: 10 },
  ],
}

export default function AdminPage() {
  return (
    <ContentProvider>
      <AdminPageContent />
    </ContentProvider>
  )
}

function AdminPageContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")
  const { content, updateNestedContent, resetContent, saveContent, isSaving } = useContent()
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [webhooks, setWebhooks] = useState(webhookTemplates)
  const [payments, setPayments] = useState(paymentProviders)
  const [mcpServices, setMcpServices] = useState(mcpConnections)
  const [productFilter, setProductFilter] = useState("all")
  const [orderFilter, setOrderFilter] = useState("all")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  const getProductStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "low_stock":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "out_of_stock":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCustomerStatusColor = (status: string) => {
    switch (status) {
      case "vip":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSaveContent = async () => {
    setSaveStatus("saving")
    await saveContent()
    setSaveStatus("saved")
    setTimeout(() => setSaveStatus("idle"), 2000)
  }

  const handleResetContent = () => {
    resetContent()
    setSaveStatus("idle")
  }

  const updateContent = (section: keyof typeof content, field: string, value: unknown) => {
    updateNestedContent(section, field, value)
  }

  const toggleWebhookStatus = (id: number) => {
    setWebhooks((prev) =>
      prev.map((wh) =>
        wh.id === id ? { ...wh, status: wh.status === "active" ? "inactive" : "active" } : wh
      )
    )
  }

  const togglePaymentProvider = (id: string) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, connected: !p.connected } : p))
    )
  }

  const toggleMcpService = (id: string) => {
    setMcpServices((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "connected" ? "disconnected" : "connected" }
          : s
      )
    )
  }

  const filteredProducts = productsData.filter((p) => {
    if (productFilter === "all") return true
    return p.status === productFilter
  })

  const filteredOrders = recentOrders.filter((o) => {
    if (orderFilter === "all") return true
    return o.status === orderFilter
  })

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-background border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-border">
            <Link href="/" className="font-serif text-xl tracking-[0.1em] text-primary">
              MAISON
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id)
                  setSidebarOpen(false)
                }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-left",
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-border">
            <Button asChild variant="outline" className="w-full justify-start bg-transparent">
              <Link href="/">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Store
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background px-4 sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex-1 flex items-center gap-4">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-9 bg-muted/50 border-0 focus-visible:ring-1"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary rounded-full" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-medium text-primary">AD</span>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">

          {/* Dashboard Section */}
          {activeSection === "dashboard" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-serif tracking-tight">Dashboard</h1>
                  <p className="text-muted-foreground text-sm mt-1">
                    Welcome back! Here&apos;s what&apos;s happening with your store.
                  </p>
                </div>
                <Button className="self-start sm:self-auto" onClick={() => setActiveSection("products")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                  <Card key={stat.name} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <stat.icon className="h-5 w-5 text-primary" />
                        </div>
                        <span
                          className={cn(
                            "flex items-center gap-1 text-xs font-medium",
                            stat.trend === "up" ? "text-green-600" : "text-red-600"
                          )}
                        >
                          {stat.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {stat.change}
                        </span>
                      </div>
                      <div className="mt-3">
                        <p className="text-2xl font-semibold">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.name}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent hover:bg-primary/5" onClick={() => setActiveSection("content")}>
                  <Palette className="h-5 w-5 text-primary" />
                  <span className="text-xs">Edit Content</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent hover:bg-primary/5" onClick={() => setActiveSection("payments")}>
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span className="text-xs">Payments</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent hover:bg-primary/5" onClick={() => setActiveSection("webhooks")}>
                  <Webhook className="h-5 w-5 text-primary" />
                  <span className="text-xs">Webhooks</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-transparent hover:bg-primary/5" onClick={() => setActiveSection("mcp")}>
                  <Cpu className="h-5 w-5 text-primary" />
                  <span className="text-xs">MCP</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-lg">Recent Orders</CardTitle>
                      <CardDescription>Latest customer orders</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary" onClick={() => setActiveSection("orders")}>
                      View all <ArrowUpRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto -mx-6 px-6">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order</TableHead>
                            <TableHead className="hidden sm:table-cell">Customer</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentOrders.slice(0, 5).map((order) => (
                            <TableRow key={order.id}>
                              <TableCell>
                                <p className="font-medium">{order.id}</p>
                                <p className="text-xs text-muted-foreground sm:hidden">{order.customer}</p>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <p className="font-medium">{order.customer}</p>
                                <p className="text-xs text-muted-foreground">{order.date}</p>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary" className={cn("capitalize", getStatusColor(order.status))}>
                                  {order.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right font-medium">{formatPrice(order.total)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Top Products</CardTitle>
                    <CardDescription>Best selling items this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topProducts.map((product, index) => (
                        <div key={product.name} className="flex items-center gap-3">
                          <span className="text-sm font-medium text-muted-foreground w-4">{index + 1}</span>
                          <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                          </div>
                          <p className="text-sm font-medium">{formatPrice(product.revenue)}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* Products Section */}
          {activeSection === "products" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-serif tracking-tight">Products</h1>
                  <p className="text-muted-foreground text-sm mt-1">Manage your product inventory</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search products..." className="pl-9" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Select value={productFilter} onValueChange={setProductFilter}>
                        <SelectTrigger className="w-[140px]">
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Products</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="low_stock">Low Stock</SelectItem>
                          <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto -mx-6 px-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="w-10" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                                </div>
                                <span className="font-medium">{product.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{formatPrice(product.price)}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>
                              <Badge variant="secondary" className={cn("capitalize", getProductStatusColor(product.status))}>
                                {product.status.replace("_", " ")}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Orders Section */}
          {activeSection === "orders" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-serif tracking-tight">Orders</h1>
                  <p className="text-muted-foreground text-sm mt-1">Manage customer orders</p>
                </div>
                <Button variant="outline" className="bg-transparent self-start sm:self-auto">
                  <Download className="h-4 w-4 mr-2" />
                  Export Orders
                </Button>
              </div>

              <Card>
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search orders..." className="pl-9" />
                    </div>
                    <Select value={orderFilter} onValueChange={setOrderFilter}>
                      <SelectTrigger className="w-[140px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Orders</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto -mx-6 px-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden sm:table-cell">Items</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                          <TableHead className="w-10" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{order.customer}</p>
                                <p className="text-xs text-muted-foreground">{order.email}</p>
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{order.items} items</TableCell>
                            <TableCell>
                              <Badge variant="secondary" className={cn("capitalize", getStatusColor(order.status))}>
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{order.date}</TableCell>
                            <TableCell className="text-right font-medium">{formatPrice(order.total)}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Customers Section */}
          {activeSection === "customers" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-serif tracking-tight">Customers</h1>
                  <p className="text-muted-foreground text-sm mt-1">Manage your customer base</p>
                </div>
                <Button variant="outline" className="bg-transparent self-start sm:self-auto">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-semibold">{customersData.length}</p>
                        <p className="text-sm text-muted-foreground">Total Customers</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-semibold">{customersData.filter(c => c.status === "vip").length}</p>
                        <p className="text-sm text-muted-foreground">VIP Customers</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-semibold">{formatPrice(customersData.reduce((sum, c) => sum + c.spent, 0))}</p>
                        <p className="text-sm text-muted-foreground">Total Revenue</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-4">
                  <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search customers..." className="pl-9" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto -mx-6 px-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden sm:table-cell">Orders</TableHead>
                          <TableHead>Total Spent</TableHead>
                          <TableHead className="hidden md:table-cell">Joined</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="w-10" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {customersData.map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <span className="text-xs font-medium text-primary">
                                    {customer.name.split(" ").map(n => n[0]).join("")}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium">{customer.name}</p>
                                  <p className="text-xs text-muted-foreground">{customer.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{customer.orders}</TableCell>
                            <TableCell className="font-medium">{formatPrice(customer.spent)}</TableCell>
                            <TableCell className="hidden md:table-cell text-muted-foreground">{customer.joined}</TableCell>
                            <TableCell>
                              <Badge variant="secondary" className={cn("capitalize", getCustomerStatusColor(customer.status))}>
                                {customer.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Analytics Section */}
          {activeSection === "analytics" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-serif tracking-tight">Analytics</h1>
                  <p className="text-muted-foreground text-sm mt-1">Track your store performance</p>
                </div>
                <Select defaultValue="6months">
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="6months">Last 6 months</SelectItem>
                    <SelectItem value="1year">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Revenue Overview</CardTitle>
                    <CardDescription>Monthly revenue for the last 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.revenue.map((item) => (
                        <div key={item.month} className="flex items-center gap-4">
                          <span className="w-10 text-sm text-muted-foreground">{item.month}</span>
                          <div className="flex-1 h-8 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${(item.value / 52000) * 100}%` }}
                            />
                          </div>
                          <span className="w-20 text-sm font-medium text-right">{formatPrice(item.value)}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Categories</CardTitle>
                    <CardDescription>Sales by product category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.topCategories.map((category) => (
                        <div key={category.name} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{category.name}</span>
                            <span className="text-muted-foreground">{category.sales} sales ({category.percentage}%)</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${category.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Traffic Sources</CardTitle>
                  <CardDescription>Where your visitors come from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {analyticsData.trafficSources.map((source) => (
                      <div key={source.source} className="p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{source.source}</span>
                        </div>
                        <p className="text-2xl font-semibold">{source.visits.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{source.percentage}% of total</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Settings Section */}
          {activeSection === "settings" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-serif tracking-tight">Settings</h1>
                  <p className="text-muted-foreground text-sm mt-1">Manage your store settings</p>
                </div>
              </div>

              <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                  <Card>
                    <CardHeader>
                      <CardTitle>Store Information</CardTitle>
                      <CardDescription>Basic information about your store</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="storeName">Store Name</Label>
                          <Input id="storeName" defaultValue="MAISON" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="storeEmail">Contact Email</Label>
                          <Input id="storeEmail" type="email" defaultValue="contact@maison.com" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="storePhone">Phone Number</Label>
                          <Input id="storePhone" defaultValue="+1 (555) 123-4567" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="storeCurrency">Currency</Label>
                          <Select defaultValue="usd">
                            <SelectTrigger id="storeCurrency">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="usd">USD ($)</SelectItem>
                              <SelectItem value="eur">EUR (€)</SelectItem>
                              <SelectItem value="gbp">GBP (£)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="storeAddress">Address</Label>
                        <Textarea id="storeAddress" defaultValue="123 Fashion Avenue, New York, NY 10001" />
                      </div>
                      <Button>Save Changes</Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Choose what notifications you receive</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Order Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive alerts for new orders</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Low Stock Alerts</Label>
                          <p className="text-sm text-muted-foreground">Get notified when products are running low</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Customer Reviews</Label>
                          <p className="text-sm text-muted-foreground">Notifications for new customer reviews</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Marketing Emails</Label>
                          <p className="text-sm text-muted-foreground">Receive tips and product updates</p>
                        </div>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>Manage your account security</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <Lock className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                          </div>
                        </div>
                        <Switch />
                      </div>
                      <div className="space-y-2">
                        <Label>Change Password</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input type="password" placeholder="Current password" />
                          <Input type="password" placeholder="New password" />
                        </div>
                        <Button variant="outline" className="mt-2 bg-transparent">Update Password</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}

          {/* Content Editor Section */}
          {activeSection === "content" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-serif tracking-tight">Content Editor</h1>
                  <p className="text-muted-foreground text-sm mt-1">Customize your storefront content</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={handleResetContent} className="bg-transparent">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button onClick={handleSaveContent} disabled={saveStatus === "saving"}>
                    {saveStatus === "saving" ? (
                      <>Saving...</>
                    ) : saveStatus === "saved" ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="header" className="space-y-6">
                <TabsList className="bg-muted/50 flex-wrap h-auto gap-1 p-1">
                  <TabsTrigger value="header">Header</TabsTrigger>
                  <TabsTrigger value="hero">Hero</TabsTrigger>
                  <TabsTrigger value="collections">Collections</TabsTrigger>
                  <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
                </TabsList>

                <TabsContent value="header">
                  <Card>
                    <CardHeader>
                      <CardTitle>Header Settings</CardTitle>
                      <CardDescription>Customize your site header and navigation</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="logo">Logo Text</Label>
                          <Input
                            id="logo"
                            value={content.header.logo}
                            onChange={(e) => updateContent("header", "logo", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="announcement">Announcement Bar</Label>
                          <Input
                            id="announcement"
                            value={content.header.announcement}
                            onChange={(e) => updateContent("header", "announcement", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={content.header.showAnnouncement}
                          onCheckedChange={(checked) => updateContent("header", "showAnnouncement", checked)}
                        />
                        <Label>Show Announcement Bar</Label>
                      </div>
                      <div className="space-y-3">
                        <Label>Navigation Menu</Label>
                        {content.header.menuItems.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                            <Input
                              value={item.label}
                              onChange={(e) => {
                                const newItems = [...content.header.menuItems]
                                newItems[index] = { ...newItems[index], label: e.target.value }
                                updateContent("header", "menuItems", newItems)
                              }}
                              className="flex-1"
                              placeholder="Label"
                            />
                            <Input
                              value={item.href}
                              onChange={(e) => {
                                const newItems = [...content.header.menuItems]
                                newItems[index] = { ...newItems[index], href: e.target.value }
                                updateContent("header", "menuItems", newItems)
                              }}
                              className="flex-1"
                              placeholder="Link"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="hero">
                  <Card>
                    <CardHeader>
                      <CardTitle>Hero Section</CardTitle>
                      <CardDescription>Customize your homepage hero</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="heroBadge">Badge Text</Label>
                          <Input
                            id="heroBadge"
                            value={content.hero.badge}
                            onChange={(e) => updateContent("hero", "badge", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="heroHighlight">Highlight Word</Label>
                          <Input
                            id="heroHighlight"
                            value={content.hero.highlightWord}
                            onChange={(e) => updateContent("hero", "highlightWord", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="heroHeadline">Headline</Label>
                        <Input
                          id="heroHeadline"
                          value={content.hero.headline}
                          onChange={(e) => updateContent("hero", "headline", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="heroDescription">Description</Label>
                        <Textarea
                          id="heroDescription"
                          value={content.hero.description}
                          onChange={(e) => updateContent("hero", "description", e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Primary Button</Label>
                          <Input
                            value={content.hero.primaryButton.text}
                            onChange={(e) => updateContent("hero", "primaryButton", { ...content.hero.primaryButton, text: e.target.value })}
                            placeholder="Button text"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Secondary Button</Label>
                          <Input
                            value={content.hero.secondaryButton.text}
                            onChange={(e) => updateContent("hero", "secondaryButton", { ...content.hero.secondaryButton, text: e.target.value })}
                            placeholder="Button text"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="collections">
                  <Card>
                    <CardHeader>
                      <CardTitle>Featured Collections</CardTitle>
                      <CardDescription>Customize the collections section</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="collectionsBadge">Badge Text</Label>
                        <Input
                          id="collectionsBadge"
                          value={content.featuredCollections.badge}
                          onChange={(e) => updateContent("featuredCollections", "badge", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="collectionsHeadline">Headline</Label>
                        <Input
                          id="collectionsHeadline"
                          value={content.featuredCollections.headline}
                          onChange={(e) => updateContent("featuredCollections", "headline", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="collectionsDescription">Description</Label>
                        <Textarea
                          id="collectionsDescription"
                          value={content.featuredCollections.description}
                          onChange={(e) => updateContent("featuredCollections", "description", e.target.value)}
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="testimonials">
                  <Card>
                    <CardHeader>
                      <CardTitle>Testimonials Section</CardTitle>
                      <CardDescription>Customize the testimonials section</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="testimonialsBadge">Badge Text</Label>
                        <Input
                          id="testimonialsBadge"
                          value={content.testimonials.badge}
                          onChange={(e) => updateContent("testimonials", "badge", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="testimonialsHeadline">Headline</Label>
                        <Input
                          id="testimonialsHeadline"
                          value={content.testimonials.headline}
                          onChange={(e) => updateContent("testimonials", "headline", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="testimonialsDescription">Description</Label>
                        <Textarea
                          id="testimonialsDescription"
                          value={content.testimonials.description}
                          onChange={(e) => updateContent("testimonials", "description", e.target.value)}
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}

          {/* Payments Section */}
          {activeSection === "payments" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-serif tracking-tight">Payments</h1>
                  <p className="text-muted-foreground text-sm mt-1">Manage payment providers and settings</p>
                </div>
              </div>

              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Providers</CardTitle>
                    <CardDescription>Connect and manage your payment methods</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {payments.map((provider) => (
                        <div
                          key={provider.id}
                          className="flex items-center justify-between p-4 rounded-lg border border-border"
                        >
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                              {provider.icon}
                            </div>
                            <div>
                              <p className="font-medium">{provider.name}</p>
                              <p className="text-sm text-muted-foreground">{provider.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={provider.connected ? "default" : "secondary"}>
                              {provider.connected ? "Connected" : "Not Connected"}
                            </Badge>
                            <Switch
                              checked={provider.connected}
                              onCheckedChange={() => togglePaymentProvider(provider.id)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Transaction Settings</CardTitle>
                    <CardDescription>Configure how transactions are processed</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Automatic Capture</Label>
                        <p className="text-sm text-muted-foreground">Automatically capture payments when orders are placed</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Save Payment Methods</Label>
                        <p className="text-sm text-muted-foreground">Allow customers to save payment methods for faster checkout</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Fraud Detection</Label>
                        <p className="text-sm text-muted-foreground">Enable advanced fraud detection for all transactions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* Webhooks Section */}
          {activeSection === "webhooks" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-serif tracking-tight">Webhooks</h1>
                  <p className="text-muted-foreground text-sm mt-1">Manage webhook endpoints and events</p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Webhook
                </Button>
              </div>

              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Webhook Endpoints</CardTitle>
                    <CardDescription>Configure endpoints to receive event notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {webhooks.map((webhook) => (
                        <div
                          key={webhook.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-border"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium">{webhook.name}</p>
                              <Badge variant={webhook.status === "active" ? "default" : "secondary"}>
                                {webhook.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{webhook.url}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {webhook.events.map((event) => (
                                <Badge key={event} variant="outline" className="text-xs">
                                  {event}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={webhook.status === "active"}
                              onCheckedChange={() => toggleWebhookStatus(webhook.id)}
                            />
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Available Events</CardTitle>
                    <CardDescription>Events that can trigger webhook notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="orders">
                        <AccordionTrigger>Order Events</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 text-sm">
                            <p className="text-muted-foreground">order.created, order.updated, order.completed, order.cancelled</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="payments">
                        <AccordionTrigger>Payment Events</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 text-sm">
                            <p className="text-muted-foreground">payment.completed, payment.failed, payment.refunded</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="products">
                        <AccordionTrigger>Product Events</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 text-sm">
                            <p className="text-muted-foreground">product.created, product.updated, product.deleted, product.low_stock</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="customers">
                        <AccordionTrigger>Customer Events</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 text-sm">
                            <p className="text-muted-foreground">customer.created, customer.updated, customer.deleted</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* MCP Section */}
          {activeSection === "mcp" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-serif tracking-tight">MCP Connections</h1>
                  <p className="text-muted-foreground text-sm mt-1">Manage AI service integrations</p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Connection
                </Button>
              </div>

              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Services</CardTitle>
                    <CardDescription>Connect AI services to enhance your store</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mcpServices.map((service) => (
                        <div
                          key={service.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-border"
                        >
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Cpu className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{service.name}</p>
                                {service.status === "connected" ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                ) : (
                                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{service.description}</p>
                              {service.model && (
                                <Badge variant="outline" className="mt-1 text-xs">
                                  {service.model}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant={service.status === "connected" ? "outline" : "default"}
                              size="sm"
                              onClick={() => toggleMcpService(service.id)}
                              className={service.status === "connected" ? "bg-transparent" : ""}
                            >
                              {service.status === "connected" ? "Disconnect" : "Connect"}
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>AI Features</CardTitle>
                    <CardDescription>Enable AI-powered features for your store</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Product Descriptions</Label>
                        <p className="text-sm text-muted-foreground">Auto-generate product descriptions using AI</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Customer Support</Label>
                        <p className="text-sm text-muted-foreground">AI-powered chatbot for customer inquiries</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Image Enhancement</Label>
                        <p className="text-sm text-muted-foreground">Automatically enhance product images</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Personalized Recommendations</Label>
                        <p className="text-sm text-muted-foreground">Show AI-powered product recommendations</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

        </main>
      </div>
    </div>
  )
}
