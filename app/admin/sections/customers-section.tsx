"use client"

import { useState } from "react"
import {
  Search,
  Download,
  Mail,
  MapPin,
  Calendar,
  ShoppingBag,
  Eye,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface Customer {
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

const customers: Customer[] = [
  { id: 1, name: "Sarah Johnson", email: "sarah@email.com", location: "New York, US", orders: 12, spent: 8450, joined: "Jan 2025", status: "active", recentOrders: [{ id: "ORD-001", date: "Feb 6, 2026", total: 680, status: "completed" }, { id: "ORD-012", date: "Jan 15, 2026", total: 495, status: "completed" }] },
  { id: 2, name: "Michael Chen", email: "michael@email.com", location: "San Francisco, US", orders: 8, spent: 5230, joined: "Mar 2025", status: "active", recentOrders: [{ id: "ORD-002", date: "Feb 6, 2026", total: 495, status: "processing" }] },
  { id: 3, name: "Emma Williams", email: "emma@email.com", location: "London, UK", orders: 15, spent: 12680, joined: "Dec 2024", status: "vip", recentOrders: [{ id: "ORD-003", date: "Feb 5, 2026", total: 1250, status: "shipped" }, { id: "ORD-015", date: "Jan 20, 2026", total: 890, status: "completed" }] },
  { id: 4, name: "James Brown", email: "james@email.com", location: "Toronto, CA", orders: 3, spent: 1250, joined: "Nov 2025", status: "active", recentOrders: [{ id: "ORD-004", date: "Feb 5, 2026", total: 385, status: "pending" }] },
  { id: 5, name: "Olivia Davis", email: "olivia@email.com", location: "Paris, FR", orders: 21, spent: 18900, joined: "Sep 2024", status: "vip", recentOrders: [{ id: "ORD-005", date: "Feb 4, 2026", total: 890, status: "completed" }, { id: "ORD-018", date: "Jan 28, 2026", total: 1650, status: "completed" }] },
  { id: 6, name: "Liam Martinez", email: "liam@email.com", location: "Miami, US", orders: 6, spent: 3450, joined: "Jun 2025", status: "active", recentOrders: [{ id: "ORD-006", date: "Feb 4, 2026", total: 1650, status: "shipped" }] },
  { id: 7, name: "Sophia Taylor", email: "sophia@email.com", location: "Berlin, DE", orders: 1, spent: 320, joined: "Jan 2026", status: "new", recentOrders: [{ id: "ORD-007", date: "Feb 3, 2026", total: 320, status: "cancelled" }] },
  { id: 8, name: "Noah Wilson", email: "noah@email.com", location: "Sydney, AU", orders: 9, spent: 6780, joined: "Apr 2025", status: "active", recentOrders: [{ id: "ORD-008", date: "Feb 3, 2026", total: 745, status: "completed" }] },
]

const getStatusStyle = (status: string) => {
  const styles: Record<string, string> = {
    active: "bg-green-50 text-green-700 border-green-200",
    vip: "bg-amber-50 text-amber-700 border-amber-200",
    new: "bg-blue-50 text-blue-700 border-blue-200",
    completed: "bg-green-50 text-green-700 border-green-200",
    shipped: "bg-cyan-50 text-cyan-700 border-cyan-200",
    processing: "bg-blue-50 text-blue-700 border-blue-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
  }
  return styles[status] || "bg-muted text-muted-foreground border-border"
}

export function CustomersSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalCustomers = customers.length
  const totalRevenue = customers.reduce((sum, c) => sum + c.spent, 0)
  const avgOrderValue = Math.round(totalRevenue / customers.reduce((sum, c) => sum + c.orders, 0))
  const vipCount = customers.filter(c => c.status === "vip").length

  const handleExport = () => {
    const headers = ["Name", "Email", "Location", "Orders", "Total Spent", "Joined", "Status"]
    const rows = customers.map(c => [c.name, c.email, c.location, c.orders, "$" + c.spent, c.joined, c.status])
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "customers-export.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl tracking-tight mb-2">Customers</h1>
          <p className="text-muted-foreground">Manage your customer relationships.</p>
        </div>
        <Button variant="outline" onClick={handleExport} className="gap-2 h-11 px-6 rounded-lg">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Customers", value: totalCustomers },
          { label: "VIP Customers", value: vipCount },
          { label: "Total Revenue", value: "$" + totalRevenue.toLocaleString() },
          { label: "Avg. Order Value", value: "$" + avgOrderValue },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl p-5 border border-border shadow-elegant">
            <p className="text-2xl font-semibold mb-0.5">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border shadow-elegant">
        <div className="p-6 border-b border-border">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 h-10"
            />
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-[2fr_2fr_1.5fr_1fr_1fr_1fr_60px] gap-4 px-6 py-3 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <span>Customer</span>
          <span>Contact</span>
          <span>Location</span>
          <span>Orders</span>
          <span>Spent</span>
          <span>Status</span>
          <span />
        </div>

        <div className="divide-y divide-border/50">
          {filtered.map((customer) => (
            <div key={customer.id} className="grid grid-cols-1 lg:grid-cols-[2fr_2fr_1.5fr_1fr_1fr_1fr_60px] gap-4 px-6 py-5 items-center hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold flex-shrink-0">
                  {customer.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold text-sm">{customer.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Joined {customer.joined}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                {customer.email}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {customer.location}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <ShoppingBag className="h-3.5 w-3.5" />
                {customer.orders}
              </p>
              <p className="font-semibold text-sm">${customer.spent.toLocaleString()}</p>
              <Badge variant="outline" className={cn("capitalize font-medium w-fit", getStatusStyle(customer.status))}>
                {customer.status}
              </Badge>
              <div className="flex justify-end">
                <button onClick={() => setSelectedCustomer(customer)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
          <span>{filtered.length} of {customers.length} customers</span>
        </div>
      </div>

      <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
        <DialogContent className="max-w-md">
          <DialogTitle className="font-serif text-xl">Customer Details</DialogTitle>
          {selectedCustomer && (
            <div className="space-y-5 pt-2">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg font-semibold">
                  {selectedCustomer.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold text-lg">{selectedCustomer.name}</p>
                  <Badge variant="outline" className={cn("capitalize font-medium", getStatusStyle(selectedCustomer.status))}>
                    {selectedCustomer.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedCustomer.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {selectedCustomer.joined}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <ShoppingBag className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-lg font-semibold">{selectedCustomer.orders}</p>
                  <p className="text-xs text-muted-foreground">Orders</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <DollarSign className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-lg font-semibold">${selectedCustomer.spent.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total Spent</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <DollarSign className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-lg font-semibold">${selectedCustomer.orders > 0 ? Math.round(selectedCustomer.spent / selectedCustomer.orders) : 0}</p>
                  <p className="text-xs text-muted-foreground">Avg. Order</p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm font-semibold mb-3">Recent Orders</p>
                <div className="space-y-2">
                  {selectedCustomer.recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between py-2 px-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{order.id}</p>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className={cn("capitalize font-medium text-xs mb-1", getStatusStyle(order.status))}>
                          {order.status}
                        </Badge>
                        <p className="text-sm font-semibold">${order.total.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
