import { NextResponse } from "next/server"
import { store } from "@/lib/store"

// GET /api/products - List all products (supports ?category=X&search=X)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const search = searchParams.get("search")

  let products = store.getProducts()

  if (category && category !== "all") {
    products = products.filter(p => p.category.toLowerCase() === category.toLowerCase())
  }
  if (search) {
    products = products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    )
  }

  return NextResponse.json({ products, total: products.length })
}

// POST /api/products - Create a new product
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, price, stock, category, image, color, description, originalPrice, isNew } = body

    if (!name || price === undefined || stock === undefined || !category) {
      return NextResponse.json({ error: "Missing required fields: name, price, stock, category" }, { status: 400 })
    }

    const deriveStatus = (s: number) => s === 0 ? "out_of_stock" : s <= 10 ? "low_stock" : "active"

    const product = store.addProduct({
      name,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      stock: Number(stock),
      status: deriveStatus(Number(stock)),
      category,
      image: image || "/images/bestseller-1.jpg",
      color: color || category,
      description: description || "",
      isNew: isNew ?? false,
      rating: 4.5,
      reviews: 0,
    })

    return NextResponse.json({ product }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
