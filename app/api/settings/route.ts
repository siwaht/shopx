import { NextResponse } from "next/server"
import { store } from "@/lib/store"

// GET /api/settings
export async function GET() {
  return NextResponse.json({ settings: store.getSettings() })
}

// PUT /api/settings - Update store settings
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const settings = store.updateSettings(body)
    return NextResponse.json({ settings })
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
