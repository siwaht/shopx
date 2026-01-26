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
  MoreHorizontal,
  ArrowUpRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Navigation items
const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { name: "Products", icon: Package, id: "products" },
  { name: "Orders", icon: ShoppingCart, id: "orders" },
  { name: "Customers", icon: Users, id: "customers" },
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
  { id: "ORD-001", customer: "Sarah Johnson", total: 680, status: "completed", date: "2 hours ago" },
  { id: "ORD-002", customer: "Michael Chen", total: 495, status: "processing", date: "4 hours ago" },
  { id: "ORD-003", customer: "Emma Williams", total: 1250, status: "shipped", date: "6 hours ago" },
  { id: "ORD-004", customer: "James Brown", total: 385, status: "pending", date: "8 hours ago" },
  { id: "ORD-005", customer: "Olivia Davis", total: 890, status: "completed", date: "12 hours ago" },
]

// Top products
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
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <Link href="/" className="font-serif text-xl tracking-widest">
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
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id)
                  setSidebarOpen(false)
                }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-left",
                  activeSection === item.id
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t">
            <Button asChild variant="outline" className="w-full justify-start">
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
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 sm:px-6">
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-9 bg-gray-50 border-0"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xs font-medium">AD</span>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          {/* Dashboard Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif tracking-tight">Dashboard</h1>
              <p className="text-gray-500 text-sm mt-1">
                Welcome back! Here&apos;s what&apos;s happening with your store.
              </p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <Card key={stat.name}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <stat.icon className="h-5 w-5 text-gray-700" />
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
                    <p className="text-sm text-gray-500">{stat.name}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Orders and Products */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-lg">Recent Orders</CardTitle>
                  <CardDescription>Latest customer orders</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  View all <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-500">{order.customer}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={cn("capitalize", getStatusColor(order.status))}>
                          {order.status}
                        </Badge>
                        <p className="text-sm font-medium mt-1">{formatPrice(order.total)}</p>
                      </div>
                    </div>
                  ))}
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
                      <span className="text-sm font-medium text-gray-400 w-4">{index + 1}</span>
                      <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.sales} sales</p>
                      </div>
                      <p className="text-sm font-medium">{formatPrice(product.revenue)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
