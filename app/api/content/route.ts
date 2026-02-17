import { NextRequest, NextResponse } from "next/server"
import { store } from "@/lib/store"

export async function GET() {
  return NextResponse.json(store.getContent())
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { section, updates } = body
    if (!section || !updates) {
      return NextResponse.json({ error: "section and updates are required" }, { status: 400 })
    }
    const content = store.updateContent(section, updates)
    return NextResponse.json(content)
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
