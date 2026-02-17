import { NextResponse } from "next/server"
import { store } from "@/lib/store"

// GET /api/orders - List all orders (supports ?status=X&search=X)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const search = searchParams.get("search")

  let orders = store.getOrders()

  if (status && status !== "all") {
    orders = orders.filter(o => o.status === status)
  }
  if (search) {
    orders = orders.filter(o =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase())
    )
  }

  return NextResponse.json({ orders, total: orders.length })
}

// POST /api/orders - Create a new order
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const order = store.addOrder(body)
    return NextResponse.json({ order }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
