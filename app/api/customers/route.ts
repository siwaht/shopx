import { NextResponse } from "next/server"
import { store } from "@/lib/store"

// GET /api/customers - List all customers (supports ?search=X)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")

  let customers = store.getCustomers()

  if (search) {
    customers = customers.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    )
  }

  return NextResponse.json({ customers, total: customers.length })
}
