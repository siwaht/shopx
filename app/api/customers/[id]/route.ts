import { NextResponse } from "next/server"
import { store } from "@/lib/store"

// GET /api/customers/:id
export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const customer = store.getCustomer(Number(params.id))
  if (!customer) return NextResponse.json({ error: "Customer not found" }, { status: 404 })
  return NextResponse.json({ customer })
}
