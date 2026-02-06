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
  MapPin,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface Order {
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

const orders: Order[] = [
  { id: "ORD-001", customer: "Sarah Johnson", email: "sarah@email.com", total: 680, items: 3, status: "completed", date: "Feb 6, 2026", payment: "Paid", address: "123 Fifth Ave, New York, NY", products: [{ name: "Azure Linen Blazer", qty: 1, price: 695 }] },
  { id: "ORD-002", customer: "Michael Chen", email: "michael@email.com", total: 495, items: 2, status: "processing", date: "Feb 6, 2026", payment: "Paid", address: "456 Market St, San Francisco, CA", products: [{ name: "Saffron Leather Clutch", qty: 1, price: 495 }] },
  { id: "ORD-003", customer: "Emma Williams", email: "emma@email.com", total: 1250, items: 4, status: "shipped", date: "Feb 5, 2026", payment: "Paid", address: "789 Oxford St, London, UK", products: [{ name: "Emerald Wool Coat", qty: 1, price: 1250 }] },
  { id: "ORD-004", customer: "James Brown", email: "james@email.com", total: 385, items: 1, status: "pending", date: "Feb 5, 2026", payment: "Pending", address: "321 Queen St, Toronto, CA", products: [{ name: "Coral Cashmere Sweater", qty: 1, price: 385 }] },
  { id: "ORD-005", customer: "Olivia Davis", email: "olivia@email.com", total: 890, items: 3, status: "completed", date: "Feb 4, 2026", payment: "Paid", address: "654 Rue de Rivoli, Paris, FR", products: [{ name: "Midnight Velvet Dress", qty: 1, price: 890 }] },
  { id: "ORD-006", customer: "Liam Martinez", email: "liam@email.com", total: 1650, items: 5, status: "shipped", date: "Feb 4, 2026", payment: "Paid", address: "987 Ocean Dr, Miami, FL", products: [{ name: "Emerald Wool Coat", qty: 1, price: 1250 }, { name: "Ocean Silk Tie", qty: 2, price: 200 }] },
  { id: "ORD-007", customer: "Sophia Taylor", email: "sophia@email.com", total: 320, items: 1, status: "cancelled", date: "Feb 3, 2026", payment: "Refunded", address: "147 Friedrichstr, Berlin, DE", products: [{ name: "Pearl Silk Blouse", qty: 1, price: 320 }] },
  { id: "ORD-008", customer: "Noah Wilson", email: "noah@email.com", total: 745, items: 2, status: "completed", date: "Feb 3, 2026", payment: "Paid", address: "258 George St, Sydney, AU", products: [{ name: "Saffron Leather Clutch", qty: 1, price: 495 }, { name: "Golden Hour Scarf", qty: 1, price: 245 }] },
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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

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

  const handleExport = () => {
    const headers = ["Order ID", "Customer", "Email", "Date", "Items", "Status", "Payment", "Total"]
    const rows = orders.map(o => [o.id, o.customer, o.email, o.date, o.items, o.status, o.payment, "$" + o.total])
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "orders-export.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl tracking-tight mb-2">Orders</h1>
          <p className="text-muted-foreground">Track and manage customer orders.</p>
        </div>
        <Button variant="outline" onClick={handleExport} className="gap-2 h-11 px-6 rounded-lg">
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
                  <button onClick={() => setSelectedOrder(order)} className="p-2 hover:bg-muted rounded-lg transition-colors">
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

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg">
          <DialogTitle className="font-serif text-xl">Order {selectedOrder?.id}</DialogTitle>
          {selectedOrder && (
            <div className="space-y-5 pt-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={cn("capitalize font-medium", statusConfig[selectedOrder.status]?.style)}>
                  {selectedOrder.status}
                </Badge>
                <p className="text-sm text-muted-foreground">{selectedOrder.date}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <Package className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{selectedOrder.customer}</p>
                    <p className="text-muted-foreground text-xs">{selectedOrder.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <p className="text-muted-foreground">{selectedOrder.address}</p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <p className={selectedOrder.payment === "Paid" ? "text-green-700" : selectedOrder.payment === "Refunded" ? "text-red-600" : "text-amber-600"}>
                    {selectedOrder.payment}
                  </p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm font-semibold mb-3">Items</p>
                <div className="space-y-2">
                  {selectedOrder.products.map((p, i) => (
                    <div key={i} className="flex items-center justify-between py-2 px-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {p.qty}</p>
                      </div>
                      <p className="text-sm font-semibold">${p.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <p className="font-semibold">Total</p>
                <p className="text-lg font-semibold">${selectedOrder.total.toLocaleString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
