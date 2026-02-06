"use client"

import { useState, useEffect } from "react"
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
  ArrowUpRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { name: "Products", icon: Package, id: "products" },
  { name: "Orders", icon: ShoppingCart, id: "orders" },
  { name: "Customers", icon: Users, id: "customers" },
  { name: "Analytics", icon: BarChart3, id: "analytics" },
  { name: "Settings", icon: Settings, id: "settings" },
]

const stats = [
  { name: "Total Revenue", value: "$45,231", change: "+12.5%", trend: "up", Icon: DollarSign },
  { name: "Total Orders", value: "1,234", change: "+8.2%", trend: "up", Icon: ShoppingCart },
  { name: "Active Customers", value: "5,678", change: "+15.3%", trend: "up", Icon: Users },
  { name: "Page Views", value: "89,432", change: "-2.4%", trend: "down", Icon: Eye },
]

const recentOrders = [
  { id: "ORD-001", customer: "Sarah Johnson", total: 680, status: "completed", date: "2 hours ago" },
  { id: "ORD-002", customer: "Michael Chen", total: 495, status: "processing", date: "4 hours ago" },
  { id: "ORD-003", customer: "Emma Williams", total: 1250, status: "shipped", date: "6 hours ago" },
  { id: "ORD-004", customer: "James Brown", total: 385, status: "pending", date: "8 hours ago" },
  { id: "ORD-005", customer: "Olivia Davis", total: 890, status: "completed", date: "12 hours ago" },
]

const topProducts = [
  { name: "Ocean Silk Tie", sales: 234, revenue: 43290, image: "/images/bestseller-7.jpg" },
  { name: "Saffron Leather Clutch", sales: 189, revenue: 93555, image: "/images/bestseller-6.jpg" },
  { name: "Coral Cashmere Sweater", sales: 156, revenue: 60060, image: "/images/bestseller-5.jpg" },
  { name: "Azure Linen Blazer", sales: 142, revenue: 98690, image: "/images/bestseller-4.jpg" },
]

export default function AdminPage() {
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")

  useEffect(() => {
    setMounted(true)
  }, [])

  const formatPrice = (price: number) => {
    return "$" + price.toLocaleString()
  }

  const getStatusStyle = (status: string) => {
    const styles: Record<string, string> = {
      completed: "bg-green-50 text-green-700 border-green-200",
      processing: "bg-blue-50 text-blue-700 border-blue-200",
      shipped: "bg-purple-50 text-purple-700 border-purple-200",
      pending: "bg-amber-50 text-amber-700 border-amber-200",
    }
    return styles[status] || "bg-muted text-muted-foreground border-border"
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-border">
            <Link href="/" className="font-serif text-xl tracking-[0.18em] text-primary hover:text-primary/80 transition-colors">
              MAISON
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id)
                    setSidebarOpen(false)
                  }}
                  className={cn(
                    "flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                    activeSection === item.id
                      ? "bg-primary text-primary-foreground shadow-elegant"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </button>
              ))}
            </div>
          </nav>

          <div className="p-4 border-t border-border">
            <Button
              asChild
              variant="outline"
              className="w-full justify-center gap-2 rounded-lg"
            >
              <Link href="/">
                <ChevronLeft className="h-4 w-4" />
                Back to Store
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center gap-4 h-16 px-4 sm:px-6 bg-card/95 backdrop-elegant border-b border-border shadow-elegant">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1 flex items-center gap-4">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 h-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold">
              AD
            </div>
          </div>
        </header>

        <main className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl tracking-tight mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here&apos;s what&apos;s happening with your store.
              </p>
            </div>
            <Button className="gap-2 h-11 px-6 rounded-lg shadow-elegant-lg hover:shadow-xl transition-all duration-300">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="bg-card rounded-xl p-6 border border-border shadow-elegant hover:shadow-elegant-lg transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <stat.Icon className="h-6 w-6 text-foreground" />
                  </div>
                  <span
                    className={cn(
                      "flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full",
                      stat.trend === "up"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    )}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl sm:text-3xl font-semibold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
              </div>
            ))}
          </div>

          {/* Orders and Products */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-elegant">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h2 className="text-lg font-semibold mb-1">Recent Orders</h2>
                  <p className="text-sm text-muted-foreground">Latest customer orders</p>
                </div>
                <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary">
                  View all <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <div
                      key={order.id}
                      className={cn(
                        "flex items-center justify-between py-4",
                        index !== recentOrders.length - 1 && "border-b border-border/50"
                      )}
                    >
                      <div className="flex-1">
                        <p className="font-semibold mb-1">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                        <p className="text-xs text-muted-foreground mt-1">{order.date}</p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-2">
                        <Badge
                          variant="outline"
                          className={cn("capitalize font-medium", getStatusStyle(order.status))}
                        >
                          {order.status}
                        </Badge>
                        <p className="text-sm font-semibold">{formatPrice(order.total)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-card rounded-xl border border-border shadow-elegant">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold mb-1">Top Products</h2>
                <p className="text-sm text-muted-foreground">Best selling items this month</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={product.name} className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-muted-foreground w-4">
                        {index + 1}
                      </span>
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0 shadow-sm">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                      </div>
                      <p className="text-sm font-semibold whitespace-nowrap">
                        {formatPrice(product.revenue)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
