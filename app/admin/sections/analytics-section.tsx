"use client"

import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Eye,
  ArrowUpRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const metrics = [
  { name: "Revenue", value: "$45,231", change: "+12.5%", trend: "up", icon: DollarSign, detail: "vs $40,218 last month" },
  { name: "Orders", value: "1,234", change: "+8.2%", trend: "up", icon: ShoppingCart, detail: "vs 1,140 last month" },
  { name: "Customers", value: "5,678", change: "+15.3%", trend: "up", icon: Users, detail: "vs 4,924 last month" },
  { name: "Page Views", value: "89,432", change: "-2.4%", trend: "down", icon: Eye, detail: "vs 91,628 last month" },
]

const topPages = [
  { page: "/", views: 34521, bounce: "32%", duration: "3m 42s" },
  { page: "/collections", views: 18234, bounce: "28%", duration: "4m 15s" },
  { page: "/products", views: 15678, bounce: "35%", duration: "2m 58s" },
  { page: "/checkout", views: 8432, bounce: "12%", duration: "5m 32s" },
  { page: "/about", views: 5213, bounce: "45%", duration: "1m 48s" },
]

const revenueByMonth = [
  { month: "Sep", revenue: 28500 },
  { month: "Oct", revenue: 32100 },
  { month: "Nov", revenue: 38900 },
  { month: "Dec", revenue: 52300 },
  { month: "Jan", revenue: 41200 },
  { month: "Feb", revenue: 45231 },
]

const topSources = [
  { source: "Direct", visits: 12450, percentage: 35 },
  { source: "Organic Search", visits: 8920, percentage: 25 },
  { source: "Social Media", visits: 7140, percentage: 20 },
  { source: "Email", visits: 4280, percentage: 12 },
  { source: "Referral", visits: 2854, percentage: 8 },
]

export function AnalyticsSection() {
  const maxRevenue = Math.max(...revenueByMonth.map(r => r.revenue))

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl tracking-tight mb-2">Analytics</h1>
        <p className="text-muted-foreground">Track your store performance and customer behavior.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {metrics.map((metric) => (
          <div key={metric.name} className="bg-card rounded-xl p-6 border border-border shadow-elegant hover:shadow-elegant-lg transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                <metric.icon className="h-6 w-6 text-foreground" />
              </div>
              <span className={cn(
                "flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full",
                metric.trend === "up" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              )}>
                {metric.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {metric.change}
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-semibold mb-1">{metric.value}</p>
            <p className="text-xs text-muted-foreground">{metric.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="bg-card rounded-xl border border-border shadow-elegant p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold mb-1">Revenue Overview</h2>
              <p className="text-sm text-muted-foreground">Monthly revenue trend</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
              <ArrowUpRight className="h-3 w-3" />
              +18.2% overall
            </span>
          </div>
          <div className="flex items-end gap-3 h-48">
            {revenueByMonth.map((item) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full relative group">
                  <div
                    className="w-full bg-primary/15 hover:bg-primary/25 rounded-md transition-all duration-300 cursor-default"
                    style={{ height: `${(item.revenue / maxRevenue) * 160}px` }}
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${(item.revenue / 1000).toFixed(1)}k
                  </div>
                </div>
                <span className="text-xs text-muted-foreground font-medium">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-card rounded-xl border border-border shadow-elegant p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-1">Traffic Sources</h2>
            <p className="text-sm text-muted-foreground">Where your visitors come from</p>
          </div>
          <div className="space-y-5">
            {topSources.map((source) => (
              <div key={source.source}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{source.source}</span>
                  <span className="text-sm text-muted-foreground">{source.visits.toLocaleString()} visits ({source.percentage}%)</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary/70 rounded-full transition-all duration-700"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-card rounded-xl border border-border shadow-elegant">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold mb-1">Top Pages</h2>
          <p className="text-sm text-muted-foreground">Most visited pages on your store</p>
        </div>
        <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-6 py-3 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <span>Page</span>
          <span>Views</span>
          <span>Bounce Rate</span>
          <span>Avg. Duration</span>
        </div>
        <div className="divide-y divide-border/50">
          {topPages.map((page) => (
            <div key={page.page} className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-6 py-5 items-center hover:bg-muted/30 transition-colors">
              <p className="font-medium text-sm font-mono">{page.page}</p>
              <p className="text-sm font-semibold">{page.views.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">{page.bounce}</p>
              <p className="text-sm text-muted-foreground">{page.duration}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
