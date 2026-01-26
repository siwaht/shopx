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

// Navigation items
const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { name: "Products", icon: Package, id: "products" },
  { name: "Orders", icon: ShoppingCart, id: "orders" },
  { name: "Customers", icon: Users, id: "customers" },
  { name: "Analytics", icon: BarChart3, id: "analytics" },
  { name: "Settings", icon: Settings, id: "settings" },
]

// Stats data
const stats = [
  { name: "Total Revenue", value: "$45,231", change: "+12.5%", trend: "up", Icon: DollarSign },
  { name: "Total Orders", value: "1,234", change: "+8.2%", trend: "up", Icon: ShoppingCart },
  { name: "Active Customers", value: "5,678", change: "+15.3%", trend: "up", Icon: Users },
  { name: "Page Views", value: "89,432", change: "-2.4%", trend: "down", Icon: Eye },
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
    return "$" + price.toLocaleString()
  }

  const getStatusStyle = (status: string) => {
    const styles: Record<string, string> = {
      completed: "bg-green-100 text-green-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      pending: "bg-yellow-100 text-yellow-800",
    }
    return styles[status] || "bg-gray-100 text-gray-800"
  }

  if (!mounted) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ 
            width: 32, 
            height: 32, 
            border: "2px solid #111", 
            borderTopColor: "transparent", 
            borderRadius: "50%", 
            margin: "0 auto 16px",
            animation: "spin 1s linear infinite"
          }} />
          <p style={{ color: "#6b7280" }}>Loading admin panel...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 40,
          }}
          className="lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 50,
          height: "100%",
          width: 256,
          backgroundColor: "white",
          borderRight: "1px solid #e5e7eb",
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.2s ease-in-out",
        }}
        className="lg:!transform-none"
      >
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, padding: "0 24px", borderBottom: "1px solid #e5e7eb" }}>
            <Link href="/" style={{ fontFamily: "serif", fontSize: 20, letterSpacing: "0.1em", textDecoration: "none", color: "#111" }}>
              MAISON
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              style={{ padding: 8, background: "none", border: "none", cursor: "pointer" }}
              className="lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          <nav style={{ flex: 1, padding: "24px 16px", overflowY: "auto" }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id)
                  setSidebarOpen(false)
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  width: "100%",
                  padding: "10px 12px",
                  marginBottom: 4,
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 500,
                  textAlign: "left",
                  backgroundColor: activeSection === item.id ? "#111" : "transparent",
                  color: activeSection === item.id ? "white" : "#4b5563",
                }}
              >
                <item.icon size={20} />
                {item.name}
              </button>
            ))}
          </nav>

          <div style={{ padding: 16, borderTop: "1px solid #e5e7eb" }}>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                width: "100%",
                padding: "10px 16px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                backgroundColor: "white",
                color: "#111",
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              <ChevronLeft size={16} />
              Back to Store
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        <header style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          gap: 16,
          height: 64,
          padding: "0 16px",
          backgroundColor: "white",
          borderBottom: "1px solid #e5e7eb",
        }}>
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ padding: 8, background: "none", border: "none", cursor: "pointer" }}
            className="lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative", maxWidth: 400, flex: 1 }}>
              <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
              <input
                type="search"
                placeholder="Search..."
                style={{
                  width: "100%",
                  padding: "8px 12px 8px 40px",
                  borderRadius: 8,
                  border: "none",
                  backgroundColor: "#f3f4f6",
                  fontSize: 14,
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button style={{ position: "relative", padding: 8, background: "none", border: "none", cursor: "pointer" }}>
              <Bell size={20} />
              <span style={{
                position: "absolute",
                top: 6,
                right: 6,
                width: 8,
                height: 8,
                backgroundColor: "#ef4444",
                borderRadius: "50%",
              }} />
            </button>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#e5e7eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 500,
            }}>
              AD
            </div>
          </div>
        </header>

        <main style={{ padding: 24 }}>
          {/* Header */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 32 }}>
            <div>
              <h1 style={{ fontSize: 28, fontFamily: "serif", marginBottom: 4 }}>Dashboard</h1>
              <p style={{ color: "#6b7280", fontSize: 14 }}>
                Welcome back! Here&apos;s what&apos;s happening with your store.
              </p>
            </div>
            <button style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              backgroundColor: "#111",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
            }}>
              <Plus size={16} />
              Add Product
            </button>
          </div>

          {/* Stats Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 32 }}>
            {stats.map((stat) => (
              <div key={stat.name} style={{
                backgroundColor: "white",
                borderRadius: 12,
                padding: 20,
                border: "1px solid #e5e7eb",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    backgroundColor: "#f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <stat.Icon size={20} color="#374151" />
                  </div>
                  <span style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 12,
                    fontWeight: 500,
                    color: stat.trend === "up" ? "#16a34a" : "#dc2626",
                  }}>
                    {stat.trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {stat.change}
                  </span>
                </div>
                <p style={{ fontSize: 24, fontWeight: 600, marginBottom: 4 }}>{stat.value}</p>
                <p style={{ fontSize: 14, color: "#6b7280" }}>{stat.name}</p>
              </div>
            ))}
          </div>

          {/* Orders and Products */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }} className="lg:grid-cols-3">
            {/* Recent Orders */}
            <div style={{
              backgroundColor: "white",
              borderRadius: 12,
              border: "1px solid #e5e7eb",
              gridColumn: "span 1",
            }} className="lg:col-span-2">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #e5e7eb" }}>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Recent Orders</h2>
                  <p style={{ fontSize: 14, color: "#6b7280" }}>Latest customer orders</p>
                </div>
                <button style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "6px 12px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                  color: "#111",
                }}>
                  View all <ArrowUpRight size={14} />
                </button>
              </div>
              <div style={{ padding: 20 }}>
                {recentOrders.map((order) => (
                  <div key={order.id} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: "1px solid #f3f4f6",
                  }}>
                    <div>
                      <p style={{ fontWeight: 500, marginBottom: 4 }}>{order.id}</p>
                      <p style={{ fontSize: 14, color: "#6b7280" }}>{order.customer}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span className={getStatusStyle(order.status)} style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        borderRadius: 9999,
                        fontSize: 12,
                        fontWeight: 500,
                        textTransform: "capitalize",
                      }}>
                        {order.status}
                      </span>
                      <p style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>{formatPrice(order.total)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div style={{
              backgroundColor: "white",
              borderRadius: 12,
              border: "1px solid #e5e7eb",
            }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #e5e7eb" }}>
                <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Top Products</h2>
                <p style={{ fontSize: 14, color: "#6b7280" }}>Best selling items this month</p>
              </div>
              <div style={{ padding: 20 }}>
                {topProducts.map((product, index) => (
                  <div key={product.name} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "8px 0",
                  }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#9ca3af", width: 16 }}>{index + 1}</span>
                    <div style={{
                      position: "relative",
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      overflow: "hidden",
                      backgroundColor: "#f3f4f6",
                      flexShrink: 0,
                    }}>
                      <Image src={product.image} alt={product.name} fill style={{ objectFit: "cover" }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 14, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.name}</p>
                      <p style={{ fontSize: 12, color: "#6b7280" }}>{product.sales} sales</p>
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 500 }}>{formatPrice(product.revenue)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .lg\\:hidden { display: none !important; }
          .lg\\:pl-64 { padding-left: 256px !important; }
          .lg\\:\\!transform-none { transform: none !important; }
          .lg\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr) !important; }
          .lg\\:col-span-2 { grid-column: span 2 !important; }
        }
      `}</style>
    </div>
  )
}
