import { NextResponse } from "next/server"
import { store } from "@/lib/store"

// GET /api/analytics - Get store analytics summary
export async function GET() {
  const analytics = store.getAnalytics()

  // Add monthly revenue trend data
  const revenueByMonth = [
    { month: "Sep", revenue: 28500 },
    { month: "Oct", revenue: 32100 },
    { month: "Nov", revenue: 38900 },
    { month: "Dec", revenue: 52300 },
    { month: "Jan", revenue: 41200 },
    { month: "Feb", revenue: analytics.totalRevenue },
  ]

  const topSources = [
    { source: "Direct", visits: 12450, percentage: 35 },
    { source: "Organic Search", visits: 8920, percentage: 25 },
    { source: "Social Media", visits: 7140, percentage: 20 },
    { source: "Email", visits: 4280, percentage: 12 },
    { source: "Referral", visits: 2854, percentage: 8 },
  ]

  return NextResponse.json({
    ...analytics,
    revenueByMonth,
    topSources,
  })
}
