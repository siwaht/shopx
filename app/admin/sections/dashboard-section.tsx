"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Plus,
  ArrowUpRight,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface DashboardData {
  analytics: {
    totalRevenue: number
    totalOrders: number
    totalCustomers: number
    completedOrders: number
    pendingOrders: number
    shippedOrders: number
    avgOrderValue: number
    vipCustomers: number
    lowStockProducts: number
    outOfStockProducts: number
    totalProducts: number
  } | null
  orders: {
    id: string
    customer: string
    total: number
    status: string
    date: string
  }[]
  products: {
    id: number
    name: string
    image: string
    price: number
    stock: number
    status: string
  }[]
}

const getStatusStyle = (status: string) => {
  const styles: Record<string, string> = {
    completed: "bg-green-50 text-green-700 border-green-200",
    processing: "bg-blue-50 text-blue-700 border-blue-200",
    shipped: "bg-purple-50 text-purple-700 border-purple-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
  }
  return styles[status] || "bg-muted text-muted-foreground border-border"
}

interface DashboardSectionProps {
  onNavigate: (section: string) => void
}

export function DashboardSection({ onNavigate }: DashboardSectionProps) {
  const [data, setData] = useState<DashboardData>({ analytics: null, orders: [], products: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch("/api/analytics").then(r => r.json()),
      fetch("/api/orders").then(r => r.json()),
      fetch("/api/products").then(r => r.json()),
    ]).then(([analytics, orders, products]) => {
      setData({ analytics, orders, products })
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const formatPrice = (price: number) => "$" + price.toLocaleString()

  if (loading || !data.analytics) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const { analytics } = data
  const recentOrders = (Array.isArray(data.orders) ? data.orders : []).slice(0, 5)
  const lowStockProducts = (Array.isArray(data.products) ? data.products : []).filter(p => p.status === "low_stock" || p.status === "out_of_stock").slice(0, 5)

  const stats = [
    { name: "Total Revenue", value: formatPrice(analytics.totalRevenue), change: "+12.5%", trend: "up" as const, Icon: DollarSign },
    { name: "Total Orders", value: String(analytics.totalOrders), change: "+8.2%", trend: "up" as const, Icon: ShoppingCart },
    { name: "Customers", value: String(analytics.totalCustomers), change: "+15.3%", trend: "up" as const, Icon: Users },
    { name: "Products", value: String(analytics.totalProducts), change: `${analytics.lowStockProducts} low stock`, trend: analytics.lowStockProducts > 0 ? "down" as const : "up" as const, Icon: Package },
  ]

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl tracking-tight mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening with your store.
          </p>
        </div>
        <Button onClick={() => onNavigate("products")} className="gap-2 h-11 px-6 rounded-lg shadow-elegant-lg hover:shadow-xl transition-all duration-300">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

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
                    : "bg-amber-50 text-amber-700"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border shadow-elegant">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-lg font-semibold mb-1">Recent Orders</h2>
              <p className="text-sm text-muted-foreground">Latest customer orders</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("orders")} className="gap-1 text-primary hover:text-primary">
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
              {recentOrders.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">No orders yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Stock Alerts */}
        <div className="bg-card rounded-xl border border-border shadow-elegant">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-lg font-semibold mb-1">Stock Alerts</h2>
              <p className="text-sm text-muted-foreground">Products needing attention</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("products")} className="gap-1 text-primary hover:text-primary">
              View all <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-3">
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
                    <p className="text-xs text-muted-foreground">{formatPrice(product.price)}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs font-medium shrink-0",
                      product.stock === 0
                        ? "bg-red-50 text-red-700 border-red-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    )}
                  >
                    {product.stock === 0 ? (
                      <span className="flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Out</span>
                    ) : (
                      `${product.stock} left`
                    )}
                  </Badge>
                </div>
              ))}
              {lowStockProducts.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">All products well stocked</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
