"use client"

import { useState } from "react"
import {
  Search,
  Download,
  Eye,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const orders = [
  { id: "ORD-001", customer: "Sarah Johnson", email: "sarah@email.com", total: 680, items: 3, status: "completed", date: "Feb 6, 2026", payment: "Paid" },
  { id: "ORD-002", customer: "Michael Chen", email: "michael@email.com", total: 495, items: 2, status: "processing", date: "Feb 6, 2026", payment: "Paid" },
  { id: "ORD-003", customer: "Emma Williams", email: "emma@email.com", total: 1250, items: 4, status: "shipped", date: "Feb 5, 2026", payment: "Paid" },
  { id: "ORD-004", customer: "James Brown", email: "james@email.com", total: 385, items: 1, status: "pending", date: "Feb 5, 2026", payment: "Pending" },
  { id: "ORD-005", customer: "Olivia Davis", email: "olivia@email.com", total: 890, items: 3, status: "completed", date: "Feb 4, 2026", payment: "Paid" },
  { id: "ORD-006", customer: "Liam Martinez", email: "liam@email.com", total: 1650, items: 5, status: "shipped", date: "Feb 4, 2026", payment: "Paid" },
  { id: "ORD-007", customer: "Sophia Taylor", email: "sophia@email.com", total: 320, items: 1, status: "cancelled", date: "Feb 3, 2026", payment: "Refunded" },
  { id: "ORD-008", customer: "Noah Wilson", email: "noah@email.com", total: 745, items: 2, status: "completed", date: "Feb 3, 2026", payment: "Paid" },
]

const statusConfig: Record<string, { style: string; icon: typeof CheckCircle2 }> = {
  completed: { style: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle2 },
  processing: { style: "bg-blue-50 text-blue-700 border-blue-200", icon: Package },
  shipped: { style: "bg-cyan-50 text-cyan-700 border-cyan-200", icon: Truck },
  pending: { style: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock },
  cancelled: { style: "bg-red-50 text-red-700 border-red-200", icon: XCircle },
}

export function OrdersSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const statuses = ["all", "pending", "processing", "shipped", "completed", "cancelled"]

  const filtered = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || o.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const orderStats = [
    { label: "Total Orders", value: orders.length, icon: Package },
    { label: "Pending", value: orders.filter(o => o.status === "pending").length, icon: Clock },
    { label: "Shipped", value: orders.filter(o => o.status === "shipped").length, icon: Truck },
    { label: "Completed", value: orders.filter(o => o.status === "completed").length, icon: CheckCircle2 },
  ]

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl tracking-tight mb-2">Orders</h1>
          <p className="text-muted-foreground">Track and manage customer orders.</p>
        </div>
        <Button variant="outline" className="gap-2 h-11 px-6 rounded-lg">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {orderStats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl p-5 border border-border shadow-elegant">
            <stat.icon className="h-5 w-5 text-muted-foreground mb-3" />
            <p className="text-2xl font-semibold mb-0.5">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border shadow-elegant">
        <div className="p-6 border-b border-border flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 h-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {statuses.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={cn(
                  "px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all duration-300",
                  statusFilter === s
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_60px] gap-4 px-6 py-3 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <span>Order</span>
          <span>Customer</span>
          <span>Date</span>
          <span>Items</span>
          <span>Status</span>
          <span>Total</span>
          <span />
        </div>

        <div className="divide-y divide-border/50">
          {filtered.map((order) => {
            const config = statusConfig[order.status]
            return (
              <div key={order.id} className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_60px] gap-4 px-6 py-5 items-center hover:bg-muted/30 transition-colors">
                <p className="font-semibold text-sm">{order.id}</p>
                <div>
                  <p className="font-medium text-sm">{order.customer}</p>
                  <p className="text-xs text-muted-foreground">{order.email}</p>
                </div>
                <p className="text-sm text-muted-foreground">{order.date}</p>
                <p className="text-sm text-muted-foreground">{order.items} items</p>
                <Badge variant="outline" className={cn("capitalize font-medium w-fit", config?.style)}>
                  {order.status}
                </Badge>
                <p className="font-semibold">${order.total.toLocaleString()}</p>
                <div className="flex justify-end">
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
          <span>{filtered.length} of {orders.length} orders</span>
        </div>
      </div>
    </div>
  )
}
