"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Settings,
  BarChart3,
  ChevronLeft,
  Menu,
  X,
  Search,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { DashboardSection } from "./sections/dashboard-section"
import { ProductsSection } from "./sections/products-section"
import { OrdersSection } from "./sections/orders-section"
import { CustomersSection } from "./sections/customers-section"
import { AnalyticsSection } from "./sections/analytics-section"
import { SettingsSection } from "./sections/settings-section"

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { name: "Products", icon: Package, id: "products" },
  { name: "Orders", icon: ShoppingCart, id: "orders" },
  { name: "Customers", icon: Users, id: "customers" },
  { name: "Analytics", icon: BarChart3, id: "analytics" },
  { name: "Settings", icon: Settings, id: "settings" },
]

export default function AdminPage() {
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")

  useEffect(() => {
    setMounted(true)
  }, [])

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

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard": return <DashboardSection />
      case "products": return <ProductsSection />
      case "orders": return <OrdersSection />
      case "customers": return <CustomersSection />
      case "analytics": return <AnalyticsSection />
      case "settings": return <SettingsSection />
      default: return <DashboardSection />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

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
          {renderSection()}
        </main>
      </div>
    </div>
  )
}
