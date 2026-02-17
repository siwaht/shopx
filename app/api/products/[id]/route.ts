import { NextResponse } from "next/server"
import { store } from "@/lib/store"

// GET /api/products/:id
export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const product = store.getProduct(Number(params.id))
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 })
  return NextResponse.json({ product })
}

// PUT /api/products/:id - Update a product
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const deriveStatus = (s: number) => s === 0 ? "out_of_stock" : s <= 10 ? "low_stock" : "active"

    if (body.stock !== undefined) {
      body.status = deriveStatus(Number(body.stock))
    }

    const product = store.updateProduct(Number(params.id), body)
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 })
    return NextResponse.json({ product })
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

// DELETE /api/products/:id
export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const success = store.deleteProduct(Number(params.id))
  if (!success) return NextResponse.json({ error: "Product not found" }, { status: 404 })
  return NextResponse.json({ success: true })
}
