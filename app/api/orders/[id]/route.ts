import { NextResponse } from "next/server"
import { store } from "@/lib/store"

// GET /api/orders/:id
export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const order = store.getOrder(params.id)
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 })
  return NextResponse.json({ order })
}

// PATCH /api/orders/:id - Update order status
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json()
    if (!status) return NextResponse.json({ error: "Status is required" }, { status: 400 })

    const validStatuses = ["pending", "processing", "shipped", "completed", "cancelled"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` }, { status: 400 })
    }

    const order = store.updateOrderStatus(params.id, status)
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 })
    return NextResponse.json({ order })
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
