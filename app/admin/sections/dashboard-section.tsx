"use client"

import Image from "next/image"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Eye,
  Plus,
  ArrowUpRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

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

const getStatusStyle = (status: string) => {
  const styles: Record<string, string> = {
    completed: "bg-green-50 text-green-700 border-green-200",
    processing: "bg-blue-50 text-blue-700 border-blue-200",
    shipped: "bg-purple-50 text-purple-700 border-purple-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
  }
  return styles[status] || "bg-muted text-muted-foreground border-border"
}

interface DashboardSectionProps {
  onNavigate: (section: string) => void
}

export function DashboardSection({ onNavigate }: DashboardSectionProps) {
  const formatPrice = (price: number) => "$" + price.toLocaleString()

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
            </div>
          </div>
        </div>

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
    </div>
  )
}
